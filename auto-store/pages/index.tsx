import {GetServerSideProps} from 'next'
import React from 'react'
import Selectors from '../components/Selectors';
import {convertToStr} from '../convertFunctions';
import {getMake, getModel} from '../db-getters/getters';
import {Make, Model} from '../interfaces';

interface Props {
    make: Make[];
    count?: number;
    model: Model[];
}


const HomePage = ({make, model}: Props) => {
    return <Selectors make={make} model = {model}/>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const queryMake = convertToStr(ctx.query.make);
    const [make, model] = await Promise.all([
        getMake(), getModel(queryMake)
    ]);
    return {props: {make, model}};
}

export default HomePage
