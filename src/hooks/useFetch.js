import axios from "axios";
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [errMessage, setErrMessage] = useState("");

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setErrMessage(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return { fetchData, loading, data, errMessage };
};
