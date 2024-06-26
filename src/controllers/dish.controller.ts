import { Request, Response } from 'express';
import DishModel from '../models/Dish.model';
import DishService from '../services/dish.service';
import { FilterQuery, Types } from 'mongoose';
import { WithId } from 'mongodb';
import AccountLikeDishModel from '../models/AccountLikeDish.model';

type DiacriticKey = 'a' | 'e' | 'i' | 'o' | 'u' | 'y';

class DishController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const dishs = await DishModel.find({});

            const data = [];
            for (const dish of dishs) {
                const numLikesOfDish = await AccountLikeDishModel.find({ dish: dish._id });
                const arrayIdAccountLike = numLikesOfDish.map((item) => item.account);
                const item = {
                    _id: dish._id,
                    img: dish.imgDes,
                    name: dish.name,
                    numberLike: numLikesOfDish.length || 0,
                    likes: arrayIdAccountLike || [],
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

    // hàm thừa chưa được sử dụng
    async getAllDish(req: Request, res: Response): Promise<void> {
        try {
            const dishs = await DishModel.find({});
            const data = [];
            for (const dish of dishs) {
                const numLikesOfDish = await AccountLikeDishModel.findOne({ dish: dish._id });
                const item = {
                    _id: dish._id,
                    img: dish.imgDes,
                    name: dish.name,
                    numberLike: numLikesOfDish,
                    type: dish.type,
                    country: dish.country,
                };
                data.push(item);
            }
            res.status(200).send(data);
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async prepareRegexPattern(keyword: string): Promise<string> {
        const diacriticsMap: Record<DiacriticKey, string> = {
            a: '[aáàảãạăắằẳẵặâấầẩẫậ]',
            e: '[eéèẻẽẹêếềểễệ]',
            i: '[iíìỉĩị]',
            o: '[oóòỏõọôốồổỗộơớờởỡợ]',
            u: '[uúùủũụưứừửữự]',
            y: '[yýỳỷỹỵ]',
        };

        return `.*${keyword
            .split('')
            .map((char) => diacriticsMap[char as DiacriticKey] || char)
            .join('.*')}.*`;
    }

    async searchDish(req: Request, res: Response): Promise<void> {
        try {
            const key = req.query.key as string;
            const diacriticsMap: Record<DiacriticKey, string> = {
                a: '[aáàảãạăắằẳẵặâấầẩẫậ]',
                e: '[eéèẻẽẹêếềểễệ]',
                i: '[iíìỉĩị]',
                o: '[oóòỏõọôốồổỗộơớờởỡợ]',
                u: '[uúùủũụưứừửữự]',
                y: '[yýỳỷỹỵ]',
            };

            const keyword = `.*${key
                .split('')
                .map((char) => diacriticsMap[char as DiacriticKey] || char)
                .join('.*')}.*`;
            // const regexPattern =  await this.prepareRegexPattern(key);
            const query: FilterQuery<WithId<any>> = {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { country: { $regex: keyword, $options: 'i' } },
                    { type: { $regex: keyword, $options: 'i' } },
                    { desciption: { $regex: keyword, $options: 'i' } },
                ],
            };

            const data = await DishModel.find(query).select('_id name imgDes');
            res.status(200).send(data);
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getByDiet(req: Request, res: Response): Promise<void> {
        try {
            const diet = req.query.key;
            if (diet === 'Ăn chay') {
                const dishs = await DishModel.find({ type: 'Món chay' });
                const data = [];
                for (const dish of dishs) {
                    const numLikesOfDish = await AccountLikeDishModel.find({ dish: dish._id });
                    const arrayIdAccountLike = numLikesOfDish.map((item) => item.account);
                    const item = {
                        _id: dish._id,
                        img: dish.imgDes,
                        name: dish.name,
                        numberLike: numLikesOfDish.length || 0,
                        likes: arrayIdAccountLike || [],
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
            }
            else {
                const dishs = await DishModel.find().select('_id nuttrition name imgDes type country');
                const data = [];
                for (const dish of dishs) {
                    const numLikesOfDish = await AccountLikeDishModel.find({ dish: dish._id });
                    const arrayIdAccountLike = numLikesOfDish.map((item) => item.account);
                    const nuttrition = dish.nuttrition;
                    const fat = parseInt(nuttrition['Fat'].toString().split(' ')[0]);
                    const carb = parseInt(nuttrition['Carb'].toString().split(' ')[0]);
                    if (fat <= 40 && carb <= 60) {
                        const item = {
                            _id: dish._id,
                            nuttrition: dish.nuttrition,
                            name: dish.name,
                            img: dish?.imgDes,
                            type: dish.type,
                            country: dish.country,
                            likes: arrayIdAccountLike || []
                        }
                        data.push(item);
                    }
                }
                res.send(data.slice()
                .sort(() => Math.random() - 0.5)
                .slice(0, 5));
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    async getDishsByType(req: Request, res: Response): Promise<void> {
        try {
            const type = req.query.type;
            if (type !== 'Mỳ') {
                const dishs = await DishModel.find({type: type}).select('_id name imgDes');
                const data = [];
                for (const dish of dishs) {
                    const numLikesOfDish = await AccountLikeDishModel.find({ dish: dish._id });
                    const arrayIdAccountLike = numLikesOfDish.map((item) => item.account);
                    const item = {
                        _id: dish._id,
                        name: dish.name,
                        img: dish.imgDes,
                        likes: arrayIdAccountLike
                    }
                    data.push(item);
                }
                res.status(200).send(data.slice().sort(() => Math.random() - 0.5));
            }
            else {
                const query: FilterQuery<WithId<any>> = {
                    $or: [
                        { name: { $regex: 'Mỳ', $options: 'i' } },
                        { name: { $regex: 'Phở', $options: 'i' } },
                        { name: { $regex: 'Bún', $options: 'i' } },
                        { desciption: { $regex: 'Mỳ', $options: 'i' } },
                    ],
                };
                const dishs = await DishModel.find(query).select('_id name imgDes');
                const data = [];
                for (const dish of dishs) {
                    const numLikesOfDish = await AccountLikeDishModel.find({ dish: dish._id });
                    const arrayIdAccountLike = numLikesOfDish.map((item) => item.account);
                    const item = {
                        _id: dish._id,
                        name: dish.name,
                        img: dish.imgDes,
                        likes: arrayIdAccountLike
                    }
                    data.push(item);
                }
                res.status(200).send(data.slice().sort(() => Math.random() - 0.5));
            }
        }
        catch(err: any) {
            res.status(500).send({message: err.message});
        }
    }

    async getByCountry(req: Request, res: Response): Promise<void> {
        try {
            const country = req.query.key;
            const dishs = await DishModel.find({ country: country });
            const data = [];
            for (const dish of dishs) {
                const numLikesOfDish = await AccountLikeDishModel.find({ dish: dish._id });
                const arrayIdAccountLike = numLikesOfDish.map((item) => item.account);
                const item = {
                    _id: dish._id,
                    img: dish.imgDes,
                    name: dish.name,
                    numberLike: numLikesOfDish.length || 0,
                    likes: arrayIdAccountLike,
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
            const currentDish = await DishModel.findById(_id).populate('ingredients').exec();
            const numLikesOfDish = await AccountLikeDishModel.find({ dish: _id });
            const arrayIdAccountLike = numLikesOfDish.map((item) => item.account);
            const dish = {
                _id: currentDish?._id,
                name: currentDish?.name,
                video: currentDish?.video,
                likes: arrayIdAccountLike,
                imgDes: currentDish?.imgDes,
                description: currentDish?.description,
                type: currentDish?.type,
                defaultPortion: currentDish?.defaultPortion,
                ingredients: currentDish?.ingredients,
                utensils: currentDish?.utensils,
                nuttrition: currentDish?.nuttrition,
                step: currentDish?.step,
                country: currentDish?.country,
                updatedAt: currentDish?.updatedAt,
            };

            res.status(200).send(dish);
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }

    // thả tym món ăn
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
            const dishLiked = await DishService.getLikeDishesOfAccount(user);
            res.status(200).json(dishLiked);
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default new DishController();
