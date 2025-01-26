const { Client } = require('pg');

function conn() {
  const client = new Client({
    user: 'neondb_owner',          // PostgreSQL kullanıcı adı
    host: 'ep-gentle-meadow-a2206mla-pooler.eu-central-1.aws.neon.tech',  // PostgreSQL host
    database: 'neondb',             // PostgreSQL veritabanı adı
    password: 'npg_uVkG8QMbdKX5',   // PostgreSQL şifresi
    port: 5432,                    // PostgreSQL portu (genellikle 5432)
    ssl: { rejectUnauthorized: false }  // SSL bağlantısı için
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
