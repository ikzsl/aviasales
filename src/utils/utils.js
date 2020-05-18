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

export const nulled = () => null;
