const express = require("express");
const mongoos = require("mongoose");
const creatError = require("http-errors");
const https = require('https')
const path = require("path");
const { AllRoutes } = require("./router/router");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const morgan = require("morgan");
const fs = require('fs');
module.exports = class Application {
    #app = express();
    constructor(PORT, DB_URL) {
        mongoos.set("strictQuery", false);
        this.configDataBase(DB_URL);
        this.configApplication(PORT);
        // this.createHttpsServerHere(PORT)
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }
    configApplication(PORT) {
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition: {
                info: {
                    title: "BoT Test API",
                    version: "1.0.0",
                    description: "Node Js",
                    contact: {
                        name: "Davod Basiri",
                        url: "https://logrocket.com",
                        email: "davodbasiri95@gmail.com",
                    },
                },
                servers: [
                    {
                        url: "http://localhost:3030"
                    }
                ]

            },
            apis: ["./app/router/**/*.js"]
        })))
        // const net = require('net'); 
        // const client = net.connect({ port: 80, host: "google.com" }, () => { 
        //     console.log(`run > https://${client.localAddress}:` + PORT + '/api-doc'); 
        // });

        console.log(`run > http://localhost:` + PORT + '/api-doc');
    }
    createServer(PORT) {
        const http = require("http");
        http.createServer(this.#app).listen(PORT, () => {
            console.log("run > http://localhost:" + PORT);
        })
    }
    createHttpsServerHere(PORT) {
        const sslServer = https.createServer(
            {
                key: fs.readFileSync(path.join(__dirname, 'cert', 'private.key')),
                cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.crt')),
                ca: fs.readFileSync(path.join(__dirname, 'cert', 'ca.ca-bundle')),
            },
            this.#app
        )

        sslServer.listen(PORT, () => console.log(`Secure server 🚀🔑 on port ${PORT}`))
    }
    configDataBase(DB_URL) {
        mongoos.connect(DB_URL, (error) => {
            if (!error)
                return console.log("conected to MongoDB");
            return console.log("faild to conect to MongoDB")
        })
        mongoos.connection.on("connected", () => {
            console.log("mongos connected to db")
        })
        mongoos.connection.on("disconnected", () => {
            console.log("mongos disconected to db")
        })
        process.on("SIGINT", async () => {
            console.log("mongos SIGINT to db")
            await mongoos.connection.close();
            process.exit(0);
        })
    }
    errorHandler() {
        this.#app.use((req, res, next) => {
            next(creatError.NotFound("Page Not Found"))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = creatError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    success: false,
                    message
                }
            })
        })

    }
    createRoutes() {
        // this.#app.use("/api", AllRoutes);
        this.#app.use(AllRoutes);
    }
}
