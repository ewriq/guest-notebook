
function CheckVerified(client, id, callback) {
    const query = 'SELECT name, email FROM verified WHERE id = $1';
  
    client.query(query, [id], (err, res) => {
      if (err) {
        return callback(err, null);  
      }
      if (res.rows.length > 0) {
        return callback(null, res.rows[0].name, res.rows[0].email);
      } else {
        return callback(null, null, null);  
      }
    });
  }
  
  module.exports = CheckVerified;
  
  