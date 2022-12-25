import { useMemo, useState } from "react";

/**
 * 
 * @param {Object} initialState intial state of the form in key,value pair
 * @param {Function} validator a validator function which validated the current state values and returns error object
 * @param {Function} onSubmit function to submit the form, which get call only if form is valid
 * @param {Function} stateChangeCallBack a function to callback whenever there is any change is state
 * @returns {Object} an object with values, touched, errors, setFieldValue, submitForm
 */
export const useForm = ({
  initialState,
  validator,
  onSubmit,
  stateChangeCallBack,
}) => {
  const initialTouchedState = useMemo(() => {
    let touched = {};
    Object.keys(initialState).forEach((key) => {
      touched[key] = false;
    });
    return touched;
  }, [initialState]);

  const [allTouched, setAllTouched] = useState(false);
  const [values, setValues] = useState({ ...initialState });
  const [touched, setTouched] = useState({ ...initialTouchedState });
  const [errors, setErrors] = useState({ ...initialState });

  const setFieldValue = (key, value) => {
    let tempVal = { ...values, [key]: value };
    let tempTouched = { ...touched, [key]: true };
    setValues(tempVal);
    setTouched(tempTouched);

    if (validator) {
      setErrors(validator(tempVal));
    }
    if (stateChangeCallBack) {
      stateChangeCallBack(tempVal);
    }
  };

  const markAllTouched = () => {
    let touched = {};

    Object.keys(initialState).forEach((key) => {
      touched[key] = true;
    });

    setTouched(touched);
    setAllTouched(true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!allTouched) {
      markAllTouched();
    }

    if (validator) {
      let errors = validator(values);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
      } else {
        onSubmit(values);
      }
    } else {
      onSubmit(values);
    }
  };

  return { values, touched, errors, setFieldValue, submitForm };
};
