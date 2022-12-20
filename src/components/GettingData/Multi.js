import Menu from '../Menu';
import { useState, useEffect } from 'react';
import axios from "axios";
import LineChartPlotMulti from '../Plots/LineChartPlotMulti';
import Spinner from "react-spinkit";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../BackToMainMenu';

const Multi = (props) => {

    const url = 'http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/101d2fe0-454d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=TIMESTAMP,WS,WD,Temp,RH,BP,Depth &startTs=1265046352083&endTs=1665043961492'
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState();
    
    const [date, setDate] = useState([]);
    const [bp, setBP] = useState([]);
    const [rh, setRH] = useState([]);
    const [temp, setTemp] = useState([]);
    const [wd, setWD] = useState([]);
    const [ws, setWS] = useState([]);

    var dateArray = []
    var bpArray = []
    var rhArray = []
    var tempArray = []
    var wdArray = []
    var wsArray = []

    const getData = () => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log('Se obtuvo datos');
            setDate(response.data.TIMESTAMP)
            setBP(response.data.BP)
            setRH(response.data.RH)
            setTemp(response.data.Temp)
            setWD(response.data.WD)
            setWS(response.data.WS)
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

    // eslint-disable-next-line
    useEffect(getData, [token]);

    date.forEach(element => {
        dateArray.push(element.value)
    });

    bp.forEach(element => {
        bpArray.push(element.value)
    });

    rh.forEach(element => {
        rhArray.push(element.value)
    });

    temp.forEach(element => {
        tempArray.push(element.value)
    });

    wd.forEach(element => {
        wdArray.push(element.value)
    });

    ws.forEach(element => {
        wsArray.push(element.value)
    });

    var dataSets = [
        {
            label: 'Nivel BP',
            data: bpArray.reverse(),
            borderColor: 'rgb(112, 218, 255 )',
            backgroundColor: 'rgba(112, 218, 255, 0.5)'
        },
        {
            label: 'Nivel RH',
            data: rhArray.reverse(),
            borderColor: 'rgb(120, 255, 111)',
            backgroundColor: 'rgba(120, 255, 111, 0.5)'
        },
        {
            label: 'Nivel Temperatura',
            data: rhArray.reverse(),
            borderColor: 'rgb(255, 111, 111 )',
            backgroundColor: 'rgba(255, 111, 111, 0.5)'
        },
        {
            label: 'Nivel WD',
            data: rhArray.reverse(),
            borderColor: 'rgb(255, 111, 246)',
            backgroundColor: 'rgba(255, 111, 246, 0.5)'
        },
        {
            label: 'Nivel WS',
            data: rhArray.reverse(),
            borderColor: 'rgb(255, 192, 111)',
            backgroundColor: 'rgba(255, 192, 111, 0.5)'
        }
    ]

    if (isLoading) {
        return(
            <div>
                <Navbar variant="dark" bg="dark">
                    <Container fluid>
                        <Navbar.Brand href="#">Sensor Multiparámetro</Navbar.Brand>
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
                    <Navbar.Brand href="#">Sensor Multiparámetro</Navbar.Brand>
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
                    <LineChartPlotMulti
                        data = {dataSets}
                        date = {dateArray.reverse()}
                        title = 'Sensor Multiparámetro'
                        showLabel = {true}>
                    </LineChartPlotMulti>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Multi;