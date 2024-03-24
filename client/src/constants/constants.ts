// user
export const enum User {
  Guest = "guest",
  Client = "user",
  Admin = "admin",
}

// short item
export enum Sex {
  Male = "муж",
  Female = "жен",
  Any = "любой",
}

export const enum SortBy {
  Ascending = "по возрастанию",
  Decending = "по убываю",
}

/* house types */
export enum HouseType {
  Dorm = "общежитие",
  Apartment = "квартира",
  CommunalApartment = "коммуналка",
  PrivateHouse = "частный дом",
}

/* person attitude toward smoking */
export enum AttitudeTowardSmoking {
  Smoking = "курю",
  NoSmoking = "не курю",
  Neutral = "нейтральное",
}

export const enum YesNo {
  Yes = "да",
  No = "нет"
}

/* arrays */
export const sexes = [Sex.Any, Sex.Male, Sex.Female];

export const personSexes = [Sex.Male, Sex.Female];

export const houseTypes = [
  HouseType.Dorm,
  HouseType.Apartment,
  HouseType.CommunalApartment,
  HouseType.PrivateHouse,
];

export const attitudesTowardSmoking = [
  AttitudeTowardSmoking.Neutral,
  AttitudeTowardSmoking.NoSmoking,
  AttitudeTowardSmoking.Smoking,
];

export const YesNoAnswers = [
  YesNo.Yes,
  YesNo.No
]

export const Metros = [
  "Беляево",
  "Октябрьская",
  "Новые Черемушки",
  "Теплый Стан",
  "Комсомольская"
]
