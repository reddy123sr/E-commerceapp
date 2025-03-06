import { useEffect, useState } from "react";
import { Link} from "react-router-dom";


const Products=()=>{
    
    const[prs,setPrs]=useState([])
    useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res)=>res.json())
    .then((data)=>setPrs(data))
    .catch((err) => console.error("Error fetching products:", err));

    },[])

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="flex flex-wrap gap-1">
                {prs.map((product)=>(
                    <div 
                    key={product.id}
                    className="p-4 rounded shadow flex flex-col hover:shadow-amber-500">
                        <img 
                        className="w-40 h-40 mx-auto mb-3" src={product.image}/>
                        <div className="flex-grow"><h3 className="text-lg font-semibold w-60">{product.title}</h3>
                        <p className="text-gray-600">₹{product.price}</p></div>
                        <Link to={`/product/${product.id}`}
                        className="block mt-2 bg-blue-300 px-4 py-2 rounded hover:bg-blue-500">
                            <div className="">View Details {`>>`}</div>  
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
  }
  export default Products;