import axios from 'axios';

axios.defaults.baseURL = 'https://front-test.beta.aviasales.ru';

export const getSearchId = () => axios.get('/search').then((response) => response.data.searchId);
export const getData = (searchId) => axios.get(`/tickets?searchId=${searchId}`);
