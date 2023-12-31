import { _decorator, Component,UIOpacity,Vec3,Node ,tween} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('howtoplayscript')
export class howtoplayscript extends Component {
    start() {
        this.node.active=false
    }
    show() {
        this.node.active = true
    }
    close(){
        tween(this.node).to(0.3,{position:new Vec3(this.node.position.x,this.node.position.y+132,1)}).call(()=>{
            this.node.children[0].setPosition(0,408,1);
            this.node.active = false;
            
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

    // CloseButton(){
    //     tween(this.node).to(0.3,{position:new Vec3(this.node.position.x,this.node.position.y+132,1)}).call(()=>{
    //         this.node.children[0].setPosition(0,408,1);
    //         this.node.active = false;
            
    //     }).start();
    //     tween(this.node.getComponent(UIOpacity)).to(0.2,{opacity: 0}).start();
        
    // }
    
}

