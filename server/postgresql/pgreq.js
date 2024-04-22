const db = require('../db')

module.exports.getHouses = async function() {
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
            addresses ad ON ad.id = ha.addressId
        JOIN 
            house_genders hg ON hg.id = ha.houseGenderId
        JOIN 
            metros ON metros.id = ha.metroId
        JOIN 
            house_ratings hr ON hr.id = ha.houseRatingId
    `);

    console.log(result);

    return result[0].map((item) => {
        return {
            ...item,
            money: Number(item.money),
            sex: item.sex[0].toUpperCase() + item.sex.slice(1)
        }
    });
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

    return result[0].map((item) => {
        return {
            ...item,
            money: Number(item.money),
            sex: item.sex[0].toUpperCase() + item.sex.slice(1)
        }
    });
};

module.exports.getUsersInfo = async function() {
    const result = await db.query("SELECT id, login FROM users WHERE role = 'user'");
    return (result[0]);
};


module.exports.getAdditionalInfoHouses = async function(itemId) {
    const result = await db.query(`
        SELECT 
            hr.average_rating as mark,
            ht.name as type,
            CASE 
            WHEN smoking.preference = 'Smoking' THEN true
            WHEN smoking.preference = 'Neutral' THEN true
            WHEN smoking.preference = 'NoSmoking' THEN false
            ELSE null 
            END as smokingAllowed,
            animals.allowed as animals
        FROM 
            house_announcements
        JOIN 
            smoking ON smoking.id = house_announcements.smokingid
        JOIN 
            house_types ht ON ht.id = house_announcements.housetypeid
        JOIN 
            animals ON animals.id = house_announcements.animalid
        JOIN 
            house_ratings hr ON hr.id = house_announcements.houseRatingId
            WHERE
            house_announcements.id = :itemId
    `, { replacements: { itemId } });
    return result[0][0]
}

module.exports.getAdditionalInfoUsers = async function(userId) {
    const result = await db.query(`
        SELECT 
            ur.average_rating as mark,
            smoking.preference as smokingAllowed,
            animals.allowed as animals
        FROM 
            user_announcements
        JOIN 
            smoking ON smoking.id = user_announcements.smokingid
        JOIN 
            animals ON animals.id = user_announcements.animalid
        JOIN 
            user_ratings ur ON ur.id = user_announcements.userratingid
        WHERE
            user_announcements.id = :userId
    `, { replacements: { userId } });
    return result[0][0]
}