import { Link } from "react-router-dom";

const CourseView = (props) => {
  const { course } = props;
  return (
    <div>
      <h1>{course.title}</h1>
      {course.instructor ? <h3>{course.instructor.firstname + " " + course.instructor.lastname}</h3>: <h3>staff</h3>}
      <Link to={`/editcourse/${course.id}`}>Edit course information</Link>
      <br/>
      <Link to={`/courses`}>View all courses</Link>
    </div>
  );

};

export default CourseView;