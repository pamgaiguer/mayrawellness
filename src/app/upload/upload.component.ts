import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoProps } from '../classes/VideoProps';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Output() public onUploadFinished = new EventEmitter();

  file!: File; // Variable to store file
  progress!: number;
  message!: string;
  value!: number;
  myVideos!: Observable<VideoProps[]>;
  video_string!: string;

  form!: FormGroup;

  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''],
      title: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];

    this.form.patchValue({
      video: file,
    });
    this.form.get('video')?.updateValueAndValidity;
  }

  submitForm() {
    const formData = new FormData();

    formData.append('username', this.form.get('username')?.value);
    formData.append('title', this.form.get('title')?.value);
    formData.append('description', this.form.get('description')?.value);

    for (let value of formData.values()) {
      console.log(value);
    }
    // this.http.post('http://auqxrbneiis001p:5055/upload', formData).subscribe(
    //   (data) => console.log(data),
    //   (error) => console.log(error)
    // );
  }
}
