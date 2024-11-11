const getUrl = (url) => `${process.env.API_VERSION}${url}`;

export const ROUTES = {
  USER: {
    root: getUrl("/user"),
    login: getUrl("/user/login"),
  },
};
