const useUrl = (url) => {
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      const { protocol, host } = window.location;
      return `${protocol}//${host}`;
    }
    return '';
  };

  const fullUrl = `${getBaseUrl()}${url}`;

  return fullUrl;
};

export default useUrl;
