import { useLocation } from "react-router-dom";
import generatePDFMulti from "../Generators/reportGeneratorMulti";
import { CSVLink } from "react-csv";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../../BackToMainMenu';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Statistics from "../../Statistics";

const ReportMulti = () => {

    const location = useLocation();
    const { BP } = location.state;
    const { RH } = location.state;
    const { Temperatura } = location.state;
    const { WD } = location.state;
    const { WS } = location.state;
    const { labels } = location.state;
    const { firstCSVrow } = location.state;
    const dataCSV = [];
    const date = Date().split(" ");
    const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
    const statistics = Statistics([BP, RH, Temperatura, WD, WS])

    dataCSV.push([firstCSVrow[0], firstCSVrow[1], firstCSVrow[2], firstCSVrow[3], firstCSVrow[4], firstCSVrow[5]]);

    labels.forEach(label => {
        dataCSV.push([label, BP[labels.indexOf(label)], RH[labels.indexOf(label)], Temperatura[labels.indexOf(label)], WD[labels.indexOf(label)], WS[labels.indexOf(label)]])
    });

    dataCSV.push(["Promedio", statistics[0][0], statistics[0][1], statistics[0][2], statistics[0][3], statistics[0][4]])
    dataCSV.push(["Desviación estándar", statistics[1][0], statistics[1][1], statistics[1][2], statistics[1][3], statistics[1][4]])

    return (
        <div>
            <Navbar variant="dark" bg="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Reporte Multiparámetro</Navbar.Brand>
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
                                onClick={() => generatePDFMulti(
                                    BP, 
                                    RH, 
                                    Temperatura, 
                                    WD, 
                                    WS, 
                                    labels,
                                    statistics[0],
                                    statistics[1])}>
                                Generar reporte PDF
                            </Button>
                        </Col>
                        <Col sm={2} style={{marginTop : "1px"}}>
                            <CSVLink
                                data = {dataCSV}
                                filename = {`report_multiparametro_${dateStr}.csv`}>
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
                                <th scope="col">Valor BP</th>
                                <th scope="col">Valor RH</th>
                                <th scope="col">Valor Temperatura</th>
                                <th scope="col">Valor WD</th>
                                <th scope="col">Valor WS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                labels.map(label => (
                                    <tr key={labels.indexOf(label)}>
                                        <td>{label}</td>
                                        <td>{BP[labels.indexOf(label)]}</td>
                                        <td>{RH[labels.indexOf(label)]}</td>
                                        <td>{Temperatura[labels.indexOf(label)]}</td>
                                        <td>{WD[labels.indexOf(label)]}</td>
                                        <td>{WS[labels.indexOf(label)]}</td>
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

export default ReportMulti;