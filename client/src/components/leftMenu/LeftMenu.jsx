import './style-leftMenu.css';
import { useState } from 'react';


function LeftMenu(props) {

  const { setIsLeftMenuOpen , isRightMenuOpen, countryGeolocation , cityGeolocation
    , temperatureDescGeolocation , highTemperatureGeolocation , lowTemperatureGeolocation ,iconLinkGeolocation, filters, addFilters, deleteOnefilter, addTime } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const [valueFilter, setValueFilter] = useState('');
  const [valueTime, setValueTime] = useState('');

  const nameUser = localStorage.getItem('name');
  const userId = localStorage.getItem('_id');  

  function closeLeftMenu() {
    document.querySelector('.left-menu').classList.remove('open-left-menu');
    setMenuOpen(false);
    setIsLeftMenuOpen(false);
  }

  function openLeftMenu() {
    document.querySelector('.left-menu').classList.add('open-left-menu');
    setMenuOpen(true);
    setIsLeftMenuOpen(true);
  }

  function handleChangeFilter(event) {
    setValueFilter(event.target.value);
  }

  function handleChangeTime(event) {
    addTime(event.target.value);
    // setValueTime(event.target.value)
  }

  function handleSubmit (event) {
    event.preventDefault();
    if( valueFilter ) {
      addFilters(valueFilter, userId);
      setValueFilter('');
    } 
  }

  console.log(filters)

  return(
    <>
      <div className={`left-menu ${isRightMenuOpen ? 'hide-menu' : ''}`}>
        <div className="left-menu__title title-menu">
          <span onClick={menuOpen ? closeLeftMenu : openLeftMenu}  className="left-menu__btn menu-btn">
            <img src="/images/user-menu.svg" alt="category menu"/>
          </span>
          <h3 className="left-menu__user">
            <img src="/images/user.svg" alt="user"/>
            <span>{nameUser}</span>
            </h3>
        </div>
        <div className="left-menu__weather-info">
          <div className="left-menu__weather-info-col col-1">
            <span className="color-blue">{countryGeolocation},</span>
            <span className="color-blue">{cityGeolocation},</span>
            <span className="color-blue">{temperatureDescGeolocation}</span>
          </div>
          <div className="left-menu__weather-info-col col-2">
            <div className="left-menu__weather-info-col--temp">
            <span>{highTemperatureGeolocation}°</span>
            <span>{lowTemperatureGeolocation}°</span>
            </div>
          </div>
          <div className="left-menu__weather-info-col col-3">
            <img src={iconLinkGeolocation} alt="weather icon"/>
          </div>
        </div>
        <div className="left-menu__text">
          <p>Add filters <br/>for your <span className="color-blue">daily news</span> <br/>from tomorrow! </p>
        </div>
        <form onSubmit={handleSubmit} className="left-menu__input">
          <button>
            <img src="/images/check.svg" alt="check"/>
          </button>
          <input 
            value={valueFilter}
            onChange={handleChangeFilter}
            type="text" 
            placeholder="Type the filter..."
          />
        </form>
        <ul className="left-menu__filters">
          {
            filters.length === 0 ? <li className="left-menu__filters--text color-blue">Set filters for tomorrow's news</li> : 
            filters.map(filter => 
              <li className="button-blue pos-rel" key={filter._id}>
                <button onClick={() => deleteOnefilter(filter._id)}>
                  {filter.filter}
                </button>
              </li>
            )
          }          
        </ul>
        <div className="left-menu__wrap-bottom">
          <p className="left-menu__wrap-bottom--text">
          Set the <span className="color-blue">time</span><br/> for your <span className="color-blue">your news</span>
          </p>
          <div className="wrap-logout-time-log">
            <button className="log-out-btn">
              <img src="/images/log-out.svg" alt="log out"/>
              <span>
                Log Out
              </span>
              </button>
            <div className="wrap-logout-time">
              <input 
              type="time"
              onChange={handleChangeTime}
              value={valueTime}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ); 
}

export default LeftMenu;