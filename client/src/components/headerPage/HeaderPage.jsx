import './style-headerPage.css';
import moment from 'moment';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HeaderPage(props) {
  const { titlePage, time, setTitlePage } = props;
  const location = useLocation();
  
  useEffect(()=>{
    if(location && location.state !== undefined) {
      setTitlePage(location.state.category)
    }
  },[location, setTitlePage])
  return(
    <>
    <div className="header-page">
      <img className="bg-top" src="/images/header-app.svg" alt="top of the app" />
      <div className="header-page__info">
        <img className="logo-oage" src="/images/logo-page.svg" alt="logo for the pages" />
        <div className="header-page__info--text">
          <span className="header-page__data color-blue">{time ? moment(time).format("MMM Do YY") : 'loading data...'}</span>
          <h2 className="title-page">
            <span>
            {titlePage}
            </span>
          </h2>
        </div>
      </div>
    </div>
    </>
  ); 
}

export default HeaderPage;