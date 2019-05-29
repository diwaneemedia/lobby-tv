import * as PIXI from 'pixi.js';
import tweenManager from 'pixi-tween';



window.app = new PIXI.Application(1000, 600, {backgroundColor : 0x1099bb, antialias:true});

export default function(){
  var counter = 10;

  document.body.appendChild(app.view);
  // create a new Sprite from an image path
  var vaske = PIXI.Sprite.fromImage('/src/images/vaske.png');
  var widget = new PIXI.Container();
  var texture = PIXI.Texture.fromImage('/src/images/vaske.png');
  // center the sprite's anchor point
  vaske.anchor.set(0.5);



  var widgetContainer = {
    x: 0,
    y:0,
    width:50,
    height:50
  }

  var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 120,
    fill: "#ffffff",
    dropShadow: true,
    dropShadowColor: '#ff0300',
    dropShadowBlur: 31,
    // dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 0,
    wordWrap: true,
    wordWrapWidth: 100
  });
  var widgetCube = new PIXI.Graphics();

  widgetCube.drawRect(widgetContainer.x , widgetContainer.y, widgetContainer.width, widgetContainer.height);
  Math.easeInQuad = function (t, b, c, d) {
  	t /= d;
  	return c*t*t + b;
  };



  var basicText = new PIXI.Text(counter , style);
  basicText.x = 0;
  basicText.y = 0;
  widget.addChild(basicText);
  widget.addChild(widgetCube);
  // move the sprite to the center of the screen
  vaske.x = app.screen.width / 2;
  vaske.y = app.screen.height / 2;
  // widget.addChild(vaske);
  app.stage.addChild(widget);
  app.stage.scale.set(1);
  // console.log(basicText);
  // console.log(Tween);
  // Listen for animate update
  app.ticker.add(function(delta) {
      // vaske.rotation += 0.01 * delta;
      counter+=1;
      // widget.removeChild(basicText);
      PIXI.tweenManager.update();

  });




};
