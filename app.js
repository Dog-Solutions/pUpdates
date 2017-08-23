'use strict'
        // global variables 
var dogName;
var dogBreed;
var dogWeight;
var updateForm = document.getElementById ('form-update' );
var updateList;
var dogList = document.getElementById( 'dogList' );
var dogForm = document.getElementById( 'dog-form' );
var savedData = localStorage.getItem( 'name' );
var postHolder = [];
var savedFeed = localStorage.getItem('postHolder');
var aDate = new Date();

if ( savedFeed )  {

postHolder = JSON.parse(localStorage.getItem( 'postHolder' ));
for (var i = 0; i < postHolder.length; i++) {
postToDOM(i);
  }
}
        
if ( !savedData ) {             // looks for LS data
    dogForm.addEventListener( 'submit', submitDog );

    function submitDog () {

        dogName = this.name.value;
        var dogNameString = JSON.stringify( dogName );
        localStorage.setItem ( 'name', dogNameString ); 

        dogBreed = this.breed.value;
        var dogBreedString = JSON.stringify ( dogBreed );
        localStorage.setItem ( 'breed', dogBreedString );

        dogWeight = this.weight.value;
        var dogWeightString = JSON.stringify ( dogWeight );
        localStorage.setItem ( 'weight', dogWeightString );
        
    }

        
} else {                //parses existing LS data
    updateForm.addEventListener ( 'submit', submitPost );
    
    var localName = JSON.parse ( localStorage.getItem ( 'name' ));

    var localBreed = JSON.parse ( localStorage.getItem ( 'breed' ));

    var localWeight = JSON.parse ( localStorage.getItem ( 'weight' ));

                //creates dog constructor 
    function Dog (name, breed, weight) {
        this.name = name;
        this.breed = breed;
        this.weight = weight;
        this.renderToDOM();
    }
                // TODO ------- make a loop

    Dog.prototype.renderToDOM = function () {
        var infoCont = document.createElement( 'li' );
        infoCont.innerText = this.name;
        dogList.appendChild ( infoCont );

        var breedCont = document.createElement ( 'li' );
        breedCont.innerText = this.breed;
        dogList.appendChild ( breedCont );

        var weightCont = document.createElement ( 'li' );
        weightCont.innerText = this.weight;
        dogList.appendChild ( weightCont );
    }
    var mainDog = new Dog ( localName, localBreed, localWeight );
}

                    // POST CONSTRUCTOR

function Post ( text, poop, pee, food, walk, other, date ) {
    this.text = text;
    this.poop = poop;
    this.pee = pee;
    this.food = food;
    this.walk = walk;
    this.other = other;
    this.date = date;
}               

function submitPost() {
    // event.preventDefault();
    var elText = this.text.value;
    var elPoop = document.getElementById('poop').checked;
    var elPee = document.getElementById('pee').checked;
    var elFood = document.getElementById('food').checked;
    var elWalk = document.getElementById('walk').checked;
    var elOther = document.getElementById('other').checked;
    //var elDate = aDate.toTimeString();

    var newPost = new Post(elText, elPoop, elPee, elFood, elWalk, elOther);
    postHolder.push(newPost);
    console.log(postHolder);
    savedFeed = JSON.stringify(postHolder);
    localStorage.setItem('postHolder', savedFeed);


}


 function postToDOM() { 
    var feedBoard = document.getElementById ('feed-holder');
    var postBox = document.createElement( 'div')
    //postBox.setAttribute("id", 'genericID');
    feedBoard.appendChild( postBox );
    var postItem = document.createElement ('p');

    console.log(feedBoard + postItem)
    postItem.innerText = postHolder[i].text;
    postBox.appendChild(postItem);

    if ( postHolder[i].poop ) {
        var pooped = document.createElement( 'p' );
        pooped.innerText = 'poop';
        //pooped.src = "images/poop.png";
        postBox.appendChild( pooped );
    }
   
    if ( postHolder[i].pee ) {
        var peed = document.createElement( 'p' );
        peed.innerText = 'peed'; 
        postBox.appendChild( peed );
    }
    if ( postHolder[i].food ) {
        var fed = document.createElement( 'p' );
        fed.innerText = 'fed'; 
        postBox.appendChild( fed );
    }
    if ( postHolder[i].walk ) {
        var walked = document.createElement( 'p' );
        walked.innerText = 'walked'; 
        postBox.appendChild( walked );
    }
    if ( postHolder[i].other ) {
        var othered = document.createElement( 'p' );
        othered.innerText = 'othered'; 
        postBox.appendChild( othered );
    }
}
