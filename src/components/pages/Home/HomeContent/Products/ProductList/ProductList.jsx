import { useContext, useEffect,} from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "../Products";
import Search from "../Search/Search";
import { filterByBrands, filterByCategory, filterByPrice, filterBySearch, sortProducts } from "../../../../../../redux/features/FilterSlice/filterSlice";
import { getPriceRange } from "../../../../../../redux/features/ProductSlice/productSlice";
import Pagination from "./Pagination/Pagination";
import ProductItem from "../ProductItem/ProductItem";

const ProductList = () => {
    const { grid, setGrid,setSortKey,sortKey,searchKey,setSearchKey,brand,category,price,paginatedProducts,setCurrentPage,currentPage,productsPerPage,setPaginatedProducts} = useContext(ProductContext)
    const products = useSelector(state => state.products.products);
    const filteredProducts=useSelector(state=>state.filter.filteredProducts);
    const dispatch=useDispatch();

    
    
    useEffect(()=>{
        dispatch(sortProducts({products,sortKey}));
    },[dispatch,products,sortKey])

    useEffect(()=>{
        dispatch(filterBySearch({products,searchKey}))
    },[dispatch,products,searchKey]);
    useEffect(()=>{
        dispatch(filterByBrands({products,brand}))
    },[dispatch,products,brand]);
    useEffect(()=>{
        dispatch(filterByCategory({products,category}))
    },[dispatch,products,category]);
    useEffect(()=>{
        dispatch(filterByPrice({products,price}))
    },[dispatch,products,price]);

    useEffect(()=>{
        dispatch(getPriceRange({products}))
    },[dispatch,products])

    const gridClass = "grid gap-10 md:grid-cols-2  lg:grid-cols-3 mt-8";
    const listClass = "grid gap-5 mx-auto mt-8";
    return (
        <div>

            <div className="grid md:grid-cols-2 md:gap-10 lg:flex lg:justify-between items-center border-b-2 border-slate-300 pb-5 mr-5">
                <div className="flex justify-start md:justify-between ">
                    <div className="flex">
                        <BsFillGridFill size={22} className="text-orange-600 cursor-pointer mr-2" onClick={() => setGrid(true)}></BsFillGridFill>
                        <FaListAlt size={22} className="text-blue-600 cursor-pointer" onClick={() => setGrid(false)}></FaListAlt>
                    </div>
                    <p ><span className="font-bold">{filteredProducts.length}</span> products found.</p>
                </div>

                <div>
                    <Search value={{setSearchKey,setCurrentPage}}></Search>
                </div>

                <div>
                    <label htmlFor="sortBy">Sort By:</label>
                    <select name="" id="sortBy" className="bg-slate-100 outline-none" onChange={(e)=>{
                        setSortKey(e.target.value);
                        setCurrentPage(1);
                        }}>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest-price</option>
                        <option value="highest">Highest-price</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </div>

            </div>
            {filteredProducts.length == 0 && <div className="text-center"><span className="loading loading-spinner text-error loading-lg mx-auto mt-10"></span></div>
            }
            <div className={grid ? gridClass : listClass}>
                {paginatedProducts.length > 0 ? paginatedProducts.map(product =><ProductItem key={product.id} product={product}></ProductItem> ) : null}

            </div>
            <div className="border-t-2 border-slate-300 pt-4 mt-10">
                {filteredProducts.length>0 && <Pagination value={{ currentPage, setCurrentPage, productsPerPage, setPaginatedProducts,filteredProducts }}></Pagination>}
            </div>
        </div>
    );
};

export default ProductList;