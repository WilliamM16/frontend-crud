

import { Link } from 'react-router-dom';


const HomePageView = () => {
  return (
    <div>
      <h1>Employee Management System</h1>
      <h2>
        <Link to={'/employees'} > All Employees </Link>
      <br/>
      <br/>
      <br/>
      <Link to={'/tasks'} > All Tasks </Link>
      </h2>
    </div>
  );    
}




export default HomePageView;
