<template>
  <div class="mod-home">
    <div class="logo-area">
        <img class="vue-logo" alt="Vue logo" src="../assets/imgs/vuelogo.png">
        <div class="vue-color-box">
            <div class="place-box1 common-style"></div>
            <div class="place-box2 common-style"></div>
        </div>
        <div class="ts-color-box">
            <div class="place-box3 common-style"></div>
            <div class="place-box4 common-style"></div>
        </div>
        <img class="ts-logo" alt="TS logo" src="../assets/imgs/tslogo.png">
    </div>
    <FirstPage propMessage="从home传入的值"
    @greet-emit="greetEmit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FirstPage from "./pages/FirstPage.vue"; // @ is an alias to /src

@Component({
  components: {
    FirstPage,
  },
})
export default class Home extends Vue {
    private greetEmit(msg: number) {
        alert(msg);
    }
}
</script>
<style lang="less" scoped>
.mod-home {
    .logo-area {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        .vue-box {
            width: 220px;
            height: 200px;
        }
        .vue-color-box {
            position: relative;
            margin-left: 15px;
            width: 30px;
            height: 60px;
            background: #42b983;
            .place-box1 {
                position: absolute;
                top: 0;
                left: 0;
            }
            .place-box2 {
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
        .ts-color-box {
            position: relative;
            margin-right: 15px;
            width: 30px;
            height: 60px;
            background: #006FC5;
            .place-box3 {
                position: absolute;
                top: 0;
                right: 0;
            }
            .place-box4 {
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
        .ts-logo {
            width: 250px;
            height: 61px;
        }
        .common-style {
            width: 15px;
            height: 15px;
            background: #FFF;
        }
    }
}
</style>

