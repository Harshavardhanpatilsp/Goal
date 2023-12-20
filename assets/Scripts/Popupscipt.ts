import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Popupscipt')
export class Popupscipt extends Component {
    start() {
        this.node.active=false
    }
    show(){
        this.node.active=true
    }
    
}

