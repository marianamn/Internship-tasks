export function get(url, headers) {
    return fetch(url, headers)
        .then((response) => {
            // if (response.status === 401) {
            //     window.location.replace('/login');
            // } 
            
            return response;
        })
        .then(response => response.json());
}

export function getHeader(token) {
    return {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }
}