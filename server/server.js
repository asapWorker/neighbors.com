const express = require("express");
const app = express();
cors = require("cors");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = 8080;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

/* демонстрационные данные */

// список объявлений о человеке
const personsList = [
  {
    id: "11",
    name: "Александр Петров",
    age: 23,
    sex: "Male",
    money: 20000,
    mark: 0
  },

  {
    id: "22",
    name: "Мария Иванова",
    age: 30,
    sex: "Female",
    money: 30000,
    mark: 3.1
  },

  {
    id: "33",
    name: "Дарья Сергеева",
    age: 22,
    sex: "Female",
    money: 40000,
    mark: 4.6
  },

  {
    id: "44",
    name: "Александра Петрова",
    age: 40,
    sex: "Female",
    money: 20000,
    mark: 0
  },

  {
    id: "55",
    name: "Мария Сидорова",
    age: 18,
    sex: "Female",
    money: 10000,
    mark: 4.3
  },

  {
    id: "66",
    name: "Виктор Савельев",
    age: 30,
    sex: "Male",
    money: 15000,
    mark: 3.2
  },
];

// список объявлений о жилье
const housesList = [
  {
    id: "1",
    address: "Профсоюзная 83, к2",
    sex: "Any",
    metro: ["Беляево"],
    money: 2200,
    mark: 2.8,
    marks: 3
  },

  {
    id: "2",
    address: "Профсоюзная 105",
    sex: "Any",
    metro: ["Беляево", "Новые черемушки"],
    money: 2200,
    mark: 4.3,
    marks: 2
  },

  {
    id: "3",
    address: "Профсоюзная 4",
    sex: "Any",
    metro: ["Октябрьская"],
    money: 2200,
    mark: 3.2,
    marks: 3
  },

  {
    id: "4",
    address: "Профсоюзная 4",
    sex: "Any",
    metro: ["Октябрьская"],
    money: 3300,
    mark: 4.8,
    marks: 2
  },

  {
    id: "5",
    address: "Профсоюзная 102",
    sex: "Male",
    metro: ["Коньково", "Беляево", "Новые черемушки"],
    money: 2200,
    mark: 3.6,
    marks: 4
  },

  {
    id: "6",
    address: "Профсоюзная 104а",
    sex: "Female",
    metro: ["Коньково", "Беляево", "Комсомольская"],
    money: 2200,
    mark: 4.1,
    marks: 5
  },
];

/* get запросы */
// получение урезанных списков, ищущих жилье или ищущих соседа
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.query.target === "person-list") {
    res.end(JSON.stringify(personsList));
  } else {
    res.end(JSON.stringify(housesList));
  }
});

// получение списка имен людей
app.get("/bounded", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(personsList.map(item => item.name)));
});

// получение дополнительных данных для конкретного пользователя или жилья
app.get("/item", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const itemType = req.query.item;
  const id = req.query.id;

  if (itemType === "person") {
    res.end(
      JSON.stringify({
        mark: 5,
        attitudeTowardSmoking: "Neutral",
        boundedItems: ["Мария"]
      })
    );
  } else {
    res.end(
      JSON.stringify({
        mark: 5,
        type: "Dorm",
        smokingAllowed: false,
        boundedItems: ["Мария"]
      })
    )
  }
});

// удаление объявления
app.post("/item/delete", (req, res) => {
  const itemType = req.query.item;
  const id = req.query.id;

  res.end();
})

// изменение поля
app.post("item/change", (req, res) => {
  const itemType = req.query.item;
  const id = req.query.id;
  const field = req.query.field;
  const value = req.body;

  res.end();
})