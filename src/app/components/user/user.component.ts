import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Global Vars
  texts: string;
  tmdb: string;
  data: any;
  blank: object;
  movieid: number;
  movie_selected = true;

  user_details: any;
  local_send_tracking_data: any;
  like_status_data = {};
  bookmarked_data = {};
  clicked_data = {};
  page_number: number;
  local_send_bookmark_data: any;
  local_send_clicks_data: any;

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

  rev_lang_obj = { 'xx': 'No Language', 'aa': 'Afar', 'af': 'Afrikaans', 'ak': 'Akan', 'an': 'Aragonese', 'as': 'Assamese', 'av': 'Avaric', 'ae': 'Avestan', 'ay': 'Aymara', 'az': 'Azerbaijani', 'ba': 'Bashkir', 'bm': 'Bambara', 'bi': 'Bislama', 'bo': 'Tibetan', 'br': 'Breton', 'ca': 'Catalan', 'cs': 'Czech', 'ce': 'Chechen', 'cu': 'Slavic', 'cv': 'Chuvash', 'kw': 'Cornish', 'co': 'Corsican', 'cr': 'Cree', 'cy': 'Welsh', 'da': 'Danish', 'de': 'German', 'dv': 'Divehi', 'dz': 'Dzongkha', 'eo': 'Esperanto', 'et': 'Estonian', 'eu': 'Basque', 'fo': 'Faroese', 'fj': 'Fijian', 'fi': 'Finnish', 'fr': 'French', 'fy': 'Frisian', 'ff': 'Fulah', 'gd': 'Gaelic', 'ga': 'Irish', 'gl': 'Gallegan', 'gv': 'Manx', 'gn': 'Guarani', 'gu': 'Gujarati', 'ht': 'Haitian; Haitian Creole', 'ha': 'Hausa', 'sh': 'Serbo-Croatian', 'hz': 'Herero', 'ho': 'Hiri Motu', 'hr': 'Croatian', 'hu': 'Hungarian', 'ig': 'Igbo', 'io': 'Ido', 'ii': 'Yi', 'iu': 'Inuktitut', 'ie': 'Interlingue', 'ia': 'Interlingua', 'id': 'Indonesian', 'ik': 'Inupiaq', 'is': 'Icelandic', 'it': 'Italian', 'jv': 'Javanese', 'ja': 'Japanese', 'kl': 'Kalaallisut', 'kn': 'Kannada', 'ks': 'Kashmiri', 'kr': 'Kanuri', 'kk': 'Kazakh', 'km': 'Khmer', 'ki': 'Kikuyu', 'rw': 'Kinyarwanda', 'ky': 'Kirghiz', 'kv': 'Komi', 'kg': 'Kongo', 'ko': 'Korean', 'kj': 'Kuanyama', 'ku': 'Kurdish', 'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian', 'li': 'Limburgish', 'ln': 'Lingala', 'lt': 'Lithuanian', 'lb': 'Letzeburgesch', 'lu': 'Luba-Katanga', 'lg': 'Ganda', 'mh': 'Marshall', 'ml': 'Malayalam', 'mr': 'Marathi', 'mg': 'Malagasy', 'mt': 'Maltese', 'mo': 'Moldavian', 'mn': 'Mongolian', 'mi': 'Maori', 'ms': 'Malay', 'my': 'Burmese', 'na': 'Nauru', 'nv': 'Navajo', 'nd': 'Ndebele', 'ng': 'Ndonga', 'ne': 'Nepali', 'nl': 'Dutch', 'nn': 'Norwegian Nynorsk', 'nb': 'Norwegian Bokmål', 'no': 'Norwegian', 'ny': 'Chichewa; Nyanja', 'oc': 'Occitan', 'oj': 'Ojibwa', 'or': 'Oriya', 'om': 'Oromo', 'os': 'Ossetian; Ossetic', 'pi': 'Pali', 'pl': 'Polish', 'pt': 'Portuguese', 'qu': 'Quechua', 'rm': 'Raeto-Romance', 'ro': 'Romanian', 'rn': 'Rundi', 'ru': 'Russian', 'sg': 'Sango', 'sa': 'Sanskrit', 'si': 'Sinhalese', 'sk': 'Slovak', 'sl': 'Slovenian', 'se': 'Northern Sami', 'sm': 'Samoan', 'sn': 'Shona', 'sd': 'Sindhi', 'so': 'Somali', 'st': 'Sotho', 'es': 'Spanish', 'sq': 'Albanian', 'sc': 'Sardinian', 'sr': 'Serbian', 'ss': 'Swati', 'su': 'Sundanese', 'sw': 'Swahili', 'sv': 'Swedish', 'ty': 'Tahitian', 'ta': 'Tamil', 'tt': 'Tatar', 'te': 'Telugu', 'tg': 'Tajik', 'tl': 'Tagalog', 'th': 'Thai', 'ti': 'Tigrinya', 'to': 'Tonga', 'tn': 'Tswana', 'ts': 'Tsonga', 'tk': 'Turkmen', 'tr': 'Turkish', 'tw': 'Twi', 'ug': 'Uighur', 'uk': 'Ukrainian', 'ur': 'Urdu', 'uz': 'Uzbek', 've': 'Venda', 'vi': 'Vietnamese', 'vo': 'Volapük', 'wa': 'Walloon', 'wo': 'Wolof', 'xh': 'Xhosa', 'yi': 'Yiddish', 'za': 'Zhuang', 'zu': 'Zulu', 'ab': 'Abkhazian', 'zh': 'Mandarin', 'ps': 'Pushto', 'am': 'Amharic', 'ar': 'Arabic', 'bg': 'Bulgarian', 'cn': 'Cantonese', 'mk': 'Macedonian', 'el': 'Greek', 'fa': 'Persian', 'he': 'Hebrew', 'hi': 'Hindi', 'hy': 'Armenian', 'en': 'English', 'ee': 'Ewe', 'ka': 'Georgian', 'pa': 'Punjabi', 'bn': 'Bengali', 'bs': 'Bosnian', 'ch': 'Chamorro', 'be': 'Belarusian' };

  sub: any;
  query: string;
  event: any;
  constructor(private http: HttpClient, private http_sendAdditionalData: HttpClient, private http_sendTrackingData: HttpClient, private http_getData: HttpClient) { }

  setCat(bool, query, event) {
    this.movie_selected = bool;
    this.data = null;
    this.sendReq(query, event);
  }

  sendReq(query, event) {
    this.query = query;
    this.event = event;
    /**
     * Send HTTP GET request for every valid keypress
     */
    if (this.sub != undefined) {
      this.sub.unsubscribe();
    }
    var key = event.keyCode || event.charCode;
    if (query === '' || query === undefined) {
      if (key === 8 || key === 46) {
        this.data = this.blank; //Clearing Search Box
      }
    }
    else {
      if (this.movie_selected) {
        this.tmdb = 'https://api.themoviedb.org/3/search/movie?api_key=bd5e7f8161070f86bff1d8da34219f57&query=' + query + '&page=' + this.page_number + '&include_adult=true';
      }
      else {
        this.tmdb = "https://api.themoviedb.org/3/search/tv?api_key=bd5e7f8161070f86bff1d8da34219f57&language=en-US&query=" + query + "&page=" + this.page_number;
      }
      this.sub = this.http.get<UserResponse>(this.tmdb).subscribe(data => {
        this.data = data;
      });
    }
  }
  
  ngOnInit() {
    this.page_number = 1;
    localStorage.removeItem("REACTION_DATA");
    localStorage.removeItem("BOOKMARKED_DATA");
    localStorage.removeItem("CLICKED_DATA");
    let status: any;
    if (localStorage.getItem("Email")) {
      status = this.getUserData();
    }
    else {
      console.log("Not logged in to get user data.");
    }
  }

  displayLocalData() {
    if (localStorage.getItem("REACTION_DATA") != null) {
      console.log("Liked Status Data:\n" + localStorage.getItem("REACTION_DATA"));
    }
    else {
      console.log("No Like/dislike history")
    }
    if (localStorage.getItem("BOOKMARKED_DATA") != null) {
      console.log("Bookmarked Data:\n" + localStorage.getItem("BOOKMARKED_DATA"));
    }
    else {
      console.log("No Add to List history")
    }
    if (localStorage.getItem("CLICKED_DATA") != null) {
      console.log("Impressions Data:\n" + localStorage.getItem("CLICKED_DATA"));
    }
    else {
      console.log("No Click Impressions")
    }
  }

  getUserData() {
    let loginstr = '/getUserDetails?email=' + localStorage.getItem("Email");
    this.http.get<UserResponse>(loginstr).subscribe(data => {
      this.user_details = data; // Assign local to global
      console.log(data[0].reactions_data);
      console.log(data[0].bookmark_data);
      console.log(data[0].clicked_data);
      this.like_status_data = data[0].reactions_data;
      this.bookmarked_data = data[0].bookmark_data;
      this.clicked_data = data[0].clicked_data;
      localStorage.setItem("BOOKMARKED_DATA", JSON.stringify(this.bookmarked_data));
      localStorage.setItem("CLICKED_DATA", JSON.stringify(this.clicked_data));
      localStorage.setItem("REACTION_DATA", JSON.stringify(this.like_status_data));
      this.displayLocalData();
    });
  }

  likeMovie(movie, event) {
    if (this.like_status_data[movie.id]) {
      if (this.like_status_data[movie.id].like_status == true) {
        this.JSONify_like(movie, null);
      }
      else if (this.like_status_data[movie.id].like_status == false || this.like_status_data[movie.id].like_status == null) {
        this.JSONify_like(movie, true);
      }
    }
    else {
      localStorage.setItem("LATEST_LIKE", movie.id + '|' + movie.title + '|' + movie.genre_ids);
      this.JSONify_like(movie, true);
    }
  }

  dislikeMovie(movie, event) {
    if (this.like_status_data[movie.id]) {
      if (this.like_status_data[movie.id].like_status == false) {
        this.JSONify_like(movie, null);
      }
      else if (this.like_status_data[movie.id].like_status == true || this.like_status_data[movie.id].like_status == null) {
        this.JSONify_like(movie, false);
      }
    }
    else {
      this.JSONify_like(movie, false);
    }

  }

  trackClick(movie) {
    if (this.movie_selected){
      window.open('/show/movie/' + movie.id, '_blank');
    }
    else {
      window.open('/show/tv/' + movie.id, '_blank');
    }

    if (this.clicked_data[movie.id]) {
      console.log("Already Exists");
    }
    else {
      this.JSONify_click(movie);
    }
  }

  addList(movie, event) {

    if (this.bookmarked_data[movie.id]) {
      if (this.bookmarked_data[movie.id].list_status == true) {
        this.JSONify_bookmark(movie, null);
      }
      else if (this.bookmarked_data[movie.id].list_status == null) {
        this.JSONify_bookmark(movie, true);
      }
    }
    else {
      this.JSONify_bookmark(movie, true);
    }

  }

  JSONify_bookmark(movie, list_status) {
    let movieid = movie.id;
    let genre = movie.genre_ids;
    let movie_name = movie.title;
    let date = new Date();
    let last_updated = date.getTime();

    // If Movie is not present
    if (this.bookmarked_data[movieid] === undefined) {
      this.bookmarked_data[movieid] = { "last_updated": last_updated, "title": movie_name, "genre_ids": genre, "list_status": list_status };
    }
    // If movie is already present
    else {
      this.bookmarked_data[movieid].list_status = list_status;
      this.bookmarked_data[movieid].last_updated = last_updated;
    }
    localStorage.setItem("BOOKMARKED_DATA", JSON.stringify(this.bookmarked_data));
    console.log("Bookmarked Data:");
    console.log(this.bookmarked_data);
    this.send_bookmarks_to_db();
    console.log("Bookmarked Data:\n" + localStorage.getItem("BOOKMARKED_DATA"));
  }

  JSONify_click(movie) {
    let movieid = movie.id;
    let genre = movie.genre_ids;
    let movie_name = movie.title;

    let date = new Date();
    let last_updated = date.getTime();
    this.clicked_data[movieid] = { "last_updated": last_updated, "title": movie_name, "genre_ids": genre };
    localStorage.setItem("CLICKED_DATA", JSON.stringify(this.clicked_data));
    console.log("Clicked Data:");
    console.log(this.clicked_data);
    this.send_impressions_to_db();
    console.log("Clicked Data:\n" + localStorage.getItem("CLICKED_DATA"));
  }

  JSONify_like(movie, like_status) {
    let movieid = movie.id;
    let genre = movie.genre_ids;
    let movie_name = movie.title;
    let date = new Date();
    let last_updated = date.getTime();
    let check = this.check_duplicate_tracks(movieid);

    if (check == true) {
      this.like_status_data[movieid] = { "last_updated": last_updated, "title": movie_name, "genre_ids": genre, "like_status": like_status };
    }
    else {
      this.like_status_data[movieid] = { "last_updated": last_updated, "title": movie_name, "genre_ids": genre, "like_status": like_status };
    }
    localStorage.setItem("REACTION_DATA", JSON.stringify(this.like_status_data));
    console.log("Like Status Data:");
    console.log(this.like_status_data);
    this.send_reactions_to_db();
    console.log("Liked Status Data:\n" + localStorage.getItem("REACTION_DATA"));
  }

  send_impressions_to_db() {
    if (localStorage.getItem("Email")) {
      this.http_sendTrackingData.post("/sendClicksData", { "user_id": localStorage.getItem("Email"), "JSON_String": localStorage.getItem("CLICKED_DATA") }).subscribe(data => {
        this.local_send_clicks_data = data;
        console.log("IMPRESSIONS TO DB SUCCESSFUL");
      },
        err => {
          console.warn(err);
        });
    }
  }

  send_bookmarks_to_db() {
    if (localStorage.getItem("Email")) {
      this.http_sendAdditionalData.post("/sendBookmarkData", { "user_id": localStorage.getItem("Email"), "JSON_String": localStorage.getItem("BOOKMARKED_DATA") }).subscribe(data => {
        this.local_send_bookmark_data = data;
        console.log("BOOKMARKS TO DB SUCCESSFUL");
      },
        err => {
          console.warn(err);
        });
    }
  }

  send_reactions_to_db() {
    if (localStorage.getItem("Email")) {
      this.http_sendTrackingData.post("/sendReactionData", {
        "user_id": localStorage.getItem("Email"),
        "JSON_String": localStorage.getItem("REACTION_DATA")
      }).subscribe(data => {
        this.local_send_tracking_data = data;
        console.log("REACTION TO DB SUCCESSFUL");
      },
        err => {
          console.warn(err);
        });
    }
  }

  check_duplicate_tracks(movieid) {
    if (this.like_status_data[movieid] === undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  prev() {
    if (this.page_number > 1) {
      this.page_number -= 1;
    }
    window.scrollTo(0, 0);
    this.sendReq(this.query, this.event);
  }

  next() {
    if (this.page_number < this.data.total_pages) {
      this.page_number += 1;
    }
    window.scrollTo(0, 0);
    this.sendReq(this.query, this.event);
  }
}

//  BELOW INTERFACES FOR PARSING JSON OBJECT
interface UserResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Results[];
  ok: number;
  length: number;
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
  length: number;
}

interface GenreTy {
  [key: number]: string;
}
