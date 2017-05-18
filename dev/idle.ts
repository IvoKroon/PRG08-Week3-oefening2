class Idle extends Behavior{
    
    constructor(jibby:Jibby){
        super(jibby);
    }
    performBehavior() : void{
        console.log("Idle");
        this.jibby.div.style.backgroundImage = "url('images/idle.png')";
        // this.div.style.backgroundImage = "url('images/washing.png')";
        if(this.jibby.food < 10){
            this.jibby.setBehavior(new Hungry(this.jibby));
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

    checkStats(){
        console.log(this.jibby.food);
        if(this.jibby.food < 10){
            this.jibby.setBehavior(new Hungry(this.jibby));
        }

        if(this.jibby.hygiene < 10){
            this.jibby.setBehavior(new Dirty(this.jibby));
        }

        if(this.jibby.happyness < 10){
            this.jibby.setBehavior(new Angry(this.jibby));
        }

        if(this.jibby.happyness <= 0 || this.jibby.food <= 0 || this.jibby.hygiene <= 0){
            this.jibby.setBehavior(new Dead(this.jibby));
        }
    }
    
    update(){
        super.update();
        this.checkStats();
        console.log(this.timer);
        if(this.checkTimer()){
            this.jibby.setBehavior(new Sleeping(this.jibby));
        }
    }

    
}