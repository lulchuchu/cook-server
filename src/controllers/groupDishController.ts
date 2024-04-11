import CookBookModel from '../models/GroupDish.model';
import CookBookService from '../services/groupDish.service';
import { Request, Response } from 'express';

class groupDishController {
    // tạo nhóm món ăn
    addCookBook = async (req: Request, res: Response) => {
        const { idNguoiDung, tenNhomMonAn, idMonAn } = req.body;
        try {
            const data = await CookBookService.createCookBook(idNguoiDung, tenNhomMonAn, idMonAn);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data.saveGroupDish);
        } catch (e) {
            res.status(500).send({ message: 'Lỗi server!' });
        }
    };

    // Thêm món ăn vào nhóm món ăn
    addDishToCookBook = async (req: Request, res: Response) => {
        const { idCookBook, idDish, idUser } = req.body;

        try {
            // const cookBook = await CookBookModel.findOne({ _id: idCookBook, user: idUser });

            // if (cookBook?.dishs.includes(idDish)) {
            //     res.status(400).send({ message: 'Món đã được thêm trước đó!' });
            // } else {
            //     const updated = await cookBook?.updateOne({
            //         $push: {
            //             dishs: idDish,
            //         },
            //     });
            //     if (updated) {
            //         res.status(200).send({ message: 'Add successfully' });
            //     } else {
            //         res.status(400).send({ message: 'Add failed' });
            //     }
            // }

            const data = await CookBookService.addDishToCookBook(idCookBook, idDish, idUser);
            console.log(data);
            if (data?.error) {
                return res.status(400).json({ message: data?.error });
            }

            return res.status(200).json(data);
        } catch (err: any) {
            return res.status(500).send({ message: err.message });
        }
    };

    // lấy tất cả nhóm món ăn của 1 người dùng
    getAllCookBook = async (req: Request, res: Response) => {
        const idNguoiDung = req.query.idNguoiDung as string;
        try {
            const data = await CookBookService.getAllCookBook(idNguoiDung);

            if (data?.error) {
                res.status(400).send({ message: data.error });
            }

            res.status(200).send(data.groupDishes);
        } catch (e) {
            res.status(500).send({ message: 'Lỗi server!' });
        }
    };

    // lấy tất cả món ăn của 1 nhóm món ăn
    getAllDishOfCookBook = async (req: Request, res: Response) => {
        const idNhomMonAn = req.query.idNhomMonAn as string;
        try {
            const data = await CookBookService.getDishesOfCookBook(idNhomMonAn);

            // if (data?.error) {
            //     return res.status(400).json({ message: data.error });
            // }

            return res.status(200).send(data);
        } catch (e) {
            return res.status(500).send({ message: 'Lỗi server!' });
        }
    };

    // xóa 1 món ăn từ nhóm món ăn
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

    // xóa nhóm món ăn
    eraseCookBook = async (req: any, res: any) => {
        const { idCookBook } = req.params;
        try {
            const data = await CookBookService.eraseCookBook(idCookBook);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: 'Lỗi server!' });
        }
    };
}

export default new groupDishController();
