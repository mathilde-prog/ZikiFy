import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //Déclaration des variables
  activeAccueil:boolean 
  activeSpotify:boolean 
  activeLyrics:boolean 
  activeInfos:boolean 
  activeConcert:boolean
  activeContact:boolean 
  activeAPropos:boolean 
  isConnected:boolean 

  //Envoie d'une information
  @Output() changementAccueil = new EventEmitter();

  constructor() { }

  //Initialisation des variables
  ngOnInit(): void {
    this.activeAccueil = true;
    this.isConnected = false; 
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
  }

  //Fonction permettant de mettre en évidence la session active au niveau du menu
  changementMenu(dir : string): void{
    switch (dir) {
      case "accueil":
        this.activerAccueil_Event();
        break;
      case "infos":
        this.activerInfos_Event();
        break;
      case "spotify":
        this.activerSpotify_Event();
        break;
      case "lyrics":
        this.activerLyrics_Event();
        break;
      case "concert":
        this.activerConcert_Event();
        break;
      case "contact": 
        this.activerContact_Event(); 
        break; 
      case "connected": 
        this.activerConnected_Event(); 
        break; 
      default:
        break;
    }
  }

  //Lance l'affichage de la section Accueil
  activerAccueil() : void{
    this.activeAccueil = true;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
    this.changementAccueil.emit("accueil");
  }

  //Activation de la section Accueil dans le menu
  activerAccueil_Event() : void{
    this.activeAccueil = true;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
  }

  //Lance l'affichage de la section Spotify-YouTube
  activerSpotify() : void{
    this.activeAccueil = false;
    this.activeSpotify = true; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
    this.changementAccueil.emit("spotify");
  }

  //Activation de la section Spotyfy-YouTube dans le menu
  activerSpotify_Event() : void{
    this.activeAccueil = false;
    this.activeSpotify = true; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
  }

  //Lance l'affichage de la section Lyrics
  activerLyrics() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = true;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
    this.changementAccueil.emit("lyrics");
  }

  //Activation de la section Lyrics dans le menu
  activerLyrics_Event() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = true;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
  }

  //Lance l'affichage de la section Infos
  activerInfos() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = true; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
    this.changementAccueil.emit("infos");
  }

  //Activation de la section Infos dans le menu
  activerInfos_Event() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = true; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = false; 
  }

  //Lance l'affichage de la section Concert
  activerConcert() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = true; 
    this.activeContact = false; 
    this.activeAPropos = false; 
    this.changementAccueil.emit("concert");
  }

  //Activation de la section Concert dans le menu
  activerConcert_Event() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = true; 
    this.activeContact = false; 
    this.activeAPropos = false; 
  }

  //Lance l'affichage de la section Contact
  activerContact() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = true; 
    this.activeAPropos = false; 
    this.changementAccueil.emit("contact");
  }

  //Activation de la section Contact dans le menu
  activerContact_Event() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = true; 
    this.activeAPropos = false; 
  }

  //Lance l'affichage de la section A propos
  activerAPropos() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = true; 
    this.changementAccueil.emit("apropos");
  }

  //Activation de la section A propos dans le menu
  activerAPropos_Event() : void {
    this.activeAccueil = false;
    this.activeSpotify = false; 
    this.activeLyrics = false;
    this.activeInfos = false; 
    this.activeConcert = false; 
    this.activeContact = false; 
    this.activeAPropos = true; 
  }


  // Affiche Spotify à la place de Youtube dans le menu 
  activerConnected_Event() : void {
    this.isConnected = true; 
  }
}
