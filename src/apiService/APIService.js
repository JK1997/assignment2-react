import axios from 'axios';

const ECOMMERCE_API_REST_URL = "http://localhost:8080/getAllECommerce";

const apiService = {
    getECommerce() {
        return axios.get(ECOMMERCE_API_REST_URL);
    },
};

export default apiService;