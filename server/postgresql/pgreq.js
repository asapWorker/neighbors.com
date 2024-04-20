const db = require('../db')

class UserController{
    async getAddresses(req, res){
        const address = await db.query('SELECT * FROM addresses')
        res.json(address.rows)
    }
}

module.exports = new UserController()