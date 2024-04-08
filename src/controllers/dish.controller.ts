import { Request, Response } from 'express';
import DishModel from '../models/Dish.model';
import DishService from '../services/dish.service';
import { Types } from 'mongoose';

class DishController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const dishs = await DishModel.find({});
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
            const dishs = await DishModel.find({ type: type });
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
            const dishs = await DishModel.find({ country: country });
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
            const dish = await DishModel.findById(_id).populate('ingredients').exec();
            res.status(200).send(dish);
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    saveDish = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn, idNhomMonAn } = req.body;

        try {
            const data = await DishService.saveDish(idNguoiDung, idMonAn, idNhomMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ error: 'Lỗi server!' });
        }
    };

    unsaveDish = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn } = req.body;

        try {
            const data = await DishService.unsaveDish(idNguoiDung, idMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: 'Lỗi server!' });
        }
    };

    likeDish = async (req: any, res: any) => {
        const { idNguoiDung, idMonAn } = req.body;
        try {
            const data = await DishService.likeDish(idNguoiDung, idMonAn);

            if (data?.error) {
                return res.status(400).json({ message: data.error });
            }
            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({ message: 'Lỗi server!' });
        }
    };

    async getLikedOfUser(req: Request, res: Response): Promise<void> {
        try {
            const user = req.query.user as string;
            const dishs = await DishModel.find();
            var dishLiked = [];
            for (const dish of dishs) {
                if (dish.likes.includes(new Types.ObjectId(user))) {
                    dishLiked.push(dish);
                }
            }

            res.status(200).send(dishLiked);
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default new DishController();
