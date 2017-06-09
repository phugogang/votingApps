import {Component, OnInit, OnDestroy} from '@angular/core';
import {AnimationEvent} from '@angular/animations';
import {itemStateTrigger} from '../shared/animations';
import { AppService } from '../app.service';
import { VoteModel } from '../vote.models';
import 'rxjs/Rx';
import {Subscription, Observable} from "rxjs";


@Component({
  selector: "listVote",
  templateUrl: './listVote.component.html',
  styles: [`
      .list_item {
        box-shadow : 3px 3px 2px #888888
      }
  `],
  animations: [itemStateTrigger]
})

export class ListVoteComponent implements OnInit, OnDestroy {

  results: VoteModel[];
  displayedResult: VoteModel[] = [];
  progress: string = 'progressing';
  subscription: Subscription;
  constructor (private _appService: AppService) {}

  ngOnInit() {

    this.subscription = this._appService.getListVote()
      .subscribe((res) => {        
          setTimeout(() => {
            this.progress = 'finish';
            this.results = res;
             if (this.results.length >= 1) {
            this.displayedResult.push(this.results[0])
          }
          }, 2000);
         

      });
  }

  onItemAnimated(animationEvent: AnimationEvent, lastPrjId: number) {
    if (animationEvent.fromState != 'void') {
      return;
    }
    if (this.results.length > lastPrjId + 1) {
      this.displayedResult.push(this.results[lastPrjId + 1])
    } else {
      this.results = this.displayedResult;
    }
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }


 

}
