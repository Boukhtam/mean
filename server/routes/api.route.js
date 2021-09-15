const express = require('express');

const router = express.Router();
module.exports = router;

router.get('/data', (req, res) => {
  const { query } = req
  console.log("Query", query.month)
  if (query.month === "all") {
    return res.json([
      {date: '12-05-2020', energy: 1232},
      {date: '13-05-2020', energy: 3234},
      {date: '14-05-2020', energy: 4443},
      {date: '15-05-2020', energy: 3243},
    ])
  } else {
    return res.json([
      {date: '15-05-2020', energy: 3243},
      {date: '14-05-2020', energy: 4443},
      {date: '13-05-2020', energy: 3234},
      {date: '12-05-2020', energy: 1232},
    ])
  }


})
