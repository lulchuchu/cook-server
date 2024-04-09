import NhomMonAnModel from '../models/NhomMonAn.model';
import nhomCongThucService from '../services/nhomMonAn.service';
import { Request, Response } from 'express';

class nhomCongThucController {
    async themNhomMonAn(req: Request, res: Response): Promise<void> {
        const { idNguoiDung, tenNhomMonAn, idMonAn } = req.body;
        try {
            const data = await nhomCongThucService.taoNhomMonAn(idNguoiDung, tenNhomMonAn, idMonAn);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data.saveNhomMA);
        } catch (e) {
            res.status(500).send({ message: 'Lỗi server!' });
        }
    }

    async addDishToCookBook(req: Request, res: Response): Promise<void> {
        const { idCookBook, idDish, idUser } = req.body;

        try {
            const cookBook = await NhomMonAnModel.findOne({ _id: idCookBook, user: idUser });

            if (cookBook?.dishs.includes(idDish)) {
                res.status(400).send({ message: 'Món đã được thêm trước đó!' });
            } else {
                const updated = await cookBook?.updateOne({
                    $push: {
                        dishs: idDish,
                    },
                });
                if (updated) {
                    res.status(200).send({ message: 'Add successfully' });
                } else {
                    res.status(400).send({ message: 'Add failed' });
                }
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async layTatCaNhomMonAnCuaND(req: Request, res: Response): Promise<void> {
        const idNguoiDung = req.query.idNguoiDung as string;
        try {
            const data = await nhomCongThucService.layTatCaNhomMonAnCuaNguoiDung(idNguoiDung);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data.nhomMonAns);
        } catch (e) {
            res.status(500).send({ message: 'Lỗi server!' });
        }
    }

    layTatCaMonAnTrongNhomMA = async (req: any, res: any) => {
        const { idNhomMonAn } = req.params;
        try {
            const data = await nhomCongThucService.layTatCaMonAnTrongNhomMonAn(idNhomMonAn);

            // if (data?.error) {
            //     return res.status(400).json({ message: data.error });
            // }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: 'Lỗi server!' });
        }
    };

    xoaMonAnKhoiNhom = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn, idNhomMonAn } = req.body;
        try {
            const data = await nhomCongThucService.xoaMonAnKhoiNhom(idNguoiDung, idMonAn, idNhomMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: 'Lỗi server!' });
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
            return res.status(500).json({ message: 'Lỗi server!' });
        }
    };
}

export default new nhomCongThucController();
