const CompanyTab = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <p className="h3">진행중인 지원 사업 </p>
        <div className="flex">
          <p className="b5 text-gray-9">전체 보기</p>
          <img
            src="/svgs/support/company/fullOfViewIcon.svg"
            className="w-5 h-5"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyTab;
