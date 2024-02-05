import Header from "./Header";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
import Categories from "./Categories";
import { IoHeart } from "react-icons/io5";
import './Home.css';
import { faPersonBreastfeeding } from "@fortawesome/free-solid-svg-icons";


function LikedPost() {

 
  const navigate = useNavigate();

  const [post, setpost] = useState([]);
  const [cpost, setcpost] = useState([]);
  const [search, setsearch] = useState([]);
  

 // useEffect(() => {
 //       if (!localStorage.getItem('token')) {
 //          navigate('/login')
 //       }
 //  }, [])


   useEffect(() => {
    const url = 'http://localhost:4000/liked-post';    //API_URL + '/get-post';
    let data = { userId : localStorage.getItem('userId') }
    axios.post(url,data)
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
     setcpost(filteredPost);
}



const handleCategory = (value) =>{
  let filteredPost = post.filter((item , index) => {
    if (item.category == value) {
       return item;
    }
 })
 setcpost(filteredPost);
}




const handelLike = (postId) => {

  let userId = localStorage.getItem('userId')
  console.log('userId' , 'postId' , userId , postId);
  const url = 'http://localhost:4000/liked-post';    //API_URL + '/like-post';
  const data = {userId , postId}
    axios.post(url,data)
        .then((res) => {          
            if (res.data.message) {
                alert('Liked');
            }
        })
        .catch((err) => {          
            alert('Server Err.')
        })
}
    
    return (
      <div>
        

        <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
       <Link to = '/add-post'>ADD POST</Link>

       
        <h2> my Post </h2>

        <Categories handleCategory={handleCategory}/>


        <h5> Search result</h5>


        
       <div className="d-flex justify-content-center flex-wrap">
           {cpost && post.length > 0 &&
              cpost.map((item, index) => {
              return (
                <div key={item._id} className="card m-3">  
                <div onClick = {() => handelLike(item._id)} className="icon-con">
                <IoHeart className="icons"/> 
                </div> 
              
                 <img width="370px" height="200px" src={'http://localhost:4000/' + item.pimage} />
                 <h3 className="m-2 business-name-text"> {item.business_name}  </h3>
                 <p className="m-2 business-owner-name"> {item.business_owner_name}  | {item.business_id}  | {item.phone_number} </p>
                 <p className="m-2 category-text"> {item.category}  </p>
                 <p className="m-2 text-success"> {item.address} </p>
                 <h5 className="m-2 required-funding-text"> Required-Funding:-  {item.required_funding}$  </h5>    
                 <h5 className="m-2 total-funding-text">Total-Funding:- {item.total_funding}$</h5>
                </div>
        )

      })}
       </div>
        
        <h5> All Results</h5>

        <div className="d-flex justify-content-center flex-wrap">
           {post && post.length > 0 &&
              post.map((item, index) => {
              return (
                <div key={item._id} className="card m-3">       
                <div onClick = {() => handelLike(item._id)} className="icon-con">
                <IoHeart className="icons"/> 
                </div>         
                
                 <img width="370px" height="200px" src={'http://localhost:4000/' + item.pimage} />
                 <h3 className="m-2 business-name-text"> {item.business_name}  </h3>
                 <p className="m-2 business-owner-name"> {item.business_owner_name}  | {item.business_id}  | {item.phone_number} </p>
                 <p className="m-2 category-text"> {item.category}  </p>
                 <p className="m-2 text-success"> {item.address} </p>
                 <h5 className="m-2 required-funding-text"> Required-Funding:-  {item.required_funding}$  </h5>    
                 <h5 className="m-2 total-funding-text">Total-Funding:- {item.total_funding}$</h5>
                </div>
        )
      })}
       </div>



      </div>
    )
  }
  
  export default LikedPost;