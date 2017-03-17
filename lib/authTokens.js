export const getAuthToken = (req) => {
  if (process.browser) {
    return localStorage.getItem('userToken');
  }

  if (req && req.session && req.session.userToken) {
    return req.session.userToken;
  }

  return false;
};

export const setAuthToken = (token) => {
  if (process.browser) {
    localStorage.setItem('userToken', token);

    location.href = `/auth/session?token=${token}`;
  }
};

export default {
  get: getAuthToken,
  set: setAuthToken,
};
