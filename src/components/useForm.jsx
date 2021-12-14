import { React, useState } from "react";
import { makeStyles } from "@material-ui/core";

export const useForm = (initialValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      executedBy: `${localStorage.firstName} ${localStorage.lastName}`,
      [name]: value,
    });

    if (validateOnChange) {
      validate({ [name]: value });
    }
  };
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };
  return {
    values,
    errors,
    setErrors,
    setValues,
    handleInputChange,
    resetForm,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));
export const Form = (props) => {
  const classes = useStyles();
  const { children, ...others } = props;

  return (
    <form className={classes.root} autoComplete="off" {...others}>
      {props.children}
    </form>
  );
};
