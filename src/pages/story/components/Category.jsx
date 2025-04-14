const Category = ({ title, img }) => {
  return (
    <div className="flex">
      <img src={img} />
      <button>{title}</button>
    </div>
  );
};

export default Category;
