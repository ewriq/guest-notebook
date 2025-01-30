
function CheckVerified(client, id, callback) {
    const query = 'SELECT name FROM verified WHERE id = $1';
  
    client.query(query, [id], (err, res) => {
      if (err) {
        return callback(err, null);  
      }
  
      if (res.rows.length > 0) {
        return callback(null, res.rows[0].name);
      } else {
        return callback(null, null);  
      }
    });
  }
  
  module.exports = CheckVerified;
  