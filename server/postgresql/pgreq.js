const db = require('../db')

async function getAddresses(req, res){
    const address = await db.query('SELECT * FROM addresses')
    return address
}

async function fetchData() {
    try {
      const addresses = await getAddresses();
      console.log('Результаты запроса:', addresses);
    } catch (error) {
      console.error('Ошибка выполнения запроса:', error);
    } finally {
      client.end();
    }
  }

fetchData();