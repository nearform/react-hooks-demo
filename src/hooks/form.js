import { useState } from "react";

// custom hook for textinput elements
export function useInput(name, defaultValue, validate, regex) {
  // set up the state for the input item and error
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);

  // updates the state onChange event
  function handleChange(e) {
    // set the state no matter what
    setValue(e.target.value);
    setError(null); // hide error on input
  }

  // when component loses focus run validation
  function handleBlur() {
    handleValidate();
  }

  // call validate if supplied and set error appropriately
  function handleValidate() {
    const valid = validate && validate(value, regex);
    setError(!valid);
    return valid;
  }

  // other handlers like focus, blur etc could be handled
  // conditional stuff to transform value to props could also be added

  return {
    props: {
      name,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      error
    },
    validate: handleValidate
  };
}

// custom hook for form input
export function useSubmit(inputs, success) {
  // set up the state for the error component
  const [errorItems, setErrorItems] = useState(null);

  // handle submit
  function handleSubmit(e) {
    e.preventDefault(); //prevent page refresh

    //blur everything to validate again
    const errorItems = inputs.filter(input => !input.validate());
    setErrorItems(errorItems);
    if (errorItems && errorItems.length === 0) {
      success &&
        success(
          inputs.map(({ props: { name, value } }) => ({
            name,
            value
          }))
        );
    }
  }

  return {
    props: {
      onSubmit: handleSubmit
    },
    errorItems
  };
}
