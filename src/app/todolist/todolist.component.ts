import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { NgForm } from '@angular/forms';
import { TodoservicesService } from '../todoservices.service';
import { NgModel } from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.sass']
})
export class TodolistComponent implements OnInit {
  toDoList = [];
  allItems: Item[]= [];
  public todo:any = '';
  constructor(private todoservice:TodoservicesService,private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.allItems = []
    this.todoservice.getData().subscribe((res)=>{
      this.toDoList = res
      this.toDoList.forEach(element => {
      this.allItems.push(element);
     });
     this.allItems.forEach(element => {
      element.isEditClick = false;
     });
    });
  }
  submit(form: NgForm){
    form.value.status = false;
    this.todoservice.addNotes(form.value).subscribe((res)=>{
      this.getData();
      form.reset();
    })
  }
  markAsDone(item:any,i:number){
    item.status = !item.status 
    this.todoservice.updateNotes(item.id,item).subscribe((res)=>{
      this.allItems[i].description = res.description
      this.allItems[i].status = res.status
    });
  }
  updateToDo(item:any,i:number){
    this.todoservice.updateNotes(item.id,item).subscribe((res)=>{
      this.allItems[i].description = res.description
      this.allItems[i].status = res.status
    });
  }
  isEditClick(item:any){
    this.allItems.forEach(element => {
      element.isEditClick = false;
    });
    item.isEditClick = true;
  }

  getStatus(item:any) {
    if(item.status == true) {
      return true;
    }else{
      return false;
    }
  }
  removeTask(item:any,i:number){
    this.todoservice.removeTasks(item.id).subscribe((res)=>{
     this.getData();
    });
  }
}
