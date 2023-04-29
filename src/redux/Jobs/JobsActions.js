
import API from '../../services/Api';
import { GET_JOBS, DELETE_jOB_ITEM, SELECTED_JOB_ID, ADD_JOB_ITEM , UPDATE_JOB_ITEM, LOADING_jOBS} from '../ReduxConsants';
// Define action types
import { Toast } from 'toastify-react-native';

// Construct a BASE URL for API endpoint
const BASE_URL = `nocodb/data/NKE-Tracebility/Jobs`;
export const getJobs = () => {
    return async (dispatch, getState) => {
    const token = getState().userReducer.token;
    const pageInfo =  getState().jobsReducer.pageInfo;
    const offSet = pageInfo.offSet || 0;
    const pageSize = pageInfo.pageSize|| 5;

    if(pageInfo.isLastPage) {
        return false;
    }
    dispatch({
        type: LOADING_jOBS,
        payload: true,
      });
   // alert('calling once api jobs,'+pageNo+','+pageSize);
    API.GET(`${BASE_URL}`, token, {offset : offSet, limit: pageSize})
        .then(res => {
            console.log('job list lenght', res.list.length, res.pageInfo.isLastPage);
            dispatch({
                type: LOADING_jOBS,
                payload: false,
            });

            //Hide Loader
            if (res && res.list && res.list.length > 0) {
                res.pageInfo.offSet = offSet + pageSize;
                console.log(res.pageInfo);
                dispatch({
                  type: GET_JOBS,
                  payload: res,
                });
            } else {
                console.log('Unable to fetch JOB', res, res.list.length);
            }
        })
        .catch((error) => {
            dispatch({
                type: LOADING_jOBS,
                payload: false,
            });

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

export const saveJob = (jobData, callBack) => {
  return async (dispatch, getState) => {
    dispatch({
        type: LOADING_jOBS,
        payload: true,
    });
    const token = getState().userReducer.token;
    API.POST(`${BASE_URL}`, token, jobData)
        .then(res => {
            console.log('save job', res);
            //Hide Loader
            dispatch({
                type: LOADING_jOBS,
                payload: false,
            });
            if (res) {
                let obj = {...jobData, Id: res.Id};
                console.log('job data', obj);
                Toast.success('Job Created!');
                dispatch({
                  type: ADD_JOB_ITEM,
                  payload: obj,
                });
                callBack();
            } else {
                Toast.error('Unable to save job');
            }
        })
        .catch((error) => {
            
            dispatch({
                type: LOADING_jOBS,
                payload: false,
            });
            Toast.error('error -------------->'+error);
            //Hide Loader
    }); // JSON data parsed by `data.json()` call
    }
  
};


export const updateJob = (jobData, Id, navigation) => {
    return async (dispatch, getState) => {
      const token = getState().userReducer.token;
        dispatch({
            type: LOADING_jOBS,
            payload: true,
        });
      API.PATCH(`${BASE_URL}/${Id}`, token, jobData)
          .then(res => {
            console.log('update job', res);
            //Hide Loader
            dispatch({
                type: LOADING_jOBS,
                payload: false,
            });
            if (res) {
                let jobs = getState().jobsReducer.jobs;
                let jobIndex = jobs.findIndex(x => x.Id === Id);
                jobs[jobIndex] = jobData;
                console.log('updated jobs',jobIndex,  jobs);
                Toast.success('Job Updated!');
                dispatch({
                  type: UPDATE_JOB_ITEM,
                  payload: jobs
                });
                navigation();
            } else {
                Toast.error('Unable to save job');
            }
        })
        .catch((error) => {
            
            dispatch({
                type: LOADING_jOBS,
                payload: false,
            });
            console.log('error-------------->', error);
            Toast.error('error -------------->'+error);
            //Hide Loader
      }); // JSON data parsed by `data.json()` call
      }
    
  };

export const removeJob = (Id) => {
    console.log(Id);
  return async (dispatch, getState) => {
    const token = getState().userReducer.token;
    API.DELETE(`${BASE_URL}/${Id}`, token)
        .then(res => {
            //Hide Loader
            if (res && res.ok) {
                dispatch({
                  type: DELETE_jOB_ITEM,
                  payload: Id
                });
                Toast.success('Job Deleted!');
            } else {
                Toast.error('Unable to DELETE');
                console.log('Unable to DELETE job', res);
            }
        })
        .catch((error) => {
            Toast.error('error -------------->'+error);
            console.log('error -------------->', error);
            //Hide Loader
    }); // JSON data parsed by `data.json()` call
    }
};