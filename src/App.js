//import classes from "./style/Graph.module.css";
import Menu from "./components/Menu";
import Credits from "./components/Credits";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArquitecturaFront from './assets/arquitectura_front.png';

function App() {
  return (
      <div>
        <Navbar variant="dark" bg="dark">
          <Container fluid>
            <Navbar.Brand href="#">DashBoard Proyecto INF236</Navbar.Brand>
          </Container>
        </Navbar>
        <br></br>
        <Container fluid>
          <Row>
            <Col xs = {2}>
              <Menu></Menu>
              <br></br>
              <Credits></Credits>
            </Col>
            <Col>
              <div>
                <h2 style={{ userSelect: "none" }}>
                  Descripción del proyecto
                </h2>
                <p>
                  • A partir de una API entregada por el cliente, de la cual se pueden obtener datos tomados por
                  diferentes sensores, la presente plataforma los representa gráficamente en el dominio temporal.
                </p>
                <p>
                  • El usuario es capaz de seleccionar un rango de tiempo para el cual mostrar los datos más recientes.
                </p>
                <p>
                  • Adicionalmente, el usuario puede generar reportes en formato <em>pdf</em> o <em>csv</em> con los datos
                  correspondientes al sensor y rango temporal seleccionado.
                </p>
                <br></br>
                <h3>Arquitectura implementada</h3>
                <p>
                  • Dado que la componente <em>BackEnd</em> del proyecto fue previamente facilitada, a continuación
                  se presentan las tecnologías utilizadas para el desarrollo <em>FrontEnd</em> y cómo interactúan.
                </p>
                <br></br>
                <img src = {ArquitecturaFront} width={700} alt = "arquitectura_front"></img>
                <br></br>
                <br></br>
                <h3>Función de cada tecnología</h3>
                <p>
                  • <a href="https://reactjs.org/">React</a> : es un <em>Framework</em> escrito en JavaScript para
                  el desarrollo de interfaces de usuario.
                </p>
                <p>
                  • <a href="https://axios-http.com/docs/intro">Axios</a> : librería que permite realizar solicitudes
                  utilizando el protocolo HTTP. En este caso se utilizó para consumir la API del cliente.
                </p>
                <p>
                  • <a href="https://getbootstrap.com/">BootStrap</a> : toolkit que facilita el desarrollo de interfaces
                  de usuario, proporcionando componentes típicos customizables.
                </p>
                <p>
                  • <a href="https://reactrouter.com/en/main">React Router</a> : útil librería para React que permite realizar <em>
                    <a href="https://medium.com/@shyanmingperng/web-application-routing-217b92770a1">routing</a></em> en una aplicación web.
                </p>
                <p>
                  • <a href="https://www.chartjs.org/">Chart.js</a> : librería OpenSource que permite generar una gran variedad 
                  de gráficos utilizando JavaScript, para este proyecto en particular se utilizó una variante específica para React.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      // <div className={classes.MainDiv}>
      //     <h1 style={{ userSelect: "none" }}>
      //       DashBoard Proyecto Análisis y Diseño de Sofware
      //     </h1>
      //     <Menu></Menu>
      //     <br></br>
      //     <br></br>
      //     <br></br>
      //     <div className={classes.Plots}>
      //       <h1 style={{ userSelect: "none" }}>
      //         Seleccione una opción del menú superior
      //       </h1>
      //     </div>
      // </div>
  );
}

export default App;
