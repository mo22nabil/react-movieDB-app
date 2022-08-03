import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Register() {

  const [user, setuser] = useState({
    first_name:'',
    last_name:'',
    email:'',
    password: '',
    age:0,

  })
  const [validateerrorlist, setvalidateerrorlist] = useState([])
  const [load, setload] = useState(false)
  const [error, seterror] = useState('')
  let navigate = useNavigate();

  
  
  
  async function submitAction(e) {
    e.preventDefault();
     let  validateResult  = validateRegisterForm(user);
     setload(true);

    if (validateResult.error) {
     setload(false);
     setvalidateerrorlist(validateResult.error.details);
     
      
      }
      else{
          
          let {data} = await  axios.post(`https://route-egypt-api.herokuapp.com/signup`,user);
          
          
          if (data.message === 'success') {
            setload(false);
            navigate('/login');
          } else {
            setload(false);
            console.log(data);
            seterror(data.message);
          }
        }
        
      }
      
      function changeAction(e) {
        let newuser = {...user};

        // newuser["first_name"]  == newuser.first_name
        newuser[e.target.name] = e.target.value;
        setuser(newuser);
      }
      
      
      function validateRegisterForm(user) {
        let schema = Joi.object({
          first_name:Joi.string().alphanum().min(3).max(20).required(),
          last_name:Joi.string().alphanum().min(3).max(20).required(),
          age:Joi.number().min(18).max(80).required(),
          email :Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          password : Joi.string().pattern(/^[A-Z][a-z]{3,8}$/),
      })
      
        return schema.validate(user,{abortEarly:false});
    
      }
      
      
      return (<>



    <form className='my-5' onSubmit={submitAction}>
      


     {validateerrorlist.map((error,index)=>{
       if (index === 4) {
         return <div className="alert alert-danger" key={index}>password is invalid</div>
         
       } else {
         
         return <div className="alert alert-danger" key={index}>{error.message}</div>
       }
     })}

      
      {error ?<div className='alert alert-danger'>{error}</div> :''}
      
      
      <div className="my-3">
        <label htmlFor="first_name" className="form-label">first_name :</label>
        <input onChange={changeAction} type="text" className="form-control" id="first_name" name='first_name' />
      </div>
      <div className="mb-3">
        <label htmlFor="last_name" className="form-label">last_name :</label>
        <input onChange={changeAction} type="text" className="form-control" id="last_name" name='last_name' />
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">age :</label>
        <input onChange={changeAction} type="number" className="form-control" id="age" name='age' />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input onChange={changeAction} type="email" className="form-control" name="email" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="Password" className="form-label">Password</label>
        <input onChange={changeAction} type="password" className="form-control" name="password" id="Password"/>
      </div>

      
     
      <button type='submit' className="btn btn-primary">
      {load ? <i className='fas fa-spinner fa-spin'></i>:'register' }
      
      </button>
  </form>
  </>
  )
}
