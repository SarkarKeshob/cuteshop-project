import { useContext, useEffect,} from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "../Products";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { filterByBrands, filterByCategory, filterByPrice, filterBySearch, sortProducts } from "../../../../../../redux/features/FilterSlice/filterSlice";
import { getPriceRange } from "../../../../../../redux/features/ProductSlice/productSlice";
import Pagination from "./Pagination/Pagination";

const ProductList = () => {
    const { grid, setGrid,setSortKey,sortKey,searchKey,brand,category,price,paginatedProducts,setCurrentPage} = useContext(ProductContext)
    const products = useSelector(state => state.products.products);
    const filteredProducts=useSelector(state=>state.filter.filteredProducts);
    const dispatch=useDispatch();
    
    const handleShortenedText = (text, n) => {
        if (text?.length > n) {
            const shortendText = (text.slice(0, n + 1)) + '.....';
            return shortendText;
        }
        return text;
    }
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
    const gridCard = 'card bg-base-100 shadow-xl';
    const listCard = 'grid  lg:flex justify-between mt-8';
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
                    <Search></Search>
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
                {paginatedProducts.length > 0 ? paginatedProducts.map(product => <div key={product.id} className={grid ? gridCard : listCard}>
                    <figure className={grid ? 'w-full' : 'w-1/2'}>
                        <Link to={`/productDetails/${product.id}`}>
                            <img className="w-full h-40 border-b-1" src={product.imageURL} alt={product.name} />
                        </Link>
                    </figure>
                    <div className="flex-grow">

                    </div>
                    <div className={grid ? "card-body" : ' w-full mx-0 lg:w-1/2 lg:mx-10'}>
                        <p className="text-orange-600 mx-auto mb-2">{product.price}$</p>

                        <h2 className="card-title mx-auto text-lg font-bold mb-2">{handleShortenedText(product.name, 16)}</h2>
                        <div>
                            {!grid && <p className="mb-2 text-slate-600"> {handleShortenedText(product.description, 150)} </p>}
                        </div>

                        <div className="card-actions justify-end">
                            <button className="btn btn-warning btn-sm w-full">Add to Cart</button>
                        </div>
                    </div>
                </div>) : null}

            </div>
            <div className="border-t-2 border-slate-300 pt-4 mt-10">
                {filteredProducts.length>0 && <Pagination></Pagination>}
            </div>
        </div>
    );
};

export default ProductList;