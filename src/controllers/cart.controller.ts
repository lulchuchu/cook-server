import CartModel from '../models/Cart.model';
import { Request, Response } from 'express';

class CartController {
    async addCart(req: Request, res: Response): Promise<void> {
        try {
            const { img, nameDish, idDish, idUser, idIngre, meal } = req.body;
            const order = await CartModel.findOne({nameDish: nameDish, state: "Đang chờ"});
            if (order) {
                res.status(400).send({message: 'Nguyên liệu đã có trong giỏ hàng'});
            }
            else {
                const cart = new CartModel({
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
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getCart(req: Request, res: Response): Promise<void> {
        try {
            const idUser = req.query.idUser;
            const carts = await CartModel.find({ customer: idUser }).populate('ingredient').exec();
            if (carts) {
                res.status(200).send(carts.reverse());
            } else {
                res.status(404).send({ message: 'Not found!' });
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getCartDetail(req: Request, res: Response): Promise<void> {
        try {
            const idCart = req.query.idCart;
            const cart = await CartModel.findById(idCart).populate('nguyenlieu').exec();

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
            const idCart = req.body.idCart;
            const state = req.body.state;
            CartModel.updateOne(
                { _id: idCart },
                {
                    $set: {
                        state: state,
                    },
                },
                { new: true },
            )
                .then((updated) => {
                    res.status(200).send(updated);
                })
                .catch((err: any) => {
                    res.status(401).send({ message: 'Updated Failed!' });
                });
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async cancelCart(req: Request, res: Response) {
        try {
            const idCart = req.body.idCart;
            CartModel.updateOne(
                { _id: idCart },
                {
                    $set: {
                        state: 'Đã hủy',
                    },
                },
                { new: true },
            )
                .then((updated) => {
                    res.status(200).send(updated);
                })
                .catch((err: any) => {
                    res.status(401).send({ message: 'Updated Failed!' });
                });
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default new CartController();
