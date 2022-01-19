const {User} = require('../model/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin, 
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.get('/:id',async(req,res)=>{
    const userlist = await User.findbyId(req.params.id);
    if (!userlist)
        res.status(400).json({error : true,data:"there is no user"})
    res.status(200).json(userlist)
});

router.get('/',async(req,res)=>{
    const userlist = await User.find();
    if (!userlist)
        res.status(400).json({error : true,data:"there is no user"})
    res.status(200).json(userlist)
});

module.exports = router;