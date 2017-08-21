'use strict'

var dogName;
var dogBreed;
var dogList = document.getElementById( 'dogList' );
var dogForm = document.getElementById( 'dog-form' );
var savedData = localStorage.getItem( 'name' );

if ( !savedData ) {
    dogForm.addEventListener( 'submit', submitDog );

    function submitDog () {

        dogName = this.name.value;
        var dogNameString = JSON.stringify( dogName );
        localStorage.setItem ( 'name', dogNameString ); 

        dogBreed = this.breed.value;
        var dogBreedString = JSON.stringify ( dogBreed );
        localStorage.setItem ( 'breed', dogBreedString );
        
    }

} else {
    var localName = JSON.parse (localStorage.getItem ( 'name' ));

    var localBreed = JSON.parse (localStorage.getItem ( 'breed' ));

    
    function Dog (name, breed, weight) {
        this.name = name;
        this.breed = breed;
        this.weight = weight;
        this.renderToDOM();
    }
    
    Dog.prototype.renderToDOM = function () {
        var infoCont = document.createElement( 'li' );
        infoCont.innerText = this.name;
        dogList.appendChild ( infoCont );

        var breedCont = document.createElement ( 'li' );
        breedCont.innerText = this.breed;
        dogList.appendChild ( breedCont );
    }
    var mainDog = new Dog ( localName, localBreed );
}