import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = ()=>{

    return (


    <div className="container__homepage">
        <div className="card__homepage">

            <h1>PANEL DE GESTION</h1>

            <Link to="">
            <button>Gestionar empleados</button>
            </Link>
            <Link to="/productos">
            <button>Gestionar productos</button>
            </Link>
        

        </div>     
    </div>   
    )

    
}

export default HomePage;