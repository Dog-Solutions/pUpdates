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

updateForm.addEventListener ( 'submit', submitPost );

function Post ( text, poop, pee, food, walk, other ) {
    this.text = text;
    this.poop = poop;
    this.pee = pee;
    this.food = food;
    this.walk = walk;
    this.other = other;
}               

function submitPost () {
    var elText = this.text.value;
}
