/// <reference path="behavior.ts" />

class Hungry extends Behavior{
    constructor(jibby:Jibby){
        super(jibby);
    }
    performBehavior() : void{
        console.log("Eating");
        this.jibby.div.style.backgroundImage = "url('images/hungry.png')";
        // this.div.style.backgroundImage = "url('images/washing.png')";
    }
    onWash(){
        this.resetTimer();
        this.jibby.setBehavior(new Washing(this.jibby));
    }
    onPet(){
        this.resetTimer();
        this.jibby.setBehavior(new Pet(this.jibby));
    }
    onEat(){
        this.resetTimer();
        this.jibby.setBehavior(new Eating(this.jibby));
    }
}