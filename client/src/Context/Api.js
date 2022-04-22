import axios from 'axios';

export default function api() {
    const api = axios.create({
        baseURL: 'https://my135.brighton.domains/',
        withCredentials: true
    });

    return api;
}