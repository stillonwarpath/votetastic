import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-votings-list',
  templateUrl: './votings-list.component.html',
  styleUrls: ['./votings-list.component.scss']
})
export class VotingsListComponent implements OnInit {

  votings: any[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.loadVotings();
  }

  async loadVotings() {
    this.votings = await this.dataService.getVotings();
  }

  async startVoting() {
    const data = await this.dataService.startVoting();
    console.log(
      data
    );
  }



}
