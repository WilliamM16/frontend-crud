import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchCourseThunk, editCourseThunk, fetchAllInstructorsThunk  } from '../../store/thunks';


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

class EditCourseContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          title: "", 
          timeslot: "",
          instructorId: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting course ID from url
        this.props.fetchCourse(this.props.match.params.id);
        this.props.fetchInstructors();
        this.setState({
            title: this.props.course.title, 
            timeslot: this.props.course.timeslot,
            instructorId: this.props.course.instructorId, 
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
        this.setState({instructorId:null});
      } else {
        this.setState({instructorId: event.target.value})
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.title === "") {
          this.setState({error: "Error: title cannot be empty"});
          return;
        }

        //get new info for course from form input
        let course = {
            id: this.props.course.id,
            title: this.state.title,
            timeslot: this.state.timeslot,
            instructorId: this.state.instructorId
        };
        
        this.props.editCourse(course);

        this.setState({
          redirect: true, 
          redirectId: this.props.course.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { course, allInstructors, editCourse, fetchCourse} = this.props;
        let assignedInstructor = course.instructorId;

        let otherInstructors = allInstructors.filter(instructor => instructor.id!==assignedInstructor);
      
        //go to single course view of the edited course
        if(this.state.redirect) {
          return (<Redirect to={`/course/${this.state.redirectId}`}/>)
        }

        return (
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Title: </label>
            <input type="text" name="title" value={this.state.title || ''} placeholder={course.title} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Timeslot: </label>
            <input type="text" name="timeslot" value={this.state.timeslot || ''} placeholder={course.timeslot} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <select onChange={(e) => this.handleSelectChange(e)}>
              {course.instructor!==null ?
                <option value={course.instructorId}>{course.instructor.firstname+" (current)"}</option>
              : <option value="staff">Staff</option>
              }
              {otherInstructors.map(instructor => {
                return (
                  <option value={instructor.id} key={instructor.id}>{instructor.firstname}</option>
                )
              })}
              {course.instructor!==null && <option value="staff">Staff</option>}
            </select>
  
            <button type="submit">
              Submit
            </button>

          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          {course.instructorId !== null ?
            <div> Current instructor:  
            <Link to={`/instructor/${course.instructorId}`}>{course.instructor.firstname}</Link>
            <button onClick={async () => {await editCourse({id:course.id, instructorId: null});  fetchCourse(course.id)}}>Unassign</button>
            </div>
            : <div> No instructor currently assigned </div>
          }

          <div> Other instructors
          {otherInstructors.map(instructor => {
            return (
            <div key={instructor.id}>
                <Link to={`/instructor/${instructor.id}`}>
                  <h4>{instructor.firstname}</h4>
                </Link>
                <button onClick={async() => {await editCourse({id:course.id, instructorId: instructor.id}); fetchCourse(course.id)}}>Assign this instructor</button>
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
      course: state.course,
      allInstructors: state.allInstructors
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editCourse: (course) => dispatch(editCourseThunk(course)),
        fetchCourse: (id) => dispatch(fetchCourseThunk(id)),
        fetchInstructors: () => dispatch(fetchAllInstructorsThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditCourseContainer);