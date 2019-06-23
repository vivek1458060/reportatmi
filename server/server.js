const path = require('path');
const axios = require('axios')
var faker = require('faker');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

const data = {}
axios.get('https://jsonplaceholder.typicode.com/posts/')
    .then((response) => {
        data.reportData = response.data;
    })
    .catch((e) => console.log(e))

app.get('/reports/:id', (req, res) => {
    let id = parseInt(req.params.id);
    const reports = []
    if (id && data.reportData) {
        id = id > 9 ? 1 : id;
        for (let i = id; i < id + 10; i++) {
            reports.push({
                id: i,
                title: data.reportData[i].title,
                description: data.reportData[i].body,
                cost: parseFloat(faker.finance.amount()),
                publishedAt: faker.date.past(),
                imageUrl: `https://picsum.photos/id/${i}/500/700`
            })
        }
        res.send({ reports })
    } else {
        res.status(404).send();
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('Server is up!');
})
