// SurveyFormReview show users their form to review
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";

// onCancel was sent as a prop, everytime the user clicks on the button
// it switches the state value to false, causing the form review to disappear
const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const reviewFormFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFormFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues)}
        className="green btn-flat right white-text"
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  //? getting access to the value from the form fields that is in the redux store
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
