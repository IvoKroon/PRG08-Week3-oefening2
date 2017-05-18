class Jibby {

    public hygiene:number;
    public food:number;
    public happyness:number;

    public div:HTMLElement;
    public x:number;
    public y:number;

    private behavior:Behavior;
            
    constructor(parent:HTMLElement) {
        this.div = document.createElement("jibby");
        parent.appendChild(this.div);

        // start instellingen
        this.x = 0;
        this.y = 220;
        this.hygiene = this.food = this.happyness = 50;

        // click listeners
        this.div.addEventListener("click", () => this.onPet());
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", () => this.onEat());
        document.getElementsByTagName("washbutton")[0].addEventListener("click", () => this.onWash());

        // this.div.style.backgroundImage = "url('images/idle.png')";
        this.behavior = new Idle(this);
        this.behavior.performBehavior();

        // hier het gedrag toekennen
        // this.behavior = ...
        
        // afbeelding voor idle - verplaatsen naar idle gedrag
        
    }

    public setBehavior(behavior:Behavior){
        this.behavior = behavior;
    }

    public update():void {
        // hier het gedrag updaten
        // ...
        this.behavior.performBehavior();
        if(this.happyness <= 0 || this.food <= 0 || this.hygiene <= 0){
            this.setBehavior(new Dead(this));
        }
        // this.behavior.checkStats();
        // waarden verlagen per frame - dit moet in het gedrag staan
        if(!(this.behavior instanceof Dead)){
            this.hygiene -= 0.01;
            this.food -= 0.01;
            this.happyness -= 0.015;
            this.behavior.update();
        }
    }


    private onPet():void {
        console.log("you clicked on jibby!");
        // this.behavior = new Pet(this);
        this.behavior.onPet();

        // hier moet je de onPet functie van het gedrag aanroepen
        // this.div.style.backgroundImage = "url('images/happy.png')";
    }

    private onWash():void {
        console.log("washing jibby!");
        // this.behavior = new Washing(this);
        this.behavior.onWash();
        // hier moet je de onWash functie van het gedrag aanroepen
        // this.div.style.backgroundImage = "url('images/washing.png')";
    }

    private onEat():void {
        console.log("jibby is eating!");
        // this.behavior = new Eating(this);
        this.behavior.onEat();
        // hier moet je de onEat functie van het gedrag aanroepen
        // this.div.style.backgroundImage = "url('images/eating.gif')";
    }


}
