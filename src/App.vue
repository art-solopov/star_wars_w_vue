<template>
    <div id="app">
	<header>
	    <h1>Star Wars with Vue</h1>
	</header>
	<main>
	    <router-view></router-view>
	</main>
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
 @import "~normalize.css"
</style>

<style lang="less">
 #app {
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     color: #2c3e50;
     
     width: 100%;
     max-width: 900px;
     margin: 0 auto;
     padding: .5em;

     header {
	 h1 {
	     margin: 0 0 .5em;
	 }
     }
}
</style>
