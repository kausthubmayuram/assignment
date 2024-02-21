import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  taskForm:any =  new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl(''),
    status: new FormControl(null, [Validators.required]),
  });
  editForm:any =  new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(null, [Validators.required]),
  });

  gridlist:any = [];
  gridlistBackup:any = [];
  newStatus:any = null;
  filter:any = null;
  constructor(private dashboardService: DashboardService) { }
  
  ngOnInit(){
    this.getDashboard();
  }

  resetForm(){
    this.taskForm.reset();
  }

  onSubmit(){
    console.log(this.taskForm.value);
    var dataObject = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status
    }
    this.dashboardService.createTask(dataObject).subscribe((res)=>{
      console.log(res);
      this.getDashboard();

    });
  }

  getDashboard(){
    this.dashboardService.getTasklist().subscribe((res)=>{
      console.log(res);
      this.gridlist = res? res : [];
      this.resetForm();
      this.filter = null;
      this.gridlistBackup = JSON.parse(JSON.stringify(this.gridlist));
    });
  }

  deleteTask(id:any){
    this.dashboardService.deleteTask({id:id}).subscribe((res)=>{
      this.getDashboard();
    });
  }

  editTaskOpen(data:any){
    console.log(data);
    this.editForm.patchValue(data);
    $('#editTaskModal').modal('show');
  }

  editTaskSubmit(){
    this.dashboardService.updateTask(this.editForm.value).subscribe((res)=>{
      this.getDashboard();
      $('#editTaskModal').modal('hide');
    });
  }

  filterChanged(){
    if(this.filter == 'null'){
      this.getDashboard();
      return;
    }else{
      var temp = JSON.parse(JSON.stringify(this.gridlistBackup));

      this.gridlist = temp.filter((item:any)=>{
        return item.status == this.filter;
      });
    }
    
   
  }
}
