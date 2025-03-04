import { Component } from '@angular/core';

@Component({
  selector: 'app-verticals',
  templateUrl: './verticals.component.html',
  styleUrls: ['./verticals.component.scss']
})
export class VerticalsComponent {

  verticals: any[] = [
    {id: 1, title: 'Education', icon: 'school', route: 'education'},
    {id: 2, title: 'Human/Health Services', icon: 'diversity_1', route: 'human-health'},
    {id: 2, title: 'Workforce Development ', icon: 'engineering', route: 'workforce'},
    {id: 2, title: 'DOC & Criminal Justice  ', icon: 'gavel', route: 'doc-criminal'},
  ]
}
