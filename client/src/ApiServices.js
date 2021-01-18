import axios from 'axios';
const BASE_URL_SERVER = 'http://localhost:3200/news/';
const FORM_URL_SERVER = 'http://localhost:3200/api/user';
const FILTERS_URL_SERVER = 'http://localhost:3200/filters/';
const TIME_URL_SERVER = 'http://localhost:3200/time';

// api from server
//news
export async function getNewsServer(tokenUser) {
  return axios.get(BASE_URL_SERVER, {
    headers: {
      Authorization: `${tokenUser}`
    }
  })
    .then(news => news.data);
}

export async function postNewsPersonal(author, description, publishedAt, source, title, url, urlToImage, id, tokenUser) {
  const post = { author, description, publishedAt, source, title, url, urlToImage, id };
  return axios.post(BASE_URL_SERVER, post, {
    headers: {
      Authorization: `${tokenUser}`
    }
  })
}

export async function deleteNews(id) {
  return axios.delete(BASE_URL_SERVER + id)
}

//filters
export async function getFiltersServer(tokenUser) {
  return axios.get(FILTERS_URL_SERVER, {
    headers: {
      Authorization: `${tokenUser}`
    }
  })
    .then(news => news.data);
}

export async function postFiltersPersonal( filter, tokenUser ) {
  return axios.post(FILTERS_URL_SERVER, { filter }, {
    headers: {
      Authorization: `${tokenUser}`
    }
  })
}

export async function deleteFilters(id) {
  return axios.delete(FILTERS_URL_SERVER + id)
}

//time
export async function getTime(tokenUser) {
  return axios.get(TIME_URL_SERVER, {
    headers: {
      Authorization: `${tokenUser}`
    }
  })
    .then(news => news.data);
}

export async function postTime( time, tokenUser ) {
  return axios.post(TIME_URL_SERVER, { time }, {
    headers: {
      Authorization: `${tokenUser}`
    }
  })
}

// api for register/login
export async function login(email, password) {
  const user = { email, password };
  return axios.post(`${FORM_URL_SERVER}/login`, user);
}

export async function register(name , email , password) {
  const user = { name, email, password };
  return axios.post(`${FORM_URL_SERVER}/register`, user);
}

export async function getUser(token) {
  return axios.get(`${FORM_URL_SERVER}/user`, {
    headers: {
      Authorization: token
    }
  } ,token)
}



//api from web
// export async function getNews() {
//   return axios.get('http://newsapi.org/v2/everything?' +
//     'q=cornacchia&' +
//     'language=it&' +
//     'from=2020-12-26&' +
//     'sortBy=popularity&' +
//     'apiKey=797f19cbeedc498184dd394628e6bbd4')
//     .then(news => news.data);
// }

  // export async function getNews() {
  //   return axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=797f19cbeedc498184dd394628e6bbd4').then(data => data.data)
  // }

// export async function getNews() {
//   return axios.get(BASE_URL_SERVER).then(e=> console.log(e));
// }

export async function getNewsCategory(country, category) {
  return axios.get('http://newsapi.org/v2/top-headlines?' +
    'country=' + country + '&' +
    'category=' + category + '&' +
    'apiKey=797f19cbeedc498184dd394628e6bbd4')
    .then(news => news.data);
}


export async function getRandomImage() {
  return axios.get('https://api.unsplash.com/photos/random?query=news&client_id=af9jCeSxDOuXCcFhg4zd4pbsst1JPWwNX6SwY7J2-Xo')
    .then(news => news.data);
}


export async function getWeather(lat, long) {
  return axios.get(`https://weather.api.here.com/weather/1.0/report.json?product=observation&latitude=${lat}&longitude=${long}&oneobservation=true&app_id=devportal-demo-20180625&app_code=9v2BkviRwi9Ot26kp2IysQ`)
}


