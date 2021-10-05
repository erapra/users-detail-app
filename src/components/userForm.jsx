import { useEffect } from "react";
import { useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { updateUser } from "../store/middlewares/middlewareActions";
import { selectUserById } from './../store/userReducer';
import { addUser } from './../store/middlewares/middlewareActions';
import  styled  from 'styled-components';

const ErrContainer =styled.span`max-width: 100%;
padding: .25rem .5rem;
margin-top: .1rem;
font-size: .875rem;
color: #fff;
background-color: rgba(220,53,69,.9);
border-radius: .25rem;`;

// input Fields
const renderTextInput = ({ name, label, input, meta, ...props }) => {

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...input}
        {...props}
        className="form-control"
        type="text"
        name={name}
        id={name}
        placeholder={label}
      />
      {meta.touched && meta.error &&<ErrContainer >{meta.error}</ErrContainer> }
    </div>
  );
};

const renderSelectInput = ({ name, label, options, input, meta }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        {...input}
        className="form-control"
        name={name}
        id={name}
        placeholder={label}
      >
         <option  > </option>
        {options.map((option,index) => (
          <option key={option.value}   value={option.value}>{option.label}</option>
        ))}
      </select>
      {meta.touched && meta.error &&<ErrContainer >{meta.error}</ErrContainer> }
    </div>
  );
};
 
//Submit or Go Back
const handleGetResult = (values,dispatch,props) => {
  if(values.id===undefined)
  dispatch(addUser(values));
  else
  dispatch(updateUser(values));

  props.history.replace("/");

 };

 const handleGoBack=(history)=>{

  history.goBack();
 }

 //validations
 const required=(value)=>
 {
 
  return value ?undefined:'required';
 }
 const isNumber=(value)=>
 {
   return value && isNaN(Number(value))  ? 'Must be a Number' : undefined;
 }

 const actualLength=(len)=>(value)=>{
   return value && value.length !==len ? `Must be ${len} characters`:undefined;
 }
 
 const actualLength10=actualLength(10);
 const actualLength6=actualLength(6);


 const mailValidate = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;


  //Functional Component 
const UserForm = (props) => {
const { handleSubmit ,initialize,match,history,pristine } = props;

const data = useSelector(selectUserById(match.params.id));

  useEffect(()=>{
    initialize(data);
  },[]);

  return (
    <form onSubmit={handleSubmit}  >       
     {/* <h5>User Entry Form</h5>       */}
      <div className="container" style={{ marginTop: "10px" ,border:"solid #f8f9fa",padding:"15px"}}>
      <div className="alert alert-primary" role="alert">
      User Details
    </div>
        <div className="row">
          <div className=" col-md-6">
            <Field
              name="name"
              label="Name"
              component={renderTextInput}
              validate={[required]}
            />
          </div>
          <div className="  col-md-6">
            <Field
              name="gender"
              label="Gender"
              component={renderSelectInput}
              validate={[required]}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            ></Field>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <Field
              name="email"
              label="Email"
              component={renderTextInput}
              validate={[required,mailValidate]}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <Field
              name="street"
              label="Address"
              component={renderTextInput}
              validate={[required]}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-4">
            <Field
              name="city"
              label="City"
              component={renderTextInput}
              validate={[required]}
            />
          </div>
          <div className="form-group col-md-4">
            <Field
              name="pincode"
              label="pinCode"
              component={renderTextInput}
              validate={[required,isNumber,actualLength6]}
            />
          </div>
          <div className="form-group col-md-4">
            <Field
              name="phoneno"
              label="Phone No"
              component={renderTextInput}
              validate={[required,isNumber, actualLength10  ]}
            />
          </div>
        </div>

        <button onClick={handleSubmit} className="btn btn-primary" disabled={pristine }>
          Register
        </button>  
        &nbsp;&nbsp;&nbsp;
        <button onClick={()=>handleGoBack(history)} className="btn btn-secondary">
          Back
        </button>      
      </div>
    </form>
  );

  
};

    
export default reduxForm({
  form: "userForm",
  onSubmit:handleGetResult
})(UserForm);
