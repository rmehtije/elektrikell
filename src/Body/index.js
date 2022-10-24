import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { getPriceData } from '../services/apiService';
import ErrorModal from '../ErrorModal';
import moment from 'moment';

function Body({
    radioValue,
    hourValue,
    setBestTimeRange,
    setWorstTimeRange,
    selectedCountry,
}) {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState(null);
    const [response, setResponse] = useState(null);
    const [hourNowI, setHourNowI] = useState(0);
    const [x1, setX1] = useState(0);
    const [x2, setX2] = useState(0);

    useEffect(() => {
        // vnutri otkrqli asynhronnuju fukncqju kotoraja momental\no i zapuskajetsa
        // немедленно вызываемая функция
        (async function () {
            // try - probujet vypol'nit' vsjo 4to v jego scope. {}
            // pri obnoruzhenii oshqbki try ostonavlivajetsa i zapuskaet catch scope {} peredav jemu oshqbku
            try {
                // my sprashevajem jest li otvet s api v sostojanii komponenta
                if (!response) {
                    // jesli netu to mq delajem zapros i sohronjajem v sostojanii komponenta
                    const response = await getPriceData();
                    setResponse(response.data);
                    return; // garantirujem 4toby kod dal'she ne vqpolnalsa
                }
                // vzjav otvet s api my vqberajem vybrannqj pol'zeateljem stranu (ee)
                // na massive s dannqmi mq zapuskajem cqcl mapkotorqjm nam vozvrashajet novqj massive 
                let priceData = response[selectedCountry.key].map(dataObject => {
                    // v cykle my s timestamp vzjali chasy "HH" i na zna4ili x i y
                    // y = cena
                    // x = vremja
                    // timestamp = unix timestamp = skol'ko sekund proshlo s 01.01.1970 
                    return {
                        x: moment.unix(dataObject.timestamp).format('HH'),
                        y: dataObject.price,
                        timestamp: dataObject.timestamp,
                    };
                });
                setData(priceData); // naznachili novqj massive s obrabotennemi dannqmi

                // izhem index v kotorom zapisan dannyj 4as
                const hourNowI = priceData.findIndex(dataObject => {
                    return dataObject.x === moment().format('HH');
                });
                setHourNowI(hourNowI);

                // vqdeljajem/filtrujem massive gde to'ko budusheje vremja poskol'ku znajem 4to budushie vremja nastupaet posle 9 indexa.
                const futureData = priceData.filter((v, i) => i >= 9);
                const areaPrices = [];

                // dopustim ishem 3 samqh deshovqh 4asov
                // zapuskajem cqcl na budushie vremena
                // kazhdqj cqcl berjot budushie 3 4asa / 3 elemnta s massiva
                // summirujet ih i zapisyvaet v novqj massive s tekushem indexom
                // takim obraom my nahodim samqj deshovqj diapozon v 3 4asa.
                futureData.forEach((v, i, arr) => {
                    const partData = arr.slice(i, i + hourValue + 1);
                    if (partData.length === hourValue + 1) {
                        let result = 0;
                        for (const p of partData) result += p.y;
                        areaPrices.push({ result, i });
                    }
                    return;
                });
                // sorterujem po summe, deshovqje v na4alo
                areaPrices.sort((a, b) => a.result - b.result);
                if (radioValue === 'low') {
                    // jesli hotim znat' samqje deshovqje ceny
                    // berjom budushie vremena i ishem objekt s cenoj po pervomu/deshovomu indexu
                    // sostovljaem nashq dannqe dlja grafika i shjot4ika
                    setBestTimeRange({
                        from: futureData[areaPrices[0].i].x,
                        until: futureData[areaPrices[0].i + hourValue].x,
                        timestamp: futureData[areaPrices[0].i].timestamp,
                        bestPrice: futureData[areaPrices[0].i].y,
                    });
                } else {
                    // jesli hotim samqje dorogi to mq perevaracheajem samqe deshovqje summq. Teper porjadom s dorogova k deshovam
                    areaPrices.reverse();
                    setWorstTimeRange({
                        from: futureData[areaPrices[0].i].x,
                        until: futureData[areaPrices[0].i + hourValue].x,
                        worstPrice: futureData[areaPrices[0].i].y,
                    });
                }
                // dobovaljajem proshloe dlja grafika i nazvachajem to4ki vqbrannogo deapozona (3 4asa)
                setX1(9 + areaPrices[0].i);
                const x2 = 9 + areaPrices[0].i + hourValue;
                setX2(x2);

            } catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();
    }, [hourValue, data, setBestTimeRange, setWorstTimeRange, radioValue, selectedCountry, response]);

    return (
        <>
            <Row>
                <Col>
                    <ResponsiveContainer width="100%" height="100%" minHeight="500px">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis dataKey="y" />
                            <Tooltip />
                            <Line type="monotone" dataKey="y" stroke="#8884d8" />
                            <ReferenceLine x={hourNowI} stroke="red" />
                            {
                                radioValue === 'low'
                                    ? <ReferenceArea x1={x1} x2={x2} stroke="green" fill="green" opacity={0.4} />
                                    : <ReferenceArea x1={x1} x2={x2} stroke="red" fill="red" opacity={0.4} />
                            }

                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
        </>
    );
}

export default Body;