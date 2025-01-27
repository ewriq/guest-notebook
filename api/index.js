//http server
const express = require('express');
const app = express();

//utils
const { time } = require('./Utils/time');

//db
const conn = require('./Db/Connect');
const table = require('./Db/Table');
const Insert = require('./Db/Insert');
const { CONSTRAINT } = require('sqlite3');
const List = require('./Db/List');




const db = conn();
table(db);

//middleware
app.use(express.json());
app.set('view engine', 'ejs');

//routes gateways
app.get('/', (req, res) => {
    res.json({hello: 'world'});
});


app.get('/list', (req, res) => {
    List(db, (err, data) => {
        if (err) {
            return res.status(500).send('db hatası');
        }

        res.render('index', { logs: data });
    });
});

app.post('/add', (req, res) => {
    const { id } = req.body;  
    console.log(id);
    console.log(time);

    if (id) {
        Insert(db, id, time.toString(), (err, result) => {
            if (err) {
                console.log("Hata:", err);
                res.json({
                    code: 500,
                    message: 'Bir hata oluştu',
                });
            } else if (result === 200) {
                console.log("Ekleme başarılı");
                res.json({
                    code: 200,
                    message: 'İşlem başarıyla gerçekleştirildi',
                    data: { time: time },
                });
            }
        });
    } else {
        console.log("ID bulunamadı");
        res.json({
            code: 404,
            message: 'Veri bulunamadı',
            data: { id: id },
        });
    }
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
})