const ReviewContent = ({ item }) => {
  return (
    <div className="flex flex-col mt-5 mb-5">
      <div className="flex gap-5 mb-3">
        <img src="/public/images/Icon_Profile.png" className="w-10 h-10" />
        <h1 className="text-lg font-bold">{item.nickname}</h1>
      </div>
      <p>{item.text}</p>
    </div>
  );
};

export default ReviewContent;
