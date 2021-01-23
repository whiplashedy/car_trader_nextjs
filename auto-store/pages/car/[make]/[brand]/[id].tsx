import React from 'react'
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {PrismaClient} from "@prisma/client";
import {ParsedUrlQuery} from "querystring";
import {CarModel} from "../../../../interfaces";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {convertToStr} from "../../../../convertFunctions";

const prisma = new PrismaClient();

interface CarDetailsProps {
    car: CarModel | null | undefined;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto'
    },
    img: {
        width: '100%'
    },
}));

const CarDetails = ({car}: CarDetailsProps) => {
    const classes = useStyles();
    return (<>
            {!car ? <div>Sorry car not found!</div> :
                <div>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs = {10} sm = {5} md = {5}>
                                <img className={classes.img} alt="complex" src={car.photoUrl}/>
                            </Grid>
                            <Grid item xs={12} sm = {6} md = {7} container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item >
                                        <Typography gutterBottom variant="h4">
                                            {car.make + ' ' + car.model}
                                        </Typography>
                                        <Typography variant="h4" gutterBottom>
                                            {car.price}00 KZT
                                        </Typography>
                                        <Typography gutterBottom variant="h6" color="textSecondary" >
                                            Year: {car.year}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" color="textSecondary" >
                                            Fuel type: {car.fuelType}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" color="textSecondary" >
                                            Kms: {car.kilometers}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" color="textSecondary" >
                                            Details: {car.details}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            }
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {

    const id = convertToStr(ctx.params.id);

    const car = await prisma.car.findUnique({
        where: {id: parseInt(id)}
    })

    return ({
        props: {
            car: car || null
        }
    })
}

export default CarDetails;
