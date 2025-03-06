const Aplication = require("./app/server");
const dotenv = require('dotenv');
dotenv.config(".env");
new Aplication(process.env.PORT, process.env.DB_LOCAL_URL);