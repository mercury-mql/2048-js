/**
 * Created by hlh on 14-5-4.
 */

var Block = cc.Node.extend({
    bg: null,
    label: null,
    number: 0,
    ctor: function(num, w, h){
        this._super();
        this.bg = cc.LayerColor.create(cc.color(180, 170, 160, 255), w, h);
        this.addChild(this.bg);

        this.number = num;
        this.label = cc.LabelTTF.create(this.number.toString(), "Arial", 30);
        this.label.setPosition(cc.p(w/2, h/2));
        this.addChild(this.label);

        return true;
    },
    updateNumber: function(num){
        this.number = num;
        this.label.setString(this.number.toString());
    }
});
