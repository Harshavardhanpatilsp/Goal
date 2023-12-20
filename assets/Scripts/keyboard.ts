import { _decorator, Component, Node, Prefab, instantiate, UITransform, Label, EditBox, EventTouch } from 'cc';
import { BoxPool } from './BoxPool';
const { ccclass, property } = _decorator;

@ccclass('keyboard')
export class keyboard extends Component {
   
    @property(Prefab)
    buttonprefab:Prefab

    @property(Node)
    keyboard:Node

    @property(EditBox)
    input:EditBox

    @property(BoxPool)
    boxPool:BoxPool

    height=346
    width=85
    i=1
    k=0
    showing:boolean=false
    count=1
    child
    Dotpressedno=0

    start(){
        // this.keyboard.setPosition(200,100)
        this.input.getComponentInChildren(Label).string="0.10"
       this.node.active=false
     this.show()
    }
  
    show(){

        this.input.getComponentInChildren(Label).string="0.10"
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                let button=instantiate(this.buttonprefab)
                button.on(Node.EventType.TOUCH_START,this.OnAmtbtnClicked,this)
                button.getComponentInChildren(Label).string=this.i+""
                this.i++
                button.getComponent(UITransform).width=144
                button.getComponent(UITransform).height=72
                this.keyboard.addChild(button)
                button.setPosition(this.width,this.height,0)
                this.width=this.width+153
            }
            this.child=this.keyboard.children
            // console.log("children",this.child);
            this.height=this.height-80
            this.width=85
        }
        this.input.getComponentInChildren(Label).string="0.10"
    
    }

    showingnde(){
        this.node.active=true
        this.input.string=" "
    }
    hide(){

      this.count=1
      if(Number(this.input.getComponentInChildren(Label).string)>100){
        this.input.getComponentInChildren(Label).string=100.00.toFixed(2)
      }else if( this.input.getComponentInChildren(Label).string=="" || Number(this.input.getComponentInChildren(Label).string)<=0.0 || this.input.getComponentInChildren(Label).string=="." || this.input.getComponentInChildren(Label).string=="0."){
        this.input.getComponentInChildren(Label).string="0.10"
      }else
      this.input.getComponentInChildren(Label).string=Number(this.input.getComponentInChildren(Label).string).toFixed(2)
        this.node.active=false
    }
    OnAmtbtnClicked(event:EventTouch){
        if(this.count==1){
        let curnode = event.target as Node
        let value=curnode.getChildByName("Label").getComponent(Label).string
        this.input.getComponentInChildren(Label).string=value
        this.count++
    }else{
        let curnode = event.target as Node
        let value=curnode.getChildByName("Label").getComponent(Label).string
        this.input.getComponentInChildren(Label).string= this.input.getComponentInChildren(Label).string+value
        this.count++
    }
}
    onBtnClick(){
        if(this.Dotpressedno<1){
            let value=this.keyboard.getChildByName("Button").getChildByName("Label").getComponent(Label).string
                this.input.getComponentInChildren(Label).string=this.input.getComponentInChildren(Label).string+value
                this.count++
                this.Dotpressedno++
            }
        // if(this.count==1){
        //     console.log(this.keyboard.getChildByName("Dot").getChildByName("Label").getComponent(Label).string);
            
        //    let value=this.keyboard.getChildByName("Dot").getChildByName("Label").getComponent(Label).string
        //    this.input.getComponentInChildren(Label).string=value
        //    this.count++
        // }
        // else{
        //     let value=this.keyboard.getChildByName("Dot").getChildByName("Label").getComponent(Label).string
        //     this.input.getComponentInChildren(Label).string=this.input.getComponentInChildren(Label).string+value
        //     this.count++
        // }
    }
    onBtnClickzero(){
        if(this.count==1){
            console.log(this.keyboard.getChildByName("Zero").getChildByName("Label").getComponent(Label).string);
            
           let value=this.keyboard.getChildByName("Zero").getChildByName("Label").getComponent(Label).string
           this.input.getComponentInChildren(Label).string=value
           this.count++
        }
        else{
            let value=this.keyboard.getChildByName("Zero").getChildByName("Label").getComponent(Label).string
            this.input.getComponentInChildren(Label).string=this.input.getComponentInChildren(Label).string+value
            this.count++
        }
    }

    deletButton(){
        let currenttext=this.input.getComponentInChildren(Label).string
        console.log(currenttext.length);
        
        if(currenttext.length>0){console.log("Ebterd");
        
        this.input.getComponentInChildren(Label).string=currenttext.slice(0,-1)
            this.count--
        }
    }
    update(){
        if(this.node.active==false){
            this.Dotpressedno=0
        }
    }
}

