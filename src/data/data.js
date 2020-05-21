import axios from 'axios';

const url = 'https://front-test.beta.aviasales.ru';

export const getSearchId = () => axios.get(`${url}/search`).then((response) => response.data.searchId);

export const getData = (searchId) => axios.get(`${url}/tickets?searchId=${searchId}`);
