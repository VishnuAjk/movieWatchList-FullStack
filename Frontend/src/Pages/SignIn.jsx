import React, {useState} from 'react';
import styles from '../styles/signin.module.css';
import { signIn } from '../Redux/Reducers/userSlice';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../Redux/Reducers/userSlice';
import { getMovies } from '../Redux/Reducers/movieSlice';


const SignIn = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector(userSelector);
    
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
          // Submit form data
      try {
        const response = await dispatch(signIn(formData)).unwrap();
        if (response.success) {
          dispatch(getMovies());
          navigate('/home');
        }
        
      } 
      catch(err) {
        console.error('Failed to sign in:', err);
      };
      // Reset form
      setFormData({
        email: '',
        password: ''
      });
     
        
    };

    
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Sign In</button>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && error? <p>Incorrect Credentials</p>:null}
        </form>
      </div>
    </div>
  )
}

export default SignIn
