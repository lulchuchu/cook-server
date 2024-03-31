import nhomCongThucService from "../services/nhomMonAn.service";

class nhomCongThucController {
    themNhomMonAn = async (req: any, res: any) => {
        const { idNguoiDung, tenNhomMonAn } = req.body;
        try {
            const data = await nhomCongThucService.taoNhomMonAn(
                idNguoiDung,
                tenNhomMonAn
            );

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };

    layTatCaNhomMonAnCuaND = async (req: any, res: any) => {
        const { idNguoiDung } = req.params;
        try {
            const data =
                await nhomCongThucService.layTatCaNhomMonAnCuaNguoiDung(
                    idNguoiDung
                );

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };

    layTatCaMonAnTrongNhomMA = async (req: any, res: any) => {
        const { idNhomMonAn } = req.params;
        try {
            const data = await nhomCongThucService.layTatCaMonAnTrongNhomMonAn(
                idNhomMonAn
            );

            // if (data?.error) {
            //     return res.status(400).json({ message: data.error });
            // }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };

    xoaMonAnKhoiNhom = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn, idNhomMonAn } = req.body;
        try {
            const data = await nhomCongThucService.xoaMonAnKhoiNhom(
                idNguoiDung,
                idMonAn,
                idNhomMonAn
            );

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };

    xoaNhomMonAn = async (req: any, res: any) => {
        const { idNhomMonAn } = req.params;
        try {
            const data = await nhomCongThucService.xoaNhomMonAn(idNhomMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: "Lỗi server!" });
        }
    };
}

export default new nhomCongThucController();
