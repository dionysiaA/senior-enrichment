import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addCampus } from '../reducers/campuses';

class Campuses extends Component {
  constructor(props) {
    super(props);
  }
    render() {
    console.log(this.props.campuses, 'here is the list of campuses')
    const campusList =  this.props.campuses.campuses && this.props.campuses.campuses.map((campus) => {
       return (
         <div key={campus.id} className="col-lg-6 campus-item">
          <div className="card h-100">
            <Link to={`/campuses/${campus.id}`}><img className="card-img-top campus img-fluid" src={campus.image}
                             alt=""/></Link>
            <div className="card-block">
              <h4 className="card-title"><Link to={`/campuses/${campus.id}`}>Campus: {campus.name}</Link></h4>
              <p className="card-text">Campus Information</p>
            </div>
          </div>
        </div>
       )
      });
      return (
        <div className="container">
          <h1 className="my-4">Campuses</h1>

          <div className="row">
            {campusList}
          </div>
        </div>
      )
    }
};

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ campuses }) => ({ campuses });

const mapDispatch = { addCampus };

export default connect(mapState, mapDispatch)(Campuses);

