const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors())
//declaring type of object as json... 
app.use(bodyParser.json())

const posts = {};

//read
app.get('/posts', (req, res) => {
    res.send(posts);
});

//create
app.post('/posts', (req, res) =>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    //structuring an individual post, this does not get stored in 
    //a list, there will only be one post
    /*
        What will the json look like?
        Here's my guess:
        000001:{
            id: 000001,
            title: "This is a test post"
        }
    */

    posts[id]={
        id, title
    }

    res.status(201).send(posts[id]);
});

app.listen(8000, () =>{
    console.log('Listening on 8000...')
})