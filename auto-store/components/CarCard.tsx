import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {CarModel} from "../interfaces";
import Link from "next/link";
const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 450,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },

}));

export interface CarCardProps{
    car: CarModel;
}

export default function CarCard({car}: CarCardProps) {
    const classes = useStyles();

    return (
        <Link href ={`/car/${car.make}/${car.model}/${car.id}`}>
        <Card className={classes.root} elevation = {5}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={car.make + ' ' + car.model}
                subheader={`${car.price} KZT`}
            />
            <CardMedia
                className={classes.media}
                image={car.photoUrl}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {car.details}
                </Typography>
            </CardContent>
        </Card>
        </Link>
    );
}
