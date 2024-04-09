import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import CookBookService from './cookCook.service';
const Types = require('mongoose').Types;

export default class MonAn {
    static async saveDish(idNguoiDung: string, idMonAn: string, idNhomMonAn: string) {
        const data = await CookBookService.saveDish(idNguoiDung, idMonAn, idNhomMonAn);
        return data;
    }

    static async unsaveDish(idNguoiDung: string, idMonAn: String) {
        const data = await CookBookService.unSaveDish(idNguoiDung, idMonAn);
        return data;
    }

    static async likeDish(idNguoiDung: string, idMonAn: string) {
        const nguoiDung = await AccountModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }

        const monAn = await DishModel.findById(idMonAn);

        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn',
            };
        }

        const checkLikeNguoiDung = monAn.likes.includes(new Types.ObjectId(idNguoiDung));

        if (checkLikeNguoiDung) {
            const boLike = await DishModel.findByIdAndUpdate(idMonAn, {
                $pull: { likes: idNguoiDung },
            });
            if (boLike) {
                return {
                    message: 'Bỏ like thành công',
                };
            }
            return {
                error: 'Bỏ like không thành côg',
            };
        } else {
            const thaLike = await DishModel.findByIdAndUpdate(idMonAn, {
                $push: { likes: idNguoiDung },
            });

            if (thaLike) {
                return {
                    message: 'Thả like thành công.',
                };
            }
            return {
                error: 'Thả like không thành công',
            };
        }
    }
}
