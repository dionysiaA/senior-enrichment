import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Root from './components/Root';
import Campuses from './components/Campuses';
import Campus from './components/Campus';
import Students from './components/Students';
import tempTable from './components/tempTable';
import Student from './components/Student';

import { fetchCampuses, fetchCampus } from './reducers/campuses';
import { fetchStudents, fetchStudent } from './reducers/students';

/* -----------------    COMPONENT     ------------------ */

const Routes = ({ fetchInitialData, onStudentEnter, onCampusEnter }) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRoute component={Campuses} />
      <Route path="campuses" component={Campuses} />
      <Route path="campuses/:id" component={Campus} onEnter={onCampusEnter} />
      <Route path="students" component={tempTable} />
      <Route path="students/:id" component={Student} onEnter={onStudentEnter} />
      <Route path="*" component={Campuses} />
    </Route>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  },
  onStudentEnter: (nextRouterState) => {
    const studentId = nextRouterState.params.id;
    dispatch(fetchStudent(studentId));
  },
  onCampusEnter: (nextRouterState) => {
    const campusId = nextRouterState.params.id;
    dispatch(fetchCampus(campusId));
  }
});

export default connect(mapProps, mapDispatch)(Routes);