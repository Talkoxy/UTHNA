import { getAccessToken } from "../lib/actions";

const apiService = {

    
    get: async function(url:string): Promise<any> {
        console.log ('get', url);
        const token = await getAccessToken();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (response.status === 401) {
                alert("Session expired. Please log in again.");
                throw new Error("Unauthorized access - Please log in.");
            }

            const json = await response.json();
            console.log('Response:', json);
            return json;
        } catch (error: any) {
            console.error('API GET Error:', error);
            throw error;
        }
    },


    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: JSON.stringify(data) ,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            // Parse JSON for both success and error responses
            const json = await response.json();
            console.log('Response:', json);
            
            // Check for non-successful status codes and throw an error
            if (!response.ok) {
                throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            return json;
        } catch (error: any) {
            console.error('API POST Error:', error);
            throw error;
        }
    },

    postset: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },


    postWithoutToken: async function(url: string, data: any): Promise<any> {
        console.log('postWithoutToken', url, data);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();
            console.log('Response:', json);
            
            if (!response.ok) {
                 throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            return json;

        } catch (error: any) {
            console.error('API POST without token Error:', error);
            throw error;
        }
    },

        postFormDataWithoutToken: async function(url: string, data: FormData): Promise<any> {
        console.log('postFormDataWithoutToken', url);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data, // CRITICAL: Pass FormData object directly
                headers:{
                    'Accept': 'application/json',
                },
            });

            const json = await response.json();
            console.log('Response:', json);
            
            if (!response.ok) {
                throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            return json;

        } catch (error: any) {
            console.error('API POST FormData without token Error:', error);
            throw error;
        }
    },


    put: async function(url: string, data: any): Promise<any> {
        console.log('put', url, data);

        const token = await getAccessToken();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'PUT',
                body: JSON.stringify(data), 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const json = await response.json();
            console.log('Response:', json);

            if (!response.ok) {
                throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            return json;
        } catch (error: any) {
            console.error('API PUT Error:', error);
            throw error;
        }
    },


    delete: async function(url: string): Promise<any> {
        const token = await getAccessToken();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 204 || response.status === 200) {
                return null;
            }

            const json = await response.json();
            
            if (!response.ok) {
                 throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            return json;
        } catch (error: any) {
            console.error('API DELETE Error:', error);
            throw error;
        }
    },
}
export default apiService;
