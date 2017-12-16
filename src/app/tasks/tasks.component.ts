import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
//masonry options
import { MasonryOptions } from 'angular2-masonry';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any = [];

  constructor(private tasksService: TasksService) { }

  title: string;
  selectedTask: any;

  public myOptions: MasonryOptions = {
    transitionDuration: '0.8s',
    gutter: '.gutter-sizer'
  };

  ngOnInit() {
    // Retrieve posts from the API
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(event){
    event.preventDefault();
    var newTask = {
      title: this.title,
      complete: false
    }

    this.tasksService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      })

  }

  deleteTask(id){
    var tasks = this.tasks;

    this.tasksService.deleteTask(id).subscribe(data => {
      if (data.n == 1){
        for(var i = 0; i < tasks.length; i++){
          if(tasks[i]._id == id){
            tasks.splice(i,1);
          }
        }
      }
    });
  }

  updateStatus(task, event){
    event.stopPropagation();

    var _task = {
      _id: task._id,
      complete: !task.complete,
      title: task.title,
      color: task.color
    };

    this.tasksService.updateTask(_task).subscribe(data =>{
      task.complete = !task.complete;
    });
  }

  update(task){

    var _task = {
      _id: task._id,
      complete: task.complete,
      title: task.title,
      color: task.color
    };

    this.tasksService.updateTask(_task).subscribe(data =>{
      task.complete = !task.complete;
    });

  }

  selectTask(task){
    this.selectedTask = task;

  }

  unselectTask(task){
    this.selectedTask = null;

  }

  setColor(color){
    if(this.selectedTask){
      this.selectedTask.color = color;
      this.update(this.selectedTask);
    }

  }

}
