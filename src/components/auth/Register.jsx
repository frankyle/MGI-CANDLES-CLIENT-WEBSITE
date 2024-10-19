import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";  
import { registerUser } from "../../redux/authSlice";  
import Back from "../common/Back";  
import img from "../images/hero2.jpg";
import "./register.css";  

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const validateEmail = (email) => {
    // Basic email validation using regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    // console.log(`Requesting token at: ${baseURL}token/`);

    e.preventDefault();
    setSubmitting(true);
    setErrors({});
  
    // Check if passwords match
    if (password !== password2) {
      setErrors({ submit: 'Passwords do not match' });
      setSubmitting(false);
      return;
    }
  
    // Validate email format
    if (!validateEmail(email)) {
      setErrors({ submit: 'Invalid email format' });
      setSubmitting(false);
      return;
    }
  
    try {
      // Dispatch the register action
      const resultAction = await dispatch(registerUser({ username, email, password, password2 }));
      
      if (registerUser.fulfilled.match(resultAction)) {
        // Redirect to login page upon successful registration
        history.push('/login');
      } else {
        // Handle server-side validation errors
        const payload = resultAction.payload;
  
        if (payload && typeof payload === 'object') {
          // Check if there are field-specific errors
          if (payload.email) {
            setErrors({ submit: payload.email[0] }); // Example: "user with this email already exists"
          } else if (payload.username) {
            setErrors({ submit: payload.username[0] });
          } else {
            setErrors({ submit: 'Registration failed. Please try again.' });
          }
        } else {
          setErrors({ submit: 'An unknown error occurred.' });
        }
      }
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <>
      <section className='register mb'>
        <Back name='Register' title='Create Your Account' cover={img} />
        <div className='container'>
          <form className='shadow' onSubmit={handleSubmit}>
            <h4>Fill up The Form</h4> <br />
            <div className='contact'>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
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
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
