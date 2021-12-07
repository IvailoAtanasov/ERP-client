import { Grid, Typography, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import deLocale from "date-fns/locale/bg";

const OrdersDetails = (props) => {
  const { recordForEdit } = props;
  const [values, setValues] = useState({});

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  const date = () => {
    return format(new Date(values.exitDate), "eeee dd MMM yy", {
      locale: deLocale,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Статус: ${values.status}`}</Typography>
        <Typography style={{ marginTop: "8px" }} variant="h5">
          {`Дата на издаване: ${date()}`}
        </Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Име на торта: ${values.cakeName}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Пълнеж: ${values.cakeFilling}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Брой парчета: ${values.numberOfPieces}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Създадена от: ${values.createdBy}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Допълнителна информация: ${values.additionalInfo}`}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} style={{ padding: "8px" }}>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Име на клиент: ${values.customerFirstName}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Фамилия на клиент: ${values.customerLastName}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Телефон на клинет: ${values.customerPhone}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Метод за доставка: ${values.deliveryMethod}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Обект за взимане: ${values.takeAwayPlace}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Адрес за доставка: ${values.deliveryAddress}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Начин на плащане: ${values.paymentMethod}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Капаро: ${values.partialPayment}`}</Typography>
        <Typography
          style={{ marginTop: "8px" }}
          variant="h5"
        >{`Обект за издаване: ${values.executionLocation}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrdersDetails;
