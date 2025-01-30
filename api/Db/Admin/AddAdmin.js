function AddAdmin(client, username, password, callback) {
    const query = 'INSERT INTO admin (username, password) VALUES ($1, $2)';
    
    client.query(query, [username, password], (err, res) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, 200);
    });
  }
  
  module.exports = AddAdmin;
  