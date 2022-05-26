import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { VideoProps } from '../classes/VideoProps';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  id!: number;
  video_id!: any;
  files: File[] = [];
  myVideos!: Observable<VideoProps[]>;
  videoTest: string = './assets/videos/trailer_hd.mp4';
  title = 'Player';

  @ViewChild('videoPlayer') videoplayer: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {});
    this.getvideos();
  }

  toggleVideo(event: any) {
    this.videoplayer?.nativeElement.play();
  }
  getvideos() {
    this.myVideos = this.VideosList();
    console.log(this.myVideos);
    console.log(this.VideosList());
  }

  VideosList(): Observable<VideoProps[]> {
    return this.http.get<VideoProps[]>(
      // 'http://auqxrbneiis001p:5055/GetVideo?videoString=' + 'video_id'
      'http://auqxrbneiis001p:5055/GetRecent?count=1'
    );
  }
}
