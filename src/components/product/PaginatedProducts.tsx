import { useEffect, useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, TablePagination, Button } from '@mui/material';
import { getPaginatedData } from '../../services/product.service';
import type { PaginatedResponse, Product } from '../../types/product/product.model';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCartThunk, getCartByIdThunk, getCurrentUserCartThunk } from '../../store/thunk/cart';
import { CARTID_KEY } from '../../constants/cart.constants';

const PaginatedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchData() {
      const data = await getPaginatedData(currentPage + 1, itemsPerPage);
      if (data) {
        setData(data);
        setProducts(data.products);
      }
    }

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleChangeCurrentPage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeItemsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await dispatch(addToCartThunk({ productId, quantity: 1 })).unwrap();
      const cartId = localStorage.getItem(CARTID_KEY);

      if (user) {
        await dispatch(getCurrentUserCartThunk()).unwrap();
      } else if (cartId) {
        await dispatch(getCartByIdThunk(cartId)).unwrap();
      }

      toast.success('Product added to cart successfully');
    } catch (err) {
      console.log(err);
      toast.error('Failed to add product to cart');
    }
  };
  return (
    <>
      {data && data?.products && (
        <Box sx={{ padding: 2 }}>
          <Typography variant='h6' mb={2}>
            PRODUCTS
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
            }}>
            {products.map((product) => (
              <Card
                key={product._id}
                sx={{
                  minHeight: 360, // Adjust as needed
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <CardMedia
                  component='img'
                  image={product.images[0]?.url || ''}
                  alt={product.images[0]?.altText || product.name}
                  sx={{
                    height: '60%',
                    objectFit: 'contain',
                    p: 2,
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    ${product.price.toFixed(2)}
                  </Typography>
                  {product.discountPercentage > 0 && (
                    <Typography variant='caption' color='error'>
                      -{product.discountPercentage}% off
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button fullWidth variant='contained' color='primary' onClick={() => handleAddToCart(product._id)}>
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {data && data?.pagination && (
        <TablePagination
          component='div'
          count={data?.pagination?.total}
          page={currentPage}
          onPageChange={handleChangeCurrentPage}
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={handleChangeItemsPerPage}
          labelRowsPerPage='Items per page:'
        />
      )}
    </>
  );
};

export default PaginatedProducts;
