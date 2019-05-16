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

  router.get('/l_:loc/a_:act', (req, res) => {
    client.search({
      term:req.params.act,
      location:req.params.loc,
      radius:1200,
      sort_by:"rating",
      limit:5,

    })
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

    router.get('/l_:loc/c_:cui', (req, res) => {
      client.search({
        term:req.params.cui,
        location:req.params.loc,
        radius:1200,
        sort_by:"rating",
        limit:5,})
        .then(response=>{
          const allRes=response.jsonBody.businesses;
          res.json({
            status:200,
            data:allRes,
            
          })
          .catch(err=>{
            res.send(err)
          })
        })
      })
      
      router.get('/buildresults',(req,res)=>{
        

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
