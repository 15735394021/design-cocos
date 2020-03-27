cc.Class({
    extends: cc.Component,

    properties: {
        hit_audio:{
            type:cc.AudioClip,
            default:null
        }
    },

    onLoad () {
        this.groundJs = this.node.getComponent("ground");
        let _this = this;
        _this.groundJs.onLoadYMovieClip=function(ymc,layerName,bo){
            if(ymc.name == "hk1"){
                ymc.on("sound",function(event){
                    cc.audioEngine.play(_this.hit_audio,false,0.3);
                })
            }
        }
        this.groundJs.onLoadSprite=function(node,name){
            // console.log(_this.groundJs.getLayerNodeFun("map").getComponent(cc.BoxCollider));
            // console.log(node.getComponent(cc.BoxCollider));
            // console.log(_this.groundJs.getLayerNodeFun("map").MyRect);
            
        }
    },

    start () {
        
    },

    // update (dt) {},
});
