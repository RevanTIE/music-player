import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { response } from 'express';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  private readonly URL = environment.api_root;
  callback: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined) //Es el objeto que contendrá la canción
  public audio!: HTMLAudioElement //TODO<audio> Es el reproductor
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)
  
  constructor() { 
    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk =>{
      if(responseOk){
        this.setAudio(responseOk)
      }
    })
    this.listenAllEvents();
  }

  private listenAllEvents(): void{ //TODO: escuchará los eventos que pasen por audio
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
  }
  private setPlayerStatus = (state: any)=>{
    switch(state.type){ //Contiene el estado del objeto de la canción
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('paused')
        break;
    }
  }
  public TogglePlayer():void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }
  private calculateTime = ()=>{
      const{duration, currentTime, } =this.audio
      // console.table([duration, currentTime])
      this.setTimeElapsed(currentTime)
      this.setTimeRemaining(currentTime, duration)
      this.setPercentage(currentTime, duration)
  }
  private setPercentage(currentTime: number, duration: number): void{
      //TODO: duration -> 100%
      //TODO: currentTime -> (x)
      //TODO: (currentTime * 100) / duration
      let percentage = (currentTime * 100) / duration;
      this.playerPercentage$.next(percentage)
  }

  private setTimeElapsed(currentTime: number): void {
    //TODO: 5.1, 8.2
    let seconds = Math.floor(currentTime % 60); //TODO, numero entero
    let minutes = Math.floor((currentTime / 60) % 60);

      //TODO: 00:00
    const displaySeconds = (seconds < 10) ? `0${seconds}`: `${seconds}`;
    const displayMinutes = (minutes < 10) ? `0${minutes}`: `${minutes}`;

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime

    //TODO: 5.1, 8.2
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);

      //TODO: -00:00
    const displaySeconds = (seconds < 10) ? `0${seconds}`: `${seconds}`;
    const displayMinutes = (minutes < 10) ? `0${minutes}`: `${minutes}`;

    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  //TODO: FUnciones publicas
  public setAudio(track:TrackModel):void{
    console.log('🍕🍕🍕', track);
    this.audio.src = this.URL + track.url.split("/").pop();
    console.log(this.audio.src)
    this.audio.play()
  }
  public seekAudio(percentage: number):void
{
  //TODO: Dando click a un % de la barra
  const { duration} = this.audio
  // console.log(`Duration: ${duration}`, `Percentage: ${percentage}`)
  const percentageToSecond = (percentage * duration) / 100
  // console.log(percentageToSecond)
  this.audio.currentTime = percentageToSecond

}}
