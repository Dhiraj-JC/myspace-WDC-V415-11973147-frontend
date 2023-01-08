import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {customPOST} from '../Utilities';



export default function Login() {

  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');


  function onSubmit(event) {
    event.preventDefault();

    const request = {
      userName: userName,
      password: password,
    };

    customPOST('auth/login',request)
    .then((response)=> {
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    }).catch((error)=> {
      window.alert('Username or password is incorrect');
    })

  }



  return (
    <>
      <div className='container pt-5'>
        <h1 className="display-1 pb-2">My Space</h1>
        <div className='card'>
          <div className='card-header'>Login</div>
          <div className='card-body'>
            <form onSubmit={onSubmit} >
              <div className='mb-3'>
                <label htmlFor='userName' className='form-label'>
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='userName'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  autoComplete='on'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
              <Link to='/signup' className='card-link' style={{marginLeft: '10px'}}>
                Sign up
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}