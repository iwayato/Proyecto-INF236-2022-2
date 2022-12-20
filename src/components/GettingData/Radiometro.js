import Menu from '../Menu';
import { useState, useEffect } from 'react';
import axios from "axios";
import LineChartPlotRadiometro from '../Plots/LineChartPlotRadiometro';
import Spinner from "react-spinkit";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../BackToMainMenu';

const Radiometro = (props) => {

    const url = 'http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/efdd9590-4550-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,Hora,Albedo&startTs=1265046352083&endTs=1665044947549'
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState();
    
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [data, setData] = useState([]);

    var dateArray = []
    var dataArray = []

    const getData = () => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log('Se obtuvo datos');
            setDate(response.data.Fecha)
            setData(response.data.Albedo)
            setTime(response.data.Hora)
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            axios.post(props.urlPost, {
                "username":"alumnos@alumnos.org", 
                "password":"m7a/s99"
            })
            .then((response) => {
                console.log('Token expirado, se obtiene uno nuevo');
                setToken(response.data.token)
            })
            .catch((error) => {
                console.log(error);
            })
        })
    };

    /* Si el segundo argumento (array) esta vacio, el request se ejecuta cuando se monta el componente */
    // eslint-disable-next-line
    useEffect(getData, [token]);

    date.forEach(element => {
        dateArray.push(element.value + ' ' + time[date.indexOf(element)].value)
    });

    data.forEach(element => {
        dataArray.push(element.value)
    });

    var dataSets = [
        {
            label: 'Nivel Albedo',
            data: dataArray.reverse(),
            borderColor: 'rgb(255, 111, 246)',
            backgroundColor: 'rgba(255, 111, 246, 0.5)'
        }
    ]

    if (isLoading) {
        return(
            <div>
                <Navbar variant="dark" bg="dark">
                    <Container fluid>
                        <Navbar.Brand href="#">Sensor Radiómetro</Navbar.Brand>
                    </Container>
                </Navbar>
                <br></br>
                <Container fluid>
                    <Row>
                        <Col xs = {2}>
                            <BackToMainMenu></BackToMainMenu>
                            <br></br>
                            <Menu></Menu>
                        </Col>
                    </Row>
                    <div style={{display : "flex", justifyContent : "center"}}>
                        <Spinner name="circle" color="#17252A" style={{ width: 120, height: 120 }}/>
                    </div>
                </Container>
            </div>
        ) 
    }

    return(
        <div>
            <Navbar variant="dark" bg="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Sensor Radiómetro</Navbar.Brand>
                </Container>
            </Navbar>
            <br></br>
            <Container fluid>
            <Row>
                <Col xs = {2}>
                    <BackToMainMenu></BackToMainMenu>
                    <br></br>
                    <Menu></Menu>
                </Col>
                <Col md = {10}>
                    <LineChartPlotRadiometro
                        data = {dataSets}
                        date = {dateArray.reverse()}
                        title = 'Sensor Radiómetro'
                        showLabel = {false}>
                    </LineChartPlotRadiometro>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Radiometro;