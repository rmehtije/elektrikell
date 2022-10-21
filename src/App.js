import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

function App() {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [radioValue, setRadioValue] = useState('low');
  const [hourValue, setHourValue] = useState(1);
  const [bestTimeRange, setBestTimeRange] = useState({
    from: 0,
    until: 0,
    timestamp: null,
    bestPrice: 0,
  });
  const [worstTimeRange, setWorstTimeRange] = useState({
    from: 0,
    until: 0,
    worstPrice: 0,
  });

  return (
    <Container>
      <Header 
        setRadioValue={setRadioValue} 
        radioValue={radioValue} 
        currentPrice={currentPrice}
        setCurrentPrice={setCurrentPrice}/>
      <Body 
        radioValue={radioValue}
        hourValue={hourValue} 
        setBestTimeRange={setBestTimeRange} 
        setWorstTimeRange={setWorstTimeRange}/>
      <Footer 
        radioValue={radioValue} 
        hourValue={hourValue} 
        setHourValue={setHourValue} 
        bestTimeRange={bestTimeRange}
        currentPrice={currentPrice}
        worstTimeRange={worstTimeRange}/>
    </Container>
  );
}

export default App;
