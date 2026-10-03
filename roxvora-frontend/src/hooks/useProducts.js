import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, selectCategories, selectProductFilters, selectProductPagination, selectProductLoading } from '@store/slices/productSlice';
import { setProducts, setCategories, setFilters, clearFilters, setPagination } from '@store/slices/productSlice';
import productApi from '@api/productApi';

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const filters = useSelector(selectProductFilters);
  const pagination = useSelector(selectProductPagination);
  const isLoading = useSelector(selectProductLoading);

  const fetchProducts = async (params = {}) => {
    try {
      const response = await productApi.getAll({ ...filters, ...params });
      dispatch(setProducts(response.data));
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productApi.getCategories();
      dispatch(setCategories(response.data));
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const updateFilters = (newFilters) => dispatch(setFilters(newFilters));
  const clearAllFilters = () => dispatch(clearFilters());
  const setPage = (page) => dispatch(setPagination({ currentPage: page }));

  return {
    products,
    categories,
    filters,
    pagination,
    isLoading,
    fetchProducts,
    fetchCategories,
    updateFilters,
    clearAllFilters,
    setPage,
  };
};