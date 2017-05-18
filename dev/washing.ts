class Washing extends Behavior{

    constructor(jibby:Jibby){
        super(jibby);
    }
    performBehavior() : void{
        console.log("Washing");
        this.jibby.div.style.backgroundImage = "url('images/washing.png')";
        // this.div.style.backgroundImage = "url('images/washing.png')";
    }
    update(){
        super.update();
        if(this.checkTimer()){
            this.jibby.hygiene += 10;
            this.jibby.setBehavior(new Happy(this.jibby));
        }
    }

    onWash(){}
    onPet(){
        this.jibby.setBehavior(new Angry(this.jibby));
    }
    onEat(){
        this.jibby.setBehavior(new Angry(this.jibby));
    }
}