function Insert(db, id, time, callback) {
    const insertData = db.prepare('INSERT INTO log (id, time) VALUES (?, ?)');

    insertData.run(id, time, (err) => {
        if (err) {
            return callback(err, null);  
        }
        return callback(null, 200); 
    });
}

module.exports = Insert;
