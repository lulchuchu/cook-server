import MonAnService from "../services/monAn.service";

class MonAnController {
    taoMon = async (req: any, res: any) => {
        const { ten, hinhAnh, moTa, congThuc } = req.body;
        MonAnService.themMon({ ten, hinhAnh, moTa, congThuc });
        res.send("Tạo món thành công");
    };

    layTatCaMon = async (req: any, res: any) => {
        const monAn = await MonAnService.getAll();
        res.send(monAn);
    };

    layMonTheoId = async (req: any, res: any) => {
        const { id } = req.params;
        const monAn = await MonAnService.getById(id);
        res.send(monAn);
    };
}

export default new MonAnController();
