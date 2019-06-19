const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const Date = require('../models/Date')




router.get('/getall', async (req, res) => {
  try {
    const users = await User.find({})
    res.json({
      data:users
    })
  } catch(err) {
    res.json({err})
  }
});


router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    const password = await user.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    user.password=passwordHash;
    user.save()
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

//going to fix needing to pass id with session
router.delete('/delete/:id/:date', async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.dates.splice(req.params.date, 1);
    user.save();
    console.log(user);
    res.json({ user, success: true });
  } catch (err) {
    console.log(err);
  }
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
    const user = await User.findOne({username: req.body.username})
    
    if(bcrypt.compareSync(req.body.password, user.password)){
      
      res.json({
        user,
        success: user? true : false,
        message:"Success!"
      })
    }else{
      res.json({err,
        message:"Bad login"})
    }
    
  } catch(err) {
    
    
    res.json({err,
    message:"Bad login"})
  }
})




router.get('/view/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("dates")
    
    res.json({
      user
    })
  } catch(err) {
    res.json({err})
  }
});




module.exports = router;
