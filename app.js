'use strict'
// global variables 
var dogName;
var dogBreed;
var dogWeight;
var dogPic;
var dogOwner = [];
var submitNewUser = document.getElementById ( 'add-new-user' );
var userSelector = document.getElementById ( 'caretakers' );
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
    console.log(postHolder.length);

        for (var i = postHolder.length-1; i >= 0; i--) {
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

        dogOwner.push (this.owner.value);
        var dogOwnerString = JSON.stringify ( dogOwner );
        localStorage.setItem ( 'owner', dogOwnerString );

        dogPic = this.pic.value;
        var dogPicString = JSON.stringify ( dogPic );
        localStorage.setItem ( 'pic', dogPicString);
        }
    } 
    
else {                //parses existing LS data
submitNewUser.addEventListener ( 'submit', submitUser );
updateForm.addEventListener ( 'submit', submitPost );

var localName = JSON.parse ( localStorage.getItem ( 'name' ));
var localBreed = JSON.parse ( localStorage.getItem ( 'breed' ));
var localWeight = JSON.parse ( localStorage.getItem ( 'weight' ));
var localOwner = JSON.parse ( localStorage.getItem ( 'owner' ));
var localPic = JSON.parse (localStorage.getItem ( 'pic' ));

        //creates dog constructor 
function Dog (name, breed, weight, owner, pic) {
this.name = name;
this.breed = breed;
this.weight = weight;
this.owner = owner;
this.pic = pic;
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

    var ownerCont = document.createElement ( 'li' );
    ownerCont.innerText = this.owner[0];
    dogList.appendChild ( ownerCont );

    var displayDogName = document.getElementById("dog-name-display");
    displayDogName.innerText = this.name;


    for ( var i = 0; i < this.owner.length; i++ ) {
        var careTaker = document.createElement ( 'option' );
        careTaker.innerText = this.owner[i];
        userSelector.appendChild ( careTaker );
    }
}

    var mainDog = new Dog ( localName, localBreed, localWeight, localOwner, localPic );

    if ( mainDog.pic ) {
        var picCont = document.createElement ( 'img' );
        picCont.setAttribute ("src", mainDog.pic);
        picCont.setAttribute ("style", "height:8em")
        picCont.setAttribute ("id", "profile-pic")
        var profileCont = document.getElementById('profile')
        profileCont.appendChild( picCont );

    }

    else {
        var picCont = document.createElement ( 'img' );
        picCont.setAttribute ("src", "images/dachsund.jpg");
        picCont.setAttribute ("style", "height:8em")
        picCont.setAttribute ("id", "profile-pic")
        var profileCont = document.getElementById('profile')
        profileCont.appendChild( picCont );
    }

}

            // POST CONSTRUCTOR

function Post ( text, poop, pee, food, walk, other, nowUser ) {
    this.text = text;
    this.poop = poop;
    this.pee = pee;
    this.food = food;
    this.walk = walk;
    this.other = other;
    this.nowUser = nowUser;
    this.date = moment().format('MMM Do, h:mm a');

}               

function submitUser() {
    var newUser = JSON.parse ( localStorage.getItem ( 'owner' ));
    newUser.push ( this.user.value );
    var newUserString = JSON.stringify ( newUser );
    localStorage.setItem ( 'owner', newUserString );
}

function submitPost() {
    var elCaretaker = userSelector.options [userSelector.selectedIndex].text;
    var elText = this.text.value;
    var elPoop = document.getElementById('poop').checked;
    var elPee = document.getElementById('pee').checked;
    var elFood = document.getElementById('food').checked;
    var elWalk = document.getElementById('walk').checked;
    var elOther = document.getElementById('other').checked;

    var newPost = new Post( elText, elPoop, elPee, elFood, elWalk, elOther, elCaretaker );
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
    postBox.setAttribute( 'class', 'post-div') //what is this for?

    var signature = document.createElement ( 'p' );
    signature.innerText = postHolder[i].nowUser;
    signature.setAttribute ( 'id', 'signature' );
    postBox.appendChild (signature);


        if ( postHolder[i].poop ) {
        var pooped = document.createElement( 'img' );
        pooped.setAttribute( 'src', "images/poop.png");
        postBox.appendChild( pooped );
        }

        if ( postHolder[i].pee ) {
        var peed = document.createElement( 'img' );
        peed.setAttribute( 'src', "images/peey.png");
        postBox.appendChild( peed );
        }
        if ( postHolder[i].food ) {
        var fed = document.createElement( 'img' );
        fed.setAttribute( 'src', "images/bowl.png");
        postBox.appendChild( fed );
        }
        if ( postHolder[i].walk ) {
        var walked = document.createElement( 'img' );
        walked.setAttribute( 'src', 'images/walk.png');
        postBox.appendChild( walked );
        }
        if ( postHolder[i].other ) {
        var othered = document.createElement( 'img' );
        othered.setAttribute( 'src', 'images/hazard-photo.png'); 
        postBox.appendChild( othered );
        }
        postItem.innerText = postHolder[i].text;
        postItem.setAttribute ( 'id', 'text-input');
        postBox.appendChild(postItem);

    var dateTime = postHolder[i].date;
    var dateDisplay = document.createElement( 'p' );
    dateDisplay.innerText = dateTime;
    postBox.appendChild( dateDisplay);
    
}
