import axios from 'axios';


export const BASEURL_V1 = 'https://test.api.yourargo.com:3000';
export const BASEURL = 'https://test.api.justvyb.com';
export const BASEURL_PROD = 'https://api.justvyb.com'
export const CDN_LINK_PROD = 'https://cdn.justvyb.com/'
export const CDN_LINK = 'https://assetargo.com/';
export const isProd = false;



const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000000
});

export function configureAxios(accessToken:any) {


  console.log(accessToken);

  service.interceptors.request.use(
    config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
}


service.interceptors.request.use(
  config => {

    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
   
       
    }
    return Promise.reject(error);
  },
);

export default service;
