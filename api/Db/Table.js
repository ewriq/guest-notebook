// Tabloyu oluşturma fonksiyonu
function table(db) {
    db.run(`
      CREATE TABLE IF NOT EXISTS log (
        id INTEGER,
        time TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Tablo oluşturulurken hata oluştu: ' + err.message);
      } else {
        console.log('Tablo başarıyla oluşturuldu.');
      }
    });
  }
  
  module.exports = table;
  