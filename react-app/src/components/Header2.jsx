import { Link, useNavigate } from 'react-router-dom';
import './Header2.css'


function Header2(props) {
    
    const navigate = useNavigate();

    const handleLogout = () => {
  
      localStorage.removeItem('token');
      navigate('/login');  
    
    };
    return (
      <div className="headerParentDiv">
        <div className="headerChildDiv">
          <div className="brandName">
          <Link to="/"> HOME </Link>
            <OlxLogo></OlxLogo>
          </div>
          <div className="placeSearch">
            <input type="text" 
            placeholder="Search specific post..."
            value={props && props.search}
            onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
            }
          />{filteredData.length === 0 ? (
            <div onClick={handleEmptyClick}> <SearchIcon /> </div>
           ) : (
             <div id="clearBtn"  onClick={clearInput} > <Arrow></Arrow></div>
           )}
            {filteredData.length !== 0 && (
          <div className="dataResult-header">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <div key={key} className="dataItem-header" onClick={()=>handleSelectedSearch(value)}>
                  <p>{value.name} </p>
                </div>
              );
            })}
          </div>
        )}
           
          </div>
          <div className="productSearch">
            <Search />
          </div>
          
          <div className="language">
            <span> ENGLISH </span>
            <Arrow></Arrow>
          </div>
          <div className="loginPage">
            {user ? (
              user.displayName
            ) : (
              <Link to="/login">
                <span>Login</span>
              </Link> 
            )}
            <hr />
          </div>
          {user && (
            <span onClick={logoutHandler} className="logout-span">
              Logout
            </span>
          )}
          
          <Link to="/create">
            {" "}
            <div className="sellMenu">
            <SellButtonPlus></SellButtonPlus>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  
  export default Header2;