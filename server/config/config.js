//puerto

process.env.PORT = process.env.PORT || 3000;

//=============================
// entorno
//=============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=============================
// base de datos
//=============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://pipec80:mE1K6A7IGAa7m8hT@cluster0-9q6up.mongodb.net/cafe';
}

process.env.URL_DB = urlDB;