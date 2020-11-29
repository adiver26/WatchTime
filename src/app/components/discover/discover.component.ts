import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent extends UserComponent implements OnInit {
  constructor(private http_discover: HttpClient, private http_discover_sendAdditionalData: HttpClient, private http_discover_sendTrackingData: HttpClient, private http_discover_getData: HttpClient) {
    super(http_discover, http_discover_sendAdditionalData, http_discover_sendTrackingData, http_discover_getData);
  }

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

  sortby = {
    "popularity.asc": "Popularity ↑",
    "popularity.desc": "Popularity ↓",
    "primary_release_date.asc": "Release Date ↑",
    "primary_release_date.desc": "Release Date ↓",
    "revenue.asc": "Revenue ↑",
    "revenue.desc": "Revenue ↓",
    "primary_primary_release_date.asc": "Primary Release Date ↑",
    "primary_primary_release_date.desc": "Primary Release Date ↓",
    "original_title.asc": "Original Title ↑",
    "original_title.desc": "Original Title ↓",
    "vote_average.asc": "Vote Average ↑",
    "vote_average.desc": "Vote Average ↓",
    "vote_count.asc": "Vote Count ↑",
    "vote_count.desc": "Vote Count ↓"
  }
  genres_incl = [
    { "value": 28, "text": "Action", "checked": false },
    { "value": 12, "text": "Adventure", "checked": false },
    { "value": 16, "text": "Animation", "checked": false },
    { "value": 35, "text": "Comedy", "checked": false },
    { "value": 80, "text": "Crime", "checked": false },
    { "value": 99, "text": "Documentary", "checked": false },
    { "value": 18, "text": "Drama", "checked": false },
    { "value": 10751, "text": "Family", "checked": false },
    { "value": 14, "text": "Fantasy", "checked": false },
    { "value": 36, "text": "History", "checked": false },
    { "value": 27, "text": "Horror", "checked": false },
    { "value": 10402, "text": "Music", "checked": false },
    { "value": 9648, "text": "Mystery", "checked": false },
    { "value": 10749, "text": "Romance", "checked": false },
    { "value": 878, "text": "Science Fiction", "checked": false },
    { "value": 10770, "text": "TV Movie", "checked": false },
    { "value": 53, "text": "Thriller", "checked": false },
    { "value": 10752, "text": "War", "checked": false },
    { "value": 37, "text": "Western", "checked": false }
  ]

  optional_filters = [
    {"filter_name": "adult", "checked": false},
    {"filter_name": "history", "checked": false}
  ]

  genres_excl = [
    { "value": 28, "text": "Action", "checked": false },
    { "value": 12, "text": "Adventure", "checked": false },
    { "value": 16, "text": "Animation", "checked": false },
    { "value": 35, "text": "Comedy", "checked": false },
    { "value": 80, "text": "Crime", "checked": false },
    { "value": 99, "text": "Documentary", "checked": false },
    { "value": 18, "text": "Drama", "checked": false },
    { "value": 10751, "text": "Family", "checked": false },
    { "value": 14, "text": "Fantasy", "checked": false },
    { "value": 36, "text": "History", "checked": false },
    { "value": 27, "text": "Horror", "checked": false },
    { "value": 10402, "text": "Music", "checked": false },
    { "value": 9648, "text": "Mystery", "checked": false },
    { "value": 10749, "text": "Romance", "checked": false },
    { "value": 878, "text": "Science Fiction", "checked": false },
    { "value": 10770, "text": "TV Movie", "checked": false },
    { "value": 53, "text": "Thriller", "checked": false },
    { "value": 10752, "text": "War", "checked": false },
    { "value": 37, "text": "Western", "checked": false }
  ];
  before_date: any;
  sortby_values = Object.values(this.sortby);
  sortby_keys = Object.keys(this.sortby);
  lang_object = {
    "No Language": "xx", "Afar": "aa", "Afrikaans": "af", "Akan": "ak", "Aragonese": "an", "Assamese": "as", "Avaric": "av", "Avestan": "ae", "Aymara": "ay", "Azerbaijani": "az", "Bashkir": "ba", "Bambara": "bm", "Bislama": "bi", "Tibetan": "bo", "Breton": "br", "Catalan": "ca", "Czech": "cs", "Chechen": "ce", "Slavic": "cu", "Chuvash": "cv", "Cornish": "kw", "Corsican": "co", "Cree": "cr", "Welsh": "cy", "Danish": "da", "German": "de", "Divehi": "dv", "Dzongkha": "dz", "Esperanto": "eo", "Estonian": "et", "Basque": "eu", "Faroese": "fo", "Fijian": "fj", "Finnish": "fi", "French": "fr", "Frisian": "fy", "Fulah": "ff", "Gaelic": "gd", "Irish": "ga", "Gallegan": "gl", "Manx": "gv", "Guarani": "gn", "Gujarati": "gu", "Haitian; Haitian Creole": "ht", "Hausa": "ha", "Serbo-Croatian": "sh", "Herero": "hz", "Hiri Motu": "ho", "Croatian": "hr", "Hungarian": "hu", "Igbo": "ig", "Ido": "io", "Yi": "ii", "Inuktitut": "iu", "Interlingue": "ie", "Interlingua": "ia", "Indonesian": "id", "Inupiaq": "ik", "Icelandic": "is", "Italian": "it", "Javanese": "jv", "Japanese": "ja", "Kalaallisut": "kl", "Kannada": "kn", "Kashmiri": "ks", "Kanuri": "kr", "Kazakh": "kk", "Khmer": "km", "Kikuyu": "ki", "Kinyarwanda": "rw", "Kirghiz": "ky", "Komi": "kv", "Kongo": "kg", "Korean": "ko", "Kuanyama": "kj", "Kurdish": "ku", "Lao": "lo", "Latin": "la", "Latvian": "lv", "Limburgish": "li", "Lingala": "ln", "Lithuanian": "lt", "Letzeburgesch": "lb", "Luba-Katanga": "lu", "Ganda": "lg", "Marshall": "mh", "Malayalam": "ml", "Marathi": "mr", "Malagasy": "mg", "Maltese": "mt", "Moldavian": "mo", "Mongolian": "mn", "Maori": "mi", "Malay": "ms", "Burmese": "my", "Nauru": "na", "Navajo": "nv", "Ndebele": "nd", "Ndonga": "ng", "Nepali": "ne", "Dutch": "nl", "Norwegian Nynorsk": "nn", "Norwegian Bokmål": "nb", "Norwegian": "no", "Chichewa; Nyanja": "ny", "Occitan": "oc", "Ojibwa": "oj", "Oriya": "or", "Oromo": "om", "Ossetian; Ossetic": "os", "Pali": "pi", "Polish": "pl", "Portuguese": "pt", "Quechua": "qu", "Raeto-Romance": "rm", "Romanian": "ro", "Rundi": "rn", "Russian": "ru", "Sango": "sg", "Sanskrit": "sa", "Sinhalese": "si", "Slovak": "sk", "Slovenian": "sl", "Northern Sami": "se", "Samoan": "sm", "Shona": "sn", "Sindhi": "sd", "Somali": "so", "Sotho": "st", "Spanish": "es", "Albanian": "sq", "Sardinian": "sc", "Serbian": "sr", "Swati": "ss", "Sundanese": "su", "Swahili": "sw", "Swedish": "sv", "Tahitian": "ty", "Tamil": "ta", "Tatar": "tt", "Telugu": "te", "Tajik": "tg", "Tagalog": "tl", "Thai": "th", "Tigrinya": "ti", "Tonga": "to", "Tswana": "tn", "Tsonga": "ts", "Turkmen": "tk", "Turkish": "tr", "Twi": "tw", "Uighur": "ug", "Ukrainian": "uk", "Urdu": "ur", "Uzbek": "uz", "Venda": "ve", "Vietnamese": "vi", "Volapük": "vo", "Walloon": "wa", "Wolof": "wo", "Xhosa": "xh", "Yiddish": "yi", "Zhuang": "za", "Zulu": "zu", "Abkhazian": "ab", "Mandarin": "zh", "Pushto": "ps", "Amharic": "am", "Arabic": "ar", "Bulgarian": "bg", "Cantonese": "cn", "Macedonian": "mk", "Greek": "el", "Persian": "fa", "Hebrew": "he", "Hindi": "hi", "Armenian": "hy", "English": "en", "Ewe": "ee", "Georgian": "ka", "Punjabi": "pa", "Bengali": "bn", "Bosnian": "bs", "Chamorro": "ch", "Belarusian": "be"
  };
  rev_lang_obj = {'xx': 'No Language', 'aa': 'Afar', 'af': 'Afrikaans', 'ak': 'Akan', 'an': 'Aragonese', 'as': 'Assamese', 'av': 'Avaric', 'ae': 'Avestan', 'ay': 'Aymara', 'az': 'Azerbaijani', 'ba': 'Bashkir', 'bm': 'Bambara', 'bi': 'Bislama', 'bo': 'Tibetan', 'br': 'Breton', 'ca': 'Catalan', 'cs': 'Czech', 'ce': 'Chechen', 'cu': 'Slavic', 'cv': 'Chuvash', 'kw': 'Cornish', 'co': 'Corsican', 'cr': 'Cree', 'cy': 'Welsh', 'da': 'Danish', 'de': 'German', 'dv': 'Divehi', 'dz': 'Dzongkha', 'eo': 'Esperanto', 'et': 'Estonian', 'eu': 'Basque', 'fo': 'Faroese', 'fj': 'Fijian', 'fi': 'Finnish', 'fr': 'French', 'fy': 'Frisian', 'ff': 'Fulah', 'gd': 'Gaelic', 'ga': 'Irish', 'gl': 'Gallegan', 'gv': 'Manx', 'gn': 'Guarani', 'gu': 'Gujarati', 'ht': 'Haitian; Haitian Creole', 'ha': 'Hausa', 'sh': 'Serbo-Croatian', 'hz': 'Herero', 'ho': 'Hiri Motu', 'hr': 'Croatian', 'hu': 'Hungarian', 'ig': 'Igbo', 'io': 'Ido', 'ii': 'Yi', 'iu': 'Inuktitut', 'ie': 'Interlingue', 'ia': 'Interlingua', 'id': 'Indonesian', 'ik': 'Inupiaq', 'is': 'Icelandic', 'it': 'Italian', 'jv': 'Javanese', 'ja': 'Japanese', 'kl': 'Kalaallisut', 'kn': 'Kannada', 'ks': 'Kashmiri', 'kr': 'Kanuri', 'kk': 'Kazakh', 'km': 'Khmer', 'ki': 'Kikuyu', 'rw': 'Kinyarwanda', 'ky': 'Kirghiz', 'kv': 'Komi', 'kg': 'Kongo', 'ko': 'Korean', 'kj': 'Kuanyama', 'ku': 'Kurdish', 'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian', 'li': 'Limburgish', 'ln': 'Lingala', 'lt': 'Lithuanian', 'lb': 'Letzeburgesch', 'lu': 'Luba-Katanga', 'lg': 'Ganda', 'mh': 'Marshall', 'ml': 'Malayalam', 'mr': 'Marathi', 'mg': 'Malagasy', 'mt': 'Maltese', 'mo': 'Moldavian', 'mn': 'Mongolian', 'mi': 'Maori', 'ms': 'Malay', 'my': 'Burmese', 'na': 'Nauru', 'nv': 'Navajo', 'nd': 'Ndebele', 'ng': 'Ndonga', 'ne': 'Nepali', 'nl': 'Dutch', 'nn': 'Norwegian Nynorsk', 'nb': 'Norwegian Bokmål', 'no': 'Norwegian', 'ny': 'Chichewa; Nyanja', 'oc': 'Occitan', 'oj': 'Ojibwa', 'or': 'Oriya', 'om': 'Oromo', 'os': 'Ossetian; Ossetic', 'pi': 'Pali', 'pl': 'Polish', 'pt': 'Portuguese', 'qu': 'Quechua', 'rm': 'Raeto-Romance', 'ro': 'Romanian', 'rn': 'Rundi', 'ru': 'Russian', 'sg': 'Sango', 'sa': 'Sanskrit', 'si': 'Sinhalese', 'sk': 'Slovak', 'sl': 'Slovenian', 'se': 'Northern Sami', 'sm': 'Samoan', 'sn': 'Shona', 'sd': 'Sindhi', 'so': 'Somali', 'st': 'Sotho', 'es': 'Spanish', 'sq': 'Albanian', 'sc': 'Sardinian', 'sr': 'Serbian', 'ss': 'Swati', 'su': 'Sundanese', 'sw': 'Swahili', 'sv': 'Swedish', 'ty': 'Tahitian', 'ta': 'Tamil', 'tt': 'Tatar', 'te': 'Telugu', 'tg': 'Tajik', 'tl': 'Tagalog', 'th': 'Thai', 'ti': 'Tigrinya', 'to': 'Tonga', 'tn': 'Tswana', 'ts': 'Tsonga', 'tk': 'Turkmen', 'tr': 'Turkish', 'tw': 'Twi', 'ug': 'Uighur', 'uk': 'Ukrainian', 'ur': 'Urdu', 'uz': 'Uzbek', 've': 'Venda', 'vi': 'Vietnamese', 'vo': 'Volapük', 'wa': 'Walloon', 'wo': 'Wolof', 'xh': 'Xhosa', 'yi': 'Yiddish', 'za': 'Zhuang', 'zu': 'Zulu', 'ab': 'Abkhazian', 'zh': 'Mandarin', 'ps': 'Pushto', 'am': 'Amharic', 'ar': 'Arabic', 'bg': 'Bulgarian', 'cn': 'Cantonese', 'mk': 'Macedonian', 'el': 'Greek', 'fa': 'Persian', 'he': 'Hebrew', 'hi': 'Hindi', 'hy': 'Armenian', 'en': 'English', 'ee': 'Ewe', 'ka': 'Georgian', 'pa': 'Punjabi', 'bn': 'Bengali', 'bs': 'Bosnian', 'ch': 'Chamorro', 'be': 'Belarusian'};
  lang_keys: any;
  lang_values: any;
  sort_filter: string;
  hax_link: string;
  api_key = 'bd5e7f8161070f86bff1d8da34219f57'
  adult_filter = false;
  Date = new Date();
  data: any;
  movie_selected = true;
  sub: any;


  page_number: number;
  votecount: number;
  lang: string;
  rating: any;
  before: string;

  ngOnInit() {

    this.page_number = 1;
    localStorage.removeItem("REACTION_DATA");
    localStorage.removeItem("BOOKMARKED_DATA");
    localStorage.removeItem("CLICKED_DATA");
    this.before_date = this.Date.toISOString().split('T')[0];
    this.lang_keys = Object.keys(this.lang_object);
    this.lang_values = Object.values(this.lang_object);
    let status: any;
    if (localStorage.getItem("Email")) {
      status = this.getUserData();
    }
    else {
      console.log("Not logged in to get user data.");
    }
  }

  hax(vote_count, lang='English', rating='0', before?, after?) {
    if (after == undefined) {
      after = this.before_date
    }
    let ratecheck = parseInt(rating);
    let before_date = new Date(before);
    let after_date = new Date(this.before_date);

    if (ratecheck > 10) {
      alert("Rating can't be higher than 10");
      this.data = null;
      return;
    }
    if (this.votecount > 10000) {
      alert("Vote count out of range.");
      this.data = null;
      return;
    }
    if (before > after) {
      alert("'From date' can't be higher than 'To date'.");
      this.data = null;
      return;
    }
    if (before > this.before_date || after > this.before_date) {
      alert("Please insert correct date range.");
      this.data = null;
      return;
    }
    if (this.sub != undefined) {
      this.sub.unsubscribe();
    }
    if (this.sort_filter == '' || this.sort_filter == undefined) {
      this.sort_filter = 'vote_count.desc';
    }
    if (rating === '') {
      rating = '0';
    }
    if (lang === '') {
      lang = 'English';
    }
    else {
      if(!this.lang_object[lang])
      {
        alert("Please select a valid language from the dropdown!");
        this.data = null;
        return;
      }
    }
    if (vote_count === undefined) {
      vote_count = '0';
    }
    if (before === undefined) {
      before = ''
    }
    this.votecount = parseInt(vote_count);
    this.before = before;
    this.lang = lang;
    this.rating = rating;
    let in_genres = this.genres_incl.filter(opt => opt.checked).map(opt => opt.value).toString();
    let ex_genres = this.genres_excl.filter(opt => opt.checked).map(opt => opt.value).toString();

    if (this.movie_selected == true) {
      this.hax_link = 'https://api.themoviedb.org/3/discover/movie?api_key=' + this.api_key + '&language=en-IN&sort_by=' + this.sort_filter + '&include_adult=' + this.adult_filter + '&include_video=false&page=' + this.page_number + '&primary_release_date.gte=' + before + '&primary_release_date.lte=' + after + '&vote_count.gte=' + vote_count + '&vote_average.gte=' + rating + '&with_genres=' + in_genres + '&without_genres=' + ex_genres + '&with_original_language=' + this.lang_object[lang] + '&vote_average.lte=9';
    }
    else {
      this.hax_link = 'https://api.themoviedb.org/3/discover/tv?api_key=' + this.api_key + '&language=en-US&sort_by=' + this.sort_filter + '&page=1&include_null_first_air_dates=false&sort_by=' + this.sort_filter + '&include_adult=' + this.adult_filter + '&page=' + this.page_number + '&first_air_date.gte=' + before + '&first_air_date.lte=' + after + '&vote_count.gte=' + vote_count + '&vote_average.gte=' + rating + '&with_genres=' + in_genres + '&without_genres=' + ex_genres + '&with_original_language=' + this.lang_object[lang] + '&vote_average.lte=9';
    }
    this.sub = this.http_discover.get<UserResponse>(this.hax_link).subscribe(data => {
      this.data = data; // Assign local to global
    });
  }

  sortFix(sort) {
    this.sort_filter = sort;
  }

  setCat(bool, event) {
    this.movie_selected = bool;
    this.data = null;
    document.getElementById("haxthedb").click();
  }

  prev() {
    if (this.page_number > 1) {
      this.page_number -= 1;
    }
    window.scrollTo(0, 0);
    this.hax('0');
  }

  next() {
    if (this.page_number < this.data.total_pages) {
      this.page_number += 1;
    }
    window.scrollTo(0, 0);
    this.hax('0');
  }

}

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
  primary_release_date: string;
  length: number;
}

interface GenreTy {
  [key: number]: string;
}
