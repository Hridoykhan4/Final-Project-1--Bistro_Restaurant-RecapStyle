import Cover from "../../Shared/Cover/Cover";
import menuCover from "../../../assets/menu/banner3.jpg";
import useMenu from "../../../hooks/useMenu";
import dessertBg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../../assets/menu/pizza-bg.jpg";
import saladBg from "../../../assets/menu/salad-bg.jpg";
import soupBg from "../../../assets/menu/soup-bg.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
const Menu = () => {
  const {menu, loading} = useMenu();
  const offered = menu.filter((m) => m.category === "offered");
  const dessert = menu.filter((m) => m.category === "dessert");
  const pizza = menu.filter((m) => m.category === "pizza");
  const salad = menu.filter((m) => m.category === "salad");
  const soup = menu.filter((m) => m.category === "soup");
  if (loading) return;
  <>
    <span className="loading loading-dots loading-lg"></span>
    <span className="loading loading-dots loading-xl"></span>
  </>;
  return (
    <section>
      {/* Main Cover */}
      <Cover
        title="Our Menu"
        desc="Would you like to try a dish?"
        coverBg={menuCover}
      ></Cover>

      <SectionTitle
        subHeading="Don't miss"
        heading="Today's Offer"
      ></SectionTitle>

      {/* Offered */}
      <MenuCategory items={offered}></MenuCategory>
      {/* Dessert */}
      <MenuCategory
        title="Dessert"
        desc="Sweet delights to end your meal with a smile"
        coverBg={dessertBg}
        items={dessert}
      />

      {/* Pizza */}
      <MenuCategory
        items={pizza}
        coverBg={pizzaBg}
        title="Pizza"
        desc="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>

      {/* Salad */}
      <MenuCategory
        items={salad}
        coverBg={saladBg}
        title="Salad"
        desc="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>
      {/* Soup */}
      <MenuCategory
        items={soup}
        coverBg={soupBg}
        title="Soup"
        desc="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>
    </section>
  );
};

export default Menu;
