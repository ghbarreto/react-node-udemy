// Survey field to render a single label
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  // ...input  is equals to writing onChange = input
  // if user clicks on the field, and clicks away, display the error message (that comes from the meta object)
  const validate = touched ? error : null;
  //? { touched && error } -> this is equal to the const validate
  return (
    <div>
      <label> {label} </label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {validate}
      </div>
    </div>
  );
};
