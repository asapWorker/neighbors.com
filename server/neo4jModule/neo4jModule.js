const neo4j = require('neo4j-driver');

const uri = 'neo4j://localhost:7687';
const user = 'neo4j';
const password = 'default';


/* создание или обновление связи между двумя узлами */
module.exports.addOrUpdateConnection = async (obj1, obj2, connectionType, rating) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
    const result1 = await session.run(
      'MERGE (n1:' + obj1.type + ' {id: $id1, name: $name}) RETURN n1',
      { id1: obj1.id, name: obj1.name }
    );

    const result2 = await session.run(
      'MERGE (n2:' + obj2.type + ' {id: $id2, name: $name}) RETURN n2',
      { id2: obj2.id, name: obj2.name }
    );

    const node1Id = result1.records[0].get('n1').identity.low;
    const node2Id = result2.records[0].get('n2').identity.low;

    const result = await session.run(
      'MATCH (n1), (n2) WHERE ID(n1) = $node1Id AND ID(n2) = $node2Id ' +
      'MERGE (n1)-[r:' + connectionType + ']->(n2) ' +
      'ON CREATE SET r.rating = $rating ' +
      'ON MATCH SET r.rating = $rating ' +
      'RETURN r',
      { node1Id, node2Id, rating }
    );

    console.log(result.records[0].get('r').properties);
  } catch (error) {
    console.error(error);
  } finally {
    await session.close();
    await driver.close();
  }
}

/* обновление рейтинга связи между двумя узлами */
module.exports.updateRating = async (clientId, itemId, rating)=>  {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

    try {
        const result = await session.run(
            'MATCH (client:Client {id: $clientId})-[r:RATING]->(item {id: $itemId}) SET r.rating = $rating RETURN client, item',
            { clientId: clientId, itemId: itemId, rating: rating }
        );

        if (result.records.length === 0) {
            throw new Error('Relationship not found');
        }

        return {
            client: result.records[0].get('client').properties,
            item: result.records[0].get('item').properties
        };
    } finally {
      await session.close();
      await driver.close();
    }
}

/* удаление связи между узлами */
module.exports.deleteConnection = async (id1, id2) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
      const result = await session.run(
        `MATCH (n1 {id: $id1})-[r]-(n2 {id: $id2})
        DELETE r`,
        { id1, id2 }
      );

      console.log(`Deleted connection between nodes with id ${id1} and ${id2}`);

      // Удаление узлов, которые не связаны ни с каким другим узлом
      const deleteOrphanNodesResult = await session.run(
        `MATCH (n)
        WHERE NOT (n)--()
        DELETE n`
      );

      console.log(`Deleted orphan nodes`);
  } catch (error) {
      console.error(`Error deleting connection: ${error}`);
  } finally {
    await session.close();
    await driver.close();
  }
}

/* удаление узла */
module.exports.deleteNode = async (id) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
      const result = await session.run(
          `MATCH (n {id: $id})-[r]-(m)
          DELETE n, r, m`,
          { id }
      );

      console.log(`Deleted node with id ${id} and its connections`);

      // Удаление узлов, которые не связаны ни с каким другим узлом
      const deleteOrphanNodesResult = await session.run(
          `MATCH (n)
          WHERE NOT (n)--()
          DELETE n`
      );

      console.log(`Deleted orphan nodes`);
  } catch (error) {
      console.error(`Error deleting node: ${error}`);
  } finally {
    await session.close();
    await driver.close();
  }
}

/* получение массива id объявлений для конкретного пользователя */
module.exports.getItems = async (clientId) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
      const result = await session.run(
          'MATCH (client:Client {id: $clientId})-[:CONNECTED_TO]->(item) RETURN item.id AS id, item.name AS name, labels(item)[0] AS type, client-[:RATING]->item AS rating',
          { clientId: clientId }
      );

      return result.records.map(record => ({
          id: record.get('id'),
          isPerson: record.get('type') === "person",
          name: record.get('name'),
          rating: record.get('rating')
      }));
  } finally {
    await session.close();
    await driver.close();
  }
};

/* получение логинов клиентов для конкретного объявления */
module.exports.getClientsNames = async (itemId) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (client:client)-[:relation]->(item {id: $itemId})
       RETURN client.name AS clientName`,
      { itemId }
    );

    if (result.records.length === 0) return [];

    const clientNames = result.records.map(record => record.get('clientName'));

    return clientNames;
  } catch (error) {
    console.error(`Error getting clients NAMES: ${error.message}`);
    return [];
  } finally {
    try {
      await session.close();
    } catch (error) {
      console.error(`Error closing session: ${error.message}`);
    }
    try {
      await driver.close();
    } catch (error) {
      console.error(`Error closing driver: ${error.message}`);
    }
  }
}