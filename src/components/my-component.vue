<template>
    <div>
        <button @click="loginRequest">login</button>

        <button @click="getList">getList</button>
    </div>
</template>

<script>
import fetch from '@/libs/fetch.js';
export default {
    name: 'my-component',
    data() {
        return {};
    },
    methods: {
        loginRequest() {
            let reqParams = {
                name: 'alan',
                password: '123456'
            };
            fetch({
                url: '/upms/login',
                method: 'post',
                data: reqParams
            })
                .then(res => {})
                .catch(err => {});
        },

        getList() {
            let reqParams = {
                type: 'common'
            };
            fetch({
                url: '/list',
                method: 'post',
                data: reqParams
            })
                .then(res => {})
                .catch(err => {});
        }
    }
};
</script>

<style scoped>
button{
    display: block;

    width: 200px;

    margin-bottom: 20px;
}
</style>