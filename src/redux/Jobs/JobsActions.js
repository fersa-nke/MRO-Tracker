
import API from '../../services/Api';
import { GET_JOBS, REMOVE_JOB_ITEM, SELECTED_JOB_ID, ADD_JOB_ITEM , LOADING_jOBS} from '../ReduxConsants';
// Define action types

// Construct a BASE URL for API endpoint
const BASE_URL = `nocodb/data/NKE-Tracebility/Jobs`;


export const getJobs = () => {
    return async (dispatch, getState) => {
    const token = getState().userReducer.token;
    const pageInfo =  getState().jobsReducer.pageInfo;
    const pageNo = pageInfo.page || 0;
    const pageSize = pageInfo.pageSize|| 5;
    if(pageInfo.isLastPage) {
        return false;
    }
    dispatch({
        type: LOADING_jOBS,
        payload: true,
      });
   // alert('calling once api jobs,'+pageNo+','+pageSize);
    API.GET(`${BASE_URL}`, token, {offset : pageNo, limit: pageSize})
        .then(res => {
            console.log('job list lenght', res.list.length);
            //Hide Loader
            if (res && res.list && res.list.length > 0) {
                dispatch({
                  type: GET_JOBS,
                  payload: res,
                });
            } else {
                dispatch({
                    type: LOADING_jOBS,
                    payload: false,
                });
                console.log('Unable to fetch JOB', res, res.list.length);
            }
        })
        .catch((error) => {
            console.log('error -------------->', error);
            //Hide Loader
    }); // JSON data parsed by `data.json()` call
    }
};

export const setSelectedJobId = id => dispatch => {
        dispatch({
            type: SELECTED_JOB_ID,
            payload: id
          });
}

export const saveJob = (jobData) => {
  return async (dispatch, getState) => {
    const token = getState().userReducer.token;
    API.POST(`${BASE_URL}`, token, jobData)
        .then(res => {
            console.log('save job', res);
            //Hide Loader
            if (res) {
                dispatch({
                  type: ADD_JOB_ITEM,
                  payload: res,
                });
            } else {
                console.log('Unable to save job');
            }
        })
        .catch((error) => {
            console.log('error -------------->', error);
            //Hide Loader
    }); // JSON data parsed by `data.json()` call
    }
  
};


export const updateJob = (jobData) => {
    return async (dispatch, getState) => {
      const token = getState().userReducer.token;
      API.PATCH(`${BASE_URL}/${Id}`, token, jobData)
          .then(res => {
              console.log('save job', res);
              //Hide Loader
              if (res) {
                  dispatch({
                    type: ADD_JOB_ITEM,
                    payload: res,
                  });
              } else {
                  console.log('Unable to save job');
              }
          })
          .catch((error) => {
              console.log('error -------------->', error);
              //Hide Loader
      }); // JSON data parsed by `data.json()` call
      }
    
  };

export const removeJob = (Id) => {
  return async (dispatch, getState) => {
    const token = getState().userReducer.token;
    API.DELETE(`${BASE_URL}/${Id}`, token)
        .then(res => {
            //Hide Loader
            if (res) {
                dispatch({
                  type: REMOVE_JOB_ITEM,
                  payload: res,
                });
            } else {
                console.log('Unable to DELETE job');
            }
        })
        .catch((error) => {
            console.log('error -------------->', error);
            //Hide Loader
    }); // JSON data parsed by `data.json()` call
    }
};