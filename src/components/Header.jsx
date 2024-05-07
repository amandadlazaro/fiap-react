import { Link } from "react-router-dom";

function Header() {
    return (
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"  style={{fontWeight: 'bold'}}>Amanda's Blog</Link>
        </div>
      </nav>
    );
  }
   
  export default Header;