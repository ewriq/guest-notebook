function Verified(client, id, name, email, callback) {
    const query = 'INSERT INTO Verified (id, name, email) VALUES ($1, $2, $3)';

    client.query(query, [id, name, email], (err, res) => {
      if (err) {
        return callback(err, null);
      }

      return callback(null, 200);
    });
}

module.exports = Verified;
