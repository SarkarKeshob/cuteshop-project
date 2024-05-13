import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { ProductContext } from "../Products";
const Search = () => {
    const {filter,setFilter,setCurrentPage}=useContext(ProductContext)
    const handleSearchChange=(value)=>{
        setFilter({...filter,searchKey:value});
        setCurrentPage(1)
    }
    return (
        <>
            <div className="flex items-center">
                <input type="text" onChange={(e)=>{handleSearchChange(e.target.value)}} className="input input-bordered" placeholder="Search Products Here" />
              <span className="-ml-8 "><FaSearch></FaSearch></span>  
            </div>
            
        </>
    );
};
export default Search;