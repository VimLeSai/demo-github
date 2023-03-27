import dayjs from 'dayjs';

// formatDate takes a date and returns it in the format "Do MMM, YYYY".
// For example, "1st Jan, 2020".
// It is used to format dates in the app.
const formatDate = (date) => {
  return dayjs(date).format('D MMM, YYYY');
};

export { formatDate };
