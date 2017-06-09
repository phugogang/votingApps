import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';


import { AppService } from '../app.service';

@Component({
    selector: "editVote",
    templateUrl: "./editVote.component.html",
    styles: [`
        textarea {
            font-size: 20px;
            color: red;
        }
        `]
})

export class EditVoteComponent implements OnInit, OnDestroy {
    myForm: FormGroup;
    result: any;
    id: string;
    init_size: number;

    form_is_edit: boolean = false;
    edit_question: boolean = false;
    edit_init_choice: boolean = false;
    add_choice: boolean = false;

    private subscription: Subscription;

    constructor(private route: Router,
        private activatedRoute: ActivatedRoute,
        private _appService: AppService,
        private formBuilder: FormBuilder,
        private _location: Location
    ) {

    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params
            .subscribe((params: any) => {
                this.id = params["id"];
                this.initForm();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    initForm() {
        this._appService.getDetailVote(this.id)
            .subscribe((data) => {
                this.result = data;
                this.init_size = data["choices"].length;
                let question = data.question;
                let choices = new FormArray([]);

                if (data["choices"]) {
                    for (let choice of data["choices"]) {
                        choices.push(
                            new FormControl(choice.text, Validators.required)
                        )
                    }
                }
                this.myForm = new FormGroup({
                    'question': new FormControl(question, Validators.required),
                    'choices': choices
                });



                this.myForm.get("question").valueChanges
                    .subscribe(() => {
                        this.edit_question = true;
                        this.form_is_edit = true;
                    })

                for (let i = 0; i < this.init_size; i++) {
                    this.myForm.get("choices").get(`${i}`).valueChanges
                        .subscribe(() => {
                            this.edit_init_choice = true,
                                this.form_is_edit = true;
                        })
                }
            })
    }


    onAddChoice() {
        this.form_is_edit = true;
        this.add_choice = true;
        (<FormArray>this.myForm.controls["choices"]).push(
            new FormControl('', Validators.required)
        )
    }

    onSubmit() {
        let question = this.myForm.controls["question"].value;
        let choices = this.myForm.get("choices").value;
        let init_choices = choices.slice(0, this.init_size);
        let init_choice_id = [];

        if (this.edit_question) {
            this._appService.editVote(this.result._id, this.myForm.get("question").value)
        }

        if (this.edit_init_choice) {
            for (let i = 0; i < this.init_size; i++) {
                init_choice_id.push(this.result.choices[i]._id)
            }
            for (let i in init_choice_id) {
                this._appService.editChoice(init_choice_id[i], init_choices[i])

            }
        }

        if (this.add_choice) {
            if (choices.length > this.init_size) {
            
               
                this._appService.postChoice(this.result._id, choices.slice(this.init_size))
                    .subscribe((res) => {
                        console.log(res);
                    },
                    err => { console.log(err) })
               
            }
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.route.navigate(["/votes", this.id], { relativeTo: this.activatedRoute })
            }, 1000)
        })
    }
}