const express = require('express');
const moment = require("moment");
const RecordModel = require("../models/record.model");

const router = express.Router();
module.exports = router;

router.get('/data', async (req, res) => {
  const { query } = req

  console.log("Query", typeof query.year)

  try {
    var records, pipeline;


    if (query.month === "all") {
      // group by month
      pipeline = [
        {
          $match: { $expr: { $eq: [{ "$year": "$date" }, parseFloat(query.year)] } },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m", date: "$date"  },
            },
            docs: { $push: "$$ROOT" },
          }
        },
        {
          $addFields: { energyPerday: { $sum: "$docs.energy" } }
        },
      ]

    } else {
      // group by day
      var month = parseFloat(moment(query.month, "MMM").format("M"))
      var year = parseFloat(query.year)
      pipeline = [
        {
          $match: 
          { 
            $expr: {
              $and: [
                { $eq: [{ "$year": "$date" }, year] },
                { $eq: [{ "$month": "$date" }, month] },
              ]
            }
          },
        },

        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$date"  },
            },
            docs: { $push: "$$ROOT" },
          }
        },
        {
          $addFields: { energyPerday: { $sum: "$docs.energy" } }
        },
      ]

    }

    records = await RecordModel.aggregate(pipeline);
    return res.json(records);
  } catch (e) {
    console.log(e)
    res.json([]);
  }


})
