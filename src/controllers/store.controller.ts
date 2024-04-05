import StoreModel from '../models/Store.model';
import { Request, Response } from 'express';
import axios from 'axios';
import getDistance from 'geolib/es/getPreciseDistance';

class StoreController {
    async countDistance(req: Request, res: Response): Promise<void> {
        const address = req.query.address as string;
        const cordinate = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        );
        if (cordinate.data.length > 0) {
            const location = cordinate.data[0];
            const longitude = location.lon;
            const latitude = location.lat;
            const cordinateCustomer = {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            };
            const stores = await StoreModel.find();
            var arr = [];
            var minDistance = Infinity;
            var nearStore = null;
            for (const store of stores) {
                const cordinateStore = {
                    latitude: parseFloat(store.latitude as string),
                    longitude: parseFloat(store.longitude as string),
                };
                const distance = getDistance(cordinateCustomer, cordinateStore);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearStore = store;
                }
            }
            const data = {
                minDistance,
                nearStore,
            };
            res.status(200).send(data);
        } else {
            res.status(401).send({ message: 'Địa chỉ cần chi tiết hơn!' });
        }
    }
}

export default new StoreController();
