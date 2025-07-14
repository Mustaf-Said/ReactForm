import Navbar from "../nav/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2023 Ditt Företag</p>
      </footer>
    </div>
  );
}

export default Layout;