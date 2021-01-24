import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core';
import './InfoBox.css';

function InfoBox({Title,Cases,Total}) {
    return (
        <Card className='infobox-card'>
            <CardContent>
                <Typography color='textSecondary' className='infobox-title'>
                    {Title}</Typography>
                <h2 className='infobox-cases'>{Cases}</h2>
                <Typography color='textSecondary' className='infobox-total'>
                    {Total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
