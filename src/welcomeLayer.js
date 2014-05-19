/**
 * Created by owl on 14-5-6.
 */

var WelcomeLayer = cc.Layer.extend({
    mainNode : null,
    ctor : function(){
        this._super();
        this.mainNode = cc.Node.create();
        this.addChild(this.mainNode);

        var root = ccs.uiReader.widgetFromJsonFile(res.Welcome_json);
        this.mainNode.addChild(root);

        var statisticBtn = ccui.helper.seekWidgetByName(root, "statistic");
        statisticBtn.addTouchEventListener(this.statistic, this);

        var startBtn = ccui.helper.seekWidgetByName(root, "start");
        startBtn.addTouchEventListener(this.start, this);

        var setupBtn = ccui.helper.seekWidgetByName(root, "setup");
        setupBtn.addTouchEventListener(this.setup, this);

        var rankBtn = ccui.helper.seekWidgetByName(root, "rank");
        rankBtn.addTouchEventListener(this.rank, this);

        var userEditBtn = ccui.helper.seekWidgetByName(root, "user");
        userEditBtn.addTouchEventListener(this.userEdit, this);

        var googleBtn = ccui.helper.seekWidgetByName(root, "google");
        googleBtn.addTouchEventListener(this.google, this);

        var twitterBtn = ccui.helper.seekWidgetByName(root, "twitter");
        twitterBtn.addTouchEventListener(this.twitter, this);

        var weixinBtn = ccui.helper.seekWidgetByName(root, "weixin");
        weixinBtn.addTouchEventListener(this.weixin, this);

        var weiboBtn = ccui.helper.seekWidgetByName(root, "weibo");
        weiboBtn.addTouchEventListener(this.weibo, this);

        return true;
    },
    statistic : function(sender, type){
       if(type == ccui.Widget.TOUCH_ENDED){
           cc.log("Statistic");
       }
    },
    start : function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("Start");
            cc.director.runScene(new GameScene());
        }

    },
    setup : function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("Setup");
        }
    },
    rank : function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("Rank");
        }

    },
    userEdit : function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("Edit user");
        }
    },
    google : function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("Google");
        }

    },
    twitter : function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("Twitter");
        }
    },
    weixin : function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("Wei Xin");
        }
    },
    weibo : function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("Wei Bo");
        }
    }
});

var WelcomeScene = cc.Scene.extend({
    onEnter : function(){
        this._super();
        var welcomeLayer = new WelcomeLayer();
        this.addChild(welcomeLayer);
    }
});
