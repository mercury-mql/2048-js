cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.spriteFrameCache.addSpriteFrames(res.Elements_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Welcome_plist);
        cc.director.runScene(new WelcomeScene());
    }, this);
};
cc.game.run();