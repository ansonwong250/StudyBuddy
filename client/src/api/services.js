import axios from 'axios';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

const DEFAULT_ERROR = 'Something went wrong - Please try again later.';

const post = async (url, authToken, data = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers.Authorization = `Token ${authToken}`;

  try {
    return await fetch(`${process.env.REACT_APP_API_ROOT}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    throw new Error(DEFAULT_ERROR);
  }
};


export const login = async (data = {}) => {
  let responseData = null;
  let error = DEFAULT_ERROR;

  const response = await post('/api/auth/login/', null, data);

  responseData = await response.json();

  if (response.status !== 200) {
    try {
      error = responseData.non_field_errors[0];
    } catch (_) {
      error = DEFAULT_ERROR;
    }
    throw new Error(error);
  }

  return responseData;
};

export const register = async (data = {}) => {
  let responseData = null;
  let error = DEFAULT_ERROR;

  const response = await post('/api/auth/register/', null, data);

  responseData = await response.json();

  if (response.status !== 200) {
    try {
      error = responseData.non_field_errors[0];
    } catch (_) {
      error = DEFAULT_ERROR;
    }
    throw new Error(error);
  }

  return responseData;
};


export const verifySession = async (token) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/auth/`, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const getProfiles = async (token, userID) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/profile/get/${userID}`, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const getMessages = async (token, userID, theirUserID) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/messages/get/${userID}/${theirUserID}`, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const matchFriends = async (token) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/match/`, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};


export const updateProfile = async (token, data) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/profile/update`, data, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const addFriend = async (token, data) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/friends/add`, data, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const acceptFriend = async (token, data) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/friends/accept`, data, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};

export const addProcedure = async (token, data) => {
  let responseData = null;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/doctor/procedure`, data, headers);

    responseData = await response.data;

    return responseData;
  }
  catch (_) {
    return DEFAULT_ERROR
  }
};