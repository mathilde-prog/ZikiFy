import * as $ from "jquery";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  // Recherche les paroles de la chanson (API lyrics.ovh)
  findLyrics():void {

    // Récupère la valeur saisie par l'utilisateur dans le champ "artiste" 
    var artiste = (<HTMLInputElement>document.getElementById("artiste")).value;

    // Récupère la valeur saisie par l'utilisateur dans le champ "titre"
    var titre =  (<HTMLInputElement>document.getElementById("titre")).value;

    console.log("Recherche des paroles de la chanson : " + artiste + " - " + titre)

    // Récupère les paroles de la chanson et les affiche 
    $.get("https://api.lyrics.ovh/v1/"+artiste+"/"+titre,
      function(data){
        console.log(data)
        // Actualisation du titre de la carte paroles pour afficher l'artiste et le titre de la chanson 
        document.getElementById("titreCarteParoles").innerHTML="Paroles<br> "+ artiste.charAt(0).toUpperCase()  + artiste.slice(1) + " - " + titre.charAt(0).toUpperCase() + titre.slice(1)
        // Actualisation du bloc paroles pour afficher les paroles de la chanson 
        document.getElementById("paroles").innerHTML=data.lyrics.replace(new RegExp("\n\n","g"),"<br>").replace(new RegExp("\n","g"),"<br>")
      }
    ) 
  }
 
  // Recherche de suggestions à partir d'un titre et/ou un artiste (API lyrics.ovh)
  findSuggestions():void {
    // Récupère la demande de l'utilisateur 
    var recherche = (<HTMLInputElement>document.getElementById("rechercheSuggestionInput")).value;
    var zoneSuggestions = $('#suggestions');
    
    if (!recherche) {
      return;
    }
    
    console.log("Cherche des suggestions pour la recherche : ", recherche);

    // Recherche des suggestions à partir de la recherche 
    $.getJSON('https://api.lyrics.ovh/' + '/suggest/' + recherche, function (data) {
      var finalResults = [];
      var seenResults = [];
      // On vide l'affichage des suggestions. 
      document.getElementById("suggestions").innerHTML=""; 

      data.data.forEach(function(resultat) {
        // On récupère 5 suggestions max. 
        if (seenResults.length >= 5) {
          return;
        }
        // La suggestion est composée du nom de l'artiste et d'un titre. 
        var suggestion = resultat.artist.name +' - ' + resultat.title; 
        // Pour éviter les doublons de suggestions  
        if (seenResults.indexOf(suggestion) >= 0) {
          return;
        }

        // On ajoute la suggestion à la liste
        seenResults.push(suggestion);
        finalResults.push({
          display: suggestion,
          artist: resultat.artist.name,
          title: resultat.title
        });
      });

      // On parcourt les suggestions retenues et on les ajoute à l'affichage. 
      finalResults.forEach(function (resultat, i) {
        console.log(resultat.title)
        console.log(resultat.artist)
        
        // Ajout de la suggestion à l'affichage 
        var s = $('<p class="suggestion'+i+'"> <a class="badge badge-info" href="#" >' + resultat.display + '</a></p>')
        zoneSuggestions.append(s);

        // Si on clique sur la première suggestion, cela remplit automatiquement les champs "artiste" et "titre" de la partie "Chercher les paroles"
        $("#suggestions").on("click",".suggestion0", function(event){
          (<HTMLInputElement>document.getElementById("titre")).value = finalResults[0].title;
          (<HTMLInputElement>document.getElementById("artiste")).value = finalResults[0].artist;
        });

        // Si on clique sur la deuxième suggestion, cela remplit automatiquement les champs "artiste" et "titre" de la partie "Chercher les paroles"
        $("#suggestions").on("click",".suggestion1", function(event){
          (<HTMLInputElement>document.getElementById("titre")).value = finalResults[1].title;
          (<HTMLInputElement>document.getElementById("artiste")).value = finalResults[1].artist;
        });

        // Si on clique sur la troisième suggestion, cela remplit automatiquement les champs "artiste" et "titre" de la partie "Chercher les paroles"
        $("#suggestions").on("click",".suggestion2", function(event){
          (<HTMLInputElement>document.getElementById("titre")).value = finalResults[2].title;
          (<HTMLInputElement>document.getElementById("artiste")).value = finalResults[2].artist;
        });

        // Si on clique sur la quatrième suggestion, cela remplit automatiquement les champs "artiste" et "titre" de la partie "Chercher les paroles"
        $("#suggestions").on("click",".suggestion3", function(event){
          (<HTMLInputElement>document.getElementById("titre")).value = finalResults[3].title;
          (<HTMLInputElement>document.getElementById("artiste")).value = finalResults[3].artist;
        });

        // Si on clique sur la cinquième suggestion, cela remplit automatiquement les champs "artiste" et "titre" de la partie "Chercher les paroles"
        $("#suggestions").on("click",".suggestion4", function(event){
          (<HTMLInputElement>document.getElementById("titre")).value = finalResults[4].title;
          (<HTMLInputElement>document.getElementById("artiste")).value = finalResults[4].artist;
        });
      });
    });
  } 
}


