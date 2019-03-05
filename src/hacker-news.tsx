import React, { Fragment, useState, useEffect } from 'react';

const useDataAPI = (initialUrl: string, initialData: any) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchData = async () => {
    setError(false);
    setLoading(true);

    try {
      const response = await fetch(url);
      const result = await response.json();

      setData(result);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  const doGet = (event: any, url: any) => {
    setUrl(url);
    event.preventDefault();
  }

  return {
    data,
    isLoading,
    isError,
    doGet,
  }
}

export const App = () => {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doGet } = useDataAPI(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );

  return (
    <Fragment>
      <form
        onSubmit={event =>
          doGet(
            event,
            `http://hn.algolia.com/api/v1/search?query=${query}`,
          )
        }
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.length && data.hits.map((item: any) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
