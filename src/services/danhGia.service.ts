import DanhGiaModel from "../models/DanhGia.model";
import MonAnModel from "../models/MonAn.model";
import NguoiDungModel from "../models/NguoiDung.model";

export default class DanhGia {
    static async themDanhGiaMonAn(
        idMonAn: string,
        idNguoiDung: string,
        diemDanhGia: number,
        img: string,
        noiDung: string
    ) {
        if (!diemDanhGia) {
            return {
                error: "Vui lòng đánh giá Star cho công thức.",
            };
        }

        const monAn = await MonAnModel.findById(idMonAn);
        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn.",
            };
        }

        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);
        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này!",
            };
        }

        const danhGia = await DanhGiaModel.findOne({
            nguoiDung: idNguoiDung,
            monAn: idMonAn,
        });
        if (danhGia) {
            if (
                diemDanhGia.toString() !== danhGia.diemDanhGia?.toString() ||
                img !== danhGia.img ||
                noiDung !== danhGia.noiDung
            ) {
                danhGia.diemDanhGia = diemDanhGia || danhGia.diemDanhGia;
                danhGia.img = img || danhGia.img;
                danhGia.noiDung = noiDung || danhGia.noiDung;

                const currentDanhGia = await danhGia.save();
                if (currentDanhGia) {
                    return {
                        danh_gia: currentDanhGia,
                    };
                } else {
                    return {
                        error: "Đánh giá khong thành công.",
                    };
                }
            } else {
                return {
                    message: "Không có thay đổi nào cả",
                };
            }
        }

        const newDanhGia = new DanhGiaModel({
            monAn: monAn._id,
            nguoiDung: nguoiDung._id,
            diemDanhGia: diemDanhGia,
            img: img,
            noiDung: noiDung,
        });

        const saveDanhGia = await newDanhGia.save();

        await MonAnModel.findByIdAndUpdate(idMonAn, {
            $push: { rating: saveDanhGia._id },
        });

        if (saveDanhGia) {
            return {
                danh_gia: saveDanhGia,
            };
        }

        return {
            error: "Đánh giá không thành công, vui lòng thử lại",
        };
    }

    static async xoaDanhGiaMonAn(idDanhGia: string, idMonAn: string) {
        const danhGia = await DanhGiaModel.findById(idDanhGia);

        if (!danhGia) {
            return {
                error: "Không tìm thấy đánh giá.",
            };
        }

        const monAn = await MonAnModel.findById(idMonAn);
        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn.",
            };
        }

        await MonAnModel.findByIdAndUpdate(idMonAn, {
            $pull: { rating: idDanhGia },
        });

        await danhGia.deleteOne();
        return {
            message: "Xóa đánh giá thành công.",
        };
    }

    static async layDanhGiaMonAn(idMonAn: string) {
        const monAn = await MonAnModel.findById(idMonAn);

        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn.",
            };
        }

        const danhGiaList = await DanhGiaModel.find({ monAn: idMonAn });

        const tongDiemDanhGia = danhGiaList.reduce(
            (totalValue, currentValue) => {
                return totalValue + Number(currentValue.diemDanhGia);
            },
            0
        );

        const trungBinhDanhGia = tongDiemDanhGia / danhGiaList.length;
        return {
            trungBinhDanhGia: Number(trungBinhDanhGia.toFixed(1)),
            list_danh_gia: danhGiaList,
        };
    }
}
