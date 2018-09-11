<template>
  <div id="app">
    <div class="container">
        <div class="header">
          <img src="" alt="">
          <ul class="menu">
            <li>
              首页
            </li>
            <li>
              首页
            </li>
            <li>
              首页
            </li>
            <li>
              首页
            </li>
          </ul>
       </div>
       <div class="body">
         <div class="test">

         </div>
       </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>


<style lang='scss'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  margin: 0 10%;
}
.header {
  padding: 20px 50px;
  // background: red;
  vertical-align: middle;

  img {
    width: 80px;
    height: 80px;
    background-color: black;
    display: inline-block;

    vertical-align: middle;
  }
  .menu {
    width: 70%;
    display: inline-block;
    vertical-align: middle;
    height: 80px;
    overflow: hidden;
    white-space: nowrap; //处理块元素中的空白符和换行
    li {
      height: 100%;
      list-style: none;
      display: inline-block; //使li对象显示为一行
      margin-left: 15px;
      width: 80px;
      border-bottom: solid 5px red;
      text-align: center;
      padding: 10px 0;
    }
  }
}
.body {
  height: 800px;
  background: blue;
  position: relative;
  .test {
    width: 100px;
    height: 100px;
    background: black;
    position: absolute;
    right: 10%;
    top: 30%;
  }
}
</style>
