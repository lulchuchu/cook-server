import MonAnModel from "../models/MonAn.model";
import NguoiDungModel from "../models/NguoiDung.model";
import CommentDishModel from "../models/CommentDish.model";
const Types = require("mongoose").Types;

export default class CommentDish {
    static async getAllCommentDish(idDish: string) {
        const monAn = await MonAnModel.findById(idDish);
        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn!",
            };
        }

        const arrayCommentDish = await CommentDishModel.find({
            idDish: idDish,
        });

        return {
            list_comment_dish: arrayCommentDish,
        };
    }

    static async addCommentDish(
        idDish: string,
        idNguoiDung: string,
        content: string,
        img: string
    ) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);
        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này!",
            };
        }

        const monAn = await MonAnModel.findById(idDish);
        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn!",
            };
        }

        const commentDish = new CommentDishModel({
            idDish: idDish,
            idNguoiDung: idNguoiDung,
            content: content,
            img: img,
        });

        await commentDish.save();

        return {
            comment_dish: commentDish,
        };
    }

    static async addFeeling(
        idCommentDish: string,
        idNguoiDung: string,
        state: number
    ) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);
        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này!",
            };
        }

        const commentDish = await CommentDishModel.findById(idCommentDish);
        if (!commentDish) {
            return {
                error: "Không tìm bình luân món ăn!",
            };
        }

        if (state === -1) {
            const checkDislike = commentDish.dislikes.includes(
                new Types.ObjectId(idNguoiDung)
            );

            if (checkDislike) {
                await commentDish.updateOne({
                    $pull: {
                        dislikes: idNguoiDung,
                    },
                });

                return {
                    message: "Bỏ dislike thành công!",
                };
            }

            await commentDish.updateOne({
                $push: {
                    dislikes: idNguoiDung,
                },
            });
            return {
                message: "Dislike thành công!",
            };
        } else {
            const checkLike = commentDish.likes.includes(
                new Types.ObjectId(idNguoiDung)
            );

            if (checkLike) {
                await commentDish.updateOne({
                    $pull: {
                        likes: idNguoiDung,
                    },
                });

                return {
                    message: "Bỏ like thành công!",
                };
            }

            await commentDish.updateOne({
                $push: {
                    likes: idNguoiDung,
                },
            });
            return {
                message: "Like thành công!",
            };
        }
    }

    static async deleteCommentDish(idNguoiDung: string, idCommentDish: string) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);
        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này!",
            };
        }

        const commentDish = await CommentDishModel.findById(idCommentDish);
        if (!commentDish) {
            return {
                error: "Không tìm bình luân món ăn!",
            };
        }

        if (idNguoiDung !== commentDish.idNguoiDung?.toString()) {
            return {
                error: "Bạn không phải chủ nhân của bình luận này!",
            };
        }

        await commentDish.deleteOne();

        return {
            message: "Xóa bình luận thành công!",
        };
    }
}
