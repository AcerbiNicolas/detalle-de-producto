import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles/'
import { Paper, Box, CardMedia, Snackbar, Typography, Grid, InputBase, IconButton, Button } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 500,
    },
    media: {
        height: 350,
        borderRadius: theme.spacing(1)
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        padding: theme.spacing(1),
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    typography: {
        fontWeight: 600,
    }
}))

export const ItemDetail = ({ product, stock, initial }) => {
    const classes = useStyles()
    const [quantity, setQuantity] = useState(initial)
    const [inStock, setInStock] = useState(stock)
    const [notification, setNotification] = useState({ open: false, text: '' })

    const increaseQuantity = () => {
        if (quantity < inStock)
            setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        if (quantity > 1)
            setQuantity(quantity - 1)
    }

    const addToCart = () => {
        setInStock(inStock - quantity)
        setQuantity(initial)
        setNotification({
            open: true,
            text: `Se han agregado ${quantity} ${quantity > 1 ? 'empanadas' : 'empanada'} de ${product.title} al carrito.`
        });
    }

    const closeNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setNotification(prevState => ({
            ...prevState,
            open: false,
            text: ''
        }));
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div>
            <Snackbar open={notification.open} autoHideDuration={4000} onClose={closeNotification}>
                <Alert onClose={closeNotification} severity="success">
                    {notification.text}
                </Alert>
            </Snackbar>
            <Paper>
                <Box p={5}>
                    <Grid container justifyContent="center" spacing={5}>
                        <Grid item xs={7}>
                            <CardMedia
                                component="img"
                                className={classes.media}
                                image={product.pictureUrl}
                                title={product.title}
                            />
                        </Grid>
                        <Grid container item direction="column" spacing={2} xs={5}>
                            <Grid item>
                                <Typography variant="h5" className={classes.typography}>
                                    {product.title}
                                </Typography>
                                <Typography variant="caption" className={classes.typography}>
                                    {product.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" className={classes.typography}>
                                    ${product.price}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2" className={classes.typography}>
                                    {inStock <= 0 ? 'Sin stock' : "Stock disponible"}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs={6}>
                                    <Paper className={classes.paper} elevation={0} variant="outlined">
                                        <IconButton onClick={decreaseQuantity} className={classes.iconButton} aria-label="decrease" disabled={inStock <= 0 || quantity === 1}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <InputBase
                                            inputProps={
                                                { style: { textAlign: 'center' } }
                                            }
                                            value={inStock <= 0 ? 'No stock' : quantity}
                                            readOnly
                                        />
                                        <IconButton onClick={increaseQuantity} className={classes.iconButton} aria-label="increase" disabled={inStock <= 0 || quantity === inStock}>
                                            <AddIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        disableElevation
                                        onClick={addToCart}
                                        disabled={inStock <= 0}
                                    >
                                        Add to cart
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper >
        </div >
    )
}
