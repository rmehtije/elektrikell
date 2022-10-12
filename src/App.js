import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

function App() {
  const [radioValue, setRadioValue] = useState('1');

  return (
    <Container>
      <Header setRadioValue={setRadioValue} radioValue={radioValue}/>
      <Body radioValue={radioValue}/>
      <Footer radioValue={radioValue}/>
    </Container>
  );
}

export default App;
