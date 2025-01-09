import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
 
  @Input() placeholder: string = 'Write your comment here...';

  @Output() commentSubmitted = new EventEmitter<string>();

  commentText: string = '';

  onSubmit() {
    if (this.commentText.trim()) {

      this.commentSubmitted.emit(this.commentText);


      this.commentText = '';
    }
  }
}
