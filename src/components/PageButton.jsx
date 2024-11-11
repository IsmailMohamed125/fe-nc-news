import { useNavigate } from "react-router-dom";

function PageButton({ btnValue, page, setPage, querySearch }) {
  const navigate = useNavigate();

  const btnStyle =
    page === btnValue
      ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";

  return (
    <button
      onClick={() => {
        setPage(btnValue);
        navigate(`/articles?p=${btnValue}${querySearch}`);
      }}
      aria-current="page"
      className={btnStyle}
    >
      {btnValue}
    </button>
  );
}

export default PageButton;
