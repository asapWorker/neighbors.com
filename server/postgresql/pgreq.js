const db = require('../db')

module.exports.getAddresses = async function() {
    const address = await db.query('SELECT * FROM addresses')
    return address;
}
