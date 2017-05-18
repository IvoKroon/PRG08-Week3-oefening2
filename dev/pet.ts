class Pet extends Behavior{

    constructor(jibby:Jibby){
        super(jibby);
    }
    performBehavior() : void{
        console.log("HAPPY");
        this.jibby.div.style.backgroundImage = "url('images/happy.png')";
    }
    update(){
        super.update();
        if(this.checkTimer()){
            this.jibby.happyness += 10;
            this.jibby.setBehavior(new Happy(this.jibby));
        }
    }

    onWash(){
        this.jibby.setBehavior(new Angry(this.jibby));
    }
    onPet(){}
    onEat(){
        this.jibby.setBehavior(new Angry(this.jibby));
    }
}