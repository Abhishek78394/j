const express = require( "express"); 
const { isAuth } = require("../controller/isAuthnticate");
const router = express.Router();
const { get_task,updateTask_get, createGEt, create_salary, delete_salary, update_salary } = require( "../controller/salarie");

router.get("/create_Salariee",isAuth,createGEt)
router.post("/create_Salariee",isAuth,create_salary)
router.get("/showSalariee",isAuth,get_task)
router.get("/deleteSalariee/:id",isAuth,delete_salary)
router.get("/updateSalariee/:id",isAuth,  updateTask_get);
router.post("/updateSalariee/:id",isAuth,  update_salary);

module.exports = router