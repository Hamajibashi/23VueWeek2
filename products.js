import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const baseUrl = 'https://vue3-course-api.hexschool.io';
const api_path = 'hmjbs';

const app = {
    data() {
        return {
            products: [],
            tempProduct:{},
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${baseUrl}/v2/api/user/check`)
                .then(res => {
                    this.getProductsData();
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location="./login.html";
                })
        },
        getProductsData() {
            axios.get(`${baseUrl}/v2/api/${api_path}/admin/products`)
                .then(res => {
                    console.log(res.data);
                    this.products = res.data.products;
                    console.log(this.products);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getProductDetail(product){
            this.tempProduct = product;
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    }
}

createApp(app).mount('#app');