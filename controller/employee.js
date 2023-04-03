const db = require("../models");
const Employess = db.employes;

const create_Employe = async (req, res) => {
  try {
    let employee = await Employess.findOne({ where: { email: req.body.email } })
    if (employee) {
      return res.status(501).json({ message: "user exists" });
    }
    Employess.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      address: req.body.address,
      base_salary: req.body.base_salary,
    });
    res.status(200).redirect('/showEmployee')
  } catch (error) {
    console.log(error)
  }
}

const get_Employee = async (req, res) => {
  try {
    let employess = await Employess.findAll({});
    const page = parseInt(req.query.page) || 1;
    console.log(page)
    const pageSize = 1;
    const totalRecords = employess.length; 
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRecords);
    console.log(startIndex, endIndex,totalPages)
    const employeesSubset = employess.slice(startIndex, endIndex);
    console.log(employeesSubset)
    res.status(200).render('showEmployee', { 
      employee: employeesSubset,
      currentPage: page,
      totalPages: totalPages,
      startIndex: startIndex,
      endIndex: endIndex })
  } catch (error) {
    console.log(error)
  }
}

const delete_emplpoyee = async (req, res) => {
  const id = req.params.id;
  try {
    const employees = await Employess.findByPk(id);
    if (!employees) {
      return res.status(404).json({ error: 'employees not found' });
    }
    await employees.destroy();
    res.status(204).redirect("/showEmployee")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

const updateEmployee_get = async (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  const employe = await Employess.findByPk(id).then((e) => {
    res.render("updateEmployee", { id: id, employe: e })
  }).catch(err => console.log(err))
}

const update_employee = async (req, res) => {
  const id = req.params.id;
  console.log(id ,"dsafghjk")
  try {
    const employe = await Employess.findByPk(id);
    if (!employe) {
      return res.status(404).json({ error: 'Product not found' });
    }
    employe.name = req.body.name
    employe.email = req.body.email
    employe.password = req.body.password
    employe.mobile = req.body.mobile
    employe.address = req.body.address
    employe.base_salary = req.body.base_salary
    await employe.save();
    res.redirect("/showEmployee")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}



module.exports = { create_Employe, get_Employee , delete_emplpoyee, update_employee , updateEmployee_get}