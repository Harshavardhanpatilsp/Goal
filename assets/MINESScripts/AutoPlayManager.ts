import { _decorator, Button, color,UIOpacity, Component, EditBox, Label, Node, Sprite, SpriteFrame, tween, Vec3,instantiate,sys,UITransform,randomRangeInt,log, logID } from 'cc';
import { BoxPool } from '../Scripts/BoxPool';
const { ccclass, property } = _decorator;

@ccclass('AutoPlayManager')
export class AutoPlayManager extends Component {

    @property(SpriteFrame)
    AutoSprites : SpriteFrame []=[];

    @property(Button)
    Autostart:Button=null;

    @property(Node)
    keypad:Node = null;

    @property(Node)
    WinOrLosenode :Node []= [];

    @property(BoxPool)
    boxpool:BoxPool

  @property(Node)
  autonode:Node
    //230
    public static Roundsnum = 3;
    public static stopcashincby: object = {"enable": false, "value": 0};
    public static stopcashdecby: object = {"enable": false, "value": 0};
    public static stopcashsingleby: object = {"enable": false, "value": 0};
    public static Ifwon: Array<object> = [{ "enable": true, "value": null},{ "enable": false, "value": 0},{ "enable": false, "value": 0}];
    public static Iflost: Array<object> = [{ "enable": true, "value": null},{ "enable": false, "value": 0},{ "enable": false, "value": 0}]
    public static curEditbox:EditBox = null;
    public static Allarrays = [];
    allarray=new Array
    highestno=0
    lowestno=0
    randompoints=new Array
    check:boolean=false
    col
    same=new Array
    blasted:boolean=false
     inside:boolean=false
    points=0
    iamt=0
    editAmt
    noofsel
    presetAmt
    Stopautoplay:boolean=false
    start() {
        this.autonode.on(Node.EventType.TOUCH_START,this.ontouch,this)
        this.boxpool.autobutton.node.getChildByName("Label").active=false
        this.node.active=false
        this.select()
        AutoPlayManager.Allarrays.push(AutoPlayManager.stopcashincby,AutoPlayManager.stopcashdecby,AutoPlayManager.stopcashsingleby,AutoPlayManager.Ifwon,AutoPlayManager.Iflost);
    }

    ontouch(){
        // this.keypad.active=false
        if(this.keypad.active==true){
            this.OneditorboxClicked(1,"e")
       }
        this.keypad.active=false 
    }
    CloseButton(){
        tween(this.node).to(0.3,{position:new Vec3(this.node.position.x,this.node.position.y+132,1)}).call(()=>{
            this.node.children[0].setPosition(0,408,1);
            this.node.active = false;
            this.keypad.active = false;
        }).start();
        tween(this.node.getComponent(UIOpacity)).to(0.2,{opacity: 0}).start();
        
    }

    protected onEnable(): void {
        this.node.setPosition(0,132,0);
        this.node.children[0].setPosition(0,408,1);
        this.node.getComponent(UIOpacity).opacity = 0;
        tween(this.node).to(0.3,{position:new Vec3(this.node.position.x,this.node.position.y-132,1)}).start();
        tween(this.node.getComponent(UIOpacity)).to(0.2,{opacity: 255}).start();
    }
    show(){
        if(this.boxpool.autobutton.getComponent(Sprite).spriteFrame==this.AutoSprites[2]){
            // console.log("oioioioio");
            // this.unschedule(this.startauto)
       this.Stopautoplay=true
        }else{
        this.node.active=true
            
        }
    }
    select(){
        // console.log("ppppppppp");
        
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
        // console.log(this.highestno);
        //     console.log(this.lowestno);
    }

    OneditorboxClicked(event,type){
        let curnode = event;
        // console.log("event:",curnode.string)
        if(type == "EditBox"){
            AutoPlayManager.curEditbox = curnode;
            curnode.string = "";
            curnode.node.parent.addChild(this.keypad);
            this.keypad.setPosition(5,230,1);
            this.keypad.active = true;
        }
        else{
            this.keypad.active = false;
            // console.log("keypad pressed", AutoPlayManager.curEditbox.string[AutoPlayManager.curEditbox.string.length-1])
            if(AutoPlayManager.curEditbox.string[AutoPlayManager.curEditbox.string.length-1] == "."){
                AutoPlayManager.curEditbox.string = AutoPlayManager.curEditbox.string.replace(AutoPlayManager.curEditbox.string[AutoPlayManager.curEditbox.string.length-1],".0");
                let val = this.Numset(AutoPlayManager.curEditbox.node.parent.parent.name);
                let statvar
                if(val >10){
                    statvar = AutoPlayManager.Allarrays[Math.floor(val/10)][val%10];
                }else{
                    statvar = AutoPlayManager.Allarrays[val];
                }
                statvar["value"] =  Number(AutoPlayManager.curEditbox.string);
            }
            if( (AutoPlayManager.stopcashincby["enable"] == true || AutoPlayManager.stopcashdecby["enable"] == true || AutoPlayManager.stopcashsingleby["enable"] == true) && Number(AutoPlayManager.curEditbox.string) >10000 ){
                AutoPlayManager.curEditbox.string = '10000.00';
            }
            // console.log(AutoPlayManager.curEditbox.name,"lllll");
            
            if(( AutoPlayManager.curEditbox.name=="winorlose<EditBox>") && Number(AutoPlayManager.curEditbox.string) >100){
                    // console.log("pressed");               
                    AutoPlayManager.curEditbox.string = '100'
            }
            if(AutoPlayManager.curEditbox.string == "" || AutoPlayManager.curEditbox.string == "0." || AutoPlayManager.curEditbox.string == "0" || AutoPlayManager.curEditbox.string =="."){
                AutoPlayManager.curEditbox.string = "1";
            }
            let val = this.Numset(AutoPlayManager.curEditbox.node.parent.parent.name);
            // console.log(val,"val",AutoPlayManager.curEditbox.node.parent.parent.name);

            let statvar
            if(val >10){
                statvar = AutoPlayManager.Allarrays[Math.floor(val/10)][val%10];
            }else{
                statvar = AutoPlayManager.Allarrays[val];
            }
            statvar["value"] =  Number(AutoPlayManager.curEditbox.string);
            AutoPlayManager.curEditbox.string =  statvar["value"].toString();
            if(AutoPlayManager.curEditbox.name!="winorlose<EditBox>"){
                AutoPlayManager.curEditbox.string=Number(AutoPlayManager.curEditbox.string).toFixed(2)
            }else{
                AutoPlayManager.curEditbox.string=AutoPlayManager.curEditbox.string+"%"
            }
        }
    }

    Numset(curnode){
        switch (curnode) {
            case "StopCashBG1":
                    return 1;
                break;

            case "StopCashBG2":
                 return 2;

            break;

            case "StopCashBG3":
                return 0;

            break;

            case "Winincby":
                return 31;

            break;

            case "WinDecby":
                return 32;

            break;

            case "Loseincby":
                return 41;

            break;

            case "Losedecby":
               return 42;

            break;
            default:
                break;
        }
    
    }

    onKeyspressed(event){
        let curnode = event.target as Node;
        let val = curnode.children[0].getComponent(Label).string;
        // console.log("event:",curnode)
        if(val!= "x"){
            AutoPlayManager.curEditbox.string += val;
        }else{
            let str = AutoPlayManager.curEditbox.string;
            if(str != ""){
                AutoPlayManager.curEditbox.string = str.replace(str[str.length-1],"");
            }
           
        }
        
       
    }

    OnMoreOptionClick(event) {
        let curnode = event.target as Node;
        let container = curnode.parent.parent;
        container.children[2].active = !container.children[2].active;
    }

    OntoggleClick(event){
        let curnode = event.target as Node;
        
        if(curnode.children[0].position.x == 14){
            tween(curnode.children[0]).to(0.1,{position: new Vec3(-14,0,0) }).start();
            this.Toggleswitch(curnode.name)
            curnode.parent.children[2].active = true;
            curnode.getComponent(Sprite).color = color(213,213,213,255);
        }else{
            tween(curnode.children[0]).to(0.1,{position: new Vec3(14,0,0) }).start();
            curnode.parent.children[2].active = false;
            this.Toggleswitch(curnode.name)
            curnode.getComponent(Sprite).color = color(0,252,0,255);
        }
    }

    Toggleswitch(curnode){
        switch (curnode) {
            case "StopCashToggle_Off1":
                if(AutoPlayManager.stopcashdecby["enable"] == true)
                    AutoPlayManager.stopcashdecby["enable"] = false;
                else
                    AutoPlayManager.stopcashdecby["enable"] = true
                break;
            case "StopCashToggle_Off2":
                if(AutoPlayManager.stopcashsingleby["enable"] == true)
                    AutoPlayManager.stopcashsingleby["enable"] = false;
                else
                    AutoPlayManager.stopcashsingleby["enable"] = true;
            break;                                    
            case "StopCashToggle_Off3":
                if(AutoPlayManager.stopcashincby["enable"] == true)
                    AutoPlayManager.stopcashincby["enable"] = false;
                else
                    AutoPlayManager.stopcashincby["enable"] = true;
                break;
        
            default:
                break;
        }
    }

    OnPlusorMinusClick(event){
        let curnode = event.target as Node;
        let curnum = Number(curnode.parent.children[0].getComponent(EditBox).string);
        if(curnode.name == "StopCash_MinusButton"){
            
            if(curnum>0){
                curnum -= 1;
                curnode.parent.children[0].getComponent(EditBox).string = curnum.toFixed(2);
            }
            
        }else if(curnode.name == "StopCash_PlusButton"){
            if(curnum<100){
                curnum += 1;
                curnode.parent.children[0].getComponent(EditBox).string = curnum.toFixed(2);
            }
            
        }else if(curnode.name == "plus"){
            curnum=Number(curnode.parent.children[0].getComponent(EditBox).string.slice(0,-1));
            if(curnum<100){
                curnum += 1;
                curnode.parent.children[0].getComponent(EditBox).string = curnum+"%"
            }
        }else if(curnode.name="minus"){
            curnum=Number(curnode.parent.children[0].getComponent(EditBox).string.slice(0,-1));
            if(curnum>0){
                curnum -= 1;
                curnode.parent.children[0].getComponent(EditBox).string = curnum+"%"
            }
        }
        let value = this.Numset(curnode.parent.parent.name);
        // console.log('Auto val check :',value)
        let statvar
        if(value >10){
            statvar = AutoPlayManager.Allarrays[Math.floor(value/10)][value%10];
        }else{
            statvar = AutoPlayManager.Allarrays[value];
        }
        
        statvar["value"] = Number(curnode.parent.children[0].getComponent(EditBox).string);
       
    }
    OnRoundNumberClick(event){
        let curnode = event.target as Node;
        let parent = curnode.parent;
        // console.log(parent);
        
        curnode.getComponent(Sprite).color = color(255,255,255,255);
        curnode.children[0].getComponent(Sprite).spriteFrame = this.AutoSprites[1];
        AutoPlayManager.Roundsnum = Number(curnode.children[1].getComponent(Label).string);
        console.log(AutoPlayManager.Roundsnum,"total no of rounds");
        for(let i =0 ; i < parent.children.length;i++){
            if(parent.children[i] != curnode){
                parent.children[i].getComponent(Sprite).color = color(213,213,213,255);
                parent.children[i].children[0].getComponent(Sprite).spriteFrame = this.AutoSprites[0];
            }
        }

    }

    WinOrLose(event){
        let curnode = event.target as Node;
        let parent = curnode.parent;
        curnode.getComponent(Sprite).color = color(255,255,255,255);
        curnode.children[0].getComponent(Sprite).spriteFrame = this.AutoSprites[1];
        if(curnode.name == "LoseReturnToInitial" || curnode.name == "WinReturnToInitial"){
            curnode.parent.children[2].children[3].active=true
            curnode.parent.children[3].children[3].active=true
            this.Autostart.interactable = true;
        }
        if(parent.name == "WinAutoPlayBG"){
            // console.log("csadsa",curnode.getSiblingIndex())
            AutoPlayManager.Ifwon[curnode.getSiblingIndex()-1]["enable"] = true;
            if(curnode.name =="Winincby"){
                curnode.children[3].active=false
                // console.log(curnode.parent.children[ curnode.getSiblingIndex()+1].name);
                
                curnode.parent.children[ curnode.getSiblingIndex()+1].children[3].active=true
            }
            
            if(curnode.name =="WinDecby"){
                curnode.children[3].active=false
                curnode.parent.children[ curnode.getSiblingIndex()-1].children[3].active=true
            }
            // AutoPlayManager.Ifwon[curnode.getSiblingIndex()]["value"] = 0;
        }else{
            // console.log("csadsa",curnode.getSiblingIndex())
            AutoPlayManager.Iflost[curnode.getSiblingIndex()-1]["enable"] = true;
            if(curnode.name =="Loseincby"){
                // curnode.parent.children[2].children[0].getComponent(EditBox).string=curnode.parent.children[2].children[0].getComponent(EditBox).string+""
                curnode.children[3].active=false
                curnode.parent.children[ curnode.getSiblingIndex()+1].children[3].active=true
            }
            if(curnode.name =="Losedecby"){
                curnode.children[3].active=false
                curnode.parent.children[ curnode.getSiblingIndex()-1].children[3].active=true
            }   
            // AutoPlayManager.Iflost[curnode.getSiblingIndex()]["value"] = 0;
        }
        for(let i =1 ; i < parent.children.length;i++){
            if(parent.children[i] != curnode){
                AutoPlayManager.Iflost[i-1]["enable"] = false;
                parent.children[i].getComponent(Sprite).color = color(213,213,213,255);
                parent.children[i].children[0].getComponent(Sprite).spriteFrame = this.AutoSprites[0];
            }
        }
    }
    generatebombpos(){
        this.select()
        if(this.inside==false){
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
           
                // console.log(this.boxpool.flagchild,"kkkkkkk");
            if(this.randompoints[n]==this.boxpool.siblingarray[n]){
                this.blasted=true
    
                this.boxpool.flagchild[n].active=false
                this.same.push(n)
                let blast=instantiate(this.boxpool.blastprefab)
                this.boxpool.blastnode.addChild(blast)
                blast.setPosition(this.boxpool.child[this.randompoints[n]].position)
            }
            else{
                // console.log("jjjjj");    
                let bomb=instantiate(this.boxpool.bombprefab)
                    this.boxpool.bombnode.addChild(bomb)
                    // console.log(this.randompoints,"pp");
                    // console.log(this.randompoints[n]);
                    // 
                    bomb.setPosition(this.boxpool.child[this.randompoints[n]].position)
            }
        }
        }
        if(this.blasted==false){
            this.boxpool.increased.active=true
            this.cashout()
            this.iamt=Number(this.boxpool.editbox.getComponentInChildren(Label).string)*Number(this.boxpool.multipoints[this.boxpool.flagchild.length-1])
            this.boxpool.increasedAmt.string="+"+(Number(this.boxpool.editbox.getComponentInChildren(Label).string)*Number(this.boxpool.multipoints[this.boxpool.flagchild.length-1])).toFixed(2)+"USD"
            setTimeout(()=>{
                this.boxpool.increased.active=false
            },600)
        }
    }
}

    cashout(){
        this.boxpool.totalamount.getComponent(Label).string=(Number(this.boxpool.totalamount.getComponent(Label).string)+(Number(this.boxpool.editbox.getComponentInChildren(Label).string)*Number(this.boxpool.multipoints[this.points]))).toFixed(2)
        sys.localStorage.setItem("Totalincreased", this.boxpool.totalamount.getComponent(Label).string)
    }

    startauto(){
        if(Number(this.boxpool. totalamount.getComponent(Label).string)<Number(this.boxpool.editbox.string)){
            this.boxpool.Nomoney.show()
            }else{
        this.Stopautoplay=false
       
        this.inside=false
        let insidetwo:boolean=false
  
        let tempno=AutoPlayManager.Roundsnum

        this.boxpool.autobutton.node.getChildByName("Label").active=true
        this.boxpool.interactableoff()
        this.boxpool.autobutton.interactable = true
        for (let i = 0; i < this.boxpool.child.length; i++) {
            this.boxpool.child[i].getComponent(Sprite).spriteFrame = this. boxpool.regularsprite
        }
        
        let time=300
        let time2=300
        let temptime=600
        this.hide()
        // for(let j=0;j<AutoPlayManager.Roundsnum;j++){
            let j=0
            let autono=AutoPlayManager.Roundsnum
        
        this.boxpool.autobutton.getComponentInChildren(Label).string=autono+""
        this.boxpool.autobutton.node.getChildByName("Label").active=true
        this.boxpool.autobutton.getComponent(Sprite).spriteFrame=this.AutoSprites[2]
        this.editAmt=Number(this.boxpool.editbox.getComponentInChildren(Label).string)
        this.presetAmt=Number(this.boxpool.totalamount.getComponent(Label).string)
        let k=0
      this.schedule(()=>{
        
        setTimeout(()=>{
            if(Number(this.boxpool.totalamount.getComponent(Label).string)<Number(this.boxpool.editbox.string)){
                this.boxpool.Nomoney.show()
                }else{
            if(this.Stopautoplay && k<1){
              
                k++
                this.unscheduleAllCallbacks()
                j=0
                this.remove()
            }
           if(this.Stopautoplay==false){
             
               
                
            this.boxpool.autobutton.getComponentInChildren(Label).string=tempno+""
            tempno--
            this.boxpool.totalamount.getComponent(Label).string= (Number(this.boxpool.totalamount.getComponent(Label).string)-Number(this.boxpool.editbox.getComponentInChildren(Label).string)).toFixed(2)
            sys.localStorage.setItem("Totalincreased", this.boxpool.totalamount.getComponent(Label).string)
              this.blasted=false
                if(this.inside==false)
              this.generatebombpos()
              this.checkauto1()
            //   this.iamt=0
              this.checkauto()
              if(this.inside ==true && insidetwo==false){
                    this.unscheduleAllCallbacks()
                   
                    
                    this.remove()
                    insidetwo=true
               
                this.boxpool.interactableoon()
            }
          setTimeout(()=>{
              this.randompoints=new Array
              for(let i=0;i<this.boxpool.flagchild.length;i++){
                  
                  if(this.same.length!=0){
                  this.boxpool.flagchild[this.same[i]].active=true
                  }
              }
              this.boxpool.bombnode.removeAllChildren()
              this.boxpool.blastnode.removeAllChildren()
              this.same=new Array
              j++
              
              
              if(j==AutoPlayManager.Roundsnum-1 && this.Stopautoplay==false){
              
                
                    this.remove()
              }
             
          },time2+300)
        //   time2=time2+temptime
           }
        }
        },time) 
        time=time+temptime
    
      },0.5,AutoPlayManager.Roundsnum-1,0.5)
    }
}

remove(){
    let time
    if(this.Stopautoplay){
        time=500
    }else{
      time= 1500
    }
    setTimeout(()=>{
  
    this.boxpool.FlagNode.removeAllChildren()
    this.boxpool.row=0
    // this.boxpool.interactableoon()
    this.boxpool.nextbutton.getComponent(UITransform).width=250
    this.boxpool.multilabel.node.setPosition(50,0,0)
    this.boxpool.nextbutton.setPosition(388,0)
    this.boxpool.nextbutton.getChildByName("Next").active=true
    this.boxpool.autobutton.getComponent(Sprite).spriteFrame=this.AutoSprites[3]
    this.boxpool.multilabel.string = this.boxpool.multipoints[0] + "x"
    this.boxpool.betdup.node.active=false
    this.boxpool.Automodebutton.interactable = true
    this.boxpool.pressedpoints=new Array
    this.boxpool.autoprevius=new Array
    this.boxpool.siblingarray=new Array
    this.boxpool.curnodes=new Array
    this.inside=true
    this.boxpool.pointindex=0
    this.boxpool.autobutton.interactable = false
    this.boxpool.autobutton.node.getChildByName("Label").active=false
  this.boxpool.betusdbutton.interactable=true
    
    this.boxpool.initialize()
    for(let i=0;i<this.boxpool.child.length;i++){
      if(this.boxpool.child[i].getComponent(Sprite).spriteFrame != this.boxpool.selectedsprite){
          this.boxpool.child[i].off(Node.EventType.TOUCH_START)
      }
      
    }
    this.boxpool.randombutton.interactable=true
    this.boxpool.heighestno=this.highestno
    this.boxpool.lowestno=0
},time)
}

    hide(){
        
        for(let i=0;i<this.boxpool.child,length;i++){
            this.boxpool.child[i].off(Node.EventType.TOUCH_START)
        }
        this.node.active=false
    }
    checkauto1(){
      
        if(AutoPlayManager.stopcashdecby["enable"] == true){
       
            
            this.check=true
            this.noofsel=1
        } if(AutoPlayManager.stopcashsingleby["enable"] == true){
            this.check=true
            if(this.noofsel==1){
                this.noofsel=4
            }else{
                this.noofsel=2
         
            }
        } if( AutoPlayManager.stopcashincby["enable"] == true){
           
            if(this.noofsel==1){
                this.noofsel=5
            }
            if(this.noofsel==2){
                this.noofsel=6
            }if(this.noofsel==4){
                this.noofsel=7
            }
            if(this.check==false)
            this.noofsel=3
            this.check=true
        }
        if(this.check){
                    
            let incamt=this.presetAmt+AutoPlayManager.stopcashincby["value"]
            let decamt=this.presetAmt-AutoPlayManager.stopcashdecby["value"]
            // console.log(this.noofsel,"no");
            
            switch(this.noofsel){
                case 1:
                    // console.log(Number(this.boxpool.totalamount.getComponent(Label).string),this.presetAmt,decamt,"ttttttt");
                  var amt=Number(this.boxpool.totalamount.getComponent(Label).string)
                if(Number(this.boxpool.totalamount.getComponent(Label).string)<=decamt){
                    console.log("key",Number(this.boxpool.totalamount.getComponent(Label).string));
                        this.inside=true
                }
                break
                case 2:
               
                    // console.log(this.iamt,"inn");
                    
                 if(this.iamt>=AutoPlayManager.stopcashsingleby["value"]){
                    console.log("innn");
                 
                    this.inside=true
                 }
                    break
                case 3:
                    // console.log("33");
                if(Number(this.boxpool.totalamount.getComponent(Label).string)>=incamt){
                    this.inside=true
                }
                    break
                case 4:
                    console.log("case 4");
                    
                    if(Number(this.boxpool.totalamount.getComponent(Label).string)<=decamt || this.iamt>=AutoPlayManager.stopcashsingleby["value"]){
                        this.inside=true
                }
                    break
                case 5:
                    console.log("case 5");
                    
                    if(Number(this.boxpool.totalamount.getComponent(Label).string)<=decamt || Number(this.boxpool.totalamount.getComponent(Label).string)>=incamt){
                        this.inside=true
                }
                    break
                case 6:
                    console.log("case 6");
                    if(Number(this.boxpool.totalamount.getComponent(Label).string)>=incamt || this.iamt>=AutoPlayManager.stopcashsingleby["value"]){
                        this.inside=true
                }
                    break
                case 7:
                    console.log("case 7");
                    if(Number(this.boxpool.totalamount.getComponent(Label).string)<=decamt ||Number(this.boxpool.totalamount.getComponent(Label).string)>=incamt ||this.iamt>=AutoPlayManager.stopcashsingleby["value"]){
                        this.inside=true 
                }
                    break
            } 
        }
    }

    checkauto(){
            if(AutoPlayManager.Ifwon[1]["enable"]==true){
              
                console.log(this.iamt,"iamt");
                console.log(this.editAmt,"Amount before startting autoplay");
                
                console.log(Number(this.boxpool.editbox.getComponentInChildren(Label).string),"Number(this.boxpool.editbox.getComponentInChildren(Label).string)");
                
                
                if(this.iamt>Number(this.boxpool.editbox.getComponentInChildren(Label).string)){
               console.log("inside");          
                let incamt=AutoPlayManager.Ifwon[1]["value"]
                this.boxpool.editbox.getComponentInChildren(Label).string=(Number(this.boxpool.editbox.getComponentInChildren(Label).string)+(incamt/100)).toFixed(2)
           
                }else{
        
                    
                    this.boxpool.editbox.getComponentInChildren(Label).string=this.editAmt.toFixed(2)
                }
            }
            if(AutoPlayManager.Ifwon[2]["enable"]==true){
                if(this.iamt>Number(this.boxpool.editbox.getComponentInChildren(Label).string)){
      
                let incamt=AutoPlayManager.Ifwon[2]["value"]
                this.boxpool.editbox.getComponentInChildren(Label).string=(Number(this.boxpool.editbox.getComponentInChildren(Label).string)-(incamt/100)).toFixed(2)
   
                }else{
                    this.boxpool.editbox.getComponentInChildren(Label).string=this.editAmt.toFixed(2)
                }
            }

            if(AutoPlayManager.Iflost[1]["enable"]==true){
                if(this.iamt<Number(this.boxpool.editbox.getComponentInChildren(Label).string)){
             
                let incamt=AutoPlayManager.Iflost[1]["value"]
                this.boxpool.editbox.getComponentInChildren(Label).string=(Number(this.boxpool.editbox.getComponentInChildren(Label).string)+(incamt/100)).toFixed(2)
       
                }else{
                    this.boxpool.editbox.getComponentInChildren(Label).string=this.editAmt.toFixed(2)
                }
            }

            if(AutoPlayManager.Iflost[2]["enable"]==true){
                if(this.iamt<Number(this.boxpool.editbox.getComponentInChildren(Label).string)){
     
                let incamt=AutoPlayManager.Iflost[2]["value"]
                this.boxpool.editbox.getComponentInChildren(Label).string=(Number(this.boxpool.editbox.getComponentInChildren(Label).string)-(incamt/100)).toFixed(2)
            
                }else{
                    this.boxpool.editbox.getComponentInChildren(Label).string=this.editAmt.toFixed(2)
                }
            }
            
            this.iamt=0
            console.log(this.iamt,"after check iamt");
            
    }

    update(deltaTime: number) {
        let presetAmt=Number(this.boxpool.totalamount.getComponent(Label).string)
        if((AutoPlayManager.stopcashdecby["enable"] == true && AutoPlayManager.stopcashdecby["value"] > 0)|| AutoPlayManager.stopcashdecby["enable"] == false){
            // console.log("play1",AutoPlayManager.stopcashdecby["value"])
            this.Autostart.interactable = true;            
            console.log(presetAmt,"amt");
        }
        if((AutoPlayManager.stopcashdecby["enable"] == true && AutoPlayManager.stopcashdecby["value"] <= 0)){
            // console.log("play")
            if(this.Autostart.interactable)
                this.Autostart.interactable = false;
                return
        }

        if((AutoPlayManager.stopcashincby["enable"] == true && AutoPlayManager.stopcashincby["value"] > 0)|| AutoPlayManager.stopcashincby["enable"] == false){
            this.Autostart.interactable = true;
            // console.log("play2",AutoPlayManager.stopcashincby["value"])
        }
        else if((AutoPlayManager.stopcashincby["enable"] == true && AutoPlayManager.stopcashincby["value"] <= 0)){
            this.Autostart.interactable = false;
            return
        }

        if((AutoPlayManager.stopcashsingleby["enable"] == true && AutoPlayManager.stopcashsingleby["value"] > 0)|| AutoPlayManager.stopcashsingleby["enable"] == false){
            this.Autostart.interactable = true;

        }
        else if((AutoPlayManager.stopcashsingleby["enable"] == true && AutoPlayManager.stopcashsingleby["value"] <= 0)){
            this.Autostart.interactable = false;
            return
        }
        if(this.WinOrLosenode[0].children[0].getComponent(Sprite).spriteFrame == this.AutoSprites[1]){
            this.WinOrLosenode[0].getChildByName("StopCash_BetAmtBG").children[0].name="winorlose"
            if(AutoPlayManager.Iflost[1]["value"] > 0){
                this.Autostart.interactable = true;
            }else{
                this.Autostart.interactable = false;
            }
        }
        if(this.WinOrLosenode[1].children[0].getComponent(Sprite).spriteFrame == this.AutoSprites[1]){
            this.WinOrLosenode[1].getChildByName("StopCash_BetAmtBG").children[0].name="winorlose"
            if(AutoPlayManager.Iflost[2]["value"] > 0){
                this.Autostart.interactable = true;
            }else{
                this.Autostart.interactable = false;
            }
        }
        if(this.WinOrLosenode[2].children[0].getComponent(Sprite).spriteFrame == this.AutoSprites[1]){
            this.WinOrLosenode[2].getChildByName("StopCash_BetAmtBG").children[0].name="winorlose"
            if(AutoPlayManager.Ifwon[1]["value"] > 0){
                this.Autostart.interactable = true;
            }else{
                this.Autostart.interactable = false;
            }
        }
        if(this.WinOrLosenode[3].children[0].getComponent(Sprite).spriteFrame == this.AutoSprites[1]){
            this.WinOrLosenode[3].getChildByName("StopCash_BetAmtBG").children[0].name="winorlose"
            if(AutoPlayManager.Ifwon[2]["value"] > 0){
                this.Autostart.interactable = true;
            }else{
                this.Autostart.interactable = false;
            }
        }
    }
   
    
}
