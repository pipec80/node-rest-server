//puerto

process.env.PORT = process.env.PORT || 3000;

//=============================
// entorno
//=============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=============================
// token
//=============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-seed-desarrolo';
//=============================
// base de datos
//=============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;