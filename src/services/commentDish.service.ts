import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import CommentDishModel from '../models/CommentDish.model';
import bucket from '../configs/firebase';
import LikeAndUnlikeCommentDishModel from '../models/LikeAndUnlikeCommentDish.model';
const Types = require('mongoose').Types;

interface Image {
    uri: string;
    type: string;
}

export default class CommentDish {
    // lấy tất cả comment của 1 món ăn
    static async getAllCommentDish(idDish: string) {
        const monAn = await DishModel.findById(idDish);
        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn!',
            };
        }

        const listCommentDishes = await CommentDishModel.find({
            idDish: idDish,
        })
            .populate('user')
            .lean()
            .exec();

        var arrayCommentDish: any = [];

        for (const item of listCommentDishes) {
            const getLikesCommentDish = async () => {
                const likesCommentDish = await LikeAndUnlikeCommentDishModel.find({ commentDish: item._id, state: 1 });
                const likesAccount = likesCommentDish.map((item) => item.account);
                return likesAccount;
            };

            const getDislikesCommentDish = async () => {
                const dislikesCommentDish = await LikeAndUnlikeCommentDishModel.find({
                    commentDish: item._id,
                    state: -1,
                });
                const dislikesAccount = dislikesCommentDish.map((item) => item.account);
                return dislikesAccount;
            };

            const idAccountsLike = await getLikesCommentDish();
            const idAccountsDislike = await getDislikesCommentDish();
            if (idAccountsLike && idAccountsDislike) {
                arrayCommentDish.push({
                    ...item,
                    user: {
                        ...item.user,
                        password: null,
                    },
                    likes: idAccountsLike,
                    dislikes: idAccountsDislike,
                });
            }
        }

        return {
            list_comment_dish: arrayCommentDish,
        };
    }

    // tạo 1 comment món ăn
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
        if (img && img.uri !== '') {
            const decodeImage = Buffer.from(img.uri, 'base64');
            const filename = `cmtRecipeImages/${Date.now()}.${img.type}`;
            const file = bucket.file(filename);

            await file.save(decodeImage, {
                metadata: {
                    contentType: `image/${img.type}`,
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
            img: url
        });

        const saved = await commentDish.save();

        const newComment = {
            comment: saved,
            likes: []
        }

        return {
            comment_dish: newComment,
        };
    }

    // thả cảm xúc vào comment món ăn
    static async addFeeling(idCommentDish: string, idAccount: string, state: number) {
        const nguoiDung = await AccountModel.findById(idAccount);
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
            const checkLike = await LikeAndUnlikeCommentDishModel.findOne({
                account: idAccount,
                commentDish: idCommentDish,
                state: 1,
            });

            if (checkLike) {
                await checkLike.deleteOne();
            }

            const checkDislike = await LikeAndUnlikeCommentDishModel.findOne({
                account: idAccount,
                commentDish: idCommentDish,
                state: -1,
            });

            if (checkDislike) {
                await checkDislike.deleteOne();

                return {
                    message: 'Bỏ dislike thành công!',
                };
            }

            const newDislikeCommentDish = new LikeAndUnlikeCommentDishModel({
                account: idAccount,
                commentDish: idCommentDish,
                state: -1,
            });
            const checkAccess = await newDislikeCommentDish.save();
            if (checkAccess) {
                return {
                    message: 'Dislike thành công!',
                };
            }

            return {
                message: 'Dislike không thành công!',
            };
        } else {
            const checkDislike = await LikeAndUnlikeCommentDishModel.findOne({
                account: idAccount,
                commentDish: idCommentDish,
                state: -1,
            });

            if (checkDislike) {
                await checkDislike.deleteOne();
            }

            const checkLike = await LikeAndUnlikeCommentDishModel.findOne({
                account: idAccount,
                commentDish: idCommentDish,
                state: 1,
            });

            if (checkLike) {
                await checkLike.deleteOne();

                return {
                    message: 'Bỏ like thành công!',
                };
            }

            const newLikeCommentDish = new LikeAndUnlikeCommentDishModel({
                account: idAccount,
                commentDish: idCommentDish,
                state: 1,
            });
            const checkAccess = await newLikeCommentDish.save();
            if (checkAccess) {
                return {
                    message: 'Like thành công!',
                };
            }

            return {
                message: 'Like không thành công!',
            };
        }
    }

    // xóa 1 comment món ăn
    static async deleteCommentDish(idAccount: string, idCommentDish: string) {
        const nguoiDung = await AccountModel.findById(idAccount);
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

        if (idAccount !== commentDish.user?.toString()) {
            return {
                error: 'Bạn không phải chủ nhân của bình luận này!',
            };
        }

        // await LikeAndUnlikeCommentDishModel.deleteMany({ commentDish: idCommentDish });

        // await commentDish.deleteOne();

        const success1 = await LikeAndUnlikeCommentDishModel.deleteMany({ commentDish: idCommentDish });
        const success2 = await commentDish.deleteOne();

        if (success1 && success2) {
            return {
                message: 'Xóa bình luận món ăn thành công',
            };
        }
        return {
            error: 'Xóa bình luận món ăn không thành công',
        };
    }
}
