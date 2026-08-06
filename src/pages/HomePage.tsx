import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Home</h1>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <br />
      <br />
      
      <Link to="/cadastro">
        <button>Cadastrar</button>
      </Link>
    </div>
  );
}

export default HomePage;