import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, calculateTotalQuantityAndPrice, decreaseCartQuantity } from "../../../../../../redux/features/CartSlice/cartSlice";

const ProductDetails = () => {
    const products=useSelector(state=>state.products.products);
    const cart=useSelector(state=>state.cart.cartItems);
    const dispatch=useDispatch();
    const id=useParams().id;
    const selectedProduct=products.find(product=>product.id==id);
    const isInCart=cart.find(item=>item.id==selectedProduct.id);
    const addProductToCart=(productItem)=>{
        dispatch(addToCart(productItem));
        dispatch(calculateTotalQuantityAndPrice());
    }
    const decreaseFromCart=(productItem)=>{
        dispatch(decreaseCartQuantity(productItem));
        dispatch(calculateTotalQuantityAndPrice());
    }
    return (
        <div className="w-full mx-3 md:w-5/6 md:mx-auto">
            <div className="border-b-2 border-slate-300 pb-5 w-1/2">
            <h2 className=" text-2xl md:text-3xl lg:text-4xl font-bold text-black">Product Details</h2>
            <Link to={'/#home'} className="flex items-center"> <span><FaArrowLeft></FaArrowLeft></span> <span>Back To Products</span> </Link>
            </div>
            <div className="grid lg:flex mt-5">
                <img  className="w-full lg:w-1/2 lg:mr-10" src={selectedProduct.imageURL} alt={selectedProduct.name} />
                <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl">{selectedProduct.name}</h1>
                    <p className="text-orange-600"><strong className="text-black mr-2">Price:</strong>{selectedProduct.price}$</p>
                    <p className="my-4">{selectedProduct.description}</p>
                    <p className="mb-4"><strong>Brand:</strong>{selectedProduct.brand}</p>
                    {isInCart?<div className="flex items-center">
                        <button className="btn btn-warning" onClick={()=>decreaseFromCart(selectedProduct)}>-</button>
                        <p className="py-2 px-4 rounded border-2 border-orange-500">{isInCart.cartQuantity}</p>
                        <button className="btn btn-warning" onClick={()=>addProductToCart(selectedProduct)}>+</button>
                    </div>:<button className="btn-lg btn btn-warning" onClick={()=>addProductToCart(selectedProduct)}>Add To Cart</button>}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;