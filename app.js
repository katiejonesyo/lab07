const express = require('express');
const app = express();
const Sewers = require('./models/sewers')
const Sewermonsters = require('./models/sewermonsters')
app.use(express.json());
require('dotenv').config();



app.get('/', (req, res) => {
    res.send({ hello: 'world'})
});

app.get('/sewers', (req, res) => {
    Sewers
     .find()
     .then(sewers => res.send(sewers))

});

app.get('/sewers/:id', (req, res)  => {
    Sewers
    .findById(req.params.id)
    .then((sewers) => res.send(sewers))
});


app.post('/sewers', async(req, res) => {
    Sewers
    .insert(req.body)
    .then(sewers => res.send(sewers));
});


app.put('/sewers/:id', (req, res)  => {
    Sewers
    .update(req.params.id, req.body)
    .then((sewers) => res.send(sewers))
});


app.delete('/sewers/:id',(req, res) => {
    Sewers
    .delete(req.params.id)
    .then((sewers) => res.send(sewers));
});








//Sewermonsters


app.get('/sewermonsters', (req, res) => {
    Sewermonsters
     .find()
     .then(sewermonsters => res.send(sewermonsters))

});

app.get('/sewermonsters/:id', (req, res)  => {
    Sewermonsters
    .findById(req.params.id)
    .then((sewermonsters) => res.send(sewermonsters))
});


app.post('/sewermonsters', async(req, res) => {
    Sewermonsters
    .insert(req.body)
    .then(sewermonsters => res.send(sewermonsters));
});


app.put('/sewermonsters/:id', (req, res)  => {
    Sewermonsters
    .update(req.params.id, req.body)
    .then((sewermonsters) => res.send(sewermonsters))
});


app.delete('/sewermonsters/:id',(req, res) => {
    Sewermonsters
    .delete(req.params.id)
    .then((sewermonsters) => res.send(sewermonsters));
});

module.exports = app;




