import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Campus extends React.Component {

  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, id){
    e.preventDefault();
    browserHistory.push(`/students/${id}`);
  }

  render () {
    console.log(this.props, 'props in campus')
    const { campuses, selectedCampus: campus } = this.props.campuses;
    const studentList = campus.students && campus.students.map((student) => {
        return (
          <div key={student.id} className="col-sm-6 col-md-4 col-lg-3 mt-4">
            <div className="card card-inverse card-info">
              <div className="card-block">
                <figure className="profile">
                  <img src={student.profile_picture} className="profile-avatar" alt=""/>
                </figure>
                <h4 className="card-title mt-3">{student.name}</h4>
                <div className="meta card-text">
                  email: <a> {student.email}</a>
                </div>
                <div className="card-text">
                  Computer Science Student
                </div>
              </div>
              <div className="card-footer">
                <button onClick={(e) => this.handleClick(e, student.id)} className="btn btn-info float-center btn-sm">Profile</button>
              </div>
            </div>
          </div>
        )
      })
    return (
      <div className="mob_view">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              <a href="">
                <img src={ campus.image} />
              </a>
            </div>
            <div className="col-xs-12">
              <h3 className="text-center">Campus Name: {campus.name}</h3>
              <p className="text-center">
                <strong>Campus Location:</strong> {campus.location}
              </p>
              <p className="text-center">
                <strong> Campus description:</strong> {campus.description}
              </p>
            </div>
            <div className="col-xs-12">
              <h3 className="text-center">{`List of Students assigned to Campus: ${campus.name}`}</h3>
            </div>

            {/*VIEW ALL STUDENTS*/}
            <div className="container">
              <div className="row">
                {studentList}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  console.log(state, 'state in mapStaTe campis')
  return {
    students: state.students,
    campuses: state.campuses
  }
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Campus);
