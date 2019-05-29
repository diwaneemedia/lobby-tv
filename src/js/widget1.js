export default function(){
 var widget1  = new PIXI.Container();
 var sttyle = new PIXI.TextStyle({
    fill: "#ffffff",
    fontSize: 35
 });
 var sttyle2 = new PIXI.TextStyle({
    fill: "#ffffff",
    fontSize: 13
 });
 var sttyle3 = new PIXI.TextStyle({
    fill: "#ffffff",
    fontSize: 11
 });
 var sttyle4 = new PIXI.TextStyle({
    fill: "#ffffff",
    fontSize: 13
 });

 var blurFilter1 = new PIXI.filters.BlurFilter();

 window.w1 = {
       width:1000,
       height:260,
       sliders:[],
       container: new PIXI.Graphics(),
       mask: new PIXI.Graphics(),
       textStyle: [{
         first: new PIXI.TextStyle({
            fill: "#ffffff",
            fontSize: 80,
            fontWeight:500,
            textTransform: "uppercase"
         }),
       }],
       textBlur: new PIXI.Graphics(),
       text: ["SÉCURITÉ"],
       init: function(){
         this.textBlur.beginFill("0x2fff00", 0.31);
         this.textBlur.filters = [blurFilter1];
         this.mask.beginFill("0xff");
         this.mask.drawRect(0,0,1000,this.height);

         this.textBlur.drawRoundedRect(80, 80, 160, 140, 60);
         this.container.addChild(this.textBlur);
         for (var i = 0; i < this.text.length; i++) {
           var text = this.text[i];
           this.text[i] = new PIXI.Text(this.text[i] , sttyle);
           this.container.addChild(this.text[i]);
         }
         this.text[0].x = 20;
         this.text[0].y = 20;
         // this.text[1].x = 100;
         // this.text[1].style.fontSize = 100;
         // this.text[1].y = 100;
         this.drawSelf();
         this.container.mask = this.mask;
         this.grow();
         this.container.addChild(this.mask);
         window.app.stage.addChild(widget1);
       },
       drawSelf: function(){
         this.container.beginFill(0x414141);
         this.container.drawRect(0, 0, this.width, this.height);
         this.container.beginFill(0x333333);
         this.container.drawRect(20, 50, this.width - 40, this.height - 70);


         widget1.addChild(this.container);
       },
       grow: function(){
         window.growTween = PIXI.tweenManager.createTween(this.mask);
         growTween.from({ width:360 }).to({ width: 1000 });
         growTween.time = 1350;
         growTween.easing = PIXI.tween.Easing.inOutQuad();
         growTween.start();
         growTween.pingPong = true;
         growTween.on("update", function(){
           if (this._elapsedTime >= this.time/2){
             this.stop();
             growTween.off("update", function(){
               console.log("removed bind");
             });
           }
         });
       },
       shrink: function(){
         growTween.pingPong = true;
         console.log("adgg");
         // growTween._elapsedTime = growTween.time/2;
         growTween.start();
         for (var i = 0; i < this.sliders.length; i++) {
           this.sliders[i].shrink();
         }
       }



  };
  function upSlider(value, maxValue, color, label){
    this.container = new PIXI.Container();
    this.container.alpha = 0;
    this.value = value || 29;
    this.maxValue = maxValue || 100;
    this.height = 100;
    this.width = 30;
    this.tweenManager = new PIXI.tween.TweenManager();
    this.label = label || 2014;
    this.color = color || "0xFF0000";
    this.sliderBck = new PIXI.Graphics();
    this.sliderFront = new PIXI.Graphics();
    this.sliderLine = new PIXI.Graphics();
    this.sliderBlur = new PIXI.Graphics();
    this.sliderMask = new PIXI.Graphics();
    this.valueText = '';
    this.valueTextUp = '';
    this.bar = {
      x:5,
      y: 95,
      width:20,
      height:  0,
      radius:10,
      opacity:0
    }
    let that = this;
    this.show = function(){
// Line Animation
      const lineTween = PIXI.tweenManager.createTween(this.sliderLine);
      lineTween.addTo(this.tweenManager);
      lineTween.from({ y:0 }).to({ y: -100 * value / 100 });
      lineTween.time = 1200;
      lineTween.easing = PIXI.tween.Easing.inOutQuad();
      // tween.repeat = 10;
      // lineTween.on('start', () => { console.log('tween started') });
      // lineTween.on('repeat', ( loopCount ) => { console.log('loopCount: ' + loopCount) });

// Line-Value Animation
      const lineValueTween = PIXI.tweenManager.createTween(this.valueText);
      lineValueTween.addTo(this.tweenManager);
      lineValueTween.from({ y:94 }).to({ y: 100 - value -6});
      lineValueTween.time = 1200;
      lineValueTween.easing =  PIXI.tween.Easing.inOutQuad();
      // tween.repeat = 10;
      // lineValueTween.on('start', () => { console.log('tween started') });
      lineValueTween.on('update', () => {
        this.valueText.text = Math.floor(this.sliderLine.y * -1)
        // this.bar.height = -this.sliderLine.y;
      });
      // lineValueTween.on('repeat', ( loopCount ) => { console.log('loopCount: ' + loopCount) });
      lineValueTween.start();
      lineTween.start();
// Bar Animation
      const barTween = PIXI.tweenManager.createTween(this.bar);
      barTween.addTo(this.tweenManager);
      barTween.from({
        y: 95,
        height:0,
        opacity:0
      }).to({
        y:5 + 90 - this.maxValue / 90 * this.value,
        height: this.value,
        opacity:0.25
      });
      barTween.time = 1200;
      barTween.easing =  PIXI.tween.Easing.inOutQuad();
      barTween.on('update', () => {
        // console.log(barTween._elapsedTime /(barTween.time/100)/100);
        that.container.alpha = barTween._elapsedTime /(barTween.time/100)/100;
      });
      barTween.delay = 300;
      barTween.start();
    }
    this.shrink = function(){
      console.log("sring");
      console.log(that);
      for (var i = 0; i < that.tweenManager.tweens.length; i++) {
        console.log("it's ironic");
        console.log(that.tweenManager.tweens[i]._elapsedTime);
        that.tweenManager.tweens[i].reset();
         console.log(that.tweenManager.tweens[i]._elapsedTime);
        that.tweenManager.tweens[i]._elapsedTime = 0;

        console.log(that.tweenManager.tweens[i]._elapsedTime);
      }
      // console.log(that.tweenManager);
    }
    this.init = function(delay){
      let _this = this;

      this.sliderBck.beginFill(0x73766d);
      this.sliderBck.drawRoundedRect(0, 0, 30, 100, 15);
      this.sliderBck.beginFill(0xFFFFFF);
      this.sliderBck.drawRect(-35, -20, 1, 140);
      this.sliderFront.beginFill(0xFFFFFF);
      this.sliderFront.mask = this.sliderMask;
      // this.sliderFront.drawRoundedRect(5, 5 + 90 - this.maxValue / 90 * this.value, 20, this.maxValue / 90 * this.value, 12);
      this.sliderLine.beginFill(0xFFFFFF);
      this.sliderLine.drawRect(-10,this.height , 50, 1);
      this.sliderBlur.beginFill(this.color, 0.25);
      this.sliderBlur.drawRoundedRect(-10, - 10 + 5 + 90 - this.maxValue / 90 * this.value, 50, this.maxValue / 90 * this.value + 20, 25);
      this.sliderMask.beginFill(0xff0000);
      this.sliderMask.drawRoundedRect(5, 5, 20, 90, 10);
      this.label = new PIXI.Text(this.label, sttyle2);
      this.valueText = new PIXI.Text(this.value, sttyle3);
      this.valueText.x = 45;
      // this.valueText.y = 12 + 90 - this.maxValue / 90 * this.value;
      this.valueTextUp = new PIXI.Text(this.value + Math.random().toFixed(1) / 10, sttyle4);
      this.valueTextUp.x = 0;
      this.valueTextUp.y = -27;
      this.label.y = 110;
      this.container.addChild(this.sliderBck);
      this.container.addChild(this.sliderBlur);
      this.container.addChild(this.sliderFront);
      this.container.addChild(this.sliderLine);
      this.container.addChild(this.sliderLine);
      this.container.addChild(this.valueTextUp);
      this.container.addChild(this.sliderMask);
      this.container.addChild(this.label);
      this.container.addChild(this.valueText);
      this.sliderBlur.filters = [blurFilter1];
      widget1.addChild(this.container);

      app.ticker.add(function() {
        _this.sliderFront.clear();
        _this.sliderBlur.clear();
        _this.sliderFront.beginFill(0xFFFFFF);
        _this.sliderFront.drawRoundedRect(_this.bar.x, _this.bar.y, _this.bar.width, 90, _this.bar.radius);

        _this.sliderBlur.beginFill(_this.color, _this.bar.opacity);
        _this.sliderBlur.drawRoundedRect(_this.bar.x - 10, _this.bar.y - 10, _this.bar.width + 20, _this.bar.height + 20, _this.bar.radius);
      });
      setTimeout(function(){
        _this.show();
      }, delay)
    }
  }
  w1.init();
  for (var i = 0; i < 5; i++) {
    var color = i >= 2 ? "0xff0000":"0x2fff00";

    var slider = new upSlider(20 + Math.floor(Math.random()*60),100,  color, 2014+i);
    slider.container.x = 450 + i* 110;
    slider.container.y = 100;

    slider.init(i*200);
    slider.container.mask = w1.mask;
    w1.sliders[i] = slider;
  }
}
