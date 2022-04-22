const router = require('express').Router();
const sequelize = require("../../config/connection");
const {Post, User, Comment} = require = ("../models");
const withAuth = require("../utils/auth");

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId,
        },
})

.then((dbPostData) => {
    const post = dbPostData.map((post) => post.get({plain: true}));
    res.render("all-post-admin", {
        layout: "dashboard",
        posts,
        logging: true,
    });
})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id)
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({plain: true});
                res.render("edit-post", {layout: "dashboard", post});
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
    });
});

module.exports = router;