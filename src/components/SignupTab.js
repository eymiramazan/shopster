import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from "yup";

const SignupTab = ({ redirectLogin, notify }) => {
  const initialValues = {
    username: '',
    password: '',
    nameandsurname: '',
    email: '',
    confirmPassword: ''
  }

  const Schema = Yup.object().shape({
    nameandsurname: Yup.string().required("Name and surname is required"),
    email: Yup.string().email().required("Must be a valid email address").max(255).required("Email is required"),
    username: Yup.string().required("Username is required").min(1),//!username and password length equals 1 for tests
    password: Yup.string().required("Password is required").min(1),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Passwords must match")
    })

  })


  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  //TODO - post login to server change state to logged in, useContext to change state
  const onSubmit = async (values, { resetForm }) => {
    if (!values.nameandsurname || !values.email || !values.username || !values.password || !values.confirmPassword) {
      return;
    }

    console.log("onsubmit")

    const newUser = {
      name: values.nameandsurname,
      email: values.email,
      userName: values.username,
      password: values.password,
      status: true
    }

    const res = await fetch("http://localhost:6180/v1/api/signup", {
      method: "POST",
      headers: header,
      body: JSON.stringify(newUser)
    });

    if (!res.ok) {
      throw new Error("HTTP error while sign up!");
    }

    notify();
    resetForm({})
    redirectLogin();
  }

  return (
    <div className=' outline outline-gray-100 rounded-3xl'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Schema}>
        {({ values, errors, handleChange, handleBlur }) => {
          return (
            <Form className='m-5 mt-11 grid place-items-center p-11'>
              <label className='block' htmlFor='nameandsurname'>Name and Surname</label>
              <Field
                className='outline mt-2 mb-2 w-1/2 rounded-lg p-1 outline-gray-500'
                name='nameandsurname'
                id='nameandsurname'
                type='text'
                value={values.nameandsurname} />
              <span className='text-red-600 font-bold'>{errors.nameandsurname}</span>
              <label className='block' htmlFor='email'>Email</label>
              <Field
                className='outline mt-2 mb-2 w-1/2 rounded-lg p-1 outline-gray-500'
                name='email'
                id='email'
                type='email'
                value={values.email} />
              <span className='text-red-600 font-bold'>{errors.email}</span>
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
                value={values.password} />
              <span className='text-red-600 font-bold'>{errors.password}</span>
              <label className='block' htmlFor='confirmPassword'>Confirm Password</label>
              <Field
                className='outline mt-2 mb-2 w-1/2 rounded-lg p-1 outline-gray-500'
                name='confirmPassword'
                id='confirmPassword'
                type='password'
                value={values.confirmPassword} />
              <span className='text-red-600 font-bold'>{errors.confirmPassword}</span>
              <button className='block w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded-lg' type='submit'>Sign Up</button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default SignupTab