import { DataSource } from "typeorm";
const AppDataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

AppDataSource.initialize()
.then(() => {
    console.log("Database already connected");
})
.catch(() => {
    console.log("Database not connected");
})