import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Policy } from '../policy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  policies: Policy[];
  selectedPolicy: Policy ={ id : null , number:null, amount: null};

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this._apiService.getPolicys()
    .subscribe((data: Policy[])=>{
      this.policies = data;
      console.log(this.policies);
    });
  }

  selectPolicy(policy: Policy){
    this.selectedPolicy = policy;
  }

  delete(policies:Policy) : void
  {
       console.log(policies.id);
      
       this._apiService.deletePolicy(policies.id)
       .subscribe(data =>{
        this.policies = this.policies.filter(u=>u!==policies);
       console.log("Policy deleted, ", policies);
       });
  }

  
    

  createOrUpdatePolicy(form)
  {
    if(this.selectedPolicy && this.selectedPolicy.id){
      form.value.id = this.selectedPolicy.id;
      this._apiService.updatePolicy(form.value).subscribe((policy: Policy)=>{
      console.log("Policy updated" , policy);
      });
    }
    else{
    
      this._apiService.createPolicy(form.value).subscribe((policy: Policy)=>{
      console.log("Policy created, ", policy);
      });
    }
  
  }
    


}