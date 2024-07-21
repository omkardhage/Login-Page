import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const validateEmail = async (email) => {
    try {
      const response = await axios.post('http://localhost:3001/check-email', { email });
      return response.data === "Email is available";
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(prevErrors => ({ ...prevErrors, email: err.response.data }));
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    setServerError('');

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const isEmailValid = await validateEmail(email);
    if (!isEmailValid) {
      return;
    }

    const formData = { name, email, password };
    console.log('Form Data Submitted:', formData);

    axios.post('http://localhost:3001/register', formData)
      .then(result => {
        console.log(result);
        navigate("/login");
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data) {
          setServerError(err.response.data);
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-6">
          <div className="bg-white p-3 rounded">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name"><strong>Name</strong></label>
                <input
                  type="text"
                  className={`form-control ${errors.name && 'is-invalid'}`}
                  autoComplete="off"
                  id="name" 
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  className={`form-control ${errors.email && 'is-invalid'}`}
                  autoComplete="off"
                  id="email" 
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type="password"
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  autoComplete="off"
                  id="password" 
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              {serverError && <div className="alert alert-danger">{serverError}</div>}
              <button type='submit' className='btn btn-success w-100'>Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
