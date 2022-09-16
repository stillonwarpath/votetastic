import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-votings-details',
  templateUrl: './votings-details.component.html',
  styleUrls: ['./votings-details.component.scss']
})
export class VotingsDetailsComponent implements OnInit {

  voting: any = null;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
  ) { 
    this.form = this.fb.group({
      voting_question: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      public: [false],
    });
  }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.voting = (await this.dataService.getVotingDetails(id)).data;
      console.log('Voting:', this.voting);
      this.form.patchValue(this.voting);
    }
  }

  async updateVoting() {
    console.log(this.form.value);
    const result = await this.dataService.updateVotingDetails(this.form.value, this.voting.id);
    this.toaster.success('Voting updated!');
  }

  async deleteVoting() {
    const { data, error} = await this.dataService.deleteVoting(
      Number(this.voting.id)
    );
    console.log('data:', data);
    console.log('error:', error);
    this.toaster.info('Voting deleted!');
    this.router.navigateByUrl('/app');
  }


}
