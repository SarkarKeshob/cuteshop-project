import { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { ProductContext } from "../Products";

const ProductFilter = () => {
    const {setCategory,setBrand,setPrice,price,setCurrentPage}=useContext(ProductContext);
    const products=useSelector(state=>state.products.products);
    const minPrice=useSelector(state=>state.products.minPrice);
    const maxPrice=useSelector(state=>state.products.maxPrice);
    const categoryData=['All',...new Set(products.map(product=>product.category))];
    const brandData=['All',...new Set(products.map(product=>product.brand))];
    const clearFilter=()=>{
        setCategory('All');
        setBrand('All');
        setPrice(maxPrice);
        setCurrentPage(1);
    }
    return (
        <div>
            <h2 className="text-xl font-bold text-black">Categories</h2>
            <div className="mt-3 ">
                {categoryData.map((categoryProduct,index)=><button key={index} className="flex items-center border-b-2 border-slate-400 w-5/6 hover:text-white hover:bg-orange-500 hover:border-none" onClick={(e)=>{
                    setCategory(e.target.innerText);
                    setCurrentPage(1);
                    }}><IoIosArrowForward />{categoryProduct}</button>)}
            </div>
            <div className="mt-3">
                <h4 className="text-lg font-bold">Brand</h4>
                <select name="brand" id="" onChange={(e)=>{
                    setBrand(e.target.value);
                    setCurrentPage(1);
                    }} className="w-5/6 p-1">
                    {brandData.map((brandProduct,index)=><option key={index} value={brandProduct}>{brandProduct}</option>)}
                </select>
            </div>
            <div className="mt-3">
                <h4 className="text-lg font-bold">Price</h4>
                <input className="w-5/6 range range-warning" onChange={(e)=>{
                    setPrice(e.target.value);
                    setCurrentPage(1);
                    }}  type="range" name="price" id="" value={price} min={minPrice} max={maxPrice}/>

            </div>
            <button className="btn btn-warning rounded-none bg-orange-600 hover:bg-orange-500 w-4/6 md:ml-3 ml-1 lg:ml-5 text-white btn-sm mt-3" onClick={clearFilter}> Clear Filter</button>
        </div>
    );
};

export default ProductFilter;