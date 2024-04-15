import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import CookBookModel from '../models/GroupDish.model';
import DishInCookBookModel from '../models/DishInCookBook.model';
import AccountLikeDishModel from '../models/AccountLikeDish.model';

export default class GroupDish {
    // tạo nhóm món ăn
    static async createCookBook(idAccount: string, nameGroupDish: string, idDish: string) {
        const account = await AccountModel.findById(idAccount);

        if (!account) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }
        const groupDish = await CookBookModel.findOne({
            user: idAccount,
            name: nameGroupDish,
        });

        if (groupDish) {
            return {
                error: 'Nhóm món ăn này đã tồn tại.',
            };
        }

        const newGroupDish = new CookBookModel({
            name: nameGroupDish,
            user: account?._id,
        });

        const saveGroupDish = await newGroupDish.save();

        const newDishInGroupDish = new DishInCookBookModel({
            cookBook: saveGroupDish._id,
            dish: idDish,
        });

        const saveDishInGroupDish = await newDishInGroupDish.save();

        if (saveGroupDish && saveDishInGroupDish) {
            return {
                saveGroupDish,
            };
        } else {
            return {
                error: 'Tạo nhóm món ăn thất bại.',
            };
        }
    }

    // thêm món ăn vào nhóm , không qua bước tạo nhóm mới
    static async addDishToCookBook(idCookBook: string, idDish: string, idAccount: string) {
        const account = await AccountModel.findById(idAccount);
        if (!account) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }
        const groupDish = await CookBookModel.findById(idCookBook);
        if (!groupDish) {
            return {
                error: 'Không tìm thấy nhóm món ăn.',
            };
        }

        const dishInCookBook = await DishInCookBookModel.findOne({
            cookBook: idCookBook,
            dish: idDish,
        });

        if (dishInCookBook) {
            return {
                error: 'Món đã được thêm trước đó!',
            };
        }

        const newDishInGroupDish = new DishInCookBookModel({
            cookBook: idCookBook,
            dish: idDish,
        });

        const checkSuccess = await newDishInGroupDish.save();

        if (checkSuccess) {
            return { message: 'Thêm món ăn vào nhóm thành công' };
        }
        return { message: 'Thêm món ăn vào nhóm thất bại' };
    }

    // lấy tất cả nhóm món ăn của 1 người
    static async getAllCookBook(idAccount: string) {
        const account = await AccountModel.findById(idAccount);

        if (!account) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }

        const groupDishes = await CookBookModel.find({
            user: idAccount,
        });

        return {
            groupDishes,
        };
    }

    // lấy tất cả món ăn trong nhóm món ăn
    static async getDishesOfCookBook(idCookBook: string) {
        try {
            // Phương thức .lean() trong Mongoose là một trong những phương thức được
            // sử dụng để tăng hiệu suất và giảm bộ nhớ khi
            // truy vấn dữ liệu từ cơ sở dữ liệu MongoDB bằng Mongoose.
            const groupDish = await CookBookModel.findById(idCookBook);

            if (!groupDish) {
                return {
                    error: 'Không tìm thấy món ăn.',
                };
            }

            const dishesInGroupDish = await DishInCookBookModel.find({ cookBook: idCookBook });

            var formattedMonAns = [];

            for (const item of dishesInGroupDish) {
                const dish = await DishModel.findById(item.dish);
                const accountsLikeDish = await AccountLikeDishModel.find({ dish: dish?._id });
                const idAccountsLike = accountsLikeDish.map((item) => item.account);
                formattedMonAns.push({
                    _id: dish?._id,
                    name: dish?.name,
                    imgDes: dish?.imgDes,
                    likes: idAccountsLike,
                });
            }

            return formattedMonAns;
        } catch (error) {
            return {
                error: 'Đã xảy ra lỗi trong quá trình xử lý.',
            };
        }
    }

    // xóa món ăn khỏi nhóm món ăn
    static async eraseDishOfCookBook(idAccount: string, idDish: string, idCookBook: string) {
        const account = await AccountModel.findById(idAccount);

        if (!account) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }

        const dish = await DishModel.findById(idDish);

        if (!dish) {
            return {
                error: 'Không tìm thấy món ăn.',
            };
        }
        console.log(1);
        const groupDish = await CookBookModel.findById(idCookBook);

        if (!groupDish) {
            return {
                error: 'Không tìm thấy nhóm món ăn.',
            };
        }
        console.log(2);

        const deleteDishInGroupDish = await DishInCookBookModel.deleteOne({ cookBook: idCookBook, dish: idDish });
        if (deleteDishInGroupDish) {
            return {
                message: 'Xóa khỏi nhóm thành công',
            };
        }
        return {
            error: 'Xóa khỏi nhóm không thành công',
        };
    }

    // xóa nhóm món ăn
    static async eraseCookBook(idCookBook: string) {
        const groupDish = await CookBookModel.findById(idCookBook);

        if (!groupDish) {
            return {
                error: 'Không tìm thấy nhóm món ăn.',
            };
        }

        const deleteGroupDish = await groupDish.deleteOne();
        const deleteDishesInCookBook = await DishInCookBookModel.deleteMany({ cookBook: idCookBook });

        if (deleteGroupDish && deleteDishesInCookBook) {
            return {
                message: 'Xóa nhóm món ăn thành công',
            };
        }

        return {
            error: 'Xóa nhóm món ăn không thành công',
        };
    }
}
