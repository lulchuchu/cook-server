import MonAnModel from "../models/MonAn.model";
import NguoiDungModel from "../models/NguoiDung.model";
import NhomMonAnModel from "../models/NhomMonAn.model";

export default class NguyenLieu {
    static async taoNhomMonAn(idNguoiDung: string, tenNhomMonAn: string) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này.",
            };
        }
        const nhomMonAns = await NhomMonAnModel.find({
            nguoiDung: idNguoiDung,
        });

        const kiemTraTomTaiNhom = nhomMonAns.find(
            (item) => item.ten === tenNhomMonAn
        );

        if (kiemTraTomTaiNhom) {
            return {
                error: "Nhóm món ăn này đã tồn tại.",
            };
        }

        const newNhomMonAn = new NhomMonAnModel({
            ten: tenNhomMonAn,
            nguoiDung: nguoiDung?._id,
        });

        const saveNhomMA = await newNhomMonAn.save();

        if (saveNhomMA) {
            return {
                message: "Tạo nhóm món ăn thành công",
            };
        } else {
            return {
                error: "Tạo nhóm món ăn thất bại.",
            };
        }
    }

    static async layTatCaNhomMonAnCuaNguoiDung(idNguoiDung: string) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này.",
            };
        }

        const nhomMonAns = await NhomMonAnModel.find({
            nguoiDung: idNguoiDung,
        });

        return {
            nhomMonAns,
        };
    }

    static async layTatCaMonAnTrongNhomMonAn(idNhomMonAn: string) {
        const nhomMonAn = await NhomMonAnModel.findById(idNhomMonAn);

        if (!nhomMonAn) {
            return {
                error: "Không tìm thấy món ăn.",
            };
        }

        const nhomMA = (await nhomMonAn.populate("monAns")).monAns;
        return nhomMA.map((ma: any) => {
            return { _id: ma._id, name: ma.name, imgDes: ma.imgDes };
        });
    }

    static async luuMonAn(
        idNguoiDung: string,
        idMonAn: string,
        idNhomMonAn: string
    ) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này",
            };
        }

        const monAn = await MonAnModel.findById(idMonAn);

        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn.",
            };
        }

        const nhomMonAn = await NhomMonAnModel.findById(idNhomMonAn);

        if (!nhomMonAn) {
            return {
                error: "Không tìm thấy nhóm món ăn.",
            };
        }

        nhomMonAn.monAns.push(monAn?._id);
        const saveNhomMA = await nhomMonAn.save();

        await MonAnModel.findByIdAndUpdate(idMonAn, {
            $push: { storeUsers: idNguoiDung },
        });
        if (saveNhomMA) {
            return {
                message: "Lưu món ăn thành công.",
            };
        } else {
            return {
                error: "Lưu món ăn thành công.",
            };
        }
    }

    static async boLuuMonAn(idNguoiDung: string, idMonAn: String) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này.",
            };
        }

        const monAn = await MonAnModel.findById(idMonAn);

        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn.",
            };
        }

        const nhomMonAns = await NhomMonAnModel.find({
            nguoiDung: idNguoiDung,
        });

        const nhomMonAn = nhomMonAns.find((item) =>
            item.monAns.find((i) => i.toString() === idMonAn)
        );

        if (!nhomMonAn) {
            return {
                error: "Không tìm thấy nhóm món ăn chứa món ăn này.",
            };
        }

        const boIdNguoiDung = await MonAnModel.findByIdAndUpdate(idMonAn, {
            $pull: { storeUsers: idNguoiDung },
        });

        const boIdMonAn = await NhomMonAnModel.findByIdAndUpdate(
            nhomMonAn?._id,
            {
                $pull: { monAns: idMonAn },
            }
        );

        if (boIdMonAn && boIdNguoiDung) {
            return {
                message: "Bỏ lưu thành công.",
            };
        }

        return {
            error: "Bỏ lưu không thành công.",
        };
    }

    static async xoaMonAnKhoiNhom(
        idNguoiDung: string,
        idMonAn: string,
        idNhomMonAn: string
    ) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này.",
            };
        }

        const monAn = await MonAnModel.findById(idMonAn);

        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn.",
            };
        }

        const nhomMonAn = await NhomMonAnModel.findById(idNhomMonAn);

        if (!nhomMonAn) {
            return {
                error: "Không tìm thấy nhóm món ăn.",
            };
        }

        await NhomMonAnModel.findByIdAndUpdate(idNhomMonAn, {
            $pull: { monAns: idMonAn },
        });

        await MonAnModel.findByIdAndUpdate(idMonAn, {
            $pull: { storeUsers: idNguoiDung },
        });

        return {
            message: "Xóa khỏi nhóm thành công",
        };
    }

    static async xoaNhomMonAn(idNhomMonAn: string) {
        const nhomMA = await NhomMonAnModel.findById(idNhomMonAn);

        if (!nhomMA) {
            return {
                error: "Không tìm thấy nhóm món ăn.",
            };
        }

        nhomMA.monAns.forEach((item) => {
            const xuLyXoaIdNguoiDungKhoiMonAn = async () => {
                const monAn = await MonAnModel.findById(item);
                if (!monAn) {
                    return {
                        error: "Không tìm thấy món ăn trong nhóm món ăn.",
                    };
                }
                await MonAnModel.findByIdAndUpdate(item, {
                    $pull: { storeUsers: nhomMA?.nguoiDung },
                });
                return;
            };
            xuLyXoaIdNguoiDungKhoiMonAn();
        });

        await NhomMonAnModel.findByIdAndDelete(idNhomMonAn);
        return {
            message: "Xóa nhóm món ăn thành công",
        };
    }
}
