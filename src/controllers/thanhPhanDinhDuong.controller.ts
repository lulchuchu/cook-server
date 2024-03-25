import ThanhPhanDinhDuongService from "../services/thanhPhanDinhDuong.service";
class ThanhPhanDinhDuongController {
    getThanhPhanDinhDuongTheoId = async (req: any, res: any) => {
        const { id } = req.params;
        const thanhPhanDinhDuong = ThanhPhanDinhDuongService.getById(id);
        res.json(thanhPhanDinhDuong);
    };
    getTatCaThanhPhanDinhDuong = async (req: any, res: any) => {
        const thanhPhanDinhDuong = ThanhPhanDinhDuongService.getAll();
        res.json(thanhPhanDinhDuong);
    };
    themThanhPhanDinhDuong = async (req: any, res: any) => {
        const { ten, donViDo, moTa } = req.body;
        ThanhPhanDinhDuongService.save({
            ten,
            donViDo,
            moTa,
        });
        res.send("Thêm thành phần dinh dưỡng thành công");
    };
}

export default new ThanhPhanDinhDuongController();
