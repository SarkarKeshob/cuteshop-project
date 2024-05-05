import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Products";
import { addToCart, decreaseCartQuantity } from "../../../../../../redux/features/CartSlice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';


const ProductItem = ({ product }) => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const isInCart = cartItems.find(item => item.id == product.id);
    const { grid } = useContext(ProductContext);
    const dispatch = useDispatch();
    const gridCard = 'card bg-base-100 shadow-xl';
    const listCard = 'grid  lg:flex justify-between mt-8';
    const addProductToCart = (productItem) => {
        dispatch(addToCart(productItem));
    }
    const handleShortenedText = (text, n) => {
        if (text?.length > n) {
            const shortendText = (text.slice(0, n + 1)) + '.....';
            return shortendText;
        }
        return text;
    }

    const decreaseFromCart=(productItem)=>{
        dispatch(decreaseCartQuantity(productItem))
    }

    return (
        <div key={product.id} className={grid ? gridCard : listCard}>
            <figure className={grid ? 'w-full' : 'w-1/2'}>
                <Link to={`/productDetails/${product.id}`}>
                    <img className="w-full h-40 border-b-1" src={product.imageURL} alt={product.name} />
                </Link>
            </figure>
            <div className="flex-grow">

            </div>
            <div className={grid ? "card-body" : 'w-full mx-0 lg:w-1/2 lg:mx-10'}>
                <p className="text-orange-600 mx-auto mb-2">{product.price}$</p>

                <h2 className="card-title mx-auto text-lg font-bold mb-2">{handleShortenedText(product.name, 16)}</h2>
                <div>
                    {!grid && <p className="mb-2 text-slate-600"> {handleShortenedText(product.description, 150)} </p>}
                </div>

                <div className={isInCart?"card-actions justify-center":'"card-actions justify-end"'}>
                    {isInCart ? <div className="flex items-center">
                            <button className="btn btn-warning" onClick={() => decreaseFromCart(product)}>-</button>
                            <p className="py-2 px-4 rounded border-2 border-orange-500">{isInCart.cartQuantity}</p>
                            <button className="btn btn-warning" onClick={() => addProductToCart(product)}>+</button>
                        </div>
                     : <button className="btn btn-warning btn-sm w-full" onClick={() => addProductToCart(product)}>Add to Cart</button>}
                </div>
            </div>
        </div>
    );
};
ProductItem.propTypes = {
    product: PropTypes.object,
}
export default ProductItem;