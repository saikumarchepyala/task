import { useState } from "react";
const initialstate ={username:'',email:'',password:'',gender:'',state:'',terms:'',hobbies:[]}
const Userform =() =>
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
       console.log(formData);
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
        // hobbies validation
        if(formData.hobbies.length===0)
        {
            errors.hobbies="please select one hobby"
        }
         // password Validation
    const validpassword = (password) => {
        return password.match(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        );
      };
      if(formData.password=='')
      {
          errors.password="Password is required"
          isvalid=false;
      }
      else
      {
          if(!validpassword(formData.password))
          {
              errors.password="matches that you have 6 to 16 valid characters, it doesn't validate that it has at least a number, and at least a special character."
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
        else if(event.target.name==="hobbies")
        {
            let arr=formData.hobbies
            let itemexists = arr.indexOf(event.target.value)
            if(itemexists===-1)
            {
                arr.push(event.target.value)
            }
            else
            {
                arr.splice(itemexists,1)
            }
            setformdata({...formData,hobbies:arr})
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
   
   // console.log("errors:",formerrors)
    return(<div>
        <h1>Form Basics in ReactJS </h1>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handlesubmit}>
            <div className="Formgroup">
            <label>UserName:</label>
            <input onFocus={hideerror} onBlur={checkerror} type="text" className="Formcontrol" name="username" value={formData.username} onChange={handleinputs}/>
            {formerrors.username&&<span className="error">{formerrors.username}</span>}
            </div>
            <div className="Formgroup">
            <label>Email:</label>
            <input  onFocus={hideerror} onBlur={checkerror} type="text" className="Formcontrol" name="email" value={formData.email} onChange={handleinputs}/>
            {formerrors.email&&<span className="error">{formerrors.email}</span>}
            </div>
            <div className="Formgroup">
            <label>Password:</label>
            <input  type="password" className="Formcontrol" name="password" value={formData.password} onChange={handleinputs}/>
            {formerrors.password &&<span className="error">{formerrors.password}</span>}
            </div>
            <div className="Formgroup">
            <label>
                <input type="radio" name="gender" value='male' onChange={handleinputs}/>Male
            </label>   
            <label>
                <input type="radio" name="gender" value='female' onChange={handleinputs}/>Female
            </label>   
            </div>
            <div className="Formgroup">
            <label>
                <input type="checkbox" name="hobbies" value='cricket' onChange={handleinputs}/>Cricket
            </label>   
            <label>
                <input type="checkbox" name="hobbies" value='cooking' onChange={handleinputs}/>Cooking
            </label>   
            <label>
                <input type="checkbox" name="hobbies" value='Sleeping' onChange={handleinputs}/>Sleeping
            </label>   
            <label>
                <input type="checkbox" name="hobbies" value='Reading' onChange={handleinputs}/>Reading
            </label>   
            {formerrors.hobbies&&<span className="error">{formerrors.hobbies}</span>}
            </div>
            <div className="Formgroup">
                <label>Select State:</label>
                <select name="state" className="Formcontrol" onChange={handleinputs}>
                    <option value=''>---Select State----</option>
                    <option value="Andhrapradesh">Andhrapradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="odissa">Odissa</option>
                    <option value="tamilnadu">Tamil Nadu</option>
                </select>
            </div>
            <div className="Formgroup">
                <label>
                    <input type="checkbox" name="terms" value="yes" onChange={handleinputs}/>Please accept Terms & Conditions-----
                </label>
            </div>
            <div className="Formgroup">
            <input type="submit" className="btn" value="submit"/>
            </div>
        </form>
    </div>);
}
export default Userform;