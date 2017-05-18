class Dirty extends Behavior{
    constructor(jibby:Jibby){
        super(jibby);
    }

    performBehavior() : void{
        console.log("Dirty");
        this.jibby.div.style.backgroundImage = "url('images/dirty.png')";
        // this.div.style.backgroundImage = "url('images/washing.png')";
    }

    onWash(){}
    onPet(){}
    onEat(){}
}