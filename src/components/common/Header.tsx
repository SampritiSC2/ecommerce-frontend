import {
  AppBar,
  Toolbar,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Typography,
  Popper,
  Paper,
  Button,
  Divider,
  type SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CategoryService } from '../../services/category.service';
import type { Category } from '../../types/category/category.model';
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';

const Header = () => {
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState<Category[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hovering, setHovering] = useState(false);
  const user = useAppSelector((state) => state?.auth?.user);
  const totalQuantity = useAppSelector((state) => state?.cart?.cart?.totalQuantity);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setHovering(false), 200);
  };

  useEffect(() => {
    async function fetchCategories() {
      const data = await CategoryService();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    }

    fetchCategories();
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          bgcolor: '#131921',
          px: 1,
        }}>
        <Toolbar
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
            overflowX: 'auto', // prevents breaking on mobile
            flexWrap: 'nowrap',
          }}>
          {/* Logo */}
          <Box
            component={Link}
            to='/'
            sx={{
              width: { xs: 90, sm: 120 },
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <img
              src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
              alt='Amazon'
              height={35}
              style={{ maxWidth: '100%' }}
            />
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              maxWidth: 750,
              height: 42,
              bgcolor: 'white',
              borderRadius: 1,
              overflow: 'hidden',
              minWidth: 200,
            }}>
            {/* "All" Dropdown */}
            <FormControl sx={{ minWidth: 70, bgcolor: '#e6e6e6' }}>
              <Select
                value={category}
                onChange={handleChange}
                variant='outlined'
                sx={{
                  height: '100%',
                  borderRadius: 0,
                  '& .MuiSelect-select': {
                    p: '8px 12px',
                  },
                  '& fieldset': {
                    border: 'none',
                  },
                }}>
                <MenuItem value='All'>All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Text Input */}
            <TextField
              placeholder='Search Amazon.in'
              variant='outlined'
              fullWidth
              InputProps={{
                sx: {
                  height: '100%',
                  borderRadius: 0,
                },
              }}
            />

            {/* Search Icon */}
            <Box
              sx={{
                bgcolor: '#febd69',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f3a847' },
              }}>
              <SearchIcon sx={{ color: 'black' }} />
            </Box>
          </Box>

          {/* Right Options */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>
            {/* Account & Lists */}
            <Box
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{ cursor: 'pointer', position: 'relative' }}>
              <Box display='flex' alignItems='center'>
                <Box>
                  <Typography variant='caption' color='white'>
                    Hello {user?.username ?? 'anonymous'},
                  </Typography>
                  <Typography variant='body2' color='white' fontWeight='bold'>
                    Account & Lists
                  </Typography>
                </Box>
                <ArrowDropDownIcon sx={{ color: 'white' }} />
              </Box>

              <Popper open={hovering} anchorEl={anchorEl} placement='bottom-start'>
                <Paper
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    p: 2,
                    width: 250,
                    bgcolor: 'white',
                    boxShadow: 3,
                    borderRadius: 1,
                  }}>
                  <Button
                    fullWidth
                    variant='contained'
                    component={Link}
                    to='/register'
                    sx={{
                      bgcolor: '#f0c14b',
                      color: '#111',
                      mb: 1,
                      '&:hover': { bgcolor: '#ddb347' },
                    }}>
                    Sign Up
                  </Button>
                  <Divider />
                  <Box mt={1}>
                    <Typography variant='body2' sx={{ mb: 0.5 }}>
                      Your Account
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5 }}>
                      Your Orders
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 0.5 }}>
                      Your Wishlist
                    </Typography>
                  </Box>
                </Paper>
              </Popper>
            </Box>

            {/* Returns & Orders */}
            <Box>
              <Typography variant='caption' color='white'>
                Returns
              </Typography>
              <Typography variant='body2' color='white' fontWeight='bold'>
                & Orders
              </Typography>
            </Box>

            {/* Cart */}
            <Box display='flex' alignItems='center' gap={0.5} component={Link} to='/cart'>
              <ShoppingCartIcon sx={{ color: 'white' }} />
              <Typography variant='body2' color='white' fontWeight='bold' sx={{ ml: 0.2 }}>
                Cart({totalQuantity ?? 0})
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Toolbar />
    </>
  );
};

export default Header;
