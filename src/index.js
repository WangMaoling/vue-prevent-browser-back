const preventBack = {
    methods: {
        /**
         * 页面处理返回事件, 组件通过重写这个函数。达成细粒度的返回控制。
         * return true 表示自己处理返回事件，拦截返回上一页面。否则返回上一页面。
         */
        onBack() {
            return true;
        },
        prevent_back() {
            let self = this;
            let path = this.$route.fullPath;
            // 判断是否开启了后端支持
            if (this.$router.mode == 'hash') {
                path =  '#' + path;
            }

            //存在基路径时加上基路径
            if (this.$router.options.base) {
                path = `${this.$router.options.base}${path}`.replace('//', '/')
            }

            window.pushStateFun = function () {
                if (self.onBack()) {
                    let state = {
                        title: null,
                        url: path //要禁掉的页面
                    };
                    /* 
                        三个参数：
                        state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
                        title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
                        url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
                    */
                    window.history.pushState(state, null, path); //要禁掉的页面
                }else{
                    self.$router.back();
                }
            }
            var state = {
                title: null,
                url: path //要禁掉的页面
            };
            window.history.pushState(state, null, path); //要禁掉的页面
            window.addEventListener("popstate", window.pushStateFun, false);
        }
    },
    mounted() {
        // 判断组件是否有缓存
        if (this.$vnode && this.$vnode.data.keepAlive) {
            // if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
            // console.log('有缓存')
            // }
            return;
        } else {
            this.prevent_back();
        }
    },
    activated() {
        this.prevent_back();
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener("popstate", window.pushStateFun, false);
        next();
    }
};
export default preventBack;