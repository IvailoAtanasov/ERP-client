import React, { useEffect, useState } from "react";
import OrdersForm from "./OrdersForm";
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableSortLabel,
  Toolbar,
} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import { Controls } from "../../components/controls/controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { Popup } from "../../components/controls/Popup";
import {
  registerOne,
  updateOne,
  getAll,
  deleteOne,
} from "../../Services/EmployeeService/EmployeeService";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import { format } from "date-fns";
import deLocale from "date-fns/locale/bg";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },

  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
    padding: "15px",
  },
}));

const headCells = [
  { id: "orderId", label: "№" },
  { id: "status", label: "Статус" },
  { id: "exitDate", label: "Дата на издаване" },
  { id: "cakeName", label: "Име на торта" },
  { id: "customerFirstName", label: "Име на клиент" },
  { id: "customerLastName", label: "Фамилия на клиент" },
  { id: "actions", label: "Действия", disableSorting: true },
];

const Orders = () => {
  const classes = useStyles();
  const pages = [5, 10, 15];
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[1]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [readOnly, setRedOnly] = useState(false);
  // eslint-disable-next-line
  const [details, setDetails] = useState(false);

  useEffect(() => {
    getAll("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, [orders]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el1) => el1[0]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const ordersAfterPagingandSorting = () => {
    return stableSort(filterFn.fn(orders), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const addOne = (url, recordsObj) => {
    registerOne(url, recordsObj);
    setTimeout(() => {
      setOpenPopup(false);
    }, 1500);
    getAll("/api/orders").then((response) => {
      setOrders(response.data);
    });
  };

  const editOne = (url, recodrObj) => {
    updateOne(url, recodrObj);
    setTimeout(() => {
      setOpenPopup(false);
    }, 1500);
    setRecordForEdit(null);
    getAll("/api/orders").then((response) => {
      setOrders(response.data);
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
    setRedOnly(false);
  };

  const openDetailsPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
    setRedOnly(true);
    //setDetails(true);
  };

  const deleteOrder = (url) => {
    deleteOne(url);
    getAll("/api/orders").then((response) => {
      setOrders(response.data);
    });
  };

  const statusList = [
    { id: "received", title: "Приета" },
    { id: "wip", title: "Изпълнява се" },
    { id: "completed", title: "Изпълнена" },
  ];

  const getStatusNameById = (statusId) => {
    for (const element of statusList) {
      if (element.id === statusId) return element.title;
    }
  };

  const handleSearch = (e) => {
    const target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              getStatusNameById(x.status)
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.exitDate.includes(target.value)
          );
      },
    });
  };
  return (
    <div>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Търсене"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            className={classes.newButton}
            text="Добави"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
              setRedOnly(false);
            }}
          />
        </Toolbar>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.disableSorting ? (
                    headCell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      onClick={() => {
                        handleSortRequest(headCell.id);
                      }}
                      direction={orderBy === headCell.id ? order : "asc"}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersAfterPagingandSorting().map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>{getStatusNameById(item.status)}</TableCell>
                <TableCell>
                  {format(new Date(item.exitDate), "eeee dd MMM yy", {
                    locale: deLocale,
                  })}
                </TableCell>
                <TableCell>{item.cakeName}</TableCell>
                <TableCell>{item.customerFirstName}</TableCell>
                <TableCell>{item.customerLastName}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openDetailsPopup(item);
                    }}
                  >
                    <MoreHorizOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      deleteOrder(`/api/orders/order/${item._id}`);
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={orders.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Поръчки">
        <OrdersForm
          recordForEdit={recordForEdit}
          editOne={editOne}
          addOne={addOne}
          readOnly={readOnly}
          statusList={statusList}
        />
      </Popup>
    </div>
  );
};

export default Orders;
