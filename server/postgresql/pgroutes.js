const Router = require('express')
const router = new Router()
const UserController = require('./pgreq')

router.get('./item', UserController.getAddresses)


module.exports = router