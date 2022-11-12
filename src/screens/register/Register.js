import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  withStyles,
  Typography,
} from "@material-ui/core";
import {
  generateFieldsErrorDefault,
  generateFormInitialValues,
} from "../../common/form/FormUtils";
import { registerAccount } from "../../common/utils/HttpConnector";

const style = (theme) => ({
  centerElement: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  fieldContainer: {
    marginBottom: theme.spacing(1),
  },
  emptyFieldErr :{
    border: "solid 2px #5b5b5b",
    backgroundColor: '#5b5b5b',
    borderRadius: theme.spacing(1/2),
    marginTop: theme.spacing(1),
    color: 'white'
  }
});

const Register = (props) => {
  const { classes } = props;
  const formInputFields = [
    {
      name: "firstName",
      label: "First Name",
      required: true,
      type: "text",
      autoFocus: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      required: true,
      type: "text",
      autoFocus: false,
    },
    {
      name: "emailId",
      label: "Email Id",
      required: true,
      type: "email",
      autoFocus: false,
    },
    {
      name: "password",
      label: "Password",
      required: true,
      type: "password",
      autoFocus: false,
    },
    {
      name: "mobile",
      label: "Mobile No",
      required: true,
      type: "text",
      autoFocus: false,
    },
  ];

  /** using generic functions to generate field error and initial values based on form input Fields format**/
  const [formError, setFormError] = React.useState(
    generateFieldsErrorDefault(formInputFields)
  );
  const [formData, setFormData] = React.useState(
    generateFormInitialValues(formInputFields)
  );
  const [registerFailed, setRegisterFailed] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (registerFailed) {
      setRegisterFailed(false);
    }
  };

  const validate = (values) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const errors = Object.keys(values).reduce((prev, current) => {
      const isValid =
        values[current] !== null && values[current] !== "" ? true : false;
      return { ...prev, [current]: { isValid, errMsg: "Please fill out this field.", isEmpty: !isValid } };
    }, {});

    if (
      errors.emailId.isValid &&
      !regexEmail.test(values.emailId)
    ) {
      errors.emailId = { isValid: false, errMsg: "Enter valid email"  , isEmpty: false};
    }
    if (errors.password.isValid && values.password.length < 4) {
      errors.password = {
        isValid: false,
        errMsg: "Password length less than 4",
        isEmpty: false
      };
    }
    if (
      errors.mobile.isValid &&
      !regexPhone.test(values.mobile)
    ) {
      errors.mobile = {
        isValid: false,
        errMsg: "Enter valid mobile number",
        isEmpty: false
      };
    }
    return errors;
  };

  const resetForm = () => {
    setFormError(generateFieldsErrorDefault(formInputFields));
    setFormData(generateFormInitialValues(formInputFields));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData)
    const canSubmitForm = Object.keys(errors).reduce((prev, key) => {
        return prev && errors[key].isValid;
      }, true)
    setFormError(errors);
    if (canSubmitForm) {
      registerAccount(formData)
        .then((response) => {
          if (response.status === 200) {
            setRegisterSuccess(true);
            resetForm()
          } else if (response.status >= 400 && response.status < 500) {
            // won't show actual error as it can lead to guessing
            // error shows if username or password was wrong
            // show will just show invalid credentials
            setRegisterFailed(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className={classes.centerElement}
      >
        {formInputFields.map((field, index) => {
          return (
            <div
              className={classes.fieldContainer}
              key={`formfield_${index}_${field.label}`}
            >
              <FormControl fullWidth>
                <InputLabel required={field.required} htmlFor={field.name}>
                  {field.label}
                </InputLabel>
                <Input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  error={!formError[field.name].isValid}
                  onChange={handleChange}
                  value={formData[field.name]}
                  autoFocus={field.autoFocus}
                />
                {formError[field.name].isEmpty && (
                  <Typography className={classes.emptyFieldErr}>
                    {formError[field.name].errMsg}
                  </Typography>
                )}
                {!formError[field.name].isEmpty && !formError[field.name].isValid && (
                  <Typography color="error">
                    {formError[field.name].errMsg}
                  </Typography>
                )}
              </FormControl>

              <br />
            </div>
          );
        })}
        <br />
        {registerFailed && (
          <Typography color="error">Registration Failed!</Typography>
        )}
        {registerSuccess && (
          <Typography color="primary">
            Registration Successful. Please Login!
          </Typography>
        )}
        <br />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

/** with style is used as wrapper for material Ui theme based customization **/
export default withStyles(style)(Register);
