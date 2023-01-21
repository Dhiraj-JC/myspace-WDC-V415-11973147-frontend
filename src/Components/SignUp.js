import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {customPOST} from '../Utilities/index';

export default function SignUp() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();


  function onSubmit(event) {
    event.preventDefault();

    const request = {
      userName:userName,
      password:password
    };

    customPOST('auth/signup',request)
    .then((response)=> {
      const token = response.data.token;
      localStorage.setItem('token',token);
      navigate('/dashboard');
    })
  }

  return (
    <>
      <div className='container pt-5'>
        <h1 className='display-1 pb-2'>My Space</h1>
        <div className='card'>
          <div className='card-header'>Sign Up</div>
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
                  onChange={(event)=> setUserName(event.target.value)}
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
                  onChange={(event)=> setPassword(event.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='confirmPassword' className='form-label'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='confirmPassword'
                  autoComplete='on'
                  value={confirmPassword}
                  onChange={(event)=> setConfirmPassword(event.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
              <Link
                to='/login'
                className='card-link'
                style={{ marginLeft: '10px' }}
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
