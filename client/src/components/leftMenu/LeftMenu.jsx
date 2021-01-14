import './style-leftMenu.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

function LeftMenu(props) {

  const [menuOpen, setMenuOpen] = useState(false)

  function closeLeftMenu() {
    document.querySelector('.left-menu').classList.remove('open-left-menu');
    setMenuOpen(false);
  }

  function openLeftMenu() {
    document.querySelector('.left-menu').classList.add('open-left-menu');
    setMenuOpen(true);
  }

  return(
    <>
      <div className="left-menu">
        <div className="left-menu__title title-menu">
          <span onClick={menuOpen ? closeLeftMenu : openLeftMenu}  className="left-menu__btn menu-btn">
            <img src="/images/user-menu.svg" alt="category menu"/>
          </span>
          <Link onClick={closeLeftMenu} className="back-to-daily color-yellow" to="/daily">back to daily news</Link>
          <h3>Categories</h3>
        </div>
      </div>
    </>
  ); 
}

export default LeftMenu;