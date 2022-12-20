import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

const BackToMainMenu = () => {
    return (
        <ListGroup>
            <ListGroup.Item>
                <Link 
                    to="/" 
                    style={{ textDecoration: 'none', userSelect: "none"}}>
                    Menú Principal
                </Link>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default BackToMainMenu;