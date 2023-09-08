export function timeSince(date) {
  if (!date) {
    return
  }
  
  const currentDate = new Date();
  const inputDate = new Date(date);
  
  // Calculate the time difference in milliseconds
  const timeDiff = currentDate - inputDate;
  
  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30; // Approximation for a month
  const year = day * 365; // Approximation for a year
  
  // Determine the appropriate time unit and value
  if (timeDiff < minute) {
      return 'just now';
  } else if (timeDiff < hour) {
      const minutes = Math.floor(timeDiff / minute);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDiff < day) {
      const hours = Math.floor(timeDiff / hour);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDiff < week) {
      const days = Math.floor(timeDiff / day);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (timeDiff < month) {
      const weeks = Math.floor(timeDiff / week);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (timeDiff < year) {
      const months = Math.floor(timeDiff / month);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
      const years = Math.floor(timeDiff / year);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}