// Constants.js
const prod = {
        BASE_URL: 'http://10.118.60.177:7777/status',
}

const dev = {
        BASE_URL: 'http://localhost:49569',
        // 'http://localhost:49569'
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;