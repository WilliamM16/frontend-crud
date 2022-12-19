import { Link } from "react-router-dom";

const TaskView = (props) => {
  const { task } = props;
  let {deleteTask} = props;
  return (
    <div>
      <h1>{task.title}</h1>
      <div>{task.description + " " + task.prioritylevel + " " + task.completionstatus}</div>
      {task.employee ? <h3><Link to ={`/employee/${task.employee.id}`}>{task.employee.firstname + " " + task.employee.lastname}</Link></h3>: <h3>unassigned</h3>}
      <br/>
      <Link to={`/edittask/${task.id}`}>Edit task information</Link>
      <br/>
      <Link to={`/tasks`}>View all tasks</Link>
    </div>
  );

};

export default TaskView;