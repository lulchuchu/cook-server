import MonAnService from "../services/monAn.service";

export default class MonAnController {
    taoMon = async (req: any, res: any) => {
        const { ten, hinhAnh, moTa, congThuc } = req.body;
        const monAn = new MonAnService({ ten, hinhAnh, moTa, congThuc });
        monAn.save();
        res.send("Tạo món thành công");
    };
}
