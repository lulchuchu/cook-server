import DishModel from '../models/Dish.model';
import AccountModel from '../models/Account.model';
import CookBookModel from '../models/GroupDish.model';

export default class NguyenLieu {
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

    static async getDishOfCookBook(idNhomMonAn: string) {
        try {
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

    static async saveDish(idNguoiDung: string, idMonAn: string, idNhomMonAn: string) {
        const nguoiDung = await AccountModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: 'Vui lòng đăng nhập để thực hiện chức năng này',
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

        nhomMonAn.dishs.push(monAn?._id);
        const saveNhomMA = await nhomMonAn.save();

        await DishModel.findByIdAndUpdate(idMonAn, {
            $push: { storeUsers: idNguoiDung },
        });
        if (saveNhomMA) {
            return {
                message: 'Lưu món ăn thành công.',
            };
        } else {
            return {
                error: 'Lưu món ăn thành công.',
            };
        }
    }

    static async unSaveDish(idNguoiDung: string, idMonAn: String) {
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

        const nhomMonAns = await CookBookModel.find({
            user: idNguoiDung,
        });

        const nhomMonAn = nhomMonAns.find((item) => item.dishs.find((i) => i.toString() === idMonAn));

        if (!nhomMonAn) {
            return {
                error: 'Không tìm thấy nhóm món ăn chứa món ăn này.',
            };
        }

        const boIdNguoiDung = await DishModel.findByIdAndUpdate(idMonAn, {
            $pull: { storeUsers: idNguoiDung },
        });

        const boIdMonAn = await CookBookModel.findByIdAndUpdate(nhomMonAn?._id, {
            $pull: { dishs: idMonAn },
        });

        if (boIdMonAn && boIdNguoiDung) {
            return {
                message: 'Bỏ lưu thành công.',
            };
        }

        return {
            error: 'Bỏ lưu không thành công.',
        };
    }

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

        await DishModel.findByIdAndUpdate(idMonAn, {
            $pull: { storeUsers: idNguoiDung },
        });

        return {
            message: 'Xóa khỏi nhóm thành công',
        };
    }

    static async eraseCookBook(idNhomMonAn: string) {
        const nhomMA = await CookBookModel.findById(idNhomMonAn);

        if (!nhomMA) {
            return {
                error: 'Không tìm thấy nhóm món ăn.',
            };
        }

        nhomMA.dishs.forEach((item) => {
            const xuLyXoaIdNguoiDungKhoiMonAn = async () => {
                const monAn = await DishModel.findById(item);
                if (!monAn) {
                    return {
                        error: 'Không tìm thấy món ăn trong nhóm món ăn.',
                    };
                }
                await DishModel.findByIdAndUpdate(item, {
                    $pull: { storeUsers: nhomMA?.user },
                });
                return;
            };
            xuLyXoaIdNguoiDungKhoiMonAn();
        });

        await CookBookModel.findByIdAndDelete(idNhomMonAn);
        return {
            message: 'Xóa nhóm món ăn thành công',
        };
    }
}
