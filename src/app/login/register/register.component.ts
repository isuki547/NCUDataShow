import { Component, OnInit, OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
    this.form=this.fb.group({
      email:[],
      name:[],
      password:[],
      repeat:[],
      avatar:[img]
    })
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  onSubmit({value,valid},ev:Event){
    ev.preventDefault();
    if(!valid){
      return;
    }
    this.store$.dispatch(new Authactions.RegisterAction(value));
  }
  
}
