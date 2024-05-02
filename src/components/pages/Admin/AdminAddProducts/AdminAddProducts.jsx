import { useState } from "react";
import Loading from "../../../sharedComponents/Loading/Loading";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../firebase/config";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const AdminAddProducts = () => {
    const pageKey=useParams().pageKey;
    const navigate=useNavigate();
    const initialProductState={
        name:'',
        price:'',
        imageURL:'',
        category:null,
        brand:'',
        description:''
        
    }
    const categories=[
        {id:1,name:'Laptop'},
        {id:2,name:'Electronics'},
        {id:3, name:'Fashion'},
        {id:4, name:'Phone'}
    ];
    const handlePageKey=(key1,key2)=>{
        if(pageKey==='Add'){
            return key1;
        }
        else{
            return key2;
        }
    }
    const products=useSelector(state=>state.products.products);
    const editProduct=products.find(product=>product.id===pageKey);
    const [loading, setLoading] = useState(false);
    const [uploadProgress,setUploadProgress]=useState(0);
    const [error,setError]=useState('');
    const [product,setProduct]= useState(()=>{
        const newState=handlePageKey({...initialProductState},editProduct);
        return newState;
    });

    const handleInputChanged=(e)=>{
        const {name,value}=e.target;
        setProduct({...product,[name]:value});
    }
    const handleImageChange=e=>{
        const image=e.target.files[0];
        setError('');
        const storageRef=ref(storage,`cuteshop-e5793/${Date.now()}${image.name}`);
        const uploadTask=uploadBytesResumable(storageRef,image);
        uploadTask.on("state_changed",
        (snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log('progress',progress);
            setUploadProgress(progress);
        },
        ()=>{
            setError('Something went Wrong !!!!');
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl)=>{
                setProduct({...product,imageURL:downloadUrl})
            });
        }
    );
    };

    const handleAddProduct= async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            await addDoc(collection(db,'products'),{
                name:product.name,
                price:Number(product.price),
                category:product.category,
                brand:product.brand,
                imageURL:product.imageURL,
                description:product.description,
                createdAt:Timestamp.now().toDate(),
            })
            setLoading(false);
            setUploadProgress(0);
            setProduct({...initialProductState});
            navigate('/admin/viewProducts');

        }
        catch(err){
            setLoading(false);
            console.log(err)
            setError('something went wrong!!! Please try again.')
        }
    }
    const handleEditProduct=(e)=>{
        e.preventDefault();
        setError('')
        setLoading(true);

        if(product.imageURL!==editProduct.imageURL){
            const storageRef=ref(storage,editProduct.imageURL);
            deleteObject(storageRef);
        }
        try{
            setDoc(doc(db,'products',pageKey),{
                name:product.name,
                price:product.price,
                imageURL:product.imageURL,
                brand:product.brand,
                description:product.description,
                category:product.category,
                createdAt:editProduct.createdAt,
                editedAt:Timestamp.now().toDate()
            });
            setLoading(false);
            setProduct({...initialProductState});
            navigate('/admin/viewProducts');

        }
        catch{
            setLoading(false);
            setError('Something went wrong. Try Updating again')
        }
    }

    return (
        <div>
            <div>{loading && <Loading></Loading>}</div>
            <div>
                <h2 className=" text-xl md:text-3xl lg:text-5xl text-center font-bold">{handlePageKey('Add New Product','Edit Product')}</h2>
                <div>
                <div className="card w-full max-w-xl shadow-2xl bg-slate-100 mx-auto">
                                <form className="card-body" onSubmit={handlePageKey(handleAddProduct,handleEditProduct)}>
                                    <div className="form-control">
                                        <input onChange={handleInputChanged} type="text" placeholder="Product Name" name="name" value={product.name} className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        {uploadProgress===0?null:(
                                            <div>
                                                <progress className="progress progress-accent w-full" value={uploadProgress} max='100'></progress>

                                            </div>
                                        )}
                                        <label htmlFor="image">Product image</label>
                                        <input type="file" id="image" onChange={handleImageChange} accept="image/" placeholder="Product Image" className="input input-bordered" required  name="imageURL" />
                                    </div>
                                    <div className="form-control">
                                        <input type="number" onChange={handleInputChanged} placeholder="Product Price" className="input input-bordered" required name="price" value={product.price} />
                                    </div>
                                    <div className="form-control">
                                        <input type="text" onChange={handleInputChanged} placeholder="Brand Name" className="input input-bordered" required name="brand" value={product.brand}/>
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="category">Select Category</label>
                                        <select name="category" value={product.category} className="p-3 rounded hover:border-none" onChange={handleInputChanged} required id="category">
                                            <option  selected disabled>----choose product category----</option>
                                            {categories.map(category=><option key={category.id} value={category.name}>{category.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <textarea name="description" value={product.description} id="" className="overflow-hidden resize-none rounded p-1 px-4" required  rows="3" onChange={handleInputChanged} placeholder="Product Description"></textarea>

                                    </div>
                                    <div className="form-control mt-4">
                                        <button className="btn btn-primary">{handlePageKey('Add Product','Save Edit')}</button>
                                    </div>
                                    
                                </form>
                                {error?<p className=" text-center text-red-600 text-sm font-bold">{error}</p>:null}
                            </div>
                </div>
            </div>

        </div>
    );
};

export default AdminAddProducts;