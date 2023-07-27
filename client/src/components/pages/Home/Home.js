import React from 'react';
import Navbar from '../../layout/Navbar/Navbar';
import Footer from '../../layout/Footer/Footer';
import SearchForm from '../../features/SearchForm/SearchForm';

const Home = () => {
  return(
    <>
      <Navbar />
      <SearchForm />
      <Footer />
    </>     
  );
};

export default Home;