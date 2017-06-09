import {Component} from "@angular/core";
import {AppService} from '../app.service';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import 'rxjs/Rx';


@Component({
  selector: "newVote",
  templateUrl: './newVote.component.html',
    styles: [`
        textarea {
            font-size: 20px;
            color: red;
        }
        `]
})

export class NewVoteComponent {
  question: string;
  choices: string[];
  myForm: FormGroup;
  constructor(private router: Router,
    private _appService: AppService,
                      private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
            "question": ["", Validators.required],
            "choices": formBuilder.array([
              ["", Validators.required],
              ["", Validators.required]
            ])
    });
  }

  onAddChoice() {    
    (<FormArray>this.myForm.get("choices")).push(
      new FormControl('', Validators.required)
    )
  }

  onSubmit() {
    
    this.question = this.myForm.get('question').value;
    this.choices = this.myForm.get('choices').value;

    this._appService.createVote(this.question, this.choices)
      .subscribe((result) => 
        this.router.navigate(['/votes', result._id])
      )

  }

  choices_valid(i: string) {
     return this.myForm.get("choices").get(i)

  }






}
