import { lightFormat, addMinutes } from 'date-fns';

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

export const formatPrice = (price) => `${price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} Р`;

export const formatDuration = (duration) => `${Math.floor(duration / 60)} ч ${duration % 60} м`;

export const formatInterval = (date, duration) => `${lightFormat(new Date(date), 'HH:mm')} – ${lightFormat(
  addMinutes(new Date(date), duration),
  'HH:mm',
)}`;
