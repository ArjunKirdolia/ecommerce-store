// import { Link, useLocation} from 'react-router-dom';
// import Nav from './Nav';
// import React, { useContext ,useEffect , useState} from "react";
// import { ProductContext } from '../utils/Context';
// import Loading from './Loading';
// import axios from '../utils/axios';

// const Home = () => {
//     const [products] = useContext(ProductContext );
//     const {search} = useLocation();
//     const category = decodeURIComponent(search.split("=")[1]);

//     const [filteredProducts , setfilteredProducts]= useState([]);

//     const getproductscategory =async() => {
//         try {
//             const {data} = await axios.get(`/products/category/${category}`);
//             setfilteredProducts(data);
//     } catch (error) {
//         console.log(error);
//     }
// };
// useEffect(() => {
    
//     if(!filteredProducts || category == "undefined") 
//     setfilteredProducts(products)
//     if (category != "undefined"){
//         setfilteredProducts(products.filter(p => p.category == category))
//     }
// }, [category, products]);

//     return products ? (
//         <>
//            <Nav/>
//            <div className=" w-[85%]  p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto bg-stone-200">          
//             {filteredProducts && filteredProducts.map((p,i) => ( 
//             <Link key={i} to={`/details/${p.id}`}
//             className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[40vh] flex-col flex justify-center items-center">
//                     <div className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
//                         style={{
//                             backgroundImage:`url(${p.image})`,
//                         }}
//                     ></div>
//                     <h1 className="hover:text-blue-300 text-sm">
//                      {p.title} </h1>
//                 </Link>
//             ))}
//             </div>
//         </>
//     ) : ( 
//         <Loading />
//     );
// };
// export default Home;
import { Link, useLocation } from 'react-router-dom';
import Nav from './Nav';
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from '../utils/Context';
import Loading from './Loading';
import axios from '../utils/axios';

const Home = () => {
    const [products] = useContext(ProductContext);
    const { search } = useLocation();
    const category = search ? decodeURIComponent(search.split("=")[1]) : '';

    const [filteredProducts, setFilteredProducts] = useState([]);

    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category}`);
            setFilteredProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!products || products.length === 0) {
            // Fetch all products if products is not already populated
            axios.get('/products').then(response => {
                setFilteredProducts(response.data);
            }).catch(error => {
                console.error('Error fetching products:', error);
            });
        } else {
            // If products are already available
            if (!category || category === "undefined") {
                setFilteredProducts(products);
            } else {
                setFilteredProducts(products.filter(p => p.category === category));
            }
        }
    }, [category, products]);

    return products ? (
        <>
            <Nav />
            <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto bg-stone-200">
                {filteredProducts.map(p => (
                    <Link key={p.id} to={`/details/${p.id}`}
                        className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[40vh] flex-col flex justify-center items-center">
                        <div className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                            style={{
                                backgroundImage: `url(${p.image})`,
                            }}
                        ></div>
                        <h1 className="hover:text-blue-300 text-sm">
                            {p.title}
                        </h1>
                    </Link>
                ))}
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default Home;
