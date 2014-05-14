/**
 * Created by owl on 14-5-6.
 */

var GameOverLayer = cc.Layer.extend({
    mainNode: null,
    score: null,
    record: null,
    maxNumber: null,
    returnBtn: null,
    refreshBtn: null,
    closeBtn: null,
    rankBtn: null,
    ctor: function(){
        this._super();
        this.mainNode = cc.Node.create();
        this.addChild(this.mainNode);

        var root = ccs.uiReader.widgetFromJsonFile(res.Ui2_json);
        this.mainNode.addChild(root);

        this.score = ccui.helper.seekWidgetByName(root, "score");
        this.record = ccui.helper.seekWidgetByName(root, "record");
        this.maxNumber = ccui.helper.seekWidgetByName(root, "maxnum");

        this.returnBtn = ccui.helper.seekWidgetByName(root, "return");
        this.returnBtn.addTouchEventListener(this.onReturn, this);

        this.refreshBtn = ccui.helper.seekWidgetByName(root, "refresh");
        this.refreshBtn.addTouchEventListener(this.onRefresh, this);

        this.closeBtn = ccui.helper.seekWidgetByName(root, "close");
        this.closeBtn.addTouchEventListener(this.onClose, this);

        this.rankBtn = ccui.helper.seekWidgetByName(root, "rank");
        this.rankBtn.addTouchEventListener(this.onRank, this);
        return true;
    },
    onReturn: function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("onReturn");
            cc.director.runScene(new WelcomeScene());
        }
    },
    onRefresh: function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("onRefresh");
            cc.director.runScene(new GameScene());
        }
    },
    onClose: function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("onClose");
            cc.director.end();
        }
    },
    onRank: function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("onRank");
        }
    }
});

var GameOverScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var gameoverLayer = new GameOverLayer();
        this.addChild(gameoverLayer);
    }
});
