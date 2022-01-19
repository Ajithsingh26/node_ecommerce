const express = require('express');
const router = express.Router();

const {Product} = require('../model/product');
const {Category} = require('../model/category');

router.get('/',async(req,res)=>{
    const productlist = await Product.find();
    if (!productlist)
        res.status(400).json({error : true,data:"there is no produt"})
    res.status(200).json(productlist)
});

router.get('/count',async(req,res)=>{
    const productCount = await Product.countDocuments()
    if (!productCount){
        res.status(400).json({error:true,data:"there is no produt"})}
    res.status(200).json({productcount : productCount})
});

router.post(`/`, async (req, res) =>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
})

router.delete('/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if (product){
            res.status(200).json({error:"false",data:"delected successfully"})
        }else{
            res.status(400).json({error:"true",data:"product not found"})
        }
    }).catch(err =>{
        res.send({success:false,error:err});
    })
})



module.exports = router