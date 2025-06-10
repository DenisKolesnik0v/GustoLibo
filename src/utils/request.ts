class Request {
    private baseUrl: string;

    constructor (baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T> (method: string, url: string, data?: any, headers?: Record<string, string>): Promise<T> {
        const formattedUrl = `${this.baseUrl.replace(/\/$/, '')}${url}`;
        const response = await fetch(formattedUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: data ? JSON.stringify(data) : undefined,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json() as Promise<T>;
    }

    public get = <T>(url: string, options?: { headers?: Record<string, string> }): Promise<T> => {
        return this.request<T>('GET', url, undefined, options?.headers);
    };

    public post = <T>(url: string, data: any, options?: { headers?: Record<string, string> }): Promise<T> => {
        return this.request<T>('POST', url, data, options?.headers);
    };

    public put = <T>(url: string, data: any, options?: { headers?: Record<string, string> }): Promise<T> => {
        return this.request<T>('PUT', url, data, options?.headers);
    };

    public delete = <T>(url: string, options?: { headers?: Record<string, string> }): Promise<T> => {
        return this.request<T>('DELETE', url, undefined, options?.headers);
    };
}

export default Request;
