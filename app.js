const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const artists = require('./musicians.js');

const app = express();

app.use(bodyparser.json(artists));
app.use(bodyparser.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))



app.get('/artists', (req, res) => res.json(artists));

app.post('/artists', function(req, res) {
    var artist = req.body; 
    console.log(artist);
    artists.push(artist);
    res.json(artists);
});

app.put('/artists/:id', (req,res)=>{
    let musician = artists.find(element => element.id === parseInt(req.params.id));
    musician.musicianName = req.body.musicianName;
    console.log(req.body)
    res.send(musician);
    
});

app.delete('/artists/:id', (req,res)=>{
    let artist = artists.find(el => el.id === parseInt(req.params.id));
    const index = artists.indexOf(artist);
    artists.splice(index,1);
    res.send(artist);
});


app.listen(3090);
