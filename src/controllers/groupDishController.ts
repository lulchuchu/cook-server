import CookBookModel from '../models/GroupDish.model';
import CookBookService from '../services/groupDish.service';
import { Request, Response } from 'express';

class nhomCongThucController {
    async addCookBook(req: Request, res: Response): Promise<void> {
        const { idNguoiDung, tenNhomMonAn, idMonAn } = req.body;
        try {
            const data = await CookBookService.createCookBook(idNguoiDung, tenNhomMonAn, idMonAn);

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
            const cookBook = await CookBookModel.findOne({ _id: idCookBook, user: idUser });

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

    async getAllCookBook(req: Request, res: Response): Promise<void> {
        const idNguoiDung = req.query.idNguoiDung as string;
        try {
            const data = await CookBookService.getAllCookBook(idNguoiDung);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data.nhomMonAns);
        } catch (e) {
            res.status(500).send({ message: 'Lỗi server!' });
        }
    }

    getAllDishOfCookBook = async (req: Request, res: Response) => {
        const idNhomMonAn = req.query.idNhomMonAn as string;
        try {
            const data = await CookBookService.getDishOfCookBook(idNhomMonAn);

            // if (data?.error) {
            //     return res.status(400).json({ message: data.error });
            // }

            return res.status(200).send(data);
        } catch (e) {
            return res.status(500).send({ message: 'Lỗi server!' });
        }
    };

    eraseDishFromCookBook = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn, idNhomMonAn } = req.body;
        try {
            const data = await CookBookService.eraseDishOfCookBook(idNguoiDung, idMonAn, idNhomMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: 'Lỗi server!' });
        }
    };

    eraseCookBook = async (req: any, res: any) => {
        const { idNhomMonAn } = req.params;
        try {
            const data = await CookBookService.eraseCookBook(idNhomMonAn);

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
