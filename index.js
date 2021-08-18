const express = require('express');
const axios = require('axios');
const app = express()
const port = 3000 || process.env.PORT;

app.get('/', async (req, res) => {
    try {
        let data = await callGithub();
        res.send(data)
    }
    catch (err) {
        console.log(err);
        res.send(err.message)
    }
});

app.get('/time', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


async function callGithub() {
    const data = await axios.get('https://api.github.com/');
    console.log(data.data);
    return data.data;
}
