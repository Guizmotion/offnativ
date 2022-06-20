import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    setLoading(true);

    await apiFunc()
      .then(function (response) {
        // handle success
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setError(true);
        console.log(error);
      });
    setLoading(false);
  };

  return { data, error, loading, request };
};
