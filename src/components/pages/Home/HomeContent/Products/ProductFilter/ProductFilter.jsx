import { useContext, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "../Products";
import { filterProducts } from "../../../../../../redux/features/FilterSlice/filterSlice";

const ProductFilter = () => {
    const {filter,setFilter,setCurrentPage}=useContext(ProductContext);
    const products=useSelector(state=>state.products.products);
    const categoryData=['All',...new Set(products.map(product=>product.category))];
    const brandData=['All',...new Set(products.map(product=>product.brand))];
    const dispatch=useDispatch();
    const clearFilter=()=>{
        setFilter({sortKey:'latest',searchKey:'',brand:'All',category:'All'})
    }
    useEffect(()=>{
        dispatch(filterProducts({products,filter}));
    },[dispatch,products,filter])
    const handleCategoryChange=(value)=>{
        setFilter({...filter,category:value});
        setCurrentPage(1);
    }

    const handleBrandChange=(value)=>{
        setFilter({...filter,brand:value});
        setCurrentPage(1);
    }
    
    return (
        <div>
            <h2 className="text-xl font-bold text-black">Categories</h2>
            <div className="mt-3 ">
                {categoryData.map((categoryProduct,index)=><button key={index} className="flex items-center border-b-2 border-slate-400 w-5/6 hover:text-white hover:bg-orange-500 hover:border-none" onClick={(e)=>handleCategoryChange(e.target.innerText)}><IoIosArrowForward />{categoryProduct}</button>)}
            </div>
            <div className="mt-3">
                <h4 className="text-lg font-bold">Brand</h4>
                <select name="brand" id="" onChange={(e)=>{handleBrandChange(e.target.value)}} className="w-5/6 p-1">
                    {brandData.map((brandProduct,index)=><option key={index} value={brandProduct}>{brandProduct}</option>)}
                </select>
            </div>
            <button className="btn btn-warning rounded-none bg-orange-600 hover:bg-orange-500 w-4/6 md:ml-3 ml-1 lg:ml-5 text-white btn-sm mt-3" onClick={clearFilter}> Clear Filter</button>
        </div>
    );
};

export default ProductFilter;