import {
  SIGNUP,
  LOGIN,
  FETCH_USER,
  FETCH_ARTICLES,
  FETCH_TAGS,
  SET_TAG,
  FETCH_TAG_ARTICLES,
} from "./types";

export function signUp(user) {
  return {
    type: SIGNUP,
    payload: user,
  };
}

export function login(user) {
  return {
    type: LOGIN,
    payload: user,
  };
}
export function fetchUser(user) {
  return {
    type: FETCH_USER,
    payload: user,
  };
}

export function fetchArticles(data) {
  return {
    type: FETCH_ARTICLES,
    payload: data,
  };
}

export function fetchTags(data) {
  return {
    type: FETCH_TAGS,
    payload: data,
  };
}

export function setTags(data) {
  return {
    type: SET_TAG,
    payload: data,
  };
}

export function fetchTagArticles(data) {
  return {
    type: FETCH_TAG_ARTICLES,
    payload: data,
  };
}
