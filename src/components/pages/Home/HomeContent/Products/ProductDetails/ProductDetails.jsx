import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
    const products=useSelector(state=>state.products.products);
    const id=useParams().id;
    const selectedProduct=products.find(product=>product.id==id);
    console.log(selectedProduct)
    return (
        <div className="w-full mx-3 md:w-5/6 md:mx-auto">
            <div className="border-b-2 border-slate-300 pb-5 w-1/2">
            <h2 className=" text-2xl md:text-3xl lg:text-4xl font-bold text-black">Product Details</h2>
            <Link to={'/'} className="flex items-center"> <span><FaArrowLeft></FaArrowLeft></span> <span>Back To Products</span> </Link>
            </div>
            <div className="grid lg:flex mt-5">
                <img  className="w-full lg:w-1/2 lg:mr-10" src={selectedProduct.imageURL} alt={selectedProduct.name} />
                <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl">{selectedProduct.name}</h1>
                    <p className="text-orange-600"><strong className="text-black mr-2">Price:</strong>{selectedProduct.price}$</p>
                    <p className="my-4">{selectedProduct.description}</p>
                    <p className="mb-4"><strong>Brand:</strong>{selectedProduct.brand}</p>
                    <button className="btn-lg btn btn-warning">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;