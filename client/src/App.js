import { Routes, Route } from 'react-router-dom';
import Container from './components/layout/Container/Container';
import Home from './components/pages/Home/Home';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';

const App = () => {
  return(
    <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PageNotFound />} />
          </Routes>
        </Container>      
    </main>
  )
};

export default App;