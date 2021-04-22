var dog, dogImg, happydogImg;
var foodS, foodStock, db;
var foodObj;
var fedTime, lastFed, feed, addFood;

function preload()
{
	dogImg = loadImage("images/dog.png");
  happydogImg = loadImage("images/happydog.png");
}

function setup() {
  
  db = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = db.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(800, 250, 20, 20)
  dog.addImage(dogImg)
  dog.scale = 0.25;

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function draw() {  
background(46, 139, 87);

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function (data){
  lastFed = data.val();
})

fill(255, 255, 254);
textSixe(15);
if(lastFed >= 12){
  text("Last Feed : " + lastFed%12 + "PM", 350, 30);
}
else if(lastFed == 0){
  text ("Last Feed : 12AM", 350, 30);
}
else{
  text("Last Feed : " + lastFed + "AM", 350, 30)
}

drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happydogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food : foodS
  })
}


