import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../app.service';

@Component({
    selector: 'myvote',
    templateUrl: './myvote.component.html'
})

export class MyVoteComponent {
    myVote: Array<any>

    subscription: Subscription;
    constructor(private _appService: AppService, private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params
            .subscribe((params: any) => {
                let user_id = params['id'];
                this._appService.getMyVote(user_id)
                    .subscribe((res) => {
                        console.log(res);
                        this.myVote = res.votes;
                    })
            })
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}   