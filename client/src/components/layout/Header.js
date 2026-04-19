import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {message} from 'antd'

const Header = () => {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user)
    {
      setLoginUser(user)
    }
  },[])

  const logoutHandler= () => {
    localStorage.removeItem("user");
    message.success('logout successfully')
    navigate('/login')
  }

  return (
  <div>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            Expense Management
          </Link>
        </div >

        <div className="p-3 fw-bold">
          {loginUser && loginUser.name}
        </div>
        
        <div>
          <button  className='btn btn-primary w-100'  onClick={logoutHandler}>logout</button>
        </div>

      </div>
    </nav>
  </div>
)
}

export default Header
