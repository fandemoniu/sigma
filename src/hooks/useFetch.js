import { useState, useEffect } from 'react';
import { getWikiApi } from "../api/wiki";

export default function useFetch(token, bandera) {
  // State
  const [state, setstate] = useState({
    data: [],
    loading: true
  })
  useEffect(() => {
    getWikiApi(token)
    .then( wiki => {
      setstate({
        data: wiki.items,
        loading: false
      })
    })
  },[bandera]);
  return state;
}
