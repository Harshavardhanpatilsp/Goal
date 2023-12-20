import { _decorator, Component, Node, Button, EventTouch,UITransform, Label, randomRangeInt, instantiate, SpriteFrame, Sprite, PointToPointConstraint } from 'cc';
import { BoxPool } from './BoxPool';
const { ccclass, property } = _decorator;

@ccclass('Autoplayscript')
export class Autoplayscript extends Component {

    @property(Button)
    threebut:Button

    @property(Button)
    tenbut:Button
    @property(Button)
    twentyfivebut:Button
    @property(Button)
    hundredbut:Button
    @property(Button)
    twohundredbut:Button
    @property(Button)
    fivehundredbut:Button
    @property(BoxPool)
    boxpool:BoxPool
    @property(SpriteFrame)
    blastsprite:SpriteFrame

    @property(SpriteFrame)
    flagsprite:SpriteFrame

    @property(SpriteFrame)
    autosprite:SpriteFrame

    allarray=new Array
    highestno=0
    lowestno=0
    randompoints=new Array
    col
    number
    same=new Array
    blasted:boolean=false
    points=0
    nooftimes:boolean=false
    start() {
        console.log(Number(this.boxpool.editbox.getComponentInChildren(Label).string),Number(this.boxpool.multipoints[this.boxpool.pointindex]));
        console.log(this.boxpool.autobutton.getComponentInChildren(Label).string,"lll");
        
        this.boxpool.autobutton.node.getChildByName("Label").active=false
        this.node.active=false
        this.select()
    }

    show(){
        for(let i=0;i<this.boxpool.autoprevius.length;i++){
            this.boxpool.child[this.boxpool.autoprevius[i]].off(Node.EventType.TOUCH_START)
        }
        this.node.active=true
        this.threebut.node.on(Node.EventType.TOUCH_START,this.touchstartone,this)
        this.tenbut.node.on(Node.EventType.TOUCH_START,this.touchstartone,this)
        this.twentyfivebut.node.on(Node.EventType.TOUCH_START,this.touchstartone,this)
        this.hundredbut.node.on(Node.EventType.TOUCH_START,this.touchstartone,this)
        this.twohundredbut.node.on(Node.EventType.TOUCH_START,this.touchstartone,this)
        this.fivehundredbut.node.on(Node.EventType.TOUCH_START,this.touchstartone,this)
        this.select()
        this.clear()
    }

    select(){
        console.log("ppppppppp");
        
        if(this.boxpool.field==this.boxpool.mediumcol){
            this.col=this.boxpool.mediumcol
            this.allarray=[0,7,14,21,1,8,15,22,2,9,16,23,3,10,17,24,4,11,18,25,5,12,19,26,6,13,20,27]
            this.highestno= 4
        }else if(this.boxpool.field==this.boxpool.smallCol){
            this.col=this.boxpool.smallCol
            this.allarray=[0,4,8,1,5,9,2,6,10,3,7,11]
            this.highestno=3
        }else if(this.boxpool.field==this.boxpool.largecol){
            this.col=this.boxpool.largecol
            this.allarray=[0,10,20,30,40,1,11,21,31,41,2,12,22,32,42,3,13,23,33,43,4,14,24,34,44,5,15,25,35,45,6,16,26,36,46,7,17,27,37,47,8,18,28,38,48,9,19,29,39,49]
            this.highestno=5
        }
        console.log(this.highestno);
            console.log(this.lowestno);
    }
clear(){
 
}
touchstartone(event:EventTouch){
    this.nooftimes=true
    console.log("hi");
    let curnode=event.target as Node;
    this.number=Number(curnode.getComponentInChildren(Label).string)
    console.log(this.number);

    console.log( this.boxpool.multilabel.string,"ppp");
    
    // this.boxpool.multilabel.string=this.boxpool.multipoints[this.points]+"x"
    console.log(this.randompoints);
    
    }

    generatebombpos(){
       
        this.boxpool.totalamount.getComponent(Label).string= (Number(this.boxpool.totalamount.getComponent(Label).string)-Number(this.boxpool.editbox.getComponentInChildren(Label).string)).toFixed(2)

            let temph=this.highestno
            let templ=this.lowestno
            for(let i=0;i<this.col;i++){
                let rand=randomRangeInt(this.lowestno,this.highestno)
                this.randompoints.push(this.allarray[rand])
                this.lowestno=this.highestno
                this.highestno=this.highestno+temph
        }
        this.highestno=temph
        this.lowestno=templ

        for( let m=0;m<this.randompoints.length;m++){
            for(let n=0;n<this.col;n++){
           
                console.log(this.boxpool.flagchild,"kkkkkkk");
            if(this.randompoints[n]==this.boxpool.siblingarray[n]){
                this.blasted=true
    
                this.boxpool.flagchild[n].active=false
                this.same.push(n)
                let blast=instantiate(this.boxpool.blastprefab)
                this.boxpool.blastnode.addChild(blast)
                blast.setPosition(this.boxpool.child[this.randompoints[n]].position)
            }
            else{
                console.log("jjjjj");    
                let bomb=instantiate(this.boxpool.bombprefab)
                    this.boxpool.bombnode.addChild(bomb)
                    bomb.setPosition(this.boxpool.child[this.randompoints[n]].position)
            }
        }
        }
        if(this.blasted==false){
            this.boxpool.increased.active=true
            this.cashout()
            this.boxpool.increasedAmt.string="+"+(Number(this.boxpool.editbox.getComponentInChildren(Label).string)*Number(this.boxpool.multipoints[this.boxpool.flagchild.length-1])).toFixed(2)+"USD"
            setTimeout(()=>{
                this.boxpool.increased.active=false
            },1500)
        }
    }

    cashout(){
        this.boxpool.totalamount.getComponent(Label).string=(Number(this.boxpool.totalamount.getComponent(Label).string)+(Number(this.boxpool.editbox.getComponentInChildren(Label).string)*Number(this.boxpool.multipoints[this.points]))).toFixed(2)
    }

    startauto(){
        if(this.nooftimes){
            this.nooftimes=false
        let tempno=this.number
        // this.boxpool.autobutton.getComponentInChildren(Label).string=tempno+""
        this.boxpool.autobutton.node.getChildByName("Label").active=true
        this.boxpool.interactableoff()
        this.boxpool.autobutton.interactable = false
        for (let i = 0; i < this.boxpool.child.length; i++) {
            this.boxpool.child[i].getComponent(Sprite).spriteFrame = this. boxpool.regularsprite
        }
        
        let time=1000
        let temptime=2500
        this.hide()
        for(let j=0;j<this.number;j++){
      
        this.boxpool.autobutton.getComponentInChildren(Label).string=tempno+""
          tempno--
            setTimeout(()=>{
                this.blasted=false
                this.generatebombpos()
            },time) 
            setTimeout(()=>{
                this.randompoints=new Array
                for(let i=0;i<this.boxpool.flagchild.length;i++){
                    console.log(i,"i value");
                    if(this.same.length!=0){
                    this.boxpool.flagchild[this.same[i]].active=true
                    }
                }
                this.boxpool.bombnode.removeAllChildren()
                this.boxpool.blastnode.removeAllChildren()

                this.same=new Array
                if(j==this.number-1){
                    console.log("executted");
                    this.boxpool.FlagNode.removeAllChildren()
                    this.boxpool.row=0
                    // this.boxpool.interactableoon()
                    this.boxpool.nextbutton.getComponent(UITransform).width=250
                    this.boxpool.multilabel.node.setPosition(50,0,0)
                    this.boxpool.nextbutton.setPosition(388,0)
                    this.boxpool.nextbutton.getChildByName("Next").active=true
                    this.boxpool.multilabel.string = this.boxpool.multipoints[0] + "x"
                    this.boxpool.betdup.node.active=false
                    this.boxpool.Automodebutton.interactable = true
                    this.boxpool.pressedpoints=new Array
                    this.boxpool.autoprevius=new Array
                    this.boxpool.siblingarray=new Array
                    this.boxpool.curnodes=new Array
                    this.boxpool.pointindex=0
                    this.boxpool.autobutton.node.getChildByName("Label").active=false
                    this.boxpool.initialize()
                    this.boxpool.randombutton.interactable=true
                    this.boxpool.heighestno=this.highestno
                    this.boxpool.lowestno=0
                   
                    
                }
            },time+1000)
            time=time+temptime
    }
   

    }
}

    hide(){
        // for(let i=0;i<this.boxpool.autoprevius.length;i++){
        //     this.boxpool.child[this.boxpool.autoprevius[i]].on(Node.EventType.TOUCH_START,this.touchstartone,this)
        // }
        for(let i=0;i<this.boxpool.child,length;i++){
            this.boxpool.child[i].off(Node.EventType.TOUCH_START)
        }
        this.node.active=false
    }
    }



