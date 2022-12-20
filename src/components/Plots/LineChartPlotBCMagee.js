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

const LineChartPlotBCMagee = (props) => {

    const [numFechas, setNumFechas] = useState(100);
    const [dataUpdate, setDataUpdate] = useState(props.data);
    
    const numFechasHandler = (event) => {
        setNumFechas([Number(event.target.value)]);
        setDataUpdate([
            {
                label: 'Nivel BC1',
                data: props.data[0].data.slice(-numFechas),
                borderColor: 'rgb(255, 111, 246)',
                backgroundColor: 'rgba(255, 111, 246, 0.5)'
            },
            {
                label: 'Nivel BC2',
                data: props.data[1].data.slice(-numFechas),
                borderColor: 'rgb(255, 111, 174)',
                backgroundColor: 'rgba(255, 111, 174, 0.5)'
            },
            {
                label: 'Nivel BC3',
                data: props.data[2].data.slice(-numFechas),
                borderColor: 'rgb(255, 120, 111)',
                backgroundColor: 'rgba(255, 120, 111, 0.5)'
            },
            {
                label: 'Nivel BC4',
                data: props.data[3].data.slice(-numFechas),
                borderColor: 'rgb(255, 192, 111)',
                backgroundColor: 'rgba(255, 192, 111, 0.5)'
            },
            {
                label: 'Nivel BC5',
                data: props.data[4].data.slice(-numFechas),
                borderColor: 'rgb(246, 255, 111)',
                backgroundColor: 'rgba(246, 255, 111, 0.5)'
            },
            {
                label: 'Nivel BC6',
                data: props.data[5].data.slice(-numFechas),
                borderColor: 'rgb(174, 255, 111)',
                backgroundColor: 'rgba(174, 255, 111, 0.5)'
            },
            {
                label: 'Nivel BC7',
                data: props.data[6].data.slice(-numFechas),
                borderColor: 'rgb(111, 171, 255)',
                backgroundColor: 'rgba(111, 171, 255, 0.5)'
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
                                to="/reportBCMagee" 
                                style={{ textDecoration: 'none', userSelect: "none"}}
                                state = {{
                                    BC1 : dataUpdate[0].data,
                                    BC2 : dataUpdate[1].data,
                                    BC3 : dataUpdate[2].data,
                                    BC4 : dataUpdate[3].data,
                                    BC5 : dataUpdate[4].data,
                                    BC6 : dataUpdate[5].data,
                                    BC7 : dataUpdate[6].data,
                                    labels : data.labels,
                                    firstCSVrow : ["Fecha", "BC1", "BC2", "BC3", "BC4", "BC5", "BC6", "BC7"]
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

export default LineChartPlotBCMagee;