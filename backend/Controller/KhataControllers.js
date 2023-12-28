const UserKhata = require("../Models/khata");
const mongoose = require("mongoose");
// <----------------   Add customer / add khata ---------------->
const addCustomer = async (req, res) => {
  try {
    const khata = await UserKhata.create(req.body);
    if (!khata) {
      return res.status(500).json({
        success: false,
        message: "Add Customer Failed",
      });
    }

    res.status(201).json({
      success: true,
      message: "Customer Khata Add Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// <----------------   GET ALL USERS KHATAS ---------------->

const getAllKhatas = async (req, res) => {
  try {
    const khatas = await UserKhata.find();
    if (!khatas) {
      return res.status(500).json({
        success: false,
        message: "Khatas Not Found",
      });
    }

    res.status(200).json({
      success: true,
      khatas: khatas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// <----------------   GET SINGLE USER KHATA ---------------->
const getSingleUserKhata = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json({
        success: false,
        message: `Id:${id} not Found`,
      });
    }

    const singleUserKhata = await UserKhata.findOne({ _id: id });
    if (!singleUserKhata) {
      return res.status(500).json({
        success: false,
        message: "Khata Not Found",
      });
    }

    res.status(200).json({
      success: true,
      singleUserKhata: singleUserKhata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// <----------------   GET SINGLE USER KHATA TRANSACTION---------------->
const getSingleUserKhataOneTransaction = async (req, res) => {
  try {
    const { khataId } = req.params;
    const { id } = req.query;

    if (!khataId) {
      return res.status(500).json({
        success: false,
        message: `Id:${khataId} not Found`,
      });
    }

    if (!id) {
      return res.status(500).json({
        success: false,
        message: `Id:${id} not Found`,
      });
    }

    const singleUserKhata = await UserKhata.findOne({ _id: khataId });
    if (!singleUserKhata) {
      return res.status(500).json({
        success: false,
        message: "Khata Not Found",
      });
    }

    // Convert id to ObjectId
    const transactionId = new mongoose.Types.ObjectId(id);

    const singleKhataTransaction = singleUserKhata.khataData.find(
      (transaction) => transaction._id.equals(transactionId)
    );

    res.status(200).json({
      success: true,
      singleKhataTransaction: singleKhataTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// <----------------   GET SINGLE USER KHATA TRANSACTION UPDATE---------------->
const getSingleUserKhataOneTransaction_UPDATE = async (req, res) => {
  try {
    const { khataId } = req.params;
    const { id } = req.query;

    const { amountVal, checkedVal, selectedDate } = req.body;

    if (!amountVal || !checkedVal || !selectedDate) {
      return res.status(500).json({
        success: false,
        message: `Give All Values Values are missing in req.body`,
      });
    }

    if (!khataId) {
      return res.status(500).json({
        success: false,
        message: `Id:${khataId} not Found`,
      });
    }

    if (!id) {
      return res.status(500).json({
        success: false,
        message: `Id:${id} not Found`,
      });
    }

    const singleUserKhata = await UserKhata.findOne({ _id: khataId });
    if (!singleUserKhata) {
      return res.status(500).json({
        success: false,
        message: "Khata Not Found",
      });
    }

   singleUserKhata.mainPriority= new Date().getTime()

    const transactionId = new mongoose.Types.ObjectId(id);

    const singleKhataTransactionIndex = singleUserKhata.khataData.findIndex(
      (transaction) => transaction._id.equals(transactionId)
    );

    if (singleKhataTransactionIndex === -1) {
      return res.status(500).json({
        success: false,
        message: "Transaction Not Found",
      });
    }

    singleUserKhata.khataData[singleKhataTransactionIndex].amount = amountVal;
    singleUserKhata.khataData[singleKhataTransactionIndex].type = checkedVal;
    singleUserKhata.khataData[singleKhataTransactionIndex].transactionDate =
      selectedDate;
    singleUserKhata.khataData[
      singleKhataTransactionIndex
    ].transactionKhataPriority = new Date().getTime();

    await singleUserKhata.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Transaction Updated ✔",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// <----------------   GET SINGLE USER KHATA TRANSACTION UPDATE---------------->
const getSingleUserKhataOneTransaction_DELETE = async (req, res) => {
  try {
    const { khataId } = req.params;
    const { id } = req.query;

    if (!khataId) {
      return res.status(500).json({
        success: false,
        message: `Id:${khataId} not Found`,
      });
    }

    if (!id) {
      return res.status(500).json({
        success: false,
        message: `Id:${id} not Found`,
      });
    }

    const singleUserKhata = await UserKhata.findOne({ _id: khataId });
    if (!singleUserKhata) {
      return res.status(500).json({
        success: false,
        message: "Khata Not Found",
      });
    }

    const transactionId = new mongoose.Types.ObjectId(id);

    const singleKhataTransactionIndex = singleUserKhata.khataData.findIndex(
      (transaction) => transaction._id.equals(transactionId)
    );

    if (singleKhataTransactionIndex === -1) {
      return res.status(500).json({
        success: false,
        message: "Transaction Not Found",
      });
    }

    singleUserKhata.khataData.splice(singleKhataTransactionIndex, 1);

    await singleUserKhata.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Transaction Deleted Successfully ✔",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteOneUserKhata = async (req, res) => {
  try {
    const { khataId } = req.params;

    if (!khataId) {
      return res.status(500).json({
        success: false,
        message: `Id:${khataId} not Found`,
      });
    }

    const deletedKhata = await UserKhata.findOneAndDelete({ _id: khataId });

    if (!deletedKhata) {
      return res.status(500).json({
        success: false,
        message: "Khata Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Khata Deleted Successfully ✔",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// <----------------   ADD TRANSACTION IN KHATA  ---------------->
const addTransactionInKhtata = async (req, res) => {
  try {
    const { khataId } = req.params;
    const { type, amount, transactionDate } = req.body;

    if (!khataId) {
      return res.status(500).json({
        success: false,
        message: `Id:${khataId} not Found`,
      });
    }

    if (!type || Number.isNaN(Number(amount)) || !transactionDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing values in the request body",
      });
    }

    const singleKhata = await UserKhata.findOne({ _id: khataId });

    if (!singleKhata) {
      return res.status(500).json({
        success: false,
        message: "Khata Not Found",
      });
    }

    singleKhata.mainPriority = new Date().getTime()

    const obj = {
      type,
      amount,
      transactionDate
    };

    singleKhata.khataData.push(obj);
    await singleKhata.save();

    res.status(201).json({
      success: true,
      message: `Added Sucessfully ✔`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//todo <------------------- wasoli & wasoli Date ------------------>


const setWasoliController = async (req, res) => {
  try {
    const { khataId } = req.params;
    const { wasoliBooleanVal, selectedDate} = req.body;


    if (!khataId) {
      return res.status(500).json({
        success: false,
        message: `Id:${khataId} not Found`,
      });
    }

    if (!wasoliBooleanVal || !selectedDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing values in the request body",
      });
    }

    const singleKhata = await UserKhata.findOne({ _id: khataId });

    if (!singleKhata) {
      return res.status(500).json({
        success: false,
        message: "Khata Not Found",
      });
    }

    singleKhata.wasoli = wasoliBooleanVal
    singleKhata.wasoliDate = selectedDate


    
    await singleKhata.save();

    res.status(201).json({
      success: true,
      message: `Wasoli Date Setted ✔`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const setWasoliUndefinedController = async (req, res) => {
  try {
    const { khataId } = req.params;
    const { wasoliBooleanVal, selectedDate} = req.body;


    if (!khataId) {
      return res.status(500).json({
        success: false,
        message: `Id:${khataId} not Found`,
      });
    }

    if (wasoliBooleanVal !==undefined  || selectedDate !==undefined) {
      return res.status(400).json({
        success: false,
        message: "Data you send is not undefined",
      });
    }

    const singleKhata = await UserKhata.findOne({ _id: khataId });

    if (!singleKhata) {
      return res.status(500).json({
        success: false,
        message: "Khata Not Found",
      });
    }

    singleKhata.wasoli = wasoliBooleanVal
    singleKhata.wasoliDate = selectedDate


    
    await singleKhata.save();

    res.status(201).json({
      success: true,
      message: `"${singleKhata.name}" Marked As Read`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};








module.exports = {
  addCustomer,
  getAllKhatas,
  getSingleUserKhata,
  getSingleUserKhataOneTransaction,
  getSingleUserKhataOneTransaction_UPDATE,
  getSingleUserKhataOneTransaction_DELETE,
  deleteOneUserKhata,
  addTransactionInKhtata,
  setWasoliController,
  setWasoliUndefinedController
};
