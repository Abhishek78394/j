const db = require("../models");
const salaries = db.salaries
const employes = db.employes


const createGEt = async (req, res) => {
  try {
    let employe = await employes.findAll({});
    res.status(200).render("create_Salariee", { employes: employe })
  } catch (error) {
    console.log(error)
  }
}

const create_salary = async (req, res) => {
  try {
    month = req.body.month,
    employee_id = req.body.employes
    year = req.body.year
    total_working_days = req.body.total_working_days
    total_leave_taken = req.body.total_leave_taken
    overtime = req.body.overtime
 const salary=  await salaries.findAll({})
salary.forEach(e => {
 if(e.employee_id == employee_id){
  if(e.year==year){
  if(e.month==month){
    return res.status(501).json({ message: "Salary already processed for this selected month" });
  }
 }
}
});
    const task = await salaries.create({ employee_id, month,year ,total_working_days ,total_leave_taken,   overtime});
    res.status(200).redirect("shoWSalariee")
  
  } catch (error) {
    console.log(error)
  }
}

const get_task = async (req, res) => {
  try {
    const data = await salaries.findAll({
      include: [{ model: employes }]
    }).then(async (e) => {
  
      const salarie = e.map((data) => {
        return data
      })

      const page = parseInt(req.query.page) || 1;
      const pageSize = 2;
      const totalRecords = salarie.length; 
      const totalPages = Math.ceil(totalRecords / pageSize);
      const startIndex = (page - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalRecords);
      console.log(startIndex, endIndex,totalPages)
      const salarieSubset = salarie.slice(startIndex, endIndex);
      console.log(salarieSubset)
      res.status(200).render("showSalariee", { salaries: salarieSubset,
        currentPage: page,
        totalPages: totalPages,
        startIndex: startIndex,
        endIndex: endIndex })
    })
  } catch (error) {
    console.log(error)
  }
}

const delete_salary = async (req, res) => {
  const employeId = req.params.id;
  try {
    const salary = await salaries.findByPk(employeId);
    if (!salary) {
      return res.status(404).json({ error: 'salary not found' });
    }
    await salary.destroy();
    res.status(204).redirect("/showSalariee")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

const update_salary = async (req, res) => {
  try {
    const employeId = req.params.id
    const salary = await salaries.findByPk(employeId);
    if (!salary) {
      return res.status(404).json({ error: 'salary not found' });
    }
    salary.month = req.body.month,
    salary.employee_id = req.body.employes
    salary.year = req.body.year
    salary.total_working_days = req.body.total_working_days
    salary.total_leave_taken = req.body.total_leave_taken
    salary.overtime = req.body.overtime
    await salary.save()
    res.redirect('/showSalariee')
  } catch (error) {
    console.log("object")
  }
}

const updateTask_get = async (req, res) => {
  const id = req.params.id;
  const salary = await salaries.findByPk(id)
  const employId = salary.employee_id
  let employ = await employes.findByPk(employId)
  res.render("updateSalary", { id: id, employ: employ, salary: salary })
}


module.exports = { updateTask_get, create_salary, get_task, createGEt, delete_salary,  update_salary}

