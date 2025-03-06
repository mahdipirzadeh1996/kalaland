import axios from 'axios';

export const fetchUser = async (dispatch, userId) => {
  dispatch({ type: 'FETCH_USER_START' });
  try {
    const response = await axios.get(`/api/user/${userId}`);
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message });
  }
};

export const createUser = async (dispatch, userData) => {
  dispatch({ type: 'CREATE_USER_START' });
  try {
    const response = await axios.post('/api/user', userData);
    dispatch({ type: 'CREATE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_USER_FAILURE', payload: error.message });
  }
};

export const updateUser = async (dispatch, userData) => {
  dispatch({ type: 'UPDATE_USER_START' });
  try {
    const response = await axios.put(`/api/user/${userData.id}`, userData);
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message });
  }
};

export const deleteUser = async (dispatch, userId) => {
  dispatch({ type: 'DELETE_USER_START' });
  try {
    await axios.delete(`/api/user/${userId}`);
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: userId });
  } catch (error) {
    dispatch({ type: 'DELETE_USER_FAILURE', payload: error.message });
  }
};