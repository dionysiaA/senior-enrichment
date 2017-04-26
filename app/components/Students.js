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
    // this.onSubmit = this.onSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit (e, studentId) {
    if (e.currentTarget.innerHTML != "") return;
    if(!e.currentTarget.contentEditable){
      $(e.currentTarget).attr("contentEditable",true);
    }
    else{
      $(e.currentTarget).append("<input type='text'>");
    }
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


          <div className="col-md-12">
            <h4>Students List</h4>
            <div className="table-responsive">
              <table id="mytable" className="table table-borded ">

                <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Campus</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
                </thead>
                <tbody>

                {
                  students && students.map( (student) => {
                    return (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>
                          <span > {`Name: ${student.campus.name}`} </span>
                          <br/>
                          <span > {`Location: ${student.campus.location}`}</span>
                        </td>
                        <td>
                          <p data-placement="top" data-toggle="tooltip" title="Edit">
                            <button onClick={e => this.handleEdit(e, student.id)} className="btn btn-primary btn-xs"
                                    data-title="Edit" data-toggle="modal" data-target="#edit" >
                              <span className="glyphicon glyphicon-pencil"></span>
                            </button>
                          </p>
                        </td>
                        <td>
                          <p data-placement="top" data-toggle="tooltip" title="Delete">
                            <button onClick={e => this.handleDelete(e, student.id)} className="btn btn-danger btn-xs"
                                    data-title="Delete" data-toggle="modal" data-target="#delete" >
                              <span className="glyphicon glyphicon-trash"></span>
                            </button>
                          </p>
                        </td>
                      </tr>
                    )
                  })
                }

                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }




}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ campuses, students }) => ({ campuses, students  });

const mapDispatch = { addStudent, updateStudent, removeStudent };

export default connect(mapState, mapDispatch)(Students);
