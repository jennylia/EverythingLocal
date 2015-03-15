/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var nextMonday = function()
{
  var today = new Date();
  //var weekday = today.getDay();
  var weekeday = 3;
  var days;
  
  if(!weekday){
    days = 1;
  }else{
    days = 8 - weekday;
  }
   
  var days_text = "days";
  
  if(days == 1){
     days_text = "day";
  }
  
  var msg = "Next monday in: " + days + " " + days_text;
  
  if (weekday == 1){
    msg = "Today is meat free monday!";
  }
  
  return msg;
};

var main = new UI.Card({
  title: '#MFM',
  icon: 'images/small.png',
  subtitle: 'Eat local!',
  body: nextMonday()
});

main.show();

main.on('click', 'up', function(e) {
  

  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/small.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
