import RatingModel from '../models/Rating.model';
import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import bucket from '../configs/firebase';

interface Image {
    uri: string;
    type: string;
}

export default class DanhGia {
    // tại 1 đánh giá, nếu đã có đánh giá rồi thì sửa đánh giá
    static async createRating(idDish: string, idAccount: string, score: number, img: Image, content: string) {
        if (!score) {
            return {
                error: 'Vui lòng đánh giá Star cho công thức.',
            };
        }

        const monAn = await DishModel.findById(idDish);
        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn.',
            };
        }

        const nguoiDung = await AccountModel.findById(idAccount);
        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này!',
            };
        }

        const danhGia = await RatingModel.findOne({
            account: idAccount,
            dish: idDish,
        });

        var url = '';
        if (img && img?.uri !== '') {
            const decodedImage = Buffer.from(img.uri, 'base64');

            const filename = `ratingImage/${Date.now()}.${img.type}`;
            const file = bucket.file(filename);

            await file.save(decodedImage, {
                metadata: {
                    contentType: `image/${img.type}`,
                },
            });
            const urlFibase = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491',
            });
            url = urlFibase[0];
        }

        if (danhGia) {
            if (score.toString() !== danhGia.score?.toString() || url !== danhGia.img || content !== danhGia.content) {
                danhGia.score = score || danhGia.score;
                danhGia.img = url || danhGia.img;
                danhGia.content = content || danhGia.content;

                const currentDanhGia = await danhGia.save();
                if (currentDanhGia) {
                    return {
                        danh_gia: currentDanhGia,
                    };
                } else {
                    return {
                        error: 'Đánh giá khong thành công.',
                    };
                }
            } else {
                return {
                    message: 'Không có thay đổi nào cả',
                };
            }
        }

        const newDanhGia = new RatingModel({
            dish: idDish,
            account: idAccount,
            score: score,
            img: url,
            content: content,
        });

        const saveDanhGia = await newDanhGia.save();

        if (saveDanhGia) {
            return {
                danh_gia: saveDanhGia,
            };
        }

        return {
            error: 'Đánh giá không thành công, vui lòng thử lại',
        };
    }

    // xóa đánh giá
    static async eraseRating(idRating: string, idDish: string) {
        const danhGia = await RatingModel.findById(idRating);

        if (!danhGia) {
            return {
                error: 'Không tìm thấy đánh giá.',
            };
        }

        const monAn = await DishModel.findById(idDish);
        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn.',
            };
        }

        await danhGia.deleteOne();
        return {
            message: 'Xóa đánh giá thành công.',
        };
    }

    // lấy ra các đánh giá và điểm trung bình đánh giá 1 món ăn
    static async getRating(idDish: string) {
        const monAn = await DishModel.findById(idDish);

        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn.',
            };
        }

        const danhGiaList = await RatingModel.find({ dish: idDish }).populate('account').exec();

        const tongDiemDanhGia = danhGiaList.reduce((totalValue, currentValue) => {
            return totalValue + Number(currentValue.score);
        }, 0);

        const trungBinhDanhGia = tongDiemDanhGia / danhGiaList.length;
        return {
            trungBinhDanhGia: Number(trungBinhDanhGia.toFixed(1)),
            list_danh_gia: danhGiaList.reverse(),
        };
    }
}
