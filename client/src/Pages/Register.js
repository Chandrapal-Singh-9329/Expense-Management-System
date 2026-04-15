import React from 'react'
import {Form, Input} from 'antd';
import {Link} from 'react-router-dom'

const Register = () => {
    const submitHandler = (values) =>{
        console.log(values);
    }
  return (
    <>
    <Form style={{ width: "400px", margin: "auto" , padding:"20px"}}  onFinish={submitHandler}>
        <h1 style={{padding:"30px"}}>Register Page</h1>
        <Form.Item name='name' label='Name'>
            <Input type='name'/>
        </Form.Item>

        <Form.Item name='email' label='Email'>
            <Input type='email'/>
        </Form.Item>

        <Form.Item name='password' label='Password'>
            <Input type='password'/>
        </Form.Item>

        <div>
            <Link to="/login">already registerd? click here to logIn         </Link>
            <button type="submit" className="btn btn-primary w-100 mt-2">
  Register
</button>
        </div>
    </Form>
      
    </>
  )
}

export default Register
