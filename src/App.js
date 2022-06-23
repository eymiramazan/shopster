import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import { ToastContainer, toast } from 'react-toastify';
import CheckoutPage from './components/CheckoutPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);//normalde false olması lazım

  useEffect(() => {
    if (localStorage.getItem("userId") !== null && localStorage.getItem("token") !== null) {
      setLoggedIn(true)
    }
  }, [])

  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }

  const notifyLoginError = () => toast.error("Kullanıcı Adı veya Şifre Hatalı!");

  const handleLogin = async (name, password) => {
    console.log("name", name);
    console.log("password", password);
    const response = await fetch("http://localhost:6180/v1/api/login", {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userName": name,
        "password": password
      }),
    });

    if (!response.ok) {
      notifyLoginError();
      throw new Error("Username or password is incorrect!")
    }

    const data = await response.json();

    const response1 = await fetch(`http://localhost:6180/users/username/${name}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${data.data}`
      }
    })

    const data1 = await response1.json();
    localStorage.setItem("userId", data1.data.id);
    localStorage.setItem("token", data.data);
    console.log(data);
    setLoggedIn(true);
  }

  const handleLogout = () => {
    console.log("clicked");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <div className='App'>
      {!loggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
            <Route path="*" element={<LoginPage handleLogin={handleLogin} />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      ) : (<BrowserRouter>
        <Routes>
          <Route path='/home' element={<Layout handleLogout={handleLogout} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>)}
    </div>
  );
}

export default App;
