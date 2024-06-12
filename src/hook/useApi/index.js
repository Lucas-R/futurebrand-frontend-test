import { useEffect, useState } from "react";
export const useApi = ({ endpoint, limit = 20 }) => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApi, setReloadApi] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(true);

  const reload = () => setReloadApi(!reloadApi);

  const prev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const next = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/${endpoint}`)
        .then((response) => response.json())
        .then((result) => {
          res = result.filter(
            (todo) => todo.title.charAt().toLowerCase() === "s"
          );
          if (res.length > limit) {
            setTotalPages(Math.ceil(res.length / limit));
            setIsNext(true);
          } else {
            setTotalPages(1);
          }
          setResults(res);
        });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [reloadApi]);

  useEffect(() => {
    currentPage === 0 && setIsPrev(false);
    currentPage + 1 === totalPages && setIsNext(false);
    currentPage > 0 && setIsPrev(true);
    currentPage + 1 < totalPages && setIsNext(true);

    if (totalPages >= 1) {
      let start = limit * currentPage;
      let end = start + limit;
      setData(results.slice(start, end));
    }
  }, [results, currentPage]);

  return {
    data,
    error,
    isLoading,
    reload,
    totalPages,
    currentPage,
    isPrev,
    isNext,
    prev,
    next,
  };
};
