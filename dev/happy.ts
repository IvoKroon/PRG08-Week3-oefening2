class Happy extends Behavior{
    constructor(jibby:Jibby){
        super(jibby);
    }

    performBehavior() : void{
        console.log("Happy");
        this.jibby.div.style.backgroundImage = "url('images/happy.png')";
        // this.div.style.backgroundImage = "url('images/washing.png')";
    }
    update(){
        super.update();
        if(this.checkTimer()){
            this.jibby.setBehavior(new Sleeping(this.jibby));
        }
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