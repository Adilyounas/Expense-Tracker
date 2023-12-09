const paymentMethod = [
  {
    id: 1,
    name: "cash",
    value: "Cash",
  },
  {
    id: 2,
    name: "creditCard",
    value: "Credit Card",
  },
  {
    id: 3,
    name: "debitCard",
    value: "Debit Card",
  },
  {
    id: 4,
    name: "cheque",
    value: "Cheque",
  },
];

const paymentModeArr = paymentMethod
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

export default paymentModeArr;
