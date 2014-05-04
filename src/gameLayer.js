/**
 * Created by hlh on 14-5-4.
 */
var GameLayer = cc.Layer.extend({
    bg: null,
    winSz: null,
    orgx: 0,
    orgy: 0,
    dstx: 0,
    dsty: 0,
    blockArr: null,
    ctor: function(){
        this._super();
        this.winSz = cc.director.getWinSize();
        this.bg = cc.LayerColor.create(cc.color(200, 190, 180, 255),
            this.winSz.width,
            this.winSz.height);
        this.addChild(this.bg);

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
                        continue;
                    }
                    if (!prefixDo && currentValue == prefixValue){
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+prefixIndex].updateNumber(2*prefixValue);
                        prefixValue = 2*prefixValue;
                        prefixDo = true;
                    }else{
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+prefixIndex+1].updateNumber(currentValue);
                        prefixIndex += 1;
                        prefixValue = currentValue;
                        prefixDo = false;
                    }
                }
            }
        }
    },
    onMoveRight: function(){
        cc.log("Move Right");
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
                        prefixIndex = 4-1;
                        prefixValue = this.blockArr[row*4+prefixIndex].number;
                        continue;
                    }
                    if (!prefixDo && currentValue == prefixValue)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+prefixIndex].updateNumber(2*currentValue);
                        prefixValue = 2*currentValue;
                        prefixDo = true;
                    }
                    else
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[row*4+prefixIndex-1].updateNumber(currentValue);
                        prefixIndex -= 1;
                        prefixValue = currentValue;
                        prefixDo = false;
                    }
                }
            }
        }
    },
    onMoveUp: function(){
        cc.log("Move Up");
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
                        this.blockArr[0*4+col].updateNumber(currentValue);
                        prefixIndex = 0;
                        prefixValue = currentValue;
                        continue;
                    }
                    if (!prefixDo && currentValue == prefixValue)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[prefixIndex*4+col].updateNumber(2*currentValue);
                        prefixValue = 2*currentValue;
                        prefixDo = true;
                    }
                    else
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[(prefixIndex+1)*4+col].updateNumber(currentValue);
                        prefixIndex += 1;
                        prefixValue = currentValue;
                        prefixDo = false;
                    }
                }
            }
        }
    },
    onMoveDown: function(){
        cc.log("Move Down");
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
                        prefixIndex = 4-1;
                        prefixValue = this.blockarr[prefixIndex*4+col].number;
                        continue;
                    }
                    if (!prefixDo && currentValue == prefixValue)
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[prefixIndex*4+col].updateNumber(2*currentValue);
                        prefixValue = 2*currentValue;
                        prefixDo = true;
                    }
                    else
                    {
                        this.blockArr[row*4+col].updateNumber(0);
                        this.blockArr[(prefixIndex-1)*4+col].updateNumber(currentValue);
                        prefixIndex -= 1;
                        prefixValue = currentValue;
                        prefixDo = false;
                    }
                }
            }
        }
    },
    createBlocks: function(){
        var blockSz = Math.min(this.winSz.width/5, this.winSz.height/5);
        var xOffset = (this.winSz.width - 4*(blockSz-10))/2;
        var yOffset = (this.winSz.height - 4*(blockSz-10))/2;
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                var block = new Block(2, blockSz-10, blockSz-10);
                block.attr({
                    x: j*blockSz + xOffset,
                    y: i*blockSz + yOffset
                });
                this.addChild(block);
                this.blockArr[i*4+j] = block;
            }
        }
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
