import { createContext, useEffect, useState } from "react";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductList from "./ProductList/ProductList";
import useFetchCollection from "../../../../../CustomHooks/fetchCollectionHook";
import { useDispatch } from "react-redux";
import { saveProducts, } from "../../../../../redux/features/ProductSlice/productSlice";
import Loading from "../../../../sharedComponents/Loading/Loading"
export const ProductContext = createContext(null)
const Products = () => {
    const { data, loading } = useFetchCollection('products');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(saveProducts(data));
    }, [dispatch, data]);


    const [grid, setGrid] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [filter, setFilter] = useState({
        sortKey: 'latest',
        searchKey: '',
        brand: 'All',
        category: 'All',
    })

    if (loading) {
        return <Loading></Loading>
    }
    else {
        return (
            <div className="flex w-full mx-2 md:w-5/6 md:mx-auto">
                <ProductContext.Provider value={{ setGrid, grid, currentPage, setCurrentPage, productsPerPage, paginatedProducts, setPaginatedProducts, filter, setFilter }}>
                    <div className="w-1/2 md:w-1/3 mr-1 mt-2 md:mr-3 lg:w-1/4 lg:mr-5 transition-all duration-300">
                        <ProductFilter></ProductFilter>
                    </div>
                    <div className="w-full mr-2">
                        <ProductList></ProductList>
                    </div>

                </ProductContext.Provider>

            </div>
        );
    }
};

export default Products;