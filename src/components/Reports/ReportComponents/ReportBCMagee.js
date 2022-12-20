import { useLocation } from "react-router-dom";
import generatePDFBCMagee from "../Generators/reportGeneratorBCMagee";
import { CSVLink } from "react-csv";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackToMainMenu from '../../BackToMainMenu';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Statistics from "../../Statistics";

const ReportBCMagee = () => {

    const location = useLocation();
    const { labels } = location.state;
    const { BC1 } = location.state;
    const { BC2 } = location.state;
    const { BC3 } = location.state;
    const { BC4 } = location.state;
    const { BC5 } = location.state;
    const { BC6 } = location.state;
    const { BC7 } = location.state;
    const { firstCSVrow } = location.state;
    const dataCSV = [];
    const date = Date().split(" ");
    const dateStr = date[0] + "_" + date[1] + "_" + date[2] + "_" + date[3];
    const statistics = Statistics([BC1, BC2, BC3, BC4, BC5, BC6, BC7])

    dataCSV.push([firstCSVrow[0], firstCSVrow[1], firstCSVrow[2], firstCSVrow[3], firstCSVrow[4], firstCSVrow[5], firstCSVrow[6], firstCSVrow[7]]);

    labels.forEach(label => {
        dataCSV.push([label, BC1[labels.indexOf(label)], BC2[labels.indexOf(label)], BC3[labels.indexOf(label)], BC4[labels.indexOf(label)], BC5[labels.indexOf(label)], BC6[labels.indexOf(label)], BC7[labels.indexOf(label)]])
    });

    dataCSV.push(["Promedio", statistics[0][0], statistics[0][1], statistics[0][2], statistics[0][3], statistics[0][4], statistics[0][5], statistics[0][6]])
    dataCSV.push(["Desviación estándar", statistics[1][0], statistics[1][1], statistics[1][2], statistics[1][3], statistics[1][4], statistics[1][5], statistics[1][6]])

    return (
        <div>
            <Navbar variant="dark" bg="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Reporte BC-Magee</Navbar.Brand>
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
                                onClick={() => generatePDFBCMagee(
                                    BC1, 
                                    BC2, 
                                    BC3, 
                                    BC4, 
                                    BC5, 
                                    BC6, 
                                    BC7, 
                                    labels,
                                    statistics[0],
                                    statistics[1])}>
                                Generar reporte PDF
                            </Button>
                        </Col>
                        <Col sm={2} style={{marginTop : "1px"}}>
                            <CSVLink
                                data = {dataCSV}
                                filename = {`report_bc_magee_${dateStr}.csv`}>
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
                                <th scope="col">Valor BC1</th>
                                <th scope="col">Valor BC2</th>
                                <th scope="col">Valor BC3</th>
                                <th scope="col">Valor BC4</th>
                                <th scope="col">Valor BC5</th>
                                <th scope="col">Valor BC6</th>
                                <th scope="col">Valor BC7</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                labels.map(label => (
                                    <tr key={labels.indexOf(label)}>
                                        <td>{label}</td>
                                        <td>{BC1[labels.indexOf(label)]}</td>
                                        <td>{BC2[labels.indexOf(label)]}</td>
                                        <td>{BC3[labels.indexOf(label)]}</td>
                                        <td>{BC4[labels.indexOf(label)]}</td>
                                        <td>{BC5[labels.indexOf(label)]}</td>
                                        <td>{BC6[labels.indexOf(label)]}</td>
                                        <td>{BC7[labels.indexOf(label)]}</td>
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

export default ReportBCMagee;