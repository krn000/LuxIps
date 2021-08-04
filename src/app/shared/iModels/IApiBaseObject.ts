export interface IapiBaseObject {
  tokenRequiredFlag?: boolean;
  endpoint?: string;
  params?: any;
  multipart?: boolean;
  apiData?: any;
  isFile?: boolean;
}
