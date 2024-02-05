import { Link, useNavigate } from 'react-router-dom';
//import './Header.css'
import './Header2.css'
import OlxLogo from "./assets/OlxLogo";
import SearchIcon from "./assets/SearchIcon";
import Arrow from "./assets/Arrow";
import SellButton from "./assets/SellButton";
import SellButtonPlus from "./assets/SellButtonPlus";
import { BiBookmarkHeart } from "react-icons/bi";




function Header(props) {

  /*
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate('/login');
  }
    return (
      <div className='header-container-d-flex justify-content-between'>
        
       <div className="header">

          <Link to="/"> HOME </Link>

          <input className='search'
                    type='text'
                    value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
                    }
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > Search </button>
       </div>

       <div> 
       {!localStorage.getItem('token') ?         
          <Link to="/login"> Login </Link>  :
          <button onClick={handleLogout}> Logout </button>}    
       </div>
        
      </div>
    )

    */



    const navigate = useNavigate();

    const handleLogout = () => {
  
      localStorage.removeItem('token');
      navigate('/login');  
    
    };
    return (
      <div className="headerParentDiv">
        <div className="headerChildDiv">
          <div className="brandName">
          <Link className='links' to="/"> HOME </Link>
            <OlxLogo></OlxLogo>
          </div>
          <div className="placeSearch">
            <input type="text" 
            placeholder="Search specific post..."
            value={props && props.search}
            onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
            }
          />
          <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > Search </button>
     
          </div>
          <div className="productSearch">
           
          </div>
          
          <div className="language">
            <span> ENGLISH </span>
            <Arrow></Arrow>
          </div>
          <div className="loginPage">
          

              {!localStorage.getItem('token') ?
   
              <Link to="/login"> Login </Link>  :
              <button onClick={handleLogout}> Logout </button>}


          </div>
          
          <Link to="/liked-post">
            {" "}
            <div className="likedMenu">
            <BiBookmarkHeart className="customLogoliked"></BiBookmarkHeart>
              <div className="likedContent">
                <span></span>
              </div>
            </div>
          </Link>
          
          <Link to="/add-post">
            {" "}
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>POST</span>
              </div>
            </div>
          </Link>


    


        </div>
      </div>
    );
  }
  
  export default Header;
  