const Input = {};
cc.Class({
    extends: cc.Component,

    properties: {
        camrea:{
            type:cc.Node,
            default:null,
        },
        groundJsNode:cc.Node,
    },

    onLoad () {
        this.groundJs = this.groundJsNode.getComponent("ground");
        let _this = this;
        this.groundJs.Init=function(){
            _this.groundJs.mapCameraNode = _this.camrea;
            _this.node.parent = _this.groundJs.getLayerNodeFun("map");//把当前节点放进地图js的hero图层
            _this.groundJs.getLayerNodeFun("house").parent = null;
        }
        this.walk = false;
        this.kit = false;
        this._speed = 200;
        this._speed1 = 200;
        this._speed2 = 300;
        this.state = '';
        this.sp = cc.v2(0,0);  //角色当前移动的方向
        this.heroAnim = this.node.getComponent(cc.Animation);
        let p = cc.director.getPhysicsManager();    //得到物理组件
        p.enabled = true;  //启用物理引擎
        // p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示
        cc.director.getCollisionManager().enabled = true; //检测碰撞
        // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示
        p.gravity = cc.v2(0,0);    //关闭重力
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.on_key_down,this);//向系统注册键盘按下事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.on_key_up,this);//向系统注册键盘抬起事件
    },

    onCollisionEnter:function(other , self){
        if(other.tag == 0){
            console.log("撞墙");
            
            // other.node.getCollisionManager.type="static";
        }
        if(other.tag == 1001){
            other.node.gotoAndStop(other.node.currentFrame==1?5:1);
            this.groundJs.setYMovieClipFrame(this.groundJs.getTag("a1001"),other.node.currentFrame,false);//setYMovieClipFrame方法是播放制定动画的帧，第一个参数为动画标记，第二个是帧数，第三个是是播放还是跳到该帧就停止
        }
        if(other.tag == 2001){
            this.groundJs.getLayerNodeFun("house").parent = this.groundJsNode;
            this.node.parent = this.groundJs.getLayerNodeFun("hero");
            this.groundJs.getLayerNodeFun("map").parent = null;
            this.groundJs.getLayerNodeFun("ground").parent = null;
        }
    },

    setState(state){
        if(this.state == state)return;
            this.state = state;
            this.heroAnim.play(this.state);
    },

    hero_stop(){
        this.heroAnim.stop(this.state);
    },

    // hero_go(x,y){
    //     if(x != 0){
    //         this.node.x = this.node.x + (5 * x);
    //     }
    //     if(y != 0){
    //         this.node.y = this.node.y + (5 * x);
    //     }
    // },

    on_key_down(e){           //w:87  s:83   a:65  d:68  j:74  k:75  l:76  u:85  i:73   o:79  shift:16   l:76
        Input[e.keyCode]=1;
        if(e.keyCode == 76){
            this._speed = this._speed2;
        }
    },
    on_key_up(e){        //w:87  s:83   a:65  d:68  j:74  k:75  l:76  u:85  i:73   o:79
        Input[e.keyCode]=0;
        this.state = '';
        switch(e.keyCode){
            case 87:  //上
                this.hero_stop();
                break;
            case 65:  //左
                this.hero_stop();
                break;
            case 68:   //右
                this.hero_stop();
                break;
            case 83:   //下
                this.hero_stop();
                break;
            case 76:
                this._speed = this._speed1;
                break;
        }
    },

    start () {

    },

    update (dt) {

        if(Input[cc.macro.KEY.d]){
            this.sp.x = 1;
        }else if(Input[cc.macro.KEY.a]){
            this.sp.x = -1;
        }else{
            this.sp.x = 0;
        }
        if(Input[cc.macro.KEY.w]){
            this.sp.y = 1;
        }else if(Input[cc.macro.KEY.s]){
            this.sp.y = -1;
        }else{
            this.sp.y = 0;
        }

        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

        if(this.sp.x){
            this.lv.y = 0;
            this.lv.x = this.sp.x * this._speed;
            // this.node.x += this.sp.x * dt * this._speed;
        }else if(this.sp.y){
            this.lv.x = 0;
            this.lv.y = this.sp.y * this._speed;
            // this.node.y += this.sp.y * dt * this._speed;
        }else{
            this.lv.y = 0;
            this.lv.x = 0;
        }
        this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;

        let state = '';
        if(this.sp.x == 1){
            state = "hero_right";
        }else if(this.sp.x == -1){
            state = "hero_left";
        }else if(this.sp.y == 1){
            state = "hero_up";
        }else if(this.sp.y == -1){
            state = "hero_down";
        }
        if(state){
            this.setState(state);
        }
        if(this.camrea !== null){
            this.camrea.x = this.node.x;
            this.camrea.y = this.node.y;
            // this.groundJs.setLocationFun(this.node.x,this.node.y)
        }

    },
});
