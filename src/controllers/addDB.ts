import IngredientModel from '../models/Ingredient.model';
import { Request, Response } from 'express';
import axios from 'axios';
import StoreModel from '../models/Store.model';

class createDB {
    async createIngredients(req: Request, res: Response): Promise<void> {
        try {
            const keyIngre = req.body.key;
            const valueIngre = req.body.value;
            const units = req.body.units;
            const prices = req.body.prices;

            const newIngredients = new IngredientModel({
                name: keyIngre,
                quantity: valueIngre,
                unit: units,
                price: prices,
            });

            const saved = await newIngredients.save();
            if (!saved) res.status(401).send('Failed!');
            else res.status(200).send(saved._id);
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }

    async addStore(req: Request, res: Response): Promise<void> {
        try {
            const { address, staf, tel } = req.body as { address: string; staf?: string; tel?: string };
            var longitude = 0;
            var latitude = 0;
            const cordinate = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
            );
            if (cordinate.data.length > 0) {
                const location = cordinate.data[0];
                longitude = location.lon;
                latitude = location.lat;
            }
            const newStore = new StoreModel({
                address: address,
                staf: staf,
                tel: tel,
                longitude: longitude,
                latitude: latitude,
            });
            const saved = await newStore.save();
            if (saved) {
                res.status(200).send('Success!');
            } else {
                res.status(401).send('Failed to save!');
            }
        } catch (err: any) {
            res.status(500).send({ message: err.message });
        }
    }
}

export default new createDB();
