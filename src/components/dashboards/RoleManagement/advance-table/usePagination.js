import { useState, useMemo, useEffect } from "react";

const usePagination = (data, initialPageSize = 5) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    setPageIndex(0);
  }, [pageSize]);

  const currentPageData = useMemo(() => {
    const firstPageIndex = pageIndex * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [pageIndex, pageSize, data]);

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < Math.ceil(data.length / pageSize) - 1;

  const nextPage = () => setPageIndex((current) => current + 1);
  const previousPage = () => setPageIndex((current) => current - 1);
  const resetPagination = () => setPageIndex(0);

  return {
    currentPageData,
    setPageIndex,
    setPageSize,
    pageIndex,
    pageSize,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    resetPagination,
  };
};

export default usePagination;
