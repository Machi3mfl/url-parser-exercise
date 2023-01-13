import ApiURLFactory from "../../../factories/ApiURLFactory"

describe('API URL v2', () => {
    it('should return ERROR when parseURL is not implemented', () => {
        try {
            const apiV2 = ApiURLFactory.createApiURL('v2');
            apiV2.parseURL('http://example.com/1/api/orders/1?sort=desc&limit=10')
        }catch(error){
            if(error instanceof Error){
                expect(error.message).toEqual('Method not implemented');
            }
        }
    })
})