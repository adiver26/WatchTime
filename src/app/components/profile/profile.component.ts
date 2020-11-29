import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  show_like = true;
  user_name: string;
  reactions_data: any;
  bookmarked_data: any;
  reaction_flag: boolean;
  background_image: any;

  lang_object = {
    "No Language": "xx", "Afar": "aa", "Afrikaans": "af", "Akan": "ak", "Aragonese": "an", "Assamese": "as", "Avaric": "av", "Avestan": "ae", "Aymara": "ay", "Azerbaijani": "az", "Bashkir": "ba", "Bambara": "bm", "Bislama": "bi", "Tibetan": "bo", "Breton": "br", "Catalan": "ca", "Czech": "cs", "Chechen": "ce", "Slavic": "cu", "Chuvash": "cv", "Cornish": "kw", "Corsican": "co", "Cree": "cr", "Welsh": "cy", "Danish": "da", "German": "de", "Divehi": "dv", "Dzongkha": "dz", "Esperanto": "eo", "Estonian": "et", "Basque": "eu", "Faroese": "fo", "Fijian": "fj", "Finnish": "fi", "French": "fr", "Frisian": "fy", "Fulah": "ff", "Gaelic": "gd", "Irish": "ga", "Gallegan": "gl", "Manx": "gv", "Guarani": "gn", "Gujarati": "gu", "Haitian; Haitian Creole": "ht", "Hausa": "ha", "Serbo-Croatian": "sh", "Herero": "hz", "Hiri Motu": "ho", "Croatian": "hr", "Hungarian": "hu", "Igbo": "ig", "Ido": "io", "Yi": "ii", "Inuktitut": "iu", "Interlingue": "ie", "Interlingua": "ia", "Indonesian": "id", "Inupiaq": "ik", "Icelandic": "is", "Italian": "it", "Javanese": "jv", "Japanese": "ja", "Kalaallisut": "kl", "Kannada": "kn", "Kashmiri": "ks", "Kanuri": "kr", "Kazakh": "kk", "Khmer": "km", "Kikuyu": "ki", "Kinyarwanda": "rw", "Kirghiz": "ky", "Komi": "kv", "Kongo": "kg", "Korean": "ko", "Kuanyama": "kj", "Kurdish": "ku", "Lao": "lo", "Latin": "la", "Latvian": "lv", "Limburgish": "li", "Lingala": "ln", "Lithuanian": "lt", "Letzeburgesch": "lb", "Luba-Katanga": "lu", "Ganda": "lg", "Marshall": "mh", "Malayalam": "ml", "Marathi": "mr", "Malagasy": "mg", "Maltese": "mt", "Moldavian": "mo", "Mongolian": "mn", "Maori": "mi", "Malay": "ms", "Burmese": "my", "Nauru": "na", "Navajo": "nv", "Ndebele": "nd", "Ndonga": "ng", "Nepali": "ne", "Dutch": "nl", "Norwegian Nynorsk": "nn", "Norwegian Bokmål": "nb", "Norwegian": "no", "Chichewa; Nyanja": "ny", "Occitan": "oc", "Ojibwa": "oj", "Oriya": "or", "Oromo": "om", "Ossetian; Ossetic": "os", "Pali": "pi", "Polish": "pl", "Portuguese": "pt", "Quechua": "qu", "Raeto-Romance": "rm", "Romanian": "ro", "Rundi": "rn", "Russian": "ru", "Sango": "sg", "Sanskrit": "sa", "Sinhalese": "si", "Slovak": "sk", "Slovenian": "sl", "Northern Sami": "se", "Samoan": "sm", "Shona": "sn", "Sindhi": "sd", "Somali": "so", "Sotho": "st", "Spanish": "es", "Albanian": "sq", "Sardinian": "sc", "Serbian": "sr", "Swati": "ss", "Sundanese": "su", "Swahili": "sw", "Swedish": "sv", "Tahitian": "ty", "Tamil": "ta", "Tatar": "tt", "Telugu": "te", "Tajik": "tg", "Tagalog": "tl", "Thai": "th", "Tigrinya": "ti", "Tonga": "to", "Tswana": "tn", "Tsonga": "ts", "Turkmen": "tk", "Turkish": "tr", "Twi": "tw", "Uighur": "ug", "Ukrainian": "uk", "Urdu": "ur", "Uzbek": "uz", "Venda": "ve", "Vietnamese": "vi", "Volapük": "vo", "Walloon": "wa", "Wolof": "wo", "Xhosa": "xh", "Yiddish": "yi", "Zhuang": "za", "Zulu": "zu", "Abkhazian": "ab", "Mandarin": "zh", "Pushto": "ps", "Amharic": "am", "Arabic": "ar", "Bulgarian": "bg", "Cantonese": "cn", "Macedonian": "mk", "Greek": "el", "Persian": "fa", "Hebrew": "he", "Hindi": "hi", "Armenian": "hy", "English": "en", "Ewe": "ee", "Georgian": "ka", "Punjabi": "pa", "Bengali": "bn", "Bosnian": "bs", "Chamorro": "ch", "Belarusian": "be"
  };
  lang_keys: any;
  lang_values: any;
  default_lang: any;


  convertTimestamp(timestamp) {
    let d = new Date(timestamp);
    return d.toLocaleString();
  }

  setCat(bool) {
    this.show_like = bool;
  }
  constructor(private http: HttpClient) {
    document.getElementById("body").style.backgroundColor = "#e9ecef";
    document.getElementById("body").style.backgroundImage = "none";
  }

  ngOnInit() {
    if (localStorage.getItem("DEFAULT_LANG")) {
      this.default_lang = localStorage.getItem("DEFAULT_LANG");
    }
    else {
      this.default_lang = 'English';
    }
    if (localStorage.getItem("Name") == undefined || localStorage.getItem("Name") == null) {
      this.user_name = 'Guest';
    }
    else {
      this.user_name = localStorage.getItem("Name");
    }
    console.log(this.user_name);
    if (this.user_name != 'Guest')
    {  
      if (localStorage.getItem("BOOKMARKED_DATA")) {
        this.bookmarked_data = localStorage.getItem("BOOKMARKED_DATA");
        //this.bookmarked_data = Object.values(JSON.parse(this.bookmarked_data));
        alert(JSON.parse(JSON.stringify(this.bookmarked_data)));
      }       
      /*let loginstr = '/getUserDetails?email=' + localStorage.getItem("Email");
      this.http.get(loginstr).subscribe(data => {
        console.log('SUCCESS');
        this.reactions_data = Object.values(data[0].reactions_data);
        this.bookmarked_data = Object.values(data[0].bookmark_data);
      });*/
    }
    else {
      if (this.bookmarked_data == null || this.bookmarked_data == undefined) {
        if (localStorage.getItem("BOOKMARKED_DATA")) {
          this.bookmarked_data = localStorage.getItem("BOOKMARKED_DATA");
          this.bookmarked_data = Object.values(JSON.parse(this.bookmarked_data));
        }
      }
      if (this.reactions_data == null || this.reactions_data == undefined) {
        if (localStorage.getItem("REACTION_DATA")) {
          this.reactions_data = localStorage.getItem("REACTION_DATA");
          this.reactions_data = Object.values(JSON.parse(this.reactions_data));
        }
      }
    }
    this.lang_keys = Object.keys(this.lang_object);
    this.lang_values = Object.values(this.lang_object);
  }

  ngOnDestroy() {
    document.getElementById("body").style.backgroundColor = "#1A1717";
  }

  showAlerts(): void {
    alert('Sucessfully saved.');
  }
  save(new_lang) {
    this.showAlerts();
    let lang = this.lang_object[new_lang];
    localStorage.setItem("DEFAULT_LANG", new_lang);
    console.log(lang);
  }

}
