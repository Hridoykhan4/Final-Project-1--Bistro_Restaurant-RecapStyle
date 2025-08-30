import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const Main = () => {
  return (
    <>
      <header>
        <NavBar></NavBar>
      </header>

      <main className="min-h-[calc(100vh-234px)]">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Main;
