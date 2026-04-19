import React, {useState, useEffect} from 'react'
import {Form, Input, message, Card} from 'antd';
import {Link , useNavigate} from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const submitHandler = async(values) =>{
        try{
            setLoading(true);
            await axios.post('/api/v1/users/register', values);
            message.success("Registration successful");
            setLoading(false)
            navigate("/login");
        }
        catch(error){
            setLoading(false);
            message.error("something went wrong");
        }
    }
    
        //prevent Register User
        useEffect(()=>{
            if(localStorage.getItem('user'))
            {
                navigate('/')
            }
    
        },[navigate])

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
      <Card title="Register" style={{ width: 400 }}>
        {loading && <Spinner />}

        <Form layout="vertical" onFinish={submitHandler}>
          
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Name is required' },
              { min: 3, message: 'Minimum 3 characters' }
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

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
              { required: true, message: 'Password is required' },
              { min: 6, message: 'Minimum 6 characters' }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <button className="btn btn-primary w-100 mt-2">Register</button>

          <div className="text-center mt-2">
            <Link to="/login">Already registered? Login</Link>
          </div>

        </Form>
      </Card>
    </div>
  );
};

export default Register;
