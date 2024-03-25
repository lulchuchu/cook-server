import ThanhPhanDinhDuongModel from "../models/ThanhPhanDinhDuong.model";

export default class ThanhPhanDinhDuong {
    static async save({
        ten,
        donViDo,
        moTa,
    }: {
        ten: string;
        donViDo: string;
        moTa: string;
    }) {
        const thanhPhanDinhDuong = new ThanhPhanDinhDuongModel({
            ten,
            donViDo,
            moTa,
        });
        return await thanhPhanDinhDuong.save();
    }

    static async getAll() {
        return await ThanhPhanDinhDuongModel.find();
    }

    static async getById(id: string) {
        return await ThanhPhanDinhDuongModel.findById(id);
    }
}
