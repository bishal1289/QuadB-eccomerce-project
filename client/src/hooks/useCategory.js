import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory(){
    const [categories,setCategories] = useState([]);

    //get cart
    const getCategories = async () =>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/category/get-category`)
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    //hooks
    useEffect(() => {
       getCategories();
    },[])

    return categories;
}