/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var Accel = require('ui/accel');
var ajax = require('ajax');


/*Landing Page*/
var nextMonday = function()
{
  var today = new Date();
  var weekday = today.getDay();
  //var weekday = 1;
  var days;
  
  //end early if it's monday
  if (weekday == 1){
    return "Today is meat free monday!";
  }
  
  //sunday case 
  if(!weekday){
    days = 1;
  }else{
    days = 8 - weekday;
  }
   
  var days_text = "days";
  
  if(days == 1){
     days_text = "day";
  }
  
  return "Next monday in: " + days + " " + days_text;
 
};

//Landing Page
var main = new UI.Card({
  title: '#MFM',
  icon: 'images/small.png',
  subtitle: 'Eat local',
  body: nextMonday()
});

//Alerting for mondays
main.show(function(){
  var today = new Date();
  if (today.getDay() == 1){
    Vibe.vibrate('long');
  }
});

//The subsequent menu pages:

//=======Food=======

//helpers:
var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    // Always upper case the description string
    var title = data.food[i].name;
    //title = title.charAt(0).toUpperCase() + title.substring(1);

    // Get date/time substring
    var text = "price: $" + data.food[i].price[1];

    // Add to menu items array
    items.push({
      title:title,
      subtitle:text
    });
  }

  // Finally return whole array
  return items;
};

 var selectFood = function () {
   console.log("food");
   
 ajax(
  {
    url:'https://flickering-fire-8922.firebaseio.com/.json',
    type:'json'
  },
  function(data) {
    // Create an array of Menu items
    var menuItems = parseFeed(data, 5);
    console.log(menuItems);

    // Construct Menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'Current Food',
        items: menuItems
      }]
    });
    
    resultsMenu.on('select', function(e){
      //console.log('item selected:' + e.itemIndex);
      /*
      PHONE] pebble-app.js:?: e keys: menu,sectionIndex,itemIndex,section,item,window,type
      */
//       console.log('e keys: ' + Object.keys(e));
//       console.log('e section index: ' + e.sectionIndex);
//       console.log('e itemIndex: ' + e.itemIndex);
//       console.log('e section: ' + e.section);
//       console.log('e item: ' + e.item);
//       console.log('e window: ' + e.window);
//       console.log('e type: ' + e.type);
      
      console.log('e itemkeys: ' + Object.keys(e.item));
      
      var foodDetailTitle = data.food[e.itemIndex].name;
      console.log(foodDetailTitle);
      
      var detailCard = new UI.Card({
        title: "$" + foodDetailTitle ,
        body: " winter: " + data.food[e.itemIndex].price[0] +
         " \n summer: " + data.food[e.itemIndex].price[1] +
         " \nfall: " + data.food[e.itemIndex].price[2] +
         " \n winter: " + data.food[e.itemIndex].price[3] 
      });
      
      Vibe.vibrate('long');

      
      detailCard.show(function(){
       Vibe.vibrate('long');
        
      });
      
      resultsMenu.on('accelTap', function (e)
      {
            Vibe.vibrate('long');
      }
      );  
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);

   
 };

 var selectMarket = function() {
   console.log("selectMarket");
 };

 var selectRestaurant = function() {
   console.log("selected Restauraunt");
 };

 var selectTweet = function() {
   console.log("selectTweet");
 };

//The menu page
main.on('click', 'select', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
          title: 'Food',
          icon: 'images/exclaim.png',
          subtitle: 'Organic Produce'
        }, 
        {
          title: 'Market',
          icon: 'images/contactgroup.png',
          subtitle: 'Farmer\'s market'
        },
        {
          title: 'Restaurant',
          icon: 'images/cogwheel.png',
          subtitle: 'Dine out'
        },
        {
          title: 'Tweets',
          icon: 'images/icon.png',
          subtitle: 'Notifications'
        } ]
    }]
  });
  //Second Stage actions
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    
    if(!e.itemIndex){
      selectFood();     
    }else if(e.itemIndex == 1){
      selectMarket();
      
    }else if(e.itemIndex == 2){
      selectRestaurant();
    }else{
      selectTweet();
    }
    
    
    
  });
  menu.show();
});

//The up
main.on('click', 'up', function(e) {
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

//the down
main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});

Accel.init();

