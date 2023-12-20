import { _decorator, Component, Node, instantiate, sys, Prefab, UITransform, Button, Label, tween, Sprite, SpriteFrame, color, randomRangeInt, EventTouch, EditBox, Script, } from 'cc';
import { AutoPlayManager } from '../MINESScripts/AutoPlayManager';
import { Autoplayscript } from './Autoplayscript';

import { keyboard } from './keyboard';
import { Popupscipt } from './Popupscipt';
const { ccclass, property } = _decorator;

@ccclass('BoxPool')
export class BoxPool extends Component {

    @property(Popupscipt)
    Nomoney1:Popupscipt
    
    @property(Node)
    Nomoney: Node

    @property(Node)
    boxpool: Node

    @property(keyboard)
    keyboard: keyboard

    @property(Prefab)
    boxprefab: Prefab

    @property(Button)
    betbutton: Button

    @property(Node)
    betarea: Node

    @property(Label)
    amountLabel: Label

    @property(Button)
    fieldbutton: Button

    @property(Button)
    fieldbuttons: Button

    @property(Button)
    fieldbuttonl: Button

    @property(EditBox)
    editbox: EditBox

    @property(Label)
    totalamount: Label

    @property(Node)
    keynode: Node

    @property(Node)
    background: Node

    @property(Node)
    fieldnode: Node

    @property(SpriteFrame)
    selectedsprite: SpriteFrame

    @property(SpriteFrame)
    cashoutsprite: SpriteFrame

    @property(SpriteFrame)
    redsprite: SpriteFrame

    @property(SpriteFrame)
    betsprite: SpriteFrame

    @property(Node)
    football: Node

    @property(Node)
    Moneynode: Node

    @property(Prefab)
    blastprefab: Prefab

    @property(Node)
    blastnode: Node

    @property(Prefab)
    bombprefab: Prefab

    @property(Prefab)
    attemptedprefab: Prefab

    @property(Node)
    bombnode: Node

    @property(Node)
    increased: Node

    @property(Label)
    increasedAmt: Label

    @property(Node)
    cashoutAmountBg: Node

    @property(Node)
    attemptednode: Node

    @property(Button)
    randombutton: Button

    @property(Node)
    howtoplaynode: Node

    @property(Label)
    multilabel: Label

    @property(Prefab)
    flagPrefab: Prefab

    @property(Node)
    FlagNode: Node

    @property(SpriteFrame)
    regularsprite: SpriteFrame

    @property(Node)
    autopopupnode: Node

    @property(SpriteFrame)
    countsprite:SpriteFrame

    @property(SpriteFrame)
    Autosprite:SpriteFrame

    @property(Node)
    toggle: Node

    @property(Button)
    Automodebutton: Button

    @property(Button)
    autobutton: Button

    @property(Button)
    betusdbutton: Button
    
    @property(Button)
    betdup:Button

    @property(Node)
    nextbutton:Node

    @property(Button)
    Allbutton:Button[]=[]

    private autoplayscr: AutoPlayManager = new AutoPlayManager

    height
    width
    createbox
    smallCol = 4
    mediumcol = 7
    largecol = 10
    smallrow = 3
    mediumrow = 4
    largerow = 5
    field
    child
    boxpos = new Array
    row = 0
    smallmultipointsarray = new Array
    mediummultipoints = new Array
    largemultipointsarray = new Array
    totalbox
    randomgeneration: boolean = false
    j
    l = 0
    k
    m = 0
    showallActive: boolean = false
    autogeneratioin: boolean = false
    incdec
    str
    pointindex = 0
    multipoints = new Array
    selectedwidth
    selectedheight
    attempted = 0
    autoprevius = new Array
    autopresent = new Array
    pressedpoints = new Array
    siblingarray = new Array
    curnodes = new Array
    flagchild=new Array
    enterd: boolean = false
    heighestno
    lowestno = 0
    temph
    templ=0
    // iamt=0

    start() {
        // this.betusdbutton.interactable=false
        // console.log(this.autoplayscr.highestno);
        this.betdup.node.active=false
        this.autobutton.interactable = false
        this.football.active = false
        this.increased.active = false
        this.randombutton.getComponent(Button).interactable = false
        this.incdec = [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00, 2.00, 4.00, 10.00, 20.00, 50.00, 100.00]
        this.cashoutAmountBg.active = false
        this.height = this.boxpool.getComponent(UITransform).height - 250 + 10
        this.width = this.boxpool.getComponent(UITransform).width / 3
        this.mediummultipoints = [1.29, 1.72, 2.29, 3.06, 4.08, 5.45, 7.26]
        this.smallmultipointsarray = [1.45, 2.18, 3.27, 4.91]
        this.largemultipointsarray = [1.21, 1.51, 1.89, 2.36, 2.96, 3.7, 4.62, 5.78, 7.22, 9.03]
        // sys.localStorage.setItem("Totalincreased", String(Number(3000.00).toFixed(2)))
        if (sys.localStorage.getItem("Totalincreased") == null || sys.localStorage.getItem("Totalincreased") == "0" || sys.localStorage.getItem("Totalincreased") == "NaN") {
            sys.localStorage.setItem("Totalincreased", String(Number(3000.00).toFixed(2)))
            this.totalamount.getComponent(Label).string = 3000.00 + ""
        } else {
            this.totalamount.getComponent(Label).string = String(sys.localStorage.getItem("Totalincreased"))
        }
        this.background.on(Node.EventType.TOUCH_START, this.ontouch, this)
        this.Medium()
        this.amountLabel.getComponent(Label).string = 0.00 + ""
        this.FlagNode.active = false
        // this.betbutton.getComponent(Sprite).spriteFrame=this.cashoutsprite
    }

    ontouch() {
        // console.log("called");
        // this.autoplayscr.CloseButton()
        this.autopopupnode.active = false
        this.keyboard.count=1
        if(Number(this.editbox.getComponentInChildren(Label).string)>100){
            this.editbox.getComponentInChildren(Label).string=100.00.toFixed(2)+""
          }else if( this.editbox.getComponentInChildren(Label).string=="" || Number(this.editbox.getComponentInChildren(Label).string)<=0.0 || this.editbox.getComponentInChildren(Label).string=="." || this.editbox.getComponentInChildren(Label).string=="0."){
            this.editbox.getComponentInChildren(Label).string="0.10"
          }else{
            this.editbox.getComponentInChildren(Label).string=Number(this.editbox.getComponentInChildren(Label).string).toFixed(2)
          }
        this.keynode.active = false
        this.fieldnode.active = false
        this.Moneynode.active = false
        this.howtoplaynode.active = false

    }
    Small() {
        this.football.active=false
        this.bombnode.removeAllChildren()
        this.blastnode.removeAllChildren()
        this.attemptednode.removeAllChildren()
        this.field = this.smallCol
        this.multipoints = this.smallmultipointsarray
        this.multilabel.string = this.multipoints[0] + "x"
        this.height = this.boxpool.getComponent(UITransform).height - 270
        this.width = this.boxpool.getComponent(UITransform).width / 3 - 50
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                this.createbox = instantiate(this.boxprefab)
                this.createbox.getComponent(UITransform).width = 270
                this.createbox.getComponent(UITransform).height = 250
                this.createbox.name = i + ''
                this.boxpool.addChild(this.createbox)
                this.createbox.setPosition(this.width, this.height, 0)
                this.width = this.width + 250
            }
            this.height = this.height - 230
            this.width = this.boxpool.getComponent(UITransform).width / 3 - 50
        }
        this.child = this.boxpool.children
    }

    Medium() {
        this.football.active=false
        this.bombnode.removeAllChildren()
        this.blastnode.removeAllChildren()
        this.attemptednode.removeAllChildren()
        this.field = this.mediumcol
        this.multipoints = this.mediummultipoints
        this.multilabel.string = this.multipoints[0] + "x"
        this.height = this.boxpool.getComponent(UITransform).height - 250 + 10
        this.width = this.boxpool.getComponent(UITransform).width / 3 - 110
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 7; j++) {
                this.createbox = instantiate(this.boxprefab)
                this.createbox.getComponent(UITransform).width = 150
                this.createbox.getComponent(UITransform).height = 180
                this.createbox.name = i + ''
                this.boxpool.addChild(this.createbox)
                this.createbox.setPosition(this.width, this.height, 0)
                this.width = this.width + 143
            }
            this.height = this.height - 170
            this.width = this.boxpool.getComponent(UITransform).width / 3 - 110
        }
        this.child = this.boxpool.children
        // console.log(this.child);

    }
    large() {
        this.football.active=false
        this.bombnode.removeAllChildren()
        this.blastnode.removeAllChildren()
        this.attemptednode.removeAllChildren()
        this.field = this.largecol
        this.multipoints = this.largemultipointsarray
        this.multilabel.string = this.multipoints[0] + "x"
        this.height = this.boxpool.getComponent(UITransform).height - 250 + 10
        this.width = this.boxpool.getComponent(UITransform).width / 3 - 140
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 10; j++) {
                this.createbox = instantiate(this.boxprefab)
                this.createbox.getComponent(UITransform).width = 105
                this.createbox.getComponent(UITransform).height = 140
                this.createbox.name = i + ''
                this.boxpool.addChild(this.createbox)
                this.createbox.setPosition(this.width, this.height, 0)
                this.width = this.width + 100
            }
            this.height = this.height - 130
            this.width = this.boxpool.getComponent(UITransform).width / 3 - 140
        }
        this.child = this.boxpool.children
    }

    cashout() {
        this.increasedAmt.getComponent(Label).string = "+" + (Number(this.amountLabel.getComponent(Label).string)).toFixed(2) + "USD"
        this.increased.active = true
        setTimeout(() => {
            this.increased.active = false
        }, 2000);
        console.log("Totalincreased", this.totalamount.getComponent(Label).string);
        sys.localStorage.setItem("Totalincreased", this.totalamount.getComponent(Label).string)
        this.Automodebutton.interactable = true
    }

    bet() {

        if(Number(this.totalamount.getComponent(Label).string)<Number(this.editbox.string)){
            console.log(Number(this.totalamount.getComponent(Label).string),Number(this.editbox.string));
            
        this.Nomoney.active=true;
        }else{
        // console.log("clicked",this.cashoutsprite.name);
        
        if (this.betbutton.getComponentInChildren(Label).string == "CASHOUT") {
            this.randombutton.getComponent(Button).interactable = false
            this.betbutton.node.getComponent(Sprite).spriteFrame = this.betsprite
            let bombpos = randomRangeInt(0, this.k)
            let bomb = instantiate(this.bombprefab)
            this.bombnode.addChild(bomb)
            bomb.setPosition(this.child[this.boxpos[bombpos]].position)
            this.totalamount.getComponent(Label).string = (Number(this.totalamount.getComponent(Label).string) + Number(this.amountLabel.getComponent(Label).string)).toFixed(2)
            this.cashout()
            this.showall()
            for (let i = 0; i < this.child.length; i++) {
                this.child[i].getComponent(Sprite).spriteFrame = this.regularsprite
            }
            
        } else if (this.betbutton.getComponentInChildren(Label).string == "Bet") {
            this.betbutton.node.getComponent(Sprite).spriteFrame = this.cashoutsprite
            this.Automodebutton.interactable = false
            this.multilabel.string = this.multipoints[0] + "x"
            
           
            this.totalamount.getComponent(Label).string = (Number(this.totalamount.getComponent(Label).string) - Number(this.editbox.getComponentInChildren(Label).string)).toFixed(2)
            sys.localStorage.setItem("Totalincreased", this.totalamount.getComponent(Label).string)
            this.football.active = false

            this.football.getChildByName("football").setPosition(465, 565)
            this.attemptednode.removeAllChildren()
            this.blastnode.removeAllChildren()
            this.bombnode.removeAllChildren()

            if (this.betbutton.getComponentInChildren(Label).string == "Bet") {
                if (this.showallActive == true) {
                    this.showallActive = false
                }
                if (this.child[1].name == "new") {
                    // console.log("hfjafgdhj");
                    this.boxpool.removeAllChildren()
                    if (this.totalbox == 50) {
                        // console.log("totalbox");
                        this.large()
                    }
                    if (this.totalbox == 28) {
                        this.Medium()
                    }
                    if (this.totalbox == 12) {
                        this.Small()
                    }
                }
                this.cashoutAmountBg.active = true
                // console.log(this.betbutton.getComponentInChildren(Label).string);
                this.betbutton.getComponentInChildren(UITransform).width = 250
                this.betbutton.getComponentInChildren(Label).fontSize = 30
                this.betbutton.node.children[0].setPosition(0, 20, 0)
                this.betbutton.getComponentInChildren(Label).string = "CASHOUT"
               
                this.interactableoff()
                this.randombutton.getComponent(Button).interactable = true
                
                this.initialize()
            }
        }
    }
    }

    initialize() {
        if (this.row < this.field) {
            if (this.field == this.mediumcol) {
                this.totalbox = 28
                this.selectedwidth = 150
                this.selectedheight = 180
                this.heighestno = 4
                this.j = 7
                this.k = 4
            }
            if (this.field == this.largecol) {
                this.totalbox = 50
                this.selectedwidth = 105
                this.selectedheight = 140
                this.heighestno = 5
                this.j = 10
                this.k = 5
            }
            if (this.field == this.smallCol) {
                this.heighestno = 3
                this.totalbox = 12
                this.selectedwidth = 270
                this.selectedheight = 250
                this.j = 4
                this.k = 3
            }
            let i
            // console.log(this.row, "row");

            for (i = this.row; i < this.totalbox; i = i + this.j) {
                this.child[i].getComponent(Sprite).spriteFrame = this.selectedsprite
                this.child[i].getComponent(UITransform).width = this.selectedwidth
                this.child[i].getComponent(UITransform).height = this.selectedheight
                if (this.autogeneratioin == true) {
                    this.child[i].on(Node.EventType.TOUCH_START, this.touchauto, this)
                    this.child[i].name = this.row + ""
                    this.autoprevius.push(i)
                    this.autopresent.push(this.child[i].name)

                }
                else {
                    this.child[i].on(Node.EventType.TOUCH_START, this.touchstart, this)
                }
                this.boxpos.push(i)
            }
            this.row = this.row + 1
            console.log(this.row, "row 1");
            console.log(this.boxpos, "array");
            console.log(this.autopresent, "box name");

        }
    }

    showall() {
        // console.log(this.row, "trd");
        this.showallActive = true

        while (this.row - 1 < this.field) {
            for (let i = 0; i < this.boxpos.length; i++) {
                this.child[this.boxpos[i]].name = "new"
                this.child[this.boxpos[i]].off(Node.EventType.TOUCH_START)
            }
            // console.log(this.boxpos.length, "length");
            let n = this.boxpos.length
            for (let i = 0; i < n; i++) {
                this.boxpos.pop()
            }
            if (this.row < this.field) {
                this.initialize()
                let bombpos = randomRangeInt(0, this.k)
                console.log(bombpos, "bompbos 1")
                let bomb = instantiate(this.bombprefab)
                this.bombnode.addChild(bomb)
                bomb.setPosition(this.child[this.boxpos[bombpos]].position)
            }
            else {
                this.row++
            }
        }
        this.cashoutAmountBg.active = false
        this.betbutton.getComponentInChildren(Label).string = "Bet"
        this.betbutton.getComponentInChildren(Label).fontSize = 40
        this.betbutton.node.children[0].setPosition(0, 0, 0)
        this.row = 0

        this.fieldbutton.getComponent(Button).interactable = true
        let n = this.boxpos.length
        for (let i = 0; i < n; i++) {
            this.boxpos.pop()
        }
        this.amountLabel.getComponent(Label).string = 0.00.toFixed(2) 
        //    this.cashoutLabel.getComponent(Label).string=0.00+""

        this.pointindex = 0
        this.attempted = 0
        this.interactableoon()
        // this.randombutton.getComponent(Button).interactable = true
        this.l = 0
        this.multilabel.string = this.multipoints[0] + "x"
        this.betbutton.node.getComponent(Sprite).spriteFrame = this.betsprite
    }

    lost() {
        for (let i = 0; i < this.totalbox; i++) {
            this.child[i].getComponent(Sprite).spriteFrame = this.redsprite
        }
    }

    touchstart(event: EventTouch) {
        // console.log(this.blastnode.children);
        this.betbutton.getComponent(Button).interactable = true
        this.keynode.active = false
        let curbox = event.target as Node
        // console.log(curbox.name);
        let Ballpos = randomRangeInt(0, this.k)
        // console.log(Ballpos, "ballpos");
        // console.log(curbox.getComponent(Sprite).color);
        let bombpos = randomRangeInt(0, this.k)
        // console.log(this.k, "k value");
        console.log(bombpos, "bombpos");
        while (bombpos == Ballpos) {
            if (bombpos != Ballpos) {
                break
            }
            else {
                bombpos = randomRangeInt(0, this.k)
            }
        }
        // console.log(bombpos, "bombpos");
        // console.log(this.boxpos[bombpos], "jgyd");
        this.touchone(curbox, bombpos)
    } touchone(curbox, bombpos) {

        if (curbox.name != bombpos + "") {
            // console.log("if");
            // console.log("udsghaiul.d");
            // console.log(this.child[this.boxpos[bombpos]].getComponent(Sprite).spriteFrame);
            let bomb = instantiate(this.bombprefab)
            this.bombnode.addChild(bomb)
            bomb.setPosition(this.child[this.boxpos[bombpos]].position)
            if (this.attempted >= 1) {
                let attemptedmark = instantiate(this.attemptedprefab)
                attemptedmark.setPosition(this.football.getChildByName("football").position)
                this.attemptednode.addChild(attemptedmark)
            }
            this.football.active = true
            tween(this.football.getChildByName("football"))
                .to(0.05, { position: curbox.position }
                )
                .start()
            this.attempted++

            curbox.getComponent(Sprite).spriteFrame = this.selectedsprite

        }
        else if (curbox.name == bombpos + "") {
            if (this.row == this.field) {
                // console.log("else if");

                let blast = instantiate(this.blastprefab)
                this.blastnode.addChild(blast)
                // console.log(curbox.position);

                blast.setPosition(curbox.position)
            }
            else {
                // console.log("else if 2");
                let blast = instantiate(this.blastprefab)
                this.blastnode.addChild(blast)
                // console.log(curbox.position);
                blast.setPosition(curbox.position.x, curbox.position.y)

                this.showall()
                this.lost()
                this.totalamount.getComponent(Label).string = Number(Number(this.totalamount.getComponent(Label).string) + Number(this.amountLabel.string)).toFixed(2)
            }
        }

        if (this.showallActive == false) {
            // console.log("Enterd");
            this.pointindex++
            if (this.pointindex == this.multipoints.length) {
                this.pointindex = 0
            }
            this.multilabel.string = this.multipoints[this.pointindex] + "x"
            if (this.pointindex == 0) {
                this.pointindex = this.multipoints.length
            }
            let amount = Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[this.pointindex - 1]
            if (this.pointindex == this.multipoints.length + 1) {
                this.pointindex = 0
            }
            this.amountLabel.getComponent(Label).string = amount.toFixed(2)

            for (let i = 0; i < this.boxpos.length; i++) {

                this.child[this.boxpos[i]].name = "new"

                this.child[this.boxpos[i]].off(Node.EventType.TOUCH_START)
            }
            // console.log(this.boxpos.length, "length");
            let n = this.boxpos.length
            for (let i = 0; i < this.boxpos.length; i++) {
                this.child[this.boxpos[i]].getComponent(Sprite).spriteFrame = this.regularsprite
            }
            for (let i = 0; i < n; i++) {
                this.boxpos.pop()
            }
            this.initialize()
            // console.log(this.row, "row outside");
            // console.log(this.field, "field-1");
        } let isrow: boolean = false
        if (this.row == this.field) {
            this.row--
            isrow = true
        }
        this.randomgeneration = false
        if (this.field <= this.row) {
            // console.log("Enterd inside");
            this.cashoutAmountBg.active = false
            // console.log("this.amountLabel.getComponent(Label).string", this.amountLabel.getComponent(Label).string);
            this.totalamount.getComponent(Label).string = Number(Number(this.totalamount.getComponent(Label).string) + Number(this.amountLabel.getComponent(Label).string)).toFixed(2)
            this.increasedAmt.getComponent(Label).string = "+" + (Number(this.amountLabel.getComponent(Label).string)).toFixed(2) + "USD"
            this.increased.active = true
            // this.iamt=Number(this.amountLabel.getComponent(Label).string)
            // console.log(this.iamt,"iamt");
            
            setTimeout(() => {
                this.increased.active = false
            }, 800);
            this.betbutton.getComponentInChildren(Label).string = "Bet"
            this.betbutton.getComponentInChildren(Label).fontSize = 40
            this.amountLabel.getComponent(Label).string = 0.00.toFixed(2) 
            this.betbutton.node.children[0].setPosition(0, 0, 0)
            this.row = 0
            this.l = 0
            this.interactableoon()
            this.showallActive = false
            this.pointindex = 0
            this.attempted = 0
            console.log("increased amt", this.totalamount.getComponent(Label).string);
            this.betbutton.node.getComponent(Sprite).spriteFrame = this.betsprite
            sys.localStorage.setItem("Totalincreased", this.totalamount.getComponent(Label).string)
        }
        if (isrow == true) {
            this.row = this.row + 2
            isrow = false
        }
    }

    increase() {
        this.str = Number(this.editbox.getComponentInChildren(Label).string)
        // console.log(this.str);
        for (let n = 0; n < this.incdec.length; n++) {
            if (this.str! < this.incdec[n]) {
                // console.log("fdghf", n);
                this.editbox.getComponentInChildren(Label).string = this.incdec[n]
                break
            }
        }
    }

    decrease() {
        this.str = Number(this.editbox.getComponentInChildren(Label).string)
        for (let n = this.incdec.length; n >= 0; n--) {
            if (this.str > this.incdec[n]) {
                // console.log("fdghf", n);
                this.editbox.getComponentInChildren(Label).string = this.incdec[n]
                break
            }
        }
    }
    random() {
        if (this.autogeneratioin == true ) {
            this.randomgeneration=true
            // this. temph = this.heighestno
            // this. templ = this.lowestno
            let rand = randomRangeInt(this.lowestno, this.heighestno)
            // console.log(this.lowestno,"iiii");
            // console.log(this.heighestno,"pppp");
            if(this.lowestno<this.totalbox){
            this.touchauto(1, this.autoprevius[rand]);
            
            }
        } else {
            // console.log("ppp");
            
            this.randomgeneration = true
            let rand = randomRangeInt(0, this.k)
            // console.log("bombpos inside random", rand);
            let curnode = this.child[this.boxpos[rand]]
            let randone = randomRangeInt(0, this.k)
            this.touchone(curnode, randone)
            this.betbutton.getComponent(Button).interactable = true
        }
    }

    clear() {
        this.football.active = false
        
        this.football.getChildByName("football").setPosition(465, 565)
        this.attemptednode.removeAllChildren()
        this.blastnode.removeAllChildren()
        this.bombnode.removeAllChildren()
        this.m = 0
        this.row = 0

        for (let i = 0; i < this.child.length; i++) {
            this.child[i].getComponent(Sprite).spriteFrame = this.regularsprite
        }
        this.autopresent = new Array
        this.autoprevius = new Array
        this.pressedpoints = new Array
        this.boxpos = new Array
        // console.log(this.autopresent, "ppppppppp");
        this.siblingarray = new Array
        this.pointindex = 0
        this.heighestno = 0
        this.lowestno = 0
        this.nextbutton.getComponent(UITransform).width=250
        this.multilabel.node.setPosition(50,0,0)
        this.nextbutton.setPosition(388,0)
        this.nextbutton.getChildByName("Next").active=true
        this.multilabel.string = this.multipoints[0] + "x"
    }

    auto() {
      
         if (this.autogeneratioin == true) {
            this.unscheduleAllCallbacks()
            this.autobutton.getComponent(Sprite).spriteFrame=this.countsprite
            this.randombutton.getComponent(Button).interactable = false
            this.fieldbutton.getComponent(Button).interactable = true
            this.fieldbuttons.getComponent(Button).interactable = true
            this.fieldbuttonl.getComponent(Button).interactable = true
            this.toggle.setPosition(-85, 0, 0)
            this.betbutton.getComponent(Button).interactable = true
            this.autobutton.interactable = false
            this.autogeneratioin = false
            this.FlagNode.removeAllChildren()
            this.FlagNode.active = false
            this.clear()
            this.boxpool.removeAllChildren()
            for (let i = 0; i < this.boxpos.length; i++) {
                this.boxpos.pop()
            }
            if (this.field == this.mediumcol) {
                this.Medium()
            }
            if (this.field == this.smallCol) {
                this.Small()
            }
            if (this.field == this.largecol) {
                this.large()
            }
        } else {
            this.fieldbutton.getComponent(Button).interactable = false
            this.fieldbuttons.getComponent(Button).interactable = false
            this.fieldbuttonl.getComponent(Button).interactable = false
            this.toggle.setPosition(-60, 0, 0)
            this.betbutton.getComponent(Button).interactable = false
            this.randombutton.getComponent(Button).interactable = true
            this.FlagNode.active = true
            this.autogeneratioin = true
            this.clear()
            this.initialize()
        }
    }

    touchauto(event, num) {
        this.enterd = false
        this.autobutton.interactable = true;
        let curnode;
        if (event != 1) {
            curnode = event.target as Node;
        } else {
            curnode = this.child[num];
        }
        this.curnodes.push(curnode)
        this.siblingarray.push(curnode.getSiblingIndex())
        let flag = instantiate(this.flagPrefab)
        flag.name = this.row + ""
        this.FlagNode.addChild(flag)
        this.flagchild = this.FlagNode.children
        flag.setPosition(curnode.position)
        for (let i = 0; i < this.boxpos.length; i++) {
            this.child[this.boxpos[i]].getComponent(Sprite).spriteFrame = this.regularsprite
        }
      
        if (this.pressedpoints.length >= 1)

            for (let j = 0; j < this.pressedpoints.length; j++) {

                if (curnode.name == this.pressedpoints[j]) {
                    this.enterd = true
                    // console.log("Entrtd");
                    // console.log(this.flagchild.length, "hhh");
                    // console.log(this.flagchild, "iuyaiuse");
                    let l = this.flagchild.length
                    let m = 0
                    while (l != this.pressedpoints[j]) {
                        // console.log(this.flagchild[this.flagchild.length - 1]);
                        this.curnodes.pop()
                        this.siblingarray.pop()
                        this.flagchild.pop()
                        l--
                        m++
                    }
                    for (let i = 0; i < m - 1; i++) {
                        this.pressedpoints.pop()
                    }
                    let flag = instantiate(this.flagPrefab)
                    flag.name = this.row + ""
                    this.FlagNode.addChild(flag)
                    this.flagchild = this.FlagNode.children
                    flag.setPosition(curnode.position)
                    this.siblingarray.push(curnode.getSiblingIndex())
                    this.curnodes.push(curnode)
                    for (let i = 0; i < this.boxpos.length; i++) {
                        this.child[this.boxpos[i]].getComponent(Sprite).spriteFrame = this.regularsprite
                        this.child[i].off(Node.EventType.TOUCH_START)
                    }
                    this.row = l + 1
                }

            }
        this.pressedpoints.push(curnode.name)
        let n = this.autopresent.length
        for (let i = 0; i < n; i++) {
            this.autopresent.pop()
            this.boxpos.pop()
        }
        // console.log(this.siblingarray, "Sibling array");
        // console.log(this.curnodes);
        // console.log(this.autopresent, "after popng");
        // console.log(this.autoprevius, "previos");
        // console.log(this.pressedpoints, "pressed");
        this.enterd = false
        let h=this.heighestno
        if (this.siblingarray.length == this.field) {
            this.nextbutton.getComponent(UITransform).width=150
            this.nextbutton.getChildByName("Next").active=false
            this.multilabel.string = this.multipoints[this.multipoints.length - 1] + "x"
            this.multilabel.node.setPosition(0,0,0)
            this.nextbutton.setPosition(420,0)
        }
        else if (this.siblingarray.length > this.field) {
            this.multilabel.string = this.multipoints[this.multipoints.length - 1] + "x"    
        }else{
        this.nextbutton.getComponent(UITransform).width=250
        this.multilabel.node.setPosition(50,0,0)
        this.nextbutton.setPosition(388,0)
        this.nextbutton.getChildByName("Next").active=true
                this.multilabel.string = this.multipoints[this.siblingarray.length] + "x"
        }
        this.initialize()    
        this.lowestno = h
        this.heighestno = this.heighestno +h
    }

    interactableoff() {
        for(let i=0;i<<this.Allbutton.length;i++){
            this.Allbutton[i].interactable=false
        }
        this.betusdbutton.interactable=false
        this.betbutton.getComponent(Button).interactable = false
        this.fieldbutton.getComponent(Button).interactable = false
        this.fieldbuttons.getComponent(Button).interactable = false
        this.fieldbuttonl.getComponent(Button).interactable = false
        this.randombutton.getComponent(Button).interactable = false
        this.betdup.node.active=true
        this.Automodebutton.interactable = false
    }

    interactableoon() {
        for(let i=0;i<<this.Allbutton.length;i++){
            this.Allbutton[i].interactable=true
        }
        this.betbutton.getComponent(Button).interactable = true
        this.fieldbutton.getComponent(Button).interactable = true
        this.fieldbuttons.getComponent(Button).interactable = true
        this.betdup.node.active=false
        this.fieldbuttonl.getComponent(Button).interactable = true
        this.randombutton.getComponent(Button).interactable = false
        this.Automodebutton.interactable = true
        this.betusdbutton.interactable=true
    }


}

