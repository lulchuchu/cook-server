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

    luuMonAn = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn, idNhomMonAn } = req.body;

        try {
            const data = await MonAnService.xuLuLuuMonAn(
                idNguoiDung,
                idMonAn,
                idNhomMonAn
            );

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ error: "Lỗi server!" });
        }
    };

    boLuuMonAn = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn } = req.body;

        try {
            const data = await MonAnService.xuLyBoLuuMonAn(
                idNguoiDung,
                idMonAn
            );

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };

    likeMonAn = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn } = req.body;
        try {
            const data = await MonAnService.thaLikeMonAn(idNguoiDung, idMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }
            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };
}

export default new MonAnController();
