export default emails => {
  // removes the comma from each email, check every email
  // for additional spaces removes it, then checks if email is valid
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => regex.test(email) === false)
    .join(", ");

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return null;
};
