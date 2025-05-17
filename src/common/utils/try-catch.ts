type Success<T> = {
    data: T;
    error: null;
    ok: true;
};


type Failure<E> = {
    data: null;
    error: E;
    ok: false;
};


type Result<T, E = Error> = Success<T> | Failure<E>;


export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
    try {
        const data = await promise;
        return { data, error: null, ok: true };
    } catch (error) {
        return { data: null, error: error as E, ok: false };
    }
}


export async function tryCatchSync<T, E = Error>(func: () => T): Promise<Result<T, E>> {
    try {
        const data = func();
        return { data, error: null, ok: true };
    } catch (error) {
        return { data: null, error: error as E, ok: false };
    }
}




