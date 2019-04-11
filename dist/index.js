const preventBack = {
    methods:{
        prevent_back(){
            let path = this.$route.fullPath;
            if(this.$router.mode=='hash'){
                path = '#'+path;
            }
            window.pushStateFun = function(){
                let state = { 
                    title: null, 
                    url: path,
                }; 
                window.history.pushState(state,null, path);
            }
            var state = { 
                title: null, 
                url: path,
            }; 
            window.history.pushState(state, null, path);
            window.addEventListener("popstate", window.pushStateFun, false);
        }
    },
    mounted() {
        if (this.$vnode && this.$vnode.data.keepAlive) {
            return;
        }else{
            this.prevent_back();
        }
    },
    activated(){
        this.prevent_back();
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener("popstate", window.pushStateFun, false);
        next();
    }
};
export default preventBack;