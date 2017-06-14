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
 @import "assets/_colors.less";
 @import "assets/utils.less";
 
 #app {
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     color: @blk;
     
     width: 100%;
     max-width: 900px;
     margin: 0 auto;

     > header {
         background: @blk;
         color: yellow;
         padding: .5em;
         
	 h1 {
	     margin: 0;
             text-transform: uppercase;
	 }
     }

     > main {
         padding: 1.5em 1em;
     }
 }
</style>
