import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/config";
import Loading from "../../sharedComponents/Loading/Loading"
const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate();
    const emailRef = useRef();
    const handleForgetPassword = () => {
        const emailForget = emailRef.current.value;
        setError('');
        setSuccess('')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!(emailRegex.test(emailForget))) {
            setError('Invalid Email format');
        }
        else {
            sendPasswordResetEmail(auth, emailForget)
                .then(() => {
                    setSuccess('A reset email has been sent to your mail ');
                    emailRef.current.value = '';

                })
                .catch(() => {
                    setError('Please register before trying to login.')

                }
                )
        }
    }
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                const user=userCred.user;
                if(user.emailVerified){
                    setLoading(false);
                    navigate('/');
                }
                else{
                    setError('Please verify your email before login.');
                    setLoading(false);
                }
            })
            .catch(() => {
                setError('Wrong email or password');
                setLoading(false);

            })



    }


    return (
        <div>
            {loading && <Loading></Loading>}
            <div className="hero min-h-screen bg-slate-100">
                <div className="hero-content flex-col">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-8">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <input name="email" type="email" ref={emailRef} placeholder="Email" className="input input-bordered placeholder:text-slate-500" required />
                            </div>
                            <div className="form-control">
                                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="input input-bordered placeholder:text-slate-500" required />
                                <span className="ml-auto mr-5 -mt-8 text-lg" onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                            </div>
                            <div className="mt-4">
                                <label className="label" onClick={handleForgetPassword}>
                                    <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-info">Login</button>
                            </div>
                        </form>
                        <div>
                            <p>Do not have an account?? <span className="text-blue-800 font-bold"><Link to={'/register'}>Register Here</Link></span> </p>
                        </div>
                        <div>
                            {error ? <p className="text-red-600 font-bold text-center"> {error} </p> : ''}
                        </div>
                        <div>
                            {success ? <p className="text-green-600 font-bold text-center"> {success} </p> : ''}
                        </div>
                    </div>
                    <div className=" border-t-2 border-orange-400 w-full mt-4">

                        <h2 className="text-5xl  text-warning text-center my-4">Or</h2>
                        <button className="btn bg-orange-600 hover:bg-orange-500 text-white w-full" onClick={()=>{
                            setLoading(true)
                            const provider= new GoogleAuthProvider();
                            signInWithPopup(auth,provider)
                            .then((result)=>{
                                console.log(result.user)
                                setLoading(false);
                                navigate('/');
                            })
                            .catch(()=>{
                                setLoading(false);
                                setError('Something went wrong. Please try again.')

                            })
                        }}> <FaGoogle className="text-xl"></FaGoogle> Login with Google</button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;