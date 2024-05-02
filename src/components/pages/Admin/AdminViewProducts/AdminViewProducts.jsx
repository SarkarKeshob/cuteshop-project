import { useEffect, useState } from "react";
import Loading from "../../../sharedComponents/Loading/Loading";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc} from "firebase/firestore";
import { db, storage } from "../../../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../../redux/features/ProductSlice/productSlice";
import useFetchCollection from "../../../../CustomHooks/fetchCollectionHook";

const AdminViewProducts = () => {
    const [loading, setLoading] = useState(false);
    const {data,isLoading,isError}=useFetchCollection('products')
    const dispatch=useDispatch();
    const products=useSelector(state=>state.products.products);
    const [error,setError]=useState('');

    useEffect(()=>{
        dispatch(setProducts(data))
        setLoading(isLoading);
        setError(isError)
    },[data,dispatch,isLoading,isError]);

    const deleteProduct= async(id,imageURL)=>{
        setError('');
        setLoading(true);
        try{
            await deleteDoc(doc(db,'products',id));
            const storeageRef=ref(storage,imageURL);
            await deleteObject(storeageRef);
            setLoading(false)
        }
        catch(err){
            setLoading(false);
            console.log(err);
            setError('Something Wrong!!!! Try Deleting Again.');
        }
    }
    const confirmDelete=(id,imageURL)=>{
        Notiflix.Confirm.show(
            'Delete Product !!!',
            'You are about to delete this product',
            'Delete',
            'Cancel',
            function okbtn(){
                deleteProduct(id,imageURL);
            },
            function cancelbtn(){
                //
            },
            {
                width:'320px',
                borderRadius:'3px',
                titleColor:'orange',
                okButtonBackground:'orange',
                cancelButtonBackground:'green',
                cssAnimation:'zoom',
            }
            
        )
    }
    return (
        <div>
            <h1 className="text-6xl border-b-2 w-fit mx-auto p-5">View Products</h1>
            {loading && <Loading></Loading>}
            <div className="overflow-x-auto ">
                <h2 className="text-xl mt-8 w-fit mx-auto font-bold border-b-2 p-3">All Products</h2>
                {products.length == 0 ? <p className="text-center text-lg mt-5">No Products found</p> : (
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th>S/no.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Brand</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product,index)=><tr key={index}>
                                    <th>{index+1}</th>
                                    <td><img src={product.imageURL} className="w-[160px] h-[100px]" alt="" /></td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.brand}</td>
                                    <td className="flex justify-around mt-9">
                                        <Link to={`/admin/addProducts/${product.id}`}><FaEdit className="text-green-500 mr-2" size={20}></FaEdit></Link>
                                        <FaTrashAlt className="text-red-500 hover:cursor-pointer" size={20} onClick={()=>{
                                            confirmDelete(product.id,product.imageURL);
                                        }}></FaTrashAlt>
                                    </td>
                                </tr>)}
                               
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>S/no.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Brand</th>
                                    <th>Actions</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}

            </div>
            {error?<p className="text-red-500 text-xl font-bold text-center">{error}</p>:null}
        </div>
    );
};


export default AdminViewProducts;