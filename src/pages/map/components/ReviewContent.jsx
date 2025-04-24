const ReviewContent = ({ item }) => {
  return (
    <div className="flex flex-col mt-5 mb-5 items-start gap-3 border-b-[1.6px] sm:border-b-[3px] border-gray-3">
      <div className="flex gap-2 justify-center items-center mb-3">
        <img src="/images/review/profileIcon.svg" className="w-6 h-6" />
        <h1 className="b5 text-gray-12">{item.nickname}</h1>
      </div>
      <p className="b5 text-gray-11">{item.text}</p>
      <div className="mb-5">tag list</div>
    </div>
  );
};

export default ReviewContent;
