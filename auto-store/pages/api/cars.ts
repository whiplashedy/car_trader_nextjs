import {NextApiRequest, NextApiResponse} from "next";
import {getPaginatedCars} from "../../db-getters/getters";

const carsAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    const cars = await getPaginatedCars(req.query)
    res.json(cars);
}

export default carsAPI;
