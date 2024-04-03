import express from 'express';

const router = express.Router();

import blogController from '../../controllers/blog.controller';

router.post('/post', blogController.createBlog);
router.get('/getAll', blogController.getBlogs);
router.post('/like', blogController.handleLike);
router.post('/dislike', blogController.handleDislike);

module.exports = router;
