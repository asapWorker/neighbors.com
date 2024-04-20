const db = require('../db')

module.exports.getAddresses = async function() {
    const result = await db.query(`
        SELECT 
            ha.id,
            CONCAT(ad.street, ' ', ad.house_num, ', к', ad.flat) AS address,
            hg.gender as sex,
            metros.name as metro,
            ha.payment as money,
            hr.average_rating as mark,
            hr.count as marks
        FROM 
            house_announcements ha
        JOIN 
            addresses ad ON ad.id = ha.addressid
        JOIN 
            house_genders hg ON hg.id = ha.housegenderid
        JOIN 
            metros ON metros.id = ha.metroid
        JOIN 
            house_ratings hr ON hr.id = ha.houseratingid
    `);
    return result[0];
};

module.exports.getUsers = async function() {
    const result = await db.query(`
        SELECT 
            ua.id,
            CONCAT(ua.first_name, ' ', ua.second_name) AS name,
            ua.age,
            ua.payment as money,
            ur.average_rating as mark,
            ug.gender as sex
        FROM 
            user_announcements ua
        JOIN 
            user_ratings ur ON ur.id = ua.userRatingId
        JOIN 
            user_genders ug ON ug.id = ua.userGenderId
    `);
    return result[0];
};

module.exports.getUsersInfo = async function() {
    const result = await db.query('SELECT id, login FROM users');
    return (result[0]);
};