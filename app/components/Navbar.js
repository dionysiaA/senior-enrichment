import React from 'react';
import { Link } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'campuses'
    }
    this.handleNavTabSwitch = this.handleNavTabSwitch.bind(this)
  }

  handleNavTabSwitch (e, itemId) {
    this.setState( { activeTab: itemId } );
  }

  render() {
    // pull in the router context
    console.log(this, 'here is the router')
    return (
    <nav role="navigation" className="navbar navbar-default navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <Link className="navbar-brand" to="/"><img src="../../public/images/campus-logo-light.png" /></Link>
        </div>

        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            {/*
             onClick={this.handleNavTabSwitch(null, 'campuses')}
             onClick={this.handleNavTabSwitch(null, 'students')}
            className="active" onClick={} <li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>*/}
            {/* className={(this.state.activeTab === "campuses") ? "active" : ""}*/}
            {/*className={(this.state.activeTab === "students") ? "active" : ""}*/}
            <li className="active">
              <Link to="/campuses" activeClassName="active"><strong>Campuses</strong></Link>
            </li>
            <li >
              <Link to="/students" activeClassName="active"><strong>Students</strong></Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
 );
  }
}
export default Navbar;
