import {GetStaticProps} from 'next'
import React from "react";
import {FaqModel} from "../interfaces";
import Link from "next/link";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getFaqs} from "../db-getters/getters";


interface FaqProps {
    faqs: FaqModel[];
}

const FaqPage = ({faqs}: FaqProps) => (
    <>
        <br/>
        {faqs.map((el) => <Accordion key = {el.id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{el.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {el.answer}
                </Typography>
            </AccordionDetails>
        </Accordion>)}
        <br/>
        <p>
            <Link href="/">
                <a>Go home</a>
            </Link>
        </p>
    </>

)

export const getStaticProps: GetStaticProps = async () => {
    const faqs = await getFaqs();
    return {
        props: {
            faqs
        }
    }
}

export default FaqPage;
