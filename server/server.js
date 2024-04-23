require("dotenv").config();
const express = require("express");
cors = require("cors");
const models = require("./models/models.js");
//const data = require("./models/data.js");
const multer = require("multer");

const sequelize = require("./db.js");
const app = express();

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const upload = multer();
const e = require("express");

const PORT = 8080;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

// временные данные
const { personsList, housesList, clients } = require("./tempData");

/* Функции для запросов к бд ---------------------------------*/

// postgresql
const { 
  getHouses,
  getUsers, 
  getUsersInfo, 
  getAdditionalInfoHouses, 
  getAdditionalInfoUsers,
  getHousesInfo, //запрос 11
  getAllInfoUsers, //запрос 4
  getAllInfoHouses, // запрос 4
  getUserEnter, //запрос 7
  deleteUserAnnouncement, //запрос 5
  deleteHouseAnnouncement, //запрос 5
  getMetroList, //запрос 12
  updateRatings //запрос 10
} = require("./postgresql/pgreq.js");

// neo4j
const {
  getClientsNames,
  addOrUpdateConnection,
  updateRating,
  getItems,
  deleteNode,
  getActiveItem,
  getMarks
} = require("./neo4jModule/neo4jModule");

/* -------------------------------- Функции для запросов к бд */

/* Запросы */

/* get запросы */
// получение урезанных списков, ищущих жилье или ищущих соседа
app.get("/", (req, res) => {
  const userid = 4
  const houseid = 2
  const log = 'user1@gmail.com'
  const pass = '1234'
  const announcementId = 7
  /*
  getHousesInfo().then((res) => {
    console.log(res);
  })
  getAllInfoUsers(userid).then((res) => {
    console.log(res);
  })
  getAllInfoHouses(houseid).then((res) => {
    console.log(res);
  })
  getUserEnter(log, pass).then((res) => {
    console.log(res);
  })
  deleteUserAnnouncement(announcementId).then((res) => {
    console.log(res);
  })
  deleteHouseAnnouncement(announcementId).then((res) => {
    console.log(res);
  })
  */
  getMetroList().then((res) => {
    console.log(res);
  })

  updateRatings(true, 9, 4, 7).then((res) => {
    console.log(res);
  })

  /*getHouses().then((housesList) => {
    getUsers().then((personsList) => {
      res.end(JSON.stringify([personsList, housesList]))
    })
  })*/

  res.end(JSON.stringify([[], []]));
});

// получение списка логинов, id клиентов
app.get("/bounded", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  getUsersInfo().then((clients) => {
    res.end(JSON.stringify(clients))
  })
});

// получение дополнительных данных для конкретного пользователя или жилья
app.get("/item", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // временные данные
  const itemType = req.query.item;
  const itemId = req.query.id; // id объявления человека или жилья

  let result = null;

  if (itemType === "person") {
    getAdditionalInfoUsers(itemId).then((info) => {
      result = {
        ...info,
        boundedItems: [],
      };

      getClientsNames(itemId)
      .then((boundedItems) => {
        result.boundedItems = boundedItems;
      })
      .catch(() => {
        result.boundedItems = [];
      })
      .finally(() => {
        res.end(JSON.stringify(result));
      });
    })
  } else {
    getAdditionalInfoHouses(itemId).then((info) => {
      result = {
        ...info,
        boundedItems: [],
      }

      getClientsNames(itemId)
      .then((boundedItems) => {
        result.boundedItems = boundedItems;
      })
      .catch(() => {
        result.boundedItems = [];
      })
      .finally(() => {
        res.end(JSON.stringify(result));
      });
    })
  }
});

// получение данных объявления для страницы личного кабинета
app.get("/person/item", (req, res) => {
  const clientId = req.query.id;

  getActiveItem(clientId).then((itemData) => {
    if (!itemData) {
      res.end(JSON.stringify(null));
    } else {
      // временный код
      let answer = {
        // объявление для жилья в личном кабинете
        announcement: "house",
        type: "Dorm",
        id: "6",
        address: "Профсоюзная 104а",
        sex: "Female",
        metro: ["Коньково", "Беляево", "Комсомольская"],
        money: 2200,
        animals: true,
      };

      res.end(JSON.stringify(answer));
    }
  });

  /*
  {
    type: "person",
    id: "6",
    name: "Мария Новикова",
    age: 23,
    sex: "Female | Male",
    money: 30000,
    animals: false
  }
  */
});

// получение списка оценок жилья и людей конкретного пользователя
app.get("/marks", upload.any(), (req, res) => {
  const clientId = req.query.id;

  getItems(clientId).then((items) => {
    res.end(JSON.stringify(items));
  });
});

/* POST запросы */
// удаление объявления
app.post("/item/delete", (req, res) => {
  const itemType = req.query.item; // house | person
  const itemId = req.query.id;

  deleteNode(itemId).then(() => {
    res.end();
  });
});

// выбор объявления
app.post("/item/choose", upload.any(), (req, res) => {
  const itemType = req.query.type; // house | person

  const userData = req.body.user;
  const itemData = req.body.itemData;

  // временный код
  const userName = new Map(clients.map((c) => [c.id, c.login])).get(
    userData.id
  );

  const clientObj = {
    id: userData.id,
    name: userName,
    type: "client",
  };

  const itemObj = {
    id: itemData.id,
    name: itemType === "house" ? itemData.address : itemData.name,
    type: itemType,
  };

  addOrUpdateConnection(clientObj, itemObj, "relation", 0, true).then(() => {
    res.end();
  });
});

// изменение поля
app.post("/item/change", upload.any(), (req, res) => {
  const itemType = req.query.item; // house | person
  const field = req.query.field; // field name
  const itemData = req.body.itemData; // item
  // Дом: address | metro | sex | money | type | smoking | animals | bounded-items
  // Человек: name | age | sex | money | attitude-toward-smoking | animals | bounded-items
  const value = req.body.value;

  if (field === "bounded-items") {
    const clientObj = {
      id: value.item.id,
      name: value.item.login,
      type: "client",
    };
    const rating = value.rating;

    const itemObj = {
      id: itemData.id,
      name: itemType === "house" ? itemData.address : itemData.name,
      type: itemType,
    };

    addOrUpdateConnection(clientObj, itemObj, "relation", rating).then(
      () => {
        getMarks(itemObj.id).then((marks) => {

          const num = marks.length;
          const average = (!num) ? 0 : marks.reduce((accum, cur) => {
            return accum +cur;
          }) / num

          res.end(JSON.stringify(average));
        })
      }
    );
  } else {
    res.end(JSON.stringify(null));
  }
});

// Обработка входа
app.post("/enter", upload.any(), (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  if (login === "admin") {
    res.end(
      JSON.stringify({
        id: "111",
        type: "Admin",
      })
    );
  } else if (login === "client") {
    res.end(
      JSON.stringify({
        id: "222",
        type: "Client",
        house: true,
        person: false,
      })
    );
  } else {
    return res.end(null);
  }
});

// обработка регистрации
app.post("/registrate", upload.any(), (req, res) => {
  res.end();
});

// обработка добавления нового объявления
app.post("/new-item", upload.any(), (req, res) => {
  res.end();
});

// изменение оценки жилья или человека конкретным пользователем
app.post("/change/mark", upload.any(), (req, res) => {
  const clientId = req.body.idClient;
  const itemId = req.body.idItem;
  const mark = req.body.mark;

  updateRating(clientId, itemId, mark).finally(() => {
    res.end();
  });
});
