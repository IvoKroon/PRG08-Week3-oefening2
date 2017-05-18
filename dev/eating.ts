class Eating extends Behavior{

    constructor(jibby:Jibby){
        super(jibby)
    }
    performBehavior() : void{
        console.log("Eating");
        this.jibby.div.style.backgroundImage = "url('images/eating.gif')";
        // this.div.style.backgroundImage = "url('images/washing.png')";
    }
    update(){
        super.update();
        if(this.checkTimer()){
            this.jibby.food += 10;
            this.jibby.hygiene -= 8;
            this.jibby.setBehavior(new Happy(this.jibby));
        }
    }
    
    onWash(){
        this.jibby.setBehavior(new Angry(this.jibby));
    }
    onPet(){
        this.jibby.setBehavior(new Angry(this.jibby));
    }

    onEat(){}
}