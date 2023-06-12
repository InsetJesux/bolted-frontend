import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bolted-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent  implements OnInit {
  @Input()
  private readonly binary: boolean = false;

  constructor() { }

  ngOnInit() {}

}
