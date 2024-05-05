import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location=useLocation().pathname;
    console.log(location);
    const validUser = useSelector(state => state.activeUser.user);
    if (validUser.isEmailVerified) {
        return (
            children
        );
    }
    else{
        return(
            <Navigate state={location} to={'/login'}></Navigate>
        )
    }

}

    PrivateRoute.propTypes={
        children: PropTypes.node,
    }
    export default PrivateRoute;