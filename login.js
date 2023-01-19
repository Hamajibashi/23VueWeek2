import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const baseUrl = 'https://vue3-course-api.hexschool.io';

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
            axios.post(`${baseUrl}/v2/admin/signin`, this.userData)
                .then(res => {
                    const { token, expired } = res.data;
                    document.cookie = `hexschool=${token}; expires=${expired};`;
                    window.location = "./products.html";
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}

createApp(app).mount('#app');