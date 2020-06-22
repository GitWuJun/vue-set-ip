<template>
  <div id="app">
      <my-component></my-component>
  </div>
</template>

<script>
import myComponent from '@/components/my-component'
export default {
  name: 'App',
  components: {
      myComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
