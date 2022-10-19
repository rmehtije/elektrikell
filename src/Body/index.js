import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { getPriceData } from '../services/apiService';
import ErrorModal from '../ErrorModal';
import moment from 'moment';

function Body({hourValue}) {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([]);
    const [hourNowI, setHourNowI] = useState(0);
    const [x1, setX1] = useState(0);
    const [x2, setX2] = useState(0);

    useEffect(() => {
        (async function () {
            try {
                const response = await getPriceData();
                const data = response.data.ee.map(dataObject => {
                    return {
                        x: moment.unix(dataObject.timestamp).format('HH'),
                        y: dataObject.price
                    };
                });
                const hourNowI = data.findIndex(dataObject => {
                    return dataObject.x === moment().format('HH');
                });
                setHourNowI(hourNowI);
                setData(data);
                const futureData = data.filter((v, i) => i >= 9);
                const areaPrices = [];
                futureData.forEach((v, i, arr) => {
                    const partData = arr.slice(i, i + hourValue);
                    if(partData.length === hourValue) {
                        let result = 0;
                        for(const p of partData) result += p.y;
                        areaPrices.push({result, i});
                    }
                    return;
                });
                areaPrices.sort((a,b) => a.result - b.result);

                setX1(9 + areaPrices[0].i);
                const x2 = 9 + areaPrices[0].i + hourValue;
                setX2(x2);

                
                // const futureData = data.filter((v, i) => i >= 9);
                // futureData.sort((a, b) => a.y - b.y);
                // console.log(futureData);
                // const x1 = data.findIndex(dataObject => {
                //     return dataObject.y === futureData[0].y;
                // });
                // setX1(x1);
                // setX2(x1 + 1);
            } catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();
    }, [hourValue]);
    console.log('x1', x1, 'x2', x2);
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
                            <ReferenceArea x1={x1} x2={x2} stroke="green" fill="green" opacity={0.4} />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
        </>
    );
}

export default Body;