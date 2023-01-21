import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customPOST } from '../Utilities/index';
import { emailPattern, passwordPattern } from '../Utilities/constants';

export default function SignUp() {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  function setEmailAndEmailError(value) {
    setUserName(value);

    if (value === '') {
      setUserNameError('Please enter a email');
    } else if (!emailPattern.test(value)) {
      setUserNameError('Please enter a valid email');
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

  function setConfirmPasswordAndConfirmPasswordError(value) {
    setConfirmPassword(value);

    if (value === '') {
      setConfirmPasswordError('Please enter a confirm password');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Please enter same password');
    } else {
      setConfirmPasswordError('');
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    setEmailAndEmailError(userName);
    setPasswordAndPasswordError(password);
    setConfirmPasswordAndConfirmPasswordError(confirmPassword);

    if (
      !emailPattern.test(userName) ||
      !passwordPattern.test(password) ||
      confirmPassword !== password
    ) {
      return;
    }

    const request = {
      userName: userName,
      password: password,
    };

    customPOST('auth/signup', request).then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    });
  }

  return (
    <>
      <div className='container pt-5'>
        <h1 className='display-1 pb-2'>My Space</h1>
        <div className='card'>
          <div className='card-header'>Sign Up</div>
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
                  onChange={(event) =>
                    setEmailAndEmailError(event.target.value)
                  }
                  onBlur={(event) => setEmailAndEmailError(event.target.value)}
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
                  onChange={(event) =>
                    setPasswordAndPasswordError(event.target.value)
                  }
                  onBlur={(event) =>
                    setPasswordAndPasswordError(event.target.value)
                  }
                />
                {passwordError && (
                  <span className='text-danger'>{passwordError}</span>
                )}
              </div>
              <div className='mb-3'>
                <label htmlFor='confirmPassword' className='form-label'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  className={`form-control ${
                    confirmPasswordError && 'is-invalid'
                  }`}
                  id='confirmPassword'
                  autoComplete='on'
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPasswordAndConfirmPasswordError(
                      event.target.value
                    )
                  }
                  onBlur={(event) =>
                    setConfirmPasswordAndConfirmPasswordError(
                      event.target.value
                    )
                  }
                />
                {confirmPasswordError && (
                  <span className='text-danger'>{confirmPasswordError}</span>
                )}
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
  );
}
