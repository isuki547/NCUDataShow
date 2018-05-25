import { Component,Input,forwardRef,OnDestroy, OnInit,ChangeDetectionStrategy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, 
        FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {User} from '../../domain';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../service/user.service';

        
@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ChipsListComponent implements ControlValueAccessor,OnInit {
  // @ViewChild('autoMember') autoMember;
  @Input() multiple = true;
  @Input() label = '添加/修改成员';
  @Input() placeholderText = '请输入成员 email';
  items: User[]=[];
  chips: FormGroup;
  memberResults$: Observable<User[]>;

  constructor(private fb: FormBuilder, private service: UserService) {
    this.items = [];
  }
  ngOnInit() {
    this.chips =this.fb.group({
      memberSearch:['']
    });
    this.memberResults$ = this.chips.get('memberSearch').valueChanges
    .debounceTime(300)
    .distinctUntilChanged()
    .filter(s => s && s.length >1)
    .switchMap(str => this.service.searchUsers(str));

  }
  private propagateChange = (_: any) => {};

  writeValue(obj: User[]):void{
    if (obj && this.multiple) {
      const userEntities = obj.reduce((entities, user) => ({... entities,user}),{})
      
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
    }
  }

  registerOnChange(fn: any):void{
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any):void {

   }
  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
   validate(c: FormControl):{[key:string]:any} {
    return this.items ? null : {
      chipListInvalid: true
    };
  }
  removeMember(member: User) {
    const ids = this.items.map(u => u.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.chips.patchValue({ memberSearch: '' });
    this.propagateChange(this.items);
  }

  handleMemberSelection(member: User) {
    if (this.items.map(u => u.id).indexOf(member.id) !== -1) {//包含了id，什么都不做
      return;
    }
    // if (this.multiple) {
    //   this.items = [...this.items, user];
    // } else {
    //   this.items = [user];
    // }
    this.items=this.multiple ? [... this.items,member]:[member];
    this.chips.patchValue({ memberSearch: member.name });
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user ? user.name : '';
  }

  searchUsers(obs: Observable<string>): Observable<User[]> {
    return obs.startWith('')
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str));
  }
//才显示输入框
  get displayInput() {
    return this.multiple || (this.items.length === 0);
  }
}
