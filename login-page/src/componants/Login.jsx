import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formData = { email, password };
    console.log('Login Form Data:', formData);

    axios.post('http://localhost:3001/login', formData)
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/home");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-4">
          <div className="bg-white p-3 rounded">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  className={`form-control rounded-0 ${errors.email && 'is-invalid'}`}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className={`form-control rounded-0 ${errors.password && 'is-invalid'}`}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <button type='submit' className='btn btn-success w-100 rounded-0'>
                Login
              </button>
            </form>
            <p className="mt-3">Don't have an account?</p>
            <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-default">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
