const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const User_gender = sequelize.define('user_gender', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    gender: {type: DataTypes.STRING},
})

const User_rating = sequelize.define('user_rating', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    average_rating: {type: DataTypes.FLOAT},
    count: {type: DataTypes.BIGINT},
})

const Animals = sequelize.define('animals', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    allowed: {type: DataTypes.BOOLEAN},
})

const Smoking = sequelize.define('smoking', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    preference: {type: DataTypes.STRING},
})

const User_announcement = sequelize.define('user_announcement', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    second_name: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER},
    payment: {type: DataTypes.BIGINT},
})

const House_type = sequelize.define('house_type', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const House_gender = sequelize.define('house_gender', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    gender: {type: DataTypes.STRING},
})

const House_rating = sequelize.define('house_rating', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    average_rating: {type: DataTypes.FLOAT},
    count: {type: DataTypes.BIGINT},
})

const Metro = sequelize.define('metro', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const Cities = sequelize.define('cities', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    city_name: {type: DataTypes.STRING},
})

const Region = sequelize.define('region', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.FLOAT},
})

const Address = sequelize.define('address', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    street: {type: DataTypes.FLOAT},
    house_num: {type: DataTypes.BIGINT},
    flat: {type: DataTypes.BIGINT},
})

const Flat = sequelize.define('flat', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER},
})

const House_announcement = sequelize.define('house_announcement', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    payment: {type: DataTypes.BIGINT},
    metro: {type: DataTypes.STRING},
})

Region.hasMany(Cities)
Cities.belongsTo(Region)

Cities.hasMany(Metro)
Metro.belongsTo(Cities)

Region.hasMany(Address)
Address.belongsTo(Region)

Cities.hasMany(Address)
Address.belongsTo(Cities)

Address.hasMany(Flat)
Flat.belongsTo(Address)

Address.hasOne(House_announcement)
House_announcement.belongsTo(Address)

House_rating.hasOne(House_announcement)
House_announcement.belongsTo(House_rating)

User.hasOne(House_announcement)
House_announcement.belongsTo(User)

House_type.hasOne(House_announcement)
House_announcement.belongsTo(House_type)

House_gender.hasOne(House_announcement)
House_announcement.belongsTo(House_gender)

User_rating.hasOne(User_announcement)
User_announcement.belongsTo(User_rating)

Animals.hasOne(User_announcement)
User_announcement.belongsTo(Animals)

Smoking.hasOne(User_announcement)
User_announcement.belongsTo(Smoking)

User_gender.hasOne(User_announcement)
User_announcement.belongsTo(User_gender)

User.hasOne(User_announcement)
User_announcement.belongsTo(User)

Smoking.hasOne(House_announcement)
House_announcement.belongsTo(Smoking)

Animals.hasOne(House_announcement)
House_announcement.belongsTo(Animals)

House_announcement.hasMany(Metro)
Metro.belongsTo(House_announcement)

module.exports = {
    User,
    User_announcement,
    User_gender,
    User_rating,
    Metro,
    House_announcement,
    House_gender,
    House_rating, 
    House_type,
    Flat,
    Address, 
    Region,
    Cities,
    Animals,
    Smoking
}