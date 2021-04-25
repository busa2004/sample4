/* eslint-disable no-useless-catch */
const API_ENDPOINT = 'http://localhost:8080';

const request = async url => {
    try {
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw errorData;
        }
    } catch(e) {
        throw {
            message: e.message,
            status: e.status
        };
    }
};

const api = {
    posts: async () => {
        /*
            keyword로 breed를 찾고 각 breed의 id로 이미지를 찾는다.
        */
        try {
            const requests = await request(`${API_ENDPOINT}/api/v1/stocks`);
          
            const responses = await Promise.all(requests);
            
            return {
                isError: false,
                data: responses
            };
        } catch(e) {
           
            throw {
                isError: true,
                data: e
            };
        }
    },
    
};



export { api };