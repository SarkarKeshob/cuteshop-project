import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation, IoMail } from "react-icons/io5";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../sharedComponents/Loading/Loading";


const ContactMe = () => {
    const [loading, setLoading]=useState(false);
    const form=useRef();
    const sendEmail=(e)=>{
        e.preventDefault();
        setLoading(true);
        emailjs
        .sendForm(import.meta.env.VITE_MAILSERVICEID, 'template_hvdgjsk', form.current, {
          publicKey: '2OaoeRtRLk2WuN5YY',
        })
        .then(
          () => {
            toast.success('Thank you for your kind message. I will get back to you as soon as possible.',{
                autoClose:2000,
                position:'top-left',
            })
            console.log('SUCCESS!');
            e.target.reset();
            setLoading(false);
          },
          (error) => {
            console.log('FAILED...', error.text);
            toast.error(error.text,{
                autoClose:2000,
            });
            setLoading(false);
          },
        );
    }

    if(loading){
        return <Loading></Loading>
    }
    else{
        return (
            <div className="w-full mx-4  mx-auto">
                <h2 className="text-lg md:text-2xl lg:text-4xl ">Contact Me</h2>
                <div className="grid lg:flex lg:justify-evenly mt-10">
                    <div className="shadow-2xl p-8 w-full lg:w-1/2">
                        <form ref={form} className="grid gap-5" onSubmit={sendEmail}>
                            <div>
                                <label htmlFor="name" className="label">Name:</label>
                                <input type="text" name="user_name" id="name" placeholder="Full Name" className="input input-bordered w-5/6 lg:w-4/6" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="label">Email:</label>
                                <input type="email" name="user_email" id="email" placeholder="Your Email" className="input input-bordered w-5/6 lg:w-4/6" required />
                            </div>
                            <div>
                                <label htmlFor="subject" className="label">Subject</label>
                                <input type="text" name="subject" id="subject" placeholder="Subject" className="input input-bordered w-5/6 lg:w-4/6" required />
                            </div>
                            <div>
                                <label htmlFor="text">Your Text</label>
                                <div>
                                    <textarea name="message" placeholder="Type what you want to say" id="text" className="resize-none border-2 border-slate-300 w-5/6 lg:w-4/6" rows={6}></textarea>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-info text-white">Send Message</button>
                            </div>
                        </form>
                    </div>
    
                    <div className="bg-sky-500 text-white p-5 w-full h-96 lg:w-1/3">
                        <h3 className="text-lg md:text-xl lg:text-2xl">My Contact Information</h3>
                        <p className="text-xs md:text-sm lg:text-base">Fill the form or contact me via other chanells listed bellow.</p>
                        <p className="mt-7 text-xs md:text-sm lg:text-base flex items-center"><FaPhoneAlt></FaPhoneAlt> <span className="ml-2">+8801704491123</span> </p>
                        <p className="mt-2 text-xs md:text-sm lg:text-base flex items-center"> <IoMail />
                            <span className="ml-2">Keshob.sarkar.shuvo@gmail.com</span> </p>
                        <p className="mt-2 text-xs md:text-sm lg:text-base flex items-center"> <IoLocation />
                            <span className="ml-2">Rangpur,Bangladesh</span> </p>
                    </div>
    
                </div>
    
            </div>
        );
    }
};

export default ContactMe;