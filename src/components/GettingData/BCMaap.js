import Menu from '../Menu';
import { useState, useEffect } from 'react';
import axios from "axios";
import LineChartPlotBCMaap from '../Plots/LineChartPlotBCMaap';
import Spinner from "react-spinkit";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../BackToMainMenu';

const BCMaap = (props) => {
    
    const url = 'http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/6a4dd7a0-4550-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=fecha,hora,BC&startTs=1265046352083&endTs=1665044739122'
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState();
    
    const [date, setDate] = useState([]);
    const [data, setData] = useState([]);
    const [time, setTime] = useState([]);

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
            setData(response.data.BC)
            setDate(response.data.fecha)
            setTime(response.data.hora)
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
            label: 'Nivel BC',
            data: dataArray,
            borderColor: 'rgb(6, 205, 0)',
            backgroundColor: 'rgba(6, 205, 0, 0.5)'
        }
    ]

    if (isLoading) {
        return(
            <div>
                <Navbar variant="dark" bg="dark">
                    <Container fluid>
                        <Navbar.Brand href="#">Sensor BC-Maap</Navbar.Brand>
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
                    <Navbar.Brand href="#">Sensor BC-Maap</Navbar.Brand>
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
                    <LineChartPlotBCMaap
                        data = {dataSets}
                        date = {dateArray}
                        title = 'Sensor BC-Maap'
                        showLabel = {false}>
                    </LineChartPlotBCMaap>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default BCMaap;