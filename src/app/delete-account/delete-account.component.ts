import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  users;
  constructor(private service: AdminService) { 
  }

  onclick(){
    const username = (<HTMLInputElement>document.getElementById('search-username')).value
    this.service.getUsers(username).subscribe(res => {
      if(res){
        if(!res.error){
          this.users = res.users
        } else {
          this.users = []
          console.log(res.message)
        }
      } else {
        this.users = []
        console.log("error")
      }
    })
  }

  deleteAccount(idx){
    const id = this.users[idx]._id
    this.service.deleteUser(id).subscribe(res => {
      if(res){
        if(!res.error){
          this.removeListItem(idx)
        } else {
          console.log(res.message)
        }
      } else {
        console.log(res)
      }
    })
  }

  removeListItem(idx){
    const list = document.getElementById('list1'),
    items = Array.prototype.slice.call(list.childNodes)
    list.removeChild(items[idx])
    this.users.splice(idx,1)
  }

  ngOnInit(): void {
  }

}
