import React, {forwardRef, useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {GetServerSideProps} from "next";
import {convertToStr, getValueStr} from '../convertFunctions'
import {getMake, getModel, getPaginatedCars} from "../db-getters/getters";
import {CarModel, Make, Model} from '../interfaces';
import Selectors from "../components/Selectors";
import {useRouter} from "next/router";
import {ParsedUrlQuery, stringify} from "querystring";
import useSWR from 'swr';
import deepEqual from 'fast-deep-equal';
import CarCard from "../components/CarCard";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Pagination from "@material-ui/lab/Pagination";
import {PaginationRenderItemParams} from "@material-ui/lab/Pagination/Pagination";
import Link from "next/link";

export interface CarsListProps {
    make: Make[];
    count?: number;
    model: Model[];
    totalPages?: number;
    cars: CarModel[];
}

const CarsList = ({make, model, totalPages, cars}: CarsListProps) => {
    const {query} = useRouter();
    const [serverQuery] = useState(query);
    const [totalCount, setTotalCount] = useState<number | undefined>(totalPages);
    useEffect(()=>{
        if(getValueStr(query.make)){
            setTotalCount(1);
        }else{
            setTotalCount(totalPages);
        }
    }, [query.make])
    const {data} = useSWR('/api/cars?' + stringify(query),{
        dedupingInterval: 15000,
        initialData: deepEqual(query, serverQuery) ? {cars, totalPages} : undefined
    })

    return <Grid container spacing={3}>
        <Grid item xs={12} sm={5} md={3} lg={2}>
            <Selectors make={make} model={model} singleColumn={true}/>
        </Grid>
        <Grid item xs={12} sm={7} md={9} lg={10}>
            <Pagination
                page={parseInt(convertToStr(query.page)) || 1}
                count={totalCount}
                renderItem={(item) => (
                    <PaginationItem
                        component={MaterialUiLink}
                        query={query}
                        item={item}
                        {...item}
                    />
                )}
            />
            <Grid container spacing={3}>
            {
                data?.cars.map((car) =>{
                    return <Grid key = {car.id} item xs = {12} sm = {12} lg = {5}><CarCard car = {car}/></Grid>
                })
            }
            </Grid>
        </Grid>
    </Grid>
}

export interface MaterialUiLinkProps {
    query: ParsedUrlQuery;
    item: PaginationRenderItemParams;
}

export const MaterialUiLink = forwardRef<HTMLAnchorElement, MaterialUiLinkProps>(({item, query, ...props}: MaterialUiLinkProps, ref) => (
    <Link href={{pathname: '/cars', query: {...query, page: item.page} } } shallow>
        <a ref={ref} {...props}></a>
    </Link>
));

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const queryMake = convertToStr(ctx.query.make);
    const [make, model, paginated] = await Promise.all([
        getMake(), getModel(queryMake), getPaginatedCars(ctx.query)
    ]);
    return {props: {make, model, cars: paginated.cars, totalPages: paginated.totalCount}};
}
export default CarsList;
