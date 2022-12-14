import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container, Typography } from '@material-ui/core'
import { Item } from './Item'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
    },
    typography: {
        fontWeight: 600,
    }
}))

export const ItemList = ({ items, stock, initial }) => {
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Typography align="center" variant="h1" className={classes.typography}>
                Pizzas
            </Typography>
            <Box my={3}>
                <Grid
                    justifyContent="center"
                    container
                    spacing={3}
                >
                    {items.map(product => (

                        <Grid key={product.id} item>
                            <Item product={product} stock={stock} initial={initial} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}