
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        cc.loader.loadRes("images/map/map", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('yanshi2');
            sprite.spriteFrame = frame;
        });
    },

    start () {

    },

    // update (dt) {},
});
