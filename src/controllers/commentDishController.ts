import CommentDishService from "../services/commentDish.service";

class commentDishController {
    createCommentDish = async (req: any, res: any) => {
        const { idDish, idNguoiDung, content, img } = req.body;
        try {
            const data = await CommentDishService.addCommentDish(
                idDish,
                idNguoiDung,
                content,
                img
            );

            if (data?.error) {
                return res.status(400).json({ error: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ error: "Lỗi server!" });
        }
    };

    createFeelingCommentDish = async (req: any, res: any) => {
        const { idCommentDish, idNguoiDung, state } = req.body;
        try {
            const data = await CommentDishService.addFeeling(
                idCommentDish,
                idNguoiDung,
                state
            );

            if (data?.error) {
                return res.status(400).json({ error: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ error: "Lỗi server!" });
        }
    };

    getListCommentDish = async (req: any, res: any) => {
        const { idDish } = req.params;
        try {
            const data = await CommentDishService.getAllCommentDish(idDish);

            if (data?.error) {
                return res.status(400).json({ error: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ error: "Lỗi server!" });
        }
    };

    deleteCommentDish = async (req: any, res: any) => {
        const { idNguoiDung, idCommentDish } = req.body;

        try {
            const data = await CommentDishService.deleteCommentDish(
                idNguoiDung,
                idCommentDish
            );

            if (data?.error) {
                return res.status(400).json({ error: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ error: "Lỗi server!" });
        }
    };
}

export default new commentDishController();
