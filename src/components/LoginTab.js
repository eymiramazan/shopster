import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const LoginTab = ({ handleLogin }) => {
  const initialValues = {
    username: '',
    password: ''
  }

  let navigate = useNavigate();

  const Schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  })

  //TODO - post login to server change state to logged in, useContext to change state
  const onSubmit = async (values) => {
    handleLogin(values.username, values.password);
    navigate("/home");
  }

  return (
    <div className=' outline outline-gray-100 rounded-3xl'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Schema}>
        {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
          return (
            <Form className='m-5 mt-11 grid place-items-center p-11'>
              <label className='block' htmlFor='username'>Username</label>
              <Field
                className='outline mt-2 mb-2 w-1/2 rounded-lg p-1 outline-gray-500'
                name='username'
                id='username'
                type='text'
                value={values.username} />
              <span className='text-red-600 font-bold'>{errors.username}</span>
              <label className='block' htmlFor='password'>Password</label>
              <Field
                className='outline mt-2 mb-2 w-1/2 rounded-lg p-1 outline-gray-500'
                name='password'
                id='password'
                type='password'
                values={values.password} />
              <span className='text-red-600 font-bold'>{errors.password}</span>
              <button className='block w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded-lg' type='submit'>Login</button>            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginTab