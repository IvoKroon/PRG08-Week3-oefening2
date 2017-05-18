var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Behavior = (function () {
    function Behavior(jibby) {
        this.timer = 0;
        this.jibby = jibby;
    }
    Behavior.prototype.update = function () {
        this.timer++;
    };
    Behavior.prototype.checkTimer = function () {
        if (this.timer > 100) {
            return true;
        }
        else {
            return false;
        }
    };
    Behavior.prototype.resetTimer = function () {
        this.timer = 0;
    };
    Behavior.prototype.hungry = function () {
        if (this.jibby.food < 10) {
        }
    };
    return Behavior;
}());
var Angry = (function (_super) {
    __extends(Angry, _super);
    function Angry(jibby) {
        _super.call(this, jibby);
    }
    Angry.prototype.performBehavior = function () {
        console.log("angry");
        this.jibby.div.style.backgroundImage = "url('images/angry.png')";
    };
    Angry.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.checkTimer()) {
            this.jibby.setBehavior(new Idle(this.jibby));
        }
    };
    Angry.prototype.onWash = function () { };
    Angry.prototype.onPet = function () { };
    Angry.prototype.onEat = function () { };
    return Angry;
}(Behavior));
var Dead = (function (_super) {
    __extends(Dead, _super);
    function Dead(jibby) {
        _super.call(this, jibby);
    }
    Dead.prototype.performBehavior = function () {
        this.jibby.div.style.backgroundImage = "url('images/dead.png')";
    };
    Dead.prototype.onWash = function () { };
    Dead.prototype.onPet = function () { };
    Dead.prototype.onEat = function () { };
    return Dead;
}(Behavior));
var Dirty = (function (_super) {
    __extends(Dirty, _super);
    function Dirty(jibby) {
        _super.call(this, jibby);
    }
    Dirty.prototype.performBehavior = function () {
        console.log("Dirty");
        this.jibby.div.style.backgroundImage = "url('images/dirty.png')";
    };
    Dirty.prototype.onWash = function () { };
    Dirty.prototype.onPet = function () { };
    Dirty.prototype.onEat = function () { };
    return Dirty;
}(Behavior));
var Eating = (function (_super) {
    __extends(Eating, _super);
    function Eating(jibby) {
        _super.call(this, jibby);
    }
    Eating.prototype.performBehavior = function () {
        console.log("Eating");
        this.jibby.div.style.backgroundImage = "url('images/eating.gif')";
    };
    Eating.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.checkTimer()) {
            this.jibby.food += 10;
            this.jibby.hygiene -= 8;
            this.jibby.setBehavior(new Happy(this.jibby));
        }
    };
    Eating.prototype.onWash = function () {
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    Eating.prototype.onPet = function () {
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    Eating.prototype.onEat = function () { };
    return Eating;
}(Behavior));
var Jibby = (function () {
    function Jibby(parent) {
        var _this = this;
        this.div = document.createElement("jibby");
        parent.appendChild(this.div);
        this.x = 0;
        this.y = 220;
        this.hygiene = this.food = this.happyness = 50;
        this.div.addEventListener("click", function () { return _this.onPet(); });
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", function () { return _this.onEat(); });
        document.getElementsByTagName("washbutton")[0].addEventListener("click", function () { return _this.onWash(); });
        this.behavior = new Idle(this);
        this.behavior.performBehavior();
    }
    Jibby.prototype.setBehavior = function (behavior) {
        this.behavior = behavior;
    };
    Jibby.prototype.update = function () {
        this.behavior.performBehavior();
        if (this.happyness <= 0 || this.food <= 0 || this.hygiene <= 0) {
            this.setBehavior(new Dead(this));
        }
        if (!(this.behavior instanceof Dead)) {
            this.hygiene -= 0.01;
            this.food -= 0.01;
            this.happyness -= 0.015;
            this.behavior.update();
        }
    };
    Jibby.prototype.onPet = function () {
        console.log("you clicked on jibby!");
        this.behavior.onPet();
    };
    Jibby.prototype.onWash = function () {
        console.log("washing jibby!");
        this.behavior.onWash();
    };
    Jibby.prototype.onEat = function () {
        console.log("jibby is eating!");
        this.behavior.onEat();
    };
    return Jibby;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        var container = document.getElementById("container");
        this.jibby = new Jibby(container);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.jibby.update();
        this.updateUI();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateUI = function () {
        document.getElementsByTagName("food")[0].innerHTML = Math.round(this.jibby.food).toString();
        document.getElementsByTagName("happyness")[0].innerHTML = Math.round(this.jibby.happyness).toString();
        document.getElementsByTagName("hygiene")[0].innerHTML = Math.round(this.jibby.hygiene).toString();
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = new Game();
});
var Happy = (function (_super) {
    __extends(Happy, _super);
    function Happy(jibby) {
        _super.call(this, jibby);
    }
    Happy.prototype.performBehavior = function () {
        console.log("Happy");
        this.jibby.div.style.backgroundImage = "url('images/happy.png')";
    };
    Happy.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.checkTimer()) {
            this.jibby.setBehavior(new Sleeping(this.jibby));
        }
    };
    Happy.prototype.onWash = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Washing(this.jibby));
    };
    Happy.prototype.onPet = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Pet(this.jibby));
    };
    Happy.prototype.onEat = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Eating(this.jibby));
    };
    return Happy;
}(Behavior));
var Hungry = (function (_super) {
    __extends(Hungry, _super);
    function Hungry(jibby) {
        _super.call(this, jibby);
    }
    Hungry.prototype.performBehavior = function () {
        console.log("Eating");
        this.jibby.div.style.backgroundImage = "url('images/hungry.png')";
    };
    Hungry.prototype.onWash = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Washing(this.jibby));
    };
    Hungry.prototype.onPet = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Pet(this.jibby));
    };
    Hungry.prototype.onEat = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Eating(this.jibby));
    };
    return Hungry;
}(Behavior));
var Idle = (function (_super) {
    __extends(Idle, _super);
    function Idle(jibby) {
        _super.call(this, jibby);
    }
    Idle.prototype.performBehavior = function () {
        console.log("Idle");
        this.jibby.div.style.backgroundImage = "url('images/idle.png')";
        if (this.jibby.food < 10) {
            this.jibby.setBehavior(new Hungry(this.jibby));
        }
    };
    Idle.prototype.onWash = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Washing(this.jibby));
    };
    Idle.prototype.onPet = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Pet(this.jibby));
    };
    Idle.prototype.onEat = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Eating(this.jibby));
    };
    Idle.prototype.checkStats = function () {
        console.log(this.jibby.food);
        if (this.jibby.food < 10) {
            this.jibby.setBehavior(new Hungry(this.jibby));
        }
        if (this.jibby.hygiene < 10) {
            this.jibby.setBehavior(new Dirty(this.jibby));
        }
        if (this.jibby.happyness < 10) {
            this.jibby.setBehavior(new Angry(this.jibby));
        }
        if (this.jibby.happyness <= 0 || this.jibby.food <= 0 || this.jibby.hygiene <= 0) {
            this.jibby.setBehavior(new Dead(this.jibby));
        }
    };
    Idle.prototype.update = function () {
        _super.prototype.update.call(this);
        this.checkStats();
        console.log(this.timer);
        if (this.checkTimer()) {
            this.jibby.setBehavior(new Sleeping(this.jibby));
        }
    };
    return Idle;
}(Behavior));
var Pet = (function (_super) {
    __extends(Pet, _super);
    function Pet(jibby) {
        _super.call(this, jibby);
    }
    Pet.prototype.performBehavior = function () {
        console.log("HAPPY");
        this.jibby.div.style.backgroundImage = "url('images/happy.png')";
    };
    Pet.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.checkTimer()) {
            this.jibby.happyness += 10;
            this.jibby.setBehavior(new Happy(this.jibby));
        }
    };
    Pet.prototype.onWash = function () {
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    Pet.prototype.onPet = function () { };
    Pet.prototype.onEat = function () {
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    return Pet;
}(Behavior));
var Sleeping = (function (_super) {
    __extends(Sleeping, _super);
    function Sleeping(jibby) {
        _super.call(this, jibby);
    }
    Sleeping.prototype.performBehavior = function () {
        console.log("Sleeping");
        this.jibby.div.style.backgroundImage = "url('images/sleeping.png')";
    };
    Sleeping.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.checkTimer()) {
            this.jibby.food -= 10;
            this.jibby.happyness += 10;
            this.jibby.setBehavior(new Idle(this.jibby));
        }
    };
    Sleeping.prototype.onWash = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    Sleeping.prototype.onPet = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    Sleeping.prototype.onEat = function () {
        this.resetTimer();
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    return Sleeping;
}(Behavior));
var Washing = (function (_super) {
    __extends(Washing, _super);
    function Washing(jibby) {
        _super.call(this, jibby);
    }
    Washing.prototype.performBehavior = function () {
        console.log("Washing");
        this.jibby.div.style.backgroundImage = "url('images/washing.png')";
    };
    Washing.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.checkTimer()) {
            this.jibby.hygiene += 10;
            this.jibby.setBehavior(new Happy(this.jibby));
        }
    };
    Washing.prototype.onWash = function () { };
    Washing.prototype.onPet = function () {
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    Washing.prototype.onEat = function () {
        this.jibby.setBehavior(new Angry(this.jibby));
    };
    return Washing;
}(Behavior));
//# sourceMappingURL=main.js.map