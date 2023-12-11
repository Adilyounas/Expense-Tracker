//todo  <---------------------------- Sensitive   -------------------------->

//todo  <---------------------------------------------------->

//todo  <------------------------  QUICK ACCESS RADIOS   ---------------------------->

const activeRadioSelectionHandler = (
  event,
  dispatch,
  filtered_IncomeAndExpenseArr,
  setActiveRadioValue,
  modifiedData,
  allTransaction_IncomeAndExpenseArr
) => {
  const { value } = event.target;

  if (value) {
    setActiveRadioValue(value);
  }

  switch (value) {
    case "all":
      break;

    case "yesterday":
      const yesterdayData = filtered_IncomeAndExpenseArr.map((month) => ({
        ...month,
        transactions: month.transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.dateAndTime);
          const currentDate = new Date();

          return (
            currentDate.getFullYear() === transactionDate.getFullYear() &&
            currentDate.getMonth() === transactionDate.getMonth() &&
            currentDate.getDate() - 1 === transactionDate.getDate()
          );
        }),
      }));

      dispatch(modifiedData(yesterdayData));

      break;

    case "thisMonth":
      const thisMonthData = filtered_IncomeAndExpenseArr.map((month) => ({
        ...month,
        transactions: month.transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.dateAndTime);
          const currentDate = new Date();

          return (
            currentDate.getFullYear() === transactionDate.getFullYear() &&
            currentDate.getMonth() === transactionDate.getMonth() &&
            currentDate.getMonth() === transactionDate.getMonth()
          );
        }),
      }));

      dispatch(modifiedData(thisMonthData));

      break;

    case "today":
      const today = filtered_IncomeAndExpenseArr.map((month) => ({
        ...month,
        transactions: month.transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.dateAndTime);
          const currentDate = new Date();

          return (
            currentDate.getFullYear() === transactionDate.getFullYear() &&
            currentDate.getMonth() === transactionDate.getMonth() &&
            currentDate.getDay() === transactionDate.getDay()
          );
        }),
      }));

      dispatch(modifiedData(today));

      break;

    case "lastWeek":
      const lastWeek = filtered_IncomeAndExpenseArr.map((month) => ({
        ...month,
        transactions: month.transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.dateAndTime);
          const current = new Date();
          const currentDay = current.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

          //Reach currunt monday of the week
          const daysToMonday = currentDay === 0 ? 1 : currentDay - 1;

          const mondayDate = new Date();
          mondayDate.setDate(current.getDate() - daysToMonday);

          // Calculate the date of the Sunday (end of the week) of the current week
          const sundayDate = new Date();
          sundayDate.setDate(mondayDate.getDate() + 6);

          //todo <-----------------------------------  creating last week data ---------------------------------->

          const lastWeekMonday = new Date(mondayDate);
          lastWeekMonday.setDate(mondayDate.getDate() - 7);

          const lastWeekSunday = new Date(sundayDate);
          lastWeekSunday.setDate(sundayDate.getDate() - 7);

          return (
            transactionDate >= lastWeekMonday &&
            transactionDate <= lastWeekSunday
          );
        }),
      }));

      dispatch(modifiedData(lastWeek));

      break;

    case "lastMonth":
      const lastMonth = filtered_IncomeAndExpenseArr.map((month) => ({
        ...month,
        transactions: month.transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.dateAndTime);
          const current = new Date();
          const currentMonth = current.getMonth(); // 0 for January, 1 for February, ..., 11 for December

          // Calculate the first day of the current month
          const firstDayOfCurrentMonth = new Date(
            current.getFullYear(),
            currentMonth,
            1
          );

          // Calculate the last day of the last month
          const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth);
          lastDayOfLastMonth.setDate(firstDayOfCurrentMonth.getDate() - 1); //firstDay of currunt month - 1 = lastday of last month

          const firstDayOfLastMonth = new Date(
            current.getFullYear(),
            currentMonth - 1,
            1
          );

          return (
            transactionDate >= firstDayOfLastMonth &&
            transactionDate <= lastDayOfLastMonth
          );
        }),
      }));

      dispatch(modifiedData(lastMonth));

      break;

    default:
      break;
  }
};

//TODO <--------------------------------------------------->
export const incomeAndExpensOnChangeHandler = (
  event,
  dispatch,
  filtered_IncomeAndExpenseArr,
  setIncomeAndExpenseRadio,
  modifiedData,
  allTransaction_IncomeAndExpenseArr
) => {
  const { value } = event.target;

  if (value) {
    setIncomeAndExpenseRadio(value);
  }

  switch (value) {
    case "all":
      break;
    case "income":
      const incomeData = filtered_IncomeAndExpenseArr.map((month) => ({
        ...month,
        transactions: month.transactions.filter((transaction) => {
          return transaction.type === "Income";
        }),
      }));

      dispatch(modifiedData(incomeData));

      break;

    case "expense":
      const expenseData = filtered_IncomeAndExpenseArr.map((month) => ({
        ...month,
        transactions: month.transactions.filter((transaction) => {
          return transaction.type === "Expense";
        }),
      }));

      dispatch(modifiedData(expenseData));

      break;

    default:
      break;
  }
};
//TODO <-------------------------------------------------------------------------->

export const categoryRadioOnchangeHandler = (
  event,
  dispatch,
  filtered_IncomeAndExpenseArr,
  setCategorySectionRadio,
  modifiedData,
  allTransaction_IncomeAndExpenseArr
) => {
  const { value } = event.target;
  if (value) {
    setCategorySectionRadio(value);

    const matchedCategory = filtered_IncomeAndExpenseArr.map((month) => ({
      ...month,
      transactions: month.transactions.filter((transaction) => {
        return transaction.category === value;
      }),
    }));

    dispatch(modifiedData(matchedCategory));
  }
};

//TODO <-------------------------------------------------------------------------->

export const paymentModeRadioOnchangeHandler = (
  event,
  dispatch,
  filtered_IncomeAndExpenseArr,
  setPaymentModeSectionRadio,
  modifiedData,
  allTransaction_IncomeAndExpenseArr
) => {
  const { value } = event.target;
  if (value) {
    setPaymentModeSectionRadio(value);

    const matchedPaymentMode = filtered_IncomeAndExpenseArr.map((month) => ({
      ...month,
      transactions: month.transactions.filter((transaction) => {
        return transaction.paymentMode === value;
      }),
    }));

    dispatch(modifiedData(matchedPaymentMode));
  }
};

//TODO <-------------------------------------------------------------------------->

export const resetValuesHandler = (
  dispatch,
  setActiveRadioValue,
  setDateAndTimeValueFrom,
  setDateAndTimeValueTo,
  setIncomeAndExpenseRadio,
  setCategorySectionRadio,
  setPaymentModeSectionRadio,
  resetFilterData_To_ApiFreshData_Reducer
) => {
  setActiveRadioValue("all");
  setDateAndTimeValueFrom(new Date());
  setDateAndTimeValueTo(new Date());
  setIncomeAndExpenseRadio("all");
  setCategorySectionRadio("all");
  setPaymentModeSectionRadio("all");
  dispatch(resetFilterData_To_ApiFreshData_Reducer());
};

//TODO <-------------------------------------------------------------------------->

export function checkAndModified(
  dispatch,
  modifiedData,
  dateAndTimeValueFrom,
  dateAndTimeValueTo,
  filtered_IncomeAndExpenseArr,
  allTransaction_IncomeAndExpenseArr
) {
  if (
    dateAndTimeValueFrom.getFullYear() === dateAndTimeValueTo.getFullYear() &&
    dateAndTimeValueFrom.getMonth() === dateAndTimeValueTo.getMonth() &&
    dateAndTimeValueFrom.getDate() === dateAndTimeValueTo.getDate() &&
    dateAndTimeValueFrom.getDay() === dateAndTimeValueTo.getDay() &&
    dateAndTimeValueFrom.getHours() === dateAndTimeValueTo.getHours() &&
    dateAndTimeValueFrom.getMinutes() === dateAndTimeValueTo.getMinutes() &&
    dateAndTimeValueFrom.getSeconds() === dateAndTimeValueTo.getSeconds() &&
    dateAndTimeValueFrom.getMilliseconds() ===
      dateAndTimeValueTo.getMilliseconds()
  ) {
    return;
  } else {
    const matchFrom_TO = filtered_IncomeAndExpenseArr.map((month) => ({
      ...month,
      transactions: month.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.dateAndTime);

        return (
          transactionDate >= dateAndTimeValueFrom &&
          transactionDate <= dateAndTimeValueTo
        );
      }),
    }));

    dispatch(modifiedData(matchFrom_TO));
  }
}

export default activeRadioSelectionHandler;
