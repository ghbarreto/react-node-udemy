import React, { Component } from "react";
// hooking up the header to the redux store
import { connect } from "react-redux";

class Header extends Component {
  renderContent() {
    // helper function to return either log out or log in
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a>Logout</a>
          </li>
        );
    }
  }

  render() {
    //? console.log(this.props) - to check the props object
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emaily</a>

          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  //* auth is being made in the index.js reducer
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
