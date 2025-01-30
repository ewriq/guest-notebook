
function CheckAdmin(client, username, password, callback) {
  const query = 'SELECT * FROM admin WHERE username = $1 AND password = $2';

  client.query(query, [username, password], (err, res) => {
    if (err) {
      return callback(err, null);
    }

    if (res.rows.length > 0) {
      return callback(null, 200); 
    } else {
      return callback(null, 404); 
    }
  });
}

module.exports = CheckAdmin;
