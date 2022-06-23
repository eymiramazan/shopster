import React from 'react'
import LoginTab from '../components/LoginTab';
import SignupTab from '../components/SignupTab';
// import logo from '../assets/logo1.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ handleLogin }) => {
  const [tab, setTab] = React.useState('login');

  const handleLoginTabClick = () => {
    setTab('login');
  }

  const handleSignupTabClick = () => {
    setTab('signup');
  }

  const notify = () => toast.success("Signup Successfull! Please login.");


  return (
    <div>
      <div className="w-1/2 mb-3 mx-auto mt-3 flex text-center">
        <div>
          {/* <img className='object-scale-down h-24 w-24' src={logo} alt="some example image" /> */}
        </div>
        <div>
          <h1 className='mt-5 ml-3 text-3xl font-bold'>Welcome To Shopster</h1>
        </div>
      </div>
      <hr className='w-1/2 mx-auto border-black' />
      <div className='w-1/2 mx-auto mt-12'>
        <div className='grid grid-cols-2 text-center h-16'>
          <div onClick={handleLoginTabClick} className='bg-gray-100 rounded-3xl m-1 cursor-pointer'>
            <div className='mt-3'>
              <span className={tab === 'login' ? 'inline-block text-xl font-bold' : 'inline-block text-xl'}>
                Login
              </span>
            </div>
          </div>
          <div onClick={handleSignupTabClick} className='bg-gray-100 rounded-3xl m-1 cursor-pointer'>
            <div className='mt-3'>
              <span className={tab === 'signup' ? 'inline-block text-xl font-bold' : 'inline-block text-xl'}>
                Signup
              </span>
            </div>
          </div>
        </div >
        <div>
          {tab === 'login' ? (
            <LoginTab handleLogin={handleLogin} />
          ) : (
            <SignupTab redirectLogin={handleLoginTabClick} notify={notify} />
          )}
        </div>
      </div >
      <ToastContainer />
    </div>
  )
}


export default Login