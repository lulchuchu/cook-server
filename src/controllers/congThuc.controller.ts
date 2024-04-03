import congThucService from "../services/congThuc.service";

class CongThucController {
    themCongThuc = async (req: any, res: any) => {
        const { ten, moTa, hinhAnh, thoiGian } = req.body;
        congThucService.save({ ten, moTa, hinhAnh, thoiGian });
        res.send("Thêm nguyên liệu thành công");
    };

    layTatCaCongThuc = async (req: any, res: any) => {
        const congThuc = await congThucService.getAll();
        res.send(congThuc);
    };

    layCongThucTheoId = async (req: any, res: any) => {
        const { id } = req.params;
        const congThuc = await congThucService.getById(id);
        res.send(congThuc);
    };

    layCongThucTheoIdDetail = async (req: any, res: any) => {
        const { id } = req.params;
        const congThuc = await congThucService.getByIdDetail(id);
        res.send(congThuc);
    };

    taoCongThucCungNguyenLieu = async (req: any, res: any) => {
        const { ten, moTa, hinhAnh, thoiGian, thanhPhan } = req.body;
        congThucService.taoCongThucCungNguyenLieu({
            ten,
            moTa,
            hinhAnh,
            thoiGian,
            thanhPhan,
        });
        res.send("Tạo công thức cùng nguyên liệu thành công");
    };

    taoCongThucVaThemVaoMonAn = async (req: any, res: any) => {
        const { ten, moTa, hinhAnh, thoiGian, monAnId } = req.body;

        const congThuc = await congThucService.save({
            ten,
            moTa,
            hinhAnh,
            thoiGian,
        });

        const congThucId = congThuc._id.toString(); // Convert ObjectId to string
        congThucService.themCongThucVaoMonAn({ congThucId, monAnId });
        res.send("Tạo công thức và thêm vào món ăn thành công");
    };

    themCongThucVaoMonAn = async (req: any, res: any) => {
        const { congThucId, monAnId } = req.body;
        congThucService.themCongThucVaoMonAn({ congThucId, monAnId });
        res.send("Thêm công thức vào món ăn thành công");
    };
}

export default new CongThucController();
