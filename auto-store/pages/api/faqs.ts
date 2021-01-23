import {NextApiResponse} from "next";
import {getFaqs} from "../../db-getters/getters";

const faqsAPI = async (res: NextApiResponse) => {
    const faqs = await getFaqs();
    res.json(faqs);
}

export default faqsAPI;
