//http server
const express = require('express');
const session = require('express-session');
const app = express();

//utils
const { time } = require('./Utils/time');
const transporter = require('./Mail/SendInfo');

//db
const conn = require('./Db/Connect');
const Insert1 = require('./Db/Insert');
const List = require('./Db/List');
const CheckAdmin = require('./Db/Admin/CheckAdmin');
const CheckVerified = require('./Db/Verified/CheckVerfied');
const Insert = require('./Db/Verified/Insert');
const ListVerified = require('./Db/Verified/ListVerified');
const Verified = require('./Db/Verified/Verified');


const db = conn();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
}));

//routes gateways
app.get('/', (req, res) => {
    res.render('index')
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username,password);

    CheckAdmin(db, username, password, (err, statusCode) => {
      if (err) {
        console.error(err);
        return res.redirect('/');
      }
      console.log(username,password);
      if (statusCode === 200) {
        req.session.user = { username };  
        res.redirect('/dashboard');
      } else {
        res.redirect('/');  
      }
    });
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        List(db, (err, log) => {
            if (err) {
                return res.status(500).send('Veritabanı hatası (log verisi).');
            }

            ListVerified(db, (err, verified) => {
                if (err) {
                    return res.status(500).send('Veritabanı hatası (verified verisi).');
                }

                res.render('dashboard', { log: log, logs: verified });
            });
        });
    } else {
        res.redirect('/');
    }
});


app.post('/add', (req, res) => {
    const { id } = req.body;  
    console.log(id);
    console.log(time);

    if (id) {
        CheckVerified(db, String(id), (err, name, email) => {
            if (err) {
              console.log("Hata:", err);
            } else if (name) {
                Insert(db, name, time.toString(), (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            message: 'Bir hata oluştu',
                        });
                    } else if (result === 200) {
                        var mailOptions = {
                            from: email,
                            to: email,
                            subject: 'Bildiri',
                            text: "öğrencisi oldugunuz "+ name + " kapıdan geçti."
                          };

                          transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                        });
                        res.status(200).json({
                            message: 'İşlem başarıyla gerçekleştirildi',
                        });
                    }
                });
            } else {
                Insert1(db, id, time.toString(), (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            message: 'Bir hata oluştu',
                        });
                    } else if (result === 200) {
                        res.status(404).json({
                            message: 'Kayıtlı olmadıgı için log,a kaydedildi',
                        });
                    }
                });
            }
          });

    } else {
        res.json({
            code: 404,
            message: 'Veri bulunamadı',
        });
    }
});

app.post('/verified', (req, res) => {
    const { name, id, email } = req.body;
    console.log("ID:", id);
    console.log("Name:", name);
    console.log("Email:", email);

    if (id && email && name) {
        // Kullanıcıyı kontrol et
        CheckVerified(db, String(id), (err, existingName, existingEmail) => {
            if (err) {
                console.log("Hata:", err);
                res.send('Bir hata oluştu');
            } else {
                if (existingName) {
                    console.log("Kullanıcı zaten mevcut, yönlendiriliyor...");
                    res.redirect("/dashboard");
                } else {
                    Verified(db, String(id), name, email, (err, code) => {
                        if (err) {
                            res.send('Bir hata oluştu', err);
                        } else if (code === 200) {
                            res.send("kaydedildi");
                        } else {
                            res.send('Kayıt başarısız');
                        }
                    });
                }
            }
        });
    } else {
        console.log("Veri eksik:", { id, name, email });
        res.send("Veri bulunamadı");
    }
});


app.listen(3000, function(){
    console.log('Server running on port 3000');
})