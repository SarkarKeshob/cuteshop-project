import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/config";
import Loading from "../../sharedComponents/Loading/Loading";


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const name = (e.target.firstName.value) + ' ' + (e.target.lastName.value);
        const email = e.target.email.value;
        const password = e.target.password.value;
        const image = e.target.imageURL.value;
        const confirmPassword = e.target.confirmPassword.value;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;


        if (password === confirmPassword) {
            if (password.length < 8) {
                setError('Password must be 8 characters or more ')
            }
            else if (!(passwordRegex.test(password))) {
                setError('Password must include one Uppercase letter, one Lowercase letter , a Special Character, and a Number')
            }
            else {
                setLoading(true);
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCred) => {
                        const user = userCred.user;
                        console.log(user);
                        updateProfile(user, { displayName: name, photoURL: image })
                            .then(() => {
                                sendEmailVerification(user)
                                    .then(() => {
                                        setLoading(false);
                                        e.terget.reset();
                                        navigate('/login');
                                    })
                                    .catch(()=>{
                                        setError('Something Wrong try registration again');
                                        setLoading(false);
                                    })



                            })
                            .catch(() => {
                                setError('Something Wrong!!!!!')
                                setLoading(false);
                            })


                    })
                    .catch(() => {
                        setError('Email already exists. You can login. ');
                        setLoading(false);
                    })
            }
        }
        else {
            setError('Password and Confirm Password does not match');
        }


    }

    return (
        <div>
            {loading && <Loading></Loading>}
            <div>
                <div className="hero min-h-screen bg-slate-100">
                    <div className="hero-content grid">

                        <h1 className="text-3xl font-bold text-center">Register!</h1>
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-8">

                            <form className="card-body" onSubmit={handleRegister}>
                                <div className="form-control">
                                    <input name="firstName" type="text" placeholder="First Name" className="input input-bordered placeholder:text-slate-500" required />
                                </div>
                                <div className="form-control">
                                    <input name="lastName" type="text" placeholder="Last Name" className="input input-bordered placeholder:text-slate-500" required />
                                </div>
                                <div className="form-control">
                                    <input name="imageURL" type="url" placeholder="Image url" className="input input-bordered placeholder:text-slate-500" required />
                                </div>
                                <div className="form-control">
                                    <input type="email" name="email" placeholder="Email" className="input input-bordered placeholder:text-slate-500" required />
                                </div>
                                <div className="form-control">
                                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="input input-bordered placeholder:text-slate-500" required />
                                    <span className="ml-auto mr-5 -mt-8 text-lg" onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                                </div>
                                <div className="form-control mt-4">
                                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" className="input input-bordered placeholder:text-slate-500" required />
                                    <span className="ml-auto mr-5 -mt-8 text-lg" onClick={() => {
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }}> {showConfirmPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>} </span>
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
                                </div>
                            </form>
                            <div>
                                <p>Already have an account?? <span className="text-blue-800 font-bold"><Link to={'/login'}>Login</Link></span> </p>
                            </div>
                            <div>
                                {error ? <p className="text-red-600 font-bold text-center"> {error} </p> : ''}
                            </div>
                            <div>
                                {success ? <p className="text-green-600 font-bold text-center"> {success} </p> : ''}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;