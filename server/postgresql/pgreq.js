const db = require('../db')

module.exports.getAddresses = async function() {
    const result = await db.query('SELECT * FROM addresses');
    return JSON.stringify(result);
};

module.exports.getUsers = async function() {
    const result = await db.query('SELECT * FROM user_announcements');
    return JSON.stringify(result);
};

module.exports.getUsersInfo = async function() {
    const result = await db.query('SELECT id, login FROM users');
    return JSON.stringify(result[0]);
};