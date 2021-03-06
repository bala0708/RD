import {Component} from "@angular/core";
import {VideoCallWidgetComponent} from "../shared/video-call-widget/video-call-widget.component";
import {VideoCallStateManagerService} from "../services/video-call-state-manager.service";
import {VideoCallManager} from "../services/video-call-manager.service";

@Component({
  selector: 'video-caller',
  providers: [VideoCallManager, VideoCallStateManagerService],
  templateUrl: 'video-caller.component.html',
  styleUrls: ['video-caller.component.css'],
  viewProviders: [VideoCallWidgetComponent]
})
export class VideoCallerComponent {

   sessionId = "2_MX40NTcwODMzMn5-MTUxMTUxOTcyNzE0OX5Xa1JOZUpzbW5TMVI3VXhFQUJvWjBXVFB-QX4";
  //valid until 25 August
  token =  "T1==cGFydG5lcl9pZD00NTcwODMzMiZzaWc9OGNjYWE5Y2IyMGY1ZWVlYzY1YWNhY2Q1MjUzZWFmOWM1MWNhMTEyYjpzZXNzaW9uX2lkPTJfTVg0ME5UY3dPRE16TW41LU1UVXhNVFV4T1RjeU56RTBPWDVYYTFKT1pVcHpiVzVUTVZJM1ZYaEZRVUp2V2pCWFZGQi1RWDQmY3JlYXRlX3RpbWU9MTUxMTUxOTcyNSZub25jZT0wLjI4NjMwMzgyMjcwOTcwNDEmcm9sZT1tb2RlcmF0b3ImZXhwaXJlX3RpbWU9MTUxMjEyNDUyNSZjb25uZWN0aW9uX2RhdGE9bmFtZSUzREpvaG5ueSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="
   //token = "T1==cGFydG5lcl9pZD00NTcwODMzMiZzaWc9NzU0ZjJiMmVlODFhYmJkMTI2MWU4ZjY2YmZiOTEwYzE5NjU1NjY3YjpzZXNzaW9uX2lkPTJfTVg0ME5UY3dPRE16TW41LU1UVXdPVE00TnpRd01URTFOSDVpUW1ONWVreHBjVlV4ZVdWMFJUTk9Nemx2T0ZWdVNsbC1mZyZjcmVhdGVfdGltZT0xNTA5Mzg3Mzk5Jm5vbmNlPTAuODgxNjI4MDEzMjkyOTg4MSZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNTA5OTkyMTk5JmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNESm9obm55JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9"
}
