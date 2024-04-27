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

module.exports.getUserLogin = async function(id) {
    const result = await db.query(`SELECT login FROM users WHERE id = '${id}'`);
    return (result[0][0].login);
}

module.exports.getItemId = async function(isHouse, announcement) {
    let result = 0;
    let params = [];

    for ([key,value] of Object.entries(announcement)) {
        params.push(`${key} = ${value}`);
    }

    params = params.join(" AND ");

    if (isHouse) {
        result = await db.query(`SELECT id FROM house_announcements WHERE ${params}`)
    } else {
        result = await db.query(`SELECT id FROM user_announcements WHERE ${params}`)
    }

    return result[0][0].id;
}


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

module.exports.getHousesInfo = async function() {
    const result = await db.query(`
    SELECT 
        addresses.id, 
        CONCAT(addresses.street, ' ', addresses.house_num, ', кв.', addresses.flat, ', регион ', regions.name, ', г.', cities.city_name) as address
    FROM 
        addresses
    JOIN 
        regions ON regions.id = addresses.regionid
    JOIN 
        cities ON cities.id = addresses.cityid`);
    return result[0];
};

module.exports.getAllInfoUsers = async function(userid) {
    const result = await db.query(`
        SELECT 
            'person' AS type,
            user_announcements.id,
            CONCAT(user_announcements.first_name, ' ', user_announcements.second_name) AS name,
            user_announcements.age,
            user_genders.gender as sex,
            user_announcements.payment as money,
            animals.allowed as animals
        FROM 
            user_announcements
        JOIN 
            user_genders ON user_genders.id = user_announcements.userGenderId
        JOIN 
            animals ON animals.id = user_announcements.animalid
        WHERE
            user_announcements.id = :userid
    `, { replacements: { userid } });
    return result[0].map((item) => {
        return {
            ...item,
            money: Number(item.money),
            sex: item.sex[0].toUpperCase() + item.sex.slice(1)
        }
    })[0];
}

module.exports.getAllInfoHouses = async function(itemid) {
    const result = await db.query(`
        SELECT 
            'house' AS announcement,
            house_types.name as type,
            house_announcements.id,
            CONCAT(addresses.street, ' ', addresses.house_num) AS address,
            house_genders.gender as sex,
            metros.name as metro,
            house_announcements.payment as money,
            animals.allowed as animals
        FROM 
            house_announcements
        JOIN 
            house_types ON house_types.id = house_announcements.housetypeid
        JOIN 
            addresses ON addresses.id = house_announcements.addressId
        JOIN 
            house_genders ON house_genders.id = house_announcements.houseGenderId
        JOIN 
            metros ON metros.id = house_announcements.metroId
        JOIN 
            animals ON animals.id = house_announcements.animalid
        WHERE
            house_announcements.id = :itemid
    `, { replacements: { itemid } });
    return result[0].map((item) => {
        return {
            ...item,
            money: Number(item.money),
            sex: item.sex[0].toUpperCase() + item.sex.slice(1)
        }
    })[0];
}

module.exports.getUserEnter = async function(login, password) {
    const result = await db.query(`
        SELECT 
            users.id,
            CASE 
                WHEN users.role = 'user' THEN 'Client'
                WHEN users.role = 'admin' THEN 'Admin'
            END AS type,
            CASE 
                WHEN users.role = 'user' THEN (CASE WHEN house_announcements.userid = users.id THEN true ELSE false END)
                END AS house,
            CASE 
                WHEN users.role = 'user' THEN (CASE WHEN user_announcements.userid = users.id THEN true ELSE false END)
                END AS person
        FROM 
            users
        LEFT JOIN 
            house_announcements ON users.id = house_announcements.userid
        LEFT JOIN 
            user_announcements ON users.id = user_announcements.userid
        WHERE login = :login AND password = :password
    `, { replacements: { login, password } });
    
    return result[0][0];
};

module.exports.deleteUserAnnouncement = async function(announcementId) {
    const result = await db.query(`
        DELETE FROM user_announcements
        WHERE user_announcements.id = :announcementId
    `, { replacements: { announcementId } });
};

module.exports.deleteHouseAnnouncement = async function(announcementId) {
    const result = await db.query(`
        DELETE FROM house_announcements
        WHERE house_announcements.id = :announcementId
    `, { replacements: { announcementId }});
};

module.exports.getMetroList = async function() {
    const result = await db.query("SELECT id, name FROM metros");
    return (result[0]);
};

module.exports.updateRatings = async function(isHouse, itemId, rating, count) {
    let announcementTableName = isHouse ? 'house_announcements' : 'user_announcements';
    let ratingIdColumnName = isHouse ? 'houseratingid' : 'userratingid';
    let typeRating = isHouse ? 'house_ratings' : 'user_ratings';

    const curRatingIdQuery = await db.query(`
        SELECT ${ratingIdColumnName} FROM ${announcementTableName}
    `)

    const curRatingId = curRatingIdQuery[0][0][`${ratingIdColumnName}`];

    if (curRatingId === "0" && rating === 0 && count === 0) {
        return true;
    } else if (curRatingId !== "0") {
        const deleteRatingRequest = await db.query(`
            DELETE FROM ${typeRating} WHERE ${typeRating}.id = ${curRatingId}
        `);
    }

    if (rating === 0 && count === 0) {
        const result = await db.query(`
            UPDATE ${announcementTableName}
            SET ${ratingIdColumnName} = ${0}
            WHERE ${announcementTableName}.id = '${itemId}'
        `);

        return result[0];
    } else {
        const ratingResult = await db.query(`
            INSERT INTO ${typeRating} (average_rating, count)
            VALUES (${rating}, ${count})
            RETURNING id`
        );

        const ratingId = ratingResult[0][0].id;
        
        const result = await db.query(`
            UPDATE ${announcementTableName}
            SET ${ratingIdColumnName} = ${ratingId}
            WHERE ${announcementTableName}.id = ${itemId}
        `);

        return result[0];
    }
};

module.exports.updateFields = async function(isHouse, itemId, field, value) {
    let announcementTableName = isHouse ? 'house_announcements' : 'user_announcements';
    const result = await db.query(`
        UPDATE ${announcementTableName}
        SET ${field} = :value
        WHERE ${announcementTableName}.id = :itemId
    `, { replacements: { itemId, value } });
    return result[0];
};

module.exports.addAnnouncement = async function(isHouse, data) {
    let announcementTableName = isHouse ? 'house_announcements' : 'user_announcements';

    const columns = Object.keys(data).join(', ');
    const values = Object.values(data); 
    const placeholders = Array(values.length).fill('?').join(', ');

    const query = `
        INSERT INTO ${announcementTableName} (${columns})
        VALUES (${placeholders})
    `;

    const result = await db.query(query, { replacements: values });

    return result[0];
};

module.exports.registerUser = async function(login, password) {
    const query = `
        INSERT INTO users (login, password, role)
        VALUES (?, ?, 'user')
        RETURNING id;
    `;
    const result = await db.query(query, { replacements: [login, password] });
    return result[0][0].id;
};