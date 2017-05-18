/// <reference path="behavior.ts" />

class Angry extends Behavior{

    constructor(jibby:Jibby){
        super(jibby);
    }

    performBehavior() : void{
        console.log("angry");
        this.jibby.div.style.backgroundImage = "url('images/angry.png')";
        // this.div.style.backgroundImage = "url('images/washing.png')";
    }
    update(){
        super.update();
        if(this.checkTimer()){
            this.jibby.setBehavior(new Idle(this.jibby));
        }
    }

    onWash(){}
    onPet(){}
    onEat(){}
}