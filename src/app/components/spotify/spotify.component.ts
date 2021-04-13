import { NONE_TYPE } from '@angular/compiler';
import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccueilComponent } from '../accueil/accueil.component';
import * as $ from "jquery";
import SpotifyWebApi from 'spotify-web-api-js';

declare var require: any;
/* Accès à l'api Spotify JS */
const Spotify = require('spotify-web-api-js');
const s = new Spotify();
let spotify = new SpotifyWebApi();

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {
  /* On récupère le token de connexion ainsi que la variable de connexion pour savoir si l'on affiche Youtube ou Spotify */
  @Input() token: string;
  @Input() isConnected: boolean;
  constructor() { }

  ngOnInit(): void {
    console.log("SPOTIFY-COMPONENT Token = " + this.token);
    spotify.setAccessToken(this.token);
    spotify.getMe().then(function(data) {
      /* On affiche le pseudo du compte Spotify connecté */
      document.getElementById("nom_user").innerHTML="Bienvenue sur Spotify : " + data.display_name;
    })
    .catch(function(err) {
      console.log('Something went wrong:', err.message);
    });
  }
  /**
   * Permet de chercher un nombre de "max_songs" correspondant à la recherche de
   * l'utilisateur et de lui permettre de jouer ces sons
   */
  chercherSons(): void{
    let raw_search_query = $('#son').val();
    raw_search_query = raw_search_query.toString();
    let search_query = encodeURI(raw_search_query);
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
      type: 'GET',
      headers: {
          'Authorization' : 'Bearer ' + this.token
      },
      success: function(data) {
        let num_of_tracks = data.tracks.items.length;
        let count = 0;
        const max_songs = 8;
        while(count < max_songs && count < num_of_tracks){
          let id = data.tracks.items[count].id;

          /* AJOUT */ 
          spotify.getTrack(id).then(
            function (data) {
              console.log(data);
            },
            function (err) {
              console.error(err);
            }
          );
            
          let src_str = `https://open.spotify.com/embed/track/${id}`;
          let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
          let parent_div = $('#song_'+ count);
          parent_div.html(iframe);
          count++;
        }
      }
    });
  }

  // Recherche du clip vidéo sur Youtube (API youtube) - Attention au quota : 10.000 unités par jour 
  clipYouTube(): void{
    /* Récupération de l'artiste et du titre */
    var artiste = (<HTMLInputElement>document.getElementById("artiste")).value;
    var titre =  (<HTMLInputElement>document.getElementById("titre")).value;
    var API_KEY = "AIzaSyAEYuH3N5p_Xfv6LnV3xjWhN9096AjsZA4";
    var video = "";
    var requete = titre + " " + artiste; 
    console.log("recherche vidéo pour " + requete); 
    /* Exécution de la requête auprès de youtube afin de récupérer un media contenant le clip vidéo demandé */
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&type=video&part=snippet&maxResults=" + 1 + "&q=" + requete, function(data){
        data.items.forEach(item => {
          video = `<iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`; 
          document.getElementById("videos").innerHTML = video
        }); 
      }); 
  }

}
