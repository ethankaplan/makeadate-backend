const express = require('express');
const router = express.Router();

const User = require('../models/User')




router.post('/createDate/:id', async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.params.id)
    const foundUser=await User.findById(req.params.id)
    foundUser.dates.push(req.body)
  } catch(err) {
    res.json({err})
  }
});

router.get('/getall', async (req, res) => {
  try {
    const user = await User.find({})
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});


router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method user'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method user'});
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.json({err});
    } else {
      res.json({
        success: true,
        message: "logged out!"
      });
    }
  })
 })

router.post('/login', async (req, res) => {
  console.log('hit')
  try {
    const foundUser = await User.findOne({username: req.body.username})
    res.json({
      user: foundUser,
      success: foundUser? true : false
    })
  } catch(err) {
    res.json({err})
  }
})
router.get('/view/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});

module.exports = router;
