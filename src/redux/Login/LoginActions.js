import { GET_SIGNED_USER, GET_API_Mapper, ADD_SIGNED_USER_DATA, REMOVE_USER_DATA, LOGIN_FAILED, LOGIN_LOADING, USER_LOGOUT, LOGOUT, CLEAR_JOBS_DATA } from '../ReduxConsants';
import Authservice from '../../services/AuthService';
import { PURGE } from 'redux-persist';
const BASE_URL = `Auth/login`;
import  { callAPI, getAPIMapper ,getKEYMapper} from "../Master/MasterActions";
import displayToast from '../../services/ToastService';
import Axios from "axios";
Axios.interceptors.response.use(response => {
  return response;
  }, error => {
  if (error.response.status === 401) {
    console.log('401 error');
    // logout();
    //useDispatch(logout());
  //place your reentry code
  }
  return error;
});

export function login(data) {
  return async function loginThunk(dispatch, getState) {
    dispatch({ type: LOGIN_LOADING, payload: true });
    const response = await Authservice.postData(`${BASE_URL}`, { Email: data.email, Password: data.password });
    if (response.success) {
      // response.ShortCode = 'VZ'; // this will update by payload
      dispatch({ type: ADD_SIGNED_USER_DATA, payload: response });
      Authservice.setRole(response.Role);
      getUserInitConfig(dispatch);
    } else {
      console.log(response);
      dispatch({ type: LOGIN_FAILED, payload: response });
    }
  }
}

function getUserInitConfig(dispatch) {
  dispatch(getKEYMapper());
  dispatch(getAPIMapper());
}


export function logout() {
  return function logoutThunk(dispatch, getState) {
    
    dispatch({
      type: LOGOUT,
      payload: null
    });
    dispatch({
      type: USER_LOGOUT,
      payload: null
    });
    dispatch({
      type: CLEAR_JOBS_DATA,
      payload: null
    })

    displayToast('success', 'Logout Success!');
    // dispatch({ 
		// 	type: PURGE,
		// 	key: "root",    // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
		//    result: () => null              // Func expected on the submitted action. 
		// });

  }
};
