


abstract class Behavior {
    protected jibby:Jibby;
    protected timer:number = 0;

    abstract performBehavior() : void;
    abstract onWash():void;
    abstract onEat():void;
    abstract onPet():void;

    constructor(jibby:Jibby){
        this.jibby = jibby;
        // this.checkStats();
    }
    update(){
        this.timer++;
    }

    checkTimer():boolean{
        if(this.timer > 100){
            return true;
        }else{
            return false;
        }
    }

    resetTimer(){
        this.timer = 0;
    }


    hungry(){
        if(this.jibby.food < 10){
            // this.jibby.setBehavior(new Hungry(jibby));
        }
    }
}
