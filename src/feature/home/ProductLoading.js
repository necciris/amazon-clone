import { Grid } from '@material-ui/core';
import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductLoading = (props) => (
    <Grid item xs={12} md={6} lg={4}>
        <ContentLoader speed={2} width={395} height={543} viewBox='0 0 395 543' backgroundColor='#f3f3f3' foregroundColor='#ecebeb' {...props}>
            <rect x='0' y='-33' rx='0' ry='0' width='395' height='353' />
            <rect x='0' y='335' rx='0' ry='0' width='150' height='16' />
            <rect x='0' y='364' rx='0' ry='0' width='125' height='16' />
            <rect x='0' y='409' rx='0' ry='0' width='370' height='16' />
            <rect x='0' y='444' rx='0' ry='0' width='278' height='16' />
            <rect x='0' y='477' rx='0' ry='0' width='278' height='16' />
            <rect x='308' y='505' rx='0' ry='0' width='85' height='18' />
        </ContentLoader>
    </Grid>
);

export default ProductLoading;
