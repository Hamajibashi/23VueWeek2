import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const baseUrl = 'https://vue3-course-api.hexschool.io';
const api_path = 'hmjbs';

const app = {
    data() {
        return {
            userData: {
                username: '',
                password: '',
            }
        }
    },
    methods: {        
        login() {
            console.log(this.userData);
            axios.post(`${baseUrl}/v2/admin/signin`, this.userData)
                .then(res => {
                    console.log(res.data);
                    const { token, expired } = res.data;
                    console.log(token, expired);
                    document.cookie = `hexschool=${token}; expires=${expired};`;
                    window.location="./products.html";
                })
                .catch(err => {
                    console.log(err);
                })
        },
        check() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;

            axios.post(`${baseUrl}/v2/api/user/check`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err.data.message);
                })
        },
        getData() {
            axios.get(`${baseUrl}/v2/api/${api_path}/admin/products`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    mounted() {
    }
}

createApp(app).mount('#app');