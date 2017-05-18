class Dead extends Behavior{

    constructor(jibby:Jibby){
        super(jibby);
    }

    performBehavior(){
        this.jibby.div.style.backgroundImage = "url('images/dead.png')";
    }

    onWash(){}
    onPet(){}
    onEat(){}
}