var database ,dog,dog1,dog2
var position

var feed,add
var foodobject
var Feedtime
var Lastfeed



function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")


}

function setup() {
	createCanvas(850, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.17
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("Feed the Dog")
  feed.position(825,65)
  feed.mousePressed(FeedDog)

  add = createButton("Add food")
  add.position(925,65)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);
  //if(lastFed>=12){
    //text("Last fed:  " + lastFed%12 + "PM", 350,30);
  //}else if(lastFed=0){
    //text("Last fed : 12 AM",350,30);
  //}else{
    //text("Last fed :  "+ lastFed +"AM",350,30);
  //}

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
