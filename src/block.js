/**
 * Created by hlh on 14-5-4.
 */

var Block = cc.Node.extend({
    bg: null,
    label: null,
    number: 0,
    ctor: function(num, w, h){
        this._super();
        this.number = num;
        //this.bg = cc.LayerColor.create(cc.color(180, 170, 160, 255), w, h);
        this.ignoreAnchorPointForPosition(false);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        var frameName = "s" + this.number.toString() + ".png";
        var frameSprite = cc.spriteFrameCache.getSpriteFrame(frameName);
        //this.bg = cc.Sprite.create(frameSprite);
        this.bg = cc.Sprite.create(res.Test_png);
        this.bg.setPosition(cc.p(w/2, h/2));
        this.addChild(this.bg);

        var text = "";
        if(this.number > 0){
            text = this.number.toString();
        }
        this.label = cc.LabelTTF.create(text, "Arial", 30);
        this.label.setPosition(cc.p(w/2, h/2));
        this.addChild(this.label);

        return true;
    },
    updateNumber: function(num){
        this.number = num;
        var text = "";
        if(this.number > 0){
            text = this.number.toString();
        }
        this.label.setString(text);

        var frameName = "s" + this.number.toString() + ".png";
        var frameSprite = cc.spriteFrameCache.getSpriteFrame(frameName);
        this.bg.setSpriteFrame(frameSprite)
    }
});
