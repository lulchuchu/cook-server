import ratingService from '../services/rating.service';
import { Request, Response } from 'express';

class ratingController {
    createRating = async (req: Request, res: Response) => {
        const { idMonAn, idNguoiDung, diemDanhGia, img, noiDung } = req.body;

        try {
            const data = await ratingService.createRating(idMonAn, idNguoiDung, diemDanhGia, img, noiDung);

            if (data?.error) {
                return res.status(400).send({ message: data.error });
            }

            return res.status(200).send(data.danh_gia);
        } catch (e: any) {
            return res.status(500).send({ message: e.message });
        }
    };

    eraseRating = async (req: any, res: any) => {
        const { idDanhGia, idMonAn } = req.body;
        try {
            const data = await ratingService.eraseRating(idDanhGia, idMonAn);

            if (data?.error) {
                return res.status(400).send({ message: data.error });
            }

            return res.status(200).send(data);
        } catch (e) {
            return res.status(500).send({ message: 'Lỗi server!' });
        }
    };

    getRating = async (req: Request, res: Response) => {
        const idMonAn = req.query.idMonAn as string;
        try {
            const data = await ratingService.getRating(idMonAn);

            if (data?.error) {
                return res.status(400).send({ message: data.error });
            }

            return res.status(200).send(data);
        } catch (e) {
            return res.status(500).send({ message: 'Lỗi server!' });
        }
    };
}

export default new ratingController();
