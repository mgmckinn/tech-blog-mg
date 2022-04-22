const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const sequelize = require('../../config/connection')
const withAuth = require('../../utils/auth');
const req = require('express/lib/request');

router.post("/", withAuth, (req, res) => {
    const body = req.body;
    console.log(req.session.userId);
    Post.create({ ...body, userId: req.session.userId})
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);       
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    then(affectedRows => {
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
    Post.destroy({
        where: { 
            id: req.params.id
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({message: "No post found with this id."});
            return;
        }
    if(affectedRows > 0) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
    res.json(dbPostData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;