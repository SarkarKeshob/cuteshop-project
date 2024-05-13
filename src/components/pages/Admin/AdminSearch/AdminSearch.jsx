import { FaSearch } from "react-icons/fa";
import PropTypes from 'prop-types';
const AdminSearch = ({value}) => {
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
AdminSearch.propTypes={
    value:PropTypes.object
}

export default AdminSearch;

