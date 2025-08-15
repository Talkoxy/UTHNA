import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function(url:string): Promise<any> {
        console.log ('get', url);
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                }
            })

                .then(response => {
                    if (response.status === 401) {
                        // If unauthorized, notify user
                        alert("Session expired. Please log in again.");
                        reject("Unauthorized access - Please log in.");
                    } else {
                        return response.json();
                    }
                })
                .then((json) => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch(error => {
                    reject(error);
                });
        });



    },


    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

            return new Promise((resolve, reject) => {
                fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                    method: 'POST',
                    body: data ,
                    headers:{
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                })

                .then(response => {
                    if (response.status === 401) {
                        // If unauthorized, notify user
                        alert("Session expired. Please log in again.");
                        reject("Unauthorized access - Please log in.");
                    } else {
                        return response.json();
                    }
                })
                .then((json) => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },


    postWithoutToken: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);
            return new Promise((resolve, reject) => {
                fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                    method: 'POST',
                    body:(data),
                    headers:{
                        'Accept':'application/json',
                        'Content-Type': 'application/json',
                    },

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


    put: async function(url: string, data: any): Promise<any> {
        console.log('put', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'PUT',
                body: (data), 
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => {
                if (response.status === 401) {
                    // If unauthorized, notify user
                    alert("Session expired. Please log in again.");
                    reject("Unauthorized access - Please log in.");
                } else {
                    return response.json();
                }
            })
                .then((json) => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },







}
export default apiService;