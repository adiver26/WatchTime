import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent extends UserComponent implements OnInit, OnDestroy {
  sub: any;
  movie_id: any;
  movie_details: any;
  active_trailer: any;
  trailer_key: any;

  rev_lang_obj = { 'xx': 'No Language', 'aa': 'Afar', 'af': 'Afrikaans', 'ak': 'Akan', 'an': 'Aragonese', 'as': 'Assamese', 'av': 'Avaric', 'ae': 'Avestan', 'ay': 'Aymara', 'az': 'Azerbaijani', 'ba': 'Bashkir', 'bm': 'Bambara', 'bi': 'Bislama', 'bo': 'Tibetan', 'br': 'Breton', 'ca': 'Catalan', 'cs': 'Czech', 'ce': 'Chechen', 'cu': 'Slavic', 'cv': 'Chuvash', 'kw': 'Cornish', 'co': 'Corsican', 'cr': 'Cree', 'cy': 'Welsh', 'da': 'Danish', 'de': 'German', 'dv': 'Divehi', 'dz': 'Dzongkha', 'eo': 'Esperanto', 'et': 'Estonian', 'eu': 'Basque', 'fo': 'Faroese', 'fj': 'Fijian', 'fi': 'Finnish', 'fr': 'French', 'fy': 'Frisian', 'ff': 'Fulah', 'gd': 'Gaelic', 'ga': 'Irish', 'gl': 'Gallegan', 'gv': 'Manx', 'gn': 'Guarani', 'gu': 'Gujarati', 'ht': 'Haitian; Haitian Creole', 'ha': 'Hausa', 'sh': 'Serbo-Croatian', 'hz': 'Herero', 'ho': 'Hiri Motu', 'hr': 'Croatian', 'hu': 'Hungarian', 'ig': 'Igbo', 'io': 'Ido', 'ii': 'Yi', 'iu': 'Inuktitut', 'ie': 'Interlingue', 'ia': 'Interlingua', 'id': 'Indonesian', 'ik': 'Inupiaq', 'is': 'Icelandic', 'it': 'Italian', 'jv': 'Javanese', 'ja': 'Japanese', 'kl': 'Kalaallisut', 'kn': 'Kannada', 'ks': 'Kashmiri', 'kr': 'Kanuri', 'kk': 'Kazakh', 'km': 'Khmer', 'ki': 'Kikuyu', 'rw': 'Kinyarwanda', 'ky': 'Kirghiz', 'kv': 'Komi', 'kg': 'Kongo', 'ko': 'Korean', 'kj': 'Kuanyama', 'ku': 'Kurdish', 'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian', 'li': 'Limburgish', 'ln': 'Lingala', 'lt': 'Lithuanian', 'lb': 'Letzeburgesch', 'lu': 'Luba-Katanga', 'lg': 'Ganda', 'mh': 'Marshall', 'ml': 'Malayalam', 'mr': 'Marathi', 'mg': 'Malagasy', 'mt': 'Maltese', 'mo': 'Moldavian', 'mn': 'Mongolian', 'mi': 'Maori', 'ms': 'Malay', 'my': 'Burmese', 'na': 'Nauru', 'nv': 'Navajo', 'nd': 'Ndebele', 'ng': 'Ndonga', 'ne': 'Nepali', 'nl': 'Dutch', 'nn': 'Norwegian Nynorsk', 'nb': 'Norwegian Bokmål', 'no': 'Norwegian', 'ny': 'Chichewa; Nyanja', 'oc': 'Occitan', 'oj': 'Ojibwa', 'or': 'Oriya', 'om': 'Oromo', 'os': 'Ossetian; Ossetic', 'pi': 'Pali', 'pl': 'Polish', 'pt': 'Portuguese', 'qu': 'Quechua', 'rm': 'Raeto-Romance', 'ro': 'Romanian', 'rn': 'Rundi', 'ru': 'Russian', 'sg': 'Sango', 'sa': 'Sanskrit', 'si': 'Sinhalese', 'sk': 'Slovak', 'sl': 'Slovenian', 'se': 'Northern Sami', 'sm': 'Samoan', 'sn': 'Shona', 'sd': 'Sindhi', 'so': 'Somali', 'st': 'Sotho', 'es': 'Spanish', 'sq': 'Albanian', 'sc': 'Sardinian', 'sr': 'Serbian', 'ss': 'Swati', 'su': 'Sundanese', 'sw': 'Swahili', 'sv': 'Swedish', 'ty': 'Tahitian', 'ta': 'Tamil', 'tt': 'Tatar', 'te': 'Telugu', 'tg': 'Tajik', 'tl': 'Tagalog', 'th': 'Thai', 'ti': 'Tigrinya', 'to': 'Tonga', 'tn': 'Tswana', 'ts': 'Tsonga', 'tk': 'Turkmen', 'tr': 'Turkish', 'tw': 'Twi', 'ug': 'Uighur', 'uk': 'Ukrainian', 'ur': 'Urdu', 'uz': 'Uzbek', 've': 'Venda', 'vi': 'Vietnamese', 'vo': 'Volapük', 'wa': 'Walloon', 'wo': 'Wolof', 'xh': 'Xhosa', 'yi': 'Yiddish', 'za': 'Zhuang', 'zu': 'Zulu', 'ab': 'Abkhazian', 'zh': 'Mandarin', 'ps': 'Pushto', 'am': 'Amharic', 'ar': 'Arabic', 'bg': 'Bulgarian', 'cn': 'Cantonese', 'mk': 'Macedonian', 'el': 'Greek', 'fa': 'Persian', 'he': 'Hebrew', 'hi': 'Hindi', 'hy': 'Armenian', 'en': 'English', 'ee': 'Ewe', 'ka': 'Georgian', 'pa': 'Punjabi', 'bn': 'Bengali', 'bs': 'Bosnian', 'ch': 'Chamorro', 'be': 'Belarusian' };

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
  url:string = ''

  constructor(private active_route: ActivatedRoute, private http_movie_detail: HttpClient, private router: Router, private http_movie_detail_getData: HttpClient, private http_movie_detail_sendTrackingData: HttpClient, private http_movie_detail_sendAdditionalData: HttpClient) { 
    super(http_movie_detail, http_movie_detail_sendAdditionalData, http_movie_detail_sendTrackingData, http_movie_detail_getData);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    document.getElementById("body").style.backgroundImage = null;
    document.getElementById("body").style.backgroundColor = '#1A1717';
  }
  ngOnInit() {
    localStorage.removeItem("REACTION_DATA");
    localStorage.removeItem("BOOKMARKED_DATA");
    localStorage.removeItem("CLICKED_DATA");
    document.getElementById("jumbo").style.backgroundColor = 'rgba(0,0,0,0.0)';
    this.sub = this.active_route.params.subscribe(params => {
      this.movie_id = +params['id']; // + converts String to int
    },
  err => {
    this.router.navigateByUrl('/'+err.statusText);
  });


    if (this.router.url.toString().includes('movie')){
    this.url = 'https://api.themoviedb.org/3/movie/' + this.movie_id + '?api_key=bd5e7f8161070f86bff1d8da34219f57&language=en-US&append_to_response=videos,credits';
    }
    else{
    this.url = 'https://api.themoviedb.org/3/tv/' + this.movie_id + '?api_key=bd5e7f8161070f86bff1d8da34219f57&language=en-US&append_to_response=videos,credits';
    }
    this.http_movie_detail.get<MovieDetails>(this.url).subscribe(data => {
      this.movie_details = data;
      if(data.videos.results[0])
      {
      this.trailer_key = 'https://www.youtube.com/embed/' + data.videos.results[0].key;
      }
      console.log(this.movie_details);
      let bg_url:string = 'https://image.tmdb.org/t/p/w1280/'+this.movie_details.backdrop_path;
      document.getElementById("body").style.backgroundImage = "linear-gradient(to right, #000 0%, transparent 0%), url("+bg_url+")";
      document.getElementById("body").style.backgroundSize = 'cover';
    },
      err => {
        this.router.navigateByUrl('/'+err.statusText);
      });
  }

  toggleTrailer(event) {
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
  credits: Credits;
  videos: VideoResults;
}

interface VideoResults {
  results: VideoKeys[];
}

interface VideoKeys {
  key: string;
}

interface Credits {
  cast: Cast[]
}

interface Cast {
  cast_id: number;
  character: string;
  name: string;

}

interface GenreTy {
  [key: number]: string;
}
