const FoodCard = ({item}) => {
      const { name, image, price, recipe } = item;  

    return (
        <div className="card relative bg-base-100  shadow-sm">
  <figure>
    <img
      src={image}
      alt={name} />
  </figure>
  <div className="card-body ">
    <p className="absolute top-2 right-5 text-white font-semibold bg-black/30 backdrop-blur-2xl rounded p-1 ">${price}</p>
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-outline border-0 border-b-4 mt-2 bg-slate-100">Add To Cart</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;