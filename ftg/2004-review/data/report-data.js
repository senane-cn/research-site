window.FTG_PHASE2_DATA = {
  "metrics": {
    "eligibleProperties": 633,
    "typologyCategories": 14,
    "labelRows": 8862,
    "freezeVersion": "Phase 2B.8b",
    "candidateHints": 668,
    "averageMainLabels": 2.335,
    "multiLabelRate": 0.833,
    "complexPropertyCount": 4,
    "t04t06t07Count": 10,
    "statusCounts": {
      "rejected_label": 6716,
      "probable_label": 1071,
      "candidate_label": 658,
      "core_label": 407,
      "associative_hint": 10
    },
    "phase2b8bActionSources": {
      "user_reviewed_8a_packet": 66,
      "user_review_keep_main": 62,
      "post_report_user_correction": 1
    }
  },
  "typology": [
    {
      "code": "T01_ARCHAEOLOGICAL",
      "label": "Archaeological heritage",
      "final": 166,
      "table5": 171,
      "diff": -5,
      "core": 40,
      "probable": 126,
      "candidate": 19,
      "interpretation": "略低于 Table 5；未为配平而强制晋升。"
    },
    {
      "code": "T02_ROCK_ART",
      "label": "Rock-art sites",
      "final": 23,
      "table5": 26,
      "diff": -3,
      "core": 7,
      "probable": 16,
      "candidate": 13,
      "interpretation": "略低于 Table 5；未为配平而强制晋升。"
    },
    {
      "code": "T03_FOSSIL_HOMINID",
      "label": "Fossil hominid sites",
      "final": 7,
      "table5": 14,
      "diff": -7,
      "core": 1,
      "probable": 6,
      "candidate": 0,
      "interpretation": "略低于 Table 5；未为配平而强制晋升。"
    },
    {
      "code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
      "label": "Historic buildings and ensembles",
      "final": 394,
      "table5": 341,
      "diff": 53,
      "core": 184,
      "probable": 210,
      "candidate": 132,
      "interpretation": "高于 Table 5；多标签逻辑与保守降级规则共同影响。"
    },
    {
      "code": "T05_SETTLEMENTS",
      "label": "Urban and rural settlements / historic towns and villages",
      "final": 238,
      "table5": 269,
      "diff": -31,
      "core": 43,
      "probable": 195,
      "candidate": 113,
      "interpretation": "低于 Table 5；保留为后续复核与 post-2004 比较的诊断差异。"
    },
    {
      "code": "T06_VERNACULAR",
      "label": "Vernacular architecture",
      "final": 50,
      "table5": 57,
      "diff": -7,
      "core": 1,
      "probable": 49,
      "candidate": 10,
      "interpretation": "略低于 Table 5；未为配平而强制晋升。"
    },
    {
      "code": "T07_RELIGIOUS",
      "label": "Religious properties",
      "final": 268,
      "table5": 234,
      "diff": 34,
      "core": 40,
      "probable": 228,
      "candidate": 41,
      "interpretation": "高于 Table 5；多标签逻辑与保守降级规则共同影响。"
    },
    {
      "code": "T08_AGRI_INDUSTRIAL_TECH",
      "label": "Agricultural, industrial and technological properties",
      "final": 55,
      "table5": 69,
      "diff": -14,
      "core": 15,
      "probable": 40,
      "candidate": 14,
      "interpretation": "略低于 Table 5；未为配平而强制晋升。"
    },
    {
      "code": "T09_MILITARY",
      "label": "Military properties",
      "final": 74,
      "table5": 87,
      "diff": -13,
      "core": 12,
      "probable": 62,
      "candidate": 83,
      "interpretation": "略低于 Table 5；未为配平而强制晋升。"
    },
    {
      "code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
      "label": "Cultural landscapes, parks and gardens",
      "final": 109,
      "table5": 100,
      "diff": 9,
      "core": 50,
      "probable": 59,
      "candidate": 40,
      "interpretation": "略高于 Table 5；可接受的重建差异。"
    },
    {
      "code": "T11_CULTURAL_ROUTES",
      "label": "Cultural routes",
      "final": 11,
      "table5": 8,
      "diff": 3,
      "core": 6,
      "probable": 5,
      "candidate": 17,
      "interpretation": "略高于 Table 5；可接受的重建差异。"
    },
    {
      "code": "T12_BURIAL",
      "label": "Burial monuments and sites",
      "final": 48,
      "table5": 40,
      "diff": 8,
      "core": 3,
      "probable": 45,
      "candidate": 21,
      "interpretation": "略高于 Table 5；可接受的重建差异。"
    },
    {
      "code": "T13_SYMBOLIC_MEMORIAL",
      "label": "Symbolic properties and memorials",
      "final": 19,
      "table5": 21,
      "diff": -2,
      "core": 4,
      "probable": 15,
      "candidate": 134,
      "interpretation": "略低于 Table 5；未为配平而强制晋升。"
    },
    {
      "code": "T14_MODERN",
      "label": "Modern heritage",
      "final": 16,
      "table5": 15,
      "diff": 1,
      "core": 1,
      "probable": 15,
      "candidate": 21,
      "interpretation": "略高于 Table 5；可接受的重建差异。"
    }
  ],
  "complexProperties": [
    {
      "id": "970",
      "name": "Wachau Cultural Landscape",
      "count": 6,
      "codes": [
        "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "T01_ARCHAEOLOGICAL",
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T05_SETTLEMENTS",
        "T06_VERNACULAR",
        "T08_AGRI_INDUSTRIAL_TECH"
      ],
      "url": "https://whc.unesco.org/en/list/970"
    },
    {
      "id": "1027",
      "name": "Mining Area of the Great Copper Mountain in Falun",
      "count": 5,
      "codes": [
        "T08_AGRI_INDUSTRIAL_TECH",
        "T01_ARCHAEOLOGICAL",
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T05_SETTLEMENTS",
        "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      ],
      "url": "https://whc.unesco.org/en/list/1027"
    },
    {
      "id": "1140",
      "name": "Koutammakou, the Land of the Batammariba",
      "count": 5,
      "codes": [
        "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "T05_SETTLEMENTS",
        "T06_VERNACULAR",
        "T07_RELIGIOUS",
        "T08_AGRI_INDUSTRIAL_TECH"
      ],
      "url": "https://whc.unesco.org/en/list/1140"
    },
    {
      "id": "64",
      "name": "Tikal National Park",
      "count": 5,
      "codes": [
        "T01_ARCHAEOLOGICAL",
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T05_SETTLEMENTS",
        "T07_RELIGIOUS",
        "T13_SYMBOLIC_MEMORIAL"
      ],
      "url": "https://whc.unesco.org/en/list/64"
    }
  ],
  "t04t06t07Properties": [
    {
      "id": "58",
      "name": "Urnes Stave Church",
      "count": 3,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T06_VERNACULAR",
        "T07_RELIGIOUS"
      ],
      "url": "https://whc.unesco.org/en/list/58"
    },
    {
      "id": "99",
      "name": "Natural and Cultural Heritage of the Ohrid region",
      "count": 4,
      "codes": [
        "T01_ARCHAEOLOGICAL",
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T06_VERNACULAR",
        "T07_RELIGIOUS"
      ],
      "url": "https://whc.unesco.org/en/list/99"
    },
    {
      "id": "582",
      "name": "Old Rauma",
      "count": 3,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T06_VERNACULAR",
        "T07_RELIGIOUS"
      ],
      "url": "https://whc.unesco.org/en/list/582"
    },
    {
      "id": "596",
      "name": "Villages with Fortified Churches in Transylvania",
      "count": 4,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T06_VERNACULAR",
        "T07_RELIGIOUS",
        "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      ],
      "url": "https://whc.unesco.org/en/list/596"
    },
    {
      "id": "750",
      "name": "Ancient Ksour of Ouadane, Chinguetti, Tichitt and Oualata",
      "count": 4,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T05_SETTLEMENTS",
        "T06_VERNACULAR",
        "T07_RELIGIOUS"
      ],
      "url": "https://whc.unesco.org/en/list/750"
    },
    {
      "id": "762",
      "name": "Church Town of Gammelstad, Luleå",
      "count": 4,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T05_SETTLEMENTS",
        "T06_VERNACULAR",
        "T07_RELIGIOUS"
      ],
      "url": "https://whc.unesco.org/en/list/762"
    },
    {
      "id": "777",
      "name": "Monasteries of Haghpat and Sanahin",
      "count": 3,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T06_VERNACULAR",
        "T07_RELIGIOUS"
      ],
      "url": "https://whc.unesco.org/en/list/777"
    },
    {
      "id": "904",
      "name": "Wooden Churches of Maramureş",
      "count": 4,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T06_VERNACULAR",
        "T07_RELIGIOUS",
        "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      ],
      "url": "https://whc.unesco.org/en/list/904"
    },
    {
      "id": "971",
      "name": "Churches of Chiloé",
      "count": 3,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T06_VERNACULAR",
        "T07_RELIGIOUS"
      ],
      "url": "https://whc.unesco.org/en/list/971"
    },
    {
      "id": "1079",
      "name": "Franciscan Missions in the Sierra Gorda of Querétaro",
      "count": 3,
      "codes": [
        "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "T06_VERNACULAR",
        "T07_RELIGIOUS"
      ],
      "url": "https://whc.unesco.org/en/list/1079"
    }
  ],
  "calibration": [
    {
      "label": "T04 Historic buildings",
      "before": 399,
      "after": 394,
      "note": "保守降级；多数建筑/集合价值仍保留。"
    },
    {
      "label": "T05 Settlements",
      "before": 200,
      "after": 238,
      "note": "人工复核补回 historic city / settlement-scale 案例。"
    },
    {
      "label": "T06 Vernacular",
      "before": 25,
      "after": 50,
      "note": "扩展到传统建筑类型、材料与建造工艺。"
    },
    {
      "label": "T07 Religious",
      "before": 270,
      "after": 268,
      "note": "仅少量 incidental religious evidence 降级。"
    },
    {
      "label": "T13 Symbolic / memorial",
      "before": 11,
      "after": 19,
      "note": "严格二层逻辑后补回稳定象征/纪念案例。"
    }
  ],
  "typologyNetwork": {
    "typologies": [
      {
        "code": "T01_ARCHAEOLOGICAL",
        "label": "Archaeological heritage",
        "final": 166
      },
      {
        "code": "T02_ROCK_ART",
        "label": "Rock-art sites",
        "final": 23
      },
      {
        "code": "T03_FOSSIL_HOMINID",
        "label": "Fossil hominid sites",
        "final": 7
      },
      {
        "code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "label": "Historic buildings and ensembles",
        "final": 394
      },
      {
        "code": "T05_SETTLEMENTS",
        "label": "Urban and rural settlements / historic towns and villages",
        "final": 238
      },
      {
        "code": "T06_VERNACULAR",
        "label": "Vernacular architecture",
        "final": 50
      },
      {
        "code": "T07_RELIGIOUS",
        "label": "Religious properties",
        "final": 268
      },
      {
        "code": "T08_AGRI_INDUSTRIAL_TECH",
        "label": "Agricultural, industrial and technological properties",
        "final": 55
      },
      {
        "code": "T09_MILITARY",
        "label": "Military properties",
        "final": 74
      },
      {
        "code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "label": "Cultural landscapes, parks and gardens",
        "final": 109
      },
      {
        "code": "T11_CULTURAL_ROUTES",
        "label": "Cultural routes",
        "final": 11
      },
      {
        "code": "T12_BURIAL",
        "label": "Burial monuments and sites",
        "final": 48
      },
      {
        "code": "T13_SYMBOLIC_MEMORIAL",
        "label": "Symbolic properties and memorials",
        "final": 19
      },
      {
        "code": "T14_MODERN",
        "label": "Modern heritage",
        "final": 16
      }
    ],
    "properties": [
      {
        "id": "970",
        "name": "Wachau Cultural Landscape",
        "region": "Europe and North America",
        "count": 6,
        "codes": [
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T06_VERNACULAR",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/970"
      },
      {
        "id": "1140",
        "name": "Koutammakou, the Land of the Batammariba",
        "region": "Africa",
        "count": 5,
        "codes": [
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T05_SETTLEMENTS",
          "T06_VERNACULAR",
          "T07_RELIGIOUS",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/1140"
      },
      {
        "id": "64",
        "name": "Tikal National Park",
        "region": "Latin America and the Caribbean",
        "count": 5,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T13_SYMBOLIC_MEMORIAL"
        ],
        "url": "https://whc.unesco.org/en/list/64"
      },
      {
        "id": "1027",
        "name": "Mining Area of the Great Copper Mountain in Falun",
        "region": "Europe and North America",
        "count": 5,
        "codes": [
          "T08_AGRI_INDUSTRIAL_TECH",
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
        ],
        "url": "https://whc.unesco.org/en/list/1027"
      },
      {
        "id": "1137",
        "name": "Kernavė Archaeological Site (Cultural Reserve of Kernavė)",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T09_MILITARY"
        ],
        "url": "https://whc.unesco.org/en/list/1137"
      },
      {
        "id": "1026",
        "name": "Val d'Orcia",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T06_VERNACULAR",
          "T07_RELIGIOUS",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/1026"
      },
      {
        "id": "1101",
        "name": "Champaner-Pavagadh Archaeological Park",
        "region": "Asia and the Pacific",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T07_RELIGIOUS",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/1101"
      },
      {
        "id": "1145",
        "name": "Petroglyphs of the Archaeological Landscape of Tanbaly",
        "region": "Asia and the Pacific",
        "count": 4,
        "codes": [
          "T02_ROCK_ART",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T01_ARCHAEOLOGICAL",
          "T07_RELIGIOUS"
        ],
        "url": "https://whc.unesco.org/en/list/1145"
      },
      {
        "id": "514",
        "name": "Heart of Neolithic Orkney",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T12_BURIAL"
        ],
        "url": "https://whc.unesco.org/en/list/514"
      },
      {
        "id": "596",
        "name": "Villages with Fortified Churches in Transylvania",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T06_VERNACULAR",
          "T07_RELIGIOUS"
        ],
        "url": "https://whc.unesco.org/en/list/596"
      },
      {
        "id": "932",
        "name": "Jurisdiction of Saint-Emilion",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T07_RELIGIOUS",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T11_CULTURAL_ROUTES"
        ],
        "url": "https://whc.unesco.org/en/list/932"
      },
      {
        "id": "1208",
        "name": "Bam and its Cultural Landscape",
        "region": "Asia and the Pacific",
        "count": 4,
        "codes": [
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T11_CULTURAL_ROUTES",
          "T06_VERNACULAR",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/1208"
      },
      {
        "id": "277",
        "name": "Hatra",
        "region": "Arab States",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T09_MILITARY"
        ],
        "url": "https://whc.unesco.org/en/list/277"
      },
      {
        "id": "286",
        "name": "Vatican City",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T07_RELIGIOUS",
          "T05_SETTLEMENTS",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
        ],
        "url": "https://whc.unesco.org/en/list/286"
      },
      {
        "id": "314",
        "name": "Alhambra, Generalife and Albayzín, Granada",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T05_SETTLEMENTS",
          "T06_VERNACULAR",
          "T09_MILITARY",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
        ],
        "url": "https://whc.unesco.org/en/list/314"
      },
      {
        "id": "331",
        "name": "Medina of Marrakesh",
        "region": "Arab States",
        "count": 4,
        "codes": [
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T12_BURIAL"
        ],
        "url": "https://whc.unesco.org/en/list/331"
      },
      {
        "id": "353",
        "name": "Chaco Culture",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T05_SETTLEMENTS",
          "T06_VERNACULAR",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
        ],
        "url": "https://whc.unesco.org/en/list/353"
      },
      {
        "id": "357",
        "name": "Göreme National Park and the Rock Sites of Cappadocia",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T05_SETTLEMENTS",
          "T06_VERNACULAR",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
        ],
        "url": "https://whc.unesco.org/en/list/357"
      },
      {
        "id": "417",
        "name": "Ibiza, Biodiversity and Culture",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T09_MILITARY",
          "T01_ARCHAEOLOGICAL",
          "T05_SETTLEMENTS",
          "T12_BURIAL"
        ],
        "url": "https://whc.unesco.org/en/list/417"
      },
      {
        "id": "614",
        "name": "City of Safranbolu",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T07_RELIGIOUS",
          "T11_CULTURAL_ROUTES",
          "T14_MODERN"
        ],
        "url": "https://whc.unesco.org/en/list/614"
      },
      {
        "id": "618",
        "name": "Historic Town of Banská Štiavnica and the Technical Monuments in its Vicinity",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/618"
      },
      {
        "id": "773",
        "name": "Pyrénées - Mont Perdu",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/773"
      },
      {
        "id": "91",
        "name": "Historic Centre of Rome, the Properties of the Holy See in that City Enjoying Extraterritorial Rights and San Paolo Fuori le Mura",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T12_BURIAL"
        ],
        "url": "https://whc.unesco.org/en/list/91"
      },
      {
        "id": "97",
        "name": "Historical Complex of Split with the Palace of Diocletian",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T01_ARCHAEOLOGICAL",
          "T07_RELIGIOUS",
          "T09_MILITARY"
        ],
        "url": "https://whc.unesco.org/en/list/97"
      },
      {
        "id": "99",
        "name": "Natural and Cultural Heritage of the Ohrid region",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T07_RELIGIOUS",
          "T01_ARCHAEOLOGICAL",
          "T06_VERNACULAR"
        ],
        "url": "https://whc.unesco.org/en/list/99"
      },
      {
        "id": "1022",
        "name": "Tombs of Buganda Kings at Kasubi",
        "region": "Africa",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T08_AGRI_INDUSTRIAL_TECH",
          "T12_BURIAL",
          "T13_SYMBOLIC_MEMORIAL"
        ],
        "url": "https://whc.unesco.org/en/list/1022"
      },
      {
        "id": "1033",
        "name": "Historic Centre of Vienna",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T14_MODERN"
        ],
        "url": "https://whc.unesco.org/en/list/1033"
      },
      {
        "id": "1063",
        "name": "Tokaj Wine Region Historic Cultural Landscape",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T08_AGRI_INDUSTRIAL_TECH",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T05_SETTLEMENTS",
          "T06_VERNACULAR"
        ],
        "url": "https://whc.unesco.org/en/list/1063"
      },
      {
        "id": "140",
        "name": "Buddhist Ruins of Takht-i-Bahi and Neighbouring City Remains at Sahr-i-Bahlol",
        "region": "Asia and the Pacific",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T09_MILITARY"
        ],
        "url": "https://whc.unesco.org/en/list/140"
      },
      {
        "id": "174",
        "name": "Historic Centre of Florence",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T07_RELIGIOUS",
          "T05_SETTLEMENTS",
          "T13_SYMBOLIC_MEMORIAL"
        ],
        "url": "https://whc.unesco.org/en/list/174"
      },
      {
        "id": "180",
        "name": "National History Park – Citadel, Sans Souci, Ramiers",
        "region": "Latin America and the Caribbean",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T13_SYMBOLIC_MEMORIAL",
          "T09_MILITARY",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
        ],
        "url": "https://whc.unesco.org/en/list/180"
      },
      {
        "id": "217",
        "name": "Ancient City of Nessebar",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS"
        ],
        "url": "https://whc.unesco.org/en/list/217"
      },
      {
        "id": "233",
        "name": "Qutb Minar and its Monuments, Delhi",
        "region": "Asia and the Pacific",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T01_ARCHAEOLOGICAL",
          "T07_RELIGIOUS",
          "T12_BURIAL"
        ],
        "url": "https://whc.unesco.org/en/list/233"
      },
      {
        "id": "29",
        "name": "Historic Centre of Kraków",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T09_MILITARY"
        ],
        "url": "https://whc.unesco.org/en/list/29"
      },
      {
        "id": "348",
        "name": "Old Town of Ávila with its Extra-Muros Churches",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T05_SETTLEMENTS",
          "T09_MILITARY",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T07_RELIGIOUS"
        ],
        "url": "https://whc.unesco.org/en/list/348"
      },
      {
        "id": "481",
        "name": "Vat Phou and Associated Ancient Settlements within the Champasak Cultural Landscape",
        "region": "Asia and the Pacific",
        "count": 4,
        "codes": [
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS"
        ],
        "url": "https://whc.unesco.org/en/list/481"
      },
      {
        "id": "482",
        "name": "Historic Town of Guanajuato and Adjacent Mines",
        "region": "Latin America and the Caribbean",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/482"
      },
      {
        "id": "511",
        "name": "Archaeological Site of Mystras",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T09_MILITARY"
        ],
        "url": "https://whc.unesco.org/en/list/511"
      },
      {
        "id": "543",
        "name": "Itchan Kala",
        "region": "Asia and the Pacific",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T12_BURIAL"
        ],
        "url": "https://whc.unesco.org/en/list/543"
      },
      {
        "id": "546",
        "name": "Maulbronn Monastery Complex",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T08_AGRI_INDUSTRIAL_TECH",
          "T07_RELIGIOUS",
          "T09_MILITARY"
        ],
        "url": "https://whc.unesco.org/en/list/546"
      },
      {
        "id": "668",
        "name": "Angkor",
        "region": "Asia and the Pacific",
        "count": 4,
        "codes": [
          "T01_ARCHAEOLOGICAL",
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T07_RELIGIOUS",
          "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
        ],
        "url": "https://whc.unesco.org/en/list/668"
      },
      {
        "id": "732",
        "name": "Kutná Hora: Historical Town Centre with the Church of St Barbara and the Cathedral of Our Lady at Sedlec",
        "region": "Europe and North America",
        "count": 4,
        "codes": [
          "T04_HISTORIC_BUILDINGS_ENSEMBLES",
          "T05_SETTLEMENTS",
          "T07_RELIGIOUS",
          "T08_AGRI_INDUSTRIAL_TECH"
        ],
        "url": "https://whc.unesco.org/en/list/732"
      }
    ],
    "edges": [
      {
        "property_id": "970",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "970",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "970",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "970",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "970",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "970",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "1140",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "1140",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "1140",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "1140",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "1140",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "64",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "64",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "64",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "64",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "64",
        "typology_code": "T13_SYMBOLIC_MEMORIAL"
      },
      {
        "property_id": "1027",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "1027",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "1027",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "1027",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "1027",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "1137",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "1137",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "1137",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "1137",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "1026",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "1026",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "1026",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "1026",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "1101",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "1101",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "1101",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "1101",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "1145",
        "typology_code": "T02_ROCK_ART"
      },
      {
        "property_id": "1145",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "1145",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "1145",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "514",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "514",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "514",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "514",
        "typology_code": "T12_BURIAL"
      },
      {
        "property_id": "596",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "596",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "596",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "596",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "932",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "932",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "932",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "932",
        "typology_code": "T11_CULTURAL_ROUTES"
      },
      {
        "property_id": "1208",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "1208",
        "typology_code": "T11_CULTURAL_ROUTES"
      },
      {
        "property_id": "1208",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "1208",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "277",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "277",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "277",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "277",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "286",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "286",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "286",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "286",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "314",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "314",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "314",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "314",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "331",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "331",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "331",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "331",
        "typology_code": "T12_BURIAL"
      },
      {
        "property_id": "353",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "353",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "353",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "353",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "357",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "357",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "357",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "357",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "417",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "417",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "417",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "417",
        "typology_code": "T12_BURIAL"
      },
      {
        "property_id": "614",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "614",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "614",
        "typology_code": "T11_CULTURAL_ROUTES"
      },
      {
        "property_id": "614",
        "typology_code": "T14_MODERN"
      },
      {
        "property_id": "618",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "618",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "618",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "618",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "773",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "773",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "773",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "773",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "91",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "91",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "91",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "91",
        "typology_code": "T12_BURIAL"
      },
      {
        "property_id": "97",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "97",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "97",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "97",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "99",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "99",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "99",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "99",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "1022",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "1022",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "1022",
        "typology_code": "T12_BURIAL"
      },
      {
        "property_id": "1022",
        "typology_code": "T13_SYMBOLIC_MEMORIAL"
      },
      {
        "property_id": "1033",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "1033",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "1033",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "1033",
        "typology_code": "T14_MODERN"
      },
      {
        "property_id": "1063",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "1063",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "1063",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "1063",
        "typology_code": "T06_VERNACULAR"
      },
      {
        "property_id": "140",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "140",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "140",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "140",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "174",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "174",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "174",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "174",
        "typology_code": "T13_SYMBOLIC_MEMORIAL"
      },
      {
        "property_id": "180",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "180",
        "typology_code": "T13_SYMBOLIC_MEMORIAL"
      },
      {
        "property_id": "180",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "180",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "217",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "217",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "217",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "217",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "233",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "233",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "233",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "233",
        "typology_code": "T12_BURIAL"
      },
      {
        "property_id": "29",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "29",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "29",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "29",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "348",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "348",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "348",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "348",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "481",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "481",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "481",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "481",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "482",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "482",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "482",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "482",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "511",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "511",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "511",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "511",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "543",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "543",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "543",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "543",
        "typology_code": "T12_BURIAL"
      },
      {
        "property_id": "546",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "546",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      },
      {
        "property_id": "546",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "546",
        "typology_code": "T09_MILITARY"
      },
      {
        "property_id": "668",
        "typology_code": "T01_ARCHAEOLOGICAL"
      },
      {
        "property_id": "668",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "668",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "668",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS"
      },
      {
        "property_id": "732",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES"
      },
      {
        "property_id": "732",
        "typology_code": "T05_SETTLEMENTS"
      },
      {
        "property_id": "732",
        "typology_code": "T07_RELIGIOUS"
      },
      {
        "property_id": "732",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH"
      }
    ],
    "note": "Representative view: the 42 properties with the highest main typology counts are shown to keep the network legible."
  },
  "themeTypology": {
    "themes": [
      "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
      "Inhabited Urban Areas",
      "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
      "Castles, Palaces, Residences",
      "Significant Personalities",
      "Catholic Church",
      "Towns Which Are No Longer Inhabited",
      "Centres of Trade and Exchange of Goods",
      "Fortified Cities",
      "Associative Landscapes"
    ],
    "typologies": [
      {
        "code": "T01_ARCHAEOLOGICAL",
        "label": "Archaeological heritage"
      },
      {
        "code": "T02_ROCK_ART",
        "label": "Rock-art sites"
      },
      {
        "code": "T03_FOSSIL_HOMINID",
        "label": "Fossil hominid sites"
      },
      {
        "code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "label": "Historic buildings and ensembles"
      },
      {
        "code": "T05_SETTLEMENTS",
        "label": "Urban and rural settlements / historic towns and villages"
      },
      {
        "code": "T06_VERNACULAR",
        "label": "Vernacular architecture"
      },
      {
        "code": "T07_RELIGIOUS",
        "label": "Religious properties"
      },
      {
        "code": "T08_AGRI_INDUSTRIAL_TECH",
        "label": "Agricultural, industrial and technological properties"
      },
      {
        "code": "T09_MILITARY",
        "label": "Military properties"
      },
      {
        "code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "label": "Cultural landscapes, parks and gardens"
      },
      {
        "code": "T11_CULTURAL_ROUTES",
        "label": "Cultural routes"
      },
      {
        "code": "T12_BURIAL",
        "label": "Burial monuments and sites"
      },
      {
        "code": "T13_SYMBOLIC_MEMORIAL",
        "label": "Symbolic properties and memorials"
      },
      {
        "code": "T14_MODERN",
        "label": "Modern heritage"
      }
    ],
    "cells": [
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 64
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T02_ROCK_ART",
        "count": 3
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 202
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T05_SETTLEMENTS",
        "count": 80
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T06_VERNACULAR",
        "count": 12
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T07_RELIGIOUS",
        "count": 211
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH",
        "count": 8
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T09_MILITARY",
        "count": 17
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 25
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 4
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T12_BURIAL",
        "count": 45
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T13_SYMBOLIC_MEMORIAL",
        "count": 9
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T14_MODERN",
        "count": 2
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 16
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 94
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T05_SETTLEMENTS",
        "count": 96
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T06_VERNACULAR",
        "count": 11
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T07_RELIGIOUS",
        "count": 55
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH",
        "count": 6
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T09_MILITARY",
        "count": 26
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 9
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 4
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T12_BURIAL",
        "count": 9
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T13_SYMBOLIC_MEMORIAL",
        "count": 2
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T14_MODERN",
        "count": 4
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 9
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T02_ROCK_ART",
        "count": 1
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 79
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T05_SETTLEMENTS",
        "count": 27
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T06_VERNACULAR",
        "count": 4
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T07_RELIGIOUS",
        "count": 57
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH",
        "count": 1
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T09_MILITARY",
        "count": 5
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 14
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 1
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T12_BURIAL",
        "count": 8
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T13_SYMBOLIC_MEMORIAL",
        "count": 2
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T14_MODERN",
        "count": 1
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 14
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T02_ROCK_ART",
        "count": 1
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 54
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T05_SETTLEMENTS",
        "count": 23
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T06_VERNACULAR",
        "count": 3
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T07_RELIGIOUS",
        "count": 29
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T09_MILITARY",
        "count": 13
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 27
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 1
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T12_BURIAL",
        "count": 3
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T13_SYMBOLIC_MEMORIAL",
        "count": 3
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 7
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T02_ROCK_ART",
        "count": 1
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 51
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T05_SETTLEMENTS",
        "count": 19
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T06_VERNACULAR",
        "count": 1
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T07_RELIGIOUS",
        "count": 34
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH",
        "count": 3
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T09_MILITARY",
        "count": 5
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 8
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 3
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T12_BURIAL",
        "count": 7
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T13_SYMBOLIC_MEMORIAL",
        "count": 5
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T14_MODERN",
        "count": 4
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 7
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 56
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T05_SETTLEMENTS",
        "count": 13
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T06_VERNACULAR",
        "count": 3
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T07_RELIGIOUS",
        "count": 51
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH",
        "count": 1
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T09_MILITARY",
        "count": 8
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 4
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 1
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T12_BURIAL",
        "count": 5
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 44
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 24
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T05_SETTLEMENTS",
        "count": 29
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T06_VERNACULAR",
        "count": 1
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T07_RELIGIOUS",
        "count": 17
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T09_MILITARY",
        "count": 4
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 4
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T12_BURIAL",
        "count": 5
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T13_SYMBOLIC_MEMORIAL",
        "count": 3
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 19
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 32
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T05_SETTLEMENTS",
        "count": 37
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T06_VERNACULAR",
        "count": 7
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T07_RELIGIOUS",
        "count": 15
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH",
        "count": 2
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T09_MILITARY",
        "count": 8
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 3
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 3
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T12_BURIAL",
        "count": 3
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T13_SYMBOLIC_MEMORIAL",
        "count": 1
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T14_MODERN",
        "count": 1
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 9
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 32
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T05_SETTLEMENTS",
        "count": 40
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T06_VERNACULAR",
        "count": 3
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T07_RELIGIOUS",
        "count": 20
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH",
        "count": 1
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T09_MILITARY",
        "count": 31
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 2
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T12_BURIAL",
        "count": 2
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T14_MODERN",
        "count": 1
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 14
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T02_ROCK_ART",
        "count": 1
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 21
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T05_SETTLEMENTS",
        "count": 12
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T06_VERNACULAR",
        "count": 5
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T07_RELIGIOUS",
        "count": 17
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T08_AGRI_INDUSTRIAL_TECH",
        "count": 12
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 34
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T11_CULTURAL_ROUTES",
        "count": 2
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T12_BURIAL",
        "count": 3
      }
    ],
    "topPairs": [
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T07_RELIGIOUS",
        "count": 211
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 202
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T05_SETTLEMENTS",
        "count": 96
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 94
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T05_SETTLEMENTS",
        "count": 80
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 79
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 64
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "typology_code": "T07_RELIGIOUS",
        "count": 57
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 56
      },
      {
        "theme": "Inhabited Urban Areas",
        "typology_code": "T07_RELIGIOUS",
        "count": 55
      },
      {
        "theme": "Castles, Palaces, Residences",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 54
      },
      {
        "theme": "Catholic Church",
        "typology_code": "T07_RELIGIOUS",
        "count": 51
      },
      {
        "theme": "Significant Personalities",
        "typology_code": "T04_HISTORIC_BUILDINGS_ENSEMBLES",
        "count": 51
      },
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "typology_code": "T12_BURIAL",
        "count": 45
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "typology_code": "T01_ARCHAEOLOGICAL",
        "count": 44
      },
      {
        "theme": "Fortified Cities",
        "typology_code": "T05_SETTLEMENTS",
        "count": 40
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "typology_code": "T05_SETTLEMENTS",
        "count": 37
      },
      {
        "theme": "Associative Landscapes",
        "typology_code": "T10_CULTURAL_LANDSCAPES_PARKS_GARDENS",
        "count": 34
      }
    ],
    "note": "Theme assignments are Phase 1A published FTG item-level evidence; typology labels are Phase 2B.8b probable reconstruction main labels."
  },
  "themeRuleLearning": {
    "rows": [
      {
        "theme": "Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Religious and Commemorative Architecture (Temples, Synagogues, Churches, Mosques, Tombs, Cemeteries, Shrines, Memorials)",
        "property_count": 276,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 17,
        "exact_rate": 0.588,
        "broad_rate": 0.588,
        "guidance": "强指示词：religious and commemorative architecture、religious and commemorative architecture temples、synagogues、churches、mosques；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Inhabited Urban Areas",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Urban Settlements > Inhabited Urban Areas",
        "property_count": 127,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 13,
        "exact_rate": 0.385,
        "broad_rate": 0.769,
        "guidance": "强指示词：urban settlements、inhabited urban areas、centre、inhabited、medieval；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the evidence supports the exact settlement type, such as inhabited urban area, colonial town, abandoned town, or 19th/20th-century town."
      },
      {
        "theme": "Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Equipping Historic Buildings > Decoration, Wall Paintings, Sculpture, Stucco, Mosaics, and Furnishings",
        "property_count": 94,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 12,
        "exact_rate": 0.5,
        "broad_rate": 0.833,
        "guidance": "强指示词：equipping historic buildings、decoration、wall paintings、sculpture、stucco；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Castles, Palaces, Residences",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Castles, Palaces, Residences",
        "property_count": 72,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 11,
        "exact_rate": 0.273,
        "broad_rate": 0.909,
        "guidance": "强指示词：castles palaces residences、castles、palaces、residences、castles；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Significant Personalities",
        "path": "Expressions of Society > Cultural and Political Associations > Significant Personalities",
        "property_count": 68,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 23,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：cultural and political associations、significant personalities、personalities、political、significant；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Catholic Church",
        "path": "Spiritual Responses (Religions) > Christianity > Catholic Church",
        "property_count": 65,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 20,
        "exact_rate": 0.0,
        "broad_rate": 0.1,
        "guidance": "强指示词：christianity、catholic church、catholic、christianity、church；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Towns Which Are No Longer Inhabited",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Urban Settlements > Towns Which Are No Longer Inhabited",
        "property_count": 56,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "watchlist_only",
        "safety_label": "观察名单",
        "semantic_extension_risk": "yes",
        "tested": 12,
        "exact_rate": 0.25,
        "broad_rate": 0.833,
        "guidance": "强指示词：urban settlements、towns which are no longer inhabited、archaeological、greece、greek；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the evidence supports the exact settlement type, such as inhabited urban area, colonial town, abandoned town, or 19th/20th-century town."
      },
      {
        "theme": "Centres of Trade and Exchange of Goods",
        "path": "Movement of Peoples > Systems of Transportation and Trade > Centres of Trade and Exchange of Goods",
        "property_count": 53,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 30,
        "exact_rate": 0.033,
        "broad_rate": 0.1,
        "guidance": "强指示词：systems of transportation and trade、centres of trade and exchange of goods、centres、exchange、goods；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when evidence identifies a sustained movement system, route, exchange network, migration process, or coercive-labour history as central."
      },
      {
        "theme": "Fortified Cities",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Military Architecture > Fortified Cities",
        "property_count": 52,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 13,
        "exact_rate": 0.0,
        "broad_rate": 0.769,
        "guidance": "强指示词：military architecture、fortified cities、cities、fortifications、fortified；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Associative Landscapes",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Cultural Landscapes > Associative Landscapes",
        "property_count": 47,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 12,
        "exact_rate": 0.417,
        "broad_rate": 0.833,
        "guidance": "强指示词：cultural landscapes、associative landscapes、associative、landscape、landscapes；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the property evidence names the exact FTG landscape relationship, such as associative, designed, industrial, natural/seascape, or park/garden value."
      },
      {
        "theme": "Domestic Habitat",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Domestic Habitat",
        "property_count": 44,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 10,
        "exact_rate": 0.0,
        "broad_rate": 0.9,
        "guidance": "强指示词：domestic habitat、domestic、habitat、industrial；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Forts, Castles, Fortified Houses",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Military Architecture > Forts, Castles, Fortified Houses",
        "property_count": 44,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 9,
        "exact_rate": 0.333,
        "broad_rate": 1.0,
        "guidance": "强指示词：military architecture、forts castles fortified houses、forts、castles、fortified houses；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Colonial Towns",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Urban Settlements > Colonial Towns",
        "property_count": 39,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "watchlist_only",
        "safety_label": "观察名单",
        "semantic_extension_risk": "yes",
        "tested": 10,
        "exact_rate": 0.1,
        "broad_rate": 0.8,
        "guidance": "强指示词：urban settlements、colonial towns、brazil、colonial、fusion；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the evidence supports the exact settlement type, such as inhabited urban area, colonial town, abandoned town, or 19th/20th-century town."
      },
      {
        "theme": "Monumental Sculpture, Dolmens",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Monumental Sculpture, Dolmens",
        "property_count": 37,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 14,
        "exact_rate": 0.0,
        "broad_rate": 0.571,
        "guidance": "强指示词：monumental sculpture dolmens、monumental sculpture、dolmens、dolmens、monumental；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Rural Settlements",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Rural Settlements",
        "property_count": 32,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 9,
        "exact_rate": 0.0,
        "broad_rate": 0.778,
        "guidance": "强指示词：rural settlements、rural、settlements、villages；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Rock Art, Monumental Painting",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Rock Art, Monumental Painting",
        "property_count": 31,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 7,
        "exact_rate": 0.429,
        "broad_rate": 1.0,
        "guidance": "强指示词：rock art monumental painting、rock art、monumental painting、art、cave；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Buddhism in the West",
        "path": "Spiritual Responses (Religions) > Buddhism > Buddhism in the West",
        "property_count": 30,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "possible",
        "tested": 9,
        "exact_rate": 0.444,
        "broad_rate": 0.556,
        "guidance": "强指示词：buddhism、buddhism in the west、buddha、buddhism、buddhist；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Use only where the pre-2005 FTG pattern indicates Buddhist heritage in the relevant western-extension sense and the evidence clearly centers Buddhist religious value."
      },
      {
        "theme": "Crop and Flock Farming",
        "path": "Utilising Natural Resources > Agriculture and Food Production > Crop and Flock Farming",
        "property_count": 29,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 11,
        "exact_rate": 0.091,
        "broad_rate": 0.182,
        "guidance": "强指示词：agriculture and food production、crop and flock farming、agricultural、agriculture、crop；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Parks and Gardens",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Cultural Landscapes > Parks and Gardens",
        "property_count": 28,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "watchlist_only",
        "safety_label": "观察名单",
        "semantic_extension_risk": "yes",
        "tested": 8,
        "exact_rate": 0.0,
        "broad_rate": 0.75,
        "guidance": "强指示词：cultural landscapes、parks and gardens、garden、gardens、landscapes；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the property evidence names the exact FTG landscape relationship, such as associative, designed, industrial, natural/seascape, or park/garden value."
      },
      {
        "theme": "Educational and Public Buildings Aqueducts; Baths, Etc.) Aqueducs, Bains, Etc.)",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Educational and Public Buildings Aqueducts; Baths, Etc.) Aqueducs, Bains, Etc.)",
        "property_count": 27,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 10,
        "exact_rate": 0.1,
        "broad_rate": 0.6,
        "guidance": "强指示词：educational and public buildings aqueducts、baths、etc aqueducs、bains、etc；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Natural Environment, Seascapes",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Cultural Landscapes > Natural Environment, Seascapes",
        "property_count": 27,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "watchlist_only",
        "safety_label": "观察名单",
        "semantic_extension_risk": "yes",
        "tested": 8,
        "exact_rate": 0.0,
        "broad_rate": 0.75,
        "guidance": "强指示词：cultural landscapes、natural environment seascapes、natural environment、seascapes、environment；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the property evidence names the exact FTG landscape relationship, such as associative, designed, industrial, natural/seascape, or park/garden value."
      },
      {
        "theme": "Water Transport, Navigation, Harbours and Canals",
        "path": "Movement of Peoples > Systems of Transportation and Trade > Water Transport, Navigation, Harbours and Canals",
        "property_count": 27,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 18,
        "exact_rate": 0.0,
        "broad_rate": 0.056,
        "guidance": "强指示词：systems of transportation and trade、water transport navigation harbours and canals、water transport、navigation、harbours and canals；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when rail, road, water, harbour, canal, bridge, or urban transport is documented as a heritage system or defining technical achievement."
      },
      {
        "theme": "Commercial Architecture (Office Buildings, Banks, Warehouses, Etc.)",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Commercial Architecture (Office Buildings, Banks, Warehouses, Etc.)",
        "property_count": 26,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 7,
        "exact_rate": 0.143,
        "broad_rate": 0.857,
        "guidance": "强指示词：commercial architecture、commercial architecture office buildings、banks、warehouses、etc；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Industrial Architecture (Factories, Mines, Stores, Refineries; Power Plants; Water Management, Etc.) Etc.)",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Industrial Architecture (Factories, Mines, Stores, Refineries; Power Plants; Water Management, Etc.) Etc.)",
        "property_count": 25,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 5,
        "exact_rate": 0.4,
        "broad_rate": 1.0,
        "guidance": "强指示词：industrial architecture etc、industrial architecture factories、mines、stores、refineries；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Memorials",
        "path": "Expressions of Society > Cultural and Political Associations > Memorials",
        "property_count": 24,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 8,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：cultural and political associations、memorials、memorials、political；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Transport Structures (Roads, Ports, Canals, Bridges, Etc.)",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Transport Structures (Roads, Ports, Canals, Bridges, Etc.)",
        "property_count": 24,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 6,
        "exact_rate": 0.0,
        "broad_rate": 0.833,
        "guidance": "强指示词：transport structures、transport structures roads、ports、canals、bridges；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when rail, road, water, harbour, canal, bridge, or urban transport is documented as a heritage system or defining technical achievement."
      },
      {
        "theme": "Cave Dwellings",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Cave Dwellings",
        "property_count": 23,
        "stars": 4,
        "quality": "learned_well",
        "quality_label": "可小规模试用",
        "safety": "safe_for_small_pilot",
        "safety_label": "小规模试用",
        "semantic_extension_risk": "no",
        "tested": 7,
        "exact_rate": 0.571,
        "broad_rate": 0.714,
        "guidance": "强指示词：cave dwellings、cave、caves、dwellings、sanctuaries；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign when caves or rock-cut spaces function as dwellings or habitation complexes, with settlement or domestic use central to significance."
      },
      {
        "theme": "Orthodox Church",
        "path": "Spiritual Responses (Religions) > Christianity > Orthodox Church",
        "property_count": 21,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 9,
        "exact_rate": 0.222,
        "broad_rate": 0.333,
        "guidance": "强指示词：christianity、orthodox church、christianity、church、federation；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Pilgrimage Places and Places of Origin (E.G. Mythical)",
        "path": "Movement of Peoples > Cultural Routes > Pilgrimage Places and Places of Origin (E.G. Mythical)",
        "property_count": 21,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 14,
        "exact_rate": 0.0,
        "broad_rate": 0.071,
        "guidance": "强指示词：cultural routes、pilgrimage places and places of origin、islam、movement、origin；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when evidence identifies a sustained movement system, route, exchange network, migration process, or coercive-labour history as central."
      },
      {
        "theme": "Sacred Settlements",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Sacred Sites > Sacred Settlements",
        "property_count": 20,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 6,
        "exact_rate": 0.0,
        "broad_rate": 0.667,
        "guidance": "强指示词：sacred sites、sacred settlements、islam、sacred、settlements；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Pyramids, Obelisks, Minarets, Belfries",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Pyramids, Obelisks, Minarets, Belfries",
        "property_count": 19,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 6,
        "exact_rate": 0.167,
        "broad_rate": 0.667,
        "guidance": "强指示词：pyramids obelisks minarets belfries、pyramids、obelisks、minarets、belfries；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "The Shiah, Ismaili, Sufism",
        "path": "Spiritual Responses (Religions) > Islam > The Shiah, Ismaili, Sufism",
        "property_count": 18,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 8,
        "exact_rate": 0.0,
        "broad_rate": 0.25,
        "guidance": "强指示词：islam、the shiah ismaili sufism、the shiah、ismaili、sufism；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Indigenous Belief Systems in the Americas (Olmec, Inca, Maya, Etc.)",
        "path": "Spiritual Responses (Religions) > Ancient and Indigenous Belief Systems > Indigenous Belief Systems in the Americas (Olmec, Inca, Maya, Etc.)",
        "property_count": 17,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 9,
        "exact_rate": 0.111,
        "broad_rate": 0.111,
        "guidance": "强指示词：ancient and indigenous belief systems、indigenous belief systems in the americas、indigenous belief systems in the americas olmec、inca、maya；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Mining and Quarrying",
        "path": "Utilising Natural Resources > Mining and Quarrying",
        "property_count": 16,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 14,
        "exact_rate": 0.0,
        "broad_rate": 0.071,
        "guidance": "强指示词：mining and quarrying、gold、mines、mining、natural；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Works of Art and Collections",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Equipping Historic Buildings > Works of Art and Collections",
        "property_count": 16,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 8,
        "exact_rate": 0.0,
        "broad_rate": 0.5,
        "guidance": "强指示词：equipping historic buildings、works of art and collections、art、collections、equipping；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Confucianism, Taoism, Shintoism",
        "path": "Spiritual Responses (Religions) > Confucianism, Taoism, Shintoism",
        "property_count": 15,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 8,
        "exact_rate": 0.0,
        "broad_rate": 0.125,
        "guidance": "强指示词：confucianism taoism shintoism、confucianism、taoism、shintoism、chinese；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Manufacturing",
        "path": "Utilising Natural Resources > Manufacturing",
        "property_count": 14,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 4,
        "exact_rate": 0.25,
        "broad_rate": 0.25,
        "guidance": "强指示词：manufacturing、difficulty、housing、iron、manufacturing；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Recreational Architecture (Theatres, Auditoriums, Athletic Facilities, Museums, Libraries, Depositories, Etc.)",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Recreational Architecture (Theatres, Auditoriums, Athletic Facilities, Museums, Libraries, Depositories, Etc.)",
        "property_count": 14,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 5,
        "exact_rate": 0.0,
        "broad_rate": 0.6,
        "guidance": "强指示词：recreational architecture、recreational architecture theatres、auditoriums、athletic facilities、museums；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Ancient Mediterranean (Greek, Hellenistic, Roman)",
        "path": "Spiritual Responses (Religions) > Ancient and Indigenous Belief Systems > Ancient Mediterranean (Greek, Hellenistic, Roman)",
        "property_count": 13,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 9,
        "exact_rate": 0.111,
        "broad_rate": 0.111,
        "guidance": "强指示词：ancient and indigenous belief systems、ancient mediterranean、ancient mediterranean greek、hellenistic、roman；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Early Christian Church; Ethiopian Christianity",
        "path": "Spiritual Responses (Religions) > Christianity > Early Christian Church; Ethiopian Christianity",
        "property_count": 13,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 4,
        "exact_rate": 0.25,
        "broad_rate": 0.5,
        "guidance": "强指示词：christianity、early christian church ethiopian christianity、early christian church、ethiopian christianity、baptistery；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Identity",
        "path": "Expressions of Society > Cultural and Political Associations > Identity",
        "property_count": 13,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 9,
        "exact_rate": 0.111,
        "broad_rate": 0.111,
        "guidance": "强指示词：cultural and political associations、identity、democracy、dwelling、freedom；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Infrastructures (Water-Supply, Sanitation, Electric Power, Etc.)",
        "path": "Developing Technologies > Technology in Urban Community > Infrastructures (Water-Supply, Sanitation, Electric Power, Etc.)",
        "property_count": 12,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 8,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：technology in urban community、infrastructures、infrastructures water supply、sanitation、electric power；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Philosophy and Science",
        "path": "Expressions of Society > Developing Knowledge > Philosophy and Science",
        "property_count": 12,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 6,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：developing knowledge、philosophy and science、developing、humanism、knowledge；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Sikhism, Parsiism",
        "path": "Spiritual Responses (Religions) > Hinduism and Related Religions > Sikhism, Parsiism",
        "property_count": 12,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 5,
        "exact_rate": 0.2,
        "broad_rate": 0.4,
        "guidance": "强指示词：hinduism and related religions、sikhism parsiism、sikhism、parsiism、hindu；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Language, Oral Traditions, Myths, Song-Lines",
        "path": "Expressions of Society > Interacting and Communicating > Language, Oral Traditions, Myths, Song-Lines",
        "property_count": 11,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 5,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：interacting and communicating、language oral traditions myths song lines、language、oral traditions、myths；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Caravan Routes and Oases",
        "path": "Movement of Peoples > Systems of Transportation and Trade > Caravan Routes and Oases",
        "property_count": 10,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "watchlist_only",
        "safety_label": "观察名单",
        "semantic_extension_risk": "yes",
        "tested": 4,
        "exact_rate": 0.5,
        "broad_rate": 0.5,
        "guidance": "强指示词：systems of transportation and trade、caravan routes and oases、caravan、caravans、crossing；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when evidence identifies a sustained movement system, route, exchange network, migration process, or coercive-labour history as central."
      },
      {
        "theme": "Governmental and Public Buildings (Town Halls, Capitols, Courthouses, Post Offices; Main Public Squares) Pales)",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Governmental and Public Buildings (Town Halls, Capitols, Courthouses, Post Offices; Main Public Squares) Pales)",
        "property_count": 9,
        "stars": 2,
        "quality": "noisy_indicators",
        "quality_label": "需严格复核",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 2,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：governmental and public buildings pales、governmental and public buildings town halls、capitols、courthouses、post offices；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Require direct evidence for town halls, capitols, courthouses, post offices, main public squares, or comparable civic/administrative institutional buildings."
      },
      {
        "theme": "Writing, Inscriptions, Manuscripts, Archives",
        "path": "Developing Technologies > Processing Information and Communicating > Writing, Inscriptions, Manuscripts, Archives",
        "property_count": 9,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 2,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：processing information and communicating、writing inscriptions manuscripts archives、writing、inscriptions、manuscripts；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Indigenous Belief Systems in Africa",
        "path": "Spiritual Responses (Religions) > Ancient and Indigenous Belief Systems > Indigenous Belief Systems in Africa",
        "property_count": 8,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 5,
        "exact_rate": 0.2,
        "broad_rate": 0.2,
        "guidance": "强指示词：ancient and indigenous belief systems、indigenous belief systems in africa、africa、ancient、belief；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Astrology and Astronomy",
        "path": "Developing Technologies > Processing Information and Communicating > Astrology and Astronomy",
        "property_count": 7,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 3,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：processing information and communicating、astrology and astronomy、astrology、astronomical、astronomy；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Indigenous Belief Systems in Europe",
        "path": "Spiritual Responses (Religions) > Ancient and Indigenous Belief Systems > Indigenous Belief Systems in Europe",
        "property_count": 7,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 3,
        "exact_rate": 0.0,
        "broad_rate": 0.333,
        "guidance": "强指示词：ancient and indigenous belief systems、indigenous belief systems in europe、ancient、belief、circles；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Irrigation Systems",
        "path": "Utilising Natural Resources > Agriculture and Food Production > Irrigation Systems",
        "property_count": 7,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 6,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：agriculture and food production、irrigation systems、agriculture、food、irrigation；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Judaism",
        "path": "Spiritual Responses (Religions) > Judaism",
        "property_count": 7,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "no",
        "tested": 2,
        "exact_rate": 0.5,
        "broad_rate": 0.5,
        "guidance": "强指示词：judaism、foot、jewish、judaism、religions；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Literature, Artistic References, and Theatre",
        "path": "Expressions of Society > Interacting and Communicating > Literature, Artistic References, and Theatre",
        "property_count": 7,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 3,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：interacting and communicating、literature artistic references and theatre、literature、artistic references、and theatre；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Slavery",
        "path": "Movement of Peoples > Migration > Slavery",
        "property_count": 7,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 4,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：migration、slavery、independence、liberty、migration；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when evidence identifies a sustained movement system, route, exchange network, migration process, or coercive-labour history as central."
      },
      {
        "theme": "Agricultural Architecture (Farms, Barns, Stables, Silos, Etc.)",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Agricultural Architecture (Farms, Barns, Stables, Silos, Etc.)",
        "property_count": 6,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "candidate_generation_only",
        "safety_label": "候选生成",
        "semantic_extension_risk": "possible",
        "tested": 3,
        "exact_rate": 0.0,
        "broad_rate": 0.667,
        "guidance": "强指示词：agricultural architecture、agricultural architecture farms、barns、stables、silos；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Require explicit agricultural-building evidence such as farms, barns, stables, silos, estates, or production buildings, not merely an agricultural landscape."
      },
      {
        "theme": "Ancient Middle East and Egypt (Mesopotamia, Iran)",
        "path": "Spiritual Responses (Religions) > Ancient and Indigenous Belief Systems > Ancient Middle East and Egypt (Mesopotamia, Iran)",
        "property_count": 6,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 8,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：ancient and indigenous belief systems、ancient middle east and egypt、ancient middle east and egypt mesopotamia、iran、ancient；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Human Health",
        "path": "Expressions of Society > Developing Knowledge > Human Health",
        "property_count": 6,
        "stars": 2,
        "quality": "weak_rule",
        "quality_label": "弱规则",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 5,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：developing knowledge、human health、apollo、developing、healing；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Industrial Landscapes",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Cultural Landscapes > Industrial Landscapes",
        "property_count": 6,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "watchlist_only",
        "safety_label": "观察名单",
        "semantic_extension_risk": "yes",
        "tested": 2,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：cultural landscapes、industrial landscapes、industrial、landscapes、working；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the property evidence names the exact FTG landscape relationship, such as associative, designed, industrial, natural/seascape, or park/garden value."
      },
      {
        "theme": "Pilgrimage Routes, Commercial and Trade Routes; Heritage Routes",
        "path": "Movement of Peoples > Cultural Routes > Pilgrimage Routes, Commercial and Trade Routes; Heritage Routes",
        "property_count": 6,
        "stars": 3,
        "quality": "usable_but_needs_thresholds",
        "quality_label": "可生成候选",
        "safety": "watchlist_only",
        "safety_label": "观察名单",
        "semantic_extension_risk": "yes",
        "tested": 3,
        "exact_rate": 0.333,
        "broad_rate": 0.333,
        "guidance": "强指示词：cultural routes、pilgrimage routes、commercial and trade routes、heritage routes、commercial；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when evidence identifies a sustained movement system, route, exchange network, migration process, or coercive-labour history as central."
      },
      {
        "theme": "Fittings (Windows, Doors, Etc.), Special Functional Features or Facilities Installations",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Equipping Historic Buildings > Fittings (Windows, Doors, Etc.), Special Functional Features or Facilities Installations",
        "property_count": 5,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：equipping historic buildings、fittings special functional features or facilities installations、fittings windows、doors、etc；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Hunting, Gathering, and Fishing",
        "path": "Utilising Natural Resources > Agriculture and Food Production > Hunting, Gathering, and Fishing",
        "property_count": 5,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 5,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：agriculture and food production、hunting gathering and fishing、hunting、gathering、and fishing；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Protestantism",
        "path": "Spiritual Responses (Religions) > Christianity > Protestantism",
        "property_count": 5,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 2,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：christianity、protestantism、christianity、luther、lutheran；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Towns Established in the 19th and 20th Centuries",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Urban Settlements > Towns Established in the 19th and 20th Centuries",
        "property_count": 5,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：urban settlements、established、settlements、towns、urban；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the evidence supports the exact settlement type, such as inhabited urban area, colonial town, abandoned town, or 19th/20th-century town."
      },
      {
        "theme": "Botanical and Zoological Gardens",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Cultural Landscapes > Botanical and Zoological Gardens",
        "property_count": 4,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：cultural landscapes、botanical and zoological gardens、botanic、botanical、botany；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the property evidence names the exact FTG landscape relationship, such as associative, designed, industrial, natural/seascape, or park/garden value."
      },
      {
        "theme": "Cemeteries, Necropolises",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Sacred Sites > Cemeteries, Necropolises",
        "property_count": 4,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：sacred sites、cemeteries necropolises、cemeteries、necropolises、barkal；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Fortified Boundaries",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Military Architecture > Fortified Boundaries",
        "property_count": 4,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 3,
        "exact_rate": 0.0,
        "broad_rate": 0.333,
        "guidance": "强指示词：military architecture、fortified boundaries、boundaries、defense、ditches；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Land Road Transport, Bridges",
        "path": "Movement of Peoples > Systems of Transportation and Trade > Land Road Transport, Bridges",
        "property_count": 4,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：systems of transportation and trade、land road transport bridges、land road transport、bridges、austere-looking；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when rail, road, water, harbour, canal, bridge, or urban transport is documented as a heritage system or defining technical achievement."
      },
      {
        "theme": "Music, Dance, Sports",
        "path": "Expressions of Society > Interacting and Communicating > Music, Dance, Sports",
        "property_count": 4,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 4,
        "exact_rate": 0.25,
        "broad_rate": 0.25,
        "guidance": "强指示词：interacting and communicating、music dance sports、music、dance、sports；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Railroads and Railroad Stations, Tunnels, Viaducts",
        "path": "Movement of Peoples > Systems of Transportation and Trade > Railroads and Railroad Stations, Tunnels, Viaducts",
        "property_count": 4,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 2,
        "exact_rate": 0.5,
        "broad_rate": 0.5,
        "guidance": "强指示词：systems of transportation and trade、railroads and railroad stations tunnels viaducts、railroads and railroad stations、tunnels、viaducts；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when rail, road, water, harbour, canal, bridge, or urban transport is documented as a heritage system or defining technical achievement."
      },
      {
        "theme": "Indigenous Belief Systems in Asia and the Pacific",
        "path": "Spiritual Responses (Religions) > Ancient and Indigenous Belief Systems > Indigenous Belief Systems in Asia and the Pacific",
        "property_count": 3,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 1,
        "exact_rate": 1.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：ancient and indigenous belief systems、active、ancient、asia、belief；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Sacred Mountains",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Sacred Sites > Sacred Mountains",
        "property_count": 3,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：sacred sites、sacred mountains、beliefs、children、means；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Wind Power, Windmills",
        "path": "Developing Technologies > Converting and Utilising Energy > Wind Power, Windmills",
        "property_count": 3,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：converting and utilising energy、wind power windmills、wind power、windmills、converting；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Law and Justice",
        "path": "Expressions of Society > Developing Knowledge > Law and Justice",
        "property_count": 2,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 5,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：developing knowledge、law and justice、constitution、declaration、developing；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the value statement makes the association, knowledge system, identity function, or commemorative meaning central rather than incidental."
      },
      {
        "theme": "Nomadism and Transhumance",
        "path": "Movement of Peoples > Nomadism and Transhumance",
        "property_count": 2,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 0.0,
        "guidance": "强指示词：nomadism and transhumance、caravans、centred、chinguetti、crossing；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when evidence identifies a sustained movement system, route, exchange network, migration process, or coercive-labour history as central."
      },
      {
        "theme": "Sacred Forests and Sacred Trees",
        "path": "Creative Responses and Continuity (Monuments, Groups of Buildings and Sites) > Sacred Sites > Sacred Forests and Sacred Trees",
        "property_count": 2,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 1,
        "exact_rate": 0.0,
        "broad_rate": 1.0,
        "guidance": "强指示词：sacred sites、sacred forests and sacred trees、accessible、anuradhapura、buddha's；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      },
      {
        "theme": "Water Energy, Water as Power Source, Watermills, Dam Construction, Water Management",
        "path": "Developing Technologies > Converting and Utilising Energy > Water Energy, Water as Power Source, Watermills, Dam Construction, Water Management",
        "property_count": 2,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": 4,
        "exact_rate": 0.0,
        "broad_rate": 0.25,
        "guidance": "强指示词：converting and utilising energy、water energy、water as power source、watermills、dam construction；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Colonisation",
        "path": "Movement of Peoples > Colonisation",
        "property_count": 1,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": null,
        "exact_rate": null,
        "broad_rate": null,
        "guidance": "强指示词：colonisation、amerindian、arriving、bahia、brightly；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when evidence identifies a sustained movement system, route, exchange network, migration process, or coercive-labour history as central."
      },
      {
        "theme": "Steam, Coal, Gas, Petroleum, Electric Power, Etc.",
        "path": "Developing Technologies > Converting and Utilising Energy > Steam, Coal, Gas, Petroleum, Electric Power, Etc.",
        "property_count": 1,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": null,
        "exact_rate": null,
        "broad_rate": null,
        "guidance": "强指示词：converting and utilising energy、steam coal gas petroleum electric power etc、steam、coal、gas；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Urban Transportation Systems",
        "path": "Developing Technologies > Technology in Urban Community > Urban Transportation Systems",
        "property_count": 1,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "yes",
        "tested": null,
        "exact_rate": null,
        "broad_rate": null,
        "guidance": "强指示词：technology in urban community、urban transportation systems、amphitheatre-like、chile、community；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the OUV evidence identifies a specific production, energy, water, manufacturing, mining, communication, or infrastructure system as heritage value."
      },
      {
        "theme": "Zoroastrianism",
        "path": "Spiritual Responses (Religions) > Zoroastrianism",
        "property_count": 1,
        "stars": 1,
        "quality": "too_sparse",
        "quality_label": "样本过少",
        "safety": "human_only",
        "safety_label": "仅人工判断",
        "semantic_extension_risk": "no",
        "tested": null,
        "exact_rate": null,
        "broad_rate": null,
        "guidance": "强指示词：zoroastrianism、anahita、general、ilkhanid、mongol；误判警告：Do not assign from level-1 theme alone.；Do not assign from criteria alone without named thematic evidence.",
        "assignment_rule": "Assign only when the exact FTG category path has direct evidence in title, description, criteria justification, or co-theme context."
      }
    ],
    "qualityCounts": {
      "usable_but_needs_thresholds": 24,
      "weak_rule": 22,
      "too_sparse": 21,
      "noisy_indicators": 13,
      "learned_well": 1
    },
    "safetyCounts": {
      "human_only": 48,
      "candidate_generation_only": 25,
      "watchlist_only": 7,
      "safe_for_small_pilot": 1
    },
    "tierLogic": [
      {
        "stars": 4,
        "label": "可小规模试用",
        "logic": "样本和边界较清楚，可用于 post-2004 小规模试验。"
      },
      {
        "stars": 3,
        "label": "可生成候选",
        "logic": "能形成经验规则，但需阈值和人工复核。"
      },
      {
        "stars": 2,
        "label": "需严格复核",
        "logic": "指标噪声较大或规则较弱，只适合作为线索。"
      },
      {
        "stars": 1,
        "label": "暂不自动使用",
        "logic": "案例过少或语义漂移风险高，应以人工判断为主。"
      }
    ]
  },
  "downloads": [
    {
      "label": "Final typology label assignments",
      "href": "data/phase2b_8b_typology_label_assignments.csv"
    },
    {
      "label": "Property typology summary",
      "href": "data/phase2b_8b_property_typology_summary.csv"
    },
    {
      "label": "Typology distribution",
      "href": "data/phase2b_8b_typology_distribution.csv"
    },
    {
      "label": "Candidate and associative hints",
      "href": "data/phase2b_8b_candidate_and_associative_hints.csv"
    },
    {
      "label": "Final method note",
      "href": "data/phase2b_8b_final_method_note.md"
    },
    {
      "label": "Final spot-check report",
      "href": "data/phase2b_8b_final_spot_check_report.md"
    }
  ],
  "reportExtracts": {
    "spotCheckFirstLine": "# Phase 2B.8b Final Spot-Check Report",
    "readinessFirstLine": "# Phase 2B.8b Freeze Readiness Report"
  }
};
