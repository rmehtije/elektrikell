import High from './high';
import Low from './low';
import './footer.scss';
// biblioteka kotoraja nam pomogajet pokazqvat' te komponentq kotorqje bqli zaproshenq 4erez url.
import { Route, Routes } from 'react-router-dom';

function Footer(props) {

    // Routes eto wrapper nashqh marshrutov
    // Route eto marshrut v kotorqj peredajom komponenet 4erez props
    // path sovpodajet s nashqm url i Route renderit jego poluchennqj komponent 
    // v path 4erez : my mozhem peredat' komponent parametry url
    return (
        <div id="footer">
            <Routes>
                <Route path="/" element={<Low {...props} />} />
                <Route path="/low" element={<Low {...props} />} />
                <Route path="/low/:hours" element={<Low {...props} />} />
                <Route path="/high" element={<High />} />
            </Routes>
        </div>
    );
}

export default Footer;
