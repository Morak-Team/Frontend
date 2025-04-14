const Category = ({ title, img }) => {
  if (!title || !img) return null;

  return (
    <div className="flex w-[5rem] h-[3rem] rounded-md border border-pink-300 items-center gap-2 m-2">
      <img src={img} className="w-[1.5rem] h-[1.5rem]" draggable={false} />
      <button>{title}</button>
    </div>
  );
};

export default Category;
