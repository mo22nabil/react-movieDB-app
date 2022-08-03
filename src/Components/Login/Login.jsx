import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

  const [user, setuser] = useState({
   
    email:'',
    password: '',

  })
  const [validateerrorlist, setvalidateerrorlist] = useState([])
  const [load, setload] = useState(false)
  const [error, seterror] = useState('')


let navigate =useNavigate();

  
  
  async function submitAction(e) {
    e.preventDefault();
    //  console.log(data);
    
     let  validateResult  = validateloginForm(user);
     setload(true);

    if (validateResult.error) {
     setload(false);
     setvalidateerrorlist(validateResult.error.details);
     
      
      }
      else{
          
          let {data} = await  axios.post(`https://route-egypt-api.herokuapp.com/signin`,user);
          
          
          if (data.message === 'success') {
            localStorage.setItem('Token',data.token)
            setload(false);
            props.getUserData();
            navigate('/home');
            
          } else {
            setload(false);
            seterror(data.message);
          }
        }
        // post api  axios
        
        
      }
      //  setload(true);









      
      
      function changeAction(e) {
        let newuser = {...user};
        newuser[e.target.name] = e.target.value;
        setuser(newuser);
        // console.log(user);
      }
      
      
      function validateloginForm(user) {
        let schema = Joi.object({
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
      
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input onChange={changeAction} type="email" className="form-control" name="email" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="Password" className="form-label">Password</label>
        <input onChange={changeAction} type="password" className="form-control" name="password" id="Password"/>
      </div>

      
     
      <button type='submit' className="btn btn-primary">
      {load ? <i className='fas fa-spinner fa-spin'></i>:'login' }
      
      </button>
  </form>
  </>
  )
}
