
import { getAccessToken } from "../lib/actions";

const apiService = {

    
    get: async function(url:string): Promise<any> {
        console.log ('get', url);
        const token = await getAccessToken();

        // Check for token before making the request
        if (!token) {
            throw new Error("401 Authentication Error: No valid access token found. Please log in.");
        }

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
                throw new Error("401 Unauthorized: Session expired. Please log in again.");
            }

            const json = await response.json();
            console.log('Response:', json);
            return json;
        } catch (error: unknown) {
            console.error('API GET Error:', error);
            throw error;
        }
    },


    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

        // Check for token before making the request
        if (!token) {
            throw new Error("401 Authentication Error: No valid access token found. Please log in.");
        }

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

            if (response.status === 401) {
                throw new Error("401 Unauthorized: Session expired. Please log in again.");
            }
            
            // Check for non-successful status codes first
            if (!response.ok) {
                let json;
                try {
                    // Try to parse the error body as JSON
                    json = await response.json();
                } catch (e) {
                    // If JSON parsing fails (e.g., server returned HTML 500 error page),
                    // throw a generic error with the status code.
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}. Server returned non-JSON data.`);
                }
                
                // If JSON parsing succeeded, throw the structured error
                throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            // Parse JSON for successful response
            const json = await response.json();
            console.log('Response:', json);
            return json;
        } catch (error: unknown) {
            console.error('API POST Error:', error);
            throw error;
        }
    },

    // Used for file uploads (FormData)
    postset: async function(url: string, data: any): Promise<any> {
        console.log('postset (file upload)', url);

        const token = await getAccessToken();

        // Check for token before making the request
        if (!token) {
            throw new Error("401 Authentication Error: No valid access token found. Please log in.");
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Content-Type: multipart/form-data is set automatically by the browser for FormData
                }
            });

            if (response.status === 401) {
                throw new Error("401 Unauthorized: Session expired. Please log in again.");
            }
            
            // FIX: Improved error handling to catch non-JSON 500 responses
            if (!response.ok) {
                let json;
                try {
                    // Try to parse the error body as JSON
                    json = await response.json();
                } catch (e) {
                    // If JSON parsing fails (e.g., server returned HTML 500 error page),
                    // throw a generic error with the status code.
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}. Server returned non-JSON data.`);
                }
                
                // If JSON parsing succeeded, throw the structured error
                throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            // If the response is OK, parse JSON
            const json = await response.json();
            console.log('Response:', json);

            return json;
        } catch (error: unknown) {
            console.error('API postset Error:', error);
            throw error;
        }
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

            if (!response.ok) {
                let json;
                try {
                    json = await response.json();
                } catch (e) {
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}. Server returned non-JSON data.`);
                }
                 throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            const json = await response.json();
            console.log('Response:', json);
            return json;

        } catch (error: unknown) {
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
                    // Content-Type: multipart/form-data is set automatically by the browser
                },
            });

            if (!response.ok) {
                let json;
                try {
                    json = await response.json();
                } catch (e) {
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}. Server returned non-JSON data.`);
                }
                throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }
            
            const json = await response.json();
            console.log('Response:', json);
            return json;

        } catch (error: unknown) {
            console.error('API POST FormData without token Error:', error);
            throw error;
        }
    },


    put: async function(url: string, data: any): Promise<any> {
        console.log('put', url, data);

        const token = await getAccessToken();

        // Check for token before making the request
        if (!token) {
            throw new Error("401 Authentication Error: No valid access token found. Please log in.");
        }

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

            if (response.status === 401) {
                throw new Error("401 Unauthorized: Session expired. Please log in again.");
            }
            
            if (!response.ok) {
                let json;
                try {
                    json = await response.json();
                } catch (e) {
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}. Server returned non-JSON data.`);
                }
                throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            const json = await response.json();
            console.log('Response:', json);

            return json;
        } catch (error: unknown) {
            console.error('API PUT Error:', error);
            throw error;
        }
    },


    delete: async function(url: string): Promise<any> {
        const token = await getAccessToken();

        // Check for token before making the request
        if (!token) {
            throw new Error("401 Authentication Error: No valid access token found. Please log in.");
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 401) {
                throw new Error("401 Unauthorized: Session expired. Please log in again.");
            }

            if (response.status === 204 || response.status === 200) {
                return null;
            }

            if (!response.ok) {
                let json;
                try {
                    json = await response.json();
                } catch (e) {
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}. Server returned non-JSON data.`);
                }
                 throw {
                    status: response.status,
                    message: response.statusText,
                    errors: json.errors || json,
                };
            }

            const json = await response.json();
            
            return json;
        } catch (error: unknown) {
            console.error('API DELETE Error:', error);
            throw error;
        }
    },
}
export default apiService;
