
import ApiURLv1 from '../models/ApiURL/v1/ApiURLv1';
import ApiURLv2 from '../models/ApiURL/v2/ApiURLv2';
import { tApiVersion } from '../types';

export default class ApiURLFactory {
    static createApiURL(apiVersion: tApiVersion){

        if(!apiVersion){
            throw new Error('Api version must be defined');
        }
        
        switch(apiVersion) {
            case 'v1':
                return new ApiURLv1('v1');
            case 'v2':
                return new ApiURLv2('v2');
            default: 
                throw new Error('Api version not found');
        }
    }
}