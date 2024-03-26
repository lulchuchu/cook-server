import NguyenLieuModel from "../models/NguyenLieu.model";
import ThanhPhanDinhDuongNguyenLieuModal from "../models/ThanhPhanDinhDuongNguyenLieu.modal";

export default class NguyenLieu {
    static async save({
        ten,
        gia,
        hinhAnh,
        donViTinh,
    }: {
        ten: string;
        gia: number;
        hinhAnh: string;
        donViTinh: string;
    }) {
        const nguyenLieu = new NguyenLieuModel({
            ten,
            gia,
            hinhAnh,
            donViTinh,
        });
        await nguyenLieu.save();
    }

    static async themNguyenLieuVaThanhPhanDinhDuong({
        ten,
        gia,
        hinhAnh,
        donViTinh,
        thanhPhanDinhDuong,
        soLuong,
    }: {
        ten: string;
        gia: number;
        hinhAnh: string;
        donViTinh: string;
        thanhPhanDinhDuong: string;
        soLuong: number;
    }) {
        const nguyenLieu = new NguyenLieuModel({
            ten,
            gia,
            hinhAnh,
            donViTinh,
        });
        const savedNguyenLieu = await nguyenLieu.save();
        const thanhPhanDinhDuongNguyenLieu =
            new ThanhPhanDinhDuongNguyenLieuModal({
                thanhPhanDinhDuong,
                nguyenLieu: savedNguyenLieu._id,
                soLuong,
            });
        thanhPhanDinhDuongNguyenLieu.save();
    }

    static async getAll() {
        return await NguyenLieuModel.find();
    }

    static async getById(id: string) {
        return await NguyenLieuModel.findById(id);
    }

    static async getByIdDetail(id: string) {
        const thanhPhanDinhDuongs =
            await ThanhPhanDinhDuongNguyenLieuModal.find({
                nguyenLieu: id,
            }).populate("thanhPhanDinhDuong");
        const nguyenLieu = await NguyenLieuModel.findById(id);
        return {
            ...nguyenLieu?.toObject(),
            thanhPhanDinhDuongs,
        };
    }
}
