import './App.css';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import { SignInPage } from '../Pages/LoginPage/SignInPage'
import { ForgotPasswordPage } from '../Pages/ForgotPasswordPage/ForgotPasswordPage'
import { HomePage } from '../Pages/HomePage/HomePage'
import  ResetPasswordPage  from '../Pages/ResetPasswordPage/ResetPasswordPage.jsx'
import MiniDrawer from '../Pages/HomePage/Main';


const useStyles = makeStyles({
  button: {
    width: '100%'
  },
});

function App() {

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.appMain}>
        <Switch>
          <Route exact path='/' element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route exact path='/login' element={<SignInPage />} />
          <Route exact path='/forgotpassword' element={<ForgotPasswordPage />} />
          <Route exact path='/passwordreset/:resetToken' element={<ResetPasswordPage />} />
          <Route path='*' element={<HomePage />} />
        </Switch>
      </div>
      <CssBaseline />
    </ Router>
  );
}

export default App;
