import ApiURLFactory from './ApiURLFactory';
import ApiURLv1 from '../models/ApiURL/v1/ApiURLv1';

describe('ApiURLFactory', () => {
    it('should create a new instance of ApiURL', () => {
        const apiURL = ApiURLFactory.createApiURL('v1');
        expect(apiURL).toBeInstanceOf(ApiURLv1);
    })

    it('should return ERROR when version not exists', () => {
        try {
            ApiURLFactory.createApiURL('v1000');
        }catch(error){
            if (error instanceof Error) {
                expect(error.message).toBe('Api version not found');
            }
        }
    })

    it('should return ERROR when version not exists', () => {
        try {
            ApiURLFactory.createApiURL();
        }catch(error){
            if (error instanceof Error) {
                expect(error.message).toBe('Api version must be defined');
            }
        }
    })
})