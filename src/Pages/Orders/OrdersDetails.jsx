import { Grid, Typography, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const OrdersDetails = (props) => {
  const { recordForEdit } = props;
  const [values, setValues] = useState();

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h5">{values.cakeName}</Typography>
        <Typography variant="h5">{values.cakeFilling}</Typography>
        <Typography variant="h5">Иван</Typography>
        <Typography variant="h5">Иванов</Typography>
        <Typography variant="h5">Иван</Typography>
        <Typography variant="h5">нещо си</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5">декември 18ти</Typography>
        <Typography variant="h5">брой парчета</Typography>
        <Typography variant="h5">доставка</Typography>
        <Typography variant="h5">надежда 1</Typography>
        <Typography variant="h5">платена</Typography>
        <Typography variant="h5">център</Typography>
        <Typography variant="h5">приета</Typography>
      </Grid>
    </Grid>
  );
};

export default OrdersDetails;
