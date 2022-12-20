import Menu from '../Menu';
import { useState, useEffect } from 'react';
import axios from "axios";
import LineChartPlotMPGrimm from '../Plots/LineChartPlotMPGrimm';
import Spinner from "react-spinkit";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../BackToMainMenu';

const MPGrimm = (props) => {
    
    const url = 'http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/99ce9f80-4557-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,TSP,PM10,PM4,PM2.5,PM1&startTs=1265046352083&endTs=1665048457821'
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState();
    
    const [date, setDate] = useState([]);
    const [pm1, setPM1] = useState([]);
    const [pm25, setPM25] = useState([]);
    const [pm4, setPM4] = useState([]);
    const [pm10, setPM10] = useState([]);
    const [tsp, setTSP] = useState([]);

    var dateArray = []
    var pm1Array = []
    var pm25Array = []
    var pm4Array = []
    var pm10Array = []
    var tspArray = []

    const getData = () => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log('Se obtuvo datos');
            setDate(response.data.Fecha)
            setPM1(response.data.PM1)
            setPM25(Object.values(response.data)[2])
            setPM4(response.data.PM4)
            setPM10(response.data.PM10)
            setTSP(response.data.TSP)
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
        dateArray.push(element.value)
    });

    pm1.forEach(element => {
        pm1Array.push(element.value)
    });

    pm25.forEach(element => {
        pm25Array.push(element.value)
    });

    pm4.forEach(element => {
        pm4Array.push(element.value)
    });

    pm10.forEach(element => {
        pm10Array.push(element.value)
    });

    tsp.forEach(element => {
        tspArray.push(element.value)
    });

    var dataSets = [
        {
            label: 'Nivel PM1',
            data: pm1Array.reverse(),
            borderColor: 'rgb(6, 205, 0)',
            backgroundColor: 'rgba(6, 205, 0, 0.5)'
        },
        {
            label: 'Nivel PM2.5',
            data: pm25Array.reverse(),
            borderColor: 'rgb(0, 205, 199)',
            backgroundColor: 'rgba(0, 205, 199, 0.5)'
        },
        {
            label: 'Nivel PM4',
            data: pm4Array.reverse(),
            borderColor: 'rgb(0, 109, 205)',
            backgroundColor: 'rgba(0, 109, 205, 0.5)'
        },
        {
            label: 'Nivel PM10',
            data: pm4Array.reverse(),
            borderColor: 'rgb(97, 0, 205)',
            backgroundColor: 'rgba(97, 0, 205, 0.5)'
        },
        {
            label: 'Nivel TSP',
            data: pm4Array.reverse(),
            borderColor: 'rgb(205, 0, 0)',
            backgroundColor: 'rgba(205, 0, 0, 0.5)'
        }
    ]

    if (isLoading) {
        return(
            <div>
                <Navbar variant="dark" bg="dark">
                    <Container fluid>
                        <Navbar.Brand href="#">Sensor MP-Grimm</Navbar.Brand>
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
                    <Navbar.Brand href="#">Sensor MP-Grimm</Navbar.Brand>
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
                    <LineChartPlotMPGrimm
                        data = {dataSets}
                        date = {dateArray.reverse()}
                        title = 'Sensor MP-Grimm'
                        showLabel = {true}>
                    </LineChartPlotMPGrimm>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default MPGrimm;