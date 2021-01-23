import {NextApiRequest, NextApiResponse} from "next";
import {getModel } from "../../db-getters/getters";
import {convertToStr} from "../../convertFunctions";

const modelsAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    const make = convertToStr(req.query.make);
    const model = await getModel(make);
    res.json(model);
}

export default modelsAPI;
