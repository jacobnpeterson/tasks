const express = require('express');
const router = express.Router();

//my try
var mongojs = require('mongojs');
  //OR try mongoose? https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
var db = mongojs('DB_GOES_HERE')


//get all tasks
router.get('/tasks', function(req, res, next){
  //jnp take headers out for publish
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Methods", "GET, POST");

    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });//find
});

//get single task
router.get('/task/:id', function(req, res, next){
  //jnp take headers out for publish
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Methods", "GET, POST");
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });//find
});

//save new task
router.post('/task', function(req, res, next){
  //jnp take headers out for publish
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Methods", "GET, POST");
    var task = req.body;
    if(!task.title || !(task.complete + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else {
        db.tasks.save(task, function (err, task) {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

//delete task
router.delete('/task/:id', function(req, res, next){
  console.log('Try to delete!');
  //jnp take headers out for publish
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);

        }
        res.json(task);
    });//find
});

//update task
router.put('/task/:id', function(req, res, next){
  //jnp take headers out for publish
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST");
    var task = req.body;
    var updTask = {};

    if(task.complete !== undefined){
        updTask.complete = task.complete;
    }

    if(task.title){
        updTask.title = task.title;
    }

    if(task.color){
      updTask.color = task.color;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });//find
    }
});


//WAS HERE
// declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';
//
// /* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });
//
// // Get all posts
// router.get('/posts', (req, res) => {
//   // Get posts from the mock api
//   // This should ideally be replaced with a service that connects to MongoDB
//   axios.get(`${API}/posts`)
//     .then(posts => {
//       res.status(200).json(posts.data);
//     })
//     .catch(error => {
//       res.status(500).send(error)
//     });
// });

module.exports = router;
