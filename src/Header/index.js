import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getCurrentPrice } from '../services/apiService';
import ErrorModal from '../ErrorModal';

function Header({
    currentPrice,
    setCurrentPrice,
    radioValue,
    setRadioValue,
    selectedCountry,
    setSelectedCountry,
}) {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const countries = [
        { key: 'ee', title: 'Eesti' },
        { key: 'fi', title: 'Soome' },
        { key: 'lv', title: 'Läti' },
        { key: 'lt', title: 'Leedu' },
    ];

    useEffect(() => {
        (async function () {
            try {
                const response = await getCurrentPrice();
                setCurrentPrice(response.data[0].price);
            } catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();
    }, [setCurrentPrice]);

    const radios = [
        { name: 'Low Price', value: 'low' },
        { name: 'High price', value: 'high' },
    ];

    function handleOnChangePrice(event) {
        // event.preventDefault();
        setRadioValue(event.currentTarget.value);
    }

    function handleOnSelectCountry(key, event) {
        setSelectedCountry(countries.find(country => country.key === key));
    }

    return (
        <>
            <Row className="mt-2">
                <Col><h3>Elektrikell</h3></Col>
                <Col>
                    <DropdownButton
                        key="Secondary"
                        id={`dropdown-variants-secondary`}
                        variant="secondary"
                        onSelect={handleOnSelectCountry}
                        title={selectedCountry.title}
                        className="float-end"
                    >
                        {countries.map(country => <Dropdown.Item key={country.key} eventKey={country.key}>{country.title}</Dropdown.Item>)}

                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>Status</Col>
                <Col>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={handleOnChangePrice}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col>HIND {currentPrice}eur /MWh</Col>
            </Row>
            <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
        </>
    );
}

export default Header;