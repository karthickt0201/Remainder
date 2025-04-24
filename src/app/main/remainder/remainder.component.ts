import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-remainder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './remainder.component.html',
  styleUrl: './remainder.component.scss'
})
export class RemainderComponent implements OnInit, OnDestroy {

  currentTime = new BehaviorSubject<Date>(new Date());
  private timerSubscription!: Subscription;
  remainderName = new FormControl('', [Validators.required]);
  remainderTime = new FormControl('', [Validators.required]);
  remainderList: any = [];
  fastMode: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        this.timer();
    }
  }

  timer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      const newTime = new Date(this.currentTime.value.getTime() + (this.fastMode ? 60000 : 1000));
      this.currentTime.next(newTime);
      this.checkRemainders();
    });
  }
  
  deleteRow(index:any){
    this.remainderList.splice(index,1);
  }

  startFastMode(){
    this.fastMode = !this.fastMode;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timer();
  }

  calculateTimeInMinutes(time: any): number {
    const [hours, minutes] = time.split(':');
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  }

  checkRemainders() {
    const currentHours = this.currentTime.value.getHours();
    const currentMinutes = this.currentTime.value.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    this.remainderList.forEach((res:any) => {
      if (!res.isStriked && currentTimeInMinutes >= res.timeInMinutes) {
        res.isStriked = true;
      }
    });
  }

  addRemainder() {
    if (this.remainderName.valid && this.remainderTime.valid) {
      this.remainderList.push(
        { name: this.remainderName.value, 
          time: this.transformoTo12Hr(this.remainderTime.value) ,
          timeInMinutes:this.calculateTimeInMinutes(this.remainderTime.value)
        });
      this.remainderName.reset();
      this.remainderTime.reset();
    } else {
      alert("Please fill both name and time fields.");
    }
  }

  transformoTo12Hr(value: any) {
    const [hours, minutes] = value.split(':');
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? 'PM' : 'AM';
    const displayHours = parsedHours % 12 || 12;

    return `${displayHours}:${minutes} ${period}`;
  }

  reset(){
    this.fastMode=false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.currentTime.next(new Date());
    this.remainderList = [];
    this.timer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}