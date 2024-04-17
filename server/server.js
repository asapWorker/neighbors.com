require('dotenv').config()
const express = require("express");
cors = require("cors");
const models = require('./models/models.js')
const data = require('./models/data.js')
const multer = require('multer');

const sequelize = require('./db.js')
const app = express();

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const upload = multer();
const e = require("express");

const PORT = 8080;

const start = async () => {
  try {
      await sequelize.authenticate()
      await sequelize.sync()
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
      console.log(e)
  }
}

start()

// временные данные
const { personsList, housesList, clients } = require("./tempData");



//neo4j
const { getClientsNames, addOrUpdateConnection, updateRating, deleteConnection, getItems } = require("./neo4jModule/neo4jModule");



/* Запросы */

/* get запросы */
// получение урезанных списков, ищущих жилье или ищущих соседа
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.query.target === "person-list") {
    res.end(JSON.stringify(personsList)); // см. personsList
  } else {
    res.end(JSON.stringify(housesList)); // см. housesList
  }
});

// получение списка логинов, id клиентов
app.get("/bounded", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(clients.map(item => {
    return {
      login: item.login,
      id: item.id
    }
  })));
});

// получение дополнительных данных для конкретного пользователя или жилья
app.get("/item", (req, res) => {
  res.setHeader("Content-Type", "application/json");


  // временные данные
  const itemType = req.query.item;
  const itemId = req.query.id; // id объявления человека или жилья

  let result = null;

  if (itemType === "person") {
    result = { // дополнитльные данные для person
      mark: 5,
      attitudeTowardSmoking: "Neutral",
      boundedItems: [],
      animals: true
    }
  } else {
    result = { // дополнительные данные для house
      mark: 5,
      type: "Dorm",
      smokingAllowed: false,
      boundedItems: [],
      animals: false
    }
  }

  getClientsNames(itemId).then((boundedItems) => {
    result.boundedItems = boundedItems;
  }).catch(() => {
    result.boundedItems = [];
  }).finally(() => {
    res.end(JSON.stringify(result));
  })
});

// получение данных объявления для страницы личного кабинета
app.get("/person/item", (req, res) => {
  const clientId = req.query.id
  

  let answer = { // объявление для жилья в личном кабинете
    announcement: "house",
    type: "Dorm",
    id: "6",
    address: "Профсоюзная 104а",
    sex: "Female",
    metro: ["Коньково", "Беляево", "Комсомольская"],
    money: 2200,
    animals: true
  }

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

  res.end(JSON.stringify(answer));
})

// получение списка оценок жилья и людей конкретного пользователя
app.get("/marks", upload.any(), (req, res) => {
  const clientId = req.query.id;

  getItems(clientId).then((items) => {
    res.end(JSON.stringify(items));
  })
})


/* POST запросы */
// удаление объявления
app.post("/item/delete", (req, res) => {
  const itemType = req.query.item; // house | person
  const itemId = req.query.id;

  res.end();
})

// изменение поля
app.post("/item/change", upload.any(), (req, res) => {

  const itemType = req.query.item; // house | person
  const field = req.query.field; // field name
  const id = req.body.id; // house | person id
  // Дом: address | metro | sex | money | type | smoking | animals | bounded-items
  // Человек: name | age | sex | money | attitude-toward-smoking | animals | bounded-items
  const value = req.body.value;

  if (field === "bounded-items") {
    const clientObj = {
      id: value.item.id,
      name: value.item.login,
      type: "client"
    }
    const rating = value.rating;

    if (rating < 0) {
      deleteConnection(clientObj.id, id).finally(() => {
        res.end();
      })
    } else {
      // временные
      const list = new Map(Object.entries(itemType === "house" ? housesList : personsList).map((item) => {
        return [item[1].id, item[1]]
      }));
      const obj = list.get(id);
      const itemObj = {
        id,
        name: (itemType === "house") ? obj.address : obj.name,
        type: itemType
      }

      addOrUpdateConnection(clientObj, itemObj, "relation", rating).finally(() => {
        res.end();
      })
    }
  } else {
    res.end();
  }
})

// Обработка входа
app.post("/enter", upload.any(), (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  if (login === "admin") {
    res.end(JSON.stringify({
      id: "11",
      type: "Admin"
    }))
  } else if (login === "client") {
    res.end(JSON.stringify({
      id: "22",
      type: "Client",
      house: true,
      person: false
    }))
  } else {
    return res.end(null)
  }
})

// обработка регистрации
app.post("/registrate", upload.any(), (req, res) => {

  res.end();
})

// обработка добавления нового объявления
app.post("/new-item", upload.any(), (req, res) => {
  res.end();
})

// изменение оценки жилья или человека конкретным пользователем
app.post("/change/mark", upload.any(), (req, res) => {
  const clientId = req.body.idClient;
  const itemId = req.body.idItem;
  const mark = req.body.mark;

  updateRating(clientId, itemId, mark).finally(() => {
    res.end();
  })
})
