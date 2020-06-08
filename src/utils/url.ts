export const getQueryParams = (): any => {
  const queryString = window.location.search.replace('?', '');
  return queryString.split('&').reduce((params, param) => {
    const paramParts = param.split('=');
    if (paramParts.length !== 2) {
      return params;
    }

    return {
      ...params,
      [paramParts[0]]: paramParts[1],
    };
  }, {});
};
