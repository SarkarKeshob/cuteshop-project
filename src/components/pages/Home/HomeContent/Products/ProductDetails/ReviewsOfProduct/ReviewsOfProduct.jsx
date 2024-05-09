import PropTypes from 'prop-types';
import useFetchCollection from '../../../../../../../CustomHooks/fetchCollectionHook';
import { useEffect, useState } from 'react';
import Loading from '../../../../../../sharedComponents/Loading/Loading';
import ReactStars from "react-rating-stars-component";

const ReviewsOfProduct = ({ id }) => {
    const { data, isLoading, isError } = useFetchCollection('reviews');
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        setReviewList([...data]);
    }, [data]);

    const selectedProductReviews = reviewList.filter(review => review.productId == id);
    console.log(selectedProductReviews);

    if (isLoading) {
        return (
            <Loading></Loading>
        );
    }
    else if (isError) {
        return (
            <h2 className='text-6xl text-red-500'>Something Went Wrong! Try Reloading...</h2>
        );
    }
    else {
        return (
            <div>
                {reviewList.length ? (
                    <div>
                        {selectedProductReviews.length ? (
                            <>
                                <h2 className='text-xl md:text-2xl lg:text-3xl text-slate-500 mt-10'>Reviews Of Product</h2>
                                <div>
                                    {selectedProductReviews.map((review, index) => <div key={index} className='border-2 border-slate-300 mt-8 shadow-2xl bg-white p-5 w-5/6 mx-aut0'>
                                        <div>
                                            <ReactStars value={review.rating} />
                                        </div>
                                        <p className='text-sm md:text-base lg:text-lg text-slate-500'>{review.reviewText}</p>
                                        <p className='font-bold text-xs md:text-sm lg:text-base text-slate-700'>On: <span className='text-slate-500'>{review.reviewDate}</span></p>
                                        <p className='font-bold text-xs md:text-sm lg:text-base text-slate-700'>Reviewed By: <span className='text-slate-500'>{review.reviewdBy}</span></p>
                                    </div>)}
                                </div>
                            </>
                        ) : <p className='text-xl mt-10'>There is no review of this product yet.</p>}
                    </div>
                ) : <Loading></Loading>}
            </div>
        );
    }
};

ReviewsOfProduct.propTypes = {
    id: PropTypes.string,
}
export default ReviewsOfProduct;