import OpenAI from 'openai';
import { Another_API, Gemini_API, GPT_API_KEY } from './constant';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini SetUp
export const genAI = new GoogleGenerativeAI(
  Gemini_API
);

export const client = new OpenAI({
  apiKey: Another_API, 
  dangerouslyAllowBrowser: true   // This is the default and can be omitted
});

const data = {
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/rACXg4zadOTEQKceu0zViohXwCb.jpg",
      "genre_ids": [
        35,
        18,
        10749
      ],
      "id": 15977,
      "original_language": "hi",
      "original_title": "देव .डी",
      "overview": "After breaking up with his childhood love Paro, Dev finds solace in drugs and alcohol. He soon bumps into Leni, a prostitute, and falls for her.",
      "popularity": 7.254,
      "poster_path": "/A2SILF5dOBrAJU52DlmMyR5xzDx.jpg",
      "release_date": "2009-02-06",
      "title": "Dev.D",
      "video": false,
      "vote_average": 6.9,
      "vote_count": 129
    },
    {
      "adult": false,
      "backdrop_path": "/qIXEyZxn2DNJfuQsz3hSv3I1ACV.jpg",
      "genre_ids": [
        10749,
        28
      ],
      "id": 539315,
      "original_language": "ta",
      "original_title": "தேவ்",
      "overview": "A youngster who has to fight against all the odds in order to achieve his desires.",
      "popularity": 2.275,
      "poster_path": "/AgvDjOzWMISPYmFsW42ZOpzPrCc.jpg",
      "release_date": "2019-02-14",
      "title": "Dev",
      "video": false,
      "vote_average": 5.063,
      "vote_count": 16
    },
    {
      "adult": false,
      "backdrop_path": "/xwRfWQfjgGHrcS0laMSWD8midSz.jpg",
      "genre_ids": [
        53,
        18
      ],
      "id": 363189,
      "original_language": "hi",
      "original_title": "दास देव",
      "overview": "Dev who takes control of his own life gets addicted to drugs and alcohol and eventually becomes hungry for power.",
      "popularity": 0.88,
      "poster_path": "/epEPC4J41OwaHkiSPuyRIj4vuOb.jpg",
      "release_date": "2018-03-23",
      "title": "Daas Dev",
      "video": false,
      "vote_average": 3,
      "vote_count": 2
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 988124,
      "original_language": "hi",
      "original_title": "ब्रह्मास्त्र भाग दो",
      "overview": "Part two of the Brahmāstra trilogy.",
      "popularity": 0.01,
      "poster_path": null,
      "release_date": "",
      "title": "Brahmāstra Part Two: Dev",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "/1LxOCpRitEaUSaGURqlPyOSgqG0.jpg",
      "genre_ids": [
        18
      ],
      "id": 136527,
      "original_language": "hi",
      "original_title": "Dev",
      "overview": "Joint Commissioner of Police Dev Pratap Singh, a duty-bound, self-righteous officer, and Special Commissioner Tejinder Khosla, the balancing force between the political interests of Chief Minister Bhandarker and Dev's commitment to the law, are lifelong friends, each with his own ideals. Farhaan, a law graduate, was brought up with ideals of non-violence and patriotism. Dev unwittingly gives Farhaan the wound that plunges him into rage and violence after witnessing the death of his father during a peace demonstration. Taking advantage of the situation, corrupt politician Latif sets the vulnerable young man on a path of violence and destruction that threatens to ignite the city. Aalyn is the light in Farhaan's life. Beautiful and innocent, the young woman also gets caught in extraordinary circumstances that transform her life and she dares to stand up for the truth.",
      "popularity": 2.405,
      "poster_path": "/hZrDic5d9lpPKY5SQrZcGfhsrq4.jpg",
      "release_date": "2004-06-11",
      "title": "Dev",
      "video": false,
      "vote_average": 6.538,
      "vote_count": 13
    },
    {
      "adult": false,
      "backdrop_path": "/fIjw2fj2E12KuJN1BFWiFhljqvR.jpg",
      "genre_ids": [
        28
      ],
      "id": 58447,
      "original_language": "tr",
      "original_title": "3 Dev Adam",
      "overview": "Istanbul is being terrorized by a crime wave, and the police call in American superhero Captain America and Mexican wrestler Santo to put a stop to it.",
      "popularity": 3.074,
      "poster_path": "/wAwzuwe5BGglw4WEdSViSKx02wZ.jpg",
      "release_date": "1973-11-01",
      "title": "Three Giant Men",
      "video": false,
      "vote_average": 4.6,
      "vote_count": 27
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 1220941,
      "original_language": "mr",
      "original_title": "देव मानुस",
      "overview": "In the village of Vitthal Wadi, Inamdar and his family live a very respectful life. But Shekhar, the son of Inamdar, is addicted to alcohol and philandering. Directed by Rajdutt. With Anupama, Madhu Apte, Mandakani Bhadbhade, Ramesh Deo.",
      "popularity": 0.035,
      "poster_path": null,
      "release_date": "1970-01-01",
      "title": "Dev Manus",
      "video": false,
      "vote_average": 6,
      "vote_count": 1
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 1215537,
      "original_language": "mr",
      "original_title": "देव पावला",
      "overview": "A film by Ram Gabale.",
      "popularity": 0.001,
      "poster_path": null,
      "release_date": "1950-01-01",
      "title": "Dev Pavla",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "/uqxyBo6n0IFEp0HCknTQwraRXC5.jpg",
      "genre_ids": [
        28,
        12
      ],
      "id": 613380,
      "original_language": "pa",
      "original_title": "DSP Dev",
      "overview": "The movie narrates the story of the son of an honest Police officer. Dev Shergill has always coveted the job for the power it commanded. And after the death of his father on duty, it happens.  But his unethical ways makes him politicians favourite. However, a series of incidents and a startling revelation about his father’s death forces him to reconsider his principles and it is then that he embarks on a path of redemption.",
      "popularity": 2.261,
      "poster_path": "/oJEMmVwAF4IaRAqX0DcKYFibVkU.jpg",
      "release_date": "2019-07-05",
      "title": "DSP Dev",
      "video": false,
      "vote_average": 6.6,
      "vote_count": 8
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 794958,
      "original_language": "hi",
      "original_title": "3 Dev",
      "overview": "",
      "popularity": 0.51,
      "poster_path": "/8gYIKMt4o4meIfb5YviubcB3Q8t.jpg",
      "release_date": "",
      "title": "3 Dev",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 1221349,
      "original_language": "mr",
      "original_title": "मला देव भेटला",
      "overview": "Director : Datta Keshav. Cast: Asha Potdar, Shrikant Moghe, Datta Bhat, Baban Prabhu",
      "popularity": 0.001,
      "poster_path": null,
      "release_date": "1973-01-01",
      "title": "Mala Dev Bhetla",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 1216731,
      "original_language": "mr",
      "original_title": "देव जागा आहे",
      "overview": "Directed by Dinkar D. Patil.",
      "popularity": 0.001,
      "poster_path": null,
      "release_date": "1957-01-01",
      "title": "Dev Jaaga Aahe",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "/gXzPLF5n4UM8j5kwStY92yI71Hb.jpg",
      "genre_ids": [
        35
      ],
      "id": 80982,
      "original_language": "tr",
      "original_title": "Ata Demirer: Tek Kişilik Dev Kadro",
      "overview": "The stand-up, which was staged 104 times from 2002 to 2005, hosted approximately 100,000 audiences. In this show, Ata Demirer reveals his unique style with scenes from Turkey, special characters and musical transitions.",
      "popularity": 1.598,
      "poster_path": "/1IMguYUe3VYBFTYO45jvYieHEzQ.jpg",
      "release_date": "2005-04-11",
      "title": "Ata Demirer: Tek Kişilik Dev Kadro",
      "video": false,
      "vote_average": 7.6,
      "vote_count": 29
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        28
      ],
      "id": 390666,
      "original_language": "tr",
      "original_title": "Dev Kanı",
      "overview": "Cüneyt Arkin is war veteran, now using lots of of alcohol to forget terrible wartime memories. But some drug mafia bastards forces him to take double barreled shotgun and show them what angry Cüneyt is capable of.",
      "popularity": 0.4,
      "poster_path": "/eCqzzZRpLOXQIjalwqLoFpGbKZX.jpg",
      "release_date": "1984-01-01",
      "title": "Dev Kanı",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "/hpkJfzn7tlUP4r4Yr5vukYTgzuF.jpg",
      "genre_ids": [],
      "id": 769491,
      "original_language": "tr",
      "original_title": "İki Başlı Dev",
      "overview": "",
      "popularity": 1.127,
      "poster_path": "/p9NHALxa5VtdPgMGaSbuYx2ATSG.jpg",
      "release_date": "1990-12-07",
      "title": "İki Başlı Dev",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 696189,
      "original_language": "en",
      "original_title": "Dev and Arya",
      "overview": "A Sweet Little Short That Goes Beyond Its Simplistic Premise",
      "popularity": 0.001,
      "poster_path": null,
      "release_date": "",
      "title": "Dev and Arya",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "/nl6WvxakEE7UW4xcKVfpNG08sJD.jpg",
      "genre_ids": [
        18
      ],
      "id": 350680,
      "original_language": "tr",
      "original_title": "Mavi Gözlü Dev",
      "overview": "",
      "popularity": 0.729,
      "poster_path": "/tLHCy8yTyiEDw1RNv7kOe4hZlNs.jpg",
      "release_date": "2007-03-09",
      "title": "Mavi Gözlü Dev",
      "video": false,
      "vote_average": 6.6,
      "vote_count": 11
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        16,
        12
      ],
      "id": 644920,
      "original_language": "tr",
      "original_title": "Bulmaca Kulesi: Dev Kuşun Gizemi",
      "overview": "",
      "popularity": 0.447,
      "poster_path": "/8W27z2xtQtbQaOAXuVlk71h2FS4.jpg",
      "release_date": "2019-10-15",
      "title": "Bulmaca Kulesi: Dev Kuşun Gizemi",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "/vJUypRzEO2Y7SjEBssuMyWVScVf.jpg",
      "genre_ids": [
        35
      ],
      "id": 80983,
      "original_language": "tr",
      "original_title": "Ata Demirer: Tek Kişilik Dev Kadro 2",
      "overview": "Between 2007 and 2011, this stand-up was watched by approximately 100,000 people with 116 plays. “Ata Demirer One-Man Giant Staff 2”, which started to take the curtain almost ten years after the first “One Man Giant Staff” show, is a stand-up show enriched with popular culture references and musical details.",
      "popularity": 1.039,
      "poster_path": "/3uC4J7zkUR7PMAOtVZTa1RwmIoY.jpg",
      "release_date": "2011-07-01",
      "title": "Ata Demirer: Tek Kişilik Dev Kadro 2",
      "video": false,
      "vote_average": 6.6,
      "vote_count": 13
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        99
      ],
      "id": 998404,
      "original_language": "tr",
      "original_title": "Türkiye'nin Dev Yapıları: 1915 Çanakkale Köprüsü",
      "overview": "In the first episode of Turkey's Giant Buildings, we witness the construction process of the \"1915 Çanakkale Bridge\", an engineering marvel.",
      "popularity": 0.489,
      "poster_path": "/wGSNrU9TPtittv0gwivOxiw6fgX.jpg",
      "release_date": "2022-03-27",
      "title": "Türkiye'nin Dev Yapıları: 1915 Çanakkale Köprüsü",
      "video": false,
      "vote_average": 10,
      "vote_count": 1
    }
  ],
  "total_pages": 3,
  "total_results": 54
}