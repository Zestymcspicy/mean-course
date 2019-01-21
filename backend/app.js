const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://HalBeckerman:gRS5QGSrFkXQLkv@cluster0-vscdf.mongodb.net/node-angular?retryWrites=true", {useNewUrlParser : true})
  .then(() => {
    console.log("hey!")
  })
  .catch(() => {
    console.log("whoops")
  })

app.use(bodyParser.json());
// mongoDB userName: HalBeckerman pswd: gRS5QGSrFkXQLkv

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(createdPost => {
    res.status(201).json({
    message: 'Post Added Successfully',
    postId: createdPost._id
  });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'posts fetch success',
        posts: documents
      });
    });

});

app.delete('/api/posts/:id', (req, res, next) =>{
  Post.deleteOne({_id: req.params.id}).then(result=> {
  console.log(result)
  res.status(200).json({ message: "post deleted"})
});
})

module.exports = app;
