function Insert(client, name, time, callback) {
    const query = 'INSERT INTO log2 (name, time) VALUES ($1, $2)';
    
    client.query(query, [name, time], (err, res) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, 200);
    });
  }
  
  module.exports = Insert;
  