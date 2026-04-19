import React, {useState, useEffect} from 'react'
import {Form, Input, message, Card} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import Spinner from '../components/layout/Spinner';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

     const submitHandler = async(values) =>{
        try{
            setLoading(true)
            const {data} = await axios.post('/api/v1/users/login', values)
            setLoading(false)
            message.success("Login Successful");
            localStorage.setItem('user', JSON.stringify({...data.user , password:''}))
            navigate('/')
        }
        catch(error){
            setLoading(false)
            message.error("something went wrong");
        }
    }

    //prevent login User
    useEffect(()=>{
        if(localStorage.getItem('user'))
        {
            navigate('/')
        }

    },[navigate])
    
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
      <Card title="Login" style={{ width: 400 }}>
        {loading && <Spinner />}

        <Form layout="vertical" onFinish={submitHandler}>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Enter valid email' }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Password is required' }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <button className="btn btn-primary w-100 mt-2">Login</button>

          <div className="text-center mt-2">
            <Link to="/register">Create new account</Link>
          </div>

        </Form>
      </Card>
    </div>
  );
};

export default Login;