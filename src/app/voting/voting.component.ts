import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotingOptions } from '../interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  voting = null;
  options: VotingOptions[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.voting = (await this.dataService.getVotingDetails(id)).data;
      const options = (await this.dataService.getVotingOptions(id)).data;

      options?.map((item) => {
        const option = this.fb.group({
          title: [item.title, Validators.required],
          id: item.id,
        });
        this.options.push(option);
      });

      console.log('Voting options: ', options);
      this.form.patchValue(this.voting);
    }
  }
}
