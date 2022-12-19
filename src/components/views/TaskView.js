import { Link } from "react-router-dom";

const TaskView = (props) => {
  const { task } = props;
  return (
    <div>
      <h1>{task.title}</h1>
      <div>{"Description: " + task.description}</div>
      <div>{"Priority Level: " + task.prioritylevel}</div>
      <div>{"Completion Status: " + task.completionstatus}</div>
      {task.employee ? <h3><Link to ={`/employee/${task.employee.id}`}>{"Assigned Employee: " + task.employee.firstname + " " + task.employee.lastname}</Link></h3>: <h3>unassigned</h3>}
      <br/>
      <Link to={`/edittask/${task.id}`}>Edit task information</Link>
      <br/>
      <br/>
      <Link to={`/tasks`}>View all tasks</Link>
    </div>
  );

};

export default TaskView;