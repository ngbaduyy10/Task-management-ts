import express, { Express } from 'express';
const app: Express = express();

import dotenv from "dotenv";
dotenv.config();
const port: number | string = process.env.PORT;

import * as database from './config/database'
database.connect();

import bodyParser from 'body-parser';
app.use(bodyParser.json());

import routesVer1 from "./api/v1/routes/index.route";
routesVer1(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})