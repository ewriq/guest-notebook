const { Client } = require('pg');

function conn() {
  
 
  
  client.connect((err) => {
    if (err) {
      console.error('Veritabanına bağlanırken hata oluştu: ' + err.message);
    } else {
      console.log('Veritabanına başarıyla bağlanıldı.');
    }
  });
  
  return client;
}

module.exports = conn;
