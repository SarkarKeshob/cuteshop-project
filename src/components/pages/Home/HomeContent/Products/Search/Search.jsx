import { useContext } from "react";
import { ProductContext } from "../Products";
import { FaSearch } from "react-icons/fa";

const Search = () => {
    const{setSearchKey,setCurrentPage}=useContext(ProductContext);
    return (
        <>
            <div className="flex items-center">
                <input type="text" onChange={(e)=>{
                    setSearchKey(e.target.value)
                    setCurrentPage(1)
                }} className="input input-bordered" placeholder="Search Products Here" />
              <span className="-ml-8 "><FaSearch></FaSearch></span>  
            </div>
            
        </>
    );
};

export default Search;