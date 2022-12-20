import { useLocation } from "react-router-dom";
import generatePDFMPGrimm from "../Generators/reportGeneratorMPGrimm";
import { CSVLink } from "react-csv";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../../BackToMainMenu';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Statistics from "../../Statistics";

const ReportMPGrimm = () => {

    const location = useLocation();
    const { PM1 } = location.state;
    const { PM25 } = location.state;
    const { PM4 } = location.state;
    const { PM10 } = location.state;
    const { TSP } = location.state;
    const { labels } = location.state;
    const { firstCSVrow } = location.state;
    const dataCSV = [];
    const date = Date().split(" ");
    const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
    const statistics = Statistics([PM1, PM25, PM4, PM10, TSP])

    dataCSV.push([firstCSVrow[0], firstCSVrow[1], firstCSVrow[2], firstCSVrow[3], firstCSVrow[4], firstCSVrow[5]]);

    labels.forEach(label => {
        dataCSV.push([label, PM1[labels.indexOf(label)], PM25[labels.indexOf(label)], PM4[labels.indexOf(label)], PM10[labels.indexOf(label)], TSP[labels.indexOf(label)]])
    });

    dataCSV.push(["Promedio", statistics[0][0], statistics[0][1], statistics[0][2], statistics[0][3], statistics[0][4]])
    dataCSV.push(["Desviación estándar", statistics[1][0], statistics[1][1], statistics[1][2], statistics[1][3], statistics[1][4]])

    return (
        <div>
            <Navbar variant="dark" bg="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Reporte MP-Grimm</Navbar.Brand>
                </Container>
            </Navbar>
            <br></br>
            <Container fluid>
                <Col sm={10}>
                    <Row>
                        <Col sm={2}>
                            <BackToMainMenu></BackToMainMenu>
                        </Col>
                        &nbsp;
                        &nbsp;
                        <Col sm={2} style={{marginTop : "1px"}}>
                            <Button variant="primary" size="md"
                                onClick={() => generatePDFMPGrimm(
                                    PM1, 
                                    PM25, 
                                    PM4, 
                                    PM10, 
                                    TSP, 
                                    labels,
                                    statistics[0],
                                    statistics[1])}>
                                Generar reporte PDF
                            </Button>
                        </Col>
                        <Col sm={2} style={{marginTop : "1px"}}>
                            <CSVLink
                                data = {dataCSV}
                                filename = {`report_mp_grimm_${dateStr}.csv`}>
                                <Button variant="success" size="md">
                                    Generar reporte CSV
                                </Button>
                            </CSVLink>
                        </Col>
                    </Row>
                </Col>
                <br></br>
                &nbsp;
                {labels.length === 0 ? ("No hay información disponible") : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Valor PM1</th>
                                <th scope="col">Valor PM25</th>
                                <th scope="col">Valor PM4</th>
                                <th scope="col">Valor PM10</th>
                                <th scope="col">Valor TSP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                labels.map(label => (
                                    <tr key={labels.indexOf(label)}>
                                        <td>{label}</td>
                                        <td>{PM1[labels.indexOf(label)]}</td>
                                        <td>{PM25[labels.indexOf(label)]}</td>
                                        <td>{PM4[labels.indexOf(label)]}</td>
                                        <td>{PM10[labels.indexOf(label)]}</td>
                                        <td>{TSP[labels.indexOf(label)]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )}
            </Container>
        </div>
    );
};

export default ReportMPGrimm;