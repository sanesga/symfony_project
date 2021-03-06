import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

// const API_ROOT = 'https://conduit.productionready.io/api';
const API_ROOT = "http://0.0.0.0:8000";

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url => superagent.get(`${API_ROOT}${url}`).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody),
  responseLogout: url => superagent.get(`${API_ROOT}${url}`)

};

const Auth = {
  current: () => requests.get("/userData"),
  // login: (email, password) =>
  //   requests.post('/users/login', { user: { email, password } }),
  register: (email, password) => {
    requests.post("/register", { email: email, password: password });
  },

  save: user => requests.put("/user", { user }),
  logout: () => requests.responseLogout("/logout")
};

const Restaurants = {
  getAll: () => requests.get("/restaurants"),
  unfavorite: id => requests.del(`/deletefavorite/${id}`),
  favorite: id => requests.post(`/addfavorite/${id}`),
  get: id => requests.get(`/restaurant/${id}`),
  getFavorites: () => requests.get("/showfavorites")

};
const UserData = {
  get: () => requests.get("/userData"),
  updateUserData: (email) => {
    requests.put("/updateuser", { email: email});
  },
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });
const Articles = {
  all: page => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug => requests.del(`/articles/${slug}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get("/articles/feed?limit=10&offset=0"),
  // requests.get('/articles'),
  get: slug => requests.get(`/articles/${slug}`),
  unfavorite: slug => requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article => requests.post("/articles", { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug => requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Restaurants,
  UserData,
  setToken: _token => {
    token = _token;
  }
};
