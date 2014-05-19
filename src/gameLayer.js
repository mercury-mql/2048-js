/**
 * Created by hlh on 14-5-4.
 */
var GameLayer = cc.Layer.extend({
    bg: null,
    sbg : null,
    winSz: null,
    orgx: 0,
    orgy: 0,
    dstx: 0,
    dsty: 0,
    blockArr: null,
    score: 0,
    maxnum: 2,
    mainNode: null,
    uiRoot: null,
    uiScoreLabel: null,
    pauseButton: null,
    ctor: function(){
        this._super();
        this.winSz = cc.director.getWinSize();
        this.mainNode = cc.Node.create();
        this.addChild(this.mainNode);

        this.uiRoot = ccs.uiReader.widgetFromJsonFile(res.Game_json);
        this.mainNode.addChild(this.uiRoot);

        this.pauseButton = ccui.helper.seekWidgetByName(this.uiRoot, "pause");
        this.pauseButton.addTouchEventListener(this.onPause, this);

        this.uiScoreLabel = ccui.helper.seekWidgetByName(this.uiRoot, "scorevalue");
        /*
        this.bg = cc.Sprite.create("#bk-little.png");
        this.bg.attr({
            x : this.winSz.width/2,
            y : this.winSz.height/2
        });
        this.addChild(this.bg);

        this.sbg = cc.Sprite.create("#second-bk.png");
        this.sbg.attr({
            x : this.winSz.width/2,
            y : this.winSz.height/2 - 25
        });
        this.addChild(this.sbg);
        */

        this.blockArr = new Array();

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                var loc = touch.getLocationInView();
                this.orgx = loc.x;
                this.orgy = loc.y;
                return true;
            },
            onTouchEnded: function(touch, event){
                var target = event.getCurrentTarget();
                var loc = touch.getLocationInView();
                this.dstx = loc.x;
                this.dsty = loc.y;

                if( Math.abs(this.dstx - this.orgx) >= Math.abs(this.dsty - this.orgy) ){
                    if( this.dstx > this.orgx ){
                        target.onMoveRight();
                    }else{
                        target.onMoveLeft();
                    }
                }else{
                    if( this.dsty > this.orgy ){
                        target.onMoveUp();
                    }else{
                        target.onMoveDown();
                    }
                }
            }
        });
        cc.eventManager.addListener(listener, this);
        this.createBlocks();
        return true;
    },
    onMoveLeft: function(){
        cc.log("Move Left");
        var shouldAdd = false;
        for (var row = 0; row < 4; row++){
            var prefixIndex = -1;
            var prefixValue = 0;
            var currentValue = 0;
            var prefixDo = false;
            for (var col=0; col<4; col++){
                currentValue = this.blockArr[row*4+col].number;
                if (currentValue > 0){
                    if (prefixIndex < 0){
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+0].updateNumber(currentValue);
                        prefixIndex = 0;
                        prefixValue = currentValue;
                        if( col != 0 ){
                            shoudlAdd = true;
                        }
                        continue;
                    }
                    if (!prefixDo && currentValue == prefixValue){
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+prefixIndex].updateNumber(2*prefixValue);
                        this.score += 2 * prefixValue;
                        this.maxnum = (this.maxnum < this.score) ? this.score : this.maxnum;
                        prefixValue = 2*prefixValue;
                        prefixDo = true;
                        shouldAdd = true;
                        if( prefixValue == 2048 ){
                            this.success();
                        }
                    }else{
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+prefixIndex+1].updateNumber(currentValue);
                        if( col != prefixIndex+1 ){
                            shouldAdd = true;
                        }
                        prefixIndex += 1;
                        prefixValue = currentValue;
                        prefixDo = false;
                    }
                }
            }
        }
        this.addOneRandom(shouldAdd);
        this.updateScoreValue();
    },
    onMoveRight: function(){
        cc.log("Move Right");
        var shouldAdd = false;
        for (var row = 0; row < 4; row++)
        {
            var prefixIndex = -1;
            var prefixValue = 0;
            var currentValue = 0;
            var prefixDo = false;
            for (var col = 4-1; col >= 0; col--)
            {
                currentValue = this.blockArr[row*4+col].number;
                if (currentValue > 0)
                {
                    if (prefixIndex < 0)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+4-1].updateNumber(currentValue);
                        if( col != 3 ){
                            shouldAdd = true;
                        }
                        prefixIndex = 4-1;
                        prefixValue = this.blockArr[row*4+prefixIndex].number;
                        continue;
                    }
                    if (!prefixDo && currentValue == prefixValue)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+prefixIndex].updateNumber(2*currentValue);
                        this.score += 2 * prefixValue;
                        this.maxnum = (this.maxnum < this.score) ? this.score : this.maxnum;
                        prefixValue = 2*currentValue;
                        prefixDo = true;
                        shouldAdd = true;
                        if( prefixValue == 2048 ){
                            this.success();
                        }
                    }
                    else
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+prefixIndex-1].updateNumber(currentValue);
                        if( col != prefixIndex-1 ){
                            shouldAdd = true;
                        }
                        prefixIndex -= 1;
                        prefixValue = currentValue;
                        prefixDo = false;
                    }
                }
            }
        }
        this.addOneRandom(shouldAdd);
        this.updateScoreValue();
    },
    onMoveUp: function(){
        cc.log("Move Up");
        var shouldAdd = false;
        for (var col = 0; col < 4; col++)
        {
            var prefixIndex = -1;
            var prefixValue = 0;
            var currentValue = 0;
            var prefixDo = false;
            for (var row = 4-1; row >= 0; row--)
            {
                currentValue = this.blockArr[row*4+col].number;
                if (currentValue > 0)
                {
                    if (prefixIndex < 0)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[(4-1)*4+col].updateNumber(currentValue);
                        if( row != 3 ){
                            shouldAdd = true;
                        }
                        prefixIndex = 4-1;
                        prefixValue = currentValue;
                        continue;
                    }
                    if (!prefixDo && currentValue == prefixValue)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[prefixIndex*4+col].updateNumber(2*currentValue);
                        this.score += 2 * prefixValue;
                        this.maxnum = (this.maxnum < this.score) ? this.score : this.maxnum;
                        prefixValue = 2*currentValue;
                        prefixDo = true;
                        shouldAdd = true;
                        if( prefixValue == 2048 ){
                            this.success();
                        }
                    }
                    else
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[(prefixIndex-1)*4+col].updateNumber(currentValue);
                        if( (prefixIndex-1) != row ){
                            shouldAdd = true;
                        }
                        prefixIndex -= 1;
                        prefixValue = currentValue;
                        prefixDo = false;
                    }
                }
            }
        }
        this.addOneRandom(shouldAdd);
        this.updateScoreValue();
    },
    onMoveDown: function(){
        cc.log("Move Down");
        var shouldAdd = false;
        for (var col = 0; col < 4; col++)
        {
            var prefixIndex = -1;
            var prefixValue = 0;
            var currentValue = 0;
            var prefixDo = false;
            for (var row=0; row<4; row++)
            {
                currentValue = this.blockArr[row*4+col].number;
                if (currentValue > 0)
                {
                    if (prefixIndex < 0)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[0+col].updateNumber(currentValue);
                        if(row != 0){
                            shouldAdd = true;
                        }
                        prefixIndex = 0;
                        prefixValue = currentValue;
                        continue;
                    }
                    if (!prefixDo && currentValue == prefixValue)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[prefixIndex*4+col].updateNumber(2*currentValue);
                        this.score += 2 * prefixValue;
                        this.maxnum = (this.maxnum < this.score) ? this.score : this.maxnum;
                        prefixValue = 2*currentValue;
                        prefixDo = true;
                        shouldAdd = true;
                        if( prefixValue == 2048 ){
                            this.success();
                        }
                    }
                    else
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[(prefixIndex+1)*4+col].updateNumber(currentValue);
                        if( row != (prefixIndex+1) ){
                            shouldAdd = true;
                        }
                        prefixIndex += 1;
                        prefixValue = currentValue;
                        prefixDo = false;
                    }
                }
            }
        }
        this.addOneRandom(shouldAdd);
        this.updateScoreValue();

    },
    onPause: function(){
        cc.log("On Pause");
    },
    updateScoreValue: function(){
      this.uiScoreLabel.setText(this.score.toString());
    },
    getEmptyArr: function(){
        var emptyArr = new Array();
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                if(this.blockArr[i*4+j].number == 0){
                    emptyArr.push(i*4+j);
                }
            }
        }
        return emptyArr;
    },
    createBlocks: function(){
        var blockSz = Math.min(this.winSz.width/5, this.winSz.height/5);
        var xOffset = (this.winSz.width - 4*(blockSz-10))/2;
        var yOffset = (this.winSz.height - 4*(blockSz-10))/2;
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                var block = new Block(0, blockSz-10, blockSz-10);
                block.attr({
                    x: j*blockSz + xOffset,
                    y: i*blockSz + yOffset/4
                });
                this.addChild(block, 1);
                this.blockArr[i*4+j] = block;
            }
        }
        this.addTwoRandom();
    },
    addTwoRandom: function(){
      var emptyArr = this.getEmptyArr();
      var first = Math.round(Math.random()*emptyArr.length-1);
      var second = Math.round(Math.random()*emptyArr.length-1);
      while(emptyArr.length > 1 && first == second){
          first = Math.round(Math.random()*emptyArr.length-1);
          second = Math.round(Math.random()*emptyArr.length-1);
      }
      var firstIndex = emptyArr[first];
      var secondIndex = emptyArr[second];
      this.blockArr[firstIndex].updateNumber(2);
      this.blockArr[secondIndex].updateNumber(2);
    },
    addOneRandom: function(shouldAdd){
        var emptyArr = this.getEmptyArr();
        if(emptyArr.length == 0){
            this.gameOver();
            return;
        }
        if(shouldAdd == false){
            return
        }
        var index = Math.round(Math.random()*emptyArr.length-1);
        index = index < 0 ? 0 : index;
        var blockIndex = emptyArr[index];
        cc.log("len is %d, index is %d, blockIndex is %d", emptyArr.length, index, blockIndex);
        var number = cc.random0To1() > 0.95 ? 4 : 2;
        this.blockArr[blockIndex].updateNumber(number);
    },
    gameOver: function(){
        cc.log("Game over");
        cc.director.runScene(new GameOverScene());
    },
    success: function(){
        cc.log("Congradulations");
    },
    printBlocks: function(){
        var str = "\n";
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                str += this.blockArr[i*4+j].number.toString();
            }
            str += "\n";
        }
        cc.log(str);
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});
