import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Product from './product/Product';
import ProductLoading from './ProductLoading';

const useStyle = makeStyles((theme) => ({
    home: {},
    home__image: {
        width: '100%',
        zIndex: -1000,
        overflow: 'hidden',
        marginBottom: '-250px',
        maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);',
    },
}));

const Home = () => {
    const classes = useStyle();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    const fetchProduct = async () => {
        await sleep(3000);
        const obj = [
            {
                id: 1,
                title: 'Lizard',
                body:
                    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit exercitationem nam molestias illum nisi, obcaecati excepturi voluptatem expedita ipsam saepe quaerat! Quis cumque enim asperiores sit voluptatum laudantium officia voluptatem!',
                price: 50,
                rating: 5,
                image: 'https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg',
            },
            {
                id: 2,
                title: 'Door',
                body:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates obcaecati dolores saepe pariatur! Dolor enim laboriosam eius nesciunt exercitationem doloremque nemo, dignissimos, amet, tenetur debitis rem? Odit asperiores esse est!',
                price: 120,
                rating: 5,
                image: 'https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg',
            },
            {
                id: 3,
                title: 'Lorem, ipsum dolor.',
                body:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nostrum natus labore molestiae ab illum libero, nulla rem voluptate nobis sapiente nisi debitis facilis possimus aspernatur velit eaque tenetur eos.',
                price: 250,
                rating: 5,
                image: 'https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg',
            },
        ];

        return obj;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetchProduct();
            setProducts(res);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className={classes.home}>
            <div className={classes.home__container}>
                <img
                    className={classes.home__image}
                    src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
                    alt=''
                />
                <Container>
                    <Grid container spacing={3} alignItems='stretch'>
                        {!loading
                            ? products?.map((product) => (
                                  <Product
                                      key={product.id}
                                      id={product.id}
                                      title={product.title}
                                      body={product.body}
                                      price={product.price}
                                      rating={product.rating}
                                      image={product.image}
                                  />
                              ))
                            : Array(3)
                                  .fill()
                                  .map((_, i) => <ProductLoading key={i} />)}
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default Home;
