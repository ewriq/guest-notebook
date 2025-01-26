function Insert(client, id, time, callback) {
    const query = 'INSERT INTO log (id, time) VALUES ($1, $2)';
    
    client.query(query, [id, time], (err, res) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, 200);
    });
  }
  
  module.exports = Insert;
  