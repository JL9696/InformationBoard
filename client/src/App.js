import { Routes, Route } from 'react-router-dom';
import Container from './components/layout/Container/Container';
import Home from './components/pages/Home/Home';
import Ad from './components/pages/Ad/Ad';
import AdAdd from './components/pages/AdAdd/AdAdd';
import AddEdit from './components/pages/AddEdit/AddEdit';
import AdRemove from './components/pages/AdRemove/AdRemove';
import Search from './components/pages/Search/Search';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import React from 'react';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logIn } from '../src/redux/usersRedux';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if(loggedInUser){
      dispatch(logIn({ login: loggedInUser}));
    }
  }, [dispatch]);
  
  return(
    <main>
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ad/:id" element={<Ad />} />
            <Route path="/ad/add" element={<AdAdd />} />
            <Route path="/ad/edit/:id" element={<AddEdit />} />
            <Route path="/ad/remove/:id" element={<AdRemove />} />
            <Route path="/search/:searchPharse" element={<Search />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Container>      
    </main>
  )
};

export default App;