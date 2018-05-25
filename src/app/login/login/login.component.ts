import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import { QuoteService } from '../../service/quotes.service';
import { Quote } from '../../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import { Store,select } from '@ngrx/store';
import * as fromRoot from "../../reducers";
import * as actions from "../../actions/quotes.action";
import * as Authactions from "../../actions/auth.action";
import { LoginAction } from '../../actions/auth.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  quote$:Observable<Quote>
  constructor(
    private fb:FormBuilder,
    // private quoteService$:QuoteService,
    private store$:Store<fromRoot.State>
  ) { 
    this.quote$ = this.store$.pipe(select(fromRoot.getQuoteState));

    // this.quoteService$
    // .getQuote()
    // .subscribe(q => {
    //   this.store$.dispatch(new actions.LoadSuccessAction(q));
    // });
  }

  ngOnInit() {
    this.form=this.fb.group({
      name:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
    });
    this.store$.dispatch({type: actions.QUOTE});
  }
onSubmit({value,valid},ev:Event){
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
    if(!valid){
      return;
    }
    this.store$.dispatch(new Authactions.LoginAction(value));

  }
  
}
