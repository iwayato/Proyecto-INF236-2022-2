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

const LineChartPlotMPGrimm = (props) => {

    const [numFechas, setNumFechas] = useState(100);
    const [dataUpdate, setDataUpdate] = useState(props.data);
    
    const numFechasHandler = (event) => {
        setNumFechas([Number(event.target.value)]);
        setDataUpdate([
            {
                label: 'Nivel PM1',
                data: props.data[0].data.slice(-numFechas),
                borderColor: 'rgb(6, 205, 0)',
                backgroundColor: 'rgba(6, 205, 0, 0.5)'
            },
            {
                label: 'Nivel PM2.5',
                data: props.data[1].data.slice(-numFechas),
                borderColor: 'rgb(0, 205, 199)',
                backgroundColor: 'rgba(0, 205, 199, 0.5)'
            },
            {
                label: 'Nivel PM4',
                data: props.data[2].data.slice(-numFechas),
                borderColor: 'rgb(0, 109, 205)',
                backgroundColor: 'rgba(0, 109, 205, 0.5)'
            },
            {
                label: 'Nivel PM10',
                data: props.data[3].data.slice(-numFechas),
                borderColor: 'rgb(97, 0, 205)',
                backgroundColor: 'rgba(97, 0, 205, 0.5)'
            },
            {
                label: 'Nivel TSP',
                data: props.data[4].data.slice(-numFechas),
                borderColor: 'rgb(205, 0, 0)',
                backgroundColor: 'rgba(205, 0, 0, 0.5)'
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
                                to="/reportMPGrimm" 
                                style={{ textDecoration: 'none', userSelect: "none"}}
                                state = {{
                                    PM1 : dataUpdate[0].data,
                                    PM25 : dataUpdate[1].data,
                                    PM4 : dataUpdate[2].data,
                                    PM10 : dataUpdate[3].data,
                                    TSP : dataUpdate[4].data,
                                    labels : data.labels,
                                    firstCSVrow : ["Fecha", "PM1", "PM2.5", "PM4", "PM10", "TSP"]
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

export default LineChartPlotMPGrimm;