import express from 'express';
import dotenv from 'dotenv';
import * as appInsights from 'applicationinsights'
import axios from 'axios';
import FooService from  './services/fooService';
import JsService  from './services/jsService';
const app = express();
const port = 3000 || process.env.PORT;

dotenv.config();
appInsights.setup().start();

const fooService = new FooService();

app.get('/', async (req: any, res: any) => {
    try {
        let data = await callGithub();
        res.send(data)
    }
    catch (err) {
        console.log(err);
        res.send(err.message)
    }
});

app.get('/time', async (req: any, res: any) => {
    try {
        let now = new Date();
        res.send({
            time: now.toDateString()
        })
    }
    catch (err) {
        console.log(err);
        res.send(err.message)
    }
});

app.get('/sayHello', async (req: any, res: any) => {
    try {
        let data = `hello ${req.query.name}`;//fooService.sayHello(req.query.name)
        res.send(data)
    }
    catch (err) {
        console.log(err);
        res.send(err.message)
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


async function callGithub() {
    const data = await axios.get('https://api.github.com/');
    console.log(data.data);
    return data.data;
}
