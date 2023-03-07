
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes} = require('crypto');
const app = express();
const cors = require('cors');


app.use(bodyParser.json);
app.use(cors());


//in memory data structure for comments

/*
    id:{
        id:'id',
        content:'comments from a user to a post'
    }
*/

const commentsByPostId = {};

/*
First Route Handler:
    path: /posts/:id/comments
    method: POST
    body: {content.string}
    goal: create a comment associated with the given post ID
*/

app.get('posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || array)
});

/*
Second Route Handler:
    path: /posts/:id/comments
    method: GET
    body: 
    goal: retrieve all comments associated with the given post ID

*/
app.post('posts/:id/comments', (req, res) =>{

    //req.params accesses the string in the url endpoint

    //create unique id associated with the post
    const commentID = randomBytes(4).toString('hex');
    //create jdon object content for post body - object with key 'content' and value 'comments' that are dependent upon user input
    const {content} = req.body;

    //req.params.id - id comes from the url :id
    //structuring a comments array that has a key of post id
    const comments = commentsByPostId[req.params.id] || [];

    //pushing an object to the comments array that is composed of the randombytes and content
    comments.push({id:commentID, content});

    //req.params.id - id comes from the url :id
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});


app.listen(8001, ()=> {
    console.log('Listening on port 8001')
})
