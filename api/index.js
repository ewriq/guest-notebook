//http server
const express = require('express');
const app = express();

//utils
const { time } = require('./Utils/time');

//db
const conn = require('./Db/Connect');
const table = require('./Db/Table');
const Insert = require('./Db/Insert');




const db = conn();
table(db);

//middleware
app.use(express.json());


//routes gateways
app.get('/', (req, res) => {
    res.json({hello: 'world'});
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
        console.log("ses");
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