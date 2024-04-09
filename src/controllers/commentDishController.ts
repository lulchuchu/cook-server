import CommentDishService from '../services/commentDish.service';
import { Request, Response } from 'express';

class commentDishController {
    // tạo comment món ăn
    createCommentDish = async (req: Request, res: Response): Promise<void> => {
        const { idDish, idUser, content, img } = req.body;
        try {
            const data = await CommentDishService.addCommentDish(idDish, idUser, content, img);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data.comment_dish);
        } catch (e: any) {
            res.status(500).send({ message: 'Lỗi server!' });
        }
    };

    // tạo cảm xúc cho comment món ăn
    createFeelingCommentDish = async (req: Request, res: Response) => {
        const { idCommentDish, idNguoiDung, state } = req.body;
        try {
            const data = await CommentDishService.addFeeling(idCommentDish, idNguoiDung, state);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    // lấy tất cả comment của 1 món ăn
    getListCommentDish = async (req: Request, res: Response): Promise<void> => {
        const idDish = req.query.idDish as string;
        try {
            const data = await CommentDishService.getAllCommentDish(idDish);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data.list_comment_dish);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    // xóa 1 comment món ăn
    deleteCommentDish = async (req: Request, res: Response) => {
        const { idNguoiDung, idCommentDish } = req.body;

        try {
            const data = await CommentDishService.deleteCommentDish(idNguoiDung, idCommentDish);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data);
        } catch (e) {
            res.status(500).send({ message: 'Lỗi server!' });
        }
    };
}

export default new commentDishController();
