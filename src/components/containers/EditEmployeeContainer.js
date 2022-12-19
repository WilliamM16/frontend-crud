import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchEmployeeThunk, editEmployeeThunk, fetchAllTasksThunk  } from '../../store/thunks';


/*
IMPORTANT: comments regarding implementation details!!
=====================================================
You'll see that we have two ways of interacting with the UI
in order to change the course's instructor

The dropdown menu is straighforward, it's pretty much the same 
as having the input field for the instructorId but allows us
to actually see the available insutrctors as well as their names, 
not just their IDs. We did have to connect to the allInstructors state
from the Redux store, as well as fetchAllInstructors in componentDidMount().
This was done so we could get the other instructors in the database.
We filter out the current instructor from the array at the beginning of 
the render function, and use this array to populate the dropdown menu
options. Because it's part of the form, we don't need to modify the 
handleSubmit function. On redirect to the CourseView we will see the 
updates.

You will see below the form there is another part of the UI that is
also changing the current course's instructor. This structure is similar
to how changing assigned courses is done in the InstrutcorView. There is
a slight drawback to using this approach in this context. When we perform
an EDIT_COURSE action (initiated by calling the editCourseThunk), this action
is sent to the allCourses reducer, not the course reducer. For that reason, 
we will not see the updates in the single course view unless there is another 
call to the fetchCourseThunk. This is done once when we redirect after form
submission, which is why the data is shown without needing to refresh. 
If we want that same functionality within the container, we need to make
a call to fetchCourse after each editCourse. We see that in the onClick
functionality of the buttons controlling that portion of the UI. 

*/

class EditEmployeeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "", 
          lastname: "",
          taskId: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting course ID from url
        this.props.fetchEmployee(this.props.match.params.id);
        this.props.fetchTasks();
        this.setState({
            firstname: this.props.employee.firstname, 
            lastname: this.props.employee.lastname,
            taskId: this.props.employee.taskId, 
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSelectChange = event => {
      //handle change for the dropdown menu
      //want to set the instructorId based on the selected choice
      //when the form gets submitted, this is how we can change
      //assigned instructor without having to manually enter in the 
      //instructorId like before
      if (event.target.value === "staff") {
        this.setState({taskId:null});
      } else {
        this.setState({taskId: event.target.value})
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.firstname === "") {
          this.setState({error: "Error: title cannot be empty"});
          return;
        }

        //get new info for course from form input
        let employee = {
            firstname: this.props.employee.firstname,
            lastname: this.state.lastname,
            taskId: this.state.taskId
        };
        
        this.props.editEmployee(employee);

        this.setState({
          redirect: true, 
          redirectId: this.props.employee.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { employee, allTasks, editEmployee, fetchEmployee} = this.props;
        let assignedTask = employee.taskId;

        let otherTasks = allTasks.filter(task => task.id!==assignedTask);
      
        //go to single course view of the edited course
        if(this.state.redirect) {
          return (<Redirect to={`/employee/${this.state.redirectId}`}/>)
        }

        return (
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Title: </label>
            <input type="text" name="title" value={this.state.firstname || ''} placeholder={employee.firstname} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Timeslot: </label>
            <input type="text" name="timeslot" value={this.state.lastname || ''} placeholder={employee.lastname} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <select onChange={(e) => this.handleSelectChange(e)}>
              {employee.task!==null ?
                <option value={employee.taskId}>{employee.task.description+" (current)"}</option>
              : <option value="staff">Staff</option>
              }
              {otherTasks.map(task => {
                return (
                  <option value={task.id} key={task.id}>{task.description}</option>
                )
              })}
              {employee.task!==null && <option value="staff">Staff</option>}
            </select>
  
            <button type="submit">
              Submit
            </button>

          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          {employee.taskId !== null ?
            <div> Current instructor:  
            <Link to={`/employee/${employee.taskId}`}>{employee.task.description}</Link>
            <button onClick={async () => {await editEmployee({id:employee.id, taskId: null});  fetchEmployee(employee.id)}}>Unassign</button>
            </div>
            : <div> No instructor currently assigned </div>
          }

          <div> Other instructors
          {otherTasks.map(task => {
            return (
            <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.description}</h4>
                </Link>
                <button onClick={async() => {await editEmployee({id:employee.id, taskId: task.id}); fetchEmployee(employee.id)}}>Assign this instructor</button>
            </div>
            )})
          }
          </div>
        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      employee: state.employee,
      allInstructors: state.allInstructors
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
        fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
        fetchTasks: () => dispatch(fetchAllTasksThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditEmployeeContainer);