import Menu from '../Menu';
import { useState, useEffect } from 'react';
import axios from "axios";
import LineChartPlotBCMagee from '../Plots/LineChartPlotBCMagee'
import Spinner from "react-spinkit";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../BackToMainMenu';

const BCMagee = (props) => {

    const url = 'http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/8c5ad790-454f-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Date,Time,BC1,BC2,BC3,BC4,BC5,BC6,BC7&startTs=1265046352083&endTs=1665044358966'
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState();
    
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [bc1, setBC1] = useState([]);
    const [bc2, setBC2] = useState([]);
    const [bc3, setBC3] = useState([]);
    const [bc4, setBC4] = useState([]);
    const [bc5, setBC5] = useState([]);
    const [bc6, setBC6] = useState([]);
    const [bc7, setBC7] = useState([]);

    var dateArray = []
    var bc1Array = []
    var bc2Array = []
    var bc3Array = []
    var bc4Array = []
    var bc5Array = []
    var bc6Array = []
    var bc7Array = []

    const getData = () => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log('Se obtuvo datos');
            setDate(response.data.Date)
            setTime(response.data.Time)
            setBC1(response.data.BC1)
            setBC2(response.data.BC2)
            setBC3(response.data.BC3)
            setBC4(response.data.BC4)
            setBC5(response.data.BC5)
            setBC6(response.data.BC6)
            setBC7(response.data.BC7)
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

    bc1.forEach(element => {
        bc1Array.push(element.value)
    });

    bc2.forEach(element => {
        bc2Array.push(element.value)
    });

    bc3.forEach(element => {
        bc3Array.push(element.value)
    });

    bc4.forEach(element => {
        bc4Array.push(element.value)
    });

    bc5.forEach(element => {
        bc5Array.push(element.value)
    });

    bc6.forEach(element => {
        bc6Array.push(element.value)
    });

    bc7.forEach(element => {
        bc7Array.push(element.value)
    });

    var dataSets = [
        {
            label: 'Nivel BC1',
            data: bc1Array.reverse(),
            borderColor: 'rgb(255, 111, 246)',
            backgroundColor: 'rgba(255, 111, 246, 0.5)'
        },
        {
            label: 'Nivel BC2',
            data: bc2Array.reverse(),
            borderColor: 'rgb(255, 111, 174)',
            backgroundColor: 'rgba(255, 111, 174, 0.5)'
        },
        {
            label: 'Nivel BC3',
            data: bc3Array.reverse(),
            borderColor: 'rgb(255, 120, 111)',
            backgroundColor: 'rgba(255, 120, 111, 0.5)'
        },
        {
            label: 'Nivel BC4',
            data: bc4Array.reverse(),
            borderColor: 'rgb(255, 192, 111)',
            backgroundColor: 'rgba(255, 192, 111, 0.5)'
        },
        {
            label: 'Nivel BC5',
            data: bc5Array.reverse(),
            borderColor: 'rgb(246, 255, 111)',
            backgroundColor: 'rgba(246, 255, 111, 0.5)'
        },
        {
            label: 'Nivel BC6',
            data: bc6Array.reverse(),
            borderColor: 'rgb(174, 255, 111)',
            backgroundColor: 'rgba(174, 255, 111, 0.5)'
        },
        {
            label: 'Nivel BC7',
            data: bc7Array.reverse(),
            borderColor: 'rgb(111, 171, 255)',
            backgroundColor: 'rgba(111, 171, 255, 0.5)'
        }
    ]

    if (isLoading) {
        return(
            <div>
                <Navbar variant="dark" bg="dark">
                    <Container fluid>
                        <Navbar.Brand href="#">Sensor BC-Magee</Navbar.Brand>
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
                    <Navbar.Brand href="#">Sensor BC-Magee</Navbar.Brand>
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
                    <LineChartPlotBCMagee
                        data = {dataSets}
                        date = {dateArray.reverse()}
                        title = 'Sensor BC-Magee'
                        showLabel = {true}>
                    </LineChartPlotBCMagee>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default BCMagee;