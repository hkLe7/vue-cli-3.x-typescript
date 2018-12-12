<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends Vue {
}
</script>
<style lang="less" scoped>
.mod-about {
    h1 {
        color: #006FC5;
    }
}
</style>