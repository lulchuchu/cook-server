import MonAnModel from '../models/MonAn.model';

export default class MonAn {
    ten: string;
    hinhAnh: string;
    moTa: string;
    congThuc: string[];
    constructor({ ten, hinhAnh, moTa, congThuc }: { ten: string; hinhAnh: string; moTa: string; congThuc: string[] }) {
        this.ten = ten;
        this.hinhAnh = hinhAnh;
        this.moTa = moTa;
        this.congThuc = congThuc;
    }

    async save() {
        const monAn = new MonAnModel({
            ten: this.ten,
            hinhAnh: this.hinhAnh,
            moTa: this.moTa,
            congThuc: this.congThuc,
        });
        await monAn.save();
    }
}
