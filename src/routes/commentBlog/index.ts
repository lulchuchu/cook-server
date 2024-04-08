import express from 'express';

const router = express.Router();
import commentBlogController from '../../controllers/commentBlog.controller';

router.post('/post', commentBlogController.createComment);
router.get('/get', commentBlogController.getCommentOfBlog);

export default router;
