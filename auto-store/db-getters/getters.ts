import {PrismaClient} from "@prisma/client";
import {ParsedUrlQuery} from "querystring";
import {getValueNumber, getValueStr} from "../convertFunctions";

const prisma = new PrismaClient();

export const getMake = async () => {
    const make = await prisma.$queryRaw(`
    SELECT make, count(*) as count
    FROM car
    GROUP BY make
  `);
    return make;
}

export const getModel = async (make: string) => {
    const model = await prisma.car.groupBy({
        by: ['model'],
        where: {
            make: make
        },
        count: {
            model: true
        }
    })
    return model;
}

export const getPaginatedCars = async (query: ParsedUrlQuery) => {
    const page = getValueNumber(query.page) || 1;
    const rowsPerPage = getValueNumber(query.rowsPerPage) || 4;
    const offset = (page - 1) * rowsPerPage;
    const dbParams = {
        make: getValueStr(query.make),
        model: getValueStr(query.model),
        maxPrice: getValueNumber(query.maxPrice) || 1000000,
        minPrice: getValueNumber(query.minPrice) || 0,

    };
    let cars = null;
    const totalCount = await prisma.car.count();
    if(!dbParams.make){
        cars = await prisma.car.findMany({
            where: {
            price: {
                gte: dbParams.minPrice,
                lte: dbParams.maxPrice
            }
            },
            skip: offset,
            take: rowsPerPage
        });
    }
    else if(!dbParams.model) {
        cars = await prisma.car.findMany({
            where: {
                make: dbParams.make,
                price: {
                    gte: dbParams.minPrice,
                    lte: dbParams.maxPrice
                }
            },
            skip: offset,
            take: rowsPerPage
        })
    }
    else {
        cars = await prisma.car.findMany({
            where: {
                AND:[{
                    make: dbParams.make,
                    model: dbParams.model,
                    price: {
                        gte: dbParams.minPrice,
                        lte: dbParams.maxPrice
                    }
                }]
            }
        })
    }
    return {cars, totalCount: Math.ceil(totalCount/rowsPerPage)};
}

export const getFaqs = async () => {
    const faqs = await prisma.faq.findMany();
    return faqs;
}
