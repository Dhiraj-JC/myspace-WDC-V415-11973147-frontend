import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customPOST } from '../Utilities';
import { emailPattern, passwordPattern } from '../Utilities/constants';

export default function Login() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function setUserNameAndUserNameError(value) {
    setUserName(value);

    if (value === '') {
      setUserNameError('Please enter a email');
    } else if (!emailPattern.test(value)) {
      setUserNameError('Please enter valid email');
    } else {
      setUserNameError('');
    }
  }

  function setPasswordAndPasswordError(value) {
    setPassword(value);

    if (value === '') {
      setPasswordError('Please enter a password');
    } else if (!passwordPattern.test(value)) {
      setPasswordError('Please enter a valid password');
    } else {
      setPasswordError('');
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    setUserNameAndUserNameError(userName);
    setPasswordAndPasswordError(password);

    if (!emailPattern.test(userName) || !passwordPattern.test(password)) {
      return;
    }

    const request = {
      userName: userName,
      password: password,
    };

    customPOST('auth/login', request)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
      .catch((error) => {
        window.alert('Username or password is incorrect');
      });
  }

  return (
    <>
      <div className='container pt-5'>
        <h1 className='display-1 pb-2'>My Space</h1>
        <div className='card'>
          <div className='card-header'>Login</div>
          <div className='card-body'>
            <form onSubmit={onSubmit}>
              <div className='mb-3'>
                <label htmlFor='userName' className='form-label'>
                  Email address
                </label>
                <input
                  type='email'
                  className={`form-control ${userNameError && 'is-invalid'}`}
                  id='userName'
                  value={userName}
                  onChange={(e) => setUserNameAndUserNameError(e.target.value)}
                  onBlur={(e) => setUserNameAndUserNameError(e.target.value)}
                />
                {userNameError && (
                  <span className='text-danger'>{userNameError}</span>
                )}
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className={`form-control ${passwordError && 'is-invalid'}`}
                  id='password'
                  autoComplete='on'
                  value={password}
                  onChange={(e) => setPasswordAndPasswordError(e.target.value)}
                  onBlur={(e) => setPasswordAndPasswordError(e.target.value)}
                />
                {passwordError && (
                  <span className='text-danger'>{passwordError}</span>
                )}
              </div>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
              <Link
                to='/signup'
                className='card-link'
                style={{ marginLeft: '10px' }}
              >
                Sign up
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
