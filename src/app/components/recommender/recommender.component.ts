import { Component, OnInit, AfterViewInit, OnDestroy, Pipe, PipeTransform, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { AlertService } from 'ngx-alerts';
import * as flick from 'flickity';
import { UserComponent } from '../user/user.component';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css']
})
export class RecommenderComponent extends UserComponent implements OnInit, OnDestroy {

  similar_last: any;
  similar_movie_name: string;
  similar_genre_ids: string[];
  request_group = [];
  movie_details:any;
  movie_detail_section:any;
  movie_detail_id:any;
  current_class:any;
  active_trailer:number;
  trailer_key:any;

  rev_lang_obj = {'xx': 'No Language', 'aa': 'Afar', 'af': 'Afrikaans', 'ak': 'Akan', 'an': 'Aragonese', 'as': 'Assamese', 'av': 'Avaric', 'ae': 'Avestan', 'ay': 'Aymara', 'az': 'Azerbaijani', 'ba': 'Bashkir', 'bm': 'Bambara', 'bi': 'Bislama', 'bo': 'Tibetan', 'br': 'Breton', 'ca': 'Catalan', 'cs': 'Czech', 'ce': 'Chechen', 'cu': 'Slavic', 'cv': 'Chuvash', 'kw': 'Cornish', 'co': 'Corsican', 'cr': 'Cree', 'cy': 'Welsh', 'da': 'Danish', 'de': 'German', 'dv': 'Divehi', 'dz': 'Dzongkha', 'eo': 'Esperanto', 'et': 'Estonian', 'eu': 'Basque', 'fo': 'Faroese', 'fj': 'Fijian', 'fi': 'Finnish', 'fr': 'French', 'fy': 'Frisian', 'ff': 'Fulah', 'gd': 'Gaelic', 'ga': 'Irish', 'gl': 'Gallegan', 'gv': 'Manx', 'gn': 'Guarani', 'gu': 'Gujarati', 'ht': 'Haitian; Haitian Creole', 'ha': 'Hausa', 'sh': 'Serbo-Croatian', 'hz': 'Herero', 'ho': 'Hiri Motu', 'hr': 'Croatian', 'hu': 'Hungarian', 'ig': 'Igbo', 'io': 'Ido', 'ii': 'Yi', 'iu': 'Inuktitut', 'ie': 'Interlingue', 'ia': 'Interlingua', 'id': 'Indonesian', 'ik': 'Inupiaq', 'is': 'Icelandic', 'it': 'Italian', 'jv': 'Javanese', 'ja': 'Japanese', 'kl': 'Kalaallisut', 'kn': 'Kannada', 'ks': 'Kashmiri', 'kr': 'Kanuri', 'kk': 'Kazakh', 'km': 'Khmer', 'ki': 'Kikuyu', 'rw': 'Kinyarwanda', 'ky': 'Kirghiz', 'kv': 'Komi', 'kg': 'Kongo', 'ko': 'Korean', 'kj': 'Kuanyama', 'ku': 'Kurdish', 'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian', 'li': 'Limburgish', 'ln': 'Lingala', 'lt': 'Lithuanian', 'lb': 'Letzeburgesch', 'lu': 'Luba-Katanga', 'lg': 'Ganda', 'mh': 'Marshall', 'ml': 'Malayalam', 'mr': 'Marathi', 'mg': 'Malagasy', 'mt': 'Maltese', 'mo': 'Moldavian', 'mn': 'Mongolian', 'mi': 'Maori', 'ms': 'Malay', 'my': 'Burmese', 'na': 'Nauru', 'nv': 'Navajo', 'nd': 'Ndebele', 'ng': 'Ndonga', 'ne': 'Nepali', 'nl': 'Dutch', 'nn': 'Norwegian Nynorsk', 'nb': 'Norwegian Bokmål', 'no': 'Norwegian', 'ny': 'Chichewa; Nyanja', 'oc': 'Occitan', 'oj': 'Ojibwa', 'or': 'Oriya', 'om': 'Oromo', 'os': 'Ossetian; Ossetic', 'pi': 'Pali', 'pl': 'Polish', 'pt': 'Portuguese', 'qu': 'Quechua', 'rm': 'Raeto-Romance', 'ro': 'Romanian', 'rn': 'Rundi', 'ru': 'Russian', 'sg': 'Sango', 'sa': 'Sanskrit', 'si': 'Sinhalese', 'sk': 'Slovak', 'sl': 'Slovenian', 'se': 'Northern Sami', 'sm': 'Samoan', 'sn': 'Shona', 'sd': 'Sindhi', 'so': 'Somali', 'st': 'Sotho', 'es': 'Spanish', 'sq': 'Albanian', 'sc': 'Sardinian', 'sr': 'Serbian', 'ss': 'Swati', 'su': 'Sundanese', 'sw': 'Swahili', 'sv': 'Swedish', 'ty': 'Tahitian', 'ta': 'Tamil', 'tt': 'Tatar', 'te': 'Telugu', 'tg': 'Tajik', 'tl': 'Tagalog', 'th': 'Thai', 'ti': 'Tigrinya', 'to': 'Tonga', 'tn': 'Tswana', 'ts': 'Tsonga', 'tk': 'Turkmen', 'tr': 'Turkish', 'tw': 'Twi', 'ug': 'Uighur', 'uk': 'Ukrainian', 'ur': 'Urdu', 'uz': 'Uzbek', 've': 'Venda', 'vi': 'Vietnamese', 'vo': 'Volapük', 'wa': 'Walloon', 'wo': 'Wolof', 'xh': 'Xhosa', 'yi': 'Yiddish', 'za': 'Zhuang', 'zu': 'Zulu', 'ab': 'Abkhazian', 'zh': 'Mandarin', 'ps': 'Pushto', 'am': 'Amharic', 'ar': 'Arabic', 'bg': 'Bulgarian', 'cn': 'Cantonese', 'mk': 'Macedonian', 'el': 'Greek', 'fa': 'Persian', 'he': 'Hebrew', 'hi': 'Hindi', 'hy': 'Armenian', 'en': 'English', 'ee': 'Ewe', 'ka': 'Georgian', 'pa': 'Punjabi', 'bn': 'Bengali', 'bs': 'Bosnian', 'ch': 'Chamorro', 'be': 'Belarusian'};

  gen: GenreTy = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10765: "Sci-Fi & Fantasy",
    10768: "War & Politics",
    10767: "Talk",
    10766: "Soap",
    10764: "Reality",
    10763: "News",
    10762: "Kids",
    10759: "Action & Adventure"
  };

  sections_data = [{
    "text": "Now Showing",
    "class": "shownow-flick"
  },
  {
    "text": "Trending Now",
    "class": "trend-flick",
  },
  {
    "text": "",
    "class": "similar-flick",
  },
  {
    "text": "Genre Based Recommendations",
    "class": "recommend-flick",
  },
  {
    "text": "Based on your current interests",
    "class": "popular-flick",
  },
  {
    "text": "Upcoming Movies",
    "class": "upcom-flick",
  }
  ];

  recom_section_primary = ['.shownow-flick', '.trend-flick', '.similar-flick', '.recommend-flick', '.popular-flick', '.upcom-flick'];
  section_group = ['now_playing', 'trending_now', 'similar', 'recom', 'popular', 'upcoming'];

  constructor(private http_viewinfos: HttpClient, private http_views: HttpClient, private http_discover: HttpClient, private http_discover_sendAdditionalData: HttpClient, private http_discover_sendTrackingData: HttpClient, private http_discover_getData: HttpClient,public alert: AlertService) {
    super(http_discover, http_discover_sendAdditionalData, http_discover_sendTrackingData, http_discover_getData);
  }

  ngOnDestroy() {
    if (this.request_group != undefined) {
      for (let i of this.request_group) {
        i.unsubscribe();
      }
    }
  }

  ngOnInit() {
    if(!localStorage.getItem("Email"))
    {
      this.alert.warning("Please log-in for personalized recommendations!");
    }
    localStorage.removeItem("REACTION_DATA");
    localStorage.removeItem("BOOKMARKED_DATA");
    localStorage.removeItem("CLICKED_DATA");
    let latest_likes = localStorage.getItem("LATEST_LIKE");
    if (latest_likes != undefined || latest_likes != null) {
      let latest_like = latest_likes.split("|");
      this.similar_last = latest_like[0];
      this.similar_movie_name = latest_like[1];
      this.similar_genre_ids = latest_like[2].split(',');
    }
    console.log();
    this.getData();
  }
  getData() {
    let region = 'IN';
    let lang;
    if (localStorage.getItem("DEFAULT_LANG")) {
      lang = localStorage.getItem("DEFAULT_LANG");
    }
    else {
      lang = 'en-US';
    }
    //clustering using api
    let similar_api;
    let popular_api;
    let recom_api;
    let upcoming_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/movie/upcoming?api_key=bd5e7f8161070f86bff1d8da34219f57&language=' + lang + '&page=1');
    let nowplaying_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/movie/now_playing?api_key=bd5e7f8161070f86bff1d8da34219f57&language=' + lang + '&page=1');

    if (this.similar_last != undefined) {
      similar_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/movie/' + this.similar_last + '/similar?api_key=bd5e7f8161070f86bff1d8da34219f57&page=1');
      popular_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/discover/movie?api_key=bd5e7f8161070f86bff1d8da34219f57&language=' + lang + '&sort_by=popularity.desc&include_video=false&page=1&vote_average.gte=5&with_genres=' + this.similar_genre_ids[0]);
      recom_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/movie/' + this.similar_last + '/recommendations?api_key=bd5e7f8161070f86bff1d8da34219f57&&language=' + lang + 'page=1');
    }
    else {
      this.similar_movie_name = 'Interstellar'
      similar_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/movie/157336/similar?api_key=bd5e7f8161070f86bff1d8da34219f57&language=' + lang + '&page=1');
      popular_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/discover/movie?api_key=bd5e7f8161070f86bff1d8da34219f57&language=' + lang + '&sort_by=popularity.desc&include_video=false&page=1&vote_average.gte=5&with_genres=12,18');
      recom_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/movie/157336/recommendations?api_key=bd5e7f8161070f86bff1d8da34219f57&language=' + lang + '&page=1');
    }
    let trending_api = this.http_views.get<UserResponse>('https://api.themoviedb.org/3/movie/popular?api_key=bd5e7f8161070f86bff1d8da34219f57&region=' + region + '&language=' + lang + '&page=1');
    let api_list = [nowplaying_api, trending_api, similar_api, recom_api, popular_api, upcoming_api];
    try {
      for (let i = 0; i <= api_list.length - 3; i += 3) {
        let temp;
        temp = forkJoin(api_list.slice(i, i + 3)).subscribe(data => {
          this.sections_data[i]["data"] = data[0];
          this.sections_data[i + 1]["data"] = data[1];
          this.sections_data[i + 2]["data"] = data[2];
          if(this.sections_data[i + 2].text == '')
          {
          this.sections_data[i + 2].text = 'Movies Similar to ' + this.similar_movie_name;
          }
          window.setTimeout(() => { this.create_obj(this.recom_section_primary.slice(i, i + 3)); });
        });
        this.request_group.push(temp);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  create_obj(section_groups) {
    try {
      /**
       * Flickity Bind Elements
       */
      for (let section of section_groups) {
        let elem = document.querySelector(section);
        new flick(elem, {
          wrapAround: true,
          groupCells: true,
          cellAlign: 'left',
          autoPlay: 3000
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  showInfo(movie_id, element_id) {
    if(this.movie_detail_id == movie_id){
      if(document.getElementById(this.movie_detail_section).style.display == 'none')
      {
        document.getElementById(this.movie_detail_section).style.display = 'block'
      }
      else{
        document.getElementById(this.movie_detail_section).style.display = 'none'
      }
      return;
    }
    if(this.movie_detail_section != undefined){
      document.getElementById(this.movie_detail_section).style.display = 'none';
    }
    let url = 'https://api.themoviedb.org/3/movie/' + movie_id + '?api_key=bd5e7f8161070f86bff1d8da34219f57&language=en-US&append_to_response=videos,credits';
    this.http_viewinfos.get<MovieDetails>(url).subscribe(data => {
      this.movie_details = data;
      console.log(this.movie_details);
      this.trailer_key = 'https://www.youtube.com/embed/'+ data.videos.results[0].key;
      document.getElementById(element_id).style.display = 'block';  
      
    });
    this.movie_detail_section = element_id;
    this.movie_detail_id = movie_id;
  }

  toggleTrailer(event){
    let id = event.target.id;
    this.active_trailer = parseInt(id);
  }
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  genres: number[];
  budget: number[];
  homepage: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
  vote_count: number;
  credits:Credits;
  videos:VideoResults;
}

interface VideoResults {
  results:VideoKeys[];
}

interface VideoKeys {
  key:string;
}

interface Credits {
  cast: Cast[]
}

interface Cast {
  cast_id:number;
  character:string;
  name:string;

}

interface UserResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Results[];
  ok: number;
}

interface Results {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  id: number;
  vote_average: number;
  vote_count: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
}
interface GenreTy {
  [key: number]: string;
}
