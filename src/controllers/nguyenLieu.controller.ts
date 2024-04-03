import NguyenLieuService from "../services/nguyenLieu.service";

class NguyenLieuController {
    themNguyenLieu = async (req: any, res: any) => {
        const { ten, gia, hinhAnh, donViTinh } = req.body;
        NguyenLieuService.save({ ten, gia, hinhAnh, donViTinh });
        res.send("Thêm nguyên liệu thành công");
    };

    themNguyenLieuVaThanhPhanDinhDuong = async (req: any, res: any) => {
        const { ten, gia, hinhAnh, donViTinh, thanhPhanDinhDuong, soLuong } =
            req.body;
        NguyenLieuService.themNguyenLieuVaThanhPhanDinhDuong({
            ten,
            gia,
            hinhAnh,
            donViTinh,
            thanhPhanDinhDuong,
            soLuong,
        });
        res.send("Thêm nguyên liệu và thành phần dinh dưỡng thành công");
    };

    layTatCaNguyenLieu = async (req: any, res: any) => {
        const nguyenLieus = await NguyenLieuService.getAll();
        res.json(nguyenLieus);
    };

    layNguyenLieuTheoId = async (req: any, res: any) => {
        const { id } = req.params;
        const nguyenLieu = await NguyenLieuService.getByIdDetail(id);
        console.log({ nguyenLieu });
        res.json(nguyenLieu);
    };
}

export default new NguyenLieuController();
