import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDocument from "../../../CustomHooks/fetchDocument";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import ReactStars from "react-rating-stars-component";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";


const ReviewProducts = () => {
    const [product, setProduct] = useState({});
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const { id } = useParams();
    const { selectedData, loading, error } = useFetchDocument('products', id);
    const userId = useSelector(state => state.activeUser.user.uid);
    const userName = useSelector(state => state.activeUser.user.userName);
    useEffect(() => {
        setProduct({ ...selectedData });
    }, [selectedData]);
    const handleReview=async(e)=>{
        e.preventDefault();
        const today=new Date();
        const date=today.toDateString();
        const reviewData={
            reviewDate:date,
            reviewUid:userId,
            reviewdBy:userName,
            productId:id,
            rating,
            reviewText:review,
            createdAt:Timestamp.now().toDate(),

        }
        try{
            await addDoc(collection(db,'reviews'),reviewData);
            toast.success('Thanks For Your Review',{
                autoClose:2000,
                position:'top-left'
            
            });
            setRating(0);
            e.target.review.value='';
            window.history.back();
        }
        catch{
            toast.error('Something Went Wrong !!! Please Try Again ... Sorry for inconvinience.');
        }

    }

    if (loading) {
        return (
            <Loading></Loading>
        );
    }
    else if (error) {
        return (
            <h2 className="text-6xl text-center text-red-600 min-h-screen">No Such Product Found!!!!</h2>
        );
    }
    else {
        return (

            <div className="w-[90%] mx-auto">
                {product.name?.length ? <div>
                    <h1 className="text-2xl md:text-4xl lg:text-6xl">Rate This Product</h1>
                    <div className="grid gap-8 lg:flex justify-between">
                        <div className="mt-5">
                            <p className="text-lg lg;text-xl text-slate-500">Product Name: {product.name}</p>
                            <img src={product.imageURL} alt={product.name} className="w-96 h-60 mt-4" />
                        </div>
                        <div className="mt-5 shadow-2xl w-full lg:w-1/2 p-8">
                            <form onSubmit={handleReview}>
                                <div>
                                    <label htmlFor="">Rating</label>
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        onChange={(rating)=>setRating(rating)}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="review" className="label label-text text-xl forn-bold">Review</label>
                                    <textarea name="review" placeholder="Write your review here" id="review" cols="30" rows="5" onChange={(e) => setReview(e.target.value)} className="resize-none border-4 border-slate-400"></textarea>
                                </div>
                                <div className="flex justify-center">
                                    <button className="btn btn-warning">Submit Review</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> : <Loading></Loading>}
            </div>
        );
    }
};

export default ReviewProducts;