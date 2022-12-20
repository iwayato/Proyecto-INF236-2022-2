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

const LineChartPlotRadiometro= (props) => {

    const [numFechas, setNumFechas] = useState(100);
    const [dataUpdate, setDataUpdate] = useState(props.data);
    
    const numFechasHandler = (event) => {
        setNumFechas([Number(event.target.value)]);
        setDataUpdate([
            {
                label: 'Nivel Albedo',
                data: props.data[0].data.slice(-numFechas),
                borderColor: 'rgb(255, 111, 246)',
                backgroundColor: 'rgba(255, 111, 246, 0.5)'
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
                                to="/reportRadiometro" 
                                style={{ textDecoration: 'none', userSelect: "none"}}
                                state = {{
                                    data : dataUpdate[0].data,
                                    labels : data.labels,
                                    firstCSVrow : ["Fecha", "Albedo"]
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

export default LineChartPlotRadiometro;