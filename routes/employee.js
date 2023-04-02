const express = require( "express"); 
const { isAuth } = require("../controller/isAuthnticate");
const router = express.Router();
const { create_Employe, get_Employee, delete_emplpoyee, update_employee, updateEmployee_get,  } = require( "../controller/employee");

router.post ("/createEmployee",isAuth,create_Employe)
router.get ("/createEmployee",isAuth,(req,res)=>{res.render("create_Employe")})
router.get ("/showEmployee",isAuth,get_Employee)
router.get ("/deleteemployee/:id",isAuth,delete_emplpoyee)
router.post ("/updateEmployee/:id",isAuth,update_employee)
router.get ("/updateEmployee/:id",isAuth,updateEmployee_get)

module.exports = router