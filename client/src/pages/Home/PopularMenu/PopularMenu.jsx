import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
  const [menu, loading] = useMenu();
  const popular = menu.filter(m => m.category === 'popular');
  if (loading) return;
  <>
    <span className="loading loading-dots loading-lg"></span>
    <span className="loading loading-dots loading-xl"></span>
  </>;

  return (
    <section className="mb-12 w-11/12 mx-auto">
      <SectionTitle
        heading="From Our Menu"
        subHeading="Popular Items"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-10">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      {menu.length && (
        <Link to="/menu" className="btn btn-outline border-0 border-b-4 mt-4">
          View Full Menu
        </Link>
      )}
    </section>
  );
};

export default PopularMenu;
