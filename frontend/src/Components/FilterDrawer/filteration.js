//todo  <---------------------------- Sensitive   -------------------------->

//todo  <---------------------------------------------------->
let filteredData = [];

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
      filteredData = [];

      allTransaction_IncomeAndExpenseArr.forEach((month) => {
        month.data.forEach((transaction) => {
          // setFilteredData((old) => [...old, ele]);
          filteredData.push(transaction);
        });
      });

      dispatch(modifiedData(filteredData));

      break;
    case "yesterday":
      filteredData = [];

      allTransaction_IncomeAndExpenseArr.forEach((month) => {
        month.data.forEach((transaction) => {
          const transactionDate = new Date(transaction.dateAndTime);
          const currentDate = new Date();
          if (
            currentDate.getFullYear() === transactionDate.getFullYear() &&
            currentDate.getMonth() === transactionDate.getMonth() &&
            currentDate.getDate() - 1 === transactionDate.getDate()
          ) {
            //   setFilteredData((old) => [...old, transaction]);
            filteredData.push(transaction);
          }
        });
      });

      dispatch(modifiedData(filteredData));

      break;

    case "thisMonth":
      filteredData = [];

      allTransaction_IncomeAndExpenseArr.forEach((month) => {
        month.data.forEach((transaction) => {
          const transactionDate = new Date(transaction.dateAndTime);
          const currentDate = new Date();
          if (
            currentDate.getFullYear() === transactionDate.getFullYear() &&
            currentDate.getMonth() === transactionDate.getMonth() &&
            currentDate.getMonth() === transactionDate.getMonth()
          ) {
            //   setFilteredData((old) => [...old, transaction]);
            filteredData.push(transaction);
          }
        });
      });

      dispatch(modifiedData(filteredData));

      break;

    case "today":
      filteredData = [];

      allTransaction_IncomeAndExpenseArr.forEach((month) => {
        month.data.forEach((transaction) => {
          const transactionDate = new Date(transaction.dateAndTime);
          const currentDate = new Date();
          if (
            currentDate.getFullYear() === transactionDate.getFullYear() &&
            currentDate.getMonth() === transactionDate.getMonth() &&
            currentDate.getDay() === transactionDate.getDay()
          ) {
            //   setFilteredData((old) => [...old, transaction]);
            filteredData.push(transaction);
          }
        });
      });

      dispatch(modifiedData(filteredData));

      break;

    case "lastWeek":
      filteredData = [];

      allTransaction_IncomeAndExpenseArr.forEach((month) => {
        month.data.forEach((transaction) => {
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

          if (
            transactionDate >= lastWeekMonday &&
            transactionDate <= lastWeekSunday
          ) {
            //   setFilteredData((old) => [...old, transaction]);
            filteredData.push(transaction);
          }
        });
      });

      dispatch(modifiedData(filteredData));

      break;

    case "lastMonth":
      filteredData = [];

      allTransaction_IncomeAndExpenseArr.forEach((month) => {
        month.data.forEach((transaction) => {
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

          // Check if the transaction occurred within the last month
          if (
            transactionDate >= firstDayOfLastMonth &&
            transactionDate <= lastDayOfLastMonth
          ) {
            //   setFilteredData((old) => [...old, transaction]);
            filteredData.push(transaction);
          }
        });
      });

      dispatch(modifiedData(filteredData));

      break;

    default:
      break;
  }
};

//TODO <-----------------------    SETTING DATE FROM - TO  ------------------------>

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
    let dateFilterData = [];
    allTransaction_IncomeAndExpenseArr.forEach((month) => {
      month.data.forEach((transaction) => {
        const transactionDate = new Date(transaction.dateAndTime);
        if (
          transactionDate >= dateAndTimeValueFrom &&
          transactionDate <= dateAndTimeValueTo
        ) {
          dateFilterData.push(transaction);
        }
      });
    });

    dispatch(modifiedData(dateFilterData));
  }
}

export default activeRadioSelectionHandler;