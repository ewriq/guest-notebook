const { Client } = require('pg');

function conn() {
  const client = new Client({
    user: 'neondb_owner',
    host: 'ep-gentle-meadow-a2206mla-pooler.eu-central-1.aws.neon.tech', 
    database: 'neondb',             
    password: 'npg_uVkG8QMbdKX5',   
    port: 5432,                   
    ssl: { rejectUnauthorized: false } 
  });

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
