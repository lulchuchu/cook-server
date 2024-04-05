import { Request, Response } from 'express';
import MonAnModel from '../models/MonAn.model';
import MonAnService from '../services/monAn.service';

class MonAnController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const dishs = await MonAnModel.find({});
            const data = [];
            for (const dish of dishs) {
                const item = {
                    _id: dish._id,
                    img: dish.imgDes,
                    name: dish.name,
                    numberLike: dish.likes.length,
                    type: dish.type,
                    country: dish.country,
                };
                data.push(item);
            }
            res.status(200).send(
                data
                    .slice()
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5),
            );
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getByDiet(req: Request, res: Response): Promise<void> {
        try {
            const diet = req.query.key;
            var type = '';
            if (diet === 'Ăn chay') {
                type = 'Món chay';
            }
            const dishs = await MonAnModel.find({ type: type });
            const data = [];
            for (const dish of dishs) {
                const item = {
                    _id: dish._id,
                    img: dish.imgDes,
                    name: dish.name,
                    numberLike: dish.likes.length,
                    type: dish.type,
                    country: dish.country,
                };
                data.push(item);
            }
            res.status(200).send(
                data
                    .slice()
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5),
            );
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getByCountry(req: Request, res: Response): Promise<void> {
        try {
            const country = req.query.key;
            const dishs = await MonAnModel.find({ country: country });
            const data = [];
            for (const dish of dishs) {
                const item = {
                    _id: dish._id,
                    img: dish.imgDes,
                    name: dish.name,
                    numberLike: dish.likes.length,
                    type: dish.type,
                    country: dish.country,
                };
                data.push(item);
            }
            res.status(200).send(
                data
                    .slice()
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5),
            );
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getDishDetail(req: Request, res: Response): Promise<void> {
        try {
            const _id = req.query._id;
            const dish = await MonAnModel.findById(_id).populate('ingredients').exec();
            res.status(200).send(dish);
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
    taoMon = async (req: any, res: any) => {
        const { ten, hinhAnh, moTa, congThuc } = req.body;
        MonAnService.themMon({ ten, hinhAnh, moTa, congThuc });
        res.send('Tạo món thành công');
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
            const data = await MonAnService.xuLuLuuMonAn(idNguoiDung, idMonAn, idNhomMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ error: 'Lỗi server!' });
        }
    };

    boLuuMonAn = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn } = req.body;

        try {
            const data = await MonAnService.xuLyBoLuuMonAn(idNguoiDung, idMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: 'Lỗi server!' });
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
            return res.status(500).json({ message: 'Lỗi server!' });
        }
    };
}

export default new MonAnController();
