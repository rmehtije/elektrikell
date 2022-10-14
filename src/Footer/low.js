import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Countdown from 'react-countdown';

function Low({ hourValue, setHourValue }) {
    console.log('Render LowCompomnet');
    const endOfDay = new Date().setHours(23, 59, 59, 999);
    const [showElement, setShowElement] = useState('countdown');
    const [time, setTime] = useState(endOfDay);

    const cheapHours = [
        { label: '1h', value: '1' },
        { label: '2h', value: '2' },
        { label: '3h', value: '3' },
        { label: '4h', value: '4' },
        { label: '6h', value: '6' },
        { label: '8h', value: '8' },
    ];

    // object sobitija (event) derzhqt v sebe informaciju o elemente nad kotorqm bqlo soversheno dejstvije
    function handleOnChange(event) {
        console.log('event.target', event.target);
        console.log('event.currentTarget', event.currentTarget);
        const hour = event.currentTarget.value;
        const newDate = new Date().setHours(23 - hour, 59, 59, 999);
        if(newDate - Date.now() <= 0) {
            setShowElement('right now');
        } else {
            setShowElement('countdown');
        }
        setTime(newDate);
        setHourValue(event.currentTarget.value);
    }

    // onChange = trigger sobitija.
    // Sobitije k nam prihodit ot brauzera a k brauzeru prihodit ot pol'zovatelja.
    // onChange zapuskajetsa kogda pol'zovatel' sdelal izmenenija v input elementah.(radio button)
    // onChange zapuskajet funkcqii kotoryh mq nazqvajem obrabotchikami. V obrabotchink trigger sobitija otprovljajet object sobitja (event)
    // triggery sobitij vsegda nachenajutsa s 'on'
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
                <Col>Parim aeg selleks on 0:00st 1:00ni, milleni on jäänud</Col>
            </Row>
            <Row>
                <Col>
                    {showElement === 'countdown' ? <Countdown date={time} /> : <h3>Right Now!</h3>}
                </Col>
            </Row>
            <Row>
                <Col>Siis on kilovatt-tunni hind 11.30 senti, mis on 75% odavam kui praegu</Col>
            </Row>
        </>
    );
}

export default Low;
