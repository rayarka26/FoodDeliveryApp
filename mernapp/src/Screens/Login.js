import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
  const [credentials, setcredentials] = useState({email:"",password:""})
   let navigate = useNavigate();
  const handlesubmit =async(e)=>{
   e.preventDefault();
   const res = await fetch("http://localhost:5000/api/loginuser",{
       method: "POST",
       headers:{
           'Content-Type' : 'application/json',
       },
       body: JSON.stringify({
      email:credentials.email, password: credentials.password
      })
     });
     const data = await res.json();
   console.log(data);
   if(!data.success) 
  alert("Enter Valid Credentials");
  if(data.success) 
  { localStorage.setItem("userEmail", credentials.email);
    localStorage.setItem("authToken", data.authToken);
  console.log(localStorage.getItem("authToken"));
  navigate("/");}
  }
const onChange =(event)=>{
   setcredentials({...credentials,[event.target.name]:event.target.value})
}
  return (
    <>
    <div className='container'>
        <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}/>
  </div>

  <button type="submit" className="m-3 btn btn-primary">Submit</button>
  <Link to='/signup' className='m-3 btn btn-danger'> I am  a  new user</Link>
</form>
</div>
    </>
  )
}

export default Login