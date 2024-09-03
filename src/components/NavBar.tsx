import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
    const location = useLocation();

    return (
        <div className="navbar">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Cadastro de cliente
            </Link>
            <Link to="/list-client" className={location.pathname === '/list-client' ? 'active' : ''}>
                Listagem de cliente
            </Link>
        </div>
    );
};
