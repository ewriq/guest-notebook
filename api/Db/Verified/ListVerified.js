function ListVerified(client, callback) {
    const query = 'SELECT name, time FROM log2';
    
    client.query(query, (err, res) => {
        if (err) {

            return callback(err, null);
        }

        return callback(null, res.rows);
    });
}

module.exports = ListVerified;
