import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllEmployeesView = (props) => {
  let {deleteEmployee} = props; 
  if (!props.allEmployees.length) {
    return <div><p>There are no employees.</p>
    <Link to={`/newemployee`}>
        <button>Add New Employee</button>
      </Link>
    </div>;
  }

  return (
    <div>
      {props.allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id}><h1>
          <Link to={`/employee/${employee.id}`}>
            <a>{name + " "}</a>
          </Link>
          <button onClick={() => deleteEmployee(employee.id)}>X</button>
        </h1>
        </div>
        );
      })}
      <Link to={`/newemployee`}>
        <button>Add New Employee</button>
      </Link>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;