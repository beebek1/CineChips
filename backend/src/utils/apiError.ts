export class ApiError extends Error{
    public statusCode: number;
    public data: null;
    public success: boolean;
    public errors: any;

    constructor(statusCode: number, message = "something went wrong", errors=[], ){
        //using super to map the stack trace
        super(message);
        this.statusCode = statusCode,
        this.data = null,
        this.success = false,
        this.errors = errors

        //helps while debugging to find the exact error
        Error.captureStackTrace(this, this.constructor)
    }

}