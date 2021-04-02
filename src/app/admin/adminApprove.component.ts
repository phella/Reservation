import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './adminApprove.component.html',
  styleUrls: ['./adminApprove.component.css']
})
export class AdminApproveComponent implements OnInit {
  users;
  constructor(private service: AdminService) { 
  }

  approveUser(idx){
    const id = this.users[idx]._id
    this.service.approveUser(id).subscribe(res => {
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
    list.removeChild(items[idx]);
    this.users.splice(idx,1)
  }

  rejectUser(idx){
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

  ngOnInit() {
     this.service.getNotApprovedUsers().subscribe(res => {
       if(res) {
         this.users = res
       } else {
         this.users = []
       }
     })

    
  }

}
