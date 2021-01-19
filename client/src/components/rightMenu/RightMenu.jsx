import './style-rightMenu.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

function RightMenu(props) {
  
  const [menuOpen, setMenuOpen] = useState(false)
  const {isLefMenuOpen, setIsRightMenuOpen} = props;

  function closeRightMenu() {
    document.querySelector('.right-menu').classList.remove('open-right-menu');
    setMenuOpen(false);
    setIsRightMenuOpen(false)
  }

  function openRightMenu() {
    document.querySelector('.right-menu').classList.add('open-right-menu');
    setMenuOpen(true);
    setIsRightMenuOpen(true);
  }

  return(
    <>
      <div className={`right-menu ${isLefMenuOpen ? 'hide-menu' : '' }`}>
        <div className="right-menu__title title-menu">
          <span onClick={menuOpen ? closeRightMenu : openRightMenu}  className="right-menu__btn menu-btn">
            <img src="/images/category-menu.svg" alt="category menu"/>
          </span>
          <Link onClick={closeRightMenu} className="back-to-daily color-yellow" to={{pathname: '/',state: { category: 'daily-news' }}}>Back to Daily News</Link>
          <h3>Categories</h3>
        </div>
        <ul className="right-menu__categories pos-rel">
          <li>
            <Link onClick={closeRightMenu} to={{pathname: '/business',state: { category: 'business' }}}>
            <img className="img-cover" src="/images/business.jpg" alt="your news" />
              <span>business</span>
            </Link>
          </li>
          <li>
            <Link onClick={closeRightMenu} to={{pathname: '/technology',state: { category: 'technology' }}}>
              <img className="img-cover" src="/images/technology.jpg" alt="your news" />
              <span>technology</span>
            </Link>
          </li>
          <li>
            <Link onClick={closeRightMenu} to={{pathname: '/entertainment',state: { category: 'entertainment' }}}>
              <img className="img-cover" src="/images/entertainment.jpg" alt="your news" />
              <span>entertainment</span>
            </Link>
          </li>
          <li>
          <Link onClick={closeRightMenu} to={{pathname: '/health',state: { category: 'health' }}}>
              <img className="img-cover" src="/images/health.jpg" alt="your news" />
              <span>health</span>
            </Link>
          </li>
          <li>
          <Link onClick={closeRightMenu} to={{pathname: '/general',state: { category: 'general' }}}>
              <img className="img-cover" src="/images/general.jpg" alt="your news" />
              <span>general</span>
            </Link>
          </li>
          <li>
          <Link onClick={closeRightMenu} to={{pathname: '/science',state: { category: 'science' }}}>
              <img className="img-cover" src="/images/science.jpg" alt="your news" />
              <span>science</span>
            </Link>
          </li>
          <li>
          <Link onClick={closeRightMenu} to={{pathname: '/sports',state: { category: 'sports' }}}>
              <img className="img-cover" src="/images/sports.jpg" alt="your news" />
              <span>sports</span>
            </Link>
          </li>
        </ul>
        <div className="right-menu__your-news">
            <div className="right-menu__your-news--image pos-rel">
              <Link onClick={closeRightMenu} to={{pathname: '/saved-news',state: { category: 'saved-news' }}}>
                <img className="img-cover" src="/images/your-news.jpg" alt="your news" />
              </Link>
            </div>
            <div className="right-menu__your-news--title">
              <h3>Your saved <br /> <span className="color-yellow tt-up">news</span></h3>
            </div>
        </div>
      </div>
    </>
  ); 
}

export default RightMenu;