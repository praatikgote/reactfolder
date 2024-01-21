import Header from "./Header";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";

function Home() {

 
  const navigate = useNavigate();

  const [post, setpost] = useState([]);
  const [search, setsearch] = useState([]);

 // useEffect(() => {
 //       if (!localStorage.getItem('token')) {
 //          navigate('/login')
 //       }
 //  }, [])


   useEffect(() => {
    const url = 'http://localhost:4000/get-post';    //API_URL + '/get-products';
    axios.get(url)
        .then((res) => {          
            if (res.data.post) {
                setpost(res.data.post);
            }
        })
        .catch((err) => {          
            alert('Server Err.')
        })
   }, [])   



   const handlesearch = (value) => {
    setsearch(value);
}


const handleClick = () => {
  let filteredPost = post.filter((item) => {
        if (item.business_name.toLowerCase().includes(search.toLowerCase()) ||
           item.about_business.toLowerCase().includes(search.toLowerCase()) ||
           item.category.toLowerCase().includes(search.toLowerCase())) {
           return item;
        }
     })
     setpost(filteredPost);
}
   
    return (
      <div>
        

        <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />



       <Link to = '/add-post'>ADD POST</Link>
        <h2> my Post </h2>

        <div className="d-flex justify-content-center flex-wrap">
           {post && post.length > 0 &&
              post.map((item, index) => {
              return (
                <div className="card m-3">                
                 <img width="370px" height="200px" src={'http://localhost:4000/' + item.pimage} />
                 <h3 className="m-2 business-name-text"> {item.business_name}  </h3>
                 <p className="m-2 business-owner-name"> {item.business_owner_name}  | {item.business_id}  | {item.phone_number} </p>
                 <p className="m-2 category-text"> {item.category}  </p>
                 <p className="m-2 text-success"> {item.address} </p>
                 <h3 className="m-2 required-funding-text"> $ {item.required_funding} /-  |  $ {item.total_funding}</h3>
                 <p className="m-2 about-business-text"> {item.about_business} </p>
                 <p className="m-2 termsandconditions-text"> {item.termsandconditions} </p>              
                </div>
        )

      })}

       </div>
        
      </div>
    )
  }
  
  export default Home;