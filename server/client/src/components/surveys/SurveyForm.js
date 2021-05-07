import React from "react";
import _ from "lodash";
// importing a helper from redux-form
// reduxForm is what allows us to communicate with our redux store
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends React.Component {
  //* Field explanation:
  //* NAME property: can be any string as we wish, it tells redux form that we have
  //* one piece of data being produced by our form called * surveyTitle *,
  //* and it gets stored as a key of surveyTitle
  //* COMPONENT="input" tells the form to be shown as an <input />

  //* How to submit the form?
  //* - in order to submit the form, you have to wrap the field with a <form> tag
  //* - the redux form has a function called handleSumit

  renderFields() {
    // returns the fields to display the form with values from formFields

    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form
          // onSurveySubmit was sent as a prop from SurveyNew.js, now everytime the
          // form is submitted here, the state will change there
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.emails = validateEmails(values.emails || "");

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  // if (!values.title) {
  //   errors.title = "You must provide a title";
  // }

  // if the errors === 0, then it will authenticate the form
  return errors;
};

// connecting the redux form
export default reduxForm({
  // validate will automaticaly run everytime the user submits the form
  validate,
  //? form: "surveyForm" -> tells redux to add the information from this file, like the form info
  form: "surveyForm",
  // doesnt clear the form on submit, makes the value stick around
  destroyOnUnmount: false,
})(SurveyForm);
