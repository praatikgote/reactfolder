import { Link, useNavigate } from 'react-router-dom';
import './Header.css'


function Header(props) {

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
  }
  
  export default Header;
  