cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示
    },

    start () {

    },

    // update (dt) {},
});
