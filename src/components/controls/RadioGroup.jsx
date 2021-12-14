import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

export const RadioGroup = (props) => {
  const {
    name,
    label,
    value,
    onChange,
    items,
    readOnly,
    error = null,
    ...rest
  } = props;
  return (
    <FormControl
      disabled={readOnly ? true : null}
      {...rest}
      {...(error && { error: true, helperText: error })}
    >
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};
