import { Component, OnInit, OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl ,Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../reducers";
import * as Authactions from "../../actions/auth.action";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy{
  form:FormGroup;
  items:string[]; 
  sub:Subscription;
  private readonly avatarName ='avatars';
  constructor(private fb:FormBuilder, private store$:Store<fromRoot.State>) {}
  

  ngOnInit() {
    const img=`${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed()}`//默认随机选一个
    const nums=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items=nums.map(d => `avatars:svg-${d}`);//svg-1是图标的ID，使循环
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      repeat: ['', Validators.required],
      avatar: [img],
    });
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  onSubmit({value,valid}: FormGroup,ev:Event){
    ev.preventDefault();
    if(!valid){
      return;
    }
    this.store$.dispatch(new Authactions.RegisterAction({
      id: undefined,
      password: value.password,
      name: value.name,
      email: value.email,
      avatar: value.avatar,
      projectIds:[]
    }));
  }
  
}
