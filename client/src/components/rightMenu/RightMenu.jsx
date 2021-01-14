import './style-rightMenu.css';

function RightMenu(props) {
  return(
    <>
      <div className="right-menu">
        <div className="right-menu__title title-menu">
          <h3>Categories</h3>
        </div>
        <ul className="right-menu__categories">
          <li>business</li>
          <li>technology</li>
          <li>entertainment</li>
          <li>health</li>
          <li>general</li>
          <li>science</li>
          <li>sports</li>
        </ul>
        <div className="right-menu__your-news">
          <div className="right-menu__your-news--image">
            <img src="/images/your-news.jpg" alt="your news" />
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