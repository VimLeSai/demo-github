//usePagination is a custom hook to fetch the list of pulls from github
//it takes the owner, repo, type, and query as an argument
//it returns a list of pulls, error, loading, and pagination
//the pagination returns the total, page, and limit
//the pagination also returns the setLimit, and setPage functions

import React from 'react';

const useGithubListing = (config = {}) => {
  const {
    owner = 'facebook',
    repo = 'react',
    type = 'pulls',
    limit = 10,
    query = {},
  } = config;

  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit,
    totalPages: 1,
  });
  const [queryData, setQueryData] = React.useState(query);

  const setPage = (page) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  const setLimit = (limit) => {
    setPagination((prev) => ({
      ...prev,
      limit,
    }));
  };

  const fetchList = () => {
    setLoading(true);
    fetch(
      `https://api.github.com/repos/${owner}/${repo}/${type}?page=${
        pagination.page
      }&per_page=${pagination.limit}&${new URLSearchParams({
        ...query,
        ...queryData,
      })}`
    )
      .then((res) => {
        // Retrieve Link header from response headers
        const linkHeader = res.headers.get('link');
        // Extract last page number from Link header
        const lastPageRegex = new RegExp(/.*<.*\?page=(\d+)&.*>; rel="last"/);
        const lastPageMatch = linkHeader.match(lastPageRegex);
        const totalPages = lastPageMatch ? parseInt(lastPageMatch[1]) : 1;
        setPagination((prev) => ({
          ...prev,
          totalPages,
        }));
        return res.json();
      })
      .then((res) => {
        if (res && res.message) {
          setError(res.message);
          setList([]);
        } else {
          setError(null);
          setList(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchList();
  }, [pagination.page, pagination.limit, queryData]);

  return {
    loading,
    list,
    error,
    pagination,
    setPage,
    setLimit,
    setQueryData,
  };
};

export default useGithubListing;
