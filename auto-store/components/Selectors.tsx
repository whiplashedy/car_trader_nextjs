import React, {useEffect} from 'react';
import {Grid, Paper, Select, FormControl, MenuItem, InputLabel, makeStyles, SelectProps, Button} from '@material-ui/core';
import {Field, Form, Formik, useField, useFormikContext} from "formik";
import router, {useRouter} from "next/router";
import {Make, Model} from '../interfaces';
import {convertToStr} from "../convertFunctions";
import useSWR from 'swr';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: 'auto',
        maxWidth: 500,
        padding: theme.spacing(3)
    }
}));

interface Props {
    make: Make[];
    count?: number;
    model: Model[];
    singleColumn?: boolean;
}

const prices = [0, 5000, 15000, 30000, 45000];

const Selectors = ({make, model, singleColumn}: Props) => {
    const classes = useStyles();
    const {query} = useRouter();
    const smValue = singleColumn ? 12 : 6;
    const initialValues = {
        make: convertToStr(query.make) || 'all',
        model: convertToStr(query.model) || 'all',
        minPrice: convertToStr(query.minPrice) || 'all',
        maxPrice: convertToStr(query.maxPrice) || 'all'
    }
    return (<>
        <Formik initialValues={initialValues} onSubmit={(values) => {
            router.push({
                pathname: '/cars',
                query: {...values, page: 1}
            }, undefined, {shallow: true})
        }}>
            {
                ({values}) => (
                    <Form>
                        <Paper elevation={5} className={classes.paper}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={smValue}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="search-for-make">Make</InputLabel>
                                        <Field as={Select}
                                               name="make"
                                               id="search-make"
                                               label="Make"
                                        >
                                            <MenuItem value="all">
                                                <em>All Makes</em>
                                            </MenuItem>
                                            {
                                                make.map((make) => {
                                                    return <MenuItem key = {make.make} value={make.make}>
                                                        <em>{`${make.make} (${make.count})`}</em>
                                                    </MenuItem>
                                                })
                                            }
                                        </Field>
                                    </FormControl></Grid>
                                <Grid item xs={12} sm={smValue}>
                                    <ModelSelect model={model} name="model" make={values.make}/>
                                </Grid>
                                <Grid item xs={12} sm={smValue}>
                                    <FormControl fullWidth variant="outlined"
                                    >
                                        <InputLabel id="search-for-minPrice">Min price</InputLabel>
                                        <Field as={Select}
                                               name="minPrice"
                                               id="search-minPrice"
                                               label="Min price"
                                        >
                                            <MenuItem value="all">
                                                <em>No min value</em>
                                            </MenuItem>
                                            {
                                                prices.map((price) => {
                                                    return <MenuItem key = {price} value={price}>
                                                        <em>{price}</em>
                                                    </MenuItem>
                                                })
                                            }
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={smValue}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="search-for-maxPrice">Max price</InputLabel>
                                        <Field
                                            name="maxPrice"
                                            as={Select}
                                            id="search-make"
                                            label="Max price"
                                        >
                                            <MenuItem value="all">
                                                <em>No max value</em>
                                            </MenuItem>
                                            {
                                                prices.map((price) => {
                                                    return <MenuItem key = {price} value={price}>
                                                        <em>{price}</em>
                                                    </MenuItem>
                                                })
                                            }
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" fullWidth variant="contained" color="primary">Search</Button>
                                </Grid>
                            </Grid>


                        </Paper>
                    </Form>
                )
            }
        </Formik>
    </>);
}

export interface ModelSelectProps extends SelectProps {
    name: string;
    model: Model[];
    make: string;
}

export const ModelSelect = ({model, make, ...props}: ModelSelectProps) => {
    const {setFieldValue} = useFormikContext();
    const [field] = useField({
        name: props.name
    })
    useEffect(() => {
        setFieldValue('model', 'all');
    }, [make]);

    const {data} = useSWR('/api/models?make=' + make, {
        dedupingInterval: 60000
    });
    const newModel = data || model;

    return <FormControl fullWidth variant="outlined"
    >
        <InputLabel id="search-for-model">Model</InputLabel>
        <Select
            id="search-model"
            label="Model"
            {...field}
            {...props}
        >
            <MenuItem value="all">
                <em>All Models</em>
            </MenuItem>
            {
                newModel.map((model: any) => {
                    return <MenuItem key = {model.model} value={model.model}>
                        <em>{`${model.model} (${model.count.model})`}</em>
                    </MenuItem>
                })
            }
        </Select>
    </FormControl>
}
export default Selectors;
