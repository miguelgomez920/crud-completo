import './App.css'
import {Routes, Route} from "react-router-dom";
import ProductosPage from "./pages/ProductosPage/ProductosPage.js";
import HomePage from './pages/HomePage/HomePage.js';
import LoginPage from "./pages/LoginPage/LoginPage.js";
import RegisterPage from "./pages/RegisterPage/RegisterPage.js"
import RutaPrivada from "./components/RutaPrivada/RutaPrivada.js";

 
function App() { //si la pagina es grande, normalmente App unicamente se encarga de las rutas y se crea un HomePage aparte 

    return (

      <div className="App">
               
        
        <Routes> {/* Rutas NOTA: Sí tenemos etiquetas que esten fuera de <Routes>, estas se van a mostrar o renderiza sin importar la ruta activa (la pagina en donde estemos) ya que la App.js es la que ser renderiza siempre.*/}             
          <Route path="/" element={<LoginPage/>} /> 
          <Route path="/homepage" element={<HomePage/>} />  {/*Al poner "/" estamos diciendo que una vez se ejecute la pagina con npm start, lo redireccione a el HomePage, esto pasa porque se arranca en esta URL http://localhost:3000/, y como la ruta termina en /, entonces automaticamente la lleva al HomePage*/}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
          path="/productos" 
          element={
             <RutaPrivada> {/* Antes de renderizar ProductosPage, RutaPrivada evalúa si el usuario está autenticado (si hay un token en el localstorage). */}
              <ProductosPage /> 
            </RutaPrivada>
          } />
        </Routes>
      </div>

    
       
    );

}

export default App;
