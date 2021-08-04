import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError, from, BehaviorSubject } from 'rxjs';
import { IapiBaseObject } from '../iModels/IApiBaseObject';
import { SharedService } from './shared.service';
import { ModelBindingService } from './binding.model.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl;
  private $loaderService = new BehaviorSubject<boolean>(false);
  // public loaderService = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private sharedService: SharedService,
    public modelBindingService: ModelBindingService) { }

  setLoaderTrue(value): void {
    this.$loaderService.next(value);
  }

  getLoader() {
    return this.$loaderService.asObservable();
  }

  postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }
  postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
     };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }

+
  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }postApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true);
    let headers: any;
    if (apiObject.multipart) {
     
      headers = this.getHeaders(apiObject.tokenRequiredFlag, true);

    } else {
      headers = this.getHeaders(apiObject.tokenRequiredFlag);

    }
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.post(`${this.apiUrl}/${apiObject.endpoint}`, apiObject.apiData, httpOptions)
      .pipe(map((res: any) => {
        this.$loaderService.next(false);
        return res.body;
      }), catchError(error =>
        this.handleError(error, this.modelBindingService, apiObject)
      )
      );
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
        return {
          message: 'No data found',
          response: [],
          status: 204
        };
      }
      if (!apiObject.isFile) {
        return res.body;
      } else {
        return res.text();
      }
    }));

  }
  handleError(error: any, modelBindingService: any, apiObject: IapiBaseObject): any {
    this.$loaderService.next(false)
    const errorData = modelBindingService.apiResponseErrorDecoder(error);
    return throwError(
      errorData
      || 'Something went wrong');
  }


  private getHeaders(tokenRequiredFlag?: boolean, multipart = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (tokenRequiredFlag) {
      if (multipart) {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Authorization', token);
      } else {
        const token = this.sharedService.getDataFromStorage('adminToken');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', token);
      }
    } else {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }
  getApi(apiObject: IapiBaseObject): any {
    this.$loaderService.next(true)
    let headers: HttpHeaders;
    headers = this.getHeaders(apiObject.tokenRequiredFlag, false);
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'body'
    };

    return this.http.get(`${this.apiUrl}/${apiObject.endpoint}`, httpOptions).pipe(map((res: any) => {
      this.$loaderService.next(false)
      if (res['status'] === 204) {
