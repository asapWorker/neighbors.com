const { User, User_announcement, User_gender, User_rating, Metro, House_announcement, 
    House_gender, 
    House_rating, 
    House_type,
    Flat,
    Address, 
    Region,
    Cities,
    Animals,
    Smoking } = require('./models.js');

      (async () => {
        try {
          const usersData = [
            { password: '1234', login: 'user1@gmail.com', role: 'user' },
            { password: '5678', login: 'user2@gmail.com', role: 'admin' },
            { password: '8910', login: 'user3@gmail.com', role: 'admin' },
          ];
          for (const userData of usersData) {
            const user = await User.create(userData);
            console.log('User added successful:', user.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with user:', error);
        }
      })();

      (async () => {
        try {
          const animalsData = [
            { allowed: true},
            { allowed: false},
          ];
          for (const animalData of animalsData) {
            const animal = await Animals.create(animalData);
            console.log('Animal added successful:', animal.toJSON());
          }          
        } 
          catch (error) {
          console.error('Error with animalsData:', error);
        }
      })();


      (async () => {
        try {
          const housegender = [
            { gender: 'male'},
            { gender: 'female'},
          ];
          for (const housegenders of housegender) {
            const house_gender = await House_gender.create(housegenders);
            console.log('House_gender added successful:', house_gender.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with housegender:', error);
        }
      })();

      
      (async () => {
        try {
          const usergender = [
            { gender: 'female'},
            { gender: 'male'},
          ];
          for (const usergenders of usergender) {
            const user_gender = await User_gender.create(usergenders);
            console.log('User_gender added successful:', user_gender.toJSON());
          }          
        } 
          catch (error) {
          console.error('Error with usergender:', error);
        }
      })();

      
      (async () => {
        try {
          const userating = [
            { average_rating: 4.8, count: 4},
            { average_rating: 3.5, count: 9},
            { average_rating: 2.3, count: 1},
          ];
          for (const useratings of userating) {
            const user_rating = await User_rating.create(useratings);
            console.log('User_rating added successful:', user_rating.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with userating:', error);
        }
      })();

      
      (async () => {
        try {
          const smokingData = [
            { preference: 'Neutral'},
            { preference: 'Smoking'},
            { preference: 'NoSmoking'},
          ];
          for (const smokeData of smokingData) {
            const smoking = await Smoking.create(smokeData);
            console.log('Smoking added successful:', smoking.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with smokingData:', error);
        }
      })();

      
      (async () => {
        try {
          const userannouncement = [
            { first_name: 'Елена', second_name: 'Шумилова', age: 25, payment: 30000, userRatingId: 1, animalId: 1, smokingId: 1, userGenderId: 1, userId: 1},
            { first_name: 'Инна', second_name: 'Гриневич', age: 20, payment: 15000, userRatingId: 2, animalId: 2, smokingId: 2, userGenderId: 1, userId: 2},
            { first_name: 'Егор', second_name: 'Метраков', age: 35, payment: 45000, userRatingId: 3, animalId: 1, smokingId: 1, userGenderId: 2, userId: 3},
          ];
          for (const userannouncements of userannouncement) {
            const user_announcements = await User_announcement.create(userannouncements);
            console.log('User_announcement added successful:',user_announcements.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with userannouncement:', error);
        }
      })();

      
      (async () => {
        try {   
          const region = [
            { name: 'Москва'},
            { name: 'Московская область'},
            { name: 'Свердловская область'},
          ];
          for (const regions of region) {
            const reg = await Region.create(regions);
            console.log('Region added successful:',reg.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with region:', error);
        }
      })();

      (async () => {
        try {
          const house_type = [
            {name: 'Flat'},
            {name: 'StudioFlat'},
            {name: 'Cottage'},
            {name: 'Dorm'},
            {name: 'CommunalFlat'},
          ];
          for (const house_types of house_type) {
            const htype = await House_type.create(house_types);
            console.log('House_type added successful:',htype.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with house_type:', error);
        }
      })();

      
      (async () => {
        try { 
          const houserating = [
            { average_rating: 5.0, count: 3},
            { average_rating: 3.2, count: 6},
            { average_rating: 4.8, count: 12},
          ];
          for (const houseratings of houserating) {
            const house_rating = await House_rating.create(houseratings);
            console.log('House_rating added successful:', house_rating.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with houserating:', error);
        }
      })();

      
      (async () => {
        try {
          const citydata = [
            { city_name: 'Москва', regionId: 1},
            { city_name: 'Подольск', regionId: 2},
            { city_name: 'Екатеринбург', regionId: 3},
          ];
          for (const city of citydata) {
            const cities = await Cities.create(city);
            console.log('citydata added successful:', cities.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with citydata:', error);
        }
      })();

      (async () => {
        try {
          const address = [
            {house_num: 82, flat: 10, regionId: 1, cityId: 1, street: 'Профсоюзная'},
            {house_num: 13, flat: 3, regionId: 1, cityId: 1, street: 'Черепановых'},
            {house_num: 24, flat: 9, regionId: 1, cityId: 1, street: 'Московская'},
            {house_num: 2, flat: 7, regionId: 1, cityId: 1, street: 'Академическая'},
            {house_num: 112, flat: 25, regionId: 1, cityId: 1, street: 'проспект 60-летия Октября'},
            {house_num: 72, flat: 90, regionId: 1, cityId: 1, street: 'Ленинский проспект'},
            {house_num: 84, flat: 19, regionId: 1, cityId: 1, street: 'Профсоюзная'},
            {house_num: 5, flat: 30, regionId: 1, cityId: 1, street: 'Светлый проезд'},
            {house_num: 10, flat: 15, regionId: 1, cityId: 1, street: 'Волоколамское шоссе'},
            {house_num: 18, flat: 17, regionId: 1, cityId: 1, street: 'Авангардная'},
            {house_num: 25, flat: 64, regionId: 1, cityId: 1, street: 'Шипиловская'},
            {house_num: 75, flat: 39, regionId: 1, cityId: 1, street: 'Профсоюзная'},
          ];
          for (const addresses of address) {
            const addres = await Address.create(addresses);
            console.log('addresses added successful:', addres.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with addresses:', error);
        }
      })();

      (async () => {
        try {
          const flat = [
            {number: 82, addressId: 1},
            {number: 19, addressId: 2},
            {number: 20, addressId: 3},
          ];
          for (const flats of flat) {
            const flatss = await Flat.create(flats);
            console.log('flat added successful:', flatss.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with flat:', error);
        }
      })();

      (async () => {
        try {
          const metro = [
            {name: 'Сокольники', sityId: 1},
            {name: 'Комсомольская', sityId: 1},
            {name: 'Ховрино', sityId: 1},
            {name: 'Беломорская', sityId: 1},
            {name: 'Беляево', sityId: 1},
            {name: 'Октябрькая', sityId: 1},
            {name: 'Академическая', sityId: 1},
            {name: 'ВДНХ', sityId: 1},
            {name: 'Речной вокзал', sityId: 1},
            {name: 'Домодедовская', sityId: 1},
            {name: 'Орехово', sityId: 1},
            {name: 'Люблино', sityId: 1},
            {name: 'Крымская', sityId: 1},
            {name: 'Коммунарка', sityId: 1},
            {name: 'Стрешнево', sityId: 1},
          ];
          for (const metros of metro) {
            const metr = await Metro.create(metros);
            console.log('metro added successful:', metr.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with metro:', error);
        }
      })();

      (async () => {
        try {
          const houseannouncement = [
            {payment: 25000, metroId: 1, addressId: 1, houseRatingId: 1, userId: 1, houseTypeId: 2, houseGenderId: 2, smokingId: 1, animalId: 1},
            {payment: 50000, metroId: 2, addressId: 3, houseRatingId: 2, userId: 2, houseTypeId: 3, houseGenderId: 2, smokingId: 2, animalId: 2},
            {payment: 15000, metroId: 3, addressId: 2, houseRatingId: 3, userId: 3, houseTypeId: 1, houseGenderId: 1, smokingId: 3, animalId: 2},
          ];
          for (const houseannouncements of houseannouncement) {
            const house_announcements = await House_announcement.create(houseannouncements);
            console.log('houseannouncement added successful:', house_announcements.toJSON());
          }
        } 
          catch (error) {
          console.error('Error with houseannouncement:', error);
        }
      })();



      


