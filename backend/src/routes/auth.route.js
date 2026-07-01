import express from "express";

const router = express.Router();

router.get("/signup",(_req,res)=>{
    res.send("Signup endpoint")
})

router.get("/login",(_req,res)=>{
    res.send("login endpoint")
})

router.get("/logout",(_req,res)=>{
    res.send("logout endpoint")
})

export default router;
