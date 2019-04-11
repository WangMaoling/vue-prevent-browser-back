Prevent Browser Back for Vue2.

模拟阻止（适用于PC，移动端）：在需要阻止浏览器返回上一页的页面使用次插件，当点击浏览器返回上一页时使页面不做任何变化。

## Install

```bash
npm install vue-prevent-browser-back --save
```


## Usage

在需要阻止的组件单独引入，然后注入...

```html
<template>
    <div>
    </div>
</template>
<script>
    import Home from "@/components/common/Home.vue";
    import preventBack from 'vue-prevent-browser-back';//组件内单独引入
    export default {
        mixins: [preventBack],//注入
        data() {
            return {};
        }
    };
</script>
```
[demo](http://test.ofoyou.com/preventBack/)

[Sources](https://github.com/WangMaoling/vue-prevent-browser-back)

