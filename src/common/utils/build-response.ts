type ResponseInput<T> = {
    status: number;
    message?: string;
    data?: T;
};


type ResponseBody<T> = {
    status: number;
    message?: string;
    data?: T;
};


export const buildResponse = <T>({ status, message, data }: ResponseInput<T>): ResponseBody<T> => {
    return {
        status,
        message,
        data,
    };
};




