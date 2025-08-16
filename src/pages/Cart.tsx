import React, { useEffect, useState } from 'react';
import { CARTID_KEY } from '../constants/cart.constants';
import { Box, Button, Card, CardContent, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { CartItem } from '../types/cart/cart-response.model';
import type { Product } from '../types/product/product.model';
import EmptyCart from '../components/cart/EmptyCart';
import { useAppSelector } from '../store/hooks';

const Cart = () => {
  const { cart: cartData, loading } = useAppSelector((state) => state.cart);

  if (loading) {
    return <h1>Loading Cart Data..</h1>;
  }

  if (!cartData?.cartId) {
    return <EmptyCart message='There is no active cart.' />;
  }
  if (!cartData?.items?.length) {
    return <EmptyCart message='No items in the cart.' />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h5' gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Box>
            {cartData?.items?.map((item: CartItem) => {
              const product = item.product as Product;
              return (
                <Card
                  key={product._id}
                  sx={{
                    display: 'flex',
                    mb: 2,
                    p: 2,
                    alignItems: 'center',
                    gap: 2,
                  }}>
                  <CardMedia
                    component='img'
                    image={product.images[0]?.url || '/placeholder.jpg'}
                    alt={product.images[0]?.altText || product.name}
                    sx={{ width: 100, height: 100, objectFit: 'contain' }}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      {product.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Price: ${product.price.toFixed(2)}
                    </Typography>
                    {product.discountPercentage > 0 && (
                      <Typography variant='caption' color='error'>
                        -{product.discountPercentage}% off
                      </Typography>
                    )}

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 1,
                        gap: 1,
                      }}>
                      <IconButton size='small'>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton size='small'>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </CardContent>

                  <Box>
                    <Typography variant='subtitle1'>${(product.price * item.quantity).toFixed(2)}</Typography>
                    <IconButton color='error'>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Grid>
        <Grid size={4}>
          <Box
            sx={{
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              boxShadow: 1,
            }}>
            <Typography variant='h6' gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant='body1' mb={1}>
              Total Items: <strong>{cartData?.totalQuantity}</strong>
            </Typography>
            <Typography variant='body1' mb={2}>
              Total Price: <strong>${cartData?.totalPrice.toFixed(2)}</strong>
            </Typography>

            <Button variant='contained' color='primary' fullWidth size='large'>
              Proceed to Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
