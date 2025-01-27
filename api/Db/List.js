function List(client, callback) {
    const query = 'SELECT id, time FROM log';
    
    client.query(query, (err, res) => {
        if (err) {

            return callback(err, null);
        }

        return callback(null, res.rows);
    });
}

module.exports = List;
