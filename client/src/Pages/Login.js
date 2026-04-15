import React from 'react'
import {Form, Input} from 'antd';
import {Link} from 'react-router-dom'

const Login = () => {
     const submitHandler = (values) =>{
        console.log(values);
    }
  return (
    <>
        <Form style={{ width: "400px", margin: "auto" ,padding:"20px"}}  onFinish={submitHandler}>
            <h1 style={{padding:"20px"}}>Login Page</h1>
            
            <Form.Item name='email' label='Email '>
                <Input type='email'/>
            </Form.Item>
    
            <Form.Item name='Password' label='password'>
                <Input type='password'/>
            </Form.Item>
    
            <div>
                <Link to="/register">create new account</Link>
                <button type="submit" className="btn btn-primary w-100 mt-2">
  Login
</button>
            </div>
        </Form>
          
    </>
  )
}

export default Login
