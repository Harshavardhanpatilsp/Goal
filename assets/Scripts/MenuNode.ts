import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuNode')
export class MenuNode extends Component {
    start() {
        this.node.active=false
    }

    show(){
        this.node.active=false
    }

  
}

