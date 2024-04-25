// user
export enum User {
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
  Decending = "по убыванию",
}

/* house types */
export enum HouseType {
  Flat = "квартира",
  StudioFlat = "студия",
  Cottage = "загородный дом",
  Dorm = "общежитие",
  CommunalFlat = "коммуналка"
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
export const sexes = [Sex.Male, Sex.Female, Sex.Any];

export const personSexes = [Sex.Male, Sex.Female];

export const houseTypes = [
  HouseType.Flat,
  HouseType.StudioFlat,
  HouseType.Cottage,
  HouseType.Dorm,
  HouseType.CommunalFlat
];

export const attitudesTowardSmoking = [
  AttitudeTowardSmoking.Smoking,
  AttitudeTowardSmoking.NoSmoking,
  AttitudeTowardSmoking.Neutral,
];

export const YesNoAnswers = [
  YesNo.Yes,
  YesNo.No
]

export const Metros = [
  "Сокольники",
  "Комсомольская",
  "Ховрино",
  "Беломорская", 
  "Беляево", 
  "Октябрькая",
  "Академическая", 
  "ВДНХ", 
  "Речной вокзал", 
  "Домодедовская", 
  "Орехово", 
  "Люблино", 
  "Крымская", 
  "Коммунарка", 
  "Стрешнево"
]
