import React from "react";
// importing a helper from redux-form
// reduxForm is what allows us to communicate with our redux store
import { reduxForm, Field } from "redux-form";

class SurveyForm extends React.Component {
  //* Field explanation:
  //* name property: can be any string as we wish, it tells redux form that we have one piece of data being produced by our form called *surveyTitle*, and it gets stored as a key of surveyTitle
  //* component="input" tells the form to show as <input />

  //* How to submit the form?
  //* - in order to submit the form, you have to wrap the field with a <form> tag
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field type="text" name="surveyTitle" component="input" />
        </form>
      </div>
    );
  }
}
// connecting the redux form
export default reduxForm({
  form: "surveyForm",
})(SurveyForm);
