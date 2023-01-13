import ApiURLFactory from "../../../factories/ApiURLFactory";

describe('API URL v1', () => {
    it('should return hash object from url', () => {
        const apiURLv1 = ApiURLFactory.createApiURL('v1');
        const urlHash = apiURLv1.parseURL('http://example.com/1/api/orders/1?sort=desc&limit=10');
        expect(urlHash).toMatchObject({
            collection: 'orders',
            id: 1,
            limit: 10,
            sort: 'desc',
            version: '1'
        });
    })
})