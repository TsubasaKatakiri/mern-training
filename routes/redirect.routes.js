const {Router}=require('express');
const Link=require('../models/Link');
const router=Router();

router.get('/:code', async(req, res)=>{
    try {
        const link=await Link.findOne({code: req.params.code});
        if(link){
            link.clicks++;
            await link.save();
            res.redirect(301, link.from);
        }
        else res.status(404).json({message: "Link is not found"})
    } catch (error) {
        res.status(500).json({message: "Something is wrong..."})
    }
})

module.exports=router;