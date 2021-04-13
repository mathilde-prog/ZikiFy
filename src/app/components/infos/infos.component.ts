import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Déclaration des fonctions de Music-story API (cf. fichier MusicStoryAPI.js).
declare function MusicStoryApi(oauth_consumer_key : String, oauth_consumer_secret :String, token :String, token_secret :String , version :String) : void; 
declare function init_crypto(): void; 

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {

  constructor() { }

  //Lancement de la recherche
  ngOnInit(): void {
    this.findInfos(); 
  }

  //Fonction permettant de trouver les informations sur un artistes
  findInfos(){
    var ul = document.getElementById('bands'); //emplacement du résultat de la requête
	var key = 'dd0206bfd0fa1db57160d517a0c5770b8f05f978'; //Consumer Key de l'API
	var secret = '380aaea43ceed59e0b3517f8f70e34cda6dcd064'; //Consumer Secret de l'API

	//Récupération des valeurs recherché par l'utilisateur (nom de l'artiste et son type)
	var artiste = (<HTMLInputElement>document.getElementById("artiste")).value;
	var typeArtiste = (<HTMLInputElement>document.getElementById("typeArtiste")).value;

    init_crypto(); //Cryptage des Consumer Key et Secret
	var api = new MusicStoryApi(key, secret, null, null, null); //Lancement de l'API
	//Lancement d'une recherche dans l'API
    api.search('Artist', {name: artiste, type: typeArtiste}, function(list) {
				while (list.hasNext()) {
					list.next().getConnector('pictures', null, null, null, function(pics, _this) {
						_this.getConnector('albums', {link: 'Main'}, null, 50, function(albums) {
							var li = document.createElement('li');
							li.innerHTML = '<h2>' + _this.name + '</h2>' + ((pics.size() > 0) ? '<img height="50" src="' + pics.current().url + '"/>' : '') + '<ul>';
							while (albums.hasNext()) {
								var album = albums.next();
								li.innerHTML += '<li><a target="_blank" href="' + album.url + '">' + album.title + '</a></li>';
							}
							li.innerHTML += '<ul>';
							ul.appendChild(li);
						});
					});
				}
			},null,50);
  }
}
