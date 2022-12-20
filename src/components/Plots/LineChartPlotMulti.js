import classes from '../../style/Graph.module.css'
import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChartPlotMulti = (props) => {

    const [numFechas, setNumFechas] = useState(100);
    const [dataUpdate, setDataUpdate] = useState(props.data);
    
    const numFechasHandler = (event) => {
        setNumFechas([Number(event.target.value)]);
        setDataUpdate([
            {
                label: 'Nivel BP',
                data: props.data[0].data.slice(-numFechas),
                borderColor: 'rgb(112, 218, 255 )',
                backgroundColor: 'rgba(112, 218, 255, 0.5)'
            },
            {
                label: 'Nivel RH',
                data: props.data[1].data.slice(-numFechas),
                borderColor: 'rgb(120, 255, 111)',
                backgroundColor: 'rgba(120, 255, 111, 0.5)'
            },
            {
                label: 'Nivel Temperatura',
                data: props.data[2].data.slice(-numFechas),
                borderColor: 'rgb(255, 111, 111 )',
                backgroundColor: 'rgba(255, 111, 111, 0.5)'
            },
            {
                label: 'Nivel WD',
                data: props.data[3].data.slice(-numFechas),
                borderColor: 'rgb(255, 111, 246)',
                backgroundColor: 'rgba(255, 111, 246, 0.5)'
            },
            {
                label: 'Nivel WS',
                data: props.data[4].data.slice(-numFechas),
                borderColor: 'rgb(255, 192, 111)',
                backgroundColor: 'rgba(255, 192, 111, 0.5)'
            }
        ])
    }
    
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: props.title,
            },
            legend: { display: props.showLabel },
        },
        maintainAspectRatio: false,
    };
    
    const data = {
        labels: props.date.slice(-numFechas),
        datasets: dataUpdate
    };

    return (
        <Container fluid>
            <Col>
                <Row>
                    <ListGroup horizontal>
                        <ListGroup.Item>
                            Fechas a mostrar :   
                            <input
                                className={classes.Input}
                                type='number'
                                name='dates_sel'
                                value={numFechas}
                                onChange={numFechasHandler}
                                min={0}
                                max={100}>       
                            </input>
                            más recientes
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link 
                                to="/reportMulti" 
                                style={{ textDecoration: 'none', userSelect: "none"}}
                                state = {{
                                    BP : dataUpdate[0].data,
                                    RH : dataUpdate[1].data,
                                    Temperatura : dataUpdate[2].data,
                                    WD : dataUpdate[3].data,
                                    WS : dataUpdate[4].data,
                                    labels : data.labels,
                                    firstCSVrow : ["Fecha", "BP", "RH", "Temperatura", "WD", "WS"]
                                }}>
                                Generar reporte
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
                <br></br>
                <Row>
                    <div className={classes.Plots}>
                        <Line options={options} data={data}/>
                    </div>
                </Row>
            </Col>
        </Container>
    );
};

export default LineChartPlotMulti;