import { Link, useNavigate } from 'react-router-dom';
//import './Header.css'
import './Header2.css'
import OlxLogo from "./assets/OlxLogo";
import SearchIcon from "./assets/SearchIcon";
import Arrow from "./assets/Arrow";
import SellButton from "./assets/SellButton";
import SellButtonPlus from "./assets/SellButtonPlus";
import categories from './CategoriesList';

function Categories(props) {

    //const navigate = useNavigate();

  
    return (
      <div className='cat-container'>
        
        <div>
                <span className='pr-3'>All Categories</span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span onClick={() => props.handleCategory && props.handleCategory(item)} key={index} className='category'> {item} </span>
                        )
                    })}
            </div>
          
         
        
      </div>
    );
  }
  
  export default Categories;
  