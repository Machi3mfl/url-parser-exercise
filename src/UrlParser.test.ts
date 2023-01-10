import UrlParser from "./UrlParser";
const URL_ROOT_PATH = "https://www.example-url.com";

describe("UrlParser", () => {
  it("should be create a url instance", () => {
    const urlParser = new UrlParser(URL_ROOT_PATH);
    expect(urlParser.url).toBeInstanceOf(URL);
  });

  it("should return always the hash in lowercase when url have multiple case", () => {
    const urlParser = new UrlParser(
      `${URL_ROOT_PATH}/1/api/LISTING/4?LIMIT=10&sort=DESC`
    );
    const urlParts = urlParser.parseQueryParams();
    expect(urlParts).toEqual({
      version: "1",
      collection: "listing",
      id: 4,
      limit: 10,
      sort: "desc",
    });
  });

  it.each([
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?limit=10&sort=desc`,
      expectedHash: {
        version: "1",
        collection: "listing",
        id: 4,
        limit: 10,
        sort: "desc",
      },
    },
    {
      url: `${URL_ROOT_PATH}/0.1/api/listing/4?limit=10&sort=desc`,
      expectedHash: {
        version: "0.1",
        collection: "listing",
        id: 4,
        limit: 10,
        sort: "desc",
      },
    },
    {
      url: `${URL_ROOT_PATH}/1.1/api/listing/4?limit=10&sort=desc`,
      expectedHash: {
        version: "1.1",
        collection: "listing",
        id: 4,
        limit: 10,
        sort: "desc",
      },
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?limit=10`,
      expectedHash: {
        version: "1",
        collection: "listing",
        id: 4,
        limit: 10,
      },
    },
  ])(
    "should transform the received url $url in $expectedHash",
    ({ url, expectedHash }) => {
      const urlParser = new UrlParser(url);
      const urlParts = urlParser.parseQueryParams();
      expect(urlParts).toEqual(expectedHash);
    }
  );

  it.each([
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?`,
      expectedHash: {},
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?limit=10`,
      expectedHash: {
        limit: 10,
      },
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?sort=desc`,
      expectedHash: {
        sort: "desc",
      },
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?sort=asc`,
      expectedHash: {
        sort: "asc",
      },
    },
  ])(
    "should transform the received url $url search params in $expectedHash",
    ({ url, expectedHash }) => {
      const urlParser = new UrlParser(url);
      const urlSearchQueryParams = urlParser.getSearchParams();
      expect(urlSearchQueryParams).toEqual(expectedHash);
    }
  );

  it.each([
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?limit=ten`,
      expectedErrorMsg:
        'Error: value "ten" for "limit" search param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/api/listing/4?limit=0`,
      expectedErrorMsg:
        'Error: value "0" for "limit" search param is invalid',
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
      const urlParser = new UrlParser(url);
      try {
        urlParser.getSearchParams();
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toEqual(expectedErrorMsg);
        }
      }
    }
  );

  it('should return an ERROR when url parts exceed allowable', () => {
    let url = `${URL_ROOT_PATH}/1/api/listing/4/invalid`;
    const urlParser = new UrlParser(url);
    try {
      urlParser.parseQueryParams();
    }catch(error){
      if (error instanceof Error) {
        expect(error.message).toBe(`Error: the url ${url} parts are exceeded`)
      }
    }
  })

  it.each([
    {
      url: `${URL_ROOT_PATH}/1b/api/listing/4`,
      expectedErrorMsg:
        'Error: value "1b" for "version" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/-1/api/listing/4`,
      expectedErrorMsg:
        'Error: value "-1" for "version" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/-1.1/api/listing/4`,
      expectedErrorMsg:
        'Error: value "-1.1" for "version" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/0/api/listing/4`,
      expectedErrorMsg:
        'Error: value "0" for "version" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/know-api/listing/4`,
      expectedErrorMsg:
        'Error: value "know-api" for "api" url param is invalid',
    },
    {
      url: `${URL_ROOT_PATH}/1/api/collection/4b`,
      expectedErrorMsg:
        'Error: value "4b" for "id" url param is invalid',
    }
  ])('should return an ERROR "$expectedErrorMsg" when the url is $url', ({ url, expectedErrorMsg}) => {
    const urlParser = new UrlParser(url);
    try {
      urlParser.parseQueryParams();
    }catch(error){
      if (error instanceof Error) {
        expect(error.message).toBe(expectedErrorMsg)
      }
    }
  })
});
