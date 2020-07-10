export class ResponseRestApi {
    public readonly SUCCESS = 'success';
    public readonly ERROR = 'error';

    data: any;
    status: string;
    error_code: string;
    error_description: string;

    constructor(jsonObj: any) {
        this.data = jsonObj.data;
        this.status = jsonObj.status;
        this.error_code = jsonObj.error_code;
        this.error_description = jsonObj.error_description;
    }

    public isSuccess(): boolean {
        return this.SUCCESS === this.status;
    }

    public isError(): boolean {
        return this.ERROR === this.status;
    }

}
