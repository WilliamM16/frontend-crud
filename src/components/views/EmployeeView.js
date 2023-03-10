import { Link } from "react-router-dom";


const EmployeeView = (props) => {
  const {employee, editTask, allTasks} = props;
  let assignedTasks = allTasks.filter(task => task.employeeId===employee.id);
  let availableTasks = allTasks.filter(task => task.employeeId!==employee.id);
  
  return (
    <div>      
      <h1>{employee.firstname + ' ' + employee.lastname}</h1>
      <h3>{'Department: ' +employee.department}</h3>
      <Link to={`/editemployee/${employee.id}`}>Edit employee information</Link>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <div>Assigned tasks:
        {assignedTasks.map( task => {
          return (
            <div key={task.id}><h4>
            <Link to={`/task/${task.id}`}>
              <a>{task.description + " "}</a>
            </Link>
            <button onClick={() => editTask({id:task.id, employeeId: null})}>x</button>
            </h4>
            </div>
          );
        })}</div>
        <div>Available tasks:
        {availableTasks.map( task => {
          return (
            <div key={task.id}><h4>
            <Link to={`/task/${task.id}`}>
              <a>{task.description + " "}</a>
            </Link>
            <button onClick={() => editTask({id:task.id, employeeId: employee.id})}>+</button>
            </h4>
            </div>
          );
        })}</div>

      </div>

  
    </div>
  );

};

export default EmployeeView;