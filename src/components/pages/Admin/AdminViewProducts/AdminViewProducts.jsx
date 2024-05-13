import { useEffect, useState } from "react";
import Loading from "../../../sharedComponents/Loading/Loading";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { saveProducts } from "../../../../redux/features/ProductSlice/productSlice";
import useFetchCollection from "../../../../CustomHooks/fetchCollectionHook";
import { filterBySearch } from "../../../../redux/features/FilterSlice/filterSlice";
import Pagination from "../../Home/HomeContent/Products/ProductList/Pagination/Pagination";
import AdminSearch from "../AdminSearch/AdminSearch";

const AdminViewProducts = () => {
    const [loading, setLoading] = useState(false);
    const { data, isLoading, isError } = useFetchCollection('products')
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [error, setError] = useState('');
    const filteredProducts = useSelector(state => state.filter.filteredProducts);
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const productsPerPage=5;

    useEffect(() => {
        dispatch(saveProducts(data))
        setLoading(isLoading);
        setError(isError)
    }, [data, dispatch, isLoading, isError]);

    useEffect(() => {
        dispatch(filterBySearch({ products, searchKey }))
    }, [dispatch, products, searchKey])

    const deleteProduct = async (id, imageURL) => {
        setError('');
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'products', id));
            const storeageRef = ref(storage, imageURL);
            await deleteObject(storeageRef);
            setLoading(false)
        }
        catch (err) {
            setLoading(false);
            console.log(err);
            setError('Something Wrong!!!! Try Deleting Again.');
        }
    }
    const confirmDelete = (id, imageURL) => {
        Notiflix.Confirm.show(
            'Delete Product !!!',
            'You are about to delete this product',
            'Delete',
            'Cancel',
            function okbtn() {
                deleteProduct(id, imageURL);
            },
            function cancelbtn() {
                //
            },
            {
                width: '320px',
                borderRadius: '3px',
                titleColor: 'orange',
                okButtonBackground: 'orange',
                cancelButtonBackground: 'green',
                cssAnimation: 'zoom',
            }

        )
    }
    return (
        <div>
            <h1 className="text-6xl border-b-2 w-fit mx-auto p-5">View Products</h1>
            {loading && <Loading></Loading>}
            <div className="overflow-x-auto ">
                <h2 className="text-xl mt-8 w-fit mx-auto font-bold border-b-2 p-3">All Products</h2>
                <div className="mb-10 mt-3 w-1/4 mx-auto">
                    <AdminSearch value={{ setSearchKey, setCurrentPage }}></AdminSearch>
                </div>
                {paginatedProducts.length == 0 ? <p className="text-center text-lg mt-5 ">No Products found</p> : (
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                            <thead className="border-t-4 border-b-4 border-sky-500 py-4">
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
                                {paginatedProducts.map((product, index) => <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td><img src={product.imageURL} className="w-[160px] h-[100px]" alt="" /></td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.brand}</td>
                                    <td className="flex justify-around mt-9">
                                        <Link to={`/admin/addProducts/${product.id}`}><FaEdit className="text-green-500 mr-2" size={20}></FaEdit></Link>
                                        <FaTrashAlt className="text-red-500 hover:cursor-pointer" size={20} onClick={() => {
                                            confirmDelete(product.id, product.imageURL);
                                        }}></FaTrashAlt>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                )}

            </div>
            {error ? <p className="text-red-500 text-xl font-bold text-center">{error}</p> : null}
            <div className="mt-20 w-fit mx-auto">
                <Pagination value={{productsPerPage,setPaginatedProducts,currentPage,setCurrentPage,filteredProducts}}></Pagination>
            </div>
        </div>
    );
};


export default AdminViewProducts;