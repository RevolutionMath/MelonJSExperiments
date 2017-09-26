// create a basic GUI Object
var myButton = me.GUI_Object.extend(
    {
       init:function (x, y)
       {
          var settings = {}
          settings.image = "player";
          settings.framewidth = 100;
          settings.frameheight = 50;
          // super constructor
          this._super(me.GUI_Object, "init", [x, y, settings]);
          // define the object z order
          this.pos.z = 4;
       },

       // output something in the console
       // when the object is clicked
       onClick:function (event)
       {
          // don't propagate the event
          return false;
       }
    });
