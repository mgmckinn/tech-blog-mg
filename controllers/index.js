const router = require('express').Router();

const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/post-routes');
const commentRoutes = require('./api/comment-routes');

router.use("/user", userRoutes)
router.use('/post', postRoutes)
router.use('/comment', commentRoutes)

module.exports = router;