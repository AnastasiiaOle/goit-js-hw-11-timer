const refs = {
    dateId: document.querySelector('span[data-value="days"]'),
    hoursId: document.querySelector('span[data-value="hours"]'),
    minsId: document.querySelector('span[data-value="mins"]'),
    secsId: document.querySelector('span[data-value="secs"]'), 
  }


class CountdownTimer {
 constructor ({onTick, targetDate}) {
     this.intervalId = null;
     this.targetDate = targetDate.getTime();
     
     this.onTick = onTick;
     this.init();
 }

 init(){
     const time = this.getTimeComponents(0);
     this.onTick(time);
 }

 getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs};
}
 
 pad(value){
    return String(value).padStart(2, '0');
}

setCountdown(){
    this.intervalId = setInterval(() => {
        const currentTime = Date.now();
    
        if (currentTime >= this.targetTime) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            return null;
          }

        const deltaTime = this.targetTime - currentTime;
        const timeCon = this.getTimeComponents(deltaTime);
        this.onTick(timeCon);
    }, 1000); 

} 
}

function updateClockface({ days, hours, mins, secs }) {
    refs.dateId.textContent = days;
    refs.hoursId.textContent = hours;
    refs.minsId.textContent = mins; 
    refs.secsId.textContent = secs;
}


const timer = new CountdownTimer({
    onTick: updateClockface,
    targetDate: new Date('Jul 30, 2021'),
      });

  timer.setCountdown();

