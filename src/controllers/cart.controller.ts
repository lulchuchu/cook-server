import DonhangModel from '../models/Donhang.model';
import { Request, Response } from 'express';

class CartController {
    async addCart(req: Request, res: Response): Promise<void> {
        try {
            const { img, nameDish, idDish, idUser, idIngre, meal } = req.body;
            const cart = new DonhangModel({
                img: img,
                nameDish: nameDish,
                dish: idDish,
                customer: idUser,
                ingredient: idIngre,
                meal: meal,
                state: 'Đang chờ',
            });
            const saved = await cart.save();
            if (saved) {
                res.status(200).send({ message: 'Success!' });
            } else {
                res.status(401).send({ message: 'Failed to save' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getCart(req: Request, res: Response): Promise<void> {
        try {
            const idUser = req.query.idUser;
            const carts = await DonhangModel.find({ customer: idUser }).populate('ingredient').exec();
            if (carts) {
                res.status(200).send(carts);
            } else {
                res.status(404).send({ message: 'Not found!' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getCartDetail(req: Request, res: Response): Promise<void> {
        try {
            const _idCart = req.query.idCart;
            const cart = await DonhangModel.findById(_idCart).populate('nguyenlieu').exec();

            if (cart) {
                res.status(200).send(cart);
            } else {
                res.status(401).send({ message: 'Failed' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async updateCart(req: Request, res: Response): Promise<void> {
        try {
            const _idCart = req.body.idCart;
            const updated = await DonhangModel.updateOne(
                { _id: _idCart },
                {
                    $set: {
                        state: 'Đang giao',
                    },
                },
            );
            if (updated) {
                res.status(200).send({ message: 'Updated successfully!' });
            } else {
                res.status(401).send({ message: 'Updated Failed!' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default new CartController();
