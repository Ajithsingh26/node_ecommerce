const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const {Category} = require('../model/category');


router.get('/',async(req,res)=>{
    const categorylist = await Category.find();
    if(categorylist){
        res.status(200).json({error:false,data:categorylist})
    }
    res.status(200).json({error:true,data:"the category not found"})
})

router.get('/:id',async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(category){
        res.status(200).json({error:false,data:category})
    }
    res.status(200).json({error:true,data:"the category not found"})
    

    res.status(200).json(categorylist)
});

router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

router.put('/:id', async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send('Invalid id')
    category = await Category.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color   
        },{new:true})

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

router.delete('/:id',(req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if (category){
            res.status(200).json({error:"false",data:"delected successfully"})
        }else{
            res.status(400).json({error:"true",data:"category not found"})
        }
    }).catch(err =>{
        res.send({success:false,error:err});
    })
})

module.exports = router;