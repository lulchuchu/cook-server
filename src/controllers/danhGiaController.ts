import danhGiaService from "../services/danhGia.service";

class danhGiaController {
    themDanhGia = async (req: any, res: any) => {
        const { idMonAn, idNguoiDung, diemDanhGia, img, noiDung } = req.body;

        try {
            const data = await danhGiaService.themDanhGiaMonAn(
                idMonAn,
                idNguoiDung,
                diemDanhGia,
                img,
                noiDung
            );

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };

    xoaDanhGia = async (req: any, res: any) => {
        const { idDanhGia, idMonAn } = req.body;
        try {
            const data = await danhGiaService.xoaDanhGiaMonAn(
                idDanhGia,
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

    layTatCaDanhGia = async (req: any, res: any) => {
        const { idMonAn } = req.params;
        try {
            const data = await danhGiaService.layDanhGiaMonAn(idMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };
}

export default new danhGiaController();
