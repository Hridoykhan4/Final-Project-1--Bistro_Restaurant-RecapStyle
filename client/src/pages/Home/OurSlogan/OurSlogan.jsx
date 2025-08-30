import sloganImg from "../../../assets/home/chef-special.jpg";
const OurSlogan = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${sloganImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: 'fixed',
        backgroundPosition:'center'
      }}
      className="my-10 flex justify-center items-center max-w-7xl rounded mx-auto h-[500px]"
    >
      <div className="bg-white text-2xl gap-4 text-center max-w-xl flex justify-center items-center flex-col p-10 rounded">
        <h2>Bistro Boss</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, voluptas est. Itaque quidem, voluptatum quas distinctio, enim praesentium ut autem quod ex adipisci debitis cum odio eum magni earum libero unde cupiditate nisi dolorum provident quae laboriosam. Temporibus, iste provident.</p>
      </div>
    </section>
  );
};

export default OurSlogan;
