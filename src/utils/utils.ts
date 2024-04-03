interface AxiosConfig {
    method: string;
    url: string;
    headers: {
        Authorization: string;
        'Content-Type': string;
    };
}

const generateConfig = (url: string, accessToken: any): AxiosConfig => {
    return {
        method: 'GET',
        url: url,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };
};

export { generateConfig };
