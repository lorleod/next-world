import "../../App.scss";

function Nav() {
  return (
    <nav>
      <h3>
        <a href="/">NextWorld</a>
      </h3>
      <ul className="nav-links">
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
        <li>
          <a href="/addworld">Add world</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
