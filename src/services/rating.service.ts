import RatingModel from '../models/Rating.model';
import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import bucket from '../configs/firebase';

interface Image {
    uri: string;
    type: string;
}

export default class DanhGia {
    static async createRating(idMonAn: string, idNguoiDung: string, diemDanhGia: number, img: Image, noiDung: string) {
        if (!diemDanhGia) {
            return {
                error: 'Vui lòng đánh giá Star cho công thức.',
            };
        }

        const monAn = await DishModel.findById(idMonAn);
        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn.',
            };
        }

        const nguoiDung = await AccountModel.findById(idNguoiDung);
        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này!',
            };
        }

        const danhGia = await RatingModel.findOne({
            account: idNguoiDung,
            dish: idMonAn,
        });
        var url = '';
        if (img.uri !== '') {
            const decodedImage = Buffer.from(img.uri, 'base64');

            const filename = `ratingImage/${Date.now()}.png`;
            const file = bucket.file(filename);

            await file.save(decodedImage, {
                metadata: {
                    contentType: `image/png`,
                },
            });
            const urlFibase = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491',
            });
            url = urlFibase[0];
        }
        if (danhGia) {
            if (
                diemDanhGia.toString() !== danhGia.score?.toString() ||
                url !== danhGia.img ||
                noiDung !== danhGia.content
            ) {
                danhGia.score = diemDanhGia || danhGia.score;
                danhGia.img = url || danhGia.img;
                danhGia.content = noiDung || danhGia.content;

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
            dish: idMonAn,
            account: idNguoiDung,
            score: diemDanhGia,
            img: url,
            content: noiDung,
        });

        const saveDanhGia = await newDanhGia.save();

        await DishModel.findByIdAndUpdate(idMonAn, {
            $push: { rating: saveDanhGia._id },
        });

        if (saveDanhGia) {
            return {
                danh_gia: saveDanhGia,
            };
        }

        return {
            error: 'Đánh giá không thành công, vui lòng thử lại',
        };
    }

    static async eraseRating(idDanhGia: string, idMonAn: string) {
        const danhGia = await RatingModel.findById(idDanhGia);

        if (!danhGia) {
            return {
                error: 'Không tìm thấy đánh giá.',
            };
        }

        const monAn = await DishModel.findById(idMonAn);
        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn.',
            };
        }

        await DishModel.findByIdAndUpdate(idMonAn, {
            $pull: { rating: idDanhGia },
        });

        await danhGia.deleteOne();
        return {
            message: 'Xóa đánh giá thành công.',
        };
    }

    static async getRating(idMonAn: string) {
        const monAn = await DishModel.findById(idMonAn);

        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn.',
            };
        }

        const danhGiaList = await RatingModel.find({ dish: idMonAn });

        const tongDiemDanhGia = danhGiaList.reduce((totalValue, currentValue) => {
            return totalValue + Number(currentValue.score);
        }, 0);

        const trungBinhDanhGia = tongDiemDanhGia / danhGiaList.length;
        return {
            trungBinhDanhGia: Number(trungBinhDanhGia.toFixed(1)),
            list_danh_gia: danhGiaList,
        };
    }
}
