// const sqlite = require('sqlite3').verbose();
// const path = require('path');


// const dbPath = path.resolve(__dirname, 'database.db');
// const db = new sqlite.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Error opening database:', err.message);
//     } else {
//         db.run(`
//                 CREATE Table IF NOT EXISTS users (
//                     email TEXT not null UNIQUE,
//                     password TEXT not null ,
//                     user_type TEXT not null ,
//                     created_at TIMESTAMP default CURRENT_TIMESTAMP 
//                 )
//             `);
//         db.run(`
//             CREATE TABLE IF NOT EXISTS user_qrcodes (
//                 email TEXT not null,
//                 FOREIGN KEY(email) REFERENCES users(email),
//                 image_path TEXT not null,
//                 type INTEGER not null,
//                 created_at TIMESTAMP default CURRENT_TIMESTAMP 
//             )
//         `)
//     }
// });


// module.exports = db;


import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';

const path = require('path');


export const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: path.resolve(__dirname, 'database.db'),
  foreignKeys: true
});
