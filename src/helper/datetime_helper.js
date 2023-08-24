import moment from 'moment';

function getTimeDifferenceFromNow(providedTime) {
  const currentTime = new Date();

  const providedTimeDate = new Date(providedTime);

  const timeDifferenceInMilliseconds = currentTime - providedTimeDate;

  const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60)) / 1000,
  );

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getClockInAndOutDifference(clockIn, clockOut) {
  const clockOutTime = new Date(clockOut);

  const clockInTime = new Date(clockIn);

  const timeDifferenceInMilliseconds = clockOutTime - clockInTime;

  const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60)) / 1000,
  );

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const announcementDateFormater = seconds => {
  if (!seconds) {
    return;
  }

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(seconds?.seconds * 1000);
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

const MIN = 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;

const getTimeDifference = timestamp => {
  const current = Date.now();
  const pastTime = timestamp?.seconds * 1000;
  const difference = (current - pastTime) / 1000;

  let differenceInWord;

  if (difference < 60) {
    differenceInWord = Math.floor(difference) + ' sec ago';
  } else if (difference / MIN < 60) {
    differenceInWord = Math.floor(difference / MIN) + ' min ago';
  } else if (difference / HOUR < 24) {
    differenceInWord = Math.floor(difference / HOUR) + ' hours ago';
  } else if (difference / DAY < 2) {
    differenceInWord = Math.floor(difference / DAY) + ' day ago';
  } else if (difference / DAY < 365) {
    differenceInWord = Math.floor(difference / DAY) + ' days ago';
  } else if (difference / YEAR < 2) {
    differenceInWord = Math.floor(difference / YEAR) + ' yr ago';
  } else {
    differenceInWord = Math.floor(difference / YEAR) + ' yrs ago';
  }

  return differenceInWord;
};

function calculateAge(inputDate) {
  if (!inputDate) return;

  // Split the input date into day, month, and year parts
  const [day, month, year] =
    typeof inputDate === 'string'
      ? inputDate.split('/')
      : moment(inputDate).format('DD/MM/yy').split('/');

  // Create a new Date object with the input year, month (adjusted by -1 as months are zero-indexed), and day
  const birthDate = new Date(year, month - 1, day);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and birth date
  const ageInMilliseconds = currentDate - birthDate;

  // Convert milliseconds to years and months
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = Math.floor(ageInMilliseconds / millisecondsPerYear);
  const months = Math.floor(
    (ageInMilliseconds % millisecondsPerYear) / (millisecondsPerYear / 12),
  );
  return { years: years?.toString(), months: months?.toString() };
}

function firebaseDateCalculateAge(inputDate) {
  if (!inputDate) return;

  const formattedDate = new Intl.DateTimeFormat('en-GB').format(
    inputDate?.toDate(),
  );

  // Split the input date into day, month, and year parts
  const [day, month, year] = formattedDate.split('/');

  // Create a new Date object with the input year, month (adjusted by -1 as months are zero-indexed), and day
  const birthDate = new Date(year, month - 1, day);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and birth date
  const ageInMilliseconds = currentDate - birthDate;

  // Convert milliseconds to years and months
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = Math.floor(ageInMilliseconds / millisecondsPerYear);
  const months = Math.floor(
    (ageInMilliseconds % millisecondsPerYear) / (millisecondsPerYear / 12),
  );

  return { years: years?.toString(), months: months?.toString() };
}

const DateTimeHelper = {
  getTimeDifferenceFromNow,
  getClockInAndOutDifference,
  announcementDateFormater,
  getTimeDifference,
  calculateAge,
  firebaseDateCalculateAge,
};

export default DateTimeHelper;
