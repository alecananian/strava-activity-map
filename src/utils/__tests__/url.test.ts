import { getQueryParams } from '../url';

describe('URL utils', () => {
  it('parses query params', () => {
    const QueryString = 'test_param=test_value&another_param=another_value';
    const QueryObject = {
      test_param: 'test_value',
      another_param: 'another_value',
    };
    let result = getQueryParams(`?${QueryString}`);
    expect(result).toStrictEqual(QueryObject);

    result = getQueryParams(QueryString);
    expect(result).toStrictEqual(QueryObject);

    result = getQueryParams('test_param=&another_param=another_value');
    expect(result).toStrictEqual({
      test_param: '',
      another_param: 'another_value',
    });
  });

  it('gracefully handles invalid query strings', () => {
    let result = getQueryParams('invalid');
    expect(result).toStrictEqual({});

    result = getQueryParams('test_param&another_param=another_value');
    expect(result).toStrictEqual({
      another_param: 'another_value',
    });
  });
});
