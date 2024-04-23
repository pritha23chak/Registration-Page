import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,NgIf,NgFor,CommonModule,ɵInternalFormsSharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  app={fname:'',lname:'',email:'',pnumber:'',dob:'',gender:'',add:'',country:'',city:'',state:'',pin:''};
  elements: any[]=[];
  listflag = false;
  sindex:any;
  updateflag = false;
  deleteflag = false;

  constructor(private router: Router){
    const storedData = localStorage.getItem('registrationData');
    if (storedData) {
      this.elements = JSON.parse(storedData);
      this.listflag = true; // Show the table view if data exists
    }

  }
  onSave(){
    /*let app=[];
    /*this.elements.push({...this.app});*/
    /*this.resetForm();*/
    /*app.push(this.app)
    this.elements=app;*/
    if (this.updateflag) {
      this.elements[this.sindex]=this.app ;
      this.updateflag= false;
      this.sindex=undefined;
    } else {
      this.elements.push({ ...this.app });
    }

   
     // Push the current form data into the elements array
    this.saveToLocalStorage(); // Save data to local storage
    this.listflag = true; // Show the table view
    this.resetForm();
  }
  onCancel(){
    this.listflag=true
  }

  resetForm() {
    // Reset all form fields to empty strings or default values
    this.app = {
      fname: '',
      lname: '',
      email: '',
      pnumber: '',
      dob: '',
      gender: '',
      add: '',
      country: '',
      city: '',
      state: '',
      pin: ''
    };
  }

  saveToLocalStorage() {
    // Save data to local storage
    localStorage.setItem('registrationData', JSON.stringify(this.elements));
  }

  onUpdate(data: any,index: number) {
    // Populate the form fields with the selected data
    alert('you want to update this item');
    this.sindex= index;
    this.updateflag= true;
    this.app = { ...data };
    this.listflag = false; // Show the form view for update
  }
  onDelete(index: number) {
    alert('you want to delete this item');
    this.sindex= index;
    this.deleteflag= true;
    this.elements.splice(index, 1);
    this.listflag = false;
  
  } 
  /*onDeleteWithAlert(): void {
    alert('you want to delete this item');*
  }*/
  
  OnFormSubmitted(form: HTMLFormElement){
    console.log(form);
  }
  onBack(){
    this.listflag=!this.listflag;
  }
}

