import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk  } from '../../store/thunks';


class EditTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          description: "", 
          prioritylevel: "",
          completionstatus: "",
          employeeId: null, 
          error: ""
        };
    }

    componentDidMount() {
        //getting task ID from url
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchEmployees();
        this.setState({
            description: this.props.task.description, 
            prioritylevel: this.props.task.prioritylevel,
            completionstatus: this.props.task.completionstatus,
            employeeId: this.props.task.employeeId, 
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSelectChange = event => {
      //handle change for the dropdown menu
      //want to set the employeeId based on the selected choice
      //when the form gets submitted, this is how we can change
      //assigned employee without having to manually enter in the 
      //employeeId like before
      if (event.target.value === "unassigned") {
        this.setState({employeeId:null});
      } else {
        this.setState({employeeId: event.target.value})
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.description === "") {
          this.setState({error: "Error: description cannot be empty"});
          return;
        }

        //get new info for task from form input
        let task = {
            id: this.props.task.id,
            description: this.state.description,
            prioritylevel: this.state.prioritylevel,
            completionstatus: this.state.completionstatus,
            employeeId: this.state.employeeId
        };
        
        this.props.editTask(task);

        this.setState({
          redirect: true, 
          redirectId: this.props.task.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { task, allEmployees, editTask, fetchTask} = this.props;
        let assignedEmployee = task.employeeId;

        let otherEmployees = allEmployees.filter(employee => employee.id!==assignedEmployee);
      
        //go to single task view of the edited task
        if(this.state.redirect) {
          return (<Redirect to={`/task/${this.state.redirectId}`}/>)
        }

        return (
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
            <input type="text" name="description" value={this.state.description || ''} placeholder={task.description} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>PriorityLevel: </label>
            <input type="text" name="prioritylevel" value={this.state.prioritylevel || ''} placeholder={task.prioritylevel} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>CompletionStatus: </label>
            <input type="text" name="completionstatus" value={this.state.completionstatus || ''} placeholder={task.completionstatus} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Assign Employee: </label>
            <select onChange={(e) => this.handleSelectChange(e)}>
              {task.employee!==null ?
                <option value={task.employeeId}>{task.employee.firstname+" (current)"}</option>
              : <option value="unassigned">Unassigned</option>
              }
              {otherEmployees.map(employee => {
                return (
                  <option value={employee.id} key={employee.id}>{employee.firstname}</option>
                )
              })}
              {task.employee!==null && <option value="unassigned">Unassigned</option>}
            </select>
  
            <button type="submit">
              Submit
            </button>

          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          {task.employeeId !== null ?
            <div> Current employee:  
            <Link to={`/employee/${task.employeeId}`}>{task.employee.firstname}</Link>
            </div>
            : <div> No Employee currently assigned </div>
          }          
        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      task: state.task,
      allEmployees: state.allEmployees
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editTask: (task) => dispatch(editTaskThunk(task)),
        fetchTask: (id) => dispatch(fetchTaskThunk(id)),
        fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditTaskContainer);