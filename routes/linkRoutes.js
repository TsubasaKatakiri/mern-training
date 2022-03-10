const {Router}=require('express');
const Link=require('../models/Link');
const auth=require('./../middleware/auth.middleware');
const config=require('config');
const shortId=require('shortid');
const router=Router();

router.post('/generate', auth, async (req, res)=>{
    try {
        const baseUrl=config.get('baseUrl');
        const {from}=req.body;

        const code=shortId.generate();

        const existing= await Link.findOne({from});
        if(existing) return res.status(200).json({link: existing});

        const to=baseUrl+'/t/'+code;
        const link=new Link({
            code, to, from, owner: req.user.userId
        });
        await link.save();
        return res.status(201).json({link});
    } catch (error) {
        res.status(500).json({message: "Something is wrong..."})
    }
})

router.get('/', auth, async (req, res)=>{
    try {
        const links=await Link.find({owner: req.user.userId});
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({message: "Something is wrong..."})
    } 
})

router.get('/:id', auth, async (req, res)=>{
    try {
        const link=await Link.findById(req.params.id);
        res.status(200).json(link);
    } catch (error) {
        res.status(500).json({message: "Something is wrong..."})
    }
})

module.exports=router;