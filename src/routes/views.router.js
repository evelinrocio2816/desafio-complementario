const express = require("express")
const router = express.Router()
const fs = require('fs').promises;

 
router.get("/", async (req, res) => {
   res.render("chat",{title:"chat"})
  });



  
  router.get("/realtimeProducts",async (req,res)=>{
    res.render("realtimeProducts", {title:"realtimeProducts "})
  })

 module.exports = router;