import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import { QuoteService } from '../../service/quotes.service';
import { Quote } from '../../domain/quote.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  quote:Quote = {
    "cn":"第一个愿望是，佛一直可以在我心里，帮助我别离开我，来生还可以做人。——《极地》",
    "en":"The first wish is that the Buddha can always be in my heart and help me not to leave me,can still be a person next life. ",
    "pic":"/assets/img/quotes/2.jpg",
  };
  constructor(private fb:FormBuilder,private quoteService$:QuoteService) { 
    this.quoteService$
    .getQuote()
    .subscribe(q => this.quote = q);
  }

  ngOnInit() {
    this.form=this.fb.group({
      name:['547',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
    })
  }
onSubmit({value,valid},ev:Event){
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);

  }
  
}
