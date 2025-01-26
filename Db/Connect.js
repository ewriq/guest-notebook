const sqlite3 = require('sqlite3').verbose();


function conn() {
  const db = new sqlite3.Database('db.db', (err) => {
    if (err) {
      console.error('Veritabanına bağlanırken hata oluştu: ' + err.message);
    } else {
      console.log('Veritabanına başarıyla bağlanıldı.');
    }
  });
  return db;
}

module.exports = conn;
