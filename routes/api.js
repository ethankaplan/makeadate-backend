const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion')
const client = yelp.client(process.env.API_KEY);

router.get('/', (req, res) => {
  client.search({
    term:"Food",
    location:"Los Angeles, CA",})
    .then(response=>{
      const allRes=response.jsonBody.businesses;
      res.json({
        status:200,
        data:allRes
      })
      .catch(err=>{
        res.send(err)
      })
    })
  })


router.post('/', (req, res) => {
  return res.json({
    body: req.body
  });
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method'});
});

module.exports = router;
