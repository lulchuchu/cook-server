import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import AccountLikeDishModel from '../models/AccountLikeDish.model';
const Types = require('mongoose').Types;

export default class MonAn {
    // thả tym món ăn
    static async likeDish(idAccount: string, idDish: string) {
        const nguoiDung = await AccountModel.findById(idAccount);

        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }

        const monAn = await DishModel.findById(idDish);

        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn',
            };
        }

        // const checkLikeNguoiDung = monAn.likes.includes(new Types.ObjectId(idNguoiDung));
        const checkAccountLikeDish = await AccountLikeDishModel.findOne({
            account: idAccount,
            dish: idDish,
        });

        if (checkAccountLikeDish) {
            const boLike = await checkAccountLikeDish.deleteOne();
            if (boLike) {
                return {
                    message: 'Bỏ like thành công',
                };
            }
            return {
                error: 'Bỏ like không thành côg',
            };
        } else {
            const newAccountLikeDish = new AccountLikeDishModel({
                account: idAccount,
                dish: idDish,
            });

            const thaLike = await newAccountLikeDish.save();

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

    static async getLikeDishesOfAccount(idAccount: string) {
        const account = await AccountModel.findById(idAccount);

        if (!account) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }

        const listAccountsLikeDish = await AccountLikeDishModel.find({ account: idAccount }).populate('dish');

        const configValueReturn = listAccountsLikeDish.map((item) => {
            return item.dish;
        });

        return configValueReturn;
    }
}
