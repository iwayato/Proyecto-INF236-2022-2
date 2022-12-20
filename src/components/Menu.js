import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

const Menu = () => {
    return(
        <ListGroup style = {{display : "flex", justifyContent : "left"}}>
            <ListGroup.Item>
                <strong>Seleccione un Sensor :</strong>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link 
                    to="/radon" 
                    style={{ textDecoration: 'none', userSelect: "none"}}>
                    Radón
                </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link 
                    to="/multi" 
                    style={{ textDecoration: 'none', userSelect: "none"}}>
                    Multiparámetro
                </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link 
                    to="/bcmagee" 
                    style={{ textDecoration: 'none', userSelect: "none"}}>
                    BC-Magee
                </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link 
                    to="/bcmaap" 
                    style={{ textDecoration: 'none', userSelect: "none"}}>
                    BC-Maap
                </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link 
                    to="/radio" 
                    style={{ textDecoration: 'none', userSelect: "none"}}>
                    Radiómetro
                </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link 
                    to="/mpgrimm" 
                    style={{ textDecoration: 'none', userSelect: "none"}}>
                    MP-Grimm
                </Link>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default Menu;
