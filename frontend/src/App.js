import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddIncome from "./Components/addIncomeAndExpense/AddIncome";
import AddExpense from "./Components/addIncomeAndExpense/AddExpense";
import AllTransitions from "./Components/All Transitions/AllTransitions";
import Login from "./Components/Login-register-forgot/Login";
import Register from "./Components/Login-register-forgot/Register";
import ForgotPassword from "./Components/Login-register-forgot/ForgotPassword";
import AddCategory from "./Components/Add Category/AddCategory";
import PaymentModes from "./Components/Payment Modes/PaymentModes";
import SetBudget from "./Components/Set Budget/SetBudget";
import Settings from "./Components/Setting/Setting";
import EditTransaction from "./Components/EditTransaction/EditTransaction";
import Report from "./Components/Report/Report";
import getUserDetails_Action from "./Redux/Actions/getUserData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestPassword from "./Components/Reset Password/RestPassword";
import KhataDashboard from "./Components/Khata Dashboard/KhataDashboard";
import SingleKhata from "./Components/Khata Dashboard/Single Khata/SingleKhata";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditUserKhata from "./Components/Khata Dashboard/Single Khata/EditUserKhata";
import MaineKuchKiya from "./Components/Khata Dashboard/Single Khata/MaineKuchKiya";

function App() {
  const dispatch = useDispatch();
  const { userFound } = useSelector((state) => state.GetUserData);

  useEffect(() => {
    dispatch(getUserDetails_Action(0));
  }, [dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!userFound ? <Login /> : <Dashboard />} />

          <Route
            path="/addIncome"
            element={!userFound ? <Login /> : <AddIncome />}
          />
          <Route
            path="/addExpense"
            element={!userFound ? <Login /> : <AddExpense />}
          />
          <Route
            path="/allTransitions"
            element={!userFound ? <Login /> : <AllTransitions />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<RestPassword />} />

          <Route
            path="/addCategory"
            element={!userFound ? <Login /> : <AddCategory />}
          />
          <Route
            path="/paymentModes"
            element={!userFound ? <Login /> : <PaymentModes />}
          />
          <Route
            path="/khata"
            element={!userFound ? <Login /> : <KhataDashboard />}
          />

          <Route
            path="/setBudget"
            element={!userFound ? <Login /> : <SetBudget />}
          />
          <Route
            path="/settings"
            element={!userFound ? <Login /> : <Settings />}
          />
          <Route
            path="/allTransitions/:id"
            element={!userFound ? <Login /> : <EditTransaction />}
          />
          <Route
            path="/reports"
            element={!userFound ? <Login /> : <Report />}
          />
          <Route
            path="/singleUser-complete-Khata/:id"
            element={!userFound ? <Login /> : <SingleKhata />}
          />

          <Route
            path="/editSingle-Khata/:id"
            element={!userFound ? <Login /> : <EditUserKhata />}
          />

          <Route
            path="/add-Khata/:id"
            element={!userFound ? <Login /> : <EditUserKhata />}
          />

          <Route
            path="/MAINE-DIEY/:id"
            element={!userFound ? <Login /> : <MaineKuchKiya />}
          />

          <Route
            path="/MAINE-LIYE/:id"
            element={!userFound ? <Login /> : <MaineKuchKiya />}
          />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
