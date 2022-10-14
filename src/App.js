import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

// App - react component, napisan 4erez funkciju.
// Componenty vsegda nachenajutsa s Zaglavnoj bukvy. 
// Componenty kak i funkcqii prinemajut argumenty tolko nazevajutsa oni tut properties(props)
// Component vozvrashajet(return) React element/JSX;
// React element dolzhen soderzhat' tol'ko odin zaglavnqj element
function App() {
  console.log('render APP');
  const [radioValue, setRadioValue] = useState('low');
  const [hourValue, setHourValue] = useState(1);
  // useState - eto react hook, pozvoljajushij rabotat' s sostajaniem komponenta
  // useState prinemajet kak argument iznachal'noe sostojanije. radioValue = 'low';
  // useState vozvrashajet massive iz dvuh elementov
  // [1] = izochal'noe ili novoe znachenie sostojanija/peremennoj
  // [2] = funkciju kotoraja mozhet izmenit' znachenije sostojanija/peremennoj
  // pri izmanenii sostojanija zapuskajetsja rerender componenta
  // vse nazvanija react hookov nachenajetsa s 'use'; vse funkcii izmenenija sostojanija nachenajutsa s 'set'
  return (
    <Container>
      <Header setRadioValue={setRadioValue} radioValue={radioValue}/>
      <Body radioValue={radioValue} hourValue={hourValue} />
      <Footer radioValue={radioValue} hourValue={hourValue} setHourValue={setHourValue} />
    </Container>
  );
}

export default App;
