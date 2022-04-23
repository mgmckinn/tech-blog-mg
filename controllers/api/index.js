const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use("/user", userRoutes)
router.use('/post', postRoutes)
router.use('/comment', commentRoutes)


