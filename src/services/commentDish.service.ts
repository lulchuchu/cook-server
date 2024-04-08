import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import CommentDishModel from '../models/CommentDish.model';
import bucket from '../configs/firebase';
const Types = require('mongoose').Types;

interface Image {
    uri: string;
    type: string;
}

export default class CommentDish {
    static async getAllCommentDish(idDish: string) {
        const monAn = await DishModel.findById(idDish);
        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn!',
            };
        }

        const arrayCommentDish = await CommentDishModel.find({
            idDish: idDish,
        })
            .populate('user')
            .lean()
            .exec();

        return {
            list_comment_dish: arrayCommentDish,
        };
    }

    static async addCommentDish(idDish: string, idUser: string, content: string, img: Image) {
        const nguoiDung = await AccountModel.findById(idUser);
        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này!',
            };
        }

        const monAn = await DishModel.findById(idDish);
        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn!',
            };
        }
        var url = '';
        if (img.uri !== '') {
            const decodeImage = Buffer.from(img.uri, 'base64');
            const filename = `cmtRecipeImages/${Date.now()}.png`;
            const file = bucket.file(filename);

            await file.save(decodeImage, {
                metadata: {
                    contentType: `image/png`,
                },
            });
            const urlFirebase = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2041',
            });
            url = urlFirebase[0];
        }
        const commentDish = new CommentDishModel({
            idDish: idDish,
            user: idUser,
            content: content,
            img: url,
            likes: [],
            dislikes: [],
        });

        const saved = await commentDish.save();

        return {
            comment_dish: saved,
        };
    }

    static async addFeeling(idCommentDish: string, idNguoiDung: string, state: number) {
        const nguoiDung = await AccountModel.findById(idNguoiDung);
        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này!',
            };
        }

        const commentDish = await CommentDishModel.findById(idCommentDish);
        if (!commentDish) {
            return {
                error: 'Không tìm bình luân món ăn!',
            };
        }

        // nếu state = -1 => trường hợp dislike
        if (state === -1) {
            // kiểm tra xem đã có like hay chưa
            const checkLike = commentDish.likes.includes(new Types.ObjectId(idNguoiDung));

            if (checkLike) {
                await commentDish.updateOne({
                    $pull: {
                        likes: idNguoiDung,
                    },
                });
            }

            const checkDislike = commentDish.dislikes.includes(new Types.ObjectId(idNguoiDung));

            if (checkDislike) {
                await commentDish.updateOne({
                    $pull: {
                        dislikes: idNguoiDung,
                    },
                });

                return {
                    message: 'Bỏ dislike thành công!',
                };
            }

            await commentDish.updateOne({
                $push: {
                    dislikes: idNguoiDung,
                },
            });
            return {
                message: 'Dislike thành công!',
            };
        } else {
            const checkDislike = commentDish.dislikes.includes(new Types.ObjectId(idNguoiDung));

            if (checkDislike) {
                await commentDish.updateOne({
                    $pull: {
                        dislikes: idNguoiDung,
                    },
                });
            }

            const checkLike = commentDish.likes.includes(new Types.ObjectId(idNguoiDung));

            if (checkLike) {
                await commentDish.updateOne({
                    $pull: {
                        likes: idNguoiDung,
                    },
                });

                return {
                    message: 'Bỏ like thành công!',
                };
            }

            await commentDish.updateOne({
                $push: {
                    likes: idNguoiDung,
                },
            });
            return {
                message: 'Like thành công!',
            };
        }
    }

    static async deleteCommentDish(idNguoiDung: string, idCommentDish: string) {
        const nguoiDung = await AccountModel.findById(idNguoiDung);
        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này!',
            };
        }

        const commentDish = await CommentDishModel.findById(idCommentDish);
        if (!commentDish) {
            return {
                error: 'Không tìm bình luân món ăn!',
            };
        }

        if (idNguoiDung !== commentDish.user?.toString()) {
            return {
                error: 'Bạn không phải chủ nhân của bình luận này!',
            };
        }

        await commentDish.deleteOne();

        return {
            message: 'Xóa bình luận thành công!',
        };
    }
}
