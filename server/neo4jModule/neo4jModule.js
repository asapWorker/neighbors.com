const { query } = require('express');
const neo4j = require('neo4j-driver');

const uri = 'neo4j://localhost:7687';
const user = 'neo4j';
const password = 'default';


/* создание или обновление связи между двумя узлами */

module.exports.addOrUpdateConnection = async (obj1, obj2, connectionType, rating, makeActive = false) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
      const result1 = await session.run(
          'MERGE (client:' + obj1.type + ' {id: $id1, name: $name}) RETURN client',
          { id1: obj1.id, name: obj1.name }
      );

      const result2 = await session.run(
          'MERGE (item:' + obj2.type + ' {id: $id2, name: $name}) RETURN item',
          { id2: obj2.id, name: obj2.name }
      );

      const node1Id = result1.records[0].get('client').identity.low;
      const node2Id = result2.records[0].get('item').identity.low;

      let query;
      let params = {
          node1Id: node1Id,
          node2Id: node2Id,
          connectionType: connectionType,
          rating: rating
      };

      if (rating >= 0) {
          if (makeActive) {
            query = 
              'MATCH (n1), (n2) WHERE ID(n1) = $node1Id AND ID(n2) = $node2Id ' +
              'MERGE (n1)-[r:' + connectionType + '{isActive: true}]->(n2) ' +
              'ON CREATE SET r.rating = $rating ' +
              'ON MATCH SET r.rating = $rating ' +
              'RETURN r';
          } else {
            query = 
              'MATCH (n1), (n2) WHERE ID(n1) = $node1Id AND ID(n2) = $node2Id ' +
              'MERGE (n1)-[r:' + connectionType + ']->(n2) ' +
              'ON CREATE SET r.rating = $rating ' +
              'ON MATCH SET r.rating = $rating ' +
              'RETURN r';
          }

          const result = await session.run(query, params);

          console.log(result.records[0].get('r').properties);
      } else {
        const result = await session.run(
          `MATCH (client {id: $id1})-[r]-(item {id: $id2})
          DELETE r`,
          { id1: obj1.id, id2: obj2.id }
        );

        console.log(`Deleted connection between nodes with id ${obj1.id} and ${obj2.id}`);
      }

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
    const query = 
      'MATCH (n1), (n2) WHERE n1.id = $clientId AND n2.id = $itemId ' +
      'MERGE (n1)-[r:relation]->(n2) ' +
      'ON CREATE SET r.rating = $rating ' +
      'ON MATCH SET r.rating = $rating ' +
      'RETURN r'
    ;

    const result = await session.run(
        query,
        { clientId: clientId, itemId: itemId, rating: rating }
    );

    if (result.records.length === 0) {
        throw new Error('Relationship not found');
    } else {
      console.log("Rating changing is done")
    }
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
        `MATCH (client:client)-[r]->(item {id: $id})
        SET r.isActive = false
        RETURN r`,
        { id: id }
      );

      result.records.forEach(record => {
          console.log(record.get('r').properties);
      });
  } catch (error) {
      console.error(error);
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
        `MATCH (c:client {id: $clientId})-[r:relation]->(i)
        RETURN i.id AS id, i.type AS type, i.name AS name, r.rating AS rating`,
        { clientId }
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

/* получение активного объявления для клиента */
module.exports.getActiveItem = async (clientId) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (client:client {id: $clientId})-[r:relation]->(item)
      WHERE (item:house OR item:person) AND r.isActive = true
      RETURN {id: ID(item), type: labels(item)[0]} as activeItem`,
      { clientId })

    if (result.records.length === 0) {
      return null;
    }
  
    const activeItem = result.records[0].get('activeItem');
    return activeItem;

  } finally {
    await session.close();
    await driver.close();
  }
};

/* получение оценок для конкретного объявления*/
module.exports.getMarks = async (itemId) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (client:client)-[r:relation]->(item {id: $itemId})
       RETURN r.rating AS rating`,
      { itemId }
    );

    if (result.records.length === 0) return [];

    const marks = result.records.map(record => record.get('rating'));

    return marks;
  } catch (error) {
    console.error(`Error getting Marks: ${error.message}`);
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

/* удаление связи между узлами */
module.exports.deleteConnection = async (id1, id2) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (client:client {id: $id1})-[r]->(item {id: $id2})
      SET r.isActive = false
      RETURN r`,
      { id1: id1, id2: id2 }
    );

      console.log(result.records[0].get('r').properties);
  } catch (error) {
      console.error(error);
  } finally {
      await session.close();
      await driver.close();
  }
}