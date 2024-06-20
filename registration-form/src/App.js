// src/App.js
import React from 'react';
import './App.css';
import { useState } from "react";
const initialstate ={username:'',lastname:'',email:'',studentid:'',gender:'',state:''}
const App =() =>
{
   const [formData,setformdata]=useState(initialstate)
   const[formerrors,setformerrors]=useState({}) 
    const[success,setsuccess]=useState("") 
    const[error,seterror]=useState("") 
    const handlesubmit=(event)=>
    {
        const myform = event.target;
        event.preventDefault();
        if(Validateform())
        {
           const obj= new XMLHttpRequest();
            obj.open('POST',"http://localhost:4000/",true)
            obj.setRequestHeader("content-Type","Application/json")
            obj.send(JSON.stringify(formData))
            Object.onreadystatechange=()=>
            {
                if(obj.readyState===4 && obj.status===200)
                {
                    const info = JSON.parse(obj.responseText);
                    if(info.status==true)
                    {
                        setsuccess("Account created Successfully");
                        setformdata(initialstate);
                        myform.reset();
                    }
                    else
                    {
                        seterror("Sorry! Unable to create Account")
                        setformdata(initialstate);
                        myform.rest();
                    }
                }
            }
            console.log("Sending to server",formData)

        }
    }

    const Validateform=()=>
    {
        let isvalid =true;
        let errors={}
        if(formData.username=='')
        {
            errors.username="Username is required"
            isvalid=false;
        }
        else
        {
            if(formData.username.length<4||formData.username.length>20)
            {
                errors.username="Username should be between 4 and 20 chars only"
                isvalid=false; 
            }
        }
        //Email Validation
        const validaEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };
        if(formData.email=='')
        {
            errors.email="Email is required"
            isvalid=false;
        }
        else
        {
            if(!validaEmail(formData.email))
            {
                errors.email="Valid Email is required"
                isvalid=false;
            }
        }
         // studentid Validation
    const validstudentid = (studentid) => {
        return studentid.match(
            //^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            /^\d{3}-\d{2}-\d{4}$/

        );
      };
      if(formData.studentid=='')
      {
          errors.studentid="StudentIDis required"
          isvalid=false;
      }
      else
      {
          if(!validstudentid(formData.studentid))
          {
              errors.studentid="The student ID follows a format of three digits, a hyphen, two digits, another hyphen, and then four digits (e.g., 123-45-6789)."
              isvalid=false;
          }
      }
        setformerrors(errors)
        return isvalid
    }
    //console.log("errors:",formerrors)
    const handleinputs=(event)=>
    {
        if(event.target.name==="terms")
        {
            setformdata({...formData,
            [event.target.name]:event.target.checked?event.target.value:""
            })
        }
    
        else{
        setformdata({...formData,
            [event.target.name]:event.target.value})
        }
    }
    const hideerror=(event)=>
    {
        setformerrors({
            ...formerrors,
            [event.target.name]:''
        })
    }
    const checkerror=(event)=>
    {
        if(event.target.value==="")
        {
            setformerrors({
                ...formerrors,
                [event.target.name]:event.target.name+' is required'
            }) 
        }
    }
   
    //console.log("errors:",formerrors)
    return(<div className='Header'>
        <div >
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
        <form className='Form' onSubmit={handlesubmit}>
        <h1>Registration Form </h1>
        <p>Fill out the form carefully for registration</p>
            <div className="Formgroup">
            <label>Student Name:</label>
            <input onFocus={hideerror} onBlur={checkerror} type="text" className="Formcontrol" name="username" placeholder='First Name' value={formData.username} onChange={handleinputs}/>
            <input onFocus={hideerror} onBlur={checkerror} type="text" className="Formcontrol" name="lastname" placeholder='Last Name' value={formData.name} onChange={handleinputs}/>
            {formerrors.username&&<span className="error">{formerrors.username}</span>}
            </div>
            <div className="Formgroup">
            <label> Student E-mail:</label>
            <input  onFocus={hideerror} onBlur={checkerror} type="text" className="Formcontrol" name="email" placeholder='myname@gmail.com' value={formData.email} onChange={handleinputs}/>
            {formerrors.email&&<span className="error">{formerrors.email}</span>}
            </div>
            <div className="Formgroup">
            <label>Student ID:</label>
            <input  onFocus={hideerror} type="text" className="Formcontrol" name="studentid" value={formData.password} onChange={handleinputs}/>
            {formerrors.studentid &&<span className="error">{formerrors.studentid}</span>}
            </div>
            <div className="Formgroup">
            <label>Gender :</label>
            <label>
                <input type="radio" name="gender" value='male' onChange={handleinputs}/>Male
            </label>   
            <label>
                <input type="radio" name="gender" value='female' onChange={handleinputs}/>Female
            </label>   
            </div>
            <div className="Formgroup">
                <label>List of Classes</label>
                <select name="state" className="Formcontrol" onChange={handleinputs}>
                    <option value=''>---Please Select----</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="Javascript">Javascript</option>
                    <option value="React">React</option>
                </select>
            </div>
            <div className="Formgroup">
            <input type="submit" className="btn" value="submit"/>
            </div>
        </form>
        </div>
    </div>);
}

export default App;

