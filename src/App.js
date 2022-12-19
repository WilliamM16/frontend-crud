import "./App.css";

//Router
import { Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container} from 'react-bootstrap'
//Components
import {
  HomePageContainer,
  EmployeeContainer,
  TaskContainer,
  AllEmployeesContainer,
  NewEmployeeContainer,
  EditEmployeeContainer,
  AllTasksContainer,
  NewTaskContainer,
  EditTaskContainer
} from './components/containers';

// if you create separate components for adding/editing 
// a student or instructor, make sure you add routes to those
// components here



const App = () => {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to ="/">Home </Nav.Link>
            <Nav.Link as={Link} to ="/employees"> Employees </Nav.Link>
            <Nav.Link as={Link} to ="/tasks"> Tasks </Nav.Link>
          </Nav>
        </Container>
      </Navbar>       


      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/employees" component={AllEmployeesContainer} />
        <Route exact path="/employee/:id" component={EmployeeContainer} />
        <Route exact path="/newemployee" component={NewEmployeeContainer} />
        <Route exact path="/editemployee:id" component={EditEmployeeContainer} />
        <Route exact path="/tasks" component={AllTasksContainer} />
        <Route exact path="/newtask" component={NewTaskContainer} />
        <Route exact path="/task/:id" component={TaskContainer} />
        <Route exact path="/edittask/:id" component={EditTaskContainer} />

      </Switch> 
    </div>
  );
}

export default App;

