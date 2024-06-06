import React ,{useContext} from 'react'
import { ProductContext } from '../utils/Context'
import {Link } from "react-router-dom";

const Nav = () => {
    const [products] = useContext(ProductContext);
    
    let distinct_category = 
         products && products.reduce((acc, cv) => [...acc, cv.category],[]);
     distinct_category = [...new Set(distinct_category)];    
    
    const color = () => {
      return `rgba(${(Math.random() *255).toFixed()},${(
        Math.random() *255).toFixed()},${(Math.random() *255).toFixed()},0.4)`;
      };
      console.log(color());

    return (
        <nav className="w-[15%] h-full bg-zinc-300 flex flex-col items-center pt-5">
      <div className="py-2 px-4 my-1 border rounded border-blue-500  text-white-300" >EXPRESS.COM</div>
      
      <a className = "my-2 py-2 px-5 border rounded border-blue-200 bg-orange-400" href="/create">
        Add New Product
      </a>

      <hr className="my-3 w-[80%]" />
      
      <h1 className="text-1xl mb-3 w-[80%] border border-blue-300">Category Filter</h1>
      
      < div className=" w-[80%]">
        {distinct_category.map((c,i) => (
          <Link key={i} to={`/?category=${c}`}
          className="flex items-center mb-3">

          <span style={{backgroundColor: color()}}className="rounded-full mr-2 w-[15px] h-[15px]"></span>{" "}
          {c}
        </Link>
      
      ))}  
      </div>
    
    </nav>
    )
}
export default Nav;