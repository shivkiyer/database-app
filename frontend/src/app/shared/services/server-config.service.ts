import { Injectable } from '@angular/core';

@Injectable()
export class ServerConfigurationService {
    baseApi = {
        value: 'http://localhost:3000'
    };
}
