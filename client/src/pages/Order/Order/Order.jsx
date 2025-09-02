import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import orderBg from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { useNavigate, useParams } from "react-router-dom";

const Order = () => {
  const { category } = useParams();
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(
    initialIndex === -1 ? 0 : initialIndex
  );
  const [menu] = useMenu();
  const navigate = useNavigate();

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const newIndex = categories.indexOf(category);
    setTabIndex(newIndex === -1 ? 0 : newIndex);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleTabIndex = (index) => {
    setTabIndex(index);
    navigate(`/order/${categories[index]}`);
  };

  return (
    <section>
  
      <Cover
        coverBg={orderBg}
        title="Order Food"
        desc="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />

      {/* TabList */}
      <Tabs
        className="my-10 max-w-[1440px] w-11/12 mx-auto"
        selectedIndex={tabIndex}
        onSelect={handleTabIndex}
      >
        <TabList>
          {categories.map((cat) => (
            <Tab key={cat}>{cat}</Tab>
          ))}
        </TabList>

        {/* Tab Panel */}
        {categories.map((cat) => {
          const items = menu.filter((m) => m.category === cat);

          /* Pagination Logic */
          const totalPages = Math.ceil(items.length / itemsPerPage);
          const startIndex = (currentPage - 1) * itemsPerPage;
          const paginatedItems = items.slice(
            startIndex,
            startIndex + itemsPerPage
          );

          return (
            <TabPanel key={cat}>
              <div className="grid grid-cols-1 my-5 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedItems?.length > 0 ? (
                  paginatedItems.map((item) => (
                    <FoodCard key={item._id} item={item} />
                  ))
                ) : (
                  <p className="text-gray-500 italic">No items found</p>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 border rounded-md ${
                        currentPage === i + 1
                          ? "bg-amber-500 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </TabPanel>
          );
        })}
      </Tabs>
    </section>
  );
};

export default Order;
