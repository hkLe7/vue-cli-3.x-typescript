<template>
  <div class="mod-first-page">
    <input v-model="msg">
    <p>prop: {{propMessage}}</p>
    <p>msg: {{msg}}</p>
    <p>helloMsg: {{helloMsg}}</p>
    <p>computed msg: {{computedMsg}}</p>
    <button @click="greet">Greet</button>
    <button @click="showEmit">Emit</button>
    <section class="colors"
    v-show="computedMsg.length >= 10">
        <span class="vue-colors">vue</span>
        <span>&nbsp;</span>
        <span class="ts-colors">typescript</span>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { ajaxPost, ajaxGet } from "@/utils/util.js";

@Component
export default class FirstPage extends Vue {
    // props
    @Prop([String, Boolean]) private propMessage;
    @Prop(Number) private propA!: number;
    @Prop({ default: 'default value' }) private propB!: string;
    // 初始化 data
    private msg: number = 123;
    private helloMsg = "Hello, " + this.propMessage;
    private emitMsg: string  = "This is emitMsg";

    // watch
    @Watch('msg')
    public onChildChanged(val: number, oldVal: number) {
        if (val > 6) {
            console.log('msg is changed');
        }
    }

    // computed
    get computedMsg() {
        return "computed " + this.msg;
    }

    // 生命周期钩子
    public beforeCreate() {
        console.log('beforeCreate');
    }

    public created() {
        this.sayMsg();
    }

    public beforeMount() {
        console.log('beforeMount');
    }

    public mounted() {
        this.greet();
    }

    public beforeUpdate() {
        console.log('beforeUpdate');
    }

    public updated() {
        console.log('updated');
    }

    public beforeDestroy() {
        console.log('beforeDestroy');
    }

    public destroyed() {
        console.log('destroyed');
    }

    // methods
    public sayMsg() {
        console.log('created');
    }

    public showEmit() {
        this.greetEmit(this.emitMsg);
    }

    @Emit()
    public greetEmit(msg: string) {
        console.log('emit');
    }

    public greet() {
        console.log("mounted - greeting: " + this.msg);
    }
}
</script>
<style lang="less" scoped>
.mod-first-page {
    .colors {
        text-align: center;
        font-size: 22px;
        .vue-colors {
            color: #42b983;
        }
        .ts-colors {
            color: #006FC5;
        }
    }
}

</style>
