import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  @Output() public onUploadFinished = new EventEmitter();

  // API url
  private _uploadApiUrl = 'http://auqxrbneiis001p:5055/upload';

  constructor(private http: HttpClient) {}
  progress!: number;
  message!: string;
  value!: number;

  // Returns an observable
  uploadVideo(
    file: any,
    username: any,
    title: any,
    description: any
  ): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);
    formData.append('username', username);
    formData.append('title', title);
    formData.append('description', description + ` - ${Date.now()}`);
    this.http
      .post('http://auqxrbneiis001p:5055/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })

      .subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
            this.value = this.progress;
          } else if (event.type == HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );

    // Make http post request over api
    // with formData as req
    return this.http.post(this._uploadApiUrl, formData);
  }
}
