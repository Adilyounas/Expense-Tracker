const category = [
    {
      id: 1,
      name: "accounting",
      value: "Accounting",
    },
    {
      id: 2,
      name: "advertising",
      value: "Advertising",
    },
    {
      id: 3,
      name: "clothing",
      value: "Clothing",
    },
    {
      id: 4,
      name: "drings",
      value: "Drings",
    },

    {
      id: 5,
      name: "education",
      value: "Education",
    },

    {
      id: 6,
      name: "food",
      value: "Food",
    },

    {
      id: 7,
      name: "fuel",
      value: "Fuel",
    },
    {
      id: 8,
      name: "fun",
      value: "Fun",
    },
    {
      id: 10,
      name: "hospital",
      value: "Hospital",
    },
    {
      id: 11,
      name: "hotel",
      value: "Hotel",
    },
    {
      id: 12,
      name: "insurance",
      value: "Insurance",
    },
    {
      id: 13,
      name: "loan",
      value: "Loan",
    },
    {
      id: 14,
      name: "maintenance",
      value: "Maintenance",
    },
    {
      id: 15,
      name: "medical",
      value: "Medical",
    },
    {
      id: 16,
      name: "movie",
      value: "Movie",
    },
    {
      id: 17,
      name: "other",
      value: "Other",
    },
    {
      id: 18,
      name: "personal",
      value: "Personal",
    },
    {
      id: 19,
      name: "shopping",
      value: "Shopping",
    },
    {
      id: 20,
      name: "garments",
      value: "Garments",
    },
  ];



    // <--------------- Slice will give you shallow copy
  const sortedCategory = category.slice().sort((a, b) =>
    a.name.localeCompare(b.name)
  );


  export default sortedCategory