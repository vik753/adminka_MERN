import axios from "axios";
const { useCallback, useState } = require("react");

export const useHttp = () => {
  const [isLoading, setLoading] = useState(false);
  const [httpError, setError] = useState(null);

  const request = useCallback(
    async (method = "POST", url = null, data = {}, headers = {}) => {
      try {
        if (!url) {
          throw new Error('HTTP Error: no URL in useHttp.')
        }
        setLoading(true);

        const request = await axios({ method, url, data, headers });
        console.log("request: ", request);

        setLoading(false);
        return request.data;
      } catch (err) {
        // console.log('ERR', err.response.data);
        setLoading(false);
        setError(err.response.data.message);
        throw err;
      }
    },
    []
  );

  const clearHttpError = () => setError(null);

  return { httpError, clearHttpError, isLoading, request };
};




