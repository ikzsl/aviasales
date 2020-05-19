import axios from 'axios';

export const cutArray = (arr, numberOfFirstElements) => {
  if (arr.length === 0) {
    return [];
  }
  const resArray = [];
  for (let i = 0; i < numberOfFirstElements; i += 1) {
    resArray[i] = arr[i];
  }
  return resArray;
};

export const getSearchId = () => axios.get('https://front-test.beta.aviasales.ru/search')
  .then((response) => response.data.searchId);

export const getData = (searchId) => axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
