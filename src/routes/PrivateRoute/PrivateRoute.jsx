import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/sharedComponents/Loading/Loading";

import { useEffect } from "react";
import { fetchUser } from "../../redux/features/AuthSlice/authSlice";

const PrivateRoute = ({ children }) => {
    const location=useLocation().pathname;
    const dispatch=useDispatch()
     useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])
    const validUser = useSelector(state => state.activeUser.user);
    const loadingCondition=useSelector(state=>state.activeUser.loading);
    if(loadingCondition){
        return <Loading></Loading>
    }
    else{
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

}

    PrivateRoute.propTypes={
        children: PropTypes.node,
    }
    export default PrivateRoute;