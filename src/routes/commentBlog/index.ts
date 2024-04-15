import express from 'express';

const router = express.Router();
import commentBlogController from '../../controllers/commentBlog.controller';

router.post('/post', commentBlogController.createComment);
router.get('/get', commentBlogController.getCommentOfBlog);
router.post('/like', commentBlogController.likeCommentBlog);
router.post('/unlike', commentBlogController.dislikeCommentBlog);

export default router;
