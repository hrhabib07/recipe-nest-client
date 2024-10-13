export const customizedTimeDifference = (time: Date): string => {
  const postDate: Date = new Date(time); // Parse the post's created date
  const presentTime: Date = new Date(); // Get the current time

  const timeDifference = presentTime.getTime() - postDate.getTime(); // Difference in milliseconds

  // Convert milliseconds to different units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Determine the appropriate time difference to show
  let result;

  if (seconds < 60) {
    result = `${seconds} seconds ago`;
  } else if (minutes < 60) {
    result = `${minutes} minutes ago`;
  } else if (hours < 24) {
    result = `${hours} hours ago`;
  } else if (days < 7) {
    result = `${days} days ago`;
  } else if (weeks < 4) {
    result = `${weeks} weeks ago`;
  } else if (months < 12) {
    result = `${months} months ago`;
  } else {
    result = `${years} years ago`;
  }

  return result;
};
