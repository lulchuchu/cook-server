import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import CookBookModel from '../models/GroupDish.model';

export default class NguyenLieu {
    // tạo nhóm món ăn
    static async createCookBook(idNguoiDung: string, tenNhomMonAn: string, idMonAn: string) {
        const nguoiDung = await AccountModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }
        const nhomMonAn = await CookBookModel.findOne({
            user: idNguoiDung,
            name: tenNhomMonAn,
        });

        if (nhomMonAn) {
            return {
                error: 'Nhóm món ăn này đã tồn tại.',
            };
        }

        const newNhomMonAn = new CookBookModel({
            name: tenNhomMonAn,
            user: nguoiDung?._id,
            dishs: [idMonAn],
        });

        const saveNhomMA = await newNhomMonAn.save();

        if (saveNhomMA) {
            return {
                saveNhomMA,
            };
        } else {
            return {
                error: 'Tạo nhóm món ăn thất bại.',
            };
        }
    }

    // lấy tất cả nhóm món ăn của 1 người
    static async getAllCookBook(idNguoiDung: string) {
        const nguoiDung = await AccountModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }

        const nhomMonAns = await CookBookModel.find({
            user: idNguoiDung,
        });

        return {
            nhomMonAns,
        };
    }

    // lấy tất cả món ăn trong nhóm món ăn
    static async getDishOfCookBook(idNhomMonAn: string) {
        try {
            // Phương thức .lean() trong Mongoose là một trong những phương thức được
            // sử dụng để tăng hiệu suất và giảm bộ nhớ khi
            // truy vấn dữ liệu từ cơ sở dữ liệu MongoDB bằng Mongoose.
            const nhomMonAn = await CookBookModel.findOne({ _id: idNhomMonAn }).populate('dishs').lean().exec();

            if (!nhomMonAn) {
                return {
                    error: 'Không tìm thấy món ăn.',
                };
            }

            const formattedMonAns = nhomMonAn.dishs.map((ma: any) => ({
                _id: ma._id,
                name: ma.name,
                imgDes: ma.imgDes,
                likes: ma.likes,
            }));

            return formattedMonAns;
        } catch (error) {
            return {
                error: 'Đã xảy ra lỗi trong quá trình xử lý.',
            };
        }
    }

    // xóa món ăn khỏi nhóm món ăn
    static async eraseDishOfCookBook(idNguoiDung: string, idMonAn: string, idNhomMonAn: string) {
        const nguoiDung = await AccountModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này.',
            };
        }

        const monAn = await DishModel.findById(idMonAn);

        if (!monAn) {
            return {
                error: 'Không tìm thấy món ăn.',
            };
        }

        const nhomMonAn = await CookBookModel.findById(idNhomMonAn);

        if (!nhomMonAn) {
            return {
                error: 'Không tìm thấy nhóm món ăn.',
            };
        }

        await CookBookModel.findByIdAndUpdate(idNhomMonAn, {
            $pull: { dishs: idMonAn },
        });

        return {
            message: 'Xóa khỏi nhóm thành công',
        };
    }

    // xóa nhóm món ăn
    static async eraseCookBook(idNhomMonAn: string) {
        const nhomMA = await CookBookModel.findById(idNhomMonAn);

        if (!nhomMA) {
            return {
                error: 'Không tìm thấy nhóm món ăn.',
            };
        }

        await nhomMA.deleteOne();
        return {
            message: 'Xóa nhóm món ăn thành công',
        };
    }
}
