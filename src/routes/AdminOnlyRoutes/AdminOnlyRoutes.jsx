import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
const AdminOnlyRoutes = ({ children }) => {
    const user = useSelector(state=>state.activeUser.user);
    const location=useLocation().pathname;

    if (user?.userEmail == 'keshob.sarkar.shuvo@gmail.com') {
        return children;
    }
    else {
         return <Navigate state={location} to={'/'}></Navigate>
    }

};

AdminOnlyRoutes.propTypes={
    children:PropTypes.node,
}
export default AdminOnlyRoutes;