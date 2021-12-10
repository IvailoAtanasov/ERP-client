import { React, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/useForm";
import { Controls } from "../../components/controls/controls";
import { Alert } from "@material-ui/lab";

const roleItems = [
  { id: "admin", title: "Администратор" },
  { id: "moderator", title: "Модератор" },
  { id: "user", title: "Служител" },
];

const initialValues = {
  id: 0,
  firstName: "",
  lastName: "",
  jobTitle: "",
  workLocation: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
};

const EmployeesForm = (props) => {
  const { addOne, recordForEdit, editOne, workLocationItems, readOnly } = props;

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "Това поле е задължително";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "Това поле е задължително";
    if ("jobTitle" in fieldValues)
      temp.jobTitle = fieldValues.jobTitle ? "" : "Това поле е задължително";
    if ("email" in fieldValues)
      temp.email =
        fieldValues.email &&
        // eslint-disable-next-line
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          fieldValues.email
        )
          ? ""
          : "Невалиден имейл адрес";
    if ("phone" in fieldValues)
      temp.phone =
        fieldValues.phone &&
        // eslint-disable-next-line
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
          fieldValues.phone
        ) // eslint-disable-line
          ? ""
          : "Невалиден телефонен номер";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Това поле е задължително";

    if ("confirmPassword" in fieldValues)
      temp.confirmPassword =
        values.password === fieldValues.confirmPassword
          ? ""
          : "Паролите не съвпадат";
    if ("role" in fieldValues)
      temp.role =
        fieldValues.role.length !== 0 ? "" : "Това поле е задължително";
    if ("workLocation" in fieldValues)
      temp.workLocation =
        fieldValues.workLocation.length !== 0 ? "" : "Това поле е задължително";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors, resetForm } =
    useForm(initialValues, true, validate);

  const registerHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (values.id === 0) {
          addOne("/api/users/register", values);
          setSuccessMessage("Успешна регистрация на Нов служител");
        } else {
          editOne(`/api/users/user/${values._id}`, values);
          setSuccessMessage("Записът за служителя е обновен");
        }

        setSuccess("success");
        resetForm();

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={registerHandler}>
      {success && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Controls.Input
            name="firstName"
            label="Име"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            inputProps={{
              readOnly: Boolean(readOnly),
              disabled: Boolean(readOnly),
            }}
          />
          <Controls.Input
            name="lastName"
            label="Фамилия"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            inputProps={{
              readOnly: Boolean(readOnly),
              disabled: Boolean(readOnly),
            }}
          />
          <Controls.Input
            name="email"
            label="Имейл"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
            inputProps={{
              readOnly: Boolean(readOnly),
              disabled: Boolean(readOnly),
            }}
          />
          {!readOnly ? (
            <Controls.Input
              name="password"
              label="Парола"
              value={values.password}
              onChange={handleInputChange}
              type="password"
              error={errors.password}
              inputProps={{
                readOnly: Boolean(readOnly),
                disabled: Boolean(readOnly),
              }}
            />
          ) : (
            ""
          )}

          {!readOnly ? (
            <Controls.Input
              name="confirmPassword"
              label="Потвърди парола"
              value={values.confirmPassword}
              onChange={handleInputChange}
              type="password"
              error={errors.confirmPassword}
              inputProps={{
                readOnly: Boolean(readOnly),
                disabled: Boolean(readOnly),
              }}
            />
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controls.Input
            name="phone"
            label="Телефон"
            value={values.phone}
            onChange={handleInputChange}
            error={errors.phone}
            inputProps={{
              readOnly: Boolean(readOnly),
              disabled: Boolean(readOnly),
            }}
          />

          <Controls.Input
            name="jobTitle"
            label="Длъжност"
            value={values.jobTitle}
            onChange={handleInputChange}
            error={errors.jobTitle}
            inputProps={{
              readOnly: Boolean(readOnly),
              disabled: Boolean(readOnly),
            }}
          />

          <Controls.RadioGroup
            name="role"
            label="Роля"
            value={values.role}
            onChange={handleInputChange}
            items={roleItems}
            readOnly={readOnly}
          />
          <Controls.Select
            name="workLocation"
            label="Месторабота"
            value={values.workLocation}
            onChange={handleInputChange}
            options={workLocationItems}
            error={errors.workLocation}
            readOnly={readOnly}
          />

          {!readOnly ? (
            <div>
              <Controls.Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                text="Регистрирай"
              />
              <Controls.Button
                variant="contained"
                color="default"
                size="large"
                text="Ресет"
                onClick={resetForm}
              />
            </div>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeesForm;
