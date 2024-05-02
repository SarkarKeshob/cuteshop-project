import { createContext, useEffect, useState } from "react";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductList from "./ProductList/ProductList";
import useFetchCollection from "../../../../../CustomHooks/fetchCollectionHook";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../../../redux/features/ProductSlice/productSlice";
import Loading from "../../../../sharedComponents/Loading/Loading"
export const ProductContext = createContext(null)
const Products = () => {
    const {data,loading}=useFetchCollection('products');
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setProducts(data));
    },[dispatch,data]);
    
    const [grid, setGrid] = useState(true);
    const [searchKey,setSearchKey]=useState('');
    const [sortKey,setSortKey]=useState('latest');
    const [category,setCategory]=useState('All');
    const [brand,setBrand]=useState('All');
    const [price,setPrice]=useState(5000);
    const [currentPage,setCurrentPage]=useState(1);
    const productsPerPage=4;
    const [paginatedProducts,setPaginatedProducts]=useState([]);

    return (
        <div className="flex w-full mx-2 md:w-5/6 md:mx-auto">
            {loading && <Loading></Loading>}
            <ProductContext.Provider value={{ setGrid, grid,searchKey,setSearchKey,sortKey,setSortKey,category,setCategory,brand,setBrand,price,setPrice,currentPage,setCurrentPage,productsPerPage,paginatedProducts,setPaginatedProducts}}>
                <div className="w-1/2 md:w-1/3 mr-1 mt-2 md:mr-3 lg:w-1/4 lg:mr-5 transition-all duration-300">
                    <ProductFilter></ProductFilter>
                </div>
                <div className="w-full mr-2">
                    <ProductList></ProductList>
                </div>

            </ProductContext.Provider>

        </div>
    );
};

export default Products;