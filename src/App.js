import './App.scss';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

function App() {
  console.log('App render');
  return (
    <Container>
      <Header />
      <Body />
      <Footer />
    </Container>
  );
}

export default App;
