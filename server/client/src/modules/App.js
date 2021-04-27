import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// importing connect to connect this page to the action creators
import { connect } from "react-redux";
// importing the action creators
import * as actions from "../actions";

import Header from "./Header";
import Dashboard from "./Dashboard";

const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends React.Component {
  // wiring up action creators inside the app component
  componentDidMount() {
    // fetching the action creator data
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
        </BrowserRouter>
      </div>
    );
  }
}

// connecting the app component
// the actions creators are sent as props to the app component
export default connect(null, actions)(App);
