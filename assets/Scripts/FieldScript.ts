import { _decorator, Component, Node, Button, SpriteFrame, Sprite } from 'cc';
import { BoxPool } from './BoxPool';
const { ccclass, property } = _decorator;

@ccclass('FieldScript')
export class FieldScript extends Component {
   
    @property(Node)
    field:Node

    @property(BoxPool)
    boxpool:BoxPool

    @property(Button)
    fieldbutton1:Button

    @property(Button)
    fieldbutton2:Button

    @property(Button)
    fieldbutton3:Button

    @property(SpriteFrame)
    Allsprites:SpriteFrame []=[]

    start(){
        console.log(this.node.children,"ll");
        
        this.node.active=false
     
    }

    show(){
        this.node.active=true
    }

    Small(){
        for(let i=0;i<this.node.children.length;i++){
            if(this.node.children[i].name=="Small"){
                this.node.children[i].getComponent(Sprite).spriteFrame=this.Allsprites[1]
            }else{
                this.node.children[i].getComponent(Sprite).spriteFrame=this.Allsprites[0]
            }
        }
        this.fieldbutton1.node.active=true
        this.fieldbutton2.node.active=false
        this.fieldbutton3.node.active=false
        this.boxpool.boxpool.removeAllChildren()
        this.boxpool.Small()

        this.node.active=false
    }

    medium(){
        for(let i=0;i<this.node.children.length;i++){
            if(this.node.children[i].name=="Medium"){
                this.node.children[i].getComponent(Sprite).spriteFrame=this.Allsprites[1]
            }else{
                this.node.children[i].getComponent(Sprite).spriteFrame=this.Allsprites[0]
            }
        }
        this.fieldbutton1.node.active=false
        this.fieldbutton2.node.active=true
        this.fieldbutton3.node.active=false
        this.boxpool.boxpool.removeAllChildren()
        this.boxpool.Medium()
        this.node.active=false
    }

    large(){
        for(let i=0;i<this.node.children.length;i++){
            if(this.node.children[i].name=="Large"){
                this.node.children[i].getComponent(Sprite).spriteFrame=this.Allsprites[1]
            }else{
                this.node.children[i].getComponent(Sprite).spriteFrame=this.Allsprites[0]
            }
        }
        this.fieldbutton1.node.active=false
        this.fieldbutton2.node.active=false
        this.fieldbutton3.node.active=true
        this.boxpool.boxpool.removeAllChildren()
        this.boxpool.large()
        this.node.active=false
    }
}

