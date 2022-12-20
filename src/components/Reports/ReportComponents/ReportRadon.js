import { useLocation } from "react-router-dom";
import generatePDFRadon from "../Generators/reportGeneratorRadon";
import { CSVLink } from "react-csv";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../../BackToMainMenu';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Statistics from "../../Statistics";

const ReportRadon = () => {

    const location = useLocation();
    const { data } = location.state;
    const { labels } = location.state;
    const { firstCSVrow } = location.state;
    const dataCSV = [];
    const date = Date().split(" ");
    const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
    const statistics = Statistics([data])

    dataCSV.push([firstCSVrow[0], firstCSVrow[1]]);

    labels.forEach(label => {
        dataCSV.push([label, data[labels.indexOf(label)]])
    });

    dataCSV.push(["Promedio", statistics[0][0]])
    dataCSV.push(["Desviación estándar", statistics[1][0]])

    return (
        <div>
            <Navbar variant="dark" bg="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Reporte Radón</Navbar.Brand>
                </Container>
            </Navbar>
            <br></br>
            <Container fluid>
                <Col sm={10}>
                    <Row>
                        <Col sm={2}>
                            <BackToMainMenu></BackToMainMenu>
                        </Col>
                        <Col sm={2} style={{marginTop : "2px"}}>
                            <Button variant="primary" size="md"
                                onClick={() => generatePDFRadon(data, labels, statistics[0][0], statistics[1][0])}>
                                Generar reporte PDF
                            </Button>
                        </Col>
                        <Col sm={2} style={{marginTop : "2px"}}>
                            <CSVLink
                                data = {dataCSV}
                                filename = {`report_radon_${dateStr}.csv`}>
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
                                <th scope="col">Valor Radón</th>
                            </tr>
                        </thead>
                        <tbody>{
                            labels.map(label => (
                                <tr key={labels.indexOf(label)}>
                                    <td>{label}</td>
                                    <td>{data[labels.indexOf(label)]}</td>
                                </tr>
                            ))
                        }</tbody>
                    </Table>
                )}
            </Container>
        </div>
    );
};

export default ReportRadon;
