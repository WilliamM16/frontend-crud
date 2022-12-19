


const NewEmployeeView = (props) => {
  const {handleChange, handleSubmit, error } = props;

  return (
    <div className="root">
      <div className="formContainer">
        <div className="formTitle">
          <h2 style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
            New Employee
          </h2>
        </div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
          <label style= {{color:'#11153e', fontWeight: 'bold'}}>FirstName: </label>
          <input type="text" name="firstname" onChange ={(e) => handleChange(e)} />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>LastName: </label>
          <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Deapartment: </label>
          <input type="text" name="department" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <button type="submit">
            Submit
          </button>
          <br/>
          <br/>
        </form>
        {error!=="" && <p>{error}</p>}
        </div>
      </div>
        
  )
}

export default NewEmployeeView;