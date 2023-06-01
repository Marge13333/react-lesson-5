import { useEffect, useState,} from 'react';
import axios from 'axios';
import './signin.css';

function SignIn() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [mainError,setMainError] = useState('')
    const [user,setUser] = useState(null)
    const [accesToken,setAccessToken] = useState('')
    
    const ClickSubmit = async (e) =>{
        try{
          e.preventDefault() // prevent make request
          setMainError('')
  
          if(!email ||!password){
            setMainError('please fill your information')
            return
          }
  
  
          const response = await axios.post(
              'https://accounts.tnet.ge/api/ka/user/auth',
              {
                Email: email,
                Password : password
              }
            )
  
          const token = response?.data?.data?.access_token
          const userInfo = response?.data?.data?.Data
  
          setUser(userInfo)
          setAccessToken(token)
          localStorage.setItem('token',token)
          localStorage.setItem('user',JSON.stringify(userInfo))

            
        }catch{
          setMainError(e.response.data.message.error_data._error[0])
        }
    }
    useEffect(() => {
      const t = localStorage.getItem('token')
      const u = JSON.parse(localStorage.getItem('user'))
  
      if(u){
        setUser(u)
      }
  
      if(t){
        setAccessToken(t)
      }
  
    },[accesToken])
    
      return (
        <div className='form' >
          <form onSubmit={ClickSubmit}>
        <div className='FormBox'>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
         </div>
        <div className='Form'>
           <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
         </div>
         <button className='btn' type="submit" >Submit</button>
          </form>
          <h2 className='error'>{mainError}</h2>
        </div>
      );
  }


export default SignIn;