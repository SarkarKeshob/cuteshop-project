import { FaSearch } from "react-icons/fa";
import PropTypes from 'prop-types';
const Search = ({value}) => {
    const {setSearchKey,setCurrentPage}=value;
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
Search.propTypes={
    value:PropTypes.object
}
export default Search;