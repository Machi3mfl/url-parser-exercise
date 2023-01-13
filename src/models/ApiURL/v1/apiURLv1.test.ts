import ApiURLFactory from "../../../factories/ApiURLFactory";
const URL_ROOT_PATH = "https://www.example-url.com";

describe("API URL v1", () => {
  it("should return hash object from url", () => {
    const apiURLv1 = ApiURLFactory.createApiURL("v1");
    const urlHash = apiURLv1.parseURL(
      "http://example.com/1/api/orders/1?sort=desc&limit=10"
    );
    expect(urlHash).toMatchObject({
      collection: "orders",
      id: 1,
      limit: 10,
      sort: "desc",
      version: "1",
    });
  });

  it.each([
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?limit=ten`,
      expectedErrorMsg:
        'Error: value "ten" for "limit" search param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?limit=0`,
      expectedErrorMsg: 'Error: value "0" for "limit" search param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?limit=-10`,
      expectedErrorMsg:
        'Error: value "-10" for "limit" search param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?sort=descendent`,
      expectedErrorMsg:
        'Error: value "descendent" for "sort" search param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?sort=ascendent`,
      expectedErrorMsg:
        'Error: value "ascendent" for "sort" search param is invalid',
    },
  ])(
    'should return an ERROR "$expectedErrorMsg" when the url is $url',
    ({ url, expectedErrorMsg }) => {
      try {
        const apiURLv1 = ApiURLFactory.createApiURL("v1");
        apiURLv1.parseURL(url);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toEqual(expectedErrorMsg);
        }
      }
    }
  );

  it.each([
    {
      url: `${URL_ROOT_PATH}/1b/api/listing/4`,
      expectedErrorMsg: 'Error: value "1b" for "version" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/-1/api/listing/4`,
      expectedErrorMsg: 'Error: value "-1" for "version" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/-1.1/api/listing/4`,
      expectedErrorMsg:
        'Error: value "-1.1" for "version" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/0/api/listing/4`,
      expectedErrorMsg: 'Error: value "0" for "version" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/know-api/listing/4`,
      expectedErrorMsg:
        'Error: value "know-api" for "api" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/api/collection/4b`,
      expectedErrorMsg: 'Error: value "4b" for "id" url param is invalid',
    },
  ])(
    'should return an ERROR "$expectedErrorMsg" when the url is $url',
    ({ url, expectedErrorMsg }) => {
      try {
        const apiURLv1 = ApiURLFactory.createApiURL("v1");
        apiURLv1.parseURL(url);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe(expectedErrorMsg);
        }
      }
    }
  );
});
