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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addIncome" element={<AddIncome />} />
        <Route path="/addExpense" element={<AddExpense />} />
        <Route path="/allTransitions" element={<AllTransitions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/paymentModes" element={<PaymentModes />} />
        <Route path="/setBudget" element={<SetBudget />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/allTransitions/:id" element={<EditTransaction />} />
        <Route path="/reports" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
