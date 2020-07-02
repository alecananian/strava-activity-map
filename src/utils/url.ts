export const getQueryParams = (search: string): Record<string, string> => (
  search.replace('?', '').split('&').reduce((params, param) => {
    const paramParts = param.split('=');
    if (paramParts.length !== 2) {
      return params;
    }

    return {
      ...params,
      [paramParts[0]]: paramParts[1],
    };
  }, {})
);
