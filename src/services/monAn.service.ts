import MonAnModel from "../models/MonAn.model";

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
        return await MonAnModel.findById(id).populate("congThuc");
    }
}
