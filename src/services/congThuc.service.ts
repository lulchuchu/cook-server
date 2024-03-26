import CongThucModel from "../models/CongThuc.model";
import MonAnModel from "../models/MonAn.model";
import NguyenLieuSuDungModel from "../models/NguyenLieuSuDung.model";

export default class CongThuc {
    static async save({
        ten,
        moTa,
        hinhAnh,
        thoiGian,
    }: {
        ten: string;
        moTa: string;
        hinhAnh: string;
        thoiGian: number;
    }) {
        const congThuc = new CongThucModel({
            ten,
            moTa,
            hinhAnh,
            thoiGian,
        });
        return await congThuc.save();
    }

    static async taoCongThucCungNguyenLieu({
        ten,
        moTa,
        hinhAnh,
        thoiGian,
        thanhPhan,
    }: {
        ten: string;
        moTa: string;
        hinhAnh: string;
        thoiGian: number;
        thanhPhan: any;
    }) {
        console.log({ ten, moTa, hinhAnh, thoiGian, thanhPhan });
        const congThuc = new CongThucModel({
            ten,
            moTa,
            hinhAnh,
            thoiGian,
        });
        const savedCongThuc = await congThuc.save();
        for (const { nguyenLieu, soLuong } of thanhPhan) {
            const nguyenLieuSuDung = new NguyenLieuSuDungModel({
                nguyenLieu,
                congThuc: savedCongThuc._id,
                soLuong,
            });
            await nguyenLieuSuDung.save();
        }
    }

    static async themCongThucVaoMonAn({
        congThucId,
        monAnId,
    }: {
        congThucId: string;
        monAnId: string;
    }) {
        const congThuc = await CongThucModel.findById(congThucId);
        const monAn = await MonAnModel.findById(monAnId);
        if (monAn) {
            monAn.congThuc.push(congThuc?.id);
        }
        return await monAn?.save();
    }

    static async getAll() {
        return await CongThucModel.find();
    }

    static async getById(id: string) {
        return await CongThucModel.findById(id);
    }

    static async getByIdDetail(id: string) {
        const congThuc = await CongThucModel.findById(id);
        const nguyenLieuSuDungs = await NguyenLieuSuDungModel.find({
            congThuc: congThuc?._id,
        }).populate("nguyenLieu");

        return {
            ...congThuc?.toObject(),
            nguyenLieuSuDungs,
        };
    }
}
