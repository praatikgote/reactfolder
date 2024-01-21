import Header from "./Header";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from "react";
import axios from "axios";
import "./AddPost.css";
import { RiFileAddLine } from 'react-icons/ri';



//import API_URL from "../constants";




function AddPost() {

 
  const navigate = useNavigate();

  const [business_name , setbusiness_name] = useState('');
  const [category , setcategory] = useState('');
  const [business_owner_name , setbusiness_owner_name] = useState('');
  const [business_id , setbusiness_id] = useState('');
  const [address , setaddress] = useState('');
  const [phone_number , setphone_numbe] = useState('');
  const [required_funding , setrequired_funding] = useState('');
  const [total_funding , settotal_funding] = useState('');
  const [about_business , setabout_business] = useState('');
  const [termsandconditions , settermsandconditions] = useState('');
  const [pimage, setpimage] = useState('');
  //const [pimage2, setpimage2] = useState('');


  useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
         }
   }, [])

   const handleApi = () => {

    navigator.geolocation.getCurrentPosition((position) => {
        const formData = new FormData();
        //formData.append('plat', position.coords.latitude)
        //formData.append('plong', position.coords.longitude)
        formData.append('business_name', business_name)
        formData.append('category', category)
        formData.append('business_owner_name', business_owner_name)
        formData.append('business_id', business_id)
        formData.append('address', address)
        formData.append('phone_number', phone_number)
        formData.append('required_funding', required_funding)
        formData.append('total_funding', total_funding)
        formData.append('about_business', about_business)
        formData.append('termsandconditions', termsandconditions)
        formData.append('pimage', pimage)
        //formData.append('pimage2', pimage2)



        //formData.append('userId', localStorage.getItem('userId'))

        //const url =  API_URL + 'http://localhost:4000/add-post';

        const url = 'http://localhost:4000/add-post';
         axios.post(url, formData)
            .then((res) => {
              console.log(res);
                if (res.data.message) {
                    alert(res.data.message); 
                    navigate('/')
                }
               
            })
            .catch((err) => {
                //alert('server err')
                console.log(err);
            })           
    })
}







    return (
      <div>
        
      

        <Header />


       
       <div className="p-3 max-w-2xl mx-auto mt-10">
       <h2 className="text-3xl font-bold mb-4"> ADD POST HERE : </h2>
       <p> Pitch Your Business With Invest Hub : </p>
                <label> Business Name </label>
                <input className="form-control" type="text" value={business_name}
                    onChange={(e) => { setbusiness_name(e.target.value) }} />

                <label> Business Owner Name </label>
                <input className="form-control" type="text" value={business_owner_name}
                    onChange={(e) => { setbusiness_owner_name(e.target.value) }} />
                <label> Business-id</label>
                <input className="form-control" type="text" value={business_id}
                    onChange={(e) => { setbusiness_id(e.target.value) }} />



                <label> Post Category </label>
                <select className="form-control" value={category}
                    onChange={(e) => { setcategory(e.target.value) }}>
                    <option> Business </option>
                    <option> Charity </option>
                    <option> Sponsorship </option>
                    
                </select>


                <label> Address</label>
                <input className="form-control" type="text" value={address}
                    onChange={(e) => { setaddress(e.target.value) }} />    
                <label> Phone-Number</label>   
                <input className="form-control" type="text" value={phone_number}
                    onChange={(e) => { setphone_numbe(e.target.value) }} />
                <label>Required-Funding</label>   
                <input className="form-control" type="text" value={required_funding}
                    onChange={(e) => { setrequired_funding(e.target.value) }} />
                <label> Total-Funding</label>   
                <input className="form-control" type="text" value={total_funding}
                    onChange={(e) => { settotal_funding(e.target.value) }} />
                  <label> About-business</label>   
                <input className="form-control" type="text" value={about_business}
                    onChange={(e) => { setabout_business(e.target.value) }} />
                  <label> Terms_And_Conditions</label>   
                <input className="form-control" type="text" value={termsandconditions}
                    onChange={(e) => { settermsandconditions(e.target.value) }} />

      <label className="form-label">Post Image</label>
        <div className="file-input">
          <RiFileAddLine className="icon" />
          <input
            type="file"
            onChange={(e) => {
              setpimage(e.target.files[0]);
            }}
          />
        </div>

       

        <button onClick={handleApi} className="submit-btn mt-4">
          SUBMIT
        </button>  


          </div>
               

       </div>
        
      
    )
  }
  
  export default AddPost;