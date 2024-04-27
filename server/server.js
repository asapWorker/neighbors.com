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
  getUserLogin,
  getItemId,
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
  updateRatings, //запрос 10
  updateFields, //запрос 6
  addAnnouncement, // запрос 9 
  registerUser //запрос 8
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

// redis
const {
  cacheUserAnnouncement
} = require("./redisModule/redisModule.js");

/* -------------------------------- Функции для запросов к бд */

/* Запросы */

/* get запросы */
// получение урезанных списков, ищущих жилье или ищущих соседа
app.get("/", (req, res) => {

  getHouses().then((housesList) => {
    getUsers().then((personsList) => {

      housesList.map((item_h) => {
        getMarks(item_h.id).then((marks) => {
          const count_h = marks.length;
          const average_h = (!count_h) ? 0 : marks.reduce((sum = 0, mark) => {
            return sum + Number(mark);
          }) / count_h;

          updateRatings(true, item_h.id, average_h, count_h).then(() => {

            personsList.map((item_p) => {
              getMarks(item_p.id).then((marks_p) => {
                const count_p = marks_p.length;
                const average_p = (!count_p) ? 0 : marks.reduce((sum = 0, mark_p) => {
                  return sum + Number(mark_p);
                }) / count_p;
      
                updateRatings(false, item_p.id, average_p, count_p).then(() => {
                  res.end(JSON.stringify([personsList, housesList]));
                })
              })
            })
          })
        })
      })

    })
  })

  //res.end(JSON.stringify([[], []]));
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
      const type = itemData.type;
      const id = itemData.id;

      if (type === "house") {
        getAllInfoHouses(id).then((h) => {
          res.end(JSON.stringify(h));
        })
      } else {
        getAllInfoUsers(id).then((u) => {
          res.end(JSON.stringify(u));
        })
      }
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

// получение списка логинов, id клиентов
app.get("/bounded", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  getUsersInfo().then((clients) => {
    res.end(JSON.stringify(clients))
  })
});

// получение списка оценок жилья и людей конкретного пользователя
app.get("/marks", upload.any(), (req, res) => {
  const clientId = req.query.id;

  getItems(clientId).then((items) => {
    res.end(JSON.stringify(items));
  });
});

// получение списка адресов
app.get("/addresses", (req, res) => {
  getHousesInfo().then((addresses) => {
    res.end(JSON.stringify(addresses));
  })
})

app.get("/metros", (req, res) => {
  getMetroList().then((metros) => {
    res.end(JSON.stringify(metros));
  })
})

/* POST запросы */
// обработка добавления нового объявления
app.post("/new-item", upload.any(), (req, res) => {
  const obj = req.body;
  const isHouse = obj.target === "house";

  let announcement = {};

  const clientObj = {
    type: "client",
    id: obj.id
  }

  const itemObj = {
    type: obj.target
  }

  if (isHouse) {
    announcement = {
      addressid: obj.address,
      houseratingid: 0,
      userid: obj.id,
      housetypeid: obj.type,
      housegenderid: obj.sex,
      smokingid: obj.smoking,
      animalid: obj.animals,
      metroid: obj.metro,
      payment: obj.money
    }
  } else {
    const names = obj.name.split(' ');
    if (names.length < 2) {
      names.push("");
    }

    announcement = {
      ["first_name"]: names[0],
      ["second_name"]: names[1],
      age: obj.age,
      payment: obj.money,
      userratingid: 0,
      animalid: obj.animals,
      smokingid: obj.smoking,
      usergenderid: obj.sex,
      userid: obj.id
    }
  }

  addAnnouncement(isHouse, announcement).then(() => {
    getItemId(isHouse, announcement).then((itemId) => {
      getUserLogin(clientObj.id).then((userName) => {
        itemObj.name = obj.item;
        itemObj.id = itemId;

        clientObj.name = userName;

        addOrUpdateConnection(clientObj, itemObj, "relation", 0, obj.usertype === "user").then(() => {
          res.end();
        })
      })
    })
  })
});

// удаление объявления
app.post("/item/delete", (req, res) => {
  const itemType = req.query.item; // house | person
  const itemId = req.query.id;

  deleteNode(itemId).then(() => {
    if (itemType === "house") {
      deleteHouseAnnouncement(itemId).then(() => {
        res.end();
      })
    } else {
      deleteUserAnnouncement(itemId).then(() => {
        res.end();
      })
    }
  });

});

// выбор объявления
app.post("/item/choose", upload.any(), (req, res) => {
  const itemType = req.query.type; // house | person

  const userData = req.body.user;
  const itemData = req.body.itemData;

  getUsersInfo().then((list) => {

    const userName = new Map(list.map(({id, login}) => {
      return [id, login];
    })).get(userData.id);

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

  })
});

// изменение поля
app.post("/item/change", upload.any(), (req, res) => {
  const itemType = req.query.item; // house | person
  const field = req.query.field; // field name
  const itemData = req.body.itemData; // item

  const value = req.body.value;

  if (field === "bounded-items") {
    const clientObj = {
      id: value.item.id,
      name: value.item.name,
      type: "client",
    };
    const rating = value.rating;

    const itemObj = {
      id: itemData.id,
      name: itemType === "house" ? itemData.address : itemData.name,
      type: itemType,
    };

    addOrUpdateConnection(clientObj, itemObj, "relation", Number(rating)).then(() => {
      res.end(JSON.stringify(true));
    })
    
  } else {

    const isHouse = itemType === "house";

    if (field === "name") {
      const names = value.split(' ');
      if (names.length < 2) {
        names.push("");
      }

      updateFields(isHouse, itemData.id, "first_name", names[0]).then(() => {
        updateFields(isHouse, itemData.id, "second_name", names[1]).then(() => {
          res.end(JSON.stringify(true));
        })
      })
    } else {

      updateFields(isHouse, itemData.id, field, value).then(() => {
        res.end(JSON.stringify(true));
      })
    }
  }
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

// Обработка входа
app.post("/enter", upload.any(), (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  getUserEnter(login, password).then((r) => {
    
    if (!r) {
      res.end(JSON.stringify(r));
      return;
    }

    r.house = false;
    r.person = false;

    getActiveItem(r.id).then((val) => {
      if (!val) return;

      if (val.type === "house") {
        r.house = true;
      } else if (val.type === "person") {
        r.person = true;
      }
    })

    res.end(JSON.stringify(r));
  })
});

// обработка регистрации
app.post("/registrate", upload.any(), (req, res) => {

  const obj = req.body;
  registerUser(obj.login, obj.password).then(() => {
    res.end();
  })
});
