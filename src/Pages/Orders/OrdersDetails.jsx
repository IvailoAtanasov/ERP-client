// eslint-disable-next-line
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { format } from "date-fns";
import deLocale from "date-fns/locale/bg";

const OrdersDetails = (props) => {
  const { recordForEdit, getStatusNameById } = props;

  const date = (date) => {
    return format(new Date(date), "eee dd MMM yyyy", {
      locale: deLocale,
    });
  };

  const takeAwayPlaceList = [
    { id: "center", title: "Център" },
    { id: "mladost", title: "Младост" },
    { id: "lozenec", title: "Лозенец" },
  ];

  const deliveryMethodList = [
    { id: "takeAway", title: "Взимане на място" },
    { id: "delivery", title: "Доставка" },
  ];

  const paymentMethodList = [
    { id: "payed", title: "Платена" },
    { id: "partialPayment", title: "Капарирана" },
    { id: "forPayment", title: "За Плащане" },
  ];

  const getNameById = (id, list) => {
    for (const element of list) {
      if (element.id === id) return element.title;
    }
  };

  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} sm={6}>
        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Статус:
            </Box>{" "}
          </Box>
          {getStatusNameById(recordForEdit.status)}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Дата на издаване:
            </Box>{" "}
          </Box>
          {date(recordForEdit.exitDate)}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Име на торта:
            </Box>{" "}
          </Box>
          {recordForEdit.cakeName}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Пълнеж:
            </Box>{" "}
          </Box>
          {recordForEdit.cakeFilling}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Брой парчета:
            </Box>{" "}
          </Box>
          {recordForEdit.numberOfPieces}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Създадена от:
            </Box>{" "}
          </Box>
          {recordForEdit.createdBy}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Създадена на:
            </Box>{" "}
          </Box>
          {date(recordForEdit.createdAt)}
        </Typography>

        {recordForEdit.additionalInfo ? (
          <Typography component="div">
            <Box
              fontWeight="fontWeightBold"
              fontSize="h6.fontSize"
              display="inline"
            >
              <Box fontSize="h6.fontSize" display="inline">
                Допълнителна информация:
              </Box>{" "}
            </Box>
            {recordForEdit.additionalInfo}
          </Typography>
        ) : (
          ""
        )}
      </Grid>
      <Grid item xs={12} sm={6} style={{ padding: "8px" }}>
        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Име на клиент:
            </Box>{" "}
          </Box>
          {recordForEdit.customerFirstName}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Фамилия на клиент:
            </Box>{" "}
          </Box>
          {recordForEdit.customerLastName}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Телефон на клинет:
            </Box>{" "}
          </Box>
          {recordForEdit.customerPhone}
        </Typography>

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Метод за доставка:
            </Box>{" "}
          </Box>
          {getNameById(recordForEdit.deliveryMethod, deliveryMethodList)}
        </Typography>

        {recordForEdit.deliveryMethod === "takeAway" ? (
          <Typography component="div">
            <Box
              fontWeight="fontWeightBold"
              fontSize="h6.fontSize"
              display="inline"
            >
              <Box fontSize="h6.fontSize" display="inline">
                Обект за взимане:
              </Box>{" "}
            </Box>
            {getNameById(recordForEdit.takeAwayPlace, takeAwayPlaceList)}
          </Typography>
        ) : (
          ""
        )}

        {recordForEdit.deliveryAddress ? (
          <Typography component="div">
            <Box
              fontWeight="fontWeightBold"
              fontSize="h6.fontSize"
              display="inline"
            >
              <Box fontSize="h6.fontSize" display="inline">
                Адрес за доставка:
              </Box>{" "}
            </Box>
            {recordForEdit.deliveryAddress}
          </Typography>
        ) : (
          ""
        )}

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Статус на плащане:
            </Box>{" "}
          </Box>
          {getNameById(recordForEdit.paymentMethod, paymentMethodList)}
        </Typography>

        {recordForEdit.partialPayment ? (
          <Typography component="div">
            <Box
              fontWeight="fontWeightBold"
              fontSize="h6.fontSize"
              display="inline"
            >
              <Box fontSize="h6.fontSize" display="inline">
                Капаро:
              </Box>{" "}
            </Box>
            {recordForEdit.partialPayment}
          </Typography>
        ) : (
          ""
        )}

        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Обект за издаване:
            </Box>{" "}
          </Box>
          {getNameById(recordForEdit.executionLocation, takeAwayPlaceList)}
        </Typography>
        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            fontSize="h6.fontSize"
            display="inline"
          >
            <Box fontSize="h6.fontSize" display="inline">
              Обработва се от:
            </Box>{" "}
          </Box>
          {recordForEdit.executedBy}
        </Typography>
      </Grid>
      <Grid item xs>
        <Paper
          style={{ margin: "auto", display: "flex", justifyContent: "center" }}
        >
          <img
            style={{ width: "80%" }}
            src={`http://localhost:5000/images/${recordForEdit.photo}`}
            alt=""
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrdersDetails;
