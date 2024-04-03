import { ObjectId } from "mongodb";
import MonAnModel from "../models/MonAn.model";
import NguoiDungModel from "../models/NguoiDung.model";
import NhomMonAnService from "../services/nhomMonAn.service";
import mongoose from "mongoose";
const Types = require("mongoose").Types;

export default class MonAn {
    static async themMon({
        ten,
        hinhAnh,
        moTa,
        congThuc,
    }: {
        ten: string;
        hinhAnh: string;
        moTa: string;
        congThuc: string[];
    }) {
        const monAn = new MonAnModel({
            ten,
            hinhAnh,
            moTa,
            congThuc,
        });
        await monAn.save();
    }

    static async getAll() {
        return await MonAnModel.find();
    }

    static async getById(id: string) {
        return await MonAnModel.findById(id);
    }

    static async xuLuLuuMonAn(
        idNguoiDung: string,
        idMonAn: string,
        idNhomMonAn: string
    ) {
        const data = await NhomMonAnService.luuMonAn(
            idNguoiDung,
            idMonAn,
            idNhomMonAn
        );
        return data;
    }

    static async xuLyBoLuuMonAn(idNguoiDung: string, idMonAn: String) {
        const data = await NhomMonAnService.boLuuMonAn(idNguoiDung, idMonAn);
        return data;
    }

    static async thaLikeMonAn(idNguoiDung: string, idMonAn: string) {
        const nguoiDung = await NguoiDungModel.findById(idNguoiDung);

        if (!nguoiDung) {
            return {
                error: "Vui lòng đăng nhập để thực hiện chức năng này.",
            };
        }

        const monAn = await MonAnModel.findById(idMonAn);

        if (!monAn) {
            return {
                error: "Không tìm thấy món ăn",
            };
        }

        const checkLikeNguoiDung = monAn.likes.includes(
            new Types.ObjectId(idNguoiDung)
        );

        if (checkLikeNguoiDung) {
            const boLike = await MonAnModel.findByIdAndUpdate(idMonAn, {
                $pull: { likes: idNguoiDung },
            });
            if (boLike) {
                return {
                    message: "Bỏ like thành công",
                };
            }
            return {
                error: "Bỏ like không thành côg",
            };
        } else {
            const thaLike = await MonAnModel.findByIdAndUpdate(idMonAn, {
                $push: { likes: idNguoiDung },
            });

            if (thaLike) {
                return {
                    message: "Thả like thành công.",
                };
            }
            return {
                error: "Thả like không thành công",
            };
        }
    }
}
