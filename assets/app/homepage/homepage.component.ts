import { Component } from '@angular/core';
import {showStateTrigger} from '../shared/animations';
import {AnimationEvent} from '@angular/animations';
@Component({
    selector: "homepage",
    templateUrl: './homepage.component.html',
    animations: [showStateTrigger]
})

export class HomePageComponent {
    animate: boolean = false;
    constructor() {}

    

}