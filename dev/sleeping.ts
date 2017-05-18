class Sleeping extends Behavior{
     constructor(jibby:Jibby){
        super(jibby);
    }

    performBehavior() : void{
        console.log("Sleeping");
        this.jibby.div.style.backgroundImage = "url('images/sleeping.png')";
        // this.div.style.backgroundImage = "url('images/washing.png')";
    }
    update(){
        super.update();
        if(this.checkTimer()){
            this.jibby.food -= 10;
            this.jibby.happyness += 10;
            this.jibby.setBehavior(new Idle(this.jibby));
        }
    }

    onWash(){
        this.resetTimer();
        this.jibby.setBehavior(new Angry(this.jibby));
    }
    onPet(){
        this.resetTimer();
        this.jibby.setBehavior(new Angry(this.jibby));
    }
    onEat(){
        this.resetTimer();
        this.jibby.setBehavior(new Angry(this.jibby));
    }
}