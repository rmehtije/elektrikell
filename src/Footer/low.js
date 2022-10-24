import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Countdown from 'react-countdown';
import moment from 'moment';

function Low({ hourValue, setHourValue, bestTimeRange, currentPrice }) {

    const [showElement, setShowElement] = useState('countdown');
    const [time, setTime] = useState(null);

    const cheapHours = [
        { label: '1h', value: 1 },
        { label: '2h', value: 2 },
        { label: '3h', value: 3 },
        { label: '4h', value: 4 },
        { label: '6h', value: 6 },
        { label: '8h', value: 8 },
    ];

    // useEffect - react hook kotoryj zapuskaetsja posle togo kak ves' komponent vypolnel render
    // useEffect prinemajet dva argumenta
    // 1 argument eto callback funkcija kotoraja zapuskajetsa pri...
    // 2 argument massive iz zavisemostej.
    // zaisemosti eto peremennqje kotorqje ispol'zujutsja v callback funkcqii
    // zavisemosti pri izmenii zapuskajut callback funkcqiju zanogo
    // ostaviv pustoj massive v zavisemostjah tq garantirujesh 4to callback funkcija zapustitsja tol'ko odin raz 
    // dazhe pri izmeneii state, pri uslovii 4to v callbackfunkcqii tq state ne izpol'zujesh.
    useEffect(() => {
        const countDownUntil = moment.unix(bestTimeRange.timestamp).toDate();
        setTime(countDownUntil);
    }, [bestTimeRange]);

    function handleOnChange(event) {
        const hour = event.currentTarget.value;

        if(bestTimeRange.timestamp > moment().unix()) {
            setShowElement('countdown');
        } else {
            setShowElement('right now');
        }
        setHourValue(+hour);
    }

    return (
        <>
            <Row>
                <Col>
                    <ButtonGroup>
                        {cheapHours.map(hour => (
                            <ToggleButton
                                key={hour.value}
                                id={`hour-${hour.value}`}
                                type="radio"
                                name="hour"
                                value={hour.value}
                                checked={hourValue === hour.value}
                                onChange={handleOnChange}
                            >
                                {hour.label}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>Parim aeg selleks on {`${bestTimeRange.from}:00st ${bestTimeRange.until}:00ni`}, milleni on jäänud</Col>
            </Row>
            <Row>
                <Col>
                    {showElement === 'countdown' && time ? <Countdown date={time} /> : <h3>Right Now!</h3>}
                </Col>
            </Row>
            <Row>
                <Col>Siis on kilovatt-tunni hind {bestTimeRange.bestPrice} eur, 
                    mis on {Math.round(100 - bestTimeRange.bestPrice / currentPrice * 100)}% odavam kui praegu
                </Col>
            </Row>
        </>
    );
}

export default Low;
