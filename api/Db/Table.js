function table(client) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS log (
      id SERIAL PRIMARY KEY,
      time TEXT NOT NULL
    )
  `;

  client.query(createTableQuery, (err, res) => {
    if (err) {
      console.error('Tablo oluşturulurken hata oluştu: ' + err.message);
    } else {
      console.log('Tablo başarıyla oluşturuldu.');
    }
  });
}

module.exports = table;
