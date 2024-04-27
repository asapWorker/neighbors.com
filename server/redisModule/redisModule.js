const redis = require('redis');

module.exports.cacheUserAnnouncement = async function (role, announcement) {
    // Подключение к Redis
    const client = redis.createClient();

    try {
      client.on('connect', () => {
        client.set("role", role);
        client.set("announcement", JSON.stringify(announcement));
        console.log('Подключение к Redis установлено');
      });
    } catch (error) {
      client.on('error', (error) => {
        console.error('Ошибка подключения к Redis:', error);
    });
    } finally {
        client.quit(); // Закрыть соединение с Redis
    }
}
