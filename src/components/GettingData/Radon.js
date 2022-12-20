import Menu from '../Menu';
import { useState, useEffect } from 'react';
import axios from "axios";
import LineChartPlotRadon from '../Plots/LineChartPlotRadon';
import Spinner from "react-spinkit";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../BackToMainMenu';

const Radon = (props) => {

    const url = 'http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/723d0580-452d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,Radon&startTs=1265046352083&endTs=1665029708303'
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState(" ");

    const [data, setData] = useState([]);
    const [date, setDate] = useState([]);
    
    var dataArray = []
    var dateArray = []
    
    const getData = () => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log('Se obtuvo datos');
            setData(response.data.Radon)
            setDate(response.data.Fecha)
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

    data.forEach(element => {
        dataArray.push(element.value)
    });

    date.forEach(element => {
        dateArray.push(element.value)
    });

    var dataSets = [
        {
            label: 'Nivel radón',
            data: dataArray.reverse(),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
    ]

    if (isLoading) {
        return(
            <div>
                <Navbar variant="dark" bg="dark">
                    <Container fluid>
                        <Navbar.Brand href="#">Sensor Radón</Navbar.Brand>
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
                    <Navbar.Brand href="#">Sensor Radón</Navbar.Brand>
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
                        <LineChartPlotRadon
                            data = {dataSets}
                            date = {dateArray.reverse()}
                            title = 'Sensor radón'
                            showLabel = {false}>
                        </LineChartPlotRadon>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Radon;