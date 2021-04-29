import React, { Component } from "react";
// hooking up the header to the redux store
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    //? console.log(this.props) - to check the props object
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            // if user is logged in, go to surveys, otherwise go to the homepage
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>

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
