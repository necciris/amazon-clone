import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

const useStyle = makeStyles((theme) => ({
    star__icon: {
        color: yellow[500],
    },
}));
const Stars = ({ rating }) => {
    const classes = useStyle();
    return (
        <>
            {Array(rating)
                .fill()
                .map((_, i) => (
                    <StarIcon key={i} className={classes.star__icon} />
                ))}
        </>
    );
};

export default Stars;
