import React, { useState,useEffect,useReducer} from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const reducer=(state, action)=>{
  console.log(action,'hai');
  if(action.type === "USER INPUT"){
    return{value:action.payload, isValid:action.payload.includes('@')};
  }
  if(action.type==='INPUT_BLUR'){
    return{value:state.value, isValid:state.value.includes('@')};
  }
  return{value:'', isValid:false}

}
const Login = (props) => {
 
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatch]=useReducer(reducer, {value:'',isValid:false})
 
  useEffect(() => {
    console.log('Effect Running');
  return ()=>{
    console.log('Effect Cleaning');
  }
  
},[])

  
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value)
    dispatch({type:"USER INPUT", payload:event.target.value});
    setFormIsValid(event.target.value.includes('@') && enteredPassword.trim().length>6)
   
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
     state.value.includes('@') &&event.target.value.trim().length > 6 
    );
  };

  const validateEmailHandler = () => {
   dispatch({type:'INPUT_BLUR'})
   
  };
  const {isValid:emailIsValid}=state;
  const {isValid:passwordValid}=enteredPassword
  useEffect(()=>{
    console.log('checking the effect!');
    const identifier=setTimeout(()=>{
      setFormIsValid(
        emailIsValid&& passwordValid
      );
    },500)
    return ()=>{console.log('cleanUp!')
    clearTimeout(identifier);}// clean up function(when the component is unmounts from the DOM )
   },[state,enteredPassword])

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.value, enteredPassword);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
           
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
           
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}  onClick={()=>{dispatch({type:"email", payload:{email: state.value, password: enteredPassword}})}}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
