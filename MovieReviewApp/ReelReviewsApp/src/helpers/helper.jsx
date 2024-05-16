//  This is my helper function that is used here to set up validation globally in Application for my input fields
// if login and register page's input fileds are empty, and click eother Login or Register button, "Required" name will pop up for all mandatory fields.
// Also, i have set "required" as true so user can see asterisk mark on mandatory fields.

import moment from 'moment';

export const antValidationError = [
  {
    message: "Required",
    required: true
  }
];

export const getDateFormat = (date) => {
    return moment(date).format("MMMM Do, YYYY")
}

export const getTimeFormat = (date) => {
  return moment(date).format("MMMM DD, YYYY");
};
export const getDateTimeFormat = (date) => {
  return moment(date).format("MMMM DD, YYYY hh:mm A");
};
