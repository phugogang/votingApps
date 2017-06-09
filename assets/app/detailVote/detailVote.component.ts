import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { AnimationEvent } from '@angular/animations';
import { itemStateTrigger, itemStateTriggerRight, itemStateTriggerTop } from '../shared/animations';

import { AppService } from '../app.service';
import 'rxjs/Rx';

@Component({
    selector: "detailVote",
    templateUrl: "./detailVote.component.html",
    animations: [itemStateTrigger, itemStateTriggerRight, itemStateTriggerTop]

})


export class DetailVoteComponent implements OnInit, OnDestroy {
    
    id: string;
    result: any;
    comments: Array<any> = [];
    user_Id: string;
    show_chart: boolean = false;
    origin_url:string;

    is_submitted: boolean = false;
    private subscription: Subscription;
    private progress: string = 'progressing';

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private _appService: AppService, private _location: Location

    ) {
    
        this.subscription = this.activatedRoute.params
            .subscribe(
            (param: any) => this.id = param["id"]
            )
    }

    ngOnInit() {
        this.origin_url = window.location.href;
        this.fetchData();
        
    }

    onSubmit(form: NgForm) {
        let vote_id = this.result._id;
        let choice_id = form.value.choose;
        this._appService.postChoiceRating(choice_id)
            .subscribe((result) => {
                this.is_submitted = true;
            },
            err => console.log(err))
    }

    onEdit() {
        this.router.navigate(["/votes", this.result._id, "edit"], { relativeTo: this.activatedRoute })
    }

    addComment(form: NgForm) {
        let text = form.value.comment;
        form.resetForm();
        this._appService.postComment(this.result._id, text)
            .subscribe((comment) => {         
                this.comments.unshift({ text: comment.text, author: { _id: comment.author, username: this._appService.username } });
                // this.fetchData();
            }, err => console.log(err))
    }



    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    onCommentAnimation(animated: AnimationEvent, lastCommentId: number) {
        if (animated.fromState != 'void') {
            return;
        }
        if (this.result.comments.length > lastCommentId + 1) {
            this.comments.push(this.result.comments[lastCommentId + 1])
        }

    }


    fetchData() {
        this.user_Id = this._appService.userId;
        this._appService.getDetailVote(this.id)
            .subscribe((data) => {
                setTimeout(() => {
                    this.progress = 'finish';
                    this.result = data;
                    if (this.result.comments.length > 0) {
                        this.comments.push(this.result.comments[0]);
                    }
                    this._appService.getClientIP()
                        .subscribe((result) => {
                            let ipAdress = result.ipAdress;
                            if (data.choices.length > 0) {
                                for (let choice of data.choices) {
                                    for (let ip of choice.ips) {
                                        if (ip == ipAdress) {
                                            this.is_submitted = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        });
                }, 1000)
            })
    }


    showBarChar() {
        // this.fetchData();
        this.show_chart  = true;     

        
    }

}