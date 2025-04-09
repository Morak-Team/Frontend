import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-blue-500">Tailwind 테스트!</h1>
      <h2 className="text-xl">모락의 Home page입니다.</h2>

      {/* 모바일 웹 테스트 용 버튼 */}
      <div className="flex flex-col space-y-3 mt-6">
        <Link
          to="/auth"
          className="px-4 py-2 bg-yellow-400 rounded-lg text-center text-white font-semibold shadow-md hover:bg-yellow-500 transition"
        >
          로그인 페이지로 이동
        </Link>

        <Link
          to="/map"
          className="px-4 py-2 bg-green-500 rounded-lg text-center text-white font-semibold shadow-md hover:bg-green-600 transition"
        >
          지도 페이지로 이동
        </Link>
      </div>
    </div>
  );
};

export default Home;
