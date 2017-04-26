import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStudent, updateStudent, removeStudent } from '../reducers/students'

/* -----------------    COMPONENT     ------------------ */

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: props.students
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit (e, studentId) {

  }

  handleDelete(e, studentId) {
    e.stopPropagation();
    this.props.removeStudent(studentId);
  }

  render() {
    const { students } = this.props;
    console.log(students, 'here are the sudents');

    return (
      <div className="container">
        <div className="row">


        </div>
      </div>
    );
  }




}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ campuses, students }) => ({ campuses, students  });

const mapDispatch = { addStudent, updateStudent, removeStudent };

export default connect(mapState, mapDispatch)(Students);

