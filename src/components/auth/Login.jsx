import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";  // Assuming you're using react-router-dom for navigation
import { loginUser } from "../../redux/authSlice";  // Assuming loginUser action is in authSlice
import Back from "../common/Back";  // Assuming Back component is used for header
import img from "../images/hero2.jpg";
import "./register.css";  // Create a separate CSS file for styling if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      // console.log(`Requesting token at: ${baseURL}token/`);

      // Dispatch the login action
      const resultAction = await dispatch(loginUser({ email, password }));
      
      if (loginUser.fulfilled.match(resultAction)) {
        // Redirect to dashboard upon successful login
        history.push('/signals');
      } else {
        // Handle errors, for example, invalid credentials
        const payload = resultAction.payload;
        setErrors({ submit: payload ? payload.non_field_errors || 'Login failed' : 'Login failed' });
      }
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className='login mb'>
        <Back name='Login' title='Access Your Account' cover={img} />
        <div className='container'>
          <form className='shadow' onSubmit={handleSubmit}>
            <h4>Login to Your Account</h4> <br />
            <div>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Display errors */}
            {errors.submit && (
              <div style={{ color: 'red' }}>
                {errors.submit}
              </div>
            )}

            <button type='submit' disabled={submitting}>
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
