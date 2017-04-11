import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE    = 'INITIALIZE_CAMPUSES';
const CREATE        = 'CREATE_CAMPUS';
export const REMOVE = 'REMOVE_CAMPUS';
const UPDATE        = 'UPDATE_CAMPUS';
const COLLECT       = 'COLLECT_CAMPUS';

/* ------------   ACTION CREATORS     ------------------ */

const init   = campuses => ({ type: INITIALIZE, campuses });
export const create = campus => ({ type: CREATE, campus });
const remove = id    => ({ type: REMOVE, id });
const update = campus  => ({ type: UPDATE, campus });
const collect = campus  => ({ type: COLLECT, campus });

/* ------------   Initial State     ------------------ */

const initialState = {
  campuses: [],
  selectedCampus: {}
}

/* ------------       REDUCER     ------------------ */

export default function reducer (state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case INITIALIZE:
      newState.campuses = action.campuses;
      break;

    case CREATE:
      newState.campuses = [action.campus, ...campuses];
      break;

    case REMOVE:
      newState.campuses = campuses.filter(campus => campus.id !== action.id);
      break;

    case UPDATE:
      newState.campuses = campuses.map(campus => (
        action.campus.id === campus.id ? action.campus : campus
      ));
      break;

    case COLLECT:
      newState.selectedCampus = action.campus;
      break;

    default:
      return state;
  }
  return newState;
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchCampuses = () => dispatch => {
  axios.get('/api/campuses')
    .then(res => dispatch(init(res.data)));
};

export const fetchCampus = (id) => dispatch => {
  axios.get(`/api/campuses/${id}`)
    .then(res => dispatch(collect(res.data)))
    .catch(err => console.error(`Fetching campus: ${id} unsuccesful`, err));
};

export const removeCampus = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/campuses/${id}`)
    .catch(err => console.error(`Removing campus: ${id} unsuccesful`, err));
};

export const addCampus = campus => dispatch => {
  axios.post('/api/campuses', campus)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating campus: ${campus} unsuccesful`, err));
};

export const updateCampus = (id, campus) => dispatch => {
  axios.put(`/api/campuses/${id}`, campus)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating campus: ${campus} unsuccesful`, err));
};
