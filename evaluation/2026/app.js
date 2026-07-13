const STORAGE_KEY = "whc48_icomos_research_workspace_v1";
const STORAGE_BACKUP_KEY = `${STORAGE_KEY}_backups`;
const APP_VERSION_LABEL = "1.0";
const RESEARCH_APP_BASE_PATH = (window.__RESEARCH_APP_BASE__ || "").replace(/\/+$/, "");
const LEGACY_STORAGE_ORIGINS = [
  "http://127.0.0.1:4173",
  "http://127.0.0.1:4174",
  "http://127.0.0.1:4175",
  "http://127.0.0.1:4180",
  "http://localhost:4173",
  "http://localhost:4174",
  "http://localhost:4175",
  "http://localhost:4180",
];

function appPath(path = "/") {
  if (!path || /^(https?:|mailto:|#)/.test(path)) return path;
  if (!path.startsWith("/")) return path;
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${RESEARCH_APP_BASE_PATH}${normalized}` || normalized;
}

function routePath(pathname = window.location.pathname) {
  let path = pathname || "/";
  if (RESEARCH_APP_BASE_PATH && path.startsWith(RESEARCH_APP_BASE_PATH)) {
    path = path.slice(RESEARCH_APP_BASE_PATH.length) || "/";
  }
  path = path.replace(/\/+$/, "") || "/";
  return path;
}

function assetPath(path = "") {
  if (!path || /^(https?:|mailto:|blob:|data:|#)/.test(path)) return path;
  return path.startsWith("/") ? path.slice(1) : path;
}

const assessmentItems = [
  ["comparative_analysis", "Comparative analysis", "比较分析"],
  ["integrity", "Integrity", "完整性"],
  ["authenticity", "Authenticity", "真实性"],
  ["criteria", "Criteria", "标准"],
  ["serial_selection", "Serial selection", "系列遗产选择"],
  ["boundaries", "Boundaries", "边界"],
  ["protection_property", "Protection of property", "遗产本体保护"],
  ["protection_buffer_zone", "Protection of buffer zone", "缓冲区保护"],
  ["conservation", "Conservation Measures", "保护措施与监测"],
  ["management", "Protection and management", "保护与管理"],
  ["threats_addressed", "Threats addressed", "威胁应对"],
  ["mission_required", "Mission required", "是否需要任务组"],
  ["conclusion", "Conclusion", "结论"],
].map(([item_key, label_en, label_zh], index) => ({ item_key, label_en, label_zh, display_order: index + 1 }));

const pmItemKeys = ["protection_property", "protection_buffer_zone", "conservation", "management", "threats_addressed"];
const officialRatingItemKeys = assessmentItems
  .map((item) => item.item_key)
  .filter((itemKey) => !["criteria", "mission_required", "conclusion"].includes(itemKey));

const UNESCO_REGIONS = [
  "Africa",
  "Arab States",
  "Asia and the Pacific",
  "Europe and North America",
  "Latin America and the Caribbean",
];

const ICOMOS_RECOMMENDATION_CATEGORIES = ["Approval", "Inscription", "Referral", "Deferral", "Non-inscription", "Withdrawal"];
const COMMITTEE_DECISION_OPTIONS = ["", "Inscription", "Referral", "Deferral", "Non-inscription", "Approval", "Withdrawal", "Other"];
const NOMINATION_TYPE_CATEGORIES = [
  "New nomination",
  "Emergency nomination",
  "Re-nomination",
  "Referred back nomination",
  "Significant boundary modification",
  "Minor boundary modification",
  "Extension",
  "Withdrawal",
  "待校核",
];
const CATEGORY_OF_PROPERTY_VALUES = ["monument", "group of buildings", "site", "cultural landscape", "mixed category", "待抽取"];
const WORLD_HERITAGE_CRITERIA = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

const ratingOptions = [
  ["check", "✓"],
  ["tilde", "〜"],
  ["circle", "〇"],
  ["cross", "✕"],
  ["not_applicable", "N/A"],
  ["unknown", "?"],
];

const levelToRating = { A: "check", B: "tilde", C: "circle", D: "cross", unknown: "unknown" };
const ratingGlyph = { check: "✓", tilde: "〜", circle: "〇", cross: "✕", not_applicable: "N/A", unknown: "?" };
const ratingLevel = { check: "A", tilde: "B", circle: "C", cross: "D", not_applicable: "N/A", unknown: "?" };

const jingdezhenBriefSynthesisEn =
  "The Jingdezhen Handicraft Porcelain Industry Sites are located in an area with rich reserves of porcelain stone, kaolin clay, firewood forests and water transportation. Five component parts represent the handicraft porcelain industry system of Jingdezhen from the 10th to the 19th century. Together they exhibit the innovative development of Chinese porcelain making technology and porcelain art that had a profound impact on the development of the ceramic industry of the world.\n\nFrom the 10th to the 13th centuries integration of the porcelain-making technologies of northern and southern China achieved the stable production of bluish-white porcelain and laid the foundation for Jingdezhen to develop into a Chinese porcelain production centre. In the 13th-15th centuries, innovations included the “binary formula” (mixing porcelain stone with kaolin), new kiln forms, and the use of imported cobalt pigments to produce the blue-and-white porcelain. From the 16th century, Jingdezhen was the handicraft porcelain production centre of the world, supported by a complex industrial structure that connected porcelain manufacturing and sales centres with raw material and firewood production areas via a waterway transportation system.\n\nThe Jingdezhen Handicraft Porcelain Industry Sites bear witness to the formation of a large-scale intensive production model characterised by an industrial chain with fine divisions of labour, standardisation and specialisation, leading to a capacity for high quality porcelain. Through the advancement of production technologies and industrial organisation, Jingdezhen maintained its position as the porcelain production centre of the world from the 16th century, promoting the widespread dissemination of Chinese porcelain making technology, art and products around the world.";

const jingdezhenBriefSynthesisZh =
  "景德镇手工瓷业遗存位于瓷石、高岭土、柴薪林和水运资源丰富的地区。五个组成部分共同呈现 10 至 19 世纪景德镇手工瓷业体系，展现了中国制瓷技术和陶瓷艺术的创新发展，并对世界陶瓷工业产生深远影响。\n\n10 至 13 世纪，南北方制瓷技术在此融合，实现青白瓷的稳定生产，奠定景德镇发展为中国瓷业中心的基础。13 至 15 世纪，景德镇出现“二元配方”（瓷石与高岭土混合）、新窑型以及使用进口钴料烧造青花瓷等创新。16 世纪起，景德镇成为世界手工瓷业生产中心，以水路交通系统连接瓷器制造与销售中心、原料产地和柴薪产区，形成复杂的产业结构。\n\n遗存见证了以精细分工、标准化和专业化为特征的大规模集约生产模式，并凭借生产技术和产业组织的推进，自 16 世纪起保持世界瓷业生产中心地位，推动中国制瓷技术、艺术和产品在全球传播。";

const jingdezhenRecommendationCriteria = {
  ii: {
    source:
      "The Jingdezhen Handicraft Porcelain Industry Sites demonstrate global exchanges in porcelain-making technologies and art, and innovations in porcelain production from the 10th to the 19th centuries. The Hutian Ancient Kiln Site portrays the integration of porcelain-making technologies for bluish-white porcelain from the north and south of China from the 10th-13th centuries. The development of technologies at Jingdezhen during the 13th-19th centuries combined traditional Chinese porcelain-making with Middle Eastern, Chinese and European pigments, and a fusion of Chinese and foreign decorative techniques to produce blue-and-white, enamel and famille-rose porcelain. The “binary formula” technology attracted widespread attention and was an important inspiration and influence on the development of high-temperature hard-paste porcelain technology in Europe during the 18th century. Jingdezhen became a world porcelain production centre from the 16th-18th centuries, with its artistic styles studied and imitated all over the world.",
    translation:
      "景德镇手工瓷业遗存展示了 10 至 19 世纪制瓷技术与艺术的全球交流和生产创新。湖田古窑址体现了 10 至 13 世纪中国南北方青白瓷技术的融合；13 至 19 世纪，景德镇技术发展结合中东、中国和欧洲颜料以及中外装饰技法，生产青花、珐琅彩和粉彩瓷。“二元配方”技术受到广泛关注，并对 18 世纪欧洲高温硬质瓷技术发展产生重要启发和影响。16 至 18 世纪，景德镇成为世界瓷器生产中心，其艺术风格在全球被研究和仿效。",
  },
  iii: {
    source:
      "The Jingdezhen Handicraft Porcelain Industry Sites exhibit the continuous production process of the porcelain industry from the 10th to the 19th centuries and a complete industrial pattern including the social organisation of production. The five component parts provide a testimony to the tradition of Chinese handicraft porcelain industry.",
    translation:
      "景德镇手工瓷业遗存展示了 10 至 19 世纪瓷业连续生产过程，以及包括生产社会组织在内的完整产业格局。五个组成部分共同见证了中国手工瓷业传统。",
  },
  iv: {
    source:
      "The Jingdezhen Handicraft Porcelain Industry Sites are a technological ensemble that illustrates important stages in the development of the handicraft porcelain industry, an outstanding example of innovation in global porcelain technologies, art and industrial organisation from the 13th to the 19th centuries. The uses of raw materials at Jingdezhen, the “binary formula” technology, modelling technologies, kiln designs, and innovations in underglaze and overglaze decoration techniques enriched the diversity of porcelain shapes and decorative styles. The large-scale industrial spatial layout, division of labour, and specialised and standardised production model enabled the efficient and high-quality porcelain production at Jingdezhen.",
    translation:
      "景德镇手工瓷业遗存是展示手工瓷业发展重要阶段的技术组合，是 13 至 19 世纪全球瓷器技术、艺术和产业组织创新的杰出例证。景德镇对原料的使用、“二元配方”技术、成型技术、窑炉设计以及釉下和釉上装饰技术创新，丰富了瓷器造型和装饰风格的多样性。大规模产业空间布局、劳动分工以及专业化、标准化生产模式，使景德镇能够高效生产高质量瓷器。",
  },
  vi: {
    source:
      "As an important vehicle of Chinese culture and an important symbol of Oriental art, evidence of blue-and-white porcelain of Jingdezhen establishes a direct association with European decorative art from the 17th-18th centuries. As a global high-end trade commodity, the blue-and-white porcelain of Jingdezhen is one of the core elements of “chinoiserie” that was popular in Europe. These artistic elements were widely collected and used in pattern design, painting, furniture, architectural decoration and other fields, with porcelain serving as a medium to promote the global expression of Chinese culture.",
    translation:
      "作为中国文化的重要载体和东方艺术的重要象征，景德镇青花瓷证据与 17 至 18 世纪欧洲装饰艺术建立了直接关联。作为全球高端贸易商品，景德镇青花瓷是欧洲流行的“中国风”核心元素之一。这些艺术元素被广泛收藏，并用于图案设计、绘画、家具、建筑装饰等领域，瓷器由此成为推动中国文化全球表达的媒介。",
  },
};

const sidiBouSaidCriterionCorrections = {
  ii: {
    criterion: "ii",
    proposed_by_state_party: true,
    accepted_by_icomos: false,
    judgement: "rejected",
    source_en:
      "This criterion is justified by the State Party on the grounds that the nominated property, as a testimony to the cultural exchanges within the Mediterranean, bears witness to the dialogue of local traditions with external influences expressed in architecture and decorative arts by the mix of styles that include Arab, Ottoman, Andalusian, and European inspirations. The strategic geographic position of the place exposed it to different cultural and artistic currents, resulting in an urban landscape with a characteristic aesthetic. Additionally, the nominated property has inspired creativity, as expressed by the School of Tunis which combines Tunisian and European influences. A living example of continuous cultural exchange and fusion of diverse traditions, the nominated property is said to be a symbol of the universality of Mediterranean cultures and a model of mutual influences in arts and knowledge. ICOMOS considers that the mentioned influences – Andalusian, Ottoman, or European – are neither exclusive to Sidi Bou Saïd nor exceptional. The Andalusian and Ottoman influences are typical of towns and villages of the Maghreb, particularly between the 16th and 19th centuries. The nominated property fits into the general historical context in this regard, without displaying outstanding formal originality or distinctive creative approach. There is no evidence to suggest that the nominated property played a leading role in the dissemination, synthesis, or transformation of these influences. The “Arabising” (or Orientalist) style is a European aesthetic which spread to North African cities; Sidi Bou Saïd does not appear to be its originator or a major centre of influence. ICOMOS considers that this criterion is not demonstrated.",
    summary_zh: "缔约国以地中海文化交流、建筑与装饰艺术混合风格及突尼斯画派等说明标准 ii。ICOMOS 认为这些影响并非 Sidi Bou Saïd 独有或突出，也未证明其在传播、综合或转化这些影响中发挥主导作用，因此标准 ii 未得到证明。",
  },
  iii: {
    criterion: "iii",
    proposed_by_state_party: false,
    accepted_by_icomos: true,
    judgement: "accepted",
    source_en:
      "The State Party has not proposed this criterion. ICOMOS considers that the nominated property provides an exceptional testimony to a tradition of village foundations, typical for the Maghreb, stemming from the cult of a saint (walī) and the temporal power of the ruling dynasties. It represents a remarkable example of a phenomenon of sanctuary-villages that developed through a “symbolic pact” between sanctity and authority, where the blessing of the saint (baraka) served to legitimise the sovereign, and the patronage of the sovereign contributed to perpetuating the prestige of the saint. This dual process (spiritual and political) ensured the continuity of the cult of Sidi Bou Saïd, while anchoring his zawiya in the collective memory. ICOMOS considers that this criterion is demonstrated. ICOMOS considers that the nominated property meets criterion (iii), but that criteria (ii), (iv) and (vi) have not been demonstrated.",
    summary_zh: "缔约国未申报标准 iii。ICOMOS 认为该项目以圣人崇拜与王朝世俗权力形成的“圣所村落”传统提供了杰出见证，并主动补充认定标准 iii 得到证明。",
  },
  iv: {
    criterion: "iv",
    proposed_by_state_party: true,
    accepted_by_icomos: false,
    judgement: "rejected",
    source_en:
      "This criterion is justified by the State Party on the grounds that the nominated property is an exceptional example of an architectural ensemble developed around a zawiya, which testifies to the spatial organisation based on the principles of the Arab-Islamic urbanism but guided organically by the natural relief of the place. An example of Mediterranean architecture perfectly adapted to its natural context, it illustrates the symbiosis between humans and their environment. Strongly influenced by Sufi spirituality, the architecture of the nominated property does not correspond to codified standards but follows functional and contextual logic. The spectacular panoramas on the Mediterranean Sea give the place a timeless dimension. Protected since 1915, the nominated property has preserved its character, while carrying the imprint of different historical eras. In the additional information of October 2025, the State Party clarified that from the 11th century onwards, Ifriqiya played a central role in the spread of Sufism from the Mashreq, and its adaptation to the social, cultural, and urban realities of the Maghreb. The village of Sidi Bou Saïd embodies this historical stage, where Sufism became a structuring factor in social, urban, and cultural life. ICOMOS considers that the nominated property is not a singular case of the development of an Arab-Islamic village settlement centred around a zawiya but should be seen within a broader tradition of village foundations stemming from the cult of a local saint and the ruling power investment, a phenomenon attested in several regions of the Maghreb. The exceptional character of the nominated property resides not in its architecture erected in harmony with its natural environment but rather in the way it developed as a sanctuary-village through a process of aggregation. As such, ICOMOS considers that criterion (iii) should be considered instead of criterion (iv). Moreover, ICOMOS considers that the explanation regarding the significant stage of history is not fully coherent with the presentation of the nominated property as a development that took several centuries. ICOMOS considers that this criterion is not demonstrated.",
    summary_zh: "缔约国以围绕 zawiya 形成的建筑群、阿拉伯-伊斯兰城市组织及自然地形适应说明标准 iv。ICOMOS 认为其突出性不在建筑类型本身，而在圣人崇拜与统治权力共同塑造的“圣所村落”传统，因此应按标准 iii 理解，标准 iv 未得到证明。",
  },
  vi: {
    criterion: "vi",
    proposed_by_state_party: true,
    accepted_by_icomos: false,
    judgement: "rejected",
    source_en:
      "This criterion is justified by the State Party on the grounds that the nominated property is associated with spiritual events, legends, ideas and beliefs related to Sufi mysticism, being an active centre of Sufism and a space for the search of the unity with the divine, of peace and internal harmony. The village remains a place of prayer, of Sufi rituals, celebrations and gatherings. Additionally, the nominated property has inspired many renown artists whose creations have had a significant impact on the European art scene and beyond. The village played an important role in the foundation of the School of Tunis, which combined popular local tradition with modern European aesthetics, as well as contributed to the formation of major artistic movements such as Expressionism. ICOMOS considers that while Sufism can be considered of universal significance, this association is not particular to the nominated property, which is not the birthplace or principal place of this spiritual movement. While Sidi Bou Saïd might have been an important Sufi figure in the region, his ideas were not influential enough to be considered of universal significance. The attachment of the village to the venerated figure reflects the roots of the place, which is not in itself exceptional. The Sufi celebrations held in Sidi Bou Saïd are essentially national and regional. ICOMOS further considers that the legends associated with the nominated property are typical of any locality with a long memory. While these legends echo universal themes, their significance and relevance do not extend much beyond the boundaries of the nominated property. The artistic works inspired by the nominated property, while potentially globally recognised, did not produce any significant response in terms of novel ideas, art forms, or movements. ICOMOS considers that this criterion is not demonstrated.",
    summary_zh: "缔约国以苏菲神秘主义、仪式庆典、传说以及艺术启发说明标准 vi。ICOMOS 认为这些关联主要具有国家和区域意义，相关传说不超出地方长期记忆的常见范围，受其启发的艺术作品也未形成新的思想、艺术形式或运动，因此标准 vi 未得到证明。",
  },
};

const sidiBouSaidAddedCriterion = sidiBouSaidCriterionCorrections.iii;

const sidiBouSaidCategoryCorrection = {
  proposed: "cultural landscape",
  articleI: "site",
  icomosStatus: "not justified",
  note: "ICOMOS considers that the application of the cultural landscape category to the nominated property is not justified.",
};

const conservationShortConclusionByPropertyId = {
  C1239bis: "Restoration and conservation are well documented and implemented, with an adequate conservation plan and monitoring baseline.",
  C1581: "Material evidence survives and documentation is substantial, but coastal erosion, corrosion, cliff instability and uneven survival require continued conservation attention.",
  C1639: "The management plan and sustainable tourism plan provide relevant strategies and actions for conservation, safeguarding and presentation.",
  C1750: "Several structures are in critical condition; urgent operational recovery programmes, conservation strategy, stabilisation and shoring are required.",
  C1752: "Conservation is characterised as sensitive, consistent and methodologically rigorous, supported by robust documentation and experienced stewardship.",
  C1753: "The deferral recommendation calls for documenting attributes and conservation state of any selected component parts, indicating current conservation evidence is not yet sufficient for the revised serial approach.",
  C1754: "Active conservation and documentation programmes exist, but stronger integration and control of infrastructure/visitor impacts are needed.",
  C1755: "Regular consolidation and restoration are ongoing, but several ruins remain unstable and environmental agents/fire/landslides require management.",
  C1757: "The nominated archaeological component parts are documented and managed under established protection and conservation arrangements.",
  C1759: "ICOMOS recommends developing a conservation strategy in line with international standards, including post-excavation treatment and presentation of tombs.",
  C1760: "Environmental vulnerability of soft limestone/chalk and pilgrimage pressure require continued conservation and monitoring, but these do not prevent inscription.",
  C1761: "Documentation, monitoring and ongoing conservation are considered overall adequate and enhanced by traditional daily maintenance and formal monitoring.",
  C1762: "Most auditoriums and key spaces are in very good or excellent condition, but some damage, technical systems and maintenance/restoration issues require continued attention.",
  C1764: "Conservation systems exist at the national/component level but require stronger shared approaches, HIA and joint interpretation for the serial property.",
  C1765: "State of conservation is generally good and stable; documentation, conservation and monitoring are called adequate, relevant and robust.",
  C1766: "State of conservation is generally good but uneven; conservation and maintenance guidance/protocols are needed to avoid inappropriate interventions.",
  C1768: "State of conservation is very fragile; no programmed conservation activities are underway; ICOMOS calls for urgent structured conservation planning.",
  C1769: "There is no conservation programme in place; updated baseline documentation and a state of conservation assessment are urgently needed.",
  C1770: "Extensive research, conservation and monitoring are in place, but the ruined fortifications remain vulnerable to erosion, vegetation, landslides and other natural processes.",
  C1774: "Conservation of theatres is active and regularly inspected, but public-space use, overuse and excluded/weak components reveal continued conservation-management needs.",
  C927: "Baseline documentation and monitoring are not adequate for all physical and intangible attributes; ICOMOS calls for detailed documentation and a monitoring system covering environmental and human factors.",
  CN1719: "Documentation of cultural attributes is not clear or systematic enough, and ICOMOS requests better maps, plans, photographs, models and scientific documentation.",
};

const jingdezhenEvaluationSummaries = {
  attributesEn:
    "Based on the nomination dossier, and according to the State Party, the attributes of the proposed Outstanding Universal Value are: the industrial spatial layout of Jingdezhen; technological evidence of porcelain production (kiln sites and workshops); intangible heritage practices and tangible remains of the social organisation of porcelain production; evidence of the extraction of raw materials for porcelain production (kaolin, porcelain stone, timber); wharves, roads, and bridges associated with the river and road transportation of raw materials and porcelain products; accumulations of kiln waste and unexcavated artefacts and structures; buildings such as ancestral halls, temples, and guilds; and sites and excavated artefacts that provide evidence of the evolution of kiln technologies and porcelain products over ten centuries.",
  attributes:
    "ICOMOS 根据申报文本归纳的拟议突出普遍价值属性包括：景德镇的工业空间格局；瓷器生产技术证据（窑址和作坊）；制瓷社会组织的非物质遗产实践及有形遗存；瓷器生产原料（高岭土、瓷石、木材）开采证据；与原料和瓷器运输相关的码头、道路和桥梁；窑业废弃物堆积及未发掘遗物和结构；祠堂、寺庙、会馆等建筑；以及能够证明十个世纪窑业技术和瓷器产品演进的遗址和出土器物。",
  comparativeEn:
    "ICOMOS considers that the comparative analysis provides a clear basis for consideration of the nominated serial property to the World Heritage List. Globally, and within China and the East Asia region, Jingdezhen stands out because of the scale and sustained period of production of porcelain of high commercial and symbolic value. ICOMOS considers that the comparative analysis justifies consideration of this property for the World Heritage List.",
  comparative:
    "ICOMOS 认为比较研究为将该系列遗产列入《世界遗产名录》提供了清晰基础。景德镇在全球、中国以及东亚区域范围内，因高商业和象征价值瓷器的生产规模和持续时间而具有突出性，比较研究能够支持该项目进入世界遗产审议。",
  core: [
    {
      key: "integrity",
      title: "完整性",
      rating: "check",
      source_en:
        "ICOMOS considers that the integrity of the nominated series as a whole, as well as the integrity of each of the component parts have been demonstrated.",
      summary:
        "ICOMOS 认为，系列遗产整体及各组成部分的完整性均已得到证明。",
    },
    {
      key: "authenticity",
      title: "真实性",
      rating: "check",
      source_en:
        "ICOMOS considers that the authenticity of the nominated series as a whole, as well as the authenticity of each of the component parts have been demonstrated.",
      summary:
        "ICOMOS 认为，系列遗产整体及各组成部分的真实性均已得到证明。",
    },
    {
      key: "integrity_authenticity_conclusion",
      title: "完整性真实性综合结论",
      source_en:
        "The conditions of integrity and authenticity of the nominated serial property as a whole and of each of the component parts have been met.",
      summary: "ICOMOS 认为，系列遗产整体及各组成部分的完整性与真实性条件均已满足。",
    },
    {
      key: "boundaries",
      title: "边界",
      rating: "check",
      source_en:
        "ICOMOS considers that the boundaries of the nominated property include all elements necessary to convey the proposed Outstanding Universal Value. The buffer zones include areas of the environment directly linked to the conservation and management of the sites, as well as transitional areas that regulate spatial change and mitigate the impact of urban development.",
      summary:
        "ICOMOS 认为，遗产边界纳入了表达拟议突出普遍价值所需的全部要素；缓冲区覆盖与遗址保护管理直接相关的环境区域，并通过过渡区域调控空间变化、减缓城市发展影响，边界划定是适当的。",
    },
  ],
  protectionManagement: [
    {
      key: "protection_property",
      title: "遗产本体保护",
      rating: "check",
      source_en:
        "The protection of the Jingdezhen Handicraft Porcelain Industry Sites is supported by national and provincial laws and regulations, including the Law of the People's Republic of China on the Protection of Cultural Relics, the Regulations of Jiangxi Province for the Conservation of Cultural Heritage, and the Regulations of Jingdezhen Municipality for the Conservation of Handicraft Porcelain Industry Heritage.",
      summary:
        "ICOMOS 认为法律保护是适当的。遗产组成部分受到国家、省级和地方相关法规保护，景德镇市手工瓷业遗产保护条例已生效，形成了多层级保护框架。",
    },
    {
      key: "protection_buffer_zone",
      title: "缓冲区保护",
      rating: "check",
      source_en:
        "The five component parts and their buffer zones are incorporated into the territory spatial planning framework. ICOMOS considers that the component parts and buffer zones are protected at the regional planning level, ensuring that the buffer zones provide the necessary added layer of protection to the nominated property.",
      summary:
        "ICOMOS 认为，组成部分及其缓冲区已纳入国土空间规划框架，缓冲区为遗产提供了必要的附加保护层，并对城乡发展影响形成调控。",
    },
    {
      key: "conservation",
      title: "保护状况、措施与监测",
      rating: "check",
      source_en:
        "ICOMOS considers that the monitoring of the state of conservation is the most important aspect of this clear and robust approach and supports the reliance on regular observations and record keeping.\n\nICOMOS considers that the documentation, conservation, and monitoring of the nominated serial property are adequate. The indicators used for monitoring are relevant and robust and should allow the State Party to identify issues affecting the state of conservation of the proposed attributes. ICOMOS considers that it would be advisable that the monitoring system is adapted for easy integration of its outcomes into the Periodic Reporting questionnaire.",
      summary:
        "ICOMOS 认为，保护状况监测是这一清晰且稳健方法中最重要的方面。文献记录、保护措施和监测体系均是充分的；监测指标相关且稳健，能够帮助缔约国识别影响拟议属性保护状况的问题。ICOMOS 建议监测系统应便于整合进定期报告问卷。",
    },
    {
      key: "management",
      title: "管理体系",
      rating: "check",
      source_en:
        "A four-level management framework has been established, consisting of the State, Jiangxi Province, Jingdezhen City, and the Jingdezhen Handicraft Porcelain Industry Heritage Conservation Center. The Conservation Management Plan for 2025-2035 identifies objectives and specific activities for the conservation, protection and interpretation of the property.",
      summary:
        "ICOMOS 认为已有健全管理体系，涵盖四级管理框架、组成部分管理机构、社区参与、游客管理、展示阐释和研究计划，并通过 2025-2035 年保护管理规划统筹实施。",
    },
    {
      key: "threats_addressed",
      title: "威胁应对",
      rating: "tilde",
      source_en:
        "Measures related to climate change and disasters are included, and there is a phased implementation plan. ICOMOS further recommends developing a risk preparedness plan based on the relevant provisions of the Conservation Management Plan, including related capacity building and training actions.",
      summary:
        "ICOMOS 认为主要影响因素为发展压力、环境条件和自然灾害，相关风险已有控制和管理回应；同时建议进一步制定风险准备计划并开展能力建设。",
    },
  ],
};

const jingdezhenSeed = {
  property: {
    id: "C1765",
    cycle: 2026,
    property_name_en: "Jingdezhen Handicraft Porcelain Industry Sites",
    property_name_zh: "景德镇手工瓷业遗存",
    state_party: "China",
    region: "Asia and the Pacific",
    nomination_type: "New nomination",
    heritage_type: "Cultural",
    property_type: "Cultural property",
    category_of_property: "site",
    category_of_property_source_note: "ICOMOS Category of property: serial nomination of five sites",
    cultural_subtype: "site / serial industrial heritage",
    is_serial: true,
    component_count: 5,
    is_transnational: false,
    proposed_criteria: ["ii", "iii", "iv", "vi"],
    icomos_recommended_criteria: ["ii", "iii", "iv", "vi"],
    committee_confirmed_criteria: [],
    icomos_recommendation: "Inscription",
    icomos_recommendation_note: "",
    committee_decision: "",
    report_page_start: 82,
    report_page_end: 96,
    brief_synthesis_en: jingdezhenBriefSynthesisEn,
    brief_synthesis_zh: jingdezhenBriefSynthesisZh,
    review_status: "draft",
  },
  comparators: [
    ["Historic Town of Sukhothai and Associated Historic Towns", "Thailand", "World Heritage", "Thailand, 1991, criteria (i) and (iii)", "世界遗产比较对象。ICOMOS 将其作为高温硬质瓷生产传统的区域比较对象，说明源于中国的技术在地方文化影响下形成不同演化路径。"],
    ["Samarra Archaeological City", "Iraq", "World Heritage", "Iraq, 2007, criteria (ii), (iii) and (iv)", "世界遗产比较对象。ICOMOS 将其归入与美索不达米亚、埃及低温釉陶传统相关的比较对象，用于区分不同陶瓷技术谱系。"],
    ["Kangjingun Kiln Sites", "Republic of Korea", "Tentative List", "Republic of Korea, Tentative List", "预备名录比较对象。ICOMOS 将其作为高温硬质瓷生产传统的区域比较对象，说明中国技术传播后在地方文化中的发展。"],
    ["Iznik", "Türkiye", "Tentative List", "Türkiye, Tentative List", "预备名录比较对象。ICOMOS 将其归入与美索不达米亚、埃及低温釉陶传统相关的比较对象。"],
    ["Hizen Kiln", "Japan", "Not listed", "Japan", "非名录比较对象。ICOMOS 将其列为受中国技术、颜料和绘画风格直接或间接影响的东亚瓷窑，但其持续时间、生产规模和社会组织复杂性不同于景德镇。"],
    ["Bunwon Official Kiln", "Republic of Korea", "Not listed", "Republic of Korea", "非名录比较对象。ICOMOS 将其列为受中国技术、颜料和绘画风格直接或间接影响的东亚瓷窑，但其持续时间、生产规模和社会组织复杂性不同于景德镇。"],
    ["Songkhla", "Thailand", "Not listed", "Thailand", "非名录比较对象。ICOMOS 将其列为受中国技术影响的东南亚陶瓷生产地，15 世纪外销活跃，但持续时间、生产规模和组织体系不同于景德镇。"],
    ["Chu Dau Kiln", "Viet Nam", "Not listed", "Viet Nam", "非名录比较对象。ICOMOS 将其列为受中国技术影响的东南亚陶瓷生产地，15 世纪外销活跃，但持续时间、生产规模和组织体系不同于景德镇。"],
    ["Bat Trang Kiln", "Viet Nam", "Not listed", "Viet Nam", "非名录比较对象。ICOMOS 将其列为受中国技术影响的东南亚陶瓷生产地，但持续时间、生产规模和组织体系不同于景德镇。"],
    ["Royal Delft", "Netherlands", "Not listed", "Netherlands", "非名录比较对象。ICOMOS 将其列入欧洲瓷器生产传统，说明欧洲从仿效中国瓷器到 18 世纪后期形成成熟工业体系，与景德镇手工生产体系不同。"],
    ["Sèvres", "France", "Not listed", "France", "非名录比较对象。ICOMOS 将其列入欧洲瓷器生产传统，说明欧洲从仿效中国瓷器到 18 世纪后期形成成熟工业体系，与景德镇手工生产体系不同。"],
    ["Meissen", "Germany", "Not listed", "Germany", "非名录比较对象。ICOMOS 将其列入欧洲瓷器生产传统，说明欧洲从仿效中国瓷器到 18 世纪后期形成成熟工业体系，与景德镇手工生产体系不同。"],
    ["Stoke-on-Trent", "United Kingdom", "Not listed", "United Kingdom", "非名录比较对象。ICOMOS 将其列入欧洲陶瓷生产传统，呈现工业时代的复杂生产体系，与景德镇手工业体系不同。"],
  ].map(([name, country_or_region, heritage_status, status_detail, summary]) => ({
    property_id: "C1765",
    comparator_name: name,
    country_or_region,
    heritage_status,
    status_detail,
    typology: "porcelain / ceramic production comparator",
    comparison_theme: "技术体系、生产遗存、城市或窑业网络比较",
    icomos_comment_summary_zh: summary,
    source_page: 88,
  })),
  attributes: [
    ["natural resource base", "porcelain raw materials and landscape setting", "瓷土资源与山水环境"],
    ["technological process", "handicraft porcelain production knowledge", "手工瓷业生产技术体系"],
    ["production facilities", "kiln sites, workshops and associated production remains", "窑址、作坊及相关生产遗存"],
    ["spatial system", "urban production and settlement system", "城市生产与生活空间系统"],
    ["commercial and trade system", "distribution and global transmission of porcelain", "瓷器流通与全球传播"],
    ["living practice", "continuing porcelain craft communities", "延续中的制瓷实践与社群"],
  ].map(([attribute_group, attribute_name_en, attribute_name_zh]) => ({
    property_id: "C1765",
    source_layer: "central_attributes_statement",
    attribute_group,
    attribute_name_en,
    attribute_name_zh,
    summary_zh: "景德镇样例页初始属性分组，需后续用 ICOMOS 属性段落、完整性和真实性段落校准。",
    linked_criteria: ["ii", "iii", "iv", "vi"],
    linked_assessment_items: ["integrity", "authenticity", "criteria"],
    status: "recognised_by_icomos",
    review_status: "draft",
  })),
  criteria: [
    [
      "ii",
      "ICOMOS considers that the interchange of cultures is demonstrated for the nominated property, although this changed over the span of time represented by the component parts. The earlier periods demonstrate the interchange of knowledge and experimentation with technologies with other regions in China, progressively developing the production methods for which Jingdezhen is distinctive. Later exchanges through global trading networks brought new pigments, forms and techniques, which in turn underpinned the global popularity of Chinese porcelain, particularly the blue-and-white porcelain which was both highly prized and widely imitated. ICOMOS considers that this criterion is demonstrated.",
      "ICOMOS 认为，景德镇在 10 至 19 世纪持续展示制瓷技术与艺术的交流：早期体现中国南北方技术知识的融合与实验，后期通过全球贸易网络吸收新颜料、器形和技法，并推动青花瓷等中国瓷器在全球传播和仿效。",
    ],
    [
      "iii",
      "ICOMOS considers that the nominated property demonstrates the industrial and social organisation of the production of porcelain and the changes between the 10th and 19th centuries. In this context, the production of porcelain was more than a technical process. The nominated property contains evidence of craft traditions and expertise, and the complex social organisation of the production of porcelain that evolved over many centuries. ICOMOS considers that this criterion is demonstrated.",
      "ICOMOS 认为，该遗产证明了 10 至 19 世纪瓷器生产的工业和社会组织演变。制瓷不只是技术过程，也包含工艺传统、专业知识以及历经数世纪发展的复杂社会组织。",
    ],
    [
      "iv",
      "ICOMOS considers that the nominated serial property represents a major stage in the history of porcelain production, showcasing innovations in technology, art and industrial organisation, and that the long history of porcelain production at Jingdezhen spans significant stages in human history, particularly the pre-industrial globalisation of the trade in porcelain. The nominated component parts demonstrate raw material extraction, transportation, social organisation of expertise and labour, and trade, allowing the system and its complexities to be appreciated. ICOMOS considers that this criterion is demonstrated.",
      "ICOMOS 认为，景德镇系列遗产代表瓷器生产史的重要阶段，展示技术、艺术和产业组织创新；原料开采、运输、专业化分工、贸易和“二元配方”等要素使这一复杂体系可被理解。",
    ],
    [
      "vi",
      "ICOMOS considers that the porcelain of Jingdezhen (especially the blue-and-white porcelain) is a recognisable symbol of Chinese culture and Oriental art and was linked to European decorative arts in the 17th and 18th centuries. As a luxury trade commodity, it became central to the European fashion for “chinoiserie”. Through its designs and motifs, it influenced painting, furniture, architecture and decoration, serving as a medium for the global expression of Chinese civilisation and culture. ICOMOS considers that this criterion is demonstrated.",
      "ICOMOS 认为，景德镇瓷器尤其是青花瓷是中国文化和东方艺术的可识别象征，并与 17 至 18 世纪欧洲装饰艺术和“中国风”直接相关，通过图案与器物影响绘画、家具、建筑装饰等领域。",
    ],
  ].map(([criterion, summary_en, summary_zh]) => ({
    property_id: "C1765",
    criterion,
    proposed_by_state_party: true,
    accepted_by_icomos: true,
    judgement: "accepted",
    summary_en,
    summary_zh,
    review_status: "reviewed",
  })),
  recommendations: [
    {
      property_id: "C1765",
      recommendation_level: "final_recommendation",
      recommendation_code: "JDZ-R1",
      recommendation_category: "risk preparedness",
      text_en: "Develop and implement a risk preparedness plan.",
      summary_zh: "制定并实施风险准备计划，并结合保护管理规划开展相关能力建设和培训。",
      linked_assessment_items: ["threats_addressed", "management"],
      urgency: "medium",
      source_page: 95,
      included_in_final_recommendations: true,
      committee_summary_zh: "",
      review_status: "draft",
    },
    {
      property_id: "C1765",
      recommendation_level: "final_recommendation",
      recommendation_code: "JDZ-R2",
      recommendation_category: "interpretation strategy",
      text_en: "Continue the development and implementation of the interpretation strategy for the serial property as a whole.",
      summary_zh: "继续制定并实施面向整个系列遗产的阐释策略，强化各组成部分与不同交流阶段之间的联系说明，并将技术演进、空间组织和产业发展叙事更紧密整合。",
      linked_assessment_items: ["management", "criteria", "attributes"],
      urgency: "medium",
      source_page: 95,
      included_in_final_recommendations: true,
      committee_summary_zh: "",
      review_status: "draft",
    },
    {
      property_id: "C1765",
      recommendation_level: "final_recommendation",
      recommendation_code: "JDZ-R3",
      recommendation_category: "tourism development plan",
      text_en: "Prepare and implement the tourism development plan for the serial property.",
      summary_zh: "编制并实施系列遗产旅游发展计划，提升各组成部分的游客管理能力。",
      linked_assessment_items: ["management", "threats_addressed"],
      urgency: "medium",
      source_page: 95,
      included_in_final_recommendations: true,
      committee_summary_zh: "",
      review_status: "draft",
    },
  ],
};

const emergencyNominationSeed = {
  id: "C1809",
  cycle: 2026,
  property_name_en: "Sebastia",
  property_name_zh: "",
  state_party: "State of Palestine",
  region: "Arab States",
  nomination_type: "Emergency nomination",
  heritage_type: "Cultural",
  property_type: "Cultural property",
  category_of_property: "",
  category_of_property_source_note: "Nomination submitted for processing on an emergency basis; see Addendum WHC/26/48.COM/INF.8B1.Add.2.",
  cultural_subtype: "",
  is_serial: false,
  component_count: null,
  is_transnational: false,
  proposed_criteria: [],
  icomos_recommended_criteria: [],
  committee_confirmed_criteria: [],
  icomos_recommendation: "",
  icomos_recommendation_note: "Emergency nomination; ICOMOS evaluation in Add.2.",
  committee_decision: "",
  committee_pm_requirements: "",
  report_page_start: null,
  report_page_end: null,
  brief_synthesis_en: "",
  brief_synthesis_zh: "紧急申报项目。ICOMOS 主报告目录列为 State of Palestine [C 1809] Sebastia，评估内容见 Addendum WHC/26/48.COM/INF.8B1.Add.2，待补充结构化摘录。",
  review_status: "draft",
};

const bulwarkedFortressesBriefSeed = {
  sourcePage: 305,
  briefEn: `Located along the Raia, the historic boundary between Portugal and Spain, the Bulwarked Fortresses of the Raia form a defence system created during the Portuguese Restoration War (1640-1668), comprising 143 recorded fortifications spread over roughly 1,300 kilometres. The nominated property is a series constituted of three fortifications: the Stronghold of Almeida and the Fortresses of Marvão and Valença. Each includes its fortified perimeter, military buildings and the urban area enclosed by its defensive lines.

The Stronghold of Almeida is a star-shaped bulwarked fort on a strategic hill above the River Côa, distinguished by its six bulwarks, advanced outer works and the fortified town enclosed within. The Fortress of Marvão combines a commanding mountaintop setting with medieval and modern bulwarked structures, illustrating the integration of natural topography and evolving defensive architecture. The Fortress of Valença is a bulwarked stronghold, with two interconnected enclosures, overlooking the River Minho, notable for its scale and integration of modern military architecture with the topography of the site.`,
  briefZh: `该项目位于 Raia，即葡萄牙与西班牙之间的历史边界沿线。Raia 堡垒体系形成于葡萄牙复国战争时期（1640-1668），由约 143 处有记录的防御工事组成，分布范围约 1,300 公里。申报遗产为由三处防御工事组成的系列遗产：Almeida 要塞、Marvão 要塞和 Valença 要塞；每个组成部分包括其防御边界、军事建筑以及防线围合的城区。

Almeida 要塞是位于 Côa 河上方战略丘陵上的星形棱堡，具有六个棱堡、外部防御工程和被防御体系围合的城镇。Marvão 要塞结合了山顶控制性地形、中世纪和近代棱堡结构，体现自然地形与防御建筑演变的结合。Valença 要塞由两个相互连接的防御围合区构成，俯瞰 Minho 河，以其规模以及现代军事建筑与地形的整合为特征。`,
};

const zerzevanCastleBriefSeed = {
  sourcePage: 331,
  briefEn: `Zerzevan Castle and Mithraeum is an archaeological hilltop complex located between Diyarbakır and Mardin in Southeastern Anatolia, Türkiye. The nominated property presents an archaeological ensemble reflecting multiple phases of occupation and adaptation over a long span of time, extending from the Assyrian Period (882-611 BCE) through the Roman and Eastern Roman periods until the conquest of the region by Islamic armies in 639 CE. It comprises the remains of a fortified complex, including defensive walls, towers, gates, domestic quarters, a large cistern system, a church, administrative buildings, rock-cut tombs in associated necropolises, quarries, and other service structures. At the northern end of the fort, excavations have revealed a rock-cut underground space referred to as a Mithraeum, (a temple dedicated to the Roman god Mithras), together with an adjacent underground structure carved into the bedrock. The nominated property extends over a rocky ridge rising above the surrounding plain and incorporates both built and rock-cut elements. The wider setting includes remains associated with water management and circulation routes, including the strategic Late Antiquity Amida-Dara road.`,
  briefZh: `Zerzevan Castle and Mithraeum 位于 Türkiye 东南安纳托利亚 Diyarbakır 与 Mardin 之间，是一处山顶考古遗址群。申报遗产呈现从亚述时期（公元前 882-611 年）经罗马、东罗马时期至公元 639 年伊斯兰军队征服该地区之前的长期占用与适应过程。遗存包括防御墙、塔楼、城门、居住区、大型蓄水系统、教堂、行政建筑、相关墓地中的岩凿墓、采石场和其他服务性结构。堡垒北端发现了被称为 Mithraeum 的岩凿地下空间（供奉罗马神 Mithras 的神庙）及相邻岩凿地下结构。遗产位于高出周边平原的岩质山脊上，包含建筑遗存和岩凿要素；更广阔的环境还包括与水管理和交通路线相关的遗存，如 Late Antiquity Amida-Dara road。`,
};

const carcassonneBriefSeed = {
  sourcePage: 285,
  briefEn: `The regional defensive fortification system established by the Capetian kings in the 13th-14th centuries in the former seneschalty of Carcassonne, in current south-west France, consisted of twenty-two fortresses built to protect the seneschal's headquarters at Carcassonne, secure newly annexed lands, safeguard economic resources and control key communication routes, as well as assert royal power in the region through monumental architecture. This serial property, composed of eight component parts, comprises a representative sample of this system and includes the Carcassonne Castle with its double concentric ramparts, which served as the administrative and military centre of the seneschalty, as well as an ensemble of watchmen fortresses built in a relatively short span of time under royal supervision in a rugged topography.

The system of the fortresses of the seneschalty of Carcassonne, stylistically consistent, was designed based on the Capetian military architecture models, developed for the plains of Ile-de-France and adapted to the rocky topography of the Montagne Noire and the Pyrenean foothills. The serial property represents a compelling example of this defensive architecture, which served as a political tool to project the growing, centralised and divinely sanctioned power of the French monarchy, part of a larger movement towards assertion of sovereign powers that marked 13th-century Europe.`,
  briefZh: `报告第 7 部分推荐 OUV 声明中的 Brief synthesis 原文已补齐为两段。中文可在此基础上继续工作译校。`,
};

const comparatorGroupDefinitions = [
  { key: "world_heritage", status: "World Heritage", label: "世界遗产" },
  { key: "tentative_list", status: "Tentative List", label: "预备名单" },
  { key: "not_listed", status: "Not listed", label: "非遗产项目" },
];

const zerzevanComparatorsSeed = [
  {
    property_id: "C1754",
    comparator_name: "Dara, Hatra",
    country_or_region: "Iraq",
    heritage_status: "World Heritage",
    status_detail: "1985, criteria (ii), (iii), (iv) and (vi)",
    comparison_theme: "Roman fortifications with military-religious features in Upper Mesopotamia and along the Roman frontiers.",
    icomos_comment_summary_zh: "Dara、Hatra（Iraq，1985，标准 ii、iii、iv、vi）。",
    source_page: 267,
  },
  {
    property_id: "C1754",
    comparator_name: "Singara, Qreiye and Timgad",
    country_or_region: "Algeria",
    heritage_status: "World Heritage",
    status_detail: "1982, criteria (ii), (iii) and (iv)",
    comparison_theme: "Roman fortifications with military-religious features in Upper Mesopotamia and along the Roman frontiers.",
    icomos_comment_summary_zh: "Singara、Qreiye and Timgad（Algeria，1982，标准 ii、iii、iv）。",
    source_page: 267,
  },
  {
    property_id: "C1754",
    comparator_name: "Archaeological Site of Zeugma",
    country_or_region: "Türkiye",
    heritage_status: "Tentative List",
    status_detail: "Tentative List",
    comparison_theme: "Roman fortifications with military-religious features in Upper Mesopotamia and along the Roman frontiers.",
    icomos_comment_summary_zh: "Archaeological Site of Zeugma（Türkiye，预备名单）。",
    source_page: 267,
  },
  {
    property_id: "C1754",
    comparator_name: "Carrawburgh",
    country_or_region: "Europe",
    heritage_status: "Not listed",
    status_detail: "Mithraeum associated with forts or frontier contexts",
    comparison_theme: "Mithraea associated with forts or frontier contexts in Europe.",
    icomos_comment_summary_zh: "Carrawburgh：欧洲边境或堡垒语境中的 Mithraeum 比较对象。",
    source_page: 267,
  },
  {
    property_id: "C1754",
    comparator_name: "Künzing",
    country_or_region: "Europe",
    heritage_status: "Not listed",
    status_detail: "Mithraeum associated with forts or frontier contexts",
    comparison_theme: "Mithraea associated with forts or frontier contexts in Europe.",
    icomos_comment_summary_zh: "Künzing：欧洲边境或堡垒语境中的 Mithraeum 比较对象。",
    source_page: 267,
  },
  {
    property_id: "C1754",
    comparator_name: "Apulum",
    country_or_region: "Europe",
    heritage_status: "Not listed",
    status_detail: "Mithraeum associated with forts or frontier contexts",
    comparison_theme: "Mithraea associated with forts or frontier contexts in Europe.",
    icomos_comment_summary_zh: "Apulum：欧洲边境或堡垒语境中的 Mithraeum 比较对象。",
    source_page: 267,
  },
];

const aaltoWorksRecommendationSeed = [
  [
    "AW-R1",
    "Further refining the attributes to make them more operational for management purposes by identifying specific physical qualities, material fabric, tangible features, and relevant intangible aspects (such as processes, social arrangements, or cultural practices), as well as interactions between them,",
    "进一步细化属性，使其更便于管理运用；明确具体物质品质、材料构造、有形特征、相关非物质层面及其相互关系。",
  ],
  [
    "AW-R2",
    "Securing funds for maintenance and conservation interventions until a compatible use for the Paimio Sanatorium (component part 002) and all its features is found and established,",
    "在 Paimio Sanatorium（组成部分 002）及其全部特征找到并确立相容用途前，确保维护和保护干预所需资金。",
  ],
  [
    "AW-R3",
    "Adopting a maintenance and development strategy for secondary facilities, as well as for areas or buildings not considered as supporting the Outstanding Universal Value of the property, whether designed by the Aalto studio or not,",
    "为次要设施，以及不被认为支撑遗产突出普遍价值的区域或建筑制定维护与发展策略，无论其是否由 Aalto 工作室设计。",
  ],
  [
    "AW-R4",
    "Completing the formal designation process of buffer zones into planning documents as soon as possible, to ensure that they provide an effective added layer of protection to the property,",
    "尽快完成将缓冲区正式纳入规划文件的程序，确保其为遗产提供有效的附加保护层。",
  ],
  [
    "AW-R5",
    "Further developing through participatory processes, and putting into place management coordination structures and mechanisms for both individual component parts and the serial property as a whole,",
    "通过参与式过程进一步发展并落实各组成部分及整个系列遗产的管理协调结构和机制。",
  ],
  [
    "AW-R6",
    "Continuing to develop and update the Aalto Works Management Plan for the property as well as the individual plans for the component parts, and ensuring their implementation,",
    "持续完善并更新遗产整体的 Aalto Works 管理计划及各组成部分的单项计划，并确保实施。",
  ],
  [
    "AW-R7",
    "Further developing the monitoring framework to include clear monitoring indicators, including those supporting protection of interiors, and all current and potential factors affecting the property, such as, among others, development and tourism pressures,",
    "进一步完善监测框架，纳入明确监测指标，包括支持室内空间保护的指标，以及发展、旅游压力等当前和潜在影响因素。",
  ],
  [
    "AW-R8",
    "Developing and implementing a comprehensive interpretation and presentation strategy, including visitor management,",
    "制定并实施综合性的阐释和展示策略，其中包括游客管理。",
  ],
  [
    "AW-R9",
    "Ensuring that Heritage Impact Assessment is conducted before any development project within the property, its buffer zones and its immediate settings and that its procedures are consistent with the Guidance and Toolkit for Impact Assessments in a World Heritage Context.",
    "确保在遗产、缓冲区及其直接环境内开展任何发展项目之前进行遗产影响评估，并使程序符合《世界遗产背景下影响评估指南与工具包》。",
  ],
].map(([recommendation_code, text_en, summary_zh], index) => ({
  property_id: "C1752",
  recommendation_level: "final_recommendation",
  recommendation_code,
  recommendation_category: recommendationLetter(index),
  text_en,
  summary_zh,
  linked_assessment_items: [],
  urgency: "medium",
  source_page: index === 0 ? 196 : 197,
  included_in_final_recommendations: true,
  committee_summary_zh: "",
  review_status: "draft",
}));

const bulwarkedFortressesRecommendationSeed = [
  [
    "BFR-R1",
    "Reconceptualise the nomination to clearly define a conceptual framework and parameters that identify the essential features of the Raia system and how it is expressed and linked by relevant selected fortresses,",
    "重新构思申报文本，明确 Raia 防御体系的概念框架和判断参数，说明其核心特征，以及这些特征如何通过所选堡垒体现并相互关联。",
  ],
  [
    "BFR-R2",
    "Conduct further research on construction chronology, technological transfers, and cross-border military interactions to clarify historical significance,",
    "进一步研究建设年代、技术传播和跨境军事互动，以澄清其历史意义。",
  ],
  [
    "BFR-R3",
    "Reassess the serial approach and consider a more representative selection of fortresses to reflect typological diversity, geographical distribution, and strategic functions of the Raia system,",
    "重新评估系列遗产申报方法，并考虑选择更具代表性的堡垒，以体现 Raia 体系的类型多样性、地理分布和战略功能。",
  ],
  [
    "BFR-R4",
    "Strengthen the comparative analysis with additional Raia fortifications and relevant European and global examples to substantiate claims relating to the potential outstanding universal value,",
    "通过补充更多 Raia 防御工事及相关欧洲和全球案例，加强比较研究，以支持其潜在突出普遍价值的论证。",
  ],
  [
    "BFR-R5",
    "Document the attributes of each of the component parts that will be selected, in terms of their location, topography, typology, conservation state, authenticity, and integrity,",
    "从位置、地形、类型、保护状况、真实性和完整性等方面，记录未来所选各组成部分的属性。",
  ],
  [
    "BFR-R6",
    "Address management, conservation, risk management, and visitor interpretation issues to demonstrate long-term protection and sustainability.",
    "处理管理、保护、风险管理和游客阐释等问题，以证明遗产能够得到长期保护并具备可持续性。",
  ],
].map(([recommendation_code, text_en, summary_zh], index) => ({
  property_id: "C1753",
  recommendation_level: "final_recommendation",
  recommendation_code,
  recommendation_category: recommendationLetter(index),
  text_en,
  summary_zh,
  linked_assessment_items: [],
  urgency: "medium",
  source_page: 316,
  included_in_final_recommendations: true,
  committee_summary_zh: "",
  review_status: "draft",
}));

const carcassonneRecommendationSeed = [
  [
    "CAR-R1",
    "Developing an integrated conservation plan for the serial property,",
    "制定系列遗产的综合保护计划。",
  ],
  [
    "CAR-R2",
    "Ensuring that baseline documentation includes data on the landscape aspects of the property,",
    "确保基础档案资料包含遗产景观方面的数据。",
  ],
  [
    "CAR-R3",
    "Equipping all municipalities with the relevant planification tools (PLU or PLUi),",
    "为所有市镇配备相关规划工具（PLU 或 PLUi）。",
  ],
  [
    "CAR-R4",
    "Developing a comprehensive tourism strategy for the serial property and integrating it with the management plan,",
    "为系列遗产制定综合旅游策略，并将其纳入管理计划。",
  ],
  [
    "CAR-R5",
    "Preparing an interpretation strategy for the series as a whole,",
    "为整个系列遗产制定阐释策略。",
  ],
  [
    "CAR-R6",
    "Ensuring that Heritage Impact Assessment is conducted before any development project within the property, its buffer zones, and its immediate setting, and that the procedures for Heritage Impact Assessment are consistent with the Guidance and Toolkit for Impact Assessments in a World Heritage Context;",
    "确保在遗产、缓冲区及其直接环境内开展任何发展项目之前进行遗产影响评估，并确保遗产影响评估程序符合《世界遗产背景下影响评估指南与工具包》。",
  ],
].map(([recommendation_code, text_en, summary_zh], index) => ({
  property_id: "C1755",
  recommendation_level: "final_recommendation",
  recommendation_code,
  recommendation_category: recommendationLetter(index),
  text_en,
  summary_zh,
  linked_assessment_items: [],
  urgency: "medium",
  source_page: 227,
  included_in_final_recommendations: true,
  committee_summary_zh: "",
  review_status: "draft",
}));

const xiongnuRecommendationSeed = [
  [
    "1",
    "Ensuring the operationalisation of the World Heritage Protection Administration management structure as soon as possible, as well as the direct involvement the local community,",
    "尽快使世界遗产保护管理机构投入运行，并确保当地社区直接参与。",
  ],
  [
    "2",
    "Updating, approving and implementing the management plan, and extending it to include a strategic vision centred around the conservation of the Outstanding Universal Value of the serial property,",
    "更新、批准并实施管理计划，并扩展其内容，纳入以保护系列遗产突出普遍价值为核心的战略愿景。",
  ],
  [
    "3",
    "Developing a conservation strategy in conformity with international standards, for example for the post-excavation treatment of the tombs or their presentation to visitors,",
    "按国际标准制定保护策略，例如墓葬发掘后的处理及向参观者展示。",
  ],
  [
    "4",
    "Examining the plan to displace herder families who live near the cemetery complexes in light of their rights and needs, and the advantages of their presence as collaborators and guardians,",
    "结合牧民家庭的权利和需要，以及其作为协作者和守护者在场的优势，审查迁移居住在墓地群附近牧民家庭的计划。",
  ],
  [
    "5",
    "Placing markers on the ground to help identify the boundaries of the component parts and their respective buffer zones,",
    "在地面设置标识，以帮助识别各组成部分及其相应缓冲区的边界。",
  ],
  [
    "6",
    "Investigating the relationship of the funerary complexes with their wider setting, in order to explore, among other issues, the need to readjust the boundaries of the component parts through minor boundary modification requests,",
    "研究墓葬群与更广阔环境之间的关系，以探讨是否需要通过小幅边界修改申请调整组成部分边界等问题。",
  ],
  [
    "7",
    "Designing indicators to measure and assess the state of conservation of the attributes conveying the Outstanding Universal Value, including environmental factors that could have an impact on these attributes,",
    "制定指标，用以衡量和评估承载突出普遍价值的属性的保护状况，包括可能影响这些属性的环境因素。",
  ],
  [
    "8",
    "Improving security at the sites to avoid looting and other anthropogenic impacts,",
    "加强遗址安全，避免盗掘和其他人为影响。",
  ],
  [
    "9",
    "Developing the visitor information and infrastructure at the component parts and establishing their carrying capacity before promoting the sites as tourism destinations,",
    "在将遗址作为旅游目的地推广前，发展各组成部分的游客信息和基础设施，并确定其承载能力。",
  ],
  [
    "10",
    "Informing the World Heritage Centre of the intention to undertake or authorise all major projects which may affect the Outstanding Universal Value of the serial property, in line with paragraph 172 of Operational Guidelines for the Implementation of the World Heritage Convention.",
    "根据《操作指南》第 172 段，将任何可能影响系列遗产突出普遍价值的重大项目的实施或批准意向告知世界遗产中心。",
  ],
].map(([recommendation_code, text_en, summary_zh], index) => ({
  property_id: "C1759",
  recommendation_level: "final_recommendation",
  recommendation_code,
  recommendation_category: recommendationLetter(index),
  text_en,
  summary_zh,
  linked_assessment_items: [],
  urgency: "medium",
  source_page: 154,
  included_in_final_recommendations: true,
  committee_summary_zh: "",
  review_status: "draft",
}));

const xiongnuComparatorsSeed = [
  [
    "World Heritage List properties in Central and East Asia geo-cultural region",
    "Central and East Asia",
    "World Heritage",
    "briefly considered; individual names not specified in the extracted paragraph",
    "ICOMOS 评估报告说明，缔约国曾简要比较相关区域内已列入《世界遗产名录》的遗产，并认为其外部和内部结构与申报遗产有实质差异；该段未逐一列出具体名称。",
  ],
  [
    "Pazyryk culture of the Altai",
    "Russian Federation",
    "Tentative List",
    "Tentative List",
    "评估报告将阿尔泰 Pazyryk 文化作为相关地缘文化区域内的预备名录比较对象；ICOMOS 认为虽存在一定交流，匈奴墓葬仍可视为独立发展。",
  ],
  [
    "Other known Xiongnu cemetery complexes",
    "Mongolia and Russian Federation",
    "Not listed",
    "not in the nominated series",
    "ICOMOS 记录申报材料将拟议系列与蒙古和俄罗斯境内其他已知匈奴墓葬群比较；未纳入系列者通常墓葬数量较少、规模较小，或尚未发掘。",
  ],
  [
    "Tombs of Han China",
    "China",
    "Not listed",
    "comparative burial tradition",
    "评估报告提及汉代中国墓葬作为邻近地区墓葬传统和墓葬群的比较对象之一。",
  ],
  [
    "Nannang (Nangnang) tombs",
    "Korean peninsula",
    "Not listed",
    "comparative burial tradition",
    "评估报告提及朝鲜半岛乐浪 / Nangnang 墓葬作为邻近地区墓葬传统和墓葬群的比较对象之一。",
  ],
].map(([comparator_name, country_or_region, heritage_status, status_detail, icomos_comment_summary_zh]) => ({
  property_id: "C1759",
  comparator_name,
  country_or_region,
  heritage_status,
  status_detail,
  typology: "funerary complex / burial tradition",
  comparison_theme: "墓葬群规模、墓葬规模、已发掘墓葬数量，以及相关地缘文化区域内墓葬传统比较。",
  icomos_comment_summary_zh,
  source_page: 147,
}));

let state = emptyState();
let criteriaCorrectionProjects = [];
let selectedPropertyId = "C1765";
let selectedPptPropertyId = "C1765";
let editingNarrativeKey = "";
let activePdfSource = null;
const mainReportPdfPath = "ICOMOS评估意见whc26-48com-inf8B1-en.pdf";
const projectStartPdfPages = {
  C1768: 31,
  C1750: 49,
  C1769: 67,
  C1765: 85,
  C927: 99,
  C1770: 115,
  C1757: 131,
  C1760: 145,
  C1764: 163,
  C1759: 187,
  C1761: 203,
  C1766: 217,
  C1752: 237,
  C1581: 255,
  C1755: 273,
  C1762: 289,
  C1753: 305,
  C1639: 319,
  C1754: 331,
  C1239bis: 347,
  C1774: 361,
  C1756: 377,
  CN1719: 381,
};
const briefSectionPdfPages = {
  C1768: 44,
  C1750: 49,
  C1769: 77,
  C1765: 93,
  C927: 110,
  C1770: 126,
  C1757: 139,
  C1760: 157,
  C1764: 163,
  C1759: 198,
  C1761: 212,
  C1766: 230,
  C1752: 249,
  C1581: 268,
  C1755: 285,
  C1762: 301,
  C1753: 305,
  C1639: 319,
  C1754: 331,
  C1239bis: 355,
  C1774: 373,
  C1756: 377,
  CN1719: 381,
};
const criteriaSectionPdfPages = {
  C1768: 37,
  C1750: 53,
  C1769: 71,
  C1765: 89,
  C927: 104,
  C1770: 119,
  C1757: 135,
  C1760: 150,
  C1764: 171,
  C1759: 192,
  C1761: 207,
  C1766: 223,
  C1752: 243,
  C1581: 260,
  C1755: 279,
  C1762: 294,
  C1753: 310,
  C1639: 323,
  C1754: 334,
  C1239bis: 350,
  C1774: 366,
  CN1719: 386,
};
const comparativeSectionPdfPages = {
  C1768: 36,
  C1750: 52,
  C1769: 70,
  C1765: 88,
  C927: 103,
  C1770: 118,
  C1757: 134,
  C1760: 149,
  C1764: 168,
  C1759: 192,
  C1761: 207,
  C1766: 221,
  C1752: 242,
  C1581: 259,
  C1755: 278,
  C1762: 292,
  C1753: 309,
  C1639: 322,
  C1754: 334,
  C1239bis: 350,
  C1774: 365,
  CN1719: 386,
};
const attributesSectionPdfPages = {
  C1768: 36,
  C1750: 52,
  C1769: 70,
  C1765: 88,
  C927: 102,
  C1770: 118,
  C1757: 132,
  C1760: 149,
  C1764: 168,
  C1759: 192,
  C1761: 207,
  C1766: 221,
  C1752: 242,
  C1581: 257,
  C1755: 277,
  C1762: 292,
  C1753: 309,
  C1639: 319,
  C1754: 334,
  C1239bis: 349,
  C1774: 364,
  CN1719: 385,
};
const integrityAuthenticitySectionPdfPages = {
  C1768: 38,
  C1750: 54,
  C1769: 72,
  C1765: 90,
  C927: 106,
  C1770: 121,
  C1757: 135,
  C1760: 152,
  C1764: 175,
  C1759: 193,
  C1761: 208,
  C1766: 223,
  C1752: 244,
  C1581: 262,
  C1755: 280,
  C1762: 295,
  C1753: 312,
  C1639: 324,
  C1754: 336,
  C1239bis: 351,
  C1774: 367,
  CN1719: 387,
};
const conservationMonitoringSectionPdfPages = {
  C1768: 40,
  C1750: 56,
  C1769: 74,
  C1765: 91,
  C927: 107,
  C1770: 122,
  C1757: 136,
  C1760: 153,
  C1764: 177,
  C1759: 194,
  C1761: 209,
  C1766: 226,
  C1752: 245,
  C1581: 263,
  C1755: 281,
  C1762: 297,
  C1753: 313,
  C1639: 324,
  C1754: 337,
  C1239bis: 352,
  C1774: 369,
  CN1719: 388,
};
const protectionManagementSectionPdfPages = {
  C1768: 41,
  C1750: 57,
  C1769: 74,
  C1765: 91,
  C927: 108,
  C1770: 123,
  C1757: 137,
  C1760: 154,
  C1764: 179,
  C1759: 196,
  C1761: 210,
  C1766: 227,
  C1752: 246,
  C1581: 264,
  C1755: 282,
  C1762: 298,
  C1753: 314,
  C1639: 325,
  C1754: 339,
  C1239bis: 353,
  C1774: 370,
  CN1719: 390,
};
const recommendationsSectionPdfPages = {
  C1768: 44,
  C1750: 60,
  C1769: 77,
  C1765: 93,
  C927: 110,
  C1770: 126,
  C1757: 139,
  C1760: 157,
  C1764: 183,
  C1759: 198,
  C1761: 212,
  C1766: 230,
  C1752: 249,
  C1581: 268,
  C1755: 285,
  C1762: 301,
  C1753: 316,
  C1639: 328,
  C1754: 341,
  C1239bis: 355,
  C1774: 373,
  CN1719: 394,
};
const defaultFilters = {
  region: "all",
  recommendation: "all",
  nomination_type: "all",
  property_type: "all",
  category_of_property: "all",
  heritage_type: "all",
  transnational: "all",
  nomination_scope: "all",
  proposed_criterion: "all",
  icomos_criterion: "all",
  committee_criterion: "all",
  committee_decision_category: "all",
  committee_change_from: "all",
  serial: "all",
  column_group: "all",
  item_key: "all",
  human_rating: "all",
  review_status: "all",
  official_status: "all",
  query: "",
};
const propertyFilterKeys = Object.keys(defaultFilters);
const EDIT_HISTORY_LIMIT = 500;
const PRIVATE_NARRATIVE_SECTIONS = new Set(["research_notes"]);
const NARRATIVE_SECTION_LABELS = {
  brief: "Brief Synthesis",
  criteria: "价值标准",
  attributes: "属性识别",
  serial: "系列选择",
  comparative: "比较研究",
  core: "完整性、真实性与边界",
  protection: "保护管理评估",
  recommendations: "Recommendations",
  research_notes: "要点备注",
  committee_decision: "大会审议结论",
};

let filters = { ...defaultFilters };

let supabaseClient = null;
let currentUser = null;
let saveStatus = "";
let exportPreviewText = "";
let dashboardExportPreviewText = "";
let dashboardExportWorkbookText = "";
let dashboardExportFilename = "";
let legacyStorageCandidates = [];

const app = document.querySelector("#app");

function isLocalPreview() {
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function emptyState() {
  return {
    properties: [],
    assessment_items: assessmentItems,
    property_assessments: [],
    evidence: [],
    comparators: [],
    attributes: [],
    criteria_assessments: [],
    recommendations: [],
    official_ppt_ratings: [],
    narrative_edits: [],
    edit_history: [],
  };
}

async function init() {
  if (isStorageProbeRequest()) {
    postStorageProbeResponse();
    return;
  }
  if (isStorageReceiverRequest()) {
    setupStorageReceiver();
  }
  initializeSupabase();
  await loadCriteriaCorrections();
  const cached = loadLocalState();
  state = normalizeWorkspaceState(cached || (await buildSeedState()));
  saveLocalState(state);
  selectedPropertyId = state.properties.find((property) => property.id === "C1765")?.id || state.properties[0]?.id || "";
  selectedPptPropertyId = selectedPropertyId;
  applyFiltersFromUrl();
  await loadSharedState();
  setupLegacyStorageProbe();
  window.addEventListener("popstate", render);
  document.addEventListener("click", handleNavigation);
  render();
}

function isStorageProbeRequest() {
  return new URLSearchParams(window.location.search).has("storage_probe");
}

function isStorageReceiverRequest() {
  return new URLSearchParams(window.location.search).has("storage_receiver");
}

function setupStorageReceiver() {
  const statusEl = document.createElement("div");
  statusEl.style.cssText = "font:14px/1.5 -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;padding:16px;";
  statusEl.textContent = "等待旧版缓存...";
  document.body.appendChild(statusEl);
  window.addEventListener("message", (event) => {
    const message = event.data || {};
    if (message.type !== "whc48-storage-import-payload" || !message.storage) return;
    try {
      const current = localStorage.getItem(STORAGE_KEY);
      if (current && current !== message.storage) pushLocalBackup(current, "before_storage_bridge");
      localStorage.setItem(STORAGE_KEY, message.storage);
      if (message.backups) localStorage.setItem(STORAGE_BACKUP_KEY, message.backups);
      saveStatus = `已从 ${event.origin} 接收旧版工作区缓存。`;
      state = normalizeWorkspaceState(JSON.parse(message.storage));
      statusEl.textContent = saveStatus;
      render();
    } catch (error) {
      saveStatus = `接收旧版缓存失败：${error.message}`;
      statusEl.textContent = saveStatus;
      render();
    }
  });
}

function postStorageProbeResponse() {
  const storage = localStorage.getItem(STORAGE_KEY) || "";
  const backups = localStorage.getItem(STORAGE_BACKUP_KEY) || "";
  const allStorage = readAllLocalStorage();
  const payload = summarizeSerializedWorkspace(storage);
  const backupEntries = readLocalBackups()
    .map((backup, index) => {
      const backupPayload = summarizeSerializedWorkspace(backup.data || "");
      return {
        index,
        saved_at: backup.saved_at || "",
        reason: backup.reason || "",
        storage: backup.data || "",
        summary: backupPayload.summary,
        score: backupPayload.score,
      };
    })
    .filter((backup) => backup.storage);
  window.parent?.postMessage(
    {
      type: "whc48-storage-probe-response",
      origin: window.location.origin,
      storageKey: STORAGE_KEY,
      storage,
      backups,
      allStorage,
      summary: payload.summary,
      score: payload.score,
      backupEntries,
    },
    "*",
  );
  if (window.top === window) {
    const params = new URLSearchParams(window.location.search);
    const bridgeTo = params.get("bridge_to");
    if (params.has("dump_storage")) {
      document.body.innerHTML = `
        <main style="font:14px/1.5 -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;padding:16px;">
          <h1>旧版工作区缓存导出</h1>
          <p>${escapeHtml(window.location.origin)} · ${payload.summary.properties || 0} 个项目 · ${payload.summary.narratives || 0} 个详情修订</p>
          <textarea id="storageDump" style="width:100%;height:70vh;font:12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;"></textarea>
        </main>
      `;
      document.getElementById("storageDump").value = storage;
      return;
    }
    if (bridgeTo && storage) {
      document.body.innerHTML = `
        <main style="font:14px/1.5 -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;padding:16px;">
          <h1>正在迁移旧版本地缓存</h1>
          <p id="bridgeStatus">准备发送到 ${escapeHtml(bridgeTo)}...</p>
          <iframe id="storageBridgeTarget" src="${escapeAttr(bridgeTo)}?storage_receiver=1" style="width:1px;height:1px;border:0;position:absolute;left:-9999px;"></iframe>
        </main>
      `;
      const frame = document.getElementById("storageBridgeTarget");
      frame.addEventListener("load", () => {
        let attempts = 0;
        const send = () => {
          attempts += 1;
          frame.contentWindow?.postMessage({ type: "whc48-storage-import-payload", storage, backups }, bridgeTo);
          document.getElementById("bridgeStatus").textContent = `正在发送旧版工作区缓存，第 ${attempts} 次...`;
          if (attempts >= 12) {
            clearInterval(timer);
            document.getElementById("bridgeStatus").textContent = "已发送旧版工作区缓存，请回到目标页面查看。";
          }
        };
        const timer = setInterval(send, 400);
        send();
      });
      return;
    }
    document.body.innerHTML = `<pre style="white-space:pre-wrap;font:13px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;padding:16px;">${escapeHtml(
      JSON.stringify(
        {
          origin: window.location.origin,
          storageKey: STORAGE_KEY,
          mainWorkspace: payload.summary,
          mainBytes: storage.length,
          localStorageKeys: allStorage.map((entry) => ({ key: entry.key, bytes: entry.bytes, summary: entry.summary })),
        },
        null,
        2,
      ),
    )}</pre>`;
  } else {
    document.body.innerHTML = "";
  }
}

function readAllLocalStorage() {
  const rows = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    const value = localStorage.getItem(key) || "";
    rows.push({ key, value, bytes: value.length, summary: summarizeStorageValue(key, value) });
  }
  return rows.sort((a, b) => b.bytes - a.bytes);
}

function summarizeStorageValue(key, value) {
  try {
    const parsed = JSON.parse(value || "null");
    if (key === STORAGE_KEY) return summarizeSerializedWorkspace(value).summary;
    if (key === "icomos_pm_calibration_v1") {
      return {
        type: "保护管理校准",
        properties: parsed.properties?.length || 0,
        assessments: parsed.assessment_calibration_items?.length || 0,
        evidence: parsed.evidence?.length || 0,
        reviewedRows: (parsed.assessment_calibration_items || []).filter((row) => row.human_calibrated_level || row.review_status || row.reviewer).length,
      };
    }
    if (key === "icomos_pm_round1_marks") {
      const marks = parsed && typeof parsed === "object" ? Object.values(parsed) : [];
      return {
        type: "保护管理 Round 1 人工标记",
        marks: marks.length,
        adjusted: marks.filter((mark) => mark?.calibratedLevel || mark?.human_calibrated_level || mark?.status === "adjusted").length,
        noted: marks.filter((mark) => mark?.note).length,
      };
    }
    if (key.startsWith("column_widths:")) return { type: "表格列宽" };
    return { type: Array.isArray(parsed) ? "数组缓存" : typeof parsed };
  } catch {
    return { type: "文本缓存" };
  }
}

function setupLegacyStorageProbe() {
  if (!isLocalPreview()) return;
  const currentOrigin = window.location.origin;
  const origins = LEGACY_STORAGE_ORIGINS.filter((origin) => origin !== currentOrigin);
  if (!origins.length) return;
  const handleMessage = (event) => {
    const message = event.data || {};
    if (message.type !== "whc48-storage-probe-response" || message.storageKey !== STORAGE_KEY || !message.storage) return;
    const candidates = legacyStorageCandidatesFromMessage(message);
    candidates.forEach((candidate) => {
      if (!candidate || candidate.storage === localStorage.getItem(STORAGE_KEY)) return;
      const existingIndex = legacyStorageCandidates.findIndex((entry) => entry.id === candidate.id);
      if (existingIndex >= 0) legacyStorageCandidates[existingIndex] = candidate;
      else legacyStorageCandidates.push(candidate);
    });
    legacyStorageCandidates.sort((a, b) => b.score - a.score);
    if (legacyStorageCandidates.length) {
      saveStatus = `发现 ${legacyStorageCandidates.length} 份旧版本地数据，可在侧栏选择迁入。`;
      render();
    }
  };
  window.addEventListener("message", handleMessage);
  origins.forEach((origin) => {
    const frame = document.createElement("iframe");
    frame.src = `${origin}/?storage_probe=1&probe_version=20260609_localhost4174`;
    frame.hidden = true;
    frame.setAttribute("aria-hidden", "true");
    frame.addEventListener("load", () => setTimeout(() => frame.remove(), 5000));
    document.body.appendChild(frame);
  });
}

function legacyStorageCandidatesFromMessage(message) {
  const candidates = [];
  const parsed = summarizeSerializedWorkspace(message.storage);
  if (parsed.summary.properties || parsed.summary.narratives || parsed.summary.assessments) {
    candidates.push({
      id: `${message.origin}:current`,
      origin: message.origin || "旧版地址",
      label: "当前缓存",
      storage: message.storage,
      backups: message.backups || "",
      summary: parsed.summary,
      score: parsed.score,
    });
  }
  (message.backupEntries || []).forEach((backup) => {
    if (!backup.storage) return;
    candidates.push({
      id: `${message.origin}:backup:${backup.index}`,
      origin: message.origin || "旧版地址",
      label: backup.saved_at ? `备份 ${formatDateTime(backup.saved_at)}` : "历史备份",
      storage: backup.storage,
      backups: message.backups || "",
      summary: backup.summary || summarizeSerializedWorkspace(backup.storage).summary,
      score: backup.score || summarizeSerializedWorkspace(backup.storage).score,
    });
  });
  (message.allStorage || []).forEach((entry) => {
    if (!["icomos_pm_calibration_v1", "icomos_pm_round1_marks"].includes(entry.key)) return;
    candidates.push({
      id: `${message.origin}:key:${entry.key}`,
      origin: message.origin || "旧版地址",
      label: entry.key,
      storage: entry.value || "",
      backups: message.backups || "",
      summary: entry.summary || summarizeStorageValue(entry.key, entry.value || ""),
      score: (entry.bytes || 0) + (entry.summary?.assessments || entry.summary?.marks || 0) * 20,
      kind: entry.key,
    });
  });
  return candidates;
}

function summarizeSerializedWorkspace(serialized) {
  try {
    const parsed = JSON.parse(serialized || "{}");
    const summary = {
      properties: parsed.properties?.length || 0,
      assessments: parsed.property_assessments?.length || 0,
      narratives: parsed.narrative_edits?.length || 0,
      notes: (parsed.narrative_edits || []).filter((row) => row?.section_key === "research_notes" && (row.payload?.note || row.payload?.note_html || row.payload?.summary)).length,
      reviewedRows: [
        ...(parsed.property_assessments || []),
        ...(parsed.criteria_assessments || []),
        ...(parsed.attributes || []),
        ...(parsed.recommendations || []),
      ].filter((row) => hasManualReviewState(row) || rowHasManualContent(row)).length,
      comparators: parsed.comparators?.length || 0,
      attributes: parsed.attributes?.length || 0,
      recommendations: parsed.recommendations?.length || 0,
    };
    const score =
      summary.properties * 2 +
      summary.assessments +
      summary.narratives * 6 +
      summary.notes * 20 +
      summary.reviewedRows * 10 +
      summary.comparators +
      summary.attributes +
      summary.recommendations;
    return { summary, score };
  } catch {
    return { summary: { properties: 0, assessments: 0, narratives: 0, notes: 0, reviewedRows: 0, comparators: 0, attributes: 0, recommendations: 0 }, score: 0 };
  }
}

async function loadCriteriaCorrections() {
  try {
    const response = await fetch(assetPath("/data/criteria-corrections-2026.json"));
    if (!response.ok) return;
    const payload = await response.json();
    criteriaCorrectionProjects = Array.isArray(payload.projects) ? payload.projects : [];
  } catch {
    criteriaCorrectionProjects = [];
  }
}

function initializeSupabase() {
  const config = window.APP_CONFIG || {};
  if (window.supabase && config.SUPABASE_URL && config.SUPABASE_ANON_KEY) {
    supabaseClient = window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
    supabaseClient.auth.getUser().then(({ data }) => {
      currentUser = data?.user || null;
      render();
    });
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user || null;
      render();
    });
  }
}

async function buildSeedState() {
  let rows = [];
  try {
    const response = await fetch(assetPath("/data/protection-management-2026-complete.json"));
    rows = response.ok ? await response.json() : [];
  } catch {
    rows = [];
  }
  if (!Array.isArray(rows) || !rows.length) rows = fallbackPmRows();

  const next = emptyState();
  const propertyMap = new Map();
  propertyMap.set("C1765", { ...jingdezhenSeed.property });
  propertyMap.set(emergencyNominationSeed.id, { ...emergencyNominationSeed });

  rows.forEach((row) => {
    if (!propertyMap.has(row.property_id)) {
      propertyMap.set(row.property_id, {
        id: row.property_id,
        cycle: row.cycle || 2026,
        property_name_en: row.property_name_en,
        property_name_zh: "",
        state_party: row.state_party || "",
        region: regionGuess(row.state_party),
        nomination_type: inferNominationType(row),
        heritage_type: "Cultural",
        property_type: "Cultural property",
        category_of_property: "",
        category_of_property_source_note: "",
        cultural_subtype: "",
        is_serial: false,
        component_count: null,
        is_transnational: false,
        proposed_criteria: [],
        icomos_recommended_criteria: [],
        committee_confirmed_criteria: [],
        icomos_recommendation: normalizeRecommendation(row.recommendation),
        icomos_recommendation_note: recommendationNote(row.recommendation),
        committee_decision: "",
        report_page_start: null,
        report_page_end: null,
        brief_synthesis_en: "",
        brief_synthesis_zh: "",
        review_status: "draft",
      });
    } else if (row.property_id === "C1765") {
      propertyMap.set("C1765", {
        ...propertyMap.get("C1765"),
        icomos_recommendation: normalizeRecommendation(row.recommendation || "Inscription"),
        icomos_recommendation_note: recommendationNote(row.recommendation),
      });
    }

    const inferred = row.check_tool_symbol_inferred || levelToRating[row.ai_inferred_level] || "unknown";
    const human = levelToRating[row.human_calibrated_level || row.final_level] || inferred || "unknown";
    const assessment = {
      id: row.id || `${row.property_id}-${row.assessment_item}`,
      property_id: row.property_id,
      item_key: row.assessment_item,
      ai_inferred_rating: inferred,
      human_calibrated_rating: human,
      official_ppt_rating: "unknown",
      conclusion_zh: row.raw_text_summary_zh || "",
      conclusion_en: "",
      rationale_zh: row.calibration_basis || row.raw_text_summary_zh || "",
      confidence: row.confidence || "medium",
      review_status: row.review_status || "draft",
      reviewer: row.reviewer || "",
      reviewer_note: row.reviewer_note || "",
      updated_at: row.created_at || new Date().toISOString(),
    };
    next.property_assessments.push(assessment);
    next.evidence.push({
      id: `ev-${assessment.id}`,
      property_id: row.property_id,
      source_type: "icomos_final_evaluation",
      source_file: "WHC/26/48.COM/INF.8B1",
      source_section: row.assessment_item_label || labelForItem(row.assessment_item),
      page_number: pageGuess(row.evidence_note),
      quote_en: "",
      summary_zh: row.evidence_note || row.calibration_basis || "",
      interpretation_note: row.calibration_basis || "",
      linked_assessment_item: row.assessment_item,
      reviewer_note: "",
    });
  });

  next.properties = [...propertyMap.values()].sort((a, b) => a.id.localeCompare(b.id));
  next.comparators = [...jingdezhenSeed.comparators];
  next.attributes = [...jingdezhenSeed.attributes];
  next.criteria_assessments = [...jingdezhenSeed.criteria];
  next.recommendations = [...jingdezhenSeed.recommendations];
  next.official_ppt_ratings = next.property_assessments.map((assessment) => ({
    id: `ppt-${assessment.property_id}-${assessment.item_key}`,
    property_id: assessment.property_id,
    item_key: assessment.item_key,
    official_ppt_rating: assessment.official_ppt_rating || "unknown",
    source_type: "unknown",
    source_file: "",
    source_note: "",
    confidence: "medium",
    entered_by: "",
    entered_at: "",
    discrepancy_with_inferred: false,
    discrepancy_with_calibrated: false,
    review_status: "draft",
  }));
  saveLocalState(next);
  return next;
}

function fallbackPmRows() {
  return pmItemKeys.map((item_key) => ({
    id: `2026-C1765-${item_key}`,
    cycle: 2026,
    property_id: "C1765",
    property_name_en: jingdezhenSeed.property.property_name_en,
    state_party: "China",
    recommendation: "Inscription",
    assessment_item: item_key,
    assessment_item_label: labelForItem(item_key),
    ai_inferred_level: item_key === "threats_addressed" ? "B" : "A",
    check_tool_symbol_inferred: item_key === "threats_addressed" ? "tilde" : "check",
    final_level: item_key === "threats_addressed" ? "B" : "A",
    raw_text_summary_zh: "Fallback seed row. Replace with imported JSON data.",
    calibration_basis: "Fallback seed row. Replace with imported JSON data.",
    evidence_note: "",
    review_status: "draft",
  }));
}

async function loadSharedState() {
  if (!supabaseClient) return;
  try {
    const localNarrativeEdits = publicNarrativeEdits(state.narrative_edits || []);
    const localPrivateNarrativeEdits = privateNarrativeEdits(state.narrative_edits || []);
    const localProperties = state.properties || [];
    const [properties, items, assessments, evidence, comparators, attributes, criteria, recommendations, ppt, narrativeEdits] = await Promise.all([
      supabaseClient.from("properties").select("*").order("id"),
      supabaseClient.from("assessment_items").select("*").order("display_order"),
      supabaseClient.from("property_assessments").select("*").order("property_id"),
      supabaseClient.from("evidence").select("*").order("property_id"),
      supabaseClient.from("comparators").select("*").order("comparator_name"),
      supabaseClient.from("attributes").select("*").order("attribute_group"),
      supabaseClient.from("criteria_assessments").select("*").order("criterion"),
      supabaseClient.from("recommendations").select("*").order("recommendation_code"),
      supabaseClient.from("official_ppt_ratings").select("*").order("property_id"),
      supabaseClient.from("narrative_edits").select("*").order("property_id"),
    ]);
    if (properties.error || assessments.error) {
      saveStatus = "Supabase 表尚未建立，当前使用本地种子数据。";
      return;
    }
    if (properties.data?.length) state.properties = properties.data;
    if (items.data?.length) state.assessment_items = items.data;
    if (assessments.data?.length) state.property_assessments = assessments.data.map(normalizeAssessment);
    if (evidence.data?.length) state.evidence = evidence.data;
    if (comparators.data?.length) state.comparators = comparators.data;
    if (attributes.data?.length) state.attributes = attributes.data;
    if (criteria.data?.length) state.criteria_assessments = criteria.data;
    if (recommendations.data?.length) state.recommendations = recommendations.data;
    if (ppt.data?.length) state.official_ppt_ratings = ppt.data;
    if (narrativeEdits.data?.length) {
      state.narrative_edits = [
        ...mergeNarrativeRowsPreservingManualEdits(localNarrativeEdits, publicNarrativeEdits(narrativeEdits.data)),
        ...localPrivateNarrativeEdits,
      ];
    }
    const editHistory = await supabaseClient.from("edit_history").select("*").order("edited_at", { ascending: false }).limit(EDIT_HISTORY_LIMIT);
    if (!editHistory.error && editHistory.data?.length) state.edit_history = mergeEditHistoryRows(state.edit_history || [], editHistory.data);
    state.properties = mergePropertiesPreservingLocalCommitteeDecisions(localProperties, state.properties || []);
    state = normalizeWorkspaceState(state);
    saveLocalState(state);
  } catch {
    saveStatus = "无法连接 Supabase，当前使用本地模式。";
  }
}

function mergePropertiesPreservingLocalCommitteeDecisions(localRows = [], sharedRows = []) {
  const localById = new Map(localRows.map((property) => [property.id, property]));
  return sharedRows.map((property) => {
    const local = localById.get(property.id) || {};
    const localCriteria = normalizeCriteriaList(local.committee_confirmed_criteria || []);
    const localDecision = String(local.committee_decision || "").trim();
    return {
      ...property,
      committee_confirmed_criteria: localCriteria.length ? localCriteria : property.committee_confirmed_criteria || [],
      committee_decision: localDecision || property.committee_decision || "",
    };
  });
}

function normalizeAssessment(row) {
  return {
    ...row,
    id: row.id || `${row.property_id}-${row.item_key}`,
    official_ppt_rating: row.official_ppt_rating || "unknown",
  };
}

function loadLocalState() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function normalizeWorkspaceState(nextState) {
  const normalized = {
    ...emptyState(),
    ...nextState,
    assessment_items: nextState.assessment_items?.length ? nextState.assessment_items : assessmentItems,
  };
  normalized.properties = (normalized.properties || []).map((property) => {
    const normalizedRecommendation = normalizeRecommendation(property.icomos_recommendation);
    const heritageType = property.heritage_type || heritageTypeFromPropertyType(property.property_type);
    const isJingdezhen = property.id === "C1765";
    const hasBriefPlaceholder =
      String(property.brief_synthesis_en || "").includes("Working seed") ||
      String(property.brief_synthesis_zh || "").includes("工作种子");
    const serialInfo = inferSerialInfoFromCategory(property);
    return {
      ...property,
      region: property.region || regionGuess(property.state_party),
      nomination_type: normalizeNominationType(property.nomination_type, property),
      heritage_type: heritageType,
      is_transnational: Boolean(property.is_transnational || String(property.state_party || "").includes("/")),
      cultural_subtype: property.cultural_subtype || "",
      category_of_property: normalizeCategoryOfProperty(isJingdezhen && !property.category_of_property ? "site" : property.category_of_property),
      category_of_property_source_note:
        simplifyCategorySourceNote(property) ||
        (isJingdezhen ? "serial: 5 sites" : ""),
      is_serial: Boolean(property.is_serial || serialInfo.isSerial),
      component_count: property.component_count ?? serialInfo.componentCount ?? (isJingdezhen ? 5 : null),
      committee_confirmed_criteria: property.committee_confirmed_criteria || [],
      icomos_recommendation: normalizedRecommendation,
      icomos_recommendation_note: property.icomos_recommendation_note || recommendationNote(property.icomos_recommendation),
      committee_decision: property.committee_decision || "",
      committee_pm_requirements: property.committee_pm_requirements || "",
      brief_synthesis_en: isJingdezhen && hasBriefPlaceholder ? jingdezhenBriefSynthesisEn : property.brief_synthesis_en || "",
      brief_synthesis_zh: isJingdezhen && hasBriefPlaceholder ? jingdezhenBriefSynthesisZh : property.brief_synthesis_zh || "",
    };
  });
  if (!normalized.properties.some((property) => property.id === emergencyNominationSeed.id)) {
    normalized.properties.push({ ...emergencyNominationSeed });
  }
  normalized.properties = normalized.properties.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  normalized.edit_history = (normalized.edit_history || [])
    .map(normalizeEditHistoryRow)
    .filter(Boolean)
    .sort((a, b) => String(b.edited_at || "").localeCompare(String(a.edited_at || "")))
    .slice(0, EDIT_HISTORY_LIMIT);
  const otherComparators = (normalized.comparators || []).filter((entry) => entry.property_id !== "C1765");
  const jingdezhenComparators = (normalized.comparators || []).filter((entry) => entry.property_id === "C1765");
  const staleJingdezhenComparators = hasStaleJingdezhenComparators(jingdezhenComparators);
  if (staleJingdezhenComparators) normalized.comparators = [...otherComparators, ...jingdezhenSeed.comparators];
  ensureJingdezhenComparativeNarrative(normalized, staleJingdezhenComparators);

  const otherCriteria = (normalized.criteria_assessments || []).filter((entry) => entry.property_id !== "C1765");
  const jingdezhenCriteria = (normalized.criteria_assessments || []).filter((entry) => entry.property_id === "C1765");
  const staleJingdezhenCriteria =
    !jingdezhenCriteria.length ||
    jingdezhenCriteria.some((entry) => String(entry.summary_zh || "").includes("初始记录")) ||
    jingdezhenCriteria.some((entry) => !entry.summary_en);
  if (staleJingdezhenCriteria) normalized.criteria_assessments = [...otherCriteria, ...jingdezhenSeed.criteria];

  const otherRecommendations = (normalized.recommendations || []).filter((entry) => entry.property_id !== "C1765");
  const jingdezhenRecommendations = (normalized.recommendations || []).filter((entry) => entry.property_id === "C1765");
  const staleJingdezhenRecommendations =
    jingdezhenRecommendations.filter((entry) => entry.included_in_final_recommendations !== false).length < 3 ||
    jingdezhenRecommendations.some((entry) => String(entry.recommendation_code || "").startsWith("JDZ-P")) ||
    jingdezhenRecommendations.some((entry) => entry.recommendation_code === "JDZ-R1" && !String(entry.summary_zh || "").includes("能力建设"));
  if (staleJingdezhenRecommendations) normalized.recommendations = [...otherRecommendations, ...jingdezhenSeed.recommendations];
  ensureAaltoWorksRecommendations(normalized);
  ensureBulwarkedFortressesBrief(normalized);
  ensureBulwarkedFortressesRecommendations(normalized);
  ensureCarcassonneRecommendations(normalized);
  ensureXiongnuRecommendations(normalized);
  ensureXiongnuComparators(normalized);
  ensureZerzevanCastleBrief(normalized);
  ensureCarcassonneBrief(normalized);
  ensureZerzevanComparators(normalized);
  ensureNonSerialSelectionNotApplicable(normalized);
  ensureJingdezhenBriefParagraphs(normalized);
  ensureJingdezhenRecommendationCriteria(normalized);
  ensureJingdezhenCoreConclusionNarrative(normalized);
  ensureJingdezhenProtectionNarrative(normalized);
  applyKnownCriteriaCorrections(normalized);
  ensureBerlinExtensionSerialSelection(normalized);
  ensureJingdezhenAssessmentRating(normalized, "comparative_analysis", "check");
  jingdezhenEvaluationSummaries.core.forEach((entry) => ensureJingdezhenAssessmentRating(normalized, entry.key, entry.rating));
  ensureConciseConservationMeasures(normalized);
  return normalized;
}

function ensureAaltoWorksRecommendations(normalized) {
  const existingCodes = new Set((normalized.recommendations || []).map((entry) => String(entry.recommendation_code || "")));
  const missingRows = aaltoWorksRecommendationSeed.filter((entry) => !existingCodes.has(entry.recommendation_code));
  if (missingRows.length) normalized.recommendations = [...(normalized.recommendations || []), ...missingRows];
}

function ensureBulwarkedFortressesRecommendations(normalized) {
  const existingCodes = new Set((normalized.recommendations || []).map((entry) => String(entry.recommendation_code || "")));
  const missingRows = bulwarkedFortressesRecommendationSeed.filter((entry) => !existingCodes.has(entry.recommendation_code));
  if (missingRows.length) normalized.recommendations = [...(normalized.recommendations || []), ...missingRows];
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1753" && entry.section_key === "recommendations");
  if (!narrative) {
    narrative = {
      property_id: "C1753",
      section_key: "recommendations",
      payload: {},
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  if (narrative?.payload) {
    narrative.payload.source_pages = {
      ...(narrative.payload.source_pages || {}),
      recommendations: 316,
    };
  }
}

function ensureCarcassonneRecommendations(normalized) {
  const existingCodes = new Set((normalized.recommendations || []).map((entry) => String(entry.recommendation_code || "")));
  const missingRows = carcassonneRecommendationSeed.filter((entry) => !existingCodes.has(entry.recommendation_code));
  if (missingRows.length) normalized.recommendations = [...(normalized.recommendations || []), ...missingRows];
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1755" && entry.section_key === "recommendations");
  if (!narrative) {
    narrative = {
      property_id: "C1755",
      section_key: "recommendations",
      payload: {},
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  if (narrative?.payload) {
    narrative.payload.source_pages = {
      ...(narrative.payload.source_pages || {}),
      recommendations: 227,
    };
  }
}

function ensureXiongnuRecommendations(normalized) {
  const seedCodes = new Set(xiongnuRecommendationSeed.map((entry) => entry.recommendation_code));
  const otherRows = (normalized.recommendations || []).filter(
    (entry) =>
      entry.property_id !== "C1759" ||
      entry.recommendation_level !== "final_recommendation" ||
      entry.included_in_final_recommendations === false ||
      !seedCodes.has(String(entry.recommendation_code || "")),
  );
  const existingByCode = new Map(
    (normalized.recommendations || [])
      .filter((entry) => entry.property_id === "C1759" && entry.recommendation_level === "final_recommendation")
      .map((entry) => [String(entry.recommendation_code || ""), entry]),
  );
  const correctedRows = xiongnuRecommendationSeed.map((seed) => ({
    ...(existingByCode.get(seed.recommendation_code) || {}),
    ...seed,
  }));
  normalized.recommendations = [...otherRows, ...correctedRows];

  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1759" && entry.section_key === "recommendations");
  if (!narrative) {
    narrative = {
      property_id: "C1759",
      section_key: "recommendations",
      payload: {},
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  narrative.payload = narrative.payload || {};
  narrative.payload.entries = narrative.payload.entries || {};
  const sameText = (a, b) => String(a || "").replace(/\s+/g, " ").trim() === String(b || "").replace(/\s+/g, " ").trim();
  xiongnuRecommendationSeed.forEach((seed) => {
    const currentEntry = narrative.payload.entries[seed.recommendation_code] || {};
    const currentSource = String(currentEntry.source_en || "").trim();
    const sourceNeedsRefresh = !sameText(currentSource, seed.text_en);
    narrative.payload.entries[seed.recommendation_code] = {
      ...currentEntry,
      source_en: seed.text_en,
      summary:
        sourceNeedsRefresh || !currentEntry.summary || /待录入|ICOMOS正式建议条目/.test(currentEntry.summary)
          ? seed.summary_zh
          : currentEntry.summary,
    };
  });
  narrative.payload.icomos_items = [];
  narrative.payload.source_pages = {
    ...(narrative.payload.source_pages || {}),
    recommendations: 154,
  };
}

function ensureXiongnuComparators(normalized) {
  const existing = normalized.comparators || [];
  const existingNames = new Set(
    existing
      .filter((entry) => entry.property_id === "C1759")
      .map((entry) => normalizeComparatorName(entry.comparator_name))
  );
  const missingRows = xiongnuComparatorsSeed.filter((entry) => !existingNames.has(normalizeComparatorName(entry.comparator_name)));
  if (missingRows.length) {
    normalized.comparators = [...existing, ...missingRows.map((entry) => ({ ...entry }))];
  }

  const c1759Comparators = (normalized.comparators || []).filter((entry) => entry.property_id === "C1759");
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1759" && entry.section_key === "comparative");
  if (!narrative) {
    narrative = {
      property_id: "C1759",
      section_key: "comparative",
      payload: {},
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  narrative.payload = narrative.payload || {};
  const derivedGroups = comparatorGroupTextsFromEntries(c1759Comparators, { comparators: narrative.payload.comparators || {} });
  const currentGroups = { ...(narrative.payload.comparator_groups || {}) };
  comparatorGroupDefinitions.forEach(({ key }) => {
    if (!String(currentGroups[key] || "").trim()) currentGroups[key] = derivedGroups[key] || "";
  });
  currentGroups.world_heritage = appendMissingComparatorParagraphs(currentGroups.world_heritage, derivedGroups.world_heritage, [
    "World Heritage List properties",
  ]);
  currentGroups.tentative_list = appendMissingComparatorParagraphs(currentGroups.tentative_list, derivedGroups.tentative_list, [
    "Pazyryk",
  ]);
  currentGroups.not_listed = appendMissingComparatorParagraphs(currentGroups.not_listed, derivedGroups.not_listed, [
    "Xiongnu cemetery",
    "Han China",
    "Nannang",
  ]);
  narrative.payload.comparator_groups = currentGroups;
  narrative.payload.source_pages = {
    ...(narrative.payload.source_pages || {}),
    comparative: 147,
  };
}

function ensureBulwarkedFortressesBrief(normalized) {
  const property = normalized.properties.find((entry) => entry.id === "C1753");
  if (property && shouldRefreshBulwarkedBrief(property.brief_synthesis_en, property.brief_synthesis_zh)) {
    property.brief_synthesis_en = bulwarkedFortressesBriefSeed.briefEn;
    property.brief_synthesis_zh = bulwarkedFortressesBriefSeed.briefZh;
  }
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1753" && entry.section_key === "brief");
  if (!narrative) {
    narrative = {
      property_id: "C1753",
      section_key: "brief",
      payload: {},
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  if (narrative.payload && shouldRefreshBulwarkedBrief(narrative.payload.brief_en, narrative.payload.brief_zh)) {
    narrative.payload.brief_en = bulwarkedFortressesBriefSeed.briefEn;
    narrative.payload.brief_zh = bulwarkedFortressesBriefSeed.briefZh;
  }
  if (narrative.payload) {
    narrative.payload.source_pages = {
      ...(narrative.payload.source_pages || {}),
      brief: bulwarkedFortressesBriefSeed.sourcePage,
    };
  }
}

function shouldRefreshBulwarkedBrief(sourceEn, sourceZh) {
  const en = String(sourceEn || "").trim();
  const zh = String(sourceZh || "").trim();
  if (!en && !zh) return true;
  return (
    !en &&
    /未给出推荐OUV|未给出推荐 OUV|Referral\/Deferral\/Non-inscription|边界调整/.test(zh)
  );
}

function ensureZerzevanCastleBrief(normalized) {
  const property = normalized.properties.find((entry) => entry.id === "C1754");
  if (property && shouldRefreshBulwarkedBrief(property.brief_synthesis_en, property.brief_synthesis_zh)) {
    property.brief_synthesis_en = zerzevanCastleBriefSeed.briefEn;
    property.brief_synthesis_zh = zerzevanCastleBriefSeed.briefZh;
  }
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1754" && entry.section_key === "brief");
  if (!narrative) {
    narrative = {
      property_id: "C1754",
      section_key: "brief",
      payload: {},
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  if (narrative.payload && shouldRefreshBulwarkedBrief(narrative.payload.brief_en, narrative.payload.brief_zh)) {
    narrative.payload.brief_en = zerzevanCastleBriefSeed.briefEn;
    narrative.payload.brief_zh = zerzevanCastleBriefSeed.briefZh;
  }
  if (narrative.payload) {
    narrative.payload.source_pages = {
      ...(narrative.payload.source_pages || {}),
      brief: zerzevanCastleBriefSeed.sourcePage,
    };
  }
}

function ensureCarcassonneBrief(normalized) {
  const property = normalized.properties.find((entry) => entry.id === "C1755");
  if (property && shouldRefreshCarcassonneBrief(property.brief_synthesis_en, property.brief_synthesis_zh)) {
    property.brief_synthesis_en = carcassonneBriefSeed.briefEn;
    property.brief_synthesis_zh = carcassonneBriefSeed.briefZh;
  }
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1755" && entry.section_key === "brief");
  if (!narrative) {
    narrative = {
      property_id: "C1755",
      section_key: "brief",
      payload: {},
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  if (narrative.payload && shouldRefreshCarcassonneBrief(narrative.payload.brief_en, narrative.payload.brief_zh)) {
    narrative.payload.brief_en = carcassonneBriefSeed.briefEn;
    narrative.payload.brief_zh = carcassonneBriefSeed.briefZh;
  }
  if (narrative.payload) {
    narrative.payload.source_pages = {
      ...(narrative.payload.source_pages || {}),
      brief: carcassonneBriefSeed.sourcePage,
    };
  }
}

function shouldRefreshCarcassonneBrief(sourceEn, sourceZh) {
  const en = String(sourceEn || "").trim();
  const zh = String(sourceZh || "").trim();
  if (!en && !zh) return true;
  return (
    en.length < 500 ||
    /secure newly\s*$/.test(en) ||
    /The regional defensive fortification system established[\s\S]*secure newly\s*$/.test(en) ||
    /未给出推荐OUV|未给出推荐 OUV|待抽取|工作译文/.test(zh)
  );
}

function ensureZerzevanComparators(normalized) {
  const existing = normalized.comparators || [];
  const existingNames = new Set(
    existing
      .filter((entry) => entry.property_id === "C1754")
      .map((entry) => normalizeComparatorName(entry.comparator_name))
  );
  const missingRows = zerzevanComparatorsSeed.filter((entry) => !existingNames.has(normalizeComparatorName(entry.comparator_name)));
  if (missingRows.length) {
    normalized.comparators = [...existing, ...missingRows.map((entry) => ({ ...entry }))];
  }
  const c1754Comparators = (normalized.comparators || []).filter((entry) => entry.property_id === "C1754");
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1754" && entry.section_key === "comparative");
  if (!narrative) {
    narrative = {
      property_id: "C1754",
      section_key: "comparative",
      payload: {},
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  if (!narrative.payload) narrative.payload = {};
  const derivedGroups = comparatorGroupTextsFromEntries(c1754Comparators, narrative.payload);
  const currentGroups = { ...(narrative.payload.comparator_groups || {}) };
  comparatorGroupDefinitions.forEach(({ key }) => {
    if (!String(currentGroups[key] || "").trim()) {
      currentGroups[key] = derivedGroups[key] || "";
    }
  });
  currentGroups.not_listed = appendMissingComparatorParagraphs(
    currentGroups.not_listed,
    derivedGroups.not_listed,
    ["Carrawburgh", "Künzing", "Apulum"]
  );
  narrative.payload.comparator_groups = currentGroups;
}

function normalizeComparatorName(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function appendMissingComparatorParagraphs(currentText, sourceText, requiredNames = []) {
  let next = String(currentText || "").trim();
  const source = String(sourceText || "").trim();
  if (!source) return next;
  requiredNames.forEach((name) => {
    if (new RegExp(escapeRegExp(name), "i").test(next)) return;
    const paragraph = source
      .split(/\n{2,}/)
      .map((entry) => entry.trim())
      .find((entry) => new RegExp(escapeRegExp(name), "i").test(entry));
    if (paragraph) next = next ? `${next}\n\n${paragraph}` : paragraph;
  });
  return next;
}

function ensureNonSerialSelectionNotApplicable(normalized) {
  const nonSerialIds = new Set((normalized.properties || []).filter((property) => !property.is_serial).map((property) => property.id));
  if (!nonSerialIds.size) return;
  (normalized.property_assessments || []).forEach((assessment) => {
    if (assessment.item_key !== "serial_selection" || !nonSerialIds.has(assessment.property_id)) return;
    assessment.ai_inferred_rating = "not_applicable";
    assessment.human_calibrated_rating = "not_applicable";
    assessment.conclusion_en = assessment.conclusion_en || "Not a serial nomination.";
    assessment.conclusion_zh = assessment.conclusion_zh || "非系列遗产，不适用系列遗产组成部分筛选。";
  });
  (normalized.narrative_edits || []).forEach((entry) => {
    if (entry.section_key !== "serial" || !nonSerialIds.has(entry.property_id)) return;
    entry.payload = entry.payload || {};
    entry.payload.assessment_ratings = entry.payload.assessment_ratings || {};
    entry.payload.assessment_ratings.serial_selection = "not_applicable";
    entry.payload.entries_en = entry.payload.entries_en || {};
    entry.payload.entries = entry.payload.entries || {};
    entry.payload.entries_en.serial_selection = entry.payload.entries_en.serial_selection || "Not a serial nomination.";
    entry.payload.entries.serial_selection = entry.payload.entries.serial_selection || "非系列遗产，不适用系列遗产组成部分筛选。";
  });
}

function ensureConciseConservationMeasures(normalized) {
  (normalized.properties || []).forEach((property) => {
    const propertyId = property.id;
    let narrative = normalized.narrative_edits.find((entry) => entry.property_id === propertyId && entry.section_key === "protection");
    const assessment = normalized.property_assessments.find((entry) => entry.property_id === propertyId && entry.item_key === "conservation");
    const concise = conciseConservationText(propertyId, assessment, narrative?.payload);
    if (!concise) return;

    if (!narrative) {
      narrative = {
        property_id: propertyId,
        section_key: "protection",
        payload: { entries: {}, entries_en: {}, assessment_ratings: {} },
        updated_at: new Date().toISOString(),
      };
      normalized.narrative_edits.push(narrative);
    }
    narrative.payload = narrative.payload || {};
    narrative.payload.entries = narrative.payload.entries || {};
    narrative.payload.entries_en = narrative.payload.entries_en || {};
    narrative.payload.assessment_ratings = narrative.payload.assessment_ratings || {};

    if (isBadConservationSource(narrative.payload.entries_en.conservation)) {
      narrative.payload.entries_en.conservation = concise;
      narrative.payload.entries.conservation = narrative.payload.entries.conservation || concise;
      narrative.updated_at = new Date().toISOString();
    }
    if (assessment && isBadConservationSource(assessment.conclusion_en)) {
      assessment.conclusion_en = concise;
      assessment.conclusion_zh = assessment.conclusion_zh || concise;
      assessment.rationale_zh = assessment.rationale_zh || concise;
      assessment.updated_at = new Date().toISOString();
    }
  });
}

function conciseConservationText(propertyId, assessment, payload = {}) {
  if (propertyId === "C1765") {
    return jingdezhenEvaluationSummaries.protectionManagement.find((entry) => entry.key === "conservation")?.source_en || "";
  }
  const candidates = [
    payload?.entries?.conservation,
    assessment?.conclusion_zh,
    assessment?.rationale_zh,
    conservationShortConclusionByPropertyId[propertyId],
  ];
  return cleanImportedText(candidates.find((value) => value && !isBadConservationSource(value)) || "");
}

function isBadConservationSource(text) {
  const source = String(text || "").trim();
  if (!source) return false;
  return (
    source.length > 900 ||
    /^State of conservation\s*(?:\n|$)/i.test(source) ||
    /^The State Party\b/i.test(source) ||
    source.includes("The State Party has provided an evaluation of the state of conservation") ||
    /According to the State Party/i.test(source)
  );
}

function hasStaleJingdezhenComparators(comparators) {
  if (!comparators.length) return true;
  if (comparators.length < jingdezhenSeed.comparators.length) return true;
  const names = new Set(comparators.map((entry) => String(entry.comparator_name || "")));
  if (!names.has("Historic Town of Sukhothai and Associated Historic Towns")) return true;
  return comparators.some(
    (entry) =>
      entry.heritage_status === "Unknown" ||
      suspiciousComparatorName(entry.comparator_name) ||
      suspiciousComparatorSummary(entry.icomos_comment_summary_zh) ||
      String(entry.icomos_comment_summary_zh || "").includes("待从比较分析"),
  );
}

function suspiciousComparatorName(name) {
  const text = String(name || "").trim();
  if (!text) return true;
  if (/^(Towns|Archaeological City|Kiln Sites|Official Kiln)$/i.test(text)) return true;
  if (text.split(/\s+/).length <= 2 && /towns?|city|kiln|sites?/i.test(text)) return true;
  return false;
}

function suspiciousComparatorSummary(summary) {
  const text = String(summary || "");
  return /^(Towns|Archaeological City|Kiln Sites|Official Kiln)\s*\(/i.test(text);
}

function ensureJingdezhenComparativeNarrative(normalized, refreshedComparators) {
  const narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1765" && entry.section_key === "comparative");
  if (!narrative?.payload) return;
  const comparatorOverrides = narrative.payload.comparators || {};
  const hasStaleOverride = Object.values(comparatorOverrides).some((value) => suspiciousComparatorSummary(value) || suspiciousComparatorName(value));
  if (refreshedComparators || hasStaleOverride) {
    narrative.payload.comparators = {};
  }
  if (!narrative.payload.summary_en || /待抽取|Unknown/i.test(String(narrative.payload.summary_en))) {
    narrative.payload.summary_en = jingdezhenEvaluationSummaries.comparativeEn;
  }
  if (!narrative.payload.summary || String(narrative.payload.summary).includes("待抽取")) {
    narrative.payload.summary = jingdezhenEvaluationSummaries.comparative;
  }
}

function ensureJingdezhenBriefParagraphs(normalized) {
  const property = normalized.properties.find((entry) => entry.id === "C1765");
  if (property && shouldRefreshJingdezhenBrief(property.brief_synthesis_en)) {
    property.brief_synthesis_en = jingdezhenBriefSynthesisEn;
    property.brief_synthesis_zh = jingdezhenBriefSynthesisZh;
  }
  const narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1765" && entry.section_key === "brief");
  if (narrative?.payload && shouldRefreshJingdezhenBrief(narrative.payload.brief_en)) {
    narrative.payload.brief_en = jingdezhenBriefSynthesisEn;
    narrative.payload.brief_zh = jingdezhenBriefSynthesisZh;
  }
  if (narrative?.payload) {
    narrative.payload.source_pages = {
      ...(narrative.payload.source_pages || {}),
      brief: 93,
    };
  }
}

function shouldRefreshJingdezhenBrief(text) {
  const source = String(text || "");
  return (
    source.includes("The Jingdezhen Handicraft Porcelain Industry Sites are located in an area") &&
    source.includes("promoting the widespread dissemination of Chinese porcelain making technology") &&
    !source.includes("\n\n")
  );
}

function ensureJingdezhenRecommendationCriteria(normalized) {
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1765" && entry.section_key === "criteria");
  if (!narrative) {
    narrative = {
      property_id: "C1765",
      section_key: "criteria",
      payload: { intro: "引用 ICOMOS 结论部分对价值标准的判断摘要。", criteria_en: {}, criteria: {} },
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  narrative.payload = narrative.payload || {};
  narrative.payload.recommendation_criteria_en = narrative.payload.recommendation_criteria_en || {};
  narrative.payload.recommendation_criteria = narrative.payload.recommendation_criteria || {};
  Object.entries(jingdezhenRecommendationCriteria).forEach(([criterion, value]) => {
    if (shouldRefreshRecommendationCriterion(narrative.payload.recommendation_criteria_en[criterion])) {
      narrative.payload.recommendation_criteria_en[criterion] = value.source;
      narrative.payload.recommendation_criteria[criterion] = value.translation;
    }
  });
}

function ensureJingdezhenCoreConclusionNarrative(normalized) {
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1765" && entry.section_key === "core");
  if (!narrative) {
    narrative = {
      property_id: "C1765",
      section_key: "core",
      payload: { entries: {}, entries_en: {} },
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  narrative.payload = narrative.payload || {};
  narrative.payload.entries = narrative.payload.entries || {};
  narrative.payload.entries_en = narrative.payload.entries_en || {};
  ["integrity", "authenticity", "integrity_authenticity_conclusion", "boundaries"].forEach((key) => {
    const seed = jingdezhenEvaluationSummaries.core.find((entry) => entry.key === key);
    if (!seed) return;
    if (shouldRefreshJingdezhenCoreConclusion(narrative.payload.entries_en[key], key)) {
      narrative.payload.entries_en[key] = seed.source_en;
      narrative.payload.entries[key] = seed.summary;
    }
  });
}

function shouldRefreshJingdezhenCoreConclusion(text, key) {
  const source = String(text || "").trim();
  if (!source) return true;
  if (key === "integrity") {
    return (
      source.startsWith("The integrity of the nominated serial property is based on") ||
      source.includes("The state of conservation is generally good/stable")
    );
  }
  if (key === "authenticity") {
    return (
      source.startsWith("The authenticity of the nominated property is based on") ||
      source.includes("form and design, use and function")
    );
  }
  if (key === "boundaries") {
    return (
      source.startsWith("There are 44,500 inhabitants") ||
      source.includes("According to the State Party, the boundaries")
    );
  }
  if (key === "integrity_authenticity_conclusion") {
    return false;
  }
  return false;
}

function ensureJingdezhenProtectionNarrative(normalized) {
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1765" && entry.section_key === "protection");
  if (!narrative) {
    narrative = {
      property_id: "C1765",
      section_key: "protection",
      payload: { entries: {}, entries_en: {} },
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  narrative.payload = narrative.payload || {};
  narrative.payload.entries = narrative.payload.entries || {};
  narrative.payload.entries_en = narrative.payload.entries_en || {};
  jingdezhenEvaluationSummaries.protectionManagement.forEach((seed) => {
    if (shouldRefreshJingdezhenProtectionConclusion(narrative.payload.entries_en[seed.key], seed)) {
      narrative.payload.entries_en[seed.key] = seed.source_en;
      narrative.payload.entries[seed.key] = seed.summary;
    }
  });
}

function shouldRefreshJingdezhenProtectionConclusion(text, seed) {
  const source = String(text || "").trim();
  if (!source) return true;
  if (source === seed.source_en) return false;
  if (seed.key === "conservation") {
    return (
      source.startsWith("State of conservation The State Party") ||
      source.includes("The State Party has provided an evaluation of the state of conservation") ||
      source.length > 1200
    );
  }
  return false;
}

function shouldRefreshRecommendationCriterion(text) {
  const source = String(text || "").trim();
  return (
    !source ||
    /this criterion is demonstrated/i.test(source) ||
    /meets criteri(?:on|a)[^.]*but that criteria/i.test(source)
  );
}

function shouldAutoReplaceText(text) {
  const source = String(text || "").trim();
  if (!source) return true;
  return /待抽取|待录入|待补充|待核对|Unknown|Fallback seed|初始记录|工作种子|需在项目页面中按主题分类复核|not_applicable|not a serial nomination|非系列遗产|不适用系列遗产/i.test(source);
}

function applyKnownCriteriaCorrections(normalized) {
  applyCriteriaCorrectionsFromData(normalized);
  const sidi = normalized.properties.find((property) => property.id === "C1769");
  if (sidi) {
    sidi.proposed_criteria = ["ii", "iv", "vi"];
    sidi.icomos_recommended_criteria = ["iii"];
    sidi.category_of_property = sidiBouSaidCategoryCorrection.proposed;
    sidi.category_of_property_source_note = `${sidiBouSaidCategoryCorrection.note} Article I category: ${sidiBouSaidCategoryCorrection.articleI}.`;
  }
  Object.values(sidiBouSaidCriterionCorrections).forEach((correction) => {
    let criterionRow = normalized.criteria_assessments.find((entry) => entry.property_id === "C1769" && entry.criterion === correction.criterion);
    if (!criterionRow) {
      normalized.criteria_assessments.push({
        property_id: "C1769",
        ...correction,
        summary_en: correction.source_en,
        summary_zh: correction.summary_zh,
        review_status: "draft",
      });
      return;
    }
    Object.assign(criterionRow, correction, {
      summary_en: correction.source_en,
      summary_zh: correction.summary_zh,
    });
  });
  let criteriaNarrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1769" && entry.section_key === "criteria");
  if (!criteriaNarrative) {
    criteriaNarrative = {
      property_id: "C1769",
      section_key: "criteria",
      payload: { intro: "引用 ICOMOS 结论部分对价值标准的判断摘要。", criteria_en: {}, criteria: {} },
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(criteriaNarrative);
  }
  criteriaNarrative.payload = criteriaNarrative.payload || {};
  criteriaNarrative.payload.criteria_en = criteriaNarrative.payload.criteria_en || {};
  criteriaNarrative.payload.criteria = criteriaNarrative.payload.criteria || {};
  Object.values(sidiBouSaidCriterionCorrections).forEach((correction) => {
    if (shouldAutoReplaceText(criteriaNarrative.payload.criteria_en[correction.criterion])) {
      criteriaNarrative.payload.criteria_en[correction.criterion] = correction.source_en;
    }
    if (shouldAutoReplaceText(criteriaNarrative.payload.criteria[correction.criterion])) {
      criteriaNarrative.payload.criteria[correction.criterion] = correction.summary_zh;
    }
  });
  normalized.criteria_assessments.forEach((entry) => {
    if (/State Party has not proposed this criterion/i.test(entry.summary_en || "")) entry.proposed_by_state_party = false;
  });
}

function applyCriteriaCorrectionsFromData(normalized) {
  if (!criteriaCorrectionProjects.length) return;
  criteriaCorrectionProjects.forEach((projectCorrection) => {
    const propertyId = projectCorrection.property_id;
    if (!propertyId) return;
    const property = normalized.properties.find((entry) => entry.id === propertyId);
    if (!property) return;
    if (propertyId === "C1765") {
      applySerialSelectionCorrection(normalized, property, projectCorrection.serial_selection || {});
      return;
    }

    const correctedCriteria = Array.isArray(projectCorrection.criteria) ? projectCorrection.criteria : [];
    if (!correctedCriteria.length) return;

    property.proposed_criteria = normalizeCriteriaList(projectCorrection.proposed_criteria).length
      ? normalizeCriteriaList(projectCorrection.proposed_criteria)
      : property.proposed_criteria || [];
    property.icomos_recommended_criteria = normalizeCriteriaList(projectCorrection.icomos_recommended_criteria);

    const previousCriteriaRows = (normalized.criteria_assessments || []).filter((entry) => entry.property_id === propertyId);
    const previousCriteriaByKey = new Map(previousCriteriaRows.map((entry) => [entry.criterion, entry]));
    normalized.criteria_assessments = normalized.criteria_assessments.filter((entry) => entry.property_id !== propertyId);
    correctedCriteria.forEach((correction) => {
      const previous = previousCriteriaByKey.get(correction.criterion) || {};
      normalized.criteria_assessments.push({
        ...previous,
        property_id: propertyId,
        criterion: correction.criterion,
        proposed_by_state_party: Boolean(correction.proposed_by_state_party),
        accepted_by_icomos: Boolean(correction.accepted_by_icomos),
        judgement: correction.judgement || (correction.accepted_by_icomos ? "accepted" : "rejected"),
        summary_en: shouldAutoReplaceText(previous.summary_en) ? correction.source_en || "" : previous.summary_en,
        summary_zh: shouldAutoReplaceText(previous.summary_zh) ? correction.summary_zh || "" : previous.summary_zh,
        review_status: previous.review_status || "draft",
      });
    });

    let criteriaNarrative = normalized.narrative_edits.find((entry) => entry.property_id === propertyId && entry.section_key === "criteria");
    if (!criteriaNarrative) {
      criteriaNarrative = {
        property_id: propertyId,
        section_key: "criteria",
        payload: { intro: "引用 ICOMOS 结论部分对价值标准的判断摘要。", criteria_en: {}, criteria: {} },
        updated_at: new Date().toISOString(),
      };
      normalized.narrative_edits.push(criteriaNarrative);
    }
    criteriaNarrative.payload = criteriaNarrative.payload || {};
    criteriaNarrative.payload.criteria_en = criteriaNarrative.payload.criteria_en || {};
    criteriaNarrative.payload.criteria = criteriaNarrative.payload.criteria || {};
    criteriaNarrative.payload.recommendation_criteria_en = criteriaNarrative.payload.recommendation_criteria_en || {};
    criteriaNarrative.payload.recommendation_criteria = criteriaNarrative.payload.recommendation_criteria || {};
    correctedCriteria.forEach((correction) => {
      if (shouldAutoReplaceText(criteriaNarrative.payload.criteria_en[correction.criterion])) {
        criteriaNarrative.payload.criteria_en[correction.criterion] = correction.source_en || "";
      }
      if (shouldAutoReplaceText(criteriaNarrative.payload.criteria[correction.criterion])) {
        criteriaNarrative.payload.criteria[correction.criterion] = correction.summary_zh || "";
      }
    });
    Object.entries(projectCorrection.recommendation_criteria || {}).forEach(([criterion, source]) => {
      const existing = criteriaNarrative.payload.recommendation_criteria_en[criterion] || "";
      if (!existing || /meets criteri(?:on|a)[^.]*but that criteria/i.test(existing)) {
        criteriaNarrative.payload.recommendation_criteria_en[criterion] = source || "";
      }
      criteriaNarrative.payload.recommendation_criteria[criterion] = criteriaNarrative.payload.recommendation_criteria[criterion] || "";
    });

    applySerialSelectionCorrection(normalized, property, projectCorrection.serial_selection || {});
  });
}

function applySerialSelectionCorrection(normalized, property, serialSelection) {
  const propertyId = property.id;
  const isSerial = Boolean(property.is_serial);
  const source = serialSelection.source_en || "";
  const summary = serialSelection.summary_zh || "";
  const rating = isSerial ? normalizeRatingValue(serialSelection.rating || "unknown") : "not_applicable";
  let assessment = normalized.property_assessments.find((entry) => entry.property_id === propertyId && entry.item_key === "serial_selection");
  if (!assessment) {
    assessment = {
      id: `${propertyId}-serial_selection`,
      property_id: propertyId,
      item_key: "serial_selection",
      ai_inferred_rating: rating,
      human_calibrated_rating: rating,
      official_ppt_rating: "unknown",
      conclusion_zh: "",
      conclusion_en: "",
      rationale_zh: "",
      confidence: "medium",
      review_status: "draft",
      reviewer: "",
      reviewer_note: "",
      updated_at: new Date().toISOString(),
    };
    normalized.property_assessments.push(assessment);
  }
  if (!assessment.ai_inferred_rating || assessment.ai_inferred_rating === "unknown") assessment.ai_inferred_rating = rating;
  if (!assessment.human_calibrated_rating || assessment.human_calibrated_rating === "unknown") assessment.human_calibrated_rating = rating;
  if (shouldAutoReplaceText(assessment.conclusion_en)) assessment.conclusion_en = isSerial ? source : "Not a serial nomination.";
  if (shouldAutoReplaceText(assessment.conclusion_zh)) assessment.conclusion_zh = isSerial ? summary : "非系列遗产，不适用系列遗产组成部分筛选。";
  if (shouldAutoReplaceText(assessment.rationale_zh)) assessment.rationale_zh = assessment.conclusion_zh;

  let serialNarrative = normalized.narrative_edits.find((entry) => entry.property_id === propertyId && entry.section_key === "serial");
  if (!serialNarrative) {
    serialNarrative = {
      property_id: propertyId,
      section_key: "serial",
      payload: { entries_en: {}, entries: {}, assessment_ratings: {} },
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(serialNarrative);
  }
  serialNarrative.payload = serialNarrative.payload || {};
  serialNarrative.payload.entries_en = serialNarrative.payload.entries_en || {};
  serialNarrative.payload.entries = serialNarrative.payload.entries || {};
  serialNarrative.payload.assessment_ratings = serialNarrative.payload.assessment_ratings || {};
  if (shouldAutoReplaceText(serialNarrative.payload.entries_en.serial_selection)) {
    serialNarrative.payload.entries_en.serial_selection = isSerial ? source : "Not a serial nomination.";
  }
  if (shouldAutoReplaceText(serialNarrative.payload.entries.serial_selection)) {
    serialNarrative.payload.entries.serial_selection = isSerial ? summary : "非系列遗产，不适用系列遗产组成部分筛选。";
  }
  if (!serialNarrative.payload.assessment_ratings.serial_selection || serialNarrative.payload.assessment_ratings.serial_selection === "unknown") {
    serialNarrative.payload.assessment_ratings.serial_selection = rating;
  }
}

function ensureJingdezhenAssessmentRating(normalized, itemKey, rating) {
  if (!rating || rating === "unknown") return;
  const assessments = normalized.property_assessments || [];
  let assessment = assessments.find((entry) => entry.property_id === "C1765" && entry.item_key === itemKey);
  if (!assessment) {
    assessment = {
      id: `C1765-${itemKey}`,
      property_id: "C1765",
      item_key: itemKey,
      ai_inferred_rating: rating,
      human_calibrated_rating: rating,
      official_ppt_rating: "unknown",
      conclusion_zh: "",
      conclusion_en: "",
      rationale_zh: "",
      confidence: "medium",
      review_status: "draft",
      reviewer: "",
      reviewer_note: "",
      updated_at: new Date().toISOString(),
    };
    assessments.push(assessment);
    normalized.property_assessments = assessments;
    return;
  }
  if (!assessment.ai_inferred_rating || assessment.ai_inferred_rating === "unknown") assessment.ai_inferred_rating = rating;
  if (!assessment.human_calibrated_rating || assessment.human_calibrated_rating === "unknown") assessment.human_calibrated_rating = rating;
}

function ensureBerlinExtensionSerialSelection(normalized) {
  const property = normalized.properties.find((entry) => entry.id === "C1239bis");
  if (!property) return;
  property.is_serial = true;
  property.component_count = property.component_count || 1;
  property.cultural_subtype = property.cultural_subtype || "extension of inscribed serial property";
  property.category_of_property_source_note = property.category_of_property_source_note || "Extension of an already inscribed serial property; one added component part.";
  const source =
    "The nomination is an extension of an already inscribed serial property and adds one component part, Waldsiedlung Zehlendorf. ICOMOS considers that the nominated extension contributes to and complements the World Heritage series; the integrity assessment reflects whether the added component part contains attributes that support the Outstanding Universal Value.";
  const summary =
    "该项目为已列入系列遗产的扩展，仅新增 Waldsiedlung Zehlendorf 一个组成部分。ICOMOS 未单独展开整体系列遗产组成部分筛选论证，相关判断主要体现在该扩展是否补充并强化原系列遗产属性，以及完整性评估对新增组成部分的判断中。";
  let assessment = normalized.property_assessments.find((entry) => entry.property_id === "C1239bis" && entry.item_key === "serial_selection");
  if (!assessment) {
    assessment = {
      id: "C1239bis-serial_selection",
      property_id: "C1239bis",
      item_key: "serial_selection",
      official_ppt_rating: "unknown",
      confidence: "medium",
      review_status: "draft",
      updated_at: new Date().toISOString(),
    };
    normalized.property_assessments.push(assessment);
  }
  if (shouldRefreshSerialSelectionText(assessment.conclusion_zh, assessment.conclusion_en)) {
    assessment.ai_inferred_rating = "check";
    assessment.human_calibrated_rating = "check";
    assessment.conclusion_en = source;
    assessment.conclusion_zh = summary;
    assessment.rationale_zh = summary;
  }
  if (assessment.ai_inferred_rating === "not_applicable" || assessment.human_calibrated_rating === "not_applicable") {
    assessment.ai_inferred_rating = "check";
    assessment.human_calibrated_rating = "check";
  }
  let narrative = normalized.narrative_edits.find((entry) => entry.property_id === "C1239bis" && entry.section_key === "serial");
  if (!narrative) {
    narrative = {
      property_id: "C1239bis",
      section_key: "serial",
      payload: { entries_en: {}, entries: {}, assessment_ratings: {} },
      updated_at: new Date().toISOString(),
    };
    normalized.narrative_edits.push(narrative);
  }
  narrative.payload = narrative.payload || {};
  narrative.payload.entries_en = narrative.payload.entries_en || {};
  narrative.payload.entries = narrative.payload.entries || {};
  narrative.payload.assessment_ratings = narrative.payload.assessment_ratings || {};
  if (shouldRefreshSerialSelectionText(narrative.payload.entries.serial_selection, narrative.payload.entries_en.serial_selection)) {
    narrative.payload.entries_en.serial_selection = source;
    narrative.payload.entries.serial_selection = summary;
    narrative.payload.assessment_ratings.serial_selection = "check";
  }
  if (narrative.payload.assessment_ratings.serial_selection === "not_applicable") {
    narrative.payload.assessment_ratings.serial_selection = "check";
  }
}

function shouldRefreshSerialSelectionText(zhText, enText) {
  const text = `${zhText || ""} ${enText || ""}`.trim();
  return !text || /待抽取|unknown|not a serial nomination|非系列遗产|不适用系列遗产/i.test(text);
}

function saveLocalState(nextState = state) {
  const serialized = JSON.stringify(nextState);
  try {
    const previous = localStorage.getItem(STORAGE_KEY);
    if (previous && previous !== serialized) {
      pushLocalBackup(previous, "auto");
    }
  } catch {
    // Backup is best-effort; saving the current workspace is the priority.
  }
  localStorage.setItem(STORAGE_KEY, serialized);
}

function readLocalBackups() {
  try {
    const backups = JSON.parse(localStorage.getItem(STORAGE_BACKUP_KEY) || "[]");
    return Array.isArray(backups) ? backups : [];
  } catch {
    return [];
  }
}

function writeLocalBackups(backups) {
  localStorage.setItem(STORAGE_BACKUP_KEY, JSON.stringify(backups.slice(0, 8)));
}

function pushLocalBackup(serialized, reason = "manual") {
  if (!serialized) return;
  const backups = readLocalBackups();
  if (backups[0]?.data === serialized) return;
  backups.unshift({ saved_at: new Date().toISOString(), reason, data: serialized });
  writeLocalBackups(backups);
}

function createLocalBackup() {
  const serialized = localStorage.getItem(STORAGE_KEY);
  if (!serialized) {
    saveStatus = "当前还没有可备份的本地工作区。";
    render();
    return;
  }
  pushLocalBackup(serialized, "manual");
  saveStatus = "已创建本地备份。";
  render();
}

function exportWorkspaceData() {
  saveLocalState();
  const payload = workspaceExportPayload();
  const filename = `whc48-icomos-workspace-${compactDateTime(new Date())}.json`;
  downloadFile(filename, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  saveStatus = `已尝试下载公共工作区 JSON：${filename}。个人备注未包含；如果浏览器拦截下载，可改用“复制导出 JSON”。`;
  render();
}

function exportPrivateNotes(format = "markdown") {
  saveLocalState();
  const notes = privateNoteRows();
  if (!notes.length) {
    saveStatus = "当前还没有可导出的个人笔记。";
    render();
    return;
  }
  const stamp = compactDateTime(new Date());
  if (format === "word") {
    const filename = `whc48-icomos-personal-notes-${stamp}.doc`;
    downloadFile(filename, privateNotesWordHtml(notes), "application/msword;charset=utf-8");
    saveStatus = `已尝试下载个人笔记 Word 文档：${filename}`;
  } else {
    const filename = `whc48-icomos-personal-notes-${stamp}.md`;
    downloadFile(filename, privateNotesMarkdown(notes), "text/markdown;charset=utf-8");
    saveStatus = `已尝试下载个人笔记 Markdown：${filename}`;
  }
  render();
}

async function restoreReviewedWorkspaceBackup() {
  try {
    const response = await fetch(assetPath("/analysis/whc48-icomos-workspace-export-current-manual-reviewed-20260609T094.json"));
    if (!response.ok) throw new Error(`读取备份失败：${response.status}`);
    const payload = await response.json();
    const nextState = normalizeWorkspaceState(payload);
    if (!nextState.properties?.length) throw new Error("备份里没有项目数据。");
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) pushLocalBackup(current, "before_restore_reviewed_backup");
    state = nextState;
    saveLocalState(state);
    selectedPropertyId = state.properties.find((property) => property.id === selectedPropertyId)?.id || state.properties[0]?.id || "";
    selectedPptPropertyId = selectedPropertyId;
    exportPreviewText = "";
    saveStatus = `已恢复人工修订备份：${state.properties.length} 个项目、${state.property_assessments.length} 条评估、${state.narrative_edits.length} 个详情栏目。`;
  } catch (error) {
    saveStatus = `恢复人工修订备份失败：${error.message}`;
  }
  render();
}

async function copyWorkspaceExport() {
  saveLocalState();
  const text = JSON.stringify(workspaceExportPayload(), null, 2);
  try {
    await navigator.clipboard.writeText(text);
    exportPreviewText = "";
    saveStatus = "已复制公共工作区 JSON，可直接粘贴到线上导入框或文本文件；个人备注未包含。";
  } catch {
    exportPreviewText = text;
    saveStatus = "无法直接写入剪贴板，已在页面下方显示当前工作区 JSON。";
  }
  render();
}

function workspaceExportPayload() {
  const publicState = publicWorkspaceState();
  const serialized = JSON.stringify(publicState);
  const { summary } = summarizeSerializedWorkspace(serialized);
  return {
    schema_version: "whc48-workspace-export-v1",
    exported_at: new Date().toISOString(),
    app_version: APP_VERSION_LABEL,
    storage_key: STORAGE_KEY,
    source_origin: window.location.origin,
    source_path: window.location.pathname,
    handoff_file: "analysis/project-handoff-and-data-rules-2026-06-09.md",
    counts: summary,
    properties: publicState.properties || [],
    assessment_items: publicState.assessment_items || [],
    property_assessments: publicState.property_assessments || [],
    criteria_assessments: publicState.criteria_assessments || [],
    comparators: publicState.comparators || [],
    attributes: publicState.attributes || [],
    recommendations: publicState.recommendations || [],
    narrative_edits: publicState.narrative_edits || [],
    evidence: publicState.evidence || [],
    official_ppt_ratings: publicState.official_ppt_ratings || [],
    edit_history: publicState.edit_history || [],
  };
}

function publicWorkspaceState() {
  return {
    ...state,
    narrative_edits: publicNarrativeEdits(state.narrative_edits || []),
    edit_history: publicEditHistoryRows(state.edit_history || []),
  };
}

function publicNarrativeEdits(rows = []) {
  return rows.filter((row) => !PRIVATE_NARRATIVE_SECTIONS.has(row.section_key));
}

function privateNarrativeEdits(rows = []) {
  return rows.filter((row) => PRIVATE_NARRATIVE_SECTIONS.has(row.section_key));
}

function publicEditHistoryRows(rows = []) {
  return rows.filter((row) => !PRIVATE_NARRATIVE_SECTIONS.has(row.section_key));
}

function privateNoteRows() {
  return (state.properties || [])
    .map((property) => {
      const payload = narrativePayload(property.id, "research_notes");
      const text = String(payload.note || payload.summary || "").trim();
      const html = researchNoteDisplayHtml(payload).trim();
      if (!text && !html) return null;
      return { property, payload, text, html };
    })
    .filter(Boolean);
}

function privateNotesMarkdown(notes) {
  const lines = [
    "# ICOMOS 评估个人笔记",
    "",
    `导出时间：${formatDateTime(new Date().toISOString())}`,
    "",
  ];
  notes.forEach(({ property, text }) => {
    lines.push(`## ${property.property_name_zh || property.property_name_en || property.id}`);
    lines.push("");
    lines.push(`- 项目 ID：${property.id}`);
    if (property.property_name_en && property.property_name_zh) lines.push(`- 英文名：${property.property_name_en}`);
    if (property.state_party) lines.push(`- 缔约国：${property.state_party}`);
    lines.push("");
    lines.push(text || "（无纯文本内容）");
    lines.push("");
  });
  return lines.join("\n");
}

function privateNotesWordHtml(notes) {
  const body = notes
    .map(({ property, html, text }) => `
      <section>
        <h2>${escapeHtml(property.property_name_zh || property.property_name_en || property.id)}</h2>
        <p><strong>项目 ID：</strong>${escapeHtml(property.id)}</p>
        ${property.property_name_en && property.property_name_zh ? `<p><strong>英文名：</strong>${escapeHtml(property.property_name_en)}</p>` : ""}
        ${property.state_party ? `<p><strong>缔约国：</strong>${escapeHtml(property.state_party)}</p>` : ""}
        <div class="note-body">${html || displayParagraphs(text).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
      </section>
    `)
    .join("");
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>ICOMOS 评估个人笔记</title>
  <style>
    body { font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif; line-height: 1.6; color: #202124; }
    h1 { font-size: 24px; }
    h2 { margin-top: 28px; font-size: 18px; border-bottom: 1px solid #ddd6c8; padding-bottom: 6px; }
    p, li { font-size: 12pt; }
    mark { background: #fff2a8; }
    .meta { color: #69655d; }
  </style>
</head>
<body>
  <h1>ICOMOS 评估个人笔记</h1>
  <p class="meta">导出时间：${escapeHtml(formatDateTime(new Date().toISOString()))}</p>
  ${body}
</body>
</html>`;
}

function restoreLatestLocalBackup() {
  const backups = readLocalBackups();
  const latest = backups[0];
  if (!latest?.data) {
    saveStatus = "暂无可恢复的本地备份。";
    render();
    return;
  }
  const current = localStorage.getItem(STORAGE_KEY);
  if (current && current !== latest.data) pushLocalBackup(current, "before_restore");
  try {
    state = normalizeWorkspaceState(JSON.parse(latest.data));
    localStorage.setItem(STORAGE_KEY, latest.data);
  } catch (error) {
    saveStatus = `备份恢复失败：${error.message}`;
    render();
    return;
  }
  selectedPropertyId = state.properties.find((property) => property.id === selectedPropertyId)?.id || state.properties[0]?.id || "";
  selectedPptPropertyId = selectedPropertyId;
  saveStatus = `已恢复 ${formatDateTime(latest.saved_at)} 的本地备份。`;
  render();
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "最近一次";
  return date.toLocaleString("zh-CN", { hour12: false });
}

function compactDateTime(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
}

async function publishCurrentWorkspaceToSharedDatabase() {
  if (!supabaseClient) {
    saveStatus = "尚未连接共享数据库。";
    render();
    return;
  }
  const { data } = await supabaseClient.auth.getUser();
  currentUser = data?.user || null;
  saveLocalState();
  const propertyIds = (state.properties || []).map((property) => property.id).filter(Boolean);
  if (!propertyIds.length) {
    saveStatus = "当前工作区没有项目数据，未写入共享数据库。";
    render();
    return;
  }
  saveStatus = `正在写入共享数据库：${propertyIds.length} 个项目...`;
  render();
  try {
    const publicState = publicWorkspaceState();
    const operations = [
      supabaseClient.from("assessment_items").upsert(publicState.assessment_items || [], { onConflict: "item_key" }),
      supabaseClient.from("properties").upsert(supabasePropertyRows(publicState.properties || []), { onConflict: "id" }),
      supabaseClient.from("property_assessments").upsert(supabaseRows(publicState.property_assessments || []), { onConflict: "property_id,item_key" }),
      supabaseClient.from("criteria_assessments").upsert(criteriaRowsForSupabase(publicState.criteria_assessments || []), { onConflict: "property_id,criterion" }),
      supabaseClient.from("narrative_edits").upsert(supabaseRows(publicState.narrative_edits || []), { onConflict: "property_id,section_key" }),
      supabaseClient.from("official_ppt_ratings").upsert(supabaseRows(publicState.official_ppt_ratings || []), { onConflict: "property_id,item_key" }),
    ];
    const results = await Promise.all(operations);
    const upsertError = results.find((result) => result.error)?.error;
    if (upsertError) throw new Error(upsertError.message);

    await replaceSupabaseRowsForProperties("assessment_subitems", state.assessment_subitems || [], propertyIds);
    await replaceSupabaseRowsForProperties("comparators", state.comparators || [], propertyIds);
    await replaceSupabaseRowsForProperties("attributes", state.attributes || [], propertyIds);
    await replaceSupabaseRowsForProperties("recommendations", state.recommendations || [], propertyIds);
    await replaceSupabaseRowsForProperties("evidence", state.evidence || [], propertyIds);
    await replaceSupabaseRowsForProperties("property_type_tags", state.property_type_tags || [], propertyIds);
    await tryUpsertEditHistoryRows(publicState.edit_history || []);

    saveStatus = `已写入共享数据库：${propertyIds.length} 个项目、${publicState.property_assessments?.length || 0} 条评估、${publicState.narrative_edits?.length || 0} 个公共详情栏目；个人备注未上传。`;
    await loadSharedState();
  } catch (error) {
    saveStatus = `共享写入失败：${error.message}`;
  }
  render();
}

async function importStructuredExtraction() {
  const input = document.querySelector("#structuredImportInput");
  const raw = input?.value.trim();
  if (!raw) {
    saveStatus = "请先粘贴结构化 JSON。";
    render();
    return;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    saveStatus = `JSON 解析失败：${error.message}`;
    render();
    return;
  }

  try {
    const imported = normalizeStructuredImport(parsed);
    applyCriteriaCorrectionsFromData(imported);
    const summary = mergeStructuredImport(imported);
    saveLocalState();
    if (supabaseClient) await syncStructuredImport(imported);
    saveStatus = `已导入 ${summary.properties} 个项目、${summary.assessments} 条评估、${summary.narratives} 个详情栏目。`;
  } catch (error) {
    saveStatus = `导入失败：${error.message}`;
  }
  render();
}

function normalizeStructuredImport(input) {
  const tables = {
    properties: [],
    property_assessments: [],
    criteria_assessments: [],
    comparators: [],
    attributes: [],
    recommendations: [],
    narrative_edits: [],
    evidence: [],
    official_ppt_ratings: [],
  };

  if (input.property) appendNestedImportProject(tables, input);
  (input.projects || []).forEach((project) => appendStructuredProject(tables, project));

  Object.keys(tables).forEach((key) => {
    const rows = input[key];
    if (!Array.isArray(rows)) return;
    rows.forEach((row) => {
      if (key === "properties" && (row.property || row.narratives || row.assessments || row.basic)) appendStructuredProject(tables, row);
      else tables[key].push(row);
    });
  });

  if (!tables.properties.length && !tables.narrative_edits.length && !tables.property_assessments.length) {
    throw new Error("未找到可导入的项目数据。");
  }
  return sanitizeStructuredTables(tables);
}

function appendStructuredProject(tables, project) {
  if (project.basic || project.brief_synthesis || project.assessment_matrix || project.protection_management) {
    appendPageContentImportProject(tables, project);
    return;
  }
  appendNestedImportProject(tables, project);
}

function appendNestedImportProject(tables, project) {
  const property = project.property || project;
  const propertyId = property.id || property.property_id;
  if (!propertyId) throw new Error("项目缺少 id / property_id。");
  tables.properties.push(normalizeImportedProperty({ ...property, id: propertyId }));

  appendImportRows(tables.property_assessments, project.assessments || project.property_assessments, propertyId, normalizeImportedAssessment);
  appendImportRows(tables.criteria_assessments, project.criteria_assessments || project.criteria, propertyId, normalizeImportedCriterion);
  appendImportRows(tables.comparators, project.comparators, propertyId);
  appendImportRows(tables.attributes, project.attributes, propertyId);
  appendImportRows(tables.recommendations, project.recommendations, propertyId);
  appendImportRows(tables.evidence, project.evidence, propertyId);
  appendImportRows(tables.official_ppt_ratings, project.official_ppt_ratings, propertyId);

  const narratives = project.narratives || {};
  Object.entries(narratives).forEach(([sectionKey, payload]) => {
    if (!payload || typeof payload !== "object") return;
    tables.narrative_edits.push({
      property_id: propertyId,
      section_key: sectionKey,
      payload,
      updated_at: new Date().toISOString(),
    });
  });
}

function appendPageContentImportProject(tables, project) {
  const basic = project.basic || {};
  const propertyId = project.project_id || basic.id || basic.property_id;
  if (!propertyId) throw new Error("项目缺少 project_id。");
  const brief = project.brief_synthesis || {};
  const criteria = correctedCriteriaRows(propertyId, basic, project.criteria_assessments || []);
  const proposedCriteria = correctedProposedCriteria(propertyId, basic);
  const comparative = project.comparative_analysis || {};
  const attributes = project.attributes || [];
  const assessments = project.assessment_matrix || [];
  const protection = project.protection_management || [];
  const recommendations = project.recommendations || {};

  const property = normalizeImportedProperty({
    id: propertyId,
    cycle: basic.cycle || 2026,
    property_name_en: basic.property_name_en || project.property_name_en || propertyId,
    property_name_zh: basic.property_name_zh || "",
    state_party: basic.state_party || "",
    region: basic.region || "",
    nomination_type: normalizeNominationTypeValue(basic.nomination_type || project.nomination_type || ""),
    heritage_type: basic.heritage_type || heritageTypeFromPropertyType(basic.property_type),
    property_type: basic.property_type || "",
    category_of_property: normalizeCategoryOfProperty(basic.category_of_property || ""),
    category_of_property_source_note: basic.category_of_property || "",
    is_serial: Boolean(basic.is_serial),
    component_count: basic.component_count ?? null,
    is_transnational: Boolean(basic.is_transnational),
    proposed_criteria: proposedCriteria,
    icomos_recommended_criteria: normalizeCriteriaList(basic.icomos_recommended_criteria || basic.icomos_accepted_criteria),
    committee_confirmed_criteria: normalizeCriteriaList(basic.committee_confirmed_criteria),
    icomos_recommendation: normalizeRecommendationValue(basic.icomos_recommendation || ""),
    icomos_recommendation_note: recommendationNote(basic.icomos_recommendation_note || ""),
    committee_decision: basic.committee_decision || "",
    committee_pm_requirements: basic.committee_pm_requirements || "",
    report_page_start: basic.report_page_start ?? null,
    report_page_end: basic.report_page_end ?? null,
    brief_synthesis_en: cleanImportedText(brief.source_en || basic.brief_synthesis_en || ""),
    brief_synthesis_zh: cleanImportedText(brief.summary_zh || basic.brief_synthesis_zh || ""),
    review_status: project.review_status || basic.review_status || "draft",
  });
  tables.properties.push(property);

  appendPageNarratives(tables, propertyId, { brief, criteria, comparative, attributes, assessments, protection, recommendations });
  criteria.forEach((entry) => tables.criteria_assessments.push(normalizePageCriterion(entry, propertyId)));
  assessments.forEach((entry) => tables.property_assessments.push(normalizePageAssessment(entry, propertyId)));
  appendPageComparators(tables, propertyId, comparative.comparators || []);
  appendPageAttributes(tables, propertyId, attributes);
  appendPageRecommendations(tables, propertyId, recommendations);
  appendImportRows(tables.evidence, project.evidence, propertyId, normalizePageEvidence);
  appendImportRows(tables.official_ppt_ratings, project.official_ppt_ratings, propertyId);
}

function correctedProposedCriteria(propertyId, basic) {
  const proposed = normalizeCriteriaList(basic.proposed_criteria);
  if (propertyId === "C1769") return ["ii", "iv", "vi"];
  return proposed;
}

function correctedCriteriaRows(propertyId, basic, rows) {
  const proposed = new Set(correctedProposedCriteria(propertyId, basic));
  const existing = rows.map((entry) => ({
    ...entry,
    proposed_by_state_party: entry.proposed_by_state_party ?? proposed.has(entry.criterion),
  }));
  if (propertyId === "C1769") {
    Object.values(sidiBouSaidCriterionCorrections).forEach((correction) => {
      const target = existing.find((entry) => entry.criterion === correction.criterion);
      if (target) {
        Object.assign(target, correction, {
          summary_en: correction.source_en,
          summary_zh: correction.summary_zh,
        });
      } else {
        existing.push({ ...correction, summary_en: correction.source_en });
      }
    });
    return existing.sort((a, b) => criterionSortIndex(a.criterion) - criterionSortIndex(b.criterion));
  }
  existing.forEach((entry) => {
    if (/State Party has not proposed this criterion/i.test(entry.source_en || "")) entry.proposed_by_state_party = false;
  });
  if (propertyId === "C1769" && !existing.some((entry) => entry.criterion === "iii")) {
    existing.push({ ...sidiBouSaidAddedCriterion });
  }
  normalizeCriteriaList(basic.icomos_accepted_criteria || basic.icomos_recommended_criteria).forEach((criterion) => {
    if (!existing.some((entry) => entry.criterion === criterion)) {
      existing.push({
        criterion,
        proposed_by_state_party: proposed.has(criterion),
        accepted_by_icomos: true,
        judgement: "accepted",
        source_en: proposed.has(criterion) ? "" : "The State Party has not proposed this criterion. ICOMOS considers that this criterion is demonstrated.",
        summary_zh: proposed.has(criterion) ? "ICOMOS 认可该标准，待补充具体评述。" : "缔约国未申报该标准；ICOMOS 主动补充并认可。",
      });
    }
  });
  return existing.sort((a, b) => criterionSortIndex(a.criterion) - criterionSortIndex(b.criterion));
}

function appendPageNarratives(tables, propertyId, sections) {
  const now = new Date().toISOString();
  const { brief, criteria, comparative, attributes, assessments, protection, recommendations } = sections;
  const criteriaPayload = { intro: "引用 ICOMOS 结论部分对认可价值标准的判断摘要。", criteria_en: {}, criteria: {}, source_pages: {} };
  criteria.forEach((entry) => {
    criteriaPayload.criteria_en[entry.criterion] = cleanImportedText(entry.source_en || entry.summary_en || "");
    criteriaPayload.criteria[entry.criterion] = cleanImportedText(entry.summary_zh || "");
    if (entry.source_page || entry.page_number) {
      criteriaPayload.source_pages[`criteria_${entry.criterion}`] = entry.source_page || entry.page_number;
      criteriaPayload.source_pages.criteria = criteriaPayload.source_pages.criteria || entry.source_page || entry.page_number;
    }
  });

  const assessmentMap = new Map(assessments.map((entry) => [entry.item_key, entry]));
  const corePayload = pageAssessmentPayload(assessmentMap, ["integrity", "authenticity", "boundaries"], "core");
  const serialPayload = pageAssessmentPayload(assessmentMap, ["serial_selection"], "serial");
  const protectionPayload = pageAssessmentPayload(assessmentMap, pmItemKeys, "protection");
  addProtectionNarrativeText(protectionPayload, protection);

  const attributePayload = pageAttributesPayload(attributes);
  const recommendationPayload = pageRecommendationsPayload(recommendations);

  [
    [
      "brief",
      {
        brief_en: cleanImportedText(brief.source_en || ""),
        brief_zh: cleanImportedText(brief.summary_zh || ""),
        source_pages: pageMapFromEntries({ brief }),
      },
    ],
    ["criteria", criteriaPayload],
    ["attributes", attributePayload],
    ["serial", serialPayload],
    [
      "comparative",
      {
        summary_en: cleanImportedText(comparative.conclusion_en || comparative.source_en || ""),
        summary: cleanImportedText(comparative.summary_zh || ""),
        comparators: comparatorPayload(comparative.comparators || []),
        assessment_ratings: { comparative_analysis: normalizeRatingValue(comparative.inferred_rating || assessmentMap.get("comparative_analysis")?.ai_inferred_rating) },
        source_pages: pageMapFromEntries({ comparative }),
      },
    ],
    ["core", corePayload],
    ["protection", protectionPayload],
    ["recommendations", recommendationPayload],
  ].forEach(([section_key, payload]) => {
    tables.narrative_edits.push({ property_id: propertyId, section_key, payload, updated_at: now });
  });
}

function pageAssessmentPayload(assessmentMap, itemKeys) {
  const payload = { entries_en: {}, entries: {}, assessment_ratings: {}, source_pages: {} };
  itemKeys.forEach((itemKey) => {
    const entry = assessmentMap.get(itemKey) || {};
    payload.entries_en[itemKey] = cleanImportedText(entry.source_en || entry.conclusion_en || "");
    payload.entries[itemKey] = cleanImportedText(entry.rationale_zh || entry.conclusion_zh || "");
    payload.assessment_ratings[itemKey] = normalizeRatingValue(entry.ai_inferred_rating || entry.rating || entry.level);
    if (entry.source_page || entry.page_number) payload.source_pages[itemKey] = entry.source_page || entry.page_number;
  });
  return payload;
}

function addProtectionNarrativeText(payload, protectionRows) {
  const rows = Array.isArray(protectionRows) ? protectionRows : [];
  const extracted = {
    protection_property: extractProtectionConclusion(rows, "protection_property"),
    protection_buffer_zone: extractProtectionConclusion(rows, "protection_buffer_zone"),
    conservation: extractProtectionConclusion(rows, "conservation"),
    management: extractProtectionConclusion(rows, "management"),
    threats_addressed: extractProtectionConclusion(rows, "threats_addressed"),
  };
  Object.entries(extracted).forEach(([key, text]) => {
    if (text && !payload.entries_en[key]) payload.entries_en[key] = text;
  });
}

function extractProtectionConclusion(rows, itemKey) {
  const sectionPatterns = {
    protection_property: [/legal protection/i],
    protection_buffer_zone: [/legal protection/i, /buffer/i],
    conservation: [/conservation measures/i, /monitoring/i, /state of conservation/i],
    management: [/management system/i, /visitor management/i, /community involvement/i, /effectiveness of the protection and management/i],
    threats_addressed: [/factors affecting/i, /risk preparedness/i, /disaster/i],
  }[itemKey] || [];
  const candidates = rows
    .filter((row) => sectionPatterns.some((pattern) => pattern.test(String(row.section || ""))))
    .map((row) => cleanImportedText(row.source_en || ""))
    .filter(Boolean);
  return compactProtectionConclusion(candidates.join("\n\n"), itemKey);
}

function pageAttributesPayload(attributes) {
  const central = attributes.find((entry) => entry.source_layer === "central_attributes_statement") || attributes[0] || {};
  const payload = {
    summary_en: cleanImportedText(central.source_en || ""),
    summary: cleanImportedText(central.summary_zh || ""),
    source_pages: pageMapFromEntries({ attributes: central }),
    mentions: [],
  };
  return payload;
}

function pageMapFromEntries(entriesByKey) {
  return Object.fromEntries(
    Object.entries(entriesByKey)
      .map(([key, entry]) => [key, entry?.source_page || entry?.page_number || null])
      .filter(([, page]) => page),
  );
}

function pageRecommendationsPayload(recommendations) {
  const entries = {};
  (recommendations.final_recommendations || []).forEach((entry) => {
    const key = entry.recommendation_code || String(Object.keys(entries).length + 1);
    entries[key] = {
      source_en: cleanImportedText(entry.text_en || ""),
      summary: cleanImportedText(entry.summary_zh || ""),
    };
  });
  return { entries, committee_items: [] };
}

function comparatorPayload(comparators) {
  const payload = {};
  comparators.forEach((entry, index) => {
    payload[index] = cleanImportedText(entry.icomos_comment_summary_zh || entry.summary_zh || entry.source_quote || "");
  });
  return payload;
}

function normalizePageCriterion(entry, propertyId) {
  return normalizeImportedCriterion({
    property_id: propertyId,
    criterion: entry.criterion,
    proposed_by_state_party: entry.proposed_by_state_party,
    accepted_by_icomos: entry.accepted_by_icomos,
    judgement: entry.judgement,
    summary_en: entry.source_en || entry.summary_en || "",
    summary_zh: entry.summary_zh || "",
    review_status: entry.review_status || "draft",
  });
}

function normalizePageAssessment(entry, propertyId) {
  const rating = normalizeRatingValue(entry.ai_inferred_rating || entry.rating || entry.level);
  return normalizeImportedAssessment({
    property_id: propertyId,
    item_key: entry.item_key,
    ai_inferred_rating: rating,
    human_calibrated_rating: rating,
    official_ppt_rating: entry.official_ppt_rating || "unknown",
    conclusion_en: entry.source_en || entry.conclusion_en || "",
    conclusion_zh: entry.conclusion_zh || "",
    rationale_zh: entry.rationale_zh || "",
    review_status: entry.review_status || "draft",
  });
}

function appendPageComparators(tables, propertyId, comparators) {
  comparators.forEach((entry) => {
    tables.comparators.push({
      property_id: propertyId,
      comparator_name: entry.comparator_name || "待校核比较对象",
      country_or_region: entry.country_or_region || comparatorCountryFromStatus(entry.status_detail || ""),
      heritage_status: normalizeHeritageStatus(entry.heritage_status),
      status_detail: entry.status_detail || "",
      typology: entry.typology || "",
      comparison_theme: entry.comparison_theme || "",
      icomos_comment_summary_zh: entry.icomos_comment_summary_zh || entry.summary_zh || entry.source_quote || "",
      icomos_comment_summary_en: entry.icomos_comment_summary_en || "",
      source_page: entry.source_page || null,
      source_quote: entry.source_quote || "",
      analyst_note: entry.analyst_note || "",
    });
  });
}

function appendPageAttributes(tables, propertyId, attributes) {
  attributes.forEach((entry) => {
    tables.attributes.push({
      property_id: propertyId,
      source_layer: entry.source_layer || "",
      attribute_group: entry.attribute_group || entry.source_layer || "",
      attribute_name_en: entry.attribute_name_en || entry.attribute_group || entry.source_layer || "",
      attribute_name_zh: entry.attribute_name_zh || "",
      source_section: entry.source_section || "",
      source_page: entry.source_page || null,
      source_quote: entry.source_quote || entry.source_en || "",
      summary_zh: entry.summary_zh || "",
      linked_criteria: entry.linked_criteria || [],
      linked_assessment_items: entry.linked_assessment_items || [],
      status: entry.status || "",
      analyst_note: entry.analyst_note || "",
      review_status: entry.review_status || "draft",
    });
  });
}

function appendPageRecommendations(tables, propertyId, recommendations) {
  (recommendations.final_recommendations || []).forEach((entry) => {
    tables.recommendations.push({
      property_id: propertyId,
      recommendation_level: entry.recommendation_level || "final_recommendation",
      recommendation_code: entry.recommendation_code || "",
      recommendation_category: entry.recommendation_category || entry.recommendation_level || "ICOMOS recommendation",
      text_en: entry.text_en || "",
      summary_zh: entry.summary_zh || "",
      linked_assessment_items: entry.linked_assessment_items || [],
      urgency: entry.urgency || "",
      implementation_actor: entry.implementation_actor || "",
      deadline: entry.deadline || "",
      source_page: entry.source_page || null,
      source_quote: entry.source_quote || "",
      included_in_final_recommendations: entry.included_in_final_recommendations ?? true,
      analyst_note: entry.analyst_note || "",
      review_status: entry.review_status || "draft",
    });
  });
  (recommendations.other_issues || []).forEach((entry, index) => {
    tables.recommendations.push({
      property_id: propertyId,
      recommendation_level: "other_issue",
      recommendation_code: entry.recommendation_code || `other-${index + 1}`,
      recommendation_category: entry.recommendation_category || "Other issue",
      text_en: entry.text_en || entry.source_en || "",
      summary_zh: entry.summary_zh || "",
      linked_assessment_items: entry.linked_assessment_items || [],
      included_in_final_recommendations: false,
      analyst_note: entry.analyst_note || "",
      review_status: entry.review_status || "draft",
    });
  });
}

function normalizePageEvidence(row) {
  return {
    property_id: row.property_id,
    source_section: row.source_section || "",
    page_number: row.page_number || null,
    quote_en: row.quote_en || row.source_quote || "",
    summary_zh: row.summary_zh || "",
    linked_assessment_item: row.linked_assessment_item || null,
    linked_criterion: row.linked_criterion || null,
    interpretation_note: row.interpretation_note || "",
  };
}

function appendImportRows(target, rows, propertyId, normalizer = normalizeImportedPropertyRow) {
  if (!rows) return;
  const list = Array.isArray(rows)
    ? rows
    : Object.entries(rows).map(([key, value]) => (typeof value === "object" ? { ...value, item_key: value.item_key || key, criterion: value.criterion || key } : { value, item_key: key }));
  list.forEach((row) => target.push(normalizer({ property_id: propertyId, ...row }, propertyId)));
}

function normalizeImportedProperty(property) {
  const categorySourceNote = simplifyCategorySourceNote(property);
  const normalized = {
    cycle: 2026,
    property_name_zh: "",
    state_party: "",
    region: "",
    nomination_type: "New nomination",
    heritage_type: "Cultural",
    property_type: "Cultural property",
    category_of_property: "",
    category_of_property_source_note: "",
    cultural_subtype: "",
    is_serial: false,
    component_count: null,
    is_transnational: false,
    proposed_criteria: [],
    icomos_recommended_criteria: [],
    committee_confirmed_criteria: [],
    icomos_recommendation: "",
    icomos_recommendation_note: "",
    committee_decision: "",
    committee_pm_requirements: "",
    report_page_start: null,
    report_page_end: null,
    brief_synthesis_en: "",
    brief_synthesis_zh: "",
    review_status: "draft",
    ...property,
    nomination_type: normalizeNominationTypeValue(property.nomination_type),
    icomos_recommendation: normalizeRecommendationValue(property.icomos_recommendation),
    proposed_criteria: normalizeCriteriaList(property.proposed_criteria),
    icomos_recommended_criteria: normalizeCriteriaList(property.icomos_recommended_criteria),
    committee_confirmed_criteria: normalizeCriteriaList(property.committee_confirmed_criteria),
    category_of_property: normalizeCategoryOfProperty(property.category_of_property),
    category_of_property_source_note: categorySourceNote,
  };
  return pickKnownColumns(normalized, [
    "id",
    "cycle",
    "property_name_en",
    "property_name_zh",
    "state_party",
    "region",
    "nomination_type",
    "heritage_type",
    "property_type",
    "category_of_property",
    "category_of_property_source_note",
    "cultural_subtype",
    "is_serial",
    "component_count",
    "is_transnational",
    "proposed_criteria",
    "icomos_recommended_criteria",
    "committee_confirmed_criteria",
    "icomos_recommendation",
    "icomos_recommendation_note",
    "committee_decision",
    "committee_pm_requirements",
    "report_page_start",
    "report_page_end",
    "brief_synthesis_en",
    "brief_synthesis_zh",
    "review_status",
  ]);
}

function normalizeImportedPropertyRow(row) {
  return { ...row };
}

function normalizeImportedAssessment(row) {
  const rating = row.rating || row.human_calibrated_rating || row.ai_inferred_rating || "unknown";
  return {
    id: row.id || `${row.property_id}-${row.item_key}`,
    property_id: row.property_id,
    item_key: row.item_key,
    ai_inferred_rating: row.ai_inferred_rating || rating,
    human_calibrated_rating: row.human_calibrated_rating || rating,
    official_ppt_rating: row.official_ppt_rating || "unknown",
    conclusion_zh: row.conclusion_zh || row.summary_zh || "",
    conclusion_en: row.conclusion_en || row.summary_en || "",
    rationale_zh: row.rationale_zh || row.analysis_note_zh || "",
    confidence: row.confidence || "medium",
    review_status: row.review_status || "draft",
    reviewer: row.reviewer || "",
    reviewer_note: row.reviewer_note || "",
    updated_at: row.updated_at || new Date().toISOString(),
  };
}

function normalizeImportedCriterion(row) {
  return {
    property_id: row.property_id,
    criterion: row.criterion,
    proposed_by_state_party: Boolean(row.proposed_by_state_party ?? true),
    accepted_by_icomos: Boolean(row.accepted_by_icomos ?? false),
    judgement: row.judgement || (row.accepted_by_icomos ? "accepted" : "not accepted"),
    summary_zh: row.summary_zh || "",
    summary_en: row.summary_en || "",
    linked_attribute_ids: row.linked_attribute_ids || [],
    analyst_note: row.analyst_note || "",
    review_status: row.review_status || "draft",
  };
}

function sanitizeStructuredTables(tables) {
  tables.properties = tables.properties.map(normalizeImportedProperty);
  tables.property_assessments = tables.property_assessments.filter((row) => row.property_id && row.item_key).map(normalizeImportedAssessment);
  tables.criteria_assessments = tables.criteria_assessments.filter((row) => row.property_id && row.criterion).map(normalizeImportedCriterion);
  tables.narrative_edits = tables.narrative_edits.filter((row) => row.property_id && row.section_key && row.payload);
  ["comparators", "attributes", "recommendations", "evidence", "official_ppt_ratings"].forEach((key) => {
    tables[key] = tables[key].filter((row) => row.property_id);
  });
  return tables;
}

function mergeStructuredImport(imported) {
  mergeByKey("properties", imported.properties, (row) => row.id, mergePropertyPreservingManualEdits);
  mergeByKey("property_assessments", imported.property_assessments, (row) => `${row.property_id}:${row.item_key}`, mergeAssessmentPreservingManualEdits);
  mergeByKey("criteria_assessments", imported.criteria_assessments, (row) => `${row.property_id}:${row.criterion}`, mergeCriterionPreservingManualEdits);
  mergeNarrativeEdits(imported.narrative_edits);
  mergeByKey("official_ppt_ratings", imported.official_ppt_ratings, (row) => `${row.property_id}:${row.item_key}`, mergeOfficialRatingPreservingManualEdits);
  replaceRowsForImportedProperties("comparators", imported.comparators, rowIdentityForManualMerge);
  replaceRowsForImportedProperties("attributes", imported.attributes, rowIdentityForManualMerge);
  replaceRowsForImportedProperties("recommendations", imported.recommendations, rowIdentityForManualMerge);
  replaceRowsForImportedProperties("evidence", imported.evidence, rowIdentityForManualMerge);
  state = normalizeWorkspaceState(state);
  selectedPropertyId = imported.properties[0]?.id || selectedPropertyId;
  return {
    properties: imported.properties.length,
    assessments: imported.property_assessments.length,
    narratives: imported.narrative_edits.length,
  };
}

function mergeByKey(tableName, rows, keyFn, mergeFn = defaultRowMerge) {
  if (!rows.length) return;
  const existing = new Map((state[tableName] || []).map((row) => [keyFn(row), row]));
  rows.forEach((row) => {
    const key = keyFn(row);
    existing.set(key, mergeFn(existing.get(key), row));
  });
  state[tableName] = [...existing.values()];
}

function defaultRowMerge(existingRow, incomingRow) {
  return { ...(existingRow || {}), ...incomingRow };
}

function mergePropertyPreservingManualEdits(existingRow, incomingRow) {
  const merged = defaultRowMerge(existingRow, incomingRow);
  if (!existingRow) return merged;
  preserveManualTextFields(merged, existingRow, incomingRow, [
    "brief_synthesis_en",
    "brief_synthesis_zh",
    "category_of_property_source_note",
    "icomos_recommendation_note",
    "committee_decision",
    "committee_pm_requirements",
  ]);
  return merged;
}

function mergeAssessmentPreservingManualEdits(existingRow, incomingRow) {
  const merged = defaultRowMerge(existingRow, incomingRow);
  if (!existingRow) return merged;
  preserveManualTextFields(merged, existingRow, incomingRow, ["conclusion_zh", "conclusion_en", "rationale_zh", "reviewer_note"]);
  preserveManualRatingField(merged, existingRow, incomingRow, "human_calibrated_rating");
  preserveManualRatingField(merged, existingRow, incomingRow, "official_ppt_rating");
  if (hasManualReviewState(existingRow)) {
    merged.review_status = existingRow.review_status;
    merged.reviewer = existingRow.reviewer;
  }
  return merged;
}

function mergeCriterionPreservingManualEdits(existingRow, incomingRow) {
  const merged = defaultRowMerge(existingRow, incomingRow);
  if (!existingRow) return merged;
  preserveManualTextFields(merged, existingRow, incomingRow, ["summary_zh", "summary_en", "analyst_note"]);
  if (hasManualReviewState(existingRow)) merged.review_status = existingRow.review_status;
  return merged;
}

function mergeOfficialRatingPreservingManualEdits(existingRow, incomingRow) {
  const merged = defaultRowMerge(existingRow, incomingRow);
  if (!existingRow) return merged;
  preserveManualRatingField(merged, existingRow, incomingRow, "official_ppt_rating");
  preserveManualTextFields(merged, existingRow, incomingRow, ["source_note", "source_file"]);
  if (hasManualReviewState(existingRow)) {
    merged.review_status = existingRow.review_status;
    merged.entered_by = existingRow.entered_by;
    merged.entered_at = existingRow.entered_at;
  }
  return merged;
}

function preserveManualTextFields(target, existingRow, incomingRow, fields) {
  fields.forEach((field) => {
    const existingValue = existingRow?.[field];
    if (typeof existingValue !== "string" || shouldAutoReplaceText(existingValue)) return;
    const incomingValue = incomingRow?.[field];
    if (incomingValue === undefined || !sameLooseText(existingValue, incomingValue)) target[field] = existingValue;
  });
}

function preserveManualRatingField(target, existingRow, incomingRow, field) {
  const existingRating = normalizeRatingValue(existingRow?.[field]);
  if (!existingRating || existingRating === "unknown") return;
  const incomingRating = normalizeRatingValue(incomingRow?.[field]);
  if (
    existingRow?.item_key === "serial_selection" &&
    existingRating === "not_applicable" &&
    incomingRating &&
    incomingRating !== "unknown" &&
    incomingRating !== "not_applicable"
  ) {
    return;
  }
  if (!incomingRating || incomingRating === "unknown" || incomingRating !== existingRating) target[field] = existingRow[field];
}

function sameLooseText(first, second) {
  return String(first || "").replace(/\s+/g, " ").trim() === String(second || "").replace(/\s+/g, " ").trim();
}

function hasManualReviewState(row) {
  return Boolean(row?.reviewer || row?.reviewer_note || row?.analyst_note || !["", "draft"].includes(String(row?.review_status || "")));
}

function mergeNarrativeEdits(rows) {
  if (!rows.length) return;
  state.narrative_edits = mergeNarrativeRowsPreservingManualEdits(state.narrative_edits || [], rows);
}

function mergeNarrativeRowsPreservingManualEdits(existingRows, incomingRows) {
  const existing = new Map((existingRows || []).map((row) => [`${row.property_id}:${row.section_key}`, row]));
  incomingRows.forEach((row) => {
    const key = `${row.property_id}:${row.section_key}`;
    const prior = existing.get(key);
    if (!prior) {
      existing.set(key, row);
      return;
    }
    existing.set(key, {
      ...prior,
      ...row,
      payload: mergePayloadPreservingManualEdits(prior.payload || {}, row.payload || {}),
      updated_at: newerTimestamp(prior.updated_at, row.updated_at),
    });
  });
  return [...existing.values()];
}

function mergePayloadPreservingManualEdits(existingPayload, importedPayload) {
  const merged = { ...existingPayload };
  Object.entries(importedPayload || {}).forEach(([key, importedValue]) => {
    const existingValue = merged[key];
    if (isPlainObject(existingValue) && isPlainObject(importedValue)) {
      merged[key] = mergePayloadPreservingManualEdits(existingValue, importedValue);
      return;
    }
    if (Array.isArray(existingValue) && existingValue.length) return;
    if (typeof existingValue === "string" && !shouldAutoReplaceText(existingValue)) return;
    if (existingValue !== undefined && existingValue !== null && typeof existingValue !== "string") return;
    merged[key] = importedValue;
  });
  return merged;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function newerTimestamp(first, second) {
  const firstTime = Date.parse(first || "");
  const secondTime = Date.parse(second || "");
  if (!Number.isFinite(firstTime)) return second || first || "";
  if (!Number.isFinite(secondTime)) return first || second || "";
  return firstTime >= secondTime ? first : second;
}

function replaceRowsForImportedProperties(tableName, rows, keyFn = rowIdentityForManualMerge) {
  if (!rows.length) return;
  const propertyIds = new Set(rows.map((row) => row.property_id));
  const existingRows = state[tableName] || [];
  const incomingByKey = new Map(rows.map((row) => [keyFn(row), row]));
  const preservedManualRows = existingRows
    .filter((row) => propertyIds.has(row.property_id) && rowHasManualContent(row))
    .map((row) => mergeManualRowIntoIncoming(row, incomingByKey.get(keyFn(row))));
  const preservedKeys = new Set(preservedManualRows.map((row) => keyFn(row)));
  state[tableName] = [
    ...existingRows.filter((row) => !propertyIds.has(row.property_id)),
    ...rows.filter((row) => !preservedKeys.has(keyFn(row))),
    ...preservedManualRows,
  ];
}

function mergeManualRowIntoIncoming(existingRow, incomingRow) {
  if (!incomingRow) return existingRow;
  const merged = { ...incomingRow, ...existingRow };
  Object.entries(incomingRow).forEach(([field, value]) => {
    if (typeof existingRow[field] === "string" && !shouldAutoReplaceText(existingRow[field])) return;
    merged[field] = value;
  });
  return merged;
}

function rowHasManualContent(row) {
  if (!row) return false;
  if (hasManualReviewState(row)) return true;
  return ["analyst_note", "reviewer_note", "interpretation_note", "notes"].some((field) => {
    const value = row[field];
    return typeof value === "string" && value.trim() && !shouldAutoReplaceText(value);
  });
}

function rowIdentityForManualMerge(row) {
  if (row.id && isUuid(row.id)) return `${row.property_id}:id:${row.id}`;
  const parts = [
    row.property_id,
    row.item_key,
    row.criterion,
    row.recommendation_code || row.recommendation_category,
    normalizeComparatorName(row.comparator_name),
    row.source_layer,
    row.attribute_group,
    row.attribute_name_en || row.attribute_name_zh,
    row.linked_assessment_item,
    row.page_number || row.source_page,
    String(row.quote_en || row.source_quote || row.text_en || "").slice(0, 80),
  ].filter(Boolean);
  return parts.join(":");
}

async function syncStructuredImport(imported) {
  const propertyIds = importedPropertyIds(imported);
  const operations = [];
  if (imported.properties.length) {
    operations.push(supabaseClient.from("properties").upsert(rowsFromStateByImportedKeys("properties", imported.properties, (row) => row.id), { onConflict: "id" }));
  }
  if (imported.property_assessments.length) {
    operations.push(
      supabaseClient
        .from("property_assessments")
        .upsert(supabaseRows(rowsFromStateByImportedKeys("property_assessments", imported.property_assessments, (row) => `${row.property_id}:${row.item_key}`)), { onConflict: "property_id,item_key" }),
    );
  }
  if (imported.criteria_assessments.length) {
    operations.push(
      supabaseClient
        .from("criteria_assessments")
        .upsert(criteriaRowsForSupabase(rowsFromStateByImportedKeys("criteria_assessments", imported.criteria_assessments, (row) => `${row.property_id}:${row.criterion}`)), { onConflict: "property_id,criterion" }),
    );
  }
  const publicImportedNarratives = publicNarrativeEdits(rowsFromStateByImportedKeys("narrative_edits", imported.narrative_edits, (row) => `${row.property_id}:${row.section_key}`));
  if (publicImportedNarratives.length) {
    operations.push(
      supabaseClient
        .from("narrative_edits")
        .upsert(supabaseRows(publicImportedNarratives), { onConflict: "property_id,section_key" }),
    );
  }
  if (imported.official_ppt_ratings.length) {
    operations.push(
      supabaseClient
        .from("official_ppt_ratings")
        .upsert(supabaseRows(rowsFromStateByImportedKeys("official_ppt_ratings", imported.official_ppt_ratings, (row) => `${row.property_id}:${row.item_key}`)), { onConflict: "property_id,item_key" }),
    );
  }
  const results = await Promise.all(operations);
  const error = results.find((result) => result.error)?.error;
  if (error) throw new Error(error.message);

  if (imported.comparators.length) await replaceSupabaseRowsPreservingManualRows("comparators", rowsFromStateForProperties("comparators", propertyIds), propertyIds);
  if (imported.attributes.length) await replaceSupabaseRowsPreservingManualRows("attributes", rowsFromStateForProperties("attributes", propertyIds), propertyIds);
  if (imported.recommendations.length) await replaceSupabaseRowsPreservingManualRows("recommendations", rowsFromStateForProperties("recommendations", propertyIds), propertyIds);
  if (imported.evidence.length) await replaceSupabaseRowsPreservingManualRows("evidence", rowsFromStateForProperties("evidence", propertyIds), propertyIds);
}

function importedPropertyIds(imported) {
  const ids = new Set();
  (imported.properties || []).forEach((row) => row.id && ids.add(row.id));
  ["property_assessments", "criteria_assessments", "comparators", "attributes", "recommendations", "narrative_edits", "evidence", "official_ppt_ratings"].forEach((tableName) => {
    (imported[tableName] || []).forEach((row) => row.property_id && ids.add(row.property_id));
  });
  return [...ids];
}

function rowsFromStateByImportedKeys(tableName, importedRows, keyFn) {
  const keys = new Set(importedRows.map(keyFn));
  return (state[tableName] || []).filter((row) => keys.has(keyFn(row)));
}

function rowsFromStateForProperties(tableName, propertyIds) {
  const ids = new Set(propertyIds);
  return (state[tableName] || []).filter((row) => ids.has(row.property_id));
}

async function replaceSupabaseRows(tableName, rows, propertyIds) {
  if (!rows.length || !propertyIds.length) return;
  const deleted = await supabaseClient.from(tableName).delete().in("property_id", propertyIds);
  if (deleted.error) throw new Error(deleted.error.message);
  const inserted = await supabaseClient.from(tableName).insert(supabaseRows(rows));
  if (inserted.error) throw new Error(inserted.error.message);
}

async function replaceSupabaseRowsForProperties(tableName, rows, propertyIds) {
  if (!propertyIds.length) return;
  const deleted = await supabaseClient.from(tableName).delete().in("property_id", propertyIds);
  if (deleted.error) throw new Error(deleted.error.message);
  if (!rows.length) return;
  const inserted = await supabaseClient.from(tableName).insert(supabaseRows(rows));
  if (inserted.error) throw new Error(inserted.error.message);
}

async function replaceSupabaseRowsPreservingManualRows(tableName, rows, propertyIds) {
  if (!rows.length || !propertyIds.length) return;
  const existing = await supabaseClient.from(tableName).select("*").in("property_id", propertyIds);
  if (existing.error) throw new Error(existing.error.message);
  const incomingByKey = new Map(rows.map((row) => [rowIdentityForManualMerge(row), row]));
  const manualRows = (existing.data || [])
    .filter(rowHasManualContent)
    .map((row) => mergeManualRowIntoIncoming(row, incomingByKey.get(rowIdentityForManualMerge(row))));
  const manualKeys = new Set(manualRows.map(rowIdentityForManualMerge));
  await replaceSupabaseRows(tableName, [...rows.filter((row) => !manualKeys.has(rowIdentityForManualMerge(row))), ...manualRows], propertyIds);
}

function supabaseRows(rows) {
  return rows.map((row) => {
    const next = sanitizeSupabaseRow(row);
    if (!isUuid(next.id)) delete next.id;
    return next;
  });
}

function supabasePropertyRows(rows) {
  return rows.map(sanitizeSupabaseRow);
}

function sanitizeSupabaseRow(row) {
  const next = { ...row };
  ["created_at", "updated_at", "entered_at", "uploaded_at"].forEach((field) => {
    if (next[field] === "") delete next[field];
  });
  return next;
}

function criteriaRowsForSupabase(rows) {
  return supabaseRows(rows).map(({ source_en, ...row }) => row);
}

function handleNavigation(event) {
  const link = event.target.closest("a[data-route]");
  if (!link) return;
  event.preventDefault();
  const rawHref = link.getAttribute("data-route-path") || link.getAttribute("href") || "/";
  const url = new URL(rawHref, window.location.origin);
  history.pushState({}, "", appPath(routePath(url.pathname)) + url.search + url.hash);
  applyFiltersFromUrl();
  render();
}

function render() {
  const route = currentRoute();
  app.innerHTML = `
    <div class="shell">
      ${renderSidebar(route)}
      <main class="content">${renderPage(route)}</main>
    </div>
    ${renderPdfSourcePanel()}
  `;
  removeLegacyInlineNoteFields(app);
  attachPageListeners(route);
}

function removeLegacyInlineNoteFields(scope = document) {
  scope.querySelectorAll(".narrative-edit-form label").forEach((label) => {
    const labelText = [...label.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent.trim())
      .join(" ")
      .trim();
    if (/\bNote\b/i.test(labelText) && label.querySelector("textarea, input")) {
      label.remove();
    }
  });
}

function applyFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  filters = { ...defaultFilters };
  propertyFilterKeys.forEach((key) => {
    if (params.has(key)) filters[key] = params.get(key) || "all";
  });
  if (params.has("q")) filters.query = (params.get("q") || "").trim();
}

function syncPropertyFiltersToUrl() {
  if (currentRoute() !== "/properties") return;
  const params = new URLSearchParams();
  propertyFilterKeys.forEach((key) => {
    if (key === "query") {
      if (filters.query.trim()) params.set("q", filters.query.trim());
      return;
    }
    if (filters[key] && filters[key] !== "all") params.set(key, filters[key]);
  });
  const query = params.toString();
  history.replaceState({}, "", query ? appPath(`/properties?${query}`) : appPath("/properties"));
}

function resetPropertyFilters({ keepColumnGroup = true } = {}) {
  const columnGroup = filters.column_group;
  filters = { ...defaultFilters };
  if (keepColumnGroup) filters.column_group = columnGroup || "all";
  syncPropertyFiltersToUrl();
  render();
}

function currentRoute() {
  const path = routePath(window.location.pathname);
  if (path === "/calibration/protection-management") {
    history.replaceState({}, "", appPath("/properties?column_group=assessment"));
    filters.column_group = "assessment";
    return "/properties";
  }
  return path;
}

function renderSidebar(route) {
  const links = [
    ["/", "总览"],
    ["/properties", "项目列表"],
    ["/properties/C1765", "景德镇样例"],
    ["/official-ratings-entry", "录入 Check Tool 截图"],
    ["/database", "数据库管理"],
  ];
  return `
    <aside class="sidebar">
      <div class="brand">
        <strong>ICOMOS 评估梳理分析工具</strong>
        <span>1.0 · 结构化证据、校准评分、协作编辑</span>
      </div>
      <nav class="nav">
        ${links.map(([href, label]) => `<a data-route data-route-path="${href}" href="${appPath(href)}" class="${isActiveRoute(route, href) ? "active" : ""}">${label}</a>`).join("")}
      </nav>
      <div class="nav-note">1.0 已按交接规则保护人工修订；结构化导入只替换占位或旧模板文本。</div>
      <div class="sync-panel">
        <strong>${supabaseClient ? "共享协作模式" : "本地试用模式"}</strong>
        <span>${supabaseClient ? (currentUser ? currentUser.email : "可浏览；登录后按 RLS 策略编辑。") : "配置 app-config.js 后连接 Supabase。"}</span>
        ${renderLegacyStorageNotice()}
        ${renderAuthControls()}
        ${saveStatus ? `<span>${escapeHtml(saveStatus)}</span>` : ""}
        ${renderPartnerLogos()}
      </div>
    </aside>
  `;
}

function renderPartnerLogos() {
  return `
    <div class="partner-logos" aria-label="合作机构标识">
      <img src="${assetPath("/assets/partner-logos.png")}" alt="NHC THU and CONSERVISION">
    </div>
  `;
}

function renderLegacyStorageNotice() {
  if (!legacyStorageCandidates.length) return "";
  return `
    <div class="legacy-storage-card">
      <span>发现旧版缓存，可选择迁入当前地址。</span>
      ${legacyStorageCandidates.slice(0, 5).map((candidate, index) => {
        const summary = candidate.summary || {};
        return `
          <button class="button primary legacy-import-option" type="button" data-import-legacy-storage="${index}">
            ${escapeHtml(candidate.origin.replace("http://", ""))} · ${escapeHtml(candidate.label || "缓存")}
            <small>${legacyCandidateSummaryText(summary)}</small>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function legacyCandidateSummaryText(summary = {}) {
  if (summary.type === "保护管理校准") return `${summary.properties || 0} 项目 / ${summary.assessments || 0} 校准项 / ${summary.reviewedRows || 0} 已审阅`;
  if (summary.type === "保护管理 Round 1 人工标记") return `${summary.marks || 0} 标记 / ${summary.adjusted || 0} 调整 / ${summary.noted || 0} 备注`;
  return `${summary.properties || 0} 项目 / ${summary.narratives || 0} 修订 / ${summary.notes || 0} 备注`;
}

function importLegacyStorage(index = 0) {
  const candidate = legacyStorageCandidates[Number(index) || 0];
  if (!candidate?.storage) {
    saveStatus = "没有找到可迁入的旧版缓存。";
    render();
    return;
  }
  try {
    if (candidate.kind) {
      importLegacySupplement(candidate);
    } else {
      const current = localStorage.getItem(STORAGE_KEY);
      if (current && current !== candidate.storage) pushLocalBackup(current, "before_legacy_import");
      localStorage.setItem(STORAGE_KEY, candidate.storage);
      if (candidate.backups) localStorage.setItem(STORAGE_BACKUP_KEY, candidate.backups);
      state = normalizeWorkspaceState(JSON.parse(candidate.storage));
      selectedPropertyId = state.properties.find((property) => property.id === selectedPropertyId)?.id || state.properties[0]?.id || "";
      selectedPptPropertyId = selectedPropertyId;
      saveStatus = `已迁入 ${candidate.origin} 的${candidate.label || "旧版本地数据"}。`;
    }
    legacyStorageCandidates = [];
  } catch (error) {
    saveStatus = `旧版缓存迁入失败：${error.message}`;
  }
  render();
}

function importLegacySupplement(candidate) {
  const current = localStorage.getItem(STORAGE_KEY);
  if (current) pushLocalBackup(current, `before_${candidate.kind}`);
  const payload = JSON.parse(candidate.storage || "{}");
  const summary =
    candidate.kind === "icomos_pm_calibration_v1"
      ? applyLegacyPmCalibration(payload)
      : applyLegacyRound1Marks(payload);
  saveLocalState();
  saveStatus = `已合并 ${candidate.origin} 的${candidate.label}：更新 ${summary.updated} 条评估。`;
}

function applyLegacyPmCalibration(payload) {
  const rows = payload.assessment_calibration_items || [];
  let updated = 0;
  rows.forEach((row) => {
    const property = legacyPropertyFor(row.property_id, payload.properties);
    const itemKey = normalizeLegacyAssessmentItem(row.assessment_item);
    const rating = levelToRating[row.human_calibrated_level || row.ai_inferred_level] || normalizeRatingValue(row.human_calibrated_rating);
    if (!property?.id || !itemKey || !rating || rating === "unknown") return;
    const assessment = ensureAssessmentRow(property.id, itemKey);
    assessment.human_calibrated_rating = rating;
    assessment.review_status = row.review_status || assessment.review_status || "draft";
    assessment.reviewer = row.reviewer || assessment.reviewer || "";
    assessment.reviewer_note = row.calibration_basis || assessment.reviewer_note || "";
    assessment.updated_at = new Date().toISOString();
    updated += 1;
  });
  return { updated };
}

function applyLegacyRound1Marks(payload) {
  const marks = Object.values(payload.marks || payload || {});
  let updated = 0;
  marks.forEach((mark) => {
    const property = legacyPropertyFor(mark.property);
    const itemKey = normalizeLegacyAssessmentItem(mark.item);
    const rating = levelToRating[mark.human_calibrated_level || mark.calibratedLevel || mark.ai_level] || "unknown";
    if (!property?.id || !itemKey) return;
    const assessment = ensureAssessmentRow(property.id, itemKey);
    if (rating !== "unknown") assessment.human_calibrated_rating = rating;
    assessment.review_status = legacyMarkReviewStatus(mark.status) || assessment.review_status || "draft";
    assessment.reviewer_note = mark.note || assessment.reviewer_note || "";
    assessment.updated_at = new Date().toISOString();
    updated += 1;
  });
  return { updated };
}

function ensureAssessmentRow(propertyId, itemKey) {
  let assessment = state.property_assessments.find((entry) => entry.property_id === propertyId && entry.item_key === itemKey);
  if (!assessment) {
    assessment = {
      id: `${propertyId}-${itemKey}`,
      property_id: propertyId,
      item_key: itemKey,
      ai_inferred_rating: "unknown",
      human_calibrated_rating: "unknown",
      official_ppt_rating: "unknown",
      conclusion_zh: "",
      conclusion_en: "",
      rationale_zh: "",
      confidence: "medium",
      review_status: "draft",
      reviewer: "",
      reviewer_note: "",
      updated_at: new Date().toISOString(),
    };
    state.property_assessments.push(assessment);
  }
  return assessment;
}

function legacyPropertyFor(value, legacyProperties = []) {
  const text = String(value || "").toLowerCase();
  const legacyProperty = legacyProperties.find((property) => property.id === value || property.name === value);
  const haystack = `${text} ${String(legacyProperty?.name || "").toLowerCase()}`;
  const aliases = [
    ["C1765", /jingdezhen|china-jingdezhen|景德镇/],
    ["C1768", /comoros|medinas/],
    ["C1750", /sao tome|são tomé|roças|rocas/],
    ["C1769", /sidi bou|tunisia/],
    ["C1751", /tashkent/],
  ];
  const matched = aliases.find(([, pattern]) => pattern.test(haystack));
  if (matched) return propertyById(matched[0]);
  return state.properties.find((property) =>
    [property.id, property.property_name_en, property.property_name_zh, property.state_party]
      .filter(Boolean)
      .some((part) => String(part).toLowerCase().includes(text) || text.includes(String(part).toLowerCase())),
  );
}

function normalizeLegacyAssessmentItem(value) {
  const text = String(value || "").toLowerCase();
  if (/protection of property|protection_property|本体/.test(text)) return "protection_property";
  if (/buffer|protection_buffer_zone|缓冲/.test(text)) return "protection_buffer_zone";
  if (/conservation|保护状况|保护措施/.test(text)) return "conservation";
  if (/management|管理/.test(text)) return "management";
  if (/threat|威胁/.test(text)) return "threats_addressed";
  return "";
}

function legacyMarkReviewStatus(status) {
  return {
    agree: "confirmed",
    adjusted: "reviewed",
    revisit: "disputed",
    discuss: "disputed",
  }[status] || "";
}

function renderAuthControls() {
  if (!supabaseClient) return `<a class="button secondary" data-route data-route-path="/database" href="${appPath("/database")}">部署说明</a>`;
  if (currentUser) return `<button class="button secondary" id="signOutBtn">退出登录</button>`;
  return `
    <label>邮箱登录
      <input id="loginEmail" type="email" placeholder="name@example.com">
    </label>
    <button class="button primary" id="magicLinkBtn">发送登录链接</button>
  `;
}

function renderPage(route) {
  if (route === "/database") return renderDatabasePage();
  if (route === "/properties") return renderPropertiesPage();
  if (route.startsWith("/properties/")) return renderPropertyDetail(route.split("/").pop());
  if (route === "/official-ratings-entry") return renderOfficialRatingsPage();
  return renderDashboard();
}

function renderDashboard() {
  const pmAssessments = state.property_assessments.filter((entry) => pmItemKeys.includes(entry.item_key));
  const pptPending = state.property_assessments.filter((entry) => !entry.official_ppt_rating || entry.official_ppt_rating === "unknown").length;
  const culturalCount = state.properties.filter((property) => heritageTypeFor(property) === "Cultural").length;
  const mixedCount = state.properties.filter((property) => heritageTypeFor(property) === "Mixed").length;
  const serialCount = state.properties.filter((property) => property.is_serial).length;
  const transnationalCount = state.properties.filter((property) => property.is_transnational || String(property.state_party || "").includes("/")).length;
  const newNominationCount = state.properties.filter((property) => property.nomination_type === "New nomination").length;
  const emergencyNominationCount = state.properties.filter((property) => property.nomination_type === "Emergency nomination").length;
  const referredBackNominationCount = state.properties.filter((property) => property.nomination_type === "Referred back nomination").length;
  const boundaryCount = state.properties.filter(isBoundaryNomination).length;
  return `
    ${renderTopbar(`数据总览 ${APP_VERSION_LABEL}`, "48th session ICOMOS cultural and mixed nominations", `<button class="button primary" id="exportDashboardStatsBtn" type="button">导出统计 Excel</button>`)}
    ${renderDashboardExportPanel()}
    ${dashboardSection(
      "一、项目概况",
      `
        <div class="stat-strip">
          ${compactStat("评估项目", state.properties.length, "", "/properties?column_group=basic")}
          ${compactStat("新申报", newNominationCount, percentage(newNominationCount, state.properties.length), "/properties?nomination_type=New+nomination&column_group=basic")}
          ${compactStat("紧急申报", emergencyNominationCount, percentage(emergencyNominationCount, state.properties.length), "/properties?nomination_type=Emergency+nomination&column_group=basic")}
          ${compactStat("补报", referredBackNominationCount, percentage(referredBackNominationCount, state.properties.length), "/properties?nomination_type=Referred+back+nomination&column_group=basic")}
          ${compactStat("边界调整", boundaryCount, percentage(boundaryCount, state.properties.length), "/properties?nomination_scope=boundary&column_group=basic")}
          ${compactStat("文化遗产", culturalCount, percentage(culturalCount, state.properties.length), "/properties?heritage_type=Cultural&column_group=basic")}
          ${compactStat("混合遗产", mixedCount, percentage(mixedCount, state.properties.length), "/properties?heritage_type=Mixed&column_group=basic")}
          ${compactStat("系列遗产", serialCount, percentage(serialCount, state.properties.length), "/properties?serial=serial&column_group=basic")}
          ${compactStat("跨境遗产", transnationalCount, percentage(transnationalCount, state.properties.length), "/properties?transnational=transnational&column_group=basic")}
        </div>
        <div class="grid three dashboard-grid">
          ${distributionChart("申报事项类型", nominationTypeDistribution(), "nomination_type", "basic")}
          ${distributionChart("区域分布", regionDistribution(), "region", "basic")}
          ${distributionChart("Category of property", categoryOfPropertyDistribution(), "category_of_property", "basic")}
        </div>
      `,
    )}
    ${dashboardSection(
      "二、ICOMOS 推荐意见",
      `
        <div class="grid two dashboard-grid">
          ${distributionChart("提名项目：列入相关推荐", nominationRecommendationDistribution(), "recommendation", "value")}
          ${distributionChart("其他申报事项：通过与否", boundaryRecommendationDistribution(), "recommendation", "value")}
        </div>
      `,
    )}
    ${dashboardSection(
      "三、ICOMOS 评估表技术指标",
      `
        <div class="grid two dashboard-grid">
          ${criteriaDistributionChart("价值标准：申报文本", proposedCriteriaDistribution(), "proposed_criterion")}
          ${criteriaDistributionChart("价值标准：ICOMOS 认可", icomosCriteriaDistribution(), "icomos_criterion")}
        </div>
        <div class="grid two dashboard-grid assessment-dashboard-grid">
          ${assessmentDistributionChart("比较研究", "comparative_analysis", "assessment")}
          ${assessmentDistributionChart("真实性", "authenticity", "assessment")}
          ${assessmentDistributionChart("完整性", "integrity", "assessment")}
          ${assessmentDistributionChart("边界", "boundaries", "assessment")}
          ${assessmentDistributionChart("Protection (property)", "protection_property", "protection")}
          ${assessmentDistributionChart("Protection (buffer zone)", "protection_buffer_zone", "protection")}
          ${assessmentDistributionChart("Conservation Measures", "conservation", "protection")}
          ${assessmentDistributionChart("Protection and management", "management", "protection")}
          ${assessmentDistributionChart("Threats addressed", "threats_addressed", "protection")}
        </div>
      `,
    )}
    ${dashboardSection(
      "四、大会决议",
      `
        <div class="grid three dashboard-grid">
          ${distributionChart("申报项目决议", committeeDecisionDistribution(), "committee_decision_category", "conclusion")}
          ${criteriaDistributionChart("价值标准：大会决议", committeeCriteriaDistribution(), "committee_criterion")}
          ${distributionChart("ICOMOS vs Committee", committeeChangedRecommendationDistribution(), "committee_change_from", "conclusion")}
        </div>
      `,
    )}
    <section class="notice secondary-note" style="margin-top: 12px;">
      次要数据提示：保护管理评分记录 ${pmAssessments.length} 条；待录入官方 PPT 评分 ${pptPending} 条；证据记录 ${state.evidence.length} 条。
    </section>
  `;
}

function exportDashboardStatsWorkbook() {
  const workbookText = dashboardStatsWorkbookXml();
  const filename = `whc48-icomos-dashboard-stats-${compactDateTime(new Date())}.xls`;
  dashboardExportWorkbookText = workbookText;
  dashboardExportPreviewText = dashboardStatsTableText();
  dashboardExportFilename = filename;
  downloadFile(filename, workbookText, "application/vnd.ms-excel;charset=utf-8");
  saveStatus = `已生成总览统计 Excel：${filename}。如果浏览器没有弹出下载，可在页面面板中复制表格文本或再次下载。`;
  render();
}

function renderDashboardExportPanel() {
  if (!dashboardExportPreviewText) return "";
  return `
    <section class="panel dashboard-export-panel">
      <div class="panel-title-row">
        <div>
          <h2>总览统计 Excel 已生成</h2>
          <p class="muted">${escapeHtml(dashboardExportFilename)} · 每个专题一个工作表，每项统计是一张小表；若浏览器未下载，可复制下方制表符文本。</p>
        </div>
        <div class="button-row">
          <button class="button primary" id="downloadDashboardStatsWorkbookBtn" type="button">再次下载 Excel</button>
          <button class="button secondary" id="copyDashboardStatsTableBtn" type="button">复制表格文本</button>
        </div>
      </div>
      <textarea class="export-preview-textarea" readonly rows="10" aria-label="总览统计表格文本">${escapeHtml(dashboardExportPreviewText)}</textarea>
    </section>
  `;
}

async function copyDashboardStatsTableText() {
  if (!dashboardExportPreviewText) return;
  try {
    await navigator.clipboard.writeText(dashboardExportPreviewText);
    saveStatus = "已复制总览统计表格文本。";
  } catch {
    saveStatus = "当前浏览器无法自动复制；请在页面面板中手动选中表格文本复制。";
  }
  render();
}

function downloadDashboardStatsWorkbookAgain() {
  if (!dashboardExportWorkbookText) return;
  downloadFile(dashboardExportFilename || `whc48-icomos-dashboard-stats-${compactDateTime(new Date())}.xls`, dashboardExportWorkbookText, "application/vnd.ms-excel;charset=utf-8");
  saveStatus = `已再次尝试下载：${dashboardExportFilename}`;
  render();
}

function dashboardStatsTableText() {
  return dashboardWorkbookSheets()
    .map((sheet) =>
      [
        `# ${sheet.name}`,
        "",
        ...sheet.tables.flatMap((table) => [
          table.title,
          ["类别", "数量", "比例"].join("\t"),
          ...table.rows.map((row) => row.join("\t")),
          "",
        ]),
      ].join("\n"),
    )
    .join("\n\n");
}

function dashboardWorkbookSheets() {
  const total = state.properties.length;
  const pmAssessments = state.property_assessments.filter((entry) => pmItemKeys.includes(entry.item_key));
  const pptPending = state.property_assessments.filter((entry) => !entry.official_ppt_rating || entry.official_ppt_rating === "unknown").length;
  return [
    {
      name: "一、项目概况",
      tables: [
        dashboardDirectTable("项目概况总览", [
          ["评估项目", total, total],
          ["新申报", state.properties.filter((property) => property.nomination_type === "New nomination").length, total],
          ["紧急申报", state.properties.filter((property) => property.nomination_type === "Emergency nomination").length, total],
          ["补报", state.properties.filter((property) => property.nomination_type === "Referred back nomination").length, total],
          ["边界调整", state.properties.filter(isBoundaryNomination).length, total],
          ["文化遗产", state.properties.filter((property) => heritageTypeFor(property) === "Cultural").length, total],
          ["混合遗产", state.properties.filter((property) => heritageTypeFor(property) === "Mixed").length, total],
          ["系列遗产", state.properties.filter((property) => property.is_serial).length, total],
          ["跨境遗产", state.properties.filter((property) => property.is_transnational || String(property.state_party || "").includes("/")).length, total],
        ]),
        dashboardDistributionTable("申报事项类型", nominationTypeDistribution(), "nomination_type"),
        dashboardDistributionTable("区域分布", regionDistribution(), "region"),
        dashboardDistributionTable("Category of property", categoryOfPropertyDistribution(), "category_of_property"),
      ],
    },
    {
      name: "二、ICOMOS推荐",
      tables: [
        dashboardDistributionTable("提名项目：列入相关推荐", nominationRecommendationDistribution(), "recommendation"),
        dashboardDistributionTable("其他申报事项：通过与否", boundaryRecommendationDistribution(), "recommendation"),
      ],
    },
    {
      name: "三、技术指标",
      tables: [
        dashboardDistributionTable("价值标准：申报文本", proposedCriteriaDistribution(), "proposed_criterion"),
        dashboardDistributionTable("价值标准：ICOMOS 认可", icomosCriteriaDistribution(), "icomos_criterion"),
        ...assessmentDashboardTables(),
      ],
    },
    {
      name: "四、大会决议",
      tables: [
        dashboardDistributionTable("申报项目决议", committeeDecisionDistribution(), "committee_decision_category"),
        dashboardDistributionTable("价值标准：大会决议", committeeCriteriaDistribution(), "committee_criterion"),
        dashboardDistributionTable("ICOMOS vs Committee", committeeChangedRecommendationDistribution(), "committee_change_from"),
      ],
    },
    {
      name: "次要数据",
      tables: [
        dashboardDirectTable("次要数据提示", [
          ["保护管理评分记录", pmAssessments.length, state.property_assessments.length],
          ["待录入官方 PPT 评分", pptPending, state.property_assessments.length],
          ["证据记录", state.evidence.length, state.evidence.length],
        ]),
      ],
    },
  ];
}

function assessmentDashboardTables() {
  const items = [
    ["比较研究", "comparative_analysis"],
    ["真实性", "authenticity"],
    ["完整性", "integrity"],
    ["边界", "boundaries"],
    ["Protection (property)", "protection_property"],
    ["Protection (buffer zone)", "protection_buffer_zone"],
    ["Conservation Measures", "conservation"],
    ["Protection and management", "management"],
    ["Threats addressed", "threats_addressed"],
  ];
  return items.map(([label, itemKey]) => dashboardDistributionTable(label, assessmentItemDistribution(itemKey), "human_rating"));
}

function dashboardDistributionTable(title, entries, filterKey = "") {
  const total = Object.values(entries).reduce((sum, count) => sum + count, 0);
  return dashboardDirectTable(
    title,
    Object.entries(entries).map(([category, count]) => [formatDistributionLabel(filterKey, category), count, total]),
  );
}

function dashboardDirectTable(title, rows) {
  return {
    title,
    rows: rows.map(([label, count, total]) => [label, count, total ? percentage(count, total) : ""]),
  };
}

function dashboardStatsWorkbookXml() {
  const sheets = dashboardWorkbookSheets();
  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Center"/><Font ss:FontName="Arial" ss:Size="11"/></Style>
  <Style ss:ID="SheetTitle"><Font ss:FontName="Arial" ss:Size="16" ss:Bold="1"/><Alignment ss:Horizontal="Center"/></Style>
  <Style ss:ID="TableTitle"><Font ss:FontName="Arial" ss:Size="12" ss:Bold="1"/><Alignment ss:Horizontal="Center"/></Style>
  <Style ss:ID="Header"><Font ss:FontName="Arial" ss:Bold="1"/><Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/><Borders>${excelBorders()}</Borders></Style>
  <Style ss:ID="RowLabel"><Font ss:FontName="Arial" ss:Bold="1"/><Interior ss:Color="#EEEEEE" ss:Pattern="Solid"/><Borders>${excelBorders()}</Borders></Style>
  <Style ss:ID="Cell"><Borders>${excelBorders()}</Borders></Style>
  <Style ss:ID="Number"><Alignment ss:Horizontal="Right"/><Borders>${excelBorders()}</Borders></Style>
 </Styles>
 ${sheets.map(dashboardSheetXml).join("\n")}
</Workbook>`;
}

function dashboardSheetXml(sheet) {
  const rows = [
    `<Row ss:Height="32"><Cell ss:MergeAcross="2" ss:StyleID="SheetTitle"><Data ss:Type="String">${xmlEscape(sheet.name)}</Data></Cell></Row>`,
    `<Row/>`,
  ];
  sheet.tables.forEach((table) => {
    rows.push(`<Row ss:Height="28"><Cell ss:MergeAcross="2" ss:StyleID="TableTitle"><Data ss:Type="String">${xmlEscape(table.title)}</Data></Cell></Row>`);
    rows.push(`<Row><Cell ss:StyleID="Header"><Data ss:Type="String">类别</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">数量</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">比例</Data></Cell></Row>`);
    table.rows.forEach(([label, count, ratio]) => {
      rows.push(`<Row><Cell ss:StyleID="RowLabel"><Data ss:Type="String">${xmlEscape(label)}</Data></Cell><Cell ss:StyleID="Number"><Data ss:Type="Number">${Number(count) || 0}</Data></Cell><Cell ss:StyleID="Number"><Data ss:Type="String">${xmlEscape(ratio)}</Data></Cell></Row>`);
    });
    rows.push(`<Row/>`, `<Row/>`);
  });
  return `<Worksheet ss:Name="${xmlEscape(excelSheetName(sheet.name))}">
  <Table ss:DefaultRowHeight="22">
   <Column ss:Width="220"/>
   <Column ss:Width="90"/>
   <Column ss:Width="90"/>
   ${rows.join("\n   ")}
  </Table>
 </Worksheet>`;
}

function excelBorders() {
  return `<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A6A6A6"/><Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A6A6A6"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A6A6A6"/><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A6A6A6"/>`;
}

function excelSheetName(name) {
  return String(name || "统计")
    .replace(/[\\/?*[\]:]/g, " ")
    .slice(0, 31);
}

function xmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderDatabasePage() {
  const backups = readLocalBackups();
  const latestBackup = backups[0];
  return `
    ${renderTopbar("数据库与共享部署", "Supabase/PostgreSQL + 静态网页部署")}
    <div class="${supabaseClient ? "notice success" : "notice"}">
      ${supabaseClient ? "已检测到 Supabase 配置。建表后可点击“写入种子数据”，团队成员通过链接访问同一个数据库。" : "当前未配置 Supabase。页面可本地试用；要共享浏览和协作编辑，请复制 app-config.example.js 为 app-config.js 并填入 Supabase URL 与 anon key。"}
    </div>
    <section class="grid two" style="margin-top: 12px;">
      <div class="panel">
        <h2>部署步骤</h2>
        <ul class="item-list">
          <li>在 Supabase SQL Editor 执行 <code>supabase/schema.sql</code>。</li>
          <li>开放同事试用前，再执行 <code>supabase/collaboration-updates.sql</code> 建立修订日志和邮箱白名单写入策略。</li>
          <li>填好 <code>app-config.js</code> 中的 <code>SUPABASE_URL</code> 和 <code>SUPABASE_ANON_KEY</code>。</li>
          <li>用本页按钮写入种子数据，或执行 <code>supabase/seed.sql</code>。</li>
          <li>把整个目录作为静态站点部署到 Vercel、Netlify、Cloudflare Pages 或任意 Web 服务器。</li>
        </ul>
      </div>
      <div class="panel">
        <h2>协作编辑规则</h2>
        <ul class="item-list">
          <li>匿名用户可浏览公开数据。</li>
          <li>建议先用邮箱白名单限制写入权限；登录用户的正文修订、大会决议和备注会记录最近修改人与修订日志。</li>
          <li>Reviewer 可通过 review_status 标记 draft、reviewed、disputed、confirmed。</li>
        </ul>
      </div>
    </section>
    <section class="panel backup-panel" style="margin-top: 12px;">
      <div class="panel-title-row">
        <div>
          <h2>本地备份与人工修订保护</h2>
          <p class="muted">这里分为共享写入、本机快照和导出迁移三类。普通录入时一般不用操作；准备换设备、换对话、大批量导入或发布前再使用。</p>
        </div>
      </div>
      <div class="action-groups">
        <div class="action-group">
          <div>
            <h3>共享数据库</h3>
            <p class="muted">把 ICOMOS 报告梳理、评分校准、大会决议等公共字段写入 Supabase。适合少数维护者确认本地数据无误后同步给团队；个人“要点备注”不会上传。</p>
          </div>
          <div class="button-row">
            <button class="button primary" id="publishWorkspaceBackupBtn" type="button" ${supabaseClient ? "" : "disabled"}>写入当前工作区到共享数据库</button>
          </div>
        </div>
        <div class="action-group">
          <div>
            <h3>本机快照</h3>
            <p class="muted">只保存在这台电脑、这个浏览器里，用来在误操作后回退。不会生成文件，也不会写入 Supabase。</p>
          </div>
          <div class="button-row">
            <button class="button secondary" id="createLocalBackupBtn" type="button">创建本机快照</button>
            <button class="button secondary" id="restoreLatestBackupBtn" type="button" ${latestBackup ? "" : "disabled"}>恢复最近本机快照</button>
            ${isLocalPreview() ? `<button class="button secondary" id="restoreReviewedBackupBtn" type="button">恢复内置人工修订备份</button>` : ""}
          </div>
        </div>
        <div class="action-group">
          <div>
            <h3>公共数据导出</h3>
            <p class="muted">导出的是 <code>whc48-icomos-workspace-时间.json</code>，包含项目、评估、公共详情栏目、PPT 评分和公共修订日志；不含个人“要点备注”。适合迁移到新对话，或在本页“结构化抽取结果导入”重新导入。</p>
          </div>
          <div class="button-row">
            <button class="button primary" id="exportWorkspaceBtn" type="button">下载工作区 JSON</button>
            <button class="button secondary" id="copyWorkspaceExportBtn" type="button">复制工作区 JSON</button>
          </div>
        </div>
        <div class="action-group">
          <div>
            <h3>个人笔记导出</h3>
            <p class="muted">导出各项目右侧“要点备注”，按项目罗列为个人文档。Markdown 适合继续整理或粘贴；Word 文档可直接用 Word/WPS 打开。</p>
          </div>
          <div class="button-row">
            <button class="button primary" id="exportPrivateNotesMarkdownBtn" type="button">导出笔记 Markdown</button>
            <button class="button secondary" id="exportPrivateNotesWordBtn" type="button">导出笔记 Word</button>
          </div>
        </div>
      </div>
      ${exportPreviewText ? `<textarea class="export-preview-textarea" readonly rows="12" aria-label="当前工作区导出 JSON">${escapeHtml(exportPreviewText)}</textarea>` : ""}
      <div class="backup-status">
        <span>备份数量：${backups.length}</span>
        <span>最近备份：${latestBackup ? escapeHtml(formatDateTime(latestBackup.saved_at)) : "暂无"}</span>
      </div>
    </section>
    <section class="panel" style="margin-top: 12px;">
      <h2>核心表</h2>
      <div class="chips" style="margin-top: 10px;">
        ${["properties", "assessment_items", "property_assessments", "assessment_subitems", "criteria_assessments", "comparators", "attributes", "recommendations", "narrative_edits", "edit_history", "evidence", "sources", "official_ppt_ratings", "property_type_tags"].map((name) => `<span class="chip">${name}</span>`).join("")}
      </div>
    </section>
    <section class="panel import-panel" style="margin-top: 12px;">
      <h2>结构化抽取结果导入</h2>
      <p class="muted">把 ChatGPT 项目按工作模板输出的 JSON 粘贴到这里。导入后，详情页、项目列表和总览会使用同一套结构化数据。</p>
      <div class="button-row" style="justify-content: flex-start;">
        <a class="button secondary" href="${assetPath("/analysis/icomos-report-extraction-work-template.md")}" target="_blank" rel="noreferrer">查看抽取提示词</a>
        <a class="button secondary" href="${assetPath("/data/icomos-extraction-template.json")}" target="_blank" rel="noreferrer">查看 JSON 模板</a>
      </div>
      <textarea id="structuredImportInput" rows="12" placeholder="粘贴 whc48-extraction-v1 JSON。支持按项目嵌套格式，也支持 properties、property_assessments 等表数组格式。"></textarea>
      <div class="button-row" style="justify-content: flex-end;">
        <button class="button primary" id="importStructuredBtn" type="button">导入结构化结果</button>
      </div>
    </section>
  `;
}

function renderPropertiesPage() {
  const columns = propertyListColumns();
  const rows = filteredProperties();
  return `
    ${renderTopbar("项目列表", "所有 2026 ICOMOS 文化与混合遗产评估项目", "")}
    <section class="filters properties-filters">
      <label class="property-search-filter" data-filter-key="query">关键词检索
        <input id="propertySearchInput" type="search" value="${escapeAttr(filters.query)}" placeholder="ID、项目名、缔约国、备注">
      </label>
      <button class="button primary" id="applyPropertySearchBtn" type="button">检索</button>
      <button class="button secondary" id="clearPropertyFiltersBtn" type="button">清除筛选</button>
      ${selectFilter("column_group", "栏目组", ["all", "basic", "assessment", "attributes", "conclusion"], columnGroupLabel)}
      ${selectFilter("region", "区域", regionFilterOptions())}
      ${selectFilter("nomination_type", "申报类型", nominationTypeFilterOptions(), nominationTypeLabel)}
      ${selectFilter("recommendation", "ICOMOS 推荐类别", recommendationFilterOptions())}
      ${selectFilter("heritage_type", "遗产大类", uniqueValues(state.properties.map((p) => heritageTypeFor(p))))}
      ${selectFilter("category_of_property", "Category of property", categoryOfPropertyFilterOptions(), categoryOfPropertyLabel)}
      ${selectFilter("serial", "系列遗产", ["serial", "non_serial"])}
      ${selectFilter("transnational", "跨境遗产", ["transnational", "national"], transnationalLabel)}
      <div class="filter-row criteria-filter-row">
        ${selectFilter("proposed_criterion", "申报价值标准", criterionFilterOptions(), criterionLabel)}
        ${selectFilter("icomos_criterion", "ICOMOS 认可标准", criterionFilterOptions(), criterionLabel)}
        ${selectFilter("committee_criterion", "大会确认标准", criterionFilterOptions(), criterionLabel)}
      </div>
      <div class="filter-row assessment-filter-row">
        ${selectFilter("item_key", "评估项", officialRatingItemKeys, labelForItem)}
        ${selectFilter("human_rating", "评估分级", ratingOptions.map(([value]) => value), formatRating)}
      </div>
      <div class="filter-row result-count-row">
        <span class="filter-count">显示 ${rows.length} / ${state.properties.length} 个项目</span>
      </div>
    </section>
    <section class="table-wrap">
      <table>
        <thead><tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((property) => `
            <tr class="clickable" data-property-id="${escapeAttr(property.id)}">
              ${columns.map((column) => `<td class="${column.className || ""}">${column.render(property)}</td>`).join("")}
            </tr>
          `).join("") || `<tr><td colspan="${columns.length}" class="empty">当前筛选没有结果。</td></tr>`}
        </tbody>
      </table>
    </section>
  `;
}

function propertyListColumns() {
  const allColumns = [
    { key: "id", label: "ID", group: "basic", always: true, render: (property) => escapeHtml(property.id) },
    {
      key: "property",
      label: "项目",
      group: "basic",
      always: true,
      className: "summary-cell",
      render: (property) => `<strong>${escapeHtml(property.property_name_en)}</strong><br><span class="muted">${escapeHtml(property.property_name_zh || "")}</span>`,
    },
    { key: "state_party", label: "缔约国", group: "basic", render: (property) => escapeHtml(property.state_party || "") },
    { key: "region", label: "区域", group: "basic", render: (property) => escapeHtml(property.region || "") },
    { key: "nomination_type", label: "申报类型", group: "basic", render: (property) => escapeHtml(property.nomination_type || "") },
    { key: "heritage_type", label: "遗产大类", group: "basic", render: (property) => escapeHtml(heritageTypeFor(property) || "待补") },
    { key: "category_of_property", label: "Category of property", group: "basic", render: renderCategoryOfPropertyCell },
    { key: "cultural_subtype", label: "研究子类型", group: "basic", render: (property) => escapeHtml(property.cultural_subtype || "待补") },
    { key: "serial", label: "系列/组成部分", group: "basic", render: renderSerialCell },
    { key: "transnational", label: "跨国/国家", group: "basic", render: (property) => (property.is_transnational ? "transnational" : "national") },
    { key: "proposed_criteria", label: "申报标准", group: "assessment", render: (property) => criteriaText(property.proposed_criteria) },
    { key: "icomos_criteria", label: "ICOMOS 认可标准", group: "assessment", render: (property) => criteriaText(property.icomos_recommended_criteria) },
    { key: "serial_selection", label: "系列筛选", group: "assessment", render: renderSerialSelectionCell },
    { key: "comparative_analysis", label: "比较研究", group: "assessment", render: (property) => assessmentRatingCell(property.id, "comparative_analysis") },
    { key: "authenticity", label: "真实性", group: "assessment", render: (property) => assessmentRatingCell(property.id, "authenticity") },
    { key: "integrity", label: "完整性", group: "assessment", render: (property) => assessmentRatingCell(property.id, "integrity") },
    { key: "boundaries", label: "边界", group: "assessment", render: (property) => assessmentRatingCell(property.id, "boundaries") },
    { key: "protection_property", label: "本体保护", group: "protection", render: (property) => assessmentRatingCell(property.id, "protection_property") },
    { key: "protection_buffer_zone", label: "缓冲区保护", group: "protection", render: (property) => assessmentRatingCell(property.id, "protection_buffer_zone") },
    { key: "conservation", label: "保护状况/措施", group: "protection", render: (property) => assessmentRatingCell(property.id, "conservation") },
    { key: "management", label: "管理", group: "protection", render: (property) => assessmentRatingCell(property.id, "management") },
    { key: "threats_addressed", label: "威胁应对", group: "protection", render: (property) => assessmentRatingCell(property.id, "threats_addressed") },
    { key: "attribute_overview", label: "Attributes 综述", group: "attributes", className: "summary-cell", render: renderAttributeOverviewCell },
    { key: "attribute_note", label: "Attributes 分析备注", group: "attributes", className: "summary-cell", render: renderAttributeNoteCell },
    { key: "icomos_draft_pm_requirements", label: "ICOMOS 草案保护管理意见", group: "icomos_conclusion", className: "summary-cell", render: renderIcomosDraftPmCell },
    { key: "icomos_recommendation", label: "ICOMOS 推荐类别", group: "icomos_conclusion", render: renderRecommendationCell },
    { key: "committee_criteria", label: "大会确认标准", group: "committee", render: (property) => criteriaText(property.committee_confirmed_criteria) || "待录入" },
    { key: "committee_decision", label: "大会列入决议", group: "committee", render: (property) => escapeHtml(property.committee_decision || "待录入") },
    { key: "committee_pm_requirements", label: "大会保护管理要求", group: "committee", className: "summary-cell", render: renderCommitteePmCell },
    { key: "research_note", label: "要点备注", group: "notes", always: true, className: "summary-cell", render: renderResearchNoteCell },
  ];
  if (filters.column_group === "all") return allColumns;
  if (filters.column_group === "assessment") return allColumns.filter((column) => column.always || column.group === "assessment" || column.group === "protection");
  if (filters.column_group === "conclusion") return allColumns.filter((column) => column.always || column.group === "icomos_conclusion" || column.group === "committee");
  return allColumns.filter((column) => column.always || column.group === filters.column_group);
}

function renderPropertyDetail(propertyId) {
  const property = state.properties.find((entry) => entry.id === propertyId) || state.properties[0];
  if (!property) return `<div class="empty">暂无项目数据。</div>`;
  selectedPropertyId = property.id;
  const assessments = state.property_assessments.filter((entry) => entry.property_id === property.id);
  const comparators = state.comparators.filter((entry) => entry.property_id === property.id);
  const attributes = state.attributes.filter((entry) => entry.property_id === property.id);
  const criteria = state.criteria_assessments.filter((entry) => entry.property_id === property.id);
  const recommendations = state.recommendations.filter((entry) => entry.property_id === property.id);

  return `
    ${renderTopbar(property.property_name_zh || property.property_name_en, property.property_name_en, `<a class="button secondary" data-route data-route-path="/official-ratings-entry" href="${appPath("/official-ratings-entry")}">录入 Check Tool 截图</a>`)}
    <section class="property-detail-layout">
      <div class="property-main-column">
        <section class="property-summary">
          <div class="panel compact-info">
            <h2>基础信息</h2>
            <dl>
              <div><dt>项目 ID</dt><dd>${escapeHtml(property.id)}</dd></div>
              <div><dt>缔约国</dt><dd>${escapeHtml(property.state_party || "")}</dd></div>
              <div><dt>区域</dt><dd>${escapeHtml(property.region || "")}</dd></div>
              <div><dt>申报类型</dt><dd>${escapeHtml(property.nomination_type || "")}</dd></div>
              <div><dt>遗产大类</dt><dd>${escapeHtml(heritageTypeFor(property) || "待补")}</dd></div>
              <div><dt>Category of property</dt><dd>${renderCategoryOfPropertyDetail(property)}</dd></div>
              <div><dt>系列/跨境</dt><dd>${property.is_serial ? "serial" : "non-serial"} · ${property.is_transnational ? "transnational" : "national"}</dd></div>
              <div><dt>ICOMOS 认可标准</dt><dd>${escapeHtml((property.icomos_recommended_criteria || []).join(", ") || "待补")}</dd></div>
              <div><dt>ICOMOS 推荐意见</dt><dd>${escapeHtml(property.icomos_recommendation || "待补")}</dd></div>
            </dl>
          </div>
          <div class="panel conclusion-card">
            <h2>大会审议结论</h2>
            ${renderCommitteeDecisionForm(property)}
          </div>
        </section>
        <section class="section-stack property-flow">
          ${renderBriefSynthesisNarrative(property)}
          ${renderCriteriaNarrative(property, criteria)}
          ${renderAttributesNarrative(property, attributes)}
          ${renderSerialSelectionNarrative(property, assessments)}
          ${renderComparativeNarrative(property, comparators, assessments)}
          ${renderCoreAssessmentNarrative(property, assessments)}
          ${renderProtectionManagementNarrative(property, assessments)}
          ${renderRecommendationsNarrative(property, recommendations)}
        </section>
      </div>
      ${renderPropertySideColumn(property)}
    </section>
  `;
}

function renderPropertySideColumn(property) {
  return `
    <aside class="property-side-column">
      ${renderResearchNotesPanel(property)}
      ${renderEditHistoryPanel(property)}
    </aside>
  `;
}

function renderCommitteeDecisionForm(property) {
  const selectedCriteria = new Set(normalizeCriteriaList(property.committee_confirmed_criteria || []));
  const selectedDecision = committeeDecisionSelectValue(property);
  const edit = narrativePayload(property.id, "committee_decision");
  return `
    <form class="committee-decision-form" data-committee-decision-form data-property-id="${escapeAttr(property.id)}">
      <fieldset>
        <legend>大会确认价值标准</legend>
        <div class="criteria-checkbox-grid">
          ${WORLD_HERITAGE_CRITERIA.map((criterion) => `
            <label>
              <input type="checkbox" name="committee_confirmed_criteria" value="${escapeAttr(criterion)}" ${selectedCriteria.has(criterion) ? "checked" : ""}>
              ${escapeHtml(criterion)}
            </label>
          `).join("")}
        </div>
      </fieldset>
      <label>列入与否的决议
        <select name="committee_decision">
          ${COMMITTEE_DECISION_OPTIONS.map((value) => `
            <option value="${escapeAttr(value)}" ${value === selectedDecision ? "selected" : ""}>${escapeHtml(value || "待录入")}</option>
          `).join("")}
        </select>
      </label>
      ${renderLastEditedMeta(edit)}
      <button class="button primary" type="submit">保存大会决议</button>
    </form>
  `;
}

async function persistCommitteeDecision(form) {
  const property = propertyById(form.dataset.propertyId);
  if (!property) return;
  const data = new FormData(form);
  const before = {
    committee_confirmed_criteria: normalizeCriteriaList(property.committee_confirmed_criteria || []),
    committee_decision: cleanCommitteeDecisionValue(property.committee_decision || ""),
  };
  const after = {
    committee_confirmed_criteria: normalizeCriteriaList(data.getAll("committee_confirmed_criteria")),
    committee_decision: cleanCommitteeDecisionValue(data.get("committee_decision") || ""),
  };
  property.committee_confirmed_criteria = after.committee_confirmed_criteria;
  property.committee_decision = after.committee_decision;
  const changed = !sameChangeValue(before, after);
  const stamp = editStamp();
  const metaPayload = {
    ...after,
    updated_by: changed ? stamp.by : narrativePayload(property.id, "committee_decision").updated_by || stamp.by,
    updated_at: changed ? stamp.at : narrativePayload(property.id, "committee_decision").updated_at || stamp.at,
  };
  upsertLocalNarrativeEdit(property.id, "committee_decision", metaPayload, metaPayload.updated_at, metaPayload.updated_by);
  const historyEntry = changed
    ? recordEditHistory({
        propertyId: property.id,
        sectionKey: "committee_decision",
        fieldKey: "committee_decision",
        before,
        after,
      })
    : null;
  saveLocalState();
  saveStatus = changed ? "大会决议已保存到本机浏览器，并已加入修订日志。" : "大会决议未变化，已保留原记录。";

  if (supabaseClient) {
    try {
      const propertyResult = await supabaseClient.from("properties").upsert(supabasePropertyRows([property]), { onConflict: "id" });
      const narrativeResult = await supabaseClient
        .from("narrative_edits")
        .upsert({ property_id: property.id, section_key: "committee_decision", payload: metaPayload, edited_by: metaPayload.updated_by, updated_at: metaPayload.updated_at }, { onConflict: "property_id,section_key" });
      await tryUpsertEditHistoryRows(historyEntry ? [historyEntry] : []);
      if (propertyResult.error || narrativeResult.error) throw new Error(propertyResult.error?.message || narrativeResult.error?.message);
      saveStatus = changed ? "大会决议已保存到共享数据库，并已加入修订日志。" : "大会决议未变化，已保留原记录。";
    } catch (error) {
      saveStatus = `大会决议已保存到本机浏览器；共享保存失败：${error.message}`;
    }
  }
  render();
}

function committeeDecisionSelectValue(property) {
  const value = cleanCommitteeDecisionValue(property.committee_decision || "");
  return COMMITTEE_DECISION_OPTIONS.includes(value) ? value : "Other";
}

function cleanCommitteeDecisionValue(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (COMMITTEE_DECISION_OPTIONS.includes(text)) return text;
  return committeeDecisionCategory({ committee_decision: text });
}

function renderBriefSynthesisNarrative(property) {
  const edit = narrativePayload(property.id, "brief");
  const briefZh = edit.brief_zh ?? property.brief_synthesis_zh ?? "";
  const briefEn = edit.brief_en ?? property.brief_synthesis_en ?? "";
  const briefZhForEdit = cleanManualNarrativeText(briefZh);
  const briefEnForEdit = cleanManualNarrativeText(briefEn);
  const preserveManualBreaks = Object.prototype.hasOwnProperty.call(edit, "brief_en") || Object.prototype.hasOwnProperty.call(edit, "brief_zh");
  if (isEditingNarrative(property.id, "brief")) {
    return `
      <div class="panel narrative-panel">
        ${renderNarrativeHeader("1. Brief Synthesis", property.id, "brief", true)}
        <form class="narrative-edit-form" data-property-id="${escapeAttr(property.id)}" data-section-key="brief">
          <label>原文摘录
            <textarea name="brief_en" rows="9">${escapeHtml(briefEnForEdit)}</textarea>
          </label>
          <label>AI/人工整理信息
            <textarea name="brief_zh" rows="7">${escapeHtml(briefZhForEdit)}</textarea>
          </label>
          ${renderNarrativeEditActions()}
        </form>
      </div>
    `;
  }
  return `
    <div class="panel narrative-panel">
      ${renderNarrativeHeader("1. Brief Synthesis", property.id, "brief")}
      ${sourceTranslationBlock(briefEn, briefZh || "待抽取 ICOMOS Section 7 的 Brief synthesis。", briefSectionSourceMeta(property), "", { preserveSingleNewlines: preserveManualBreaks })}
    </div>
  `;
}

function renderResearchNotesPanel(property) {
  const edit = narrativePayload(property.id, "research_notes");
  const html = researchNoteDisplayHtml(edit);
  return `
    <div class="panel research-note-card" data-research-note-card data-property-id="${escapeAttr(property.id)}" data-section-key="research_notes">
      <div class="panel-title-row">
        <h2>要点备注</h2>
        <span class="muted" data-research-note-status>本机私有</span>
      </div>
      <p class="muted private-note-hint">用于个人工作记录；保存后只留在本机，可在数据库页单独导出 Markdown 或 Word 文档。</p>
      <div class="note-toolbar" aria-label="备注格式工具">
        <button type="button" data-note-command="formatBlock" data-note-value="h3">小标题</button>
        <button type="button" data-note-command="bold"><strong>B</strong></button>
        <button type="button" data-note-command="underline"><u>U</u></button>
        <label class="note-size-tool">字号
          <select data-note-size aria-label="调整字号">
            <option value="">调整字号</option>
            <option value="2">小</option>
            <option value="3">正常</option>
            <option value="4">大</option>
            <option value="5">特大</option>
          </select>
        </label>
        <button type="button" data-note-command="hiliteColor" data-note-value="#fff2a8">高亮</button>
        <label class="note-color-tool" title="文字颜色">
          <span>文字颜色</span>
          <input type="color" value="#0f6b5e" data-note-color aria-label="文字颜色">
        </label>
      </div>
      <div
        class="research-note-editor"
        contenteditable="true"
        data-research-note-editor
        data-placeholder="可记录评估分析时需要关注、复核或讨论的重点。"
      >${html}</div>
      <div class="button-row">
        <button class="button primary" type="button" data-save-research-note>保存备注</button>
      </div>
    </div>
  `;
}

function renderEditHistoryPanel(property) {
  const rows = recentEditHistoryForProperty(property.id).slice(0, 8);
  return `
    <div class="panel edit-history-card">
      <div class="panel-title-row">
        <h2>最近修订</h2>
        <span class="muted">${rows.length ? `${rows.length} 条` : "暂无"}</span>
      </div>
      ${
        rows.length
          ? `<ul class="edit-history-list">${rows.map(renderEditHistoryItem).join("")}</ul>`
          : `<div class="empty compact-empty">本项目还没有修订日志。</div>`
      }
    </div>
  `;
}

function renderEditHistoryItem(entry) {
  const label = NARRATIVE_SECTION_LABELS[entry.section_key] || entry.section_key || "修订";
  const editor = entry.edited_by || "本机用户";
  return `
    <li>
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(formatDateTime(entry.edited_at))}</span>
      <em>${escapeHtml(editor)}</em>
    </li>
  `;
}

function researchNoteDisplayHtml(edit) {
  if (edit.note_html) return sanitizeNoteHtml(edit.note_html);
  const text = String(edit.note || edit.summary || "").trim();
  if (!text) return "";
  return displayParagraphs(text).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

function sanitizeNoteHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = String(html || "");
  const allowedTags = new Set(["p", "br", "div", "h3", "strong", "b", "em", "i", "u", "mark", "span", "ul", "ol", "li"]);
  const allowedStyles = ["color", "background-color", "font-size", "text-decoration", "font-weight"];
  [...template.content.querySelectorAll("*")].forEach((element) => {
    const tag = element.tagName.toLowerCase();
    if (!allowedTags.has(tag)) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const style = element.getAttribute("style") || "";
    [...element.attributes].forEach((attribute) => {
      if (attribute.name !== "style") element.removeAttribute(attribute.name);
    });
    if (!style) return;
    const cleanStyles = [];
    allowedStyles.forEach((property) => {
      const value = element.style.getPropertyValue(property);
      if (value && !/url|expression|javascript/i.test(value)) cleanStyles.push(`${property}: ${value}`);
    });
    if (cleanStyles.length) element.setAttribute("style", cleanStyles.join("; "));
    else element.removeAttribute("style");
  });
  return template.innerHTML;
}

function normalizeNoteFontTags(editor) {
  const sizeMap = {
    1: "0.78em",
    2: "0.9em",
    3: "1em",
    4: "1.18em",
    5: "1.38em",
    6: "1.62em",
    7: "1.9em",
  };
  editor.querySelectorAll("font[size]").forEach((font) => {
    const span = document.createElement("span");
    span.style.fontSize = sizeMap[font.getAttribute("size")] || "1em";
    while (font.firstChild) span.appendChild(font.firstChild);
    font.replaceWith(span);
  });
}

function renderCriteriaNarrative(property, criteria) {
  const edit = narrativePayload(property.id, "criteria");
  const intro = edit.intro ?? "引用 ICOMOS 结论部分对认可价值标准的判断摘要。";
  if (isEditingNarrative(property.id, "criteria")) {
    return `
      <div class="panel narrative-panel">
        ${renderNarrativeHeader("2. 价值标准评估", property.id, "criteria", true)}
        <form class="narrative-edit-form" data-property-id="${escapeAttr(property.id)}" data-section-key="criteria">
          <label>栏目说明
            <textarea name="intro" rows="3">${escapeHtml(intro)}</textarea>
          </label>
          ${criteria
            .map((entry) => {
              const display = criterionDisplayText(property, entry, edit);
              const parts = splitCriterionAnalysis(display.source, entry.criterion);
              const recommendation = recommendationCriterionStatement(property, entry, edit);
              const icomosReview = entry.accepted_by_icomos
                ? [parts.icomos, parts.conclusion].filter(Boolean).join(" ")
                : parts.icomos;
              const conclusionSource = entry.accepted_by_icomos ? recommendation.source : parts.conclusion;
              const conclusionTranslation = entry.accepted_by_icomos ? recommendation.translation : display.translation;
              return `
                <div class="translation-edit-block criteria-edit-block">
                  <h3>Criterion ${escapeHtml(entry.criterion)}</h3>
                  <div class="edit-subsection-title">缔约国论述</div>
                  <label><span>原文摘录</span>
                    <textarea name="criterion_state_en__${escapeAttr(entry.criterion)}" rows="4">${escapeHtml(parts.stateParty)}</textarea>
                  </label>
                  <div class="edit-subsection-title">ICOMOS 评述</div>
                  <label><span>原文摘录</span>
                    <textarea name="criterion_icomos_en__${escapeAttr(entry.criterion)}" rows="5">${escapeHtml(icomosReview)}</textarea>
                  </label>
                  <div class="edit-subsection-title">ICOMOS 结论</div>
                  <label><span>原文摘录</span>
                    <textarea name="criterion_conclusion_en__${escapeAttr(entry.criterion)}" rows="4">${escapeHtml(conclusionSource)}</textarea>
                  </label>
                  <label><span>AI/人工整理信息</span>
                    <textarea name="criterion__${escapeAttr(entry.criterion)}" rows="4">${escapeHtml(conclusionTranslation)}</textarea>
                  </label>
                </div>
              `;
            })
            .join("")}
          <div class="translation-edit-block criteria-edit-block">
            <h3>价值标准评估综合结论</h3>
            <label><span>原文摘录</span>
              <textarea name="criteria_conclusion_en" rows="4">${escapeHtml(criteriaOverallConclusion(property, criteria, edit).source)}</textarea>
            </label>
            <label><span>中文整理</span>
              <textarea name="criteria_conclusion" rows="3">${escapeHtml(criteriaOverallConclusion(property, criteria, edit).translation)}</textarea>
            </label>
          </div>
          ${renderNarrativeEditActions()}
        </form>
      </div>
    `;
  }
  return `
    <div class="panel narrative-panel">
      ${renderNarrativeHeader("2. 价值标准评估", property.id, "criteria")}
      <div class="section-note-with-source">
        <p class="muted">${escapeHtml(intro)}</p>
        ${renderSourceLocator(criteriaSectionSourceMeta(property))}
      </div>
      <ul class="item-list">
        ${criteria.map((entry) => renderCriterionAnalysisItem(property, entry, edit)).join("") || `<li>待录入标准分析。</li>`}
      </ul>
      ${renderCriteriaOverallConclusion(property, criteria, edit)}
    </div>
  `;
}

function renderCriteriaOverallConclusion(property, criteria, edit) {
  const conclusion = criteriaOverallConclusion(property, criteria, edit);
  if (!conclusion.source && !conclusion.translation) return "";
  return `
    <div class="criterion-overall-conclusion">
      <h3>价值标准评估综合结论</h3>
      ${sourceTranslationBlock(conclusion.source, conclusion.translation, sourceMetaFor(property, "criteria_conclusion"), "", { hideLocator: true })}
    </div>
  `;
}

function renderCriterionAnalysisItem(property, entry, edit) {
  const { source, translation } = criterionDisplayText(property, entry, edit);
  const parts = splitCriterionAnalysis(source, entry.criterion);
  const recommendation = recommendationCriterionStatement(property, entry, edit);
  const icomosReview = entry.accepted_by_icomos
    ? [parts.icomos, parts.conclusion].filter(Boolean).join(" ")
    : parts.icomos;
  const conclusionSource = entry.accepted_by_icomos
    ? recommendation.source
    : parts.conclusion;
  const conclusionTranslation = entry.accepted_by_icomos
    ? recommendation.translation || (recommendation.source ? "" : "待补充报告第 7 部分中该价值标准的 ICOMOS 推荐表述。")
    : translation;
  return `
    <li class="criterion-analysis-item">
      <strong>Criterion ${escapeHtml(entry.criterion)}</strong>
      ${entry.proposed_by_state_party === false ? `<span class="chip warning-chip">ICOMOS 补充</span>` : ""}
      ${criterionPartBlock("缔约国论述", parts.stateParty)}
      ${criterionPartBlock("ICOMOS 评述", icomosReview)}
      ${criterionPartBlock("ICOMOS 结论", conclusionSource, conclusionTranslation)}
    </li>
  `;
}

function criterionDisplayText(property, entry, edit) {
  const correction = property?.id === "C1769" ? sidiBouSaidCriterionCorrections[entry.criterion] : null;
  if (correction) {
    return {
      source: correction.source_en,
      translation: correction.summary_zh,
    };
  }
  return {
    source: (edit.criteria_en || {})[entry.criterion] ?? entry.summary_en ?? "",
    translation: (edit.criteria || {})[entry.criterion] ?? entry.summary_zh ?? "待抽取 ICOMOS 逐条标准结论。",
  };
}

function criterionPartBlock(label, sourceEn, zhText = "") {
  const source = cleanImportedText(sourceEn || "");
  const translation = cleanImportedText(zhText || "");
  if (!source && !translation) return "";
  return `
    <div class="criterion-part">
      <h3>${escapeHtml(label)}</h3>
      ${sourceTranslationBlock(source, translation)}
    </div>
  `;
}

function splitCriterionAnalysis(sourceText, criterion) {
  const text = stripCriterionDefinition(cleanImportedText(sourceText || ""), criterion);
  if (!text) return { stateParty: "", icomos: "", conclusion: "" };
  let stateParty = "";
  let rest = text;
  const notProposed = text.match(/The State Party has not proposed this criterion\.?/i);
  if (notProposed) {
    stateParty = notProposed[0];
    rest = text.slice((notProposed.index || 0) + notProposed[0].length).trim();
  } else {
    const firstIcomos = text.search(/\bICOMOS considers\b/i);
    if (firstIcomos > 0) {
      stateParty = text.slice(0, firstIcomos).trim();
      rest = text.slice(firstIcomos).trim();
    } else if (/^This criterion is justified by the State Party/i.test(text)) {
      stateParty = text;
      rest = "";
    }
  }
  const conclusionMatches = [...rest.matchAll(/ICOMOS considers that (?:this criterion is (?:not )?demonstrated|the nominated property meets criteri(?:on|a)[^.]*)\./gi)];
  const conclusion = conclusionMatches.map((match) => match[0]).join(" ");
  let icomos = rest;
  conclusionMatches.forEach((match) => {
    icomos = icomos.replace(match[0], "");
  });
  return {
    stateParty: stateParty.trim(),
    icomos: icomos.replace(/\s+\./g, ".").trim(),
    conclusion: conclusion.trim(),
  };
}

function stripCriterionDefinition(text, criterion) {
  const source = String(text || "").trim();
  if (!source) return "";
  const pattern = new RegExp(`^Criterion\\s*\\(${criterion}\\)\\s*:\\s*[^;]+;\\s*`, "i");
  return source.replace(pattern, "").trim();
}

function recommendationCriterionStatement(property, entry, edit = {}) {
  if (!entry.accepted_by_icomos) return { source: "", translation: "" };
  if (property.id === "C1765" && jingdezhenRecommendationCriteria[entry.criterion]) {
    const seed = jingdezhenRecommendationCriteria[entry.criterion];
    return {
      source: (edit.recommendation_criteria_en || {})[entry.criterion] || seed.source,
      translation: (edit.recommendation_criteria || {})[entry.criterion] || seed.translation,
    };
  }
  return {
    source: (edit.recommendation_criteria_en || {})[entry.criterion] || "",
    translation: (edit.recommendation_criteria || {})[entry.criterion] || "",
  };
}

function criteriaOverallConclusion(property, criteria, edit = {}) {
  const explicitSource = edit.criteria_conclusion_en || edit.evaluation_conclusion_en || "";
  const explicitTranslation = edit.criteria_conclusion || edit.evaluation_conclusion || "";
  if (explicitSource || explicitTranslation) return { source: explicitSource, translation: explicitTranslation };
  if (property.id === "C1765") {
    return {
      source:
        "ICOMOS considers that the nominated property meets criteria (ii), (iii), (iv) and (vi), that the serial approach is justified and that the selection of component parts is adequate.",
      translation: "ICOMOS 认为，该项目符合标准 ii、iii、iv 和 vi，系列申报方式成立，组成部分选择适当。",
      note: "",
    };
  }
  const sourceText = criteria.map((entry) => criterionDisplayText(property, entry, edit).source).join(" ");
  const matches = [...sourceText.matchAll(/ICOMOS considers that the nominated property meets criteri(?:on|a)[^.]*\./gi)].map((match) => match[0]);
  const source = [...new Set(matches)].at(-1) || "";
  if (!source) return { source: "", translation: "" };
  return { source, translation: "待核对 ICOMOS 对价值标准的综合判断。", note: "" };
}

function renderComparativeNarrative(property, comparators, assessments) {
  const edit = narrativePayload(property.id, "comparative");
  const summaryEn = edit.summary_en ?? (property.id === "C1765" ? jingdezhenEvaluationSummaries.comparativeEn : "");
  const summary = edit.summary ?? (property.id === "C1765" ? jingdezhenEvaluationSummaries.comparative : "待抽取 ICOMOS 比较研究结论。");
  const rating = assessmentRatingFor(assessments, "comparative_analysis", "unknown");
  if (isEditingNarrative(property.id, "comparative")) {
    return `
      <div class="panel narrative-panel">
        ${renderNarrativeHeader("5. 比较研究", property.id, "comparative", true)}
        <form class="narrative-edit-form" data-property-id="${escapeAttr(property.id)}" data-section-key="comparative">
          <label>ICOMOS 评估分档
            ${ratingSelect("assessment_rating__comparative_analysis", rating)}
          </label>
          <label>原文摘录
            <textarea name="summary_en" rows="5">${escapeHtml(summaryEn)}</textarea>
          </label>
          <label>AI/人工整理信息
            <textarea name="summary" rows="4">${escapeHtml(summary)}</textarea>
          </label>
          ${renderComparatorGroupEditors(comparators, edit)}
          ${renderNarrativeEditActions()}
        </form>
      </div>
    `;
  }
  return `
      <div class="panel narrative-panel">
      ${renderNarrativeHeader("5. 比较研究", property.id, "comparative")}
      <p class="assessment-inline">ICOMOS 评估分档 ${ratingPill(rating)}</p>
      ${sourceTranslationBlock(summaryEn, summary, comparativeSectionSourceMeta(property))}
      ${renderComparatorGroups(comparators, edit)}
    </div>
  `;
}

function renderAttributesNarrative(property, attributes) {
  const edit = narrativePayload(property.id, "attributes");
  const rawSummaryEn = edit.summary_en ?? (property.id === "C1765" ? jingdezhenEvaluationSummaries.attributesEn : "");
  const summaryEn = attributesSummaryForDisplay(property, rawSummaryEn);
  const summary = attributesSummaryZhForDisplay(property, edit.summary ?? (property.id === "C1765" ? jingdezhenEvaluationSummaries.attributes : "待抽取 ICOMOS Attributes 综述段落。"));
  const mentions = attributeMentionsFor(property, edit);
  const manualMentionsText = attributeMentionsText(mentions);
  const attributeItems = attributeItemsForDisplay(property, attributes, edit, summaryEn, summary);
  if (isEditingNarrative(property.id, "attributes")) {
    return `
      <div class="panel narrative-panel">
        ${renderNarrativeHeader("3. Attributes 认定", property.id, "attributes", true)}
        <form class="narrative-edit-form" data-property-id="${escapeAttr(property.id)}" data-section-key="attributes">
          <h3>ICOMOS 综述</h3>
          <label>原文摘录
            <textarea name="summary_en" rows="6">${escapeHtml(summaryEn)}</textarea>
          </label>
          <label>AI/人工整理信息
            <textarea name="summary" rows="5">${escapeHtml(summary)}</textarea>
          </label>
          <h3>整理出的 Attributes 要点</h3>
          ${renderAttributeItemEditors(attributeItems)}
          <label>人工整理记录
            <textarea name="attribute_mentions_text" rows="8" placeholder="可按章节分段记录，例如：Integrity：……">${escapeHtml(manualMentionsText)}</textarea>
          </label>
          ${renderNarrativeEditActions()}
        </form>
      </div>
    `;
  }
  return `
    <div class="panel narrative-panel">
      ${renderNarrativeHeader("3. Attributes 认定", property.id, "attributes")}
      <h3>ICOMOS 综述</h3>
      ${sourceTranslationBlock(summaryEn, summary, attributesSectionSourceMeta(property))}
      <h3>整理出的 Attributes 要点</h3>
      ${renderAttributeItemsList(attributeItems)}
      <h3>其他章节提及的 Attributes（人工整理）</h3>
      <div class="attribute-mentions">
        ${manualMentionsText ? renderParagraphTextBlock("人工整理", manualMentionsText, "translation-text") : `<div class="empty compact-empty">待从真实性、完整性、保护状况等章节继续摘取。</div>`}
      </div>
    </div>
  `;
}

function renderAttributeItemEditors(items = []) {
  const rows = items.length ? items : [{ original: "", translation: "" }];
  return `
    <div class="attribute-items-edit">
      <div class="attribute-item-rows">
        ${rows.map((item, index) => renderAttributeItemEditorRow(item, index)).join("")}
      </div>
      <button class="button secondary add-attribute-item" type="button" data-add-attribute-item>添加一项 Attributes 要点</button>
    </div>
  `;
}

function renderAttributeItemEditorRow(item = {}, index = 0) {
  return `
    <div class="attribute-item-edit">
      <label>英文/原文要点
        <textarea name="attribute_item_original__${index}" rows="2" placeholder="例如：industrial spatial layout">${escapeHtml(item.original || "")}</textarea>
      </label>
      <label>AI 中文整理
        <textarea name="attribute_item_translation__${index}" rows="2" placeholder="例如：工业空间格局">${escapeHtml(item.translation || "")}</textarea>
      </label>
    </div>
  `;
}

function renderAttributeItemsList(items) {
  if (!items.length) return `<div class="empty compact-empty">待从 ICOMOS 综述段落自动整理。</div>`;
  return `
    <ul class="item-list attribute-item-list">
      ${items.map((item) => `
        <li>
          <strong>${escapeHtml(item.original || "未命名属性")}</strong>
          ${item.translation ? `<br><span class="muted">${escapeHtml(item.translation)}</span>` : ""}
        </li>
      `).join("")}
    </ul>
  `;
}

function attributeMentionsText(mentions = []) {
  return mentions
    .map((mention) => {
      const parts = [];
      if (mention.section) parts.push(`${mention.section}`);
      if (mention.source_en) parts.push(mention.source_en);
      if (mention.summary) parts.push(mention.summary);
      return parts.join("\n").trim();
    })
    .filter(Boolean)
    .join("\n\n");
}

function attributeItemsForDisplay(property, attributes, edit = {}, summaryEn = "", summary = "") {
  const editedItems = Object.values(edit.attributes || {})
    .map((item) => ({ original: item.group || "", translation: item.name || "" }))
    .filter((item) => item.original || item.translation);
  if (editedItems.length && !editedItems.every(isGenericAttributeItem)) return editedItems;

  const extracted = extractAttributeItemsFromSummary(summaryEn, summary);
  if (extracted.length) return extracted;

  const tableItems = attributes
    .map((entry) => ({
      original: entry.attribute_group || entry.attribute_name_en || "",
      translation: entry.attribute_name_zh || entry.summary_zh || "",
    }))
    .filter((item) => (item.original || item.translation) && !isGenericAttributeItem(item));
  if (tableItems.length) return tableItems;

  return editedItems.length ? editedItems : tableItems;
}

function extractAttributeItemsFromSummary(summaryEn, summaryZh) {
  const englishItems = splitAttributeList(summaryEn, /(?:key )?attributes of the proposed Outstanding Universal Value (?:can be grouped as follows|are)\s*:\s*/i);
  const chineseItems = splitAttributeList(summaryZh, /(?:属性包括|主要属性包括)\s*[:：]\s*/i);
  const length = Math.max(englishItems.length, chineseItems.length);
  return Array.from({ length }, (_, index) => ({
    original: englishItems[index] || "",
    translation: chineseItems[index] || "",
  })).filter((item) => item.original || item.translation);
}

function splitAttributeList(text, introPattern) {
  const cleaned = cleanImportedText(text || "");
  const match = cleaned.match(introPattern);
  if (!match) return [];
  const listText = cleaned.slice((match.index || 0) + match[0].length).replace(/\.$/, "");
  return listText
    .split(/\s*;\s*(?:and\s+)?|；|；以及|；并|；和/)
    .map((item) => item.replace(/^(and\s+|以及|和)/i, "").replace(/[。.]$/, "").trim())
    .filter(Boolean);
}

function isGenericAttributeItem(item) {
  const original = String(item.original || "").trim().toLowerCase();
  return ["central_statement", "integrity_related", "authenticity_related"].includes(original);
}

function attributeMentionsFor(property, edit = {}) {
  return (Array.isArray(edit.mentions) ? edit.mentions : [])
    .filter((mention) => mention?.manual === true)
    .filter((mention) => mention?.section || mention?.source_en || mention?.summary);
}

function attributesSummaryForDisplay(property, sourceText) {
  const text = cleanImportedText(sourceText || "");
  const serialSelectionStarts = [
    /\s*ICOMOS considers that the State Party developed[\s\S]*$/i,
    /\s*ICOMOS considers that the serial approach[\s\S]*$/i,
    /\s*ICOMOS considers that the nominated serial property meets criteri(?:on|a)[\s\S]*$/i,
    /\s*In this case, ICOMOS considers that the serial approach[\s\S]*$/i,
  ];
  const categoryDiscussionStarts = [
    /\s*In the additional information of October 2025,[\s\S]*$/i,
    /\s*ICOMOS considers that the definition of a cultural landscape,[\s\S]*$/i,
  ];
  return [...serialSelectionStarts, ...categoryDiscussionStarts].reduce((next, pattern) => next.replace(pattern, ""), text).trim();
}

function attributesSummaryZhForDisplay(property, sourceText) {
  const text = cleanImportedText(sourceText || "");
  if (
    property.id === "C1765" &&
    /集中列明支撑OUV|本条保留原文|后续可在页面中继续细分属性组|待抽取 ICOMOS Attributes/.test(text)
  ) {
    return jingdezhenEvaluationSummaries.attributes;
  }
  return text;
}

function renderSerialSelectionNarrative(property, assessments) {
  const edit = narrativePayload(property.id, "serial");
  const assessment = assessmentFor(property.id, "serial_selection");
  const source = (edit.entries_en || {}).serial_selection ?? assessment?.conclusion_en ?? "";
  const summary = (edit.entries || {}).serial_selection ?? assessment?.conclusion_zh ?? "";
  const editedRating = normalizeRatingValue((edit.assessment_ratings || {}).serial_selection || "");
  let rating =
    editedRating !== "unknown"
      ? editedRating
      : assessmentRatingFor(assessments, "serial_selection", property.is_serial ? "unknown" : "not_applicable");
  if (!property.is_serial && (rating === "check" || rating === "unknown")) rating = "not_applicable";
  if (isEditingNarrative(property.id, "serial")) {
    return `
      <div class="panel narrative-panel">
        ${renderNarrativeHeader("4. 系列遗产筛选", property.id, "serial", true)}
        <form class="narrative-edit-form" data-property-id="${escapeAttr(property.id)}" data-section-key="serial">
          <div class="assessment-edit-block">
            <h3>${escapeHtml(labelForItem("serial_selection"))}</h3>
            <label>ICOMOS 评估分档
              ${ratingSelect("assessment_rating__serial_selection", rating)}
            </label>
            <label>原文摘录
              <textarea name="serial_en__serial_selection" rows="4">${escapeHtml(source || (property.is_serial ? "" : "Not a serial nomination."))}</textarea>
            </label>
            <label>AI/人工整理信息
              <textarea name="serial__serial_selection" rows="4">${escapeHtml(summary || (property.is_serial ? "" : "非系列遗产，不适用系列遗产组成部分筛选。"))}</textarea>
            </label>
          </div>
          ${renderNarrativeEditActions()}
        </form>
      </div>
    `;
  }
  return `
    <div class="panel narrative-panel">
      ${renderNarrativeHeader("4. 系列遗产筛选", property.id, "serial")}
      <ul class="item-list">
        <li><strong>${escapeHtml(labelForItem("serial_selection"))}</strong> ${ratingPill(rating)}
          ${sourceTranslationBlock(source || (property.is_serial ? "" : "Not a serial nomination."), summary || (property.is_serial ? "待抽取 ICOMOS 对系列遗产组成部分筛选的判断。" : "非系列遗产，不适用系列遗产组成部分筛选。"), property.is_serial ? sourceMetaFor(property, "serial_selection") : null)}
        </li>
      </ul>
    </div>
  `;
}

function renderComparatorGroupEditors(comparators, edit = {}) {
  const groups = comparatorGroupTextsFromEntries(comparators, edit);
  return `
    <div class="comparator-edit-grid">
      ${comparatorGroupDefinitions
        .map(
          ({ key, label }) => `
            <label><span>${escapeHtml(label)}</span>
              <textarea name="comparator_group__${escapeAttr(key)}" rows="9" placeholder="名称 · 国家 · 价值标准或状态&#10;补充说明">${escapeHtml(groups[key] || "")}</textarea>
            </label>
          `
        )
        .join("")}
    </div>
  `;
}

function renderComparatorGroups(comparators, edit = {}) {
  const groups = comparatorGroupTextsFromEntries(comparators, edit);
  const hasAnyGroup = comparatorGroupDefinitions.some(({ key }) => String(groups[key] || "").trim());
  if (!hasAnyGroup) return `<div class="empty">待录入比较对象。</div>`;
  return `
    <div class="comparator-text-grid">
      ${comparatorGroupDefinitions
        .map(({ key, label }) => {
          const text = String(groups[key] || "").trim();
          return `
            <section class="comparator-group">
              <h3>${escapeHtml(label)}</h3>
              ${
                text
                  ? `<div class="comparator-text">${displayComparatorParagraphs(text)
                      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
                      .join("")}</div>`
                  : `<div class="empty compact-empty">待补充。</div>`
              }
            </section>
          `;
        })
        .join("")}
    </div>
  `;
}

function comparatorGroupTextsFromEntries(comparators, edit = {}) {
  const existingGroups = edit.comparator_groups || {};
  const groups = Object.fromEntries(comparatorGroupDefinitions.map(({ key }) => [key, ""]));
  comparatorGroupDefinitions.forEach(({ key }) => {
    if (Object.prototype.hasOwnProperty.call(existingGroups, key)) {
      groups[key] = String(existingGroups[key] || "");
    }
  });
  const derived = Object.fromEntries(comparatorGroupDefinitions.map(({ key }) => [key, []]));
  comparators.forEach((entry, index) => {
    const key = comparatorGroupKey(entry.heritage_status);
    const paragraph = comparatorParagraph(entry, (edit.comparators || {})[index]);
    if (paragraph) derived[key].push(paragraph);
  });
  comparatorGroupDefinitions.forEach(({ key }) => {
    if (!String(groups[key] || "").trim()) groups[key] = derived[key].join("\n\n");
  });
  return groups;
}

function comparatorGroupKey(status) {
  const normalized = String(status || "").trim();
  if (normalized === "World Heritage") return "world_heritage";
  if (normalized === "Tentative List") return "tentative_list";
  return "not_listed";
}

function comparatorParagraph(entry, editedSummary = "") {
  const heading = [entry.comparator_name, entry.country_or_region, entry.status_detail]
    .map((part) => String(part || "").trim())
    .filter(Boolean)
    .join(" · ");
  const summary = String(editedSummary || entry.icomos_comment_summary_zh || entry.comparison_theme || "").trim();
  return [heading, summary].filter(Boolean).join("\n");
}

function displayComparatorParagraphs(text) {
  return String(text || "")
    .replace(/\r\n?/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/[ \t]*\n[ \t]*/g, "；").replace(/[ \t]{2,}/g, " ").trim())
    .filter(Boolean);
}

function renderCoreAssessmentNarrative(property, assessments) {
  const edit = narrativePayload(property.id, "core");
  const rows =
    property.id === "C1765"
      ? jingdezhenEvaluationSummaries.core
      : ["integrity", "authenticity", "integrity_authenticity_conclusion", "boundaries"].map((key) => ({
          key,
          title: coreAssessmentTitle(key),
          summary: "待抽取 ICOMOS 相应段落的结论。",
        }));
  if (isEditingNarrative(property.id, "core")) {
    return `
      <div class="panel narrative-panel">
        ${renderNarrativeHeader("6. 完整性、真实性与边界", property.id, "core", true)}
        <form class="narrative-edit-form" data-property-id="${escapeAttr(property.id)}" data-section-key="core">
          ${rows
            .map((entry) => `
              <div class="assessment-edit-block">
                <h3>${escapeHtml(entry.title)}</h3>
                ${
                  hasAssessmentRating(entry.key)
                    ? `<label>ICOMOS 评估分档
                        ${ratingSelect(`assessment_rating__${entry.key}`, assessmentRatingFor(assessments, entry.key, entry.rating || "unknown"))}
                      </label>`
                    : ""
                }
                <label>原文摘录
                  <textarea name="core_en__${escapeAttr(entry.key)}" rows="4">${escapeHtml(coreEntrySource(property, entry, edit))}</textarea>
                </label>
                <label>AI/人工整理信息
                  <textarea name="core__${escapeAttr(entry.key)}" rows="4">${escapeHtml(coreEntrySummary(property, entry, edit))}</textarea>
                </label>
              </div>
            `)
            .join("")}
          ${renderNarrativeEditActions()}
        </form>
      </div>
    `;
  }
  return `
    <div class="panel narrative-panel core-source-panel">
      ${renderNarrativeHeader("6. 完整性、真实性与边界", property.id, "core")}
      <div class="section-note-with-source">
        ${renderSourceLocator(integrityAuthenticitySectionSourceMeta(property))}
      </div>
      <ul class="item-list core-assessment-list">
        ${rows.map((entry) => `<li><strong>${escapeHtml(entry.title)}</strong> ${hasAssessmentRating(entry.key) ? ratingPill(assessmentRatingFor(assessments, entry.key, entry.rating || "unknown")) : ""}${sourceTranslationBlock(coreEntrySource(property, entry, edit), coreEntrySummary(property, entry, edit), null)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function coreEntrySource(property, entry, edit) {
  if (property.id === "C1765" && ["integrity", "authenticity", "integrity_authenticity_conclusion", "boundaries"].includes(entry.key)) {
    return entry.source_en || "";
  }
  return (edit.entries_en || {})[entry.key] ?? entry.source_en ?? "";
}

function coreEntrySummary(property, entry, edit) {
  if (property.id === "C1765" && ["integrity", "authenticity", "integrity_authenticity_conclusion", "boundaries"].includes(entry.key)) {
    return entry.summary || "";
  }
  return (edit.entries || {})[entry.key] ?? entry.summary ?? "";
}

function coreAssessmentTitle(key) {
  return {
    integrity: "完整性评估结论",
    authenticity: "真实性评估结论",
    integrity_authenticity_conclusion: "完整性真实性综合结论",
    boundaries: "边界评估结论",
  }[key] || labelForItem(key);
}

function hasAssessmentRating(key) {
  return assessmentItems.some((item) => item.item_key === key);
}

function renderProtectionManagementNarrative(property, assessments) {
  const edit = narrativePayload(property.id, "protection");
  const rows =
    property.id === "C1765"
      ? jingdezhenEvaluationSummaries.protectionManagement
      : assessments.filter((entry) => pmItemKeys.includes(entry.item_key)).map((entry) => ({
          key: entry.item_key,
          title: labelForItem(entry.item_key),
          summary: entry.rationale_zh || entry.conclusion_zh || "待抽取 ICOMOS 保护管理相关结论。",
        }));
  if (isEditingNarrative(property.id, "protection")) {
    return `
      <div class="panel narrative-panel">
        ${renderNarrativeHeader("7. 保护管理评估", property.id, "protection", true)}
        <form class="narrative-edit-form" data-property-id="${escapeAttr(property.id)}" data-section-key="protection">
          ${rows
            .map((entry) => `
              <div class="assessment-edit-block">
                <h3>${escapeHtml(protectionAssessmentTitle(entry.key, entry.title))}</h3>
                <label>ICOMOS 评估分档
                  ${ratingSelect(`assessment_rating__${entry.key}`, assessmentRatingFor(assessments, entry.key, entry.rating || "unknown"))}
                </label>
                <label>原文摘录
                  <textarea name="protection_en__${escapeAttr(entry.key)}" rows="4">${escapeHtml(protectionEntrySource(property, entry, edit))}</textarea>
                </label>
                <label>AI/人工整理信息
                  <textarea name="protection__${escapeAttr(entry.key)}" rows="4">${escapeHtml(protectionEntrySummary(property, entry, edit))}</textarea>
                </label>
              </div>
            `)
            .join("")}
          ${renderNarrativeEditActions()}
        </form>
      </div>
    `;
  }
  return `
    <div class="panel narrative-panel protection-source-panel">
      ${renderNarrativeHeader("7. 保护管理评估", property.id, "protection")}
      <ul class="item-list">
        ${rows.map((entry) => `<li><strong>${escapeHtml(protectionAssessmentTitle(entry.key, entry.title))}</strong> ${ratingPill(assessmentRatingFor(assessments, entry.key, entry.rating || "unknown"))}${sourceTranslationBlock(protectionEntrySource(property, entry, edit), protectionEntrySummary(property, entry, edit), protectionEntrySourceMeta(property, entry.key))}</li>`).join("") || `<li>待录入保护管理评估摘要。</li>`}
      </ul>
    </div>
  `;
}

function protectionEntrySource(property, entry, edit) {
  if (property.id === "C1765") return entry.source_en || "";
  const editedSources = edit.entries_en || {};
  if (Object.prototype.hasOwnProperty.call(editedSources, entry.key)) {
    return cleanImportedText(editedSources[entry.key] || "");
  }
  return compactProtectionConclusion(entry.source_en || "", entry.key);
}

function protectionEntrySummary(property, entry, edit) {
  if (property.id === "C1765") return entry.summary || "";
  const editedSummaries = edit.entries || {};
  if (Object.prototype.hasOwnProperty.call(editedSummaries, entry.key)) {
    return cleanImportedText(editedSummaries[entry.key] || "");
  }
  return entry.summary || "";
}

function protectionEntrySourceMeta(property, itemKey) {
  if (itemKey === "conservation") return conservationMonitoringSectionSourceMeta(property);
  if (itemKey === "management") return protectionManagementSectionSourceMeta(property);
  return null;
}

function compactProtectionConclusion(text, itemKey) {
  const source = cleanImportedText(text || "");
  if (!source) return "";
  if (!needsProtectionCompaction(source)) return source;
  const sentences = splitEnglishSentences(source)
    .filter((sentence) => /\bICOMOS\s+(considers|notes|recommends|appreciates|observes|encourages)\b/i.test(sentence))
    .filter((sentence) => protectionSentenceMatchesItem(sentence, itemKey));
  const selected = (sentences.length ? sentences : splitEnglishSentences(source).filter((sentence) => /\bICOMOS\b/i.test(sentence))).slice(0, 4);
  const compact = selected.join(" ").trim();
  return compact.length > 900 ? "" : compact;
}

function needsProtectionCompaction(text) {
  const source = String(text || "");
  return (
    source.length > 900 ||
    /^State of conservation\s*(?:\n|$)/i.test(source) ||
    /^The State Party\b/i.test(source) ||
    /\n\n[A-Z][A-Za-z ]{4,}\n/.test(source) ||
    source.includes("The State Party has provided an evaluation of the state of conservation")
  );
}

function splitEnglishSentences(text) {
  return String(text || "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]*\n[ \t]*/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .match(/[^.!?]+[.!?]+(?:\s|$)/g)?.map((sentence) => sentence.trim()) || [];
}

function protectionSentenceMatchesItem(sentence, itemKey) {
  const text = String(sentence || "");
  const patterns = {
    protection_property: /legal protection|protected|protection/i,
    protection_buffer_zone: /buffer zone|buffer zones|added layer|spatial planning/i,
    conservation: /state of conservation|documentation|conservation|monitoring/i,
    management: /management|governance|visitor|interpretation|community/i,
    threats_addressed: /factor|pressure|risk|threat|disaster|preparedness|impact/i,
  }[itemKey];
  return patterns ? patterns.test(text) : true;
}

function protectionAssessmentTitle(key, fallback) {
  return {
    protection_property: "Protection of property",
    protection_buffer_zone: "Protection of buffer zone",
    conservation: "Conservation Measures",
    management: "Protection and management",
    threats_addressed: "Threats addressed",
  }[key] || fallback || labelForItem(key);
}

function renderRecommendationsNarrative(property, recommendations) {
  const edit = narrativePayload(property.id, "recommendations");
  const { baseRows, customIcomosItems, rows, committeeItems } = recommendationDisplaySets(recommendations, edit);
  if (isEditingNarrative(property.id, "recommendations")) {
    const editableCustomIcomosRows = customIcomosItems.length ? customIcomosItems : baseRows.length ? [] : [{ is_manual: true, key: "", source_en: "", summary: "" }];
    return `
      <div class="panel narrative-panel">
        ${renderNarrativeHeader("8. Recommendations", property.id, "recommendations", true)}
        <form class="narrative-edit-form" data-property-id="${escapeAttr(property.id)}" data-section-key="recommendations">
          <div class="recommendation-edit-section">
            <h3>ICOMOS 建议</h3>
            <p class="muted">对应 ICOMOS 评估报告中的建议条目，可修订原文摘录和中文翻译。</p>
            ${baseRows
              .map((entry) => {
                const key = entry.recommendation_code || entry.recommendation_category || "";
                const item = (edit.entries || {})[key] || {};
                return `
                  <div class="recommendation-edit-grid">
                    <label>原文摘录
                      <textarea name="recommendation_en__${escapeAttr(key)}" rows="3">${escapeHtml(item.source_en ?? entry.text_en ?? "")}</textarea>
                    </label>
                    <label>中文翻译
                      <textarea name="recommendation_summary__${escapeAttr(key)}" rows="3">${escapeHtml(item.summary ?? entry.summary_zh ?? entry.text_en ?? "")}</textarea>
                    </label>
                  </div>
                `;
              })
              .join("")}
            <div class="icomos-recommendation-editor">
              ${editableCustomIcomosRows.map((entry, index) => renderIcomosRecommendationEditorItem(entry, index, edit)).join("")}
            </div>
            <button class="button secondary" type="button" data-add-icomos-recommendation>添加一条 ICOMOS 建议</button>
          </div>
          <div class="recommendation-edit-section">
            <h3>大会决议建议/要求</h3>
            <p class="muted">不需要与 ICOMOS 建议逐条对应；按大会决议最终文本逐条录入。</p>
            <div class="committee-recommendation-editor">
              ${(committeeItems.length ? committeeItems : [{ heading: "", summary: "" }])
                .map((item, index) => renderCommitteeRecommendationEditorItem(item, index))
                .join("")}
            </div>
            <button class="button secondary" type="button" data-add-committee-recommendation>添加一条</button>
          </div>
          ${renderNarrativeEditActions()}
        </form>
      </div>
    `;
  }
  return `
    <div class="panel narrative-panel">
      ${renderNarrativeHeader("8. Recommendations", property.id, "recommendations")}
      <div class="recommendation-columns">
        <div>
          <h3>ICOMOS 建议 ${renderSourceLocator(recommendationsSectionSourceMeta(property))}</h3>
          <ul class="item-list">
            ${rows
              .map((entry, index) => renderRecommendationDisplayItem(entry, index, edit))
              .join("") || `<li>待录入建议。</li>`}
          </ul>
        </div>
        <div>
          <h3>大会决议建议/要求</h3>
          ${
            committeeItems.length
              ? `<ul class="item-list">${committeeItems
                  .map((item) => `<li><strong>${escapeHtml(item.heading || "未命名条目")}</strong><br>${escapeHtml(item.summary || "")}</li>`)
                  .join("")}</ul>`
              : `<div class="empty compact-empty">待大会决议发布后逐条录入。</div>`
          }
        </div>
      </div>
          </div>
  `;
}

function renderRecommendationDisplayItem(entry, index, edit) {
  const key = entry.recommendation_code || entry.recommendation_category || "";
  const item = entry.is_manual ? entry : (edit.entries || {})[key] || {};
  const source = cleanRecommendationText(item.source_en ?? entry.text_en ?? "");
  const summary = cleanRecommendationText(item.summary ?? entry.summary_zh ?? "");
  const label = recommendationLetter(index);
  return `
    <li class="recommendation-display-item">
      <strong>${escapeHtml(label)}</strong>
      <div>
        ${source ? displayParagraphs(stripRecommendationPrefix(source)).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("") : ""}
        ${summary ? displayParagraphs(stripRecommendationPrefix(summary)).map((paragraph) => `<p class="muted">${escapeHtml(paragraph)}</p>`).join("") : ""}
      </div>
    </li>
  `;
}

function renderIcomosRecommendationEditorItem(entry, index, edit) {
  const key = entry.is_manual ? "" : entry.recommendation_code || entry.recommendation_category || "";
  const item = entry.is_manual ? entry : (edit.entries || {})[key] || {};
  return `
    <div class="recommendation-edit-grid" data-icomos-recommendation-item>
      <label>原文摘录
        <textarea name="icomos_recommendation_en__${index}" rows="3">${escapeHtml(item.source_en ?? entry.text_en ?? "")}</textarea>
      </label>
      <label>中文翻译
        <textarea name="icomos_recommendation_summary__${index}" rows="3">${escapeHtml(item.summary ?? entry.summary_zh ?? "")}</textarea>
      </label>
      <button class="button secondary" type="button" data-remove-icomos-recommendation>删除</button>
    </div>
  `;
}

function recommendationLetter(index) {
  return `${String.fromCharCode(97 + index)})`;
}

function stripRecommendationPrefix(text) {
  return String(text || "").trim().replace(/^[a-z]\)\s*/i, "").trim();
}

function cleanRecommendationText(text) {
  return String(text || "")
    .replace(/ICOMOS正式建议条目，需在项目页面中按主题分类复核。?/g, "")
    .replace(/\s+\d+\s*$/g, "")
    .trim();
}

function recommendationDisplaySets(recommendations, edit) {
  const finalRecommendations = recommendations.filter((entry) => entry.included_in_final_recommendations !== false);
  const baseRows = finalRecommendations.length ? finalRecommendations : recommendations;
  const explicitIcomosItems = icomosRecommendationItems(edit);
  const rawCommitteeItems = committeeRecommendationItems(edit);
  const movedCommitteeItems = shouldMoveCommitteeItemsToIcomos(baseRows, explicitIcomosItems, rawCommitteeItems)
    ? rawCommitteeItems.map(committeeItemToIcomosRecommendation)
    : [];
  return {
    baseRows,
    customIcomosItems: [...explicitIcomosItems, ...movedCommitteeItems],
    rows: [...baseRows, ...explicitIcomosItems, ...movedCommitteeItems],
    committeeItems: movedCommitteeItems.length ? [] : rawCommitteeItems,
  };
}

function shouldMoveCommitteeItemsToIcomos(baseRows, icomosItems, committeeItems) {
  if (baseRows.length || icomosItems.length || !committeeItems.length) return false;
  return committeeItems.some((item) => looksLikeIcomosRecommendationItem(item));
}

function looksLikeIcomosRecommendationItem(item) {
  const text = `${item.heading || ""} ${item.summary || ""}`.trim();
  if (!text) return false;
  if (/^[a-z]\)\s+/i.test(text)) return true;
  return /heritage protection|buffer zone|conservation strategy|interpretation strategy|monitoring|visitor|stakeholder|attributes|landscape|management/i.test(text);
}

function committeeItemToIcomosRecommendation(item, index) {
  return {
    is_manual: true,
    key: recommendationLetter(index),
    recommendation_code: `moved-committee-${index + 1}`,
    recommendation_category: recommendationLetter(index),
    source_en: [item.heading, item.summary].filter(Boolean).join("\n\n"),
    summary: "",
    note: "",
    text_en: [item.heading, item.summary].filter(Boolean).join("\n\n"),
    summary_zh: "",
  };
}

function renderCommitteeRecommendationEditorItem(item, index) {
  return `
    <div class="committee-recommendation-item" data-committee-recommendation-item>
      <div class="edit-pair">
        <label>条目标题
          <input name="committee_item_heading__${index}" value="${escapeAttr(item.heading || "")}" placeholder="例如：风险准备计划">
        </label>
        <label>条目内容
          <textarea name="committee_item_summary__${index}" rows="3">${escapeHtml(item.summary || "")}</textarea>
        </label>
      </div>
      <button class="button secondary" type="button" data-remove-committee-recommendation>删除</button>
    </div>
  `;
}

function attachIcomosRecommendationRemoveButtons(scope) {
  scope.querySelectorAll("[data-remove-icomos-recommendation]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const editor = button.closest(".icomos-recommendation-editor");
      button.closest("[data-icomos-recommendation-item]")?.remove();
      if (editor && !editor.querySelector("[data-icomos-recommendation-item]")) {
        editor.insertAdjacentHTML("beforeend", renderIcomosRecommendationEditorItem({ is_manual: true, key: "", source_en: "", summary: "" }, 0, { entries: {} }));
        attachIcomosRecommendationRemoveButtons(editor);
      }
      renumberIcomosRecommendationItems(editor);
    });
  });
}

function renumberIcomosRecommendationItems(editor) {
  if (!editor) return;
  editor.querySelectorAll("[data-icomos-recommendation-item]").forEach((item, index) => {
    const source = item.querySelector('textarea[name^="icomos_recommendation_en__"]');
    const summary = item.querySelector('textarea[name^="icomos_recommendation_summary__"]');
    if (source) source.name = `icomos_recommendation_en__${index}`;
    if (summary) summary.name = `icomos_recommendation_summary__${index}`;
  });
}

function committeeRecommendationItems(edit) {
  if (Array.isArray(edit.committee_items)) return edit.committee_items.filter((item) => item.heading || item.summary);
  return Object.values(edit.entries || {})
    .map((entry) => ({ heading: entry.committee_heading || "", summary: entry.committee_summary || "" }))
    .filter((item) => item.heading || item.summary);
}

function icomosRecommendationItems(edit) {
  if (!Array.isArray(edit.icomos_items)) return [];
  return edit.icomos_items
    .filter((item) => item?.key || item?.source_en || item?.summary)
    .map((item, index) => ({
      ...item,
      is_manual: true,
      recommendation_code: item.key || `manual-${index + 1}`,
      recommendation_category: item.key || "ICOMOS 建议",
      text_en: item.source_en || "",
      summary_zh: item.summary || "",
    }));
}

function attachCommitteeRecommendationRemoveButtons(scope) {
  scope.querySelectorAll("[data-remove-committee-recommendation]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const editor = button.closest(".committee-recommendation-editor");
      button.closest("[data-committee-recommendation-item]")?.remove();
      if (editor && !editor.querySelector("[data-committee-recommendation-item]")) {
        editor.insertAdjacentHTML("beforeend", renderCommitteeRecommendationEditorItem({ heading: "", summary: "" }, 0));
        attachCommitteeRecommendationRemoveButtons(editor);
      }
      renumberCommitteeRecommendationItems(editor);
    });
  });
}

function renumberCommitteeRecommendationItems(editor) {
  if (!editor) return;
  editor.querySelectorAll("[data-committee-recommendation-item]").forEach((item, index) => {
    const heading = item.querySelector('input[name^="committee_item_heading__"]');
    const summary = item.querySelector('textarea[name^="committee_item_summary__"]');
    if (heading) heading.name = `committee_item_heading__${index}`;
    if (summary) summary.name = `committee_item_summary__${index}`;
  });
}

function attachResearchNoteEditorListeners(scope) {
  scope.querySelectorAll("[data-research-note-card]").forEach((card) => {
    const editor = card.querySelector("[data-research-note-editor]");
    const status = card.querySelector("[data-research-note-status]");
    if (!editor) return;
    let savedSelection = null;
    const rememberSelection = () => {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      if (editor.contains(range.commonAncestorContainer)) {
        savedSelection = range.cloneRange();
      }
    };
    const restoreSelection = () => {
      editor.focus();
      if (!savedSelection) return;
      const selection = window.getSelection();
      if (!selection) return;
      selection.removeAllRanges();
      selection.addRange(savedSelection);
    };
    card.querySelectorAll("[data-note-command]").forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("mousedown", rememberSelection);
      button.addEventListener("click", () => {
        restoreSelection();
        document.execCommand(button.dataset.noteCommand, false, button.dataset.noteValue || null);
        if (status) status.textContent = "有未保存更改";
      });
    });
    const sizeSelect = card.querySelector("[data-note-size]");
    if (sizeSelect && sizeSelect.dataset.bound !== "true") {
      sizeSelect.dataset.bound = "true";
      sizeSelect.addEventListener("mousedown", rememberSelection);
      sizeSelect.addEventListener("change", () => {
        if (!sizeSelect.value) return;
        restoreSelection();
        document.execCommand("fontSize", false, sizeSelect.value);
        normalizeNoteFontTags(editor);
        sizeSelect.value = "";
        if (status) status.textContent = "有未保存更改";
      });
    }
    const colorInput = card.querySelector("[data-note-color]");
    if (colorInput && colorInput.dataset.bound !== "true") {
      colorInput.dataset.bound = "true";
      colorInput.addEventListener("mousedown", rememberSelection);
      colorInput.addEventListener("input", () => {
        restoreSelection();
        document.execCommand("foreColor", false, colorInput.value || "#0f6b5e");
        if (status) status.textContent = "有未保存更改";
      });
      colorInput.addEventListener("change", () => {
        restoreSelection();
        document.execCommand("foreColor", false, colorInput.value || "#0f6b5e");
        if (status) status.textContent = "有未保存更改";
      });
    }
    if (editor.dataset.bound !== "true") {
      editor.dataset.bound = "true";
      editor.addEventListener("keyup", rememberSelection);
      editor.addEventListener("mouseup", rememberSelection);
      editor.addEventListener("input", () => {
        rememberSelection();
        if (status) status.textContent = "有未保存更改";
      });
    }
    const saveButton = card.querySelector("[data-save-research-note]");
    if (saveButton && saveButton.dataset.bound !== "true") {
      saveButton.dataset.bound = "true";
      saveButton.addEventListener("click", () => persistResearchNote(card));
    }
  });
}

async function persistResearchNote(card) {
  const propertyId = card.dataset.propertyId;
  const editor = card.querySelector("[data-research-note-editor]");
  const status = card.querySelector("[data-research-note-status]");
  if (!propertyId || !editor) return;
  if (status) status.textContent = "保存中...";
  persistPrivateNarrativeEdit(propertyId, "research_notes", {
    note: editor.innerText.trim(),
    note_html: sanitizeNoteHtml(editor.innerHTML),
  });
}

function assessmentRatingFor(assessments, itemKey, fallback = "unknown") {
  const assessment = assessments.find((entry) => entry.item_key === itemKey);
  const rating = assessment?.human_calibrated_rating || assessment?.ai_inferred_rating;
  return rating && rating !== "unknown" ? rating : fallback;
}

function renderNarrativeHeader(title, propertyId, sectionKey, editing = false) {
  const edit = narrativePayload(propertyId, sectionKey);
  return `
    <div class="panel-title-row">
      <div>
        <h2>${escapeHtml(title)}</h2>
        ${renderLastEditedMeta(edit)}
      </div>
      ${
        editing
          ? `<button class="button secondary" type="button" data-cancel-narrative="${escapeAttr(`${propertyId}:${sectionKey}`)}">取消</button>`
          : `<button class="button secondary" type="button" data-edit-narrative="${escapeAttr(`${propertyId}:${sectionKey}`)}">修订</button>`
      }
    </div>
  `;
}

function renderLastEditedMeta(payload = {}) {
  if (!payload?.updated_at && !payload?.updated_by) return "";
  const pieces = [];
  if (payload.updated_by) pieces.push(payload.updated_by);
  if (payload.updated_at) pieces.push(formatDateTime(payload.updated_at));
  return `<p class="edit-meta">最后修改：${escapeHtml(pieces.join(" · "))}</p>`;
}

function renderNarrativeEditActions() {
  return `
    <div class="button-row narrative-actions">
      <button class="button primary" type="submit">保存修订</button>
    </div>
  `;
}

function sourceTranslationBlock(sourceEn, zhText, meta = null, noteText = "", options = {}) {
  const source = String(sourceEn || "").trim();
  const translation = String(zhText || "").trim();
  const locator = source && meta && !options.hideLocator ? renderSourceLocator(meta) : "";
  const pairTranslation = options.pairTranslation === true;
  return `
    <div class="source-translation">
      ${locator}
      ${source ? (pairTranslation ? renderSourceWithTranslationBlock(source, translation, options) : renderParagraphTextBlock("原文摘录", source, "source-text", options)) : ""}
      ${translation && !pairTranslation ? renderParagraphTextBlock("AI/人工整理信息", translation, "translation-text", options) : ""}
      ${!source && translation && pairTranslation ? renderParagraphTextBlock("AI/人工整理信息", translation, "translation-text", options) : ""}
    </div>
  `;
}

function renderSourceWithTranslationBlock(source, translation, options = {}) {
  const sourceParagraphs = displayParagraphs(source, options);
  const translationParagraphs = displayParagraphs(translation, options);
  const canPairParagraphs = translationParagraphs.length && (translationParagraphs.length === sourceParagraphs.length || sourceParagraphs.length === 1);
  const sourceHtml = sourceParagraphs
    .map((paragraph, index) => {
      const pairedTranslation = canPairParagraphs ? translationParagraphs[index] || (sourceParagraphs.length === 1 ? translationParagraphs.join(" ") : "") : "";
      return `
        <div class="source-translation-pair">
          <p>${escapeHtml(paragraph)}</p>
          ${pairedTranslation ? `<p class="translation-follow">${escapeHtml(pairedTranslation)}</p>` : ""}
        </div>
      `;
    })
    .join("");
  const unpairedTranslationHtml =
    translationParagraphs.length && !canPairParagraphs
      ? `<div class="translation-text translation-follow-block">${translationParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>`
      : "";
  return `
    <div class="source-text paired-source-text">
      <span>原文摘录</span>
      ${sourceHtml}
      ${unpairedTranslationHtml}
    </div>
  `;
}

function renderParagraphTextBlock(label, text, className, options = {}) {
  const paragraphs = displayParagraphs(text, options);
  return `
    <div class="${escapeAttr(className)}">
      <span>${escapeHtml(label)}</span>
      ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </div>
  `;
}

function displayParagraphs(text, options = {}) {
  const source = String(text || "").trim();
  const paragraphSource = options.preserveSingleNewlines ? source : paragraphizeText(source);
  const normalized = stripPdfPageNumberArtifacts(paragraphSource)
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  return normalized.length ? normalized : [String(text || "").trim()].filter(Boolean);
}

function paragraphizeText(text) {
  const source = String(text || "").trim();
  if (!source) return "";
  const normalized = source.replace(/\r\n?/g, "\n").replace(/[ \t]{2,}/g, " ");
  if (/\n{2,}/.test(normalized)) return normalized;
  const lines = normalized.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length > 1) {
    const joined = [];
    let current = "";
    lines.forEach((line, index) => {
      if (!current) {
        current = line;
        return;
      }
      const previousLooksComplete = /[.!?。！？]$/.test(current);
      const nextLooksNewParagraph = /^[A-Z(“"']|^[-a-z]\)|^[0-9]+[.)]/.test(line);
      const previousLineShort = current.length < 260;
      if (previousLooksComplete && nextLooksNewParagraph && previousLineShort) {
        joined.push(current);
        current = line;
      } else {
        current += ` ${line}`;
      }
      if (index === lines.length - 1 && current) joined.push(current);
    });
    if (joined.length > 1) return joined.join("\n\n");
    return lines.join(" ");
  }
  if (source.length < 900) return source;
  return source
    .replace(/([.!?])\s+(?=(?:ICOMOS|The State Party|In conclusion|In its|In the|The nominated|The property|This criterion|Criterion|The boundaries|The authenticity|The integrity|The comparative|The serial)\b)/g, "$1\n\n")
    .replace(/(。|！|？)\s*(?=(?:ICOMOS|缔约国|综上|因此|该项目|本项目|真实性|完整性|边界|保护|管理|系列|比较研究))/g, "$1\n\n");
}

function sourceMetaFor(property, sectionKey) {
  const payload = narrativePayload(property?.id, narrativeSectionForSource(sectionKey));
  const baseKey = sourceBaseKey(sectionKey);
  const pageSpec =
    payload.source_pages?.[sectionKey] ||
    payload.source_pages?.[baseKey] ||
    payload.source_pages?.[narrativeSectionForSource(sectionKey)] ||
    payload.source_page;
  const importedPage = normalizeSourcePageSpec(pageSpec);
  if (importedPage) return { propertyId: property.id, ...importedPage };

  const exactPages = {
    C1765: {
      brief: 93,
      attributes: 88,
      comparative: 89,
      criteria: 89,
      criteria_conclusion: 90,
      recommendation_criteria: 95,
      serial_selection: 90,
      integrity: 90,
      authenticity: 90,
      integrity_authenticity_conclusion: 91,
      boundaries: 91,
      conservation: 91,
      management: 93,
      protection_property: 91,
      protection_buffer_zone: 91,
      threats_addressed: 95,
      recommendations: 95,
    },
  };
  const page = exactPages[property?.id]?.[sectionKey];
  const basePage = exactPages[property?.id]?.[baseKey];
  return page || basePage ? { propertyId: property.id, page: page || basePage } : { propertyId: property?.id || selectedPropertyId };
}

function briefSectionSourceMeta(property) {
  const sectionPage = briefSectionPdfPages[property?.id];
  if (sectionPage) {
    return {
      propertyId: property.id,
      page: sectionPage,
      section: sectionPage === projectStartPdfPages[property?.id] ? "Brief description" : "Brief synthesis",
    };
  }
  return {
    ...sourceMetaFor(property, "brief"),
    section: "Brief synthesis / Brief description",
  };
}

function criteriaSectionSourceMeta(property) {
  const criteriaPage = criteriaSectionPdfPages[property?.id];
  if (criteriaPage) {
    return {
      propertyId: property.id,
      page: criteriaPage,
      section: "Criteria under which inscription is proposed",
    };
  }
  return {
    ...sourceMetaFor(property, "criteria"),
    section: "Criteria under which inscription is proposed",
  };
}

function comparativeSectionSourceMeta(property) {
  const sectionPage = comparativeSectionPdfPages[property?.id];
  if (sectionPage) {
    return {
      propertyId: property.id,
      page: sectionPage,
      section: "Comparative analysis",
    };
  }
  return {
    ...sourceMetaFor(property, "comparative"),
    section: "Comparative analysis",
  };
}

function attributesSectionSourceMeta(property) {
  const sectionPage = attributesSectionPdfPages[property?.id];
  if (sectionPage) {
    return {
      propertyId: property.id,
      page: sectionPage,
      section: "Proposed justification / attributes",
    };
  }
  return {
    ...sourceMetaFor(property, "attributes"),
    section: "Proposed justification / attributes",
  };
}

function integrityAuthenticitySectionSourceMeta(property) {
  const sectionPage = integrityAuthenticitySectionPdfPages[property?.id];
  if (sectionPage) {
    return {
      propertyId: property.id,
      page: sectionPage,
      section: "Integrity and authenticity",
    };
  }
  return {
    ...sourceMetaFor(property, "integrity"),
    section: "Integrity and authenticity",
  };
}

function conservationMonitoringSectionSourceMeta(property) {
  const sectionPage = conservationMonitoringSectionPdfPages[property?.id];
  if (sectionPage) {
    return {
      propertyId: property.id,
      page: sectionPage,
      section: "4 Conservation measures and monitoring",
    };
  }
  return {
    ...sourceMetaFor(property, "conservation"),
    section: "4 Conservation measures and monitoring",
  };
}

function protectionManagementSectionSourceMeta(property) {
  const sectionPage = protectionManagementSectionPdfPages[property?.id];
  if (sectionPage) {
    return {
      propertyId: property.id,
      page: sectionPage,
      section: "5 Protection and management",
    };
  }
  return {
    ...sourceMetaFor(property, "management"),
    section: "5 Protection and management",
  };
}

function recommendationsSectionSourceMeta(property) {
  const sectionPage = recommendationsSectionPdfPages[property?.id];
  if (sectionPage) {
    return {
      propertyId: property.id,
      page: sectionPage,
      section: "7 Recommendations",
    };
  }
  return {
    ...sourceMetaFor(property, "recommendations"),
    section: "7 Recommendations",
  };
}

function sourceBaseKey(sectionKey) {
  if (/^recommendation_criteria_/.test(sectionKey)) return "recommendation_criteria";
  if (/^criteria_/.test(sectionKey)) return "criteria";
  return sectionKey;
}

function narrativeSectionForSource(sectionKey) {
  if (["brief"].includes(sectionKey)) return "brief";
  if (
    ["criteria", "criteria_conclusion", "recommendation_criteria"].includes(sectionKey) ||
    /^criteria_/.test(sectionKey) ||
    /^recommendation_criteria_/.test(sectionKey)
  ) {
    return "criteria";
  }
  if (["attributes", "attributes_mentions"].includes(sectionKey)) return "attributes";
  if (["comparative"].includes(sectionKey)) return "comparative";
  if (["serial_selection"].includes(sectionKey)) return "serial";
  if (["integrity", "authenticity", "integrity_authenticity_conclusion", "boundaries"].includes(sectionKey)) return "core";
  if (pmItemKeys.includes(sectionKey)) return "protection";
  return sectionKey;
}

function normalizeSourcePageSpec(pageSpec) {
  if (!pageSpec) return null;
  if (Array.isArray(pageSpec)) {
    const start = Number(pageSpec[0]) || null;
    const end = Number(pageSpec[1] || pageSpec[0]) || start;
    return start ? { pageStart: start, pageEnd: end } : null;
  }
  if (typeof pageSpec === "object") {
    const start = Number(pageSpec.page || pageSpec.pageStart || pageSpec.start) || null;
    const end = Number(pageSpec.pageEnd || pageSpec.end || pageSpec.page || pageSpec.pageStart || pageSpec.start) || start;
    return start ? { pageStart: start, pageEnd: end } : null;
  }
  const page = Number(pageSpec);
  return page ? { page } : null;
}

function renderSourceLocator(meta = {}) {
  const property = propertyById(meta.propertyId || selectedPropertyId);
  const pages = sourcePagesForProperty(property, meta);
  if (!pages.start) return "";
  const hasExactPage = Boolean(meta.page || meta.pageStart);
  const label =
    hasExactPage || pages.end === pages.start
      ? `原文 p.${pages.start}`
      : `项目原文 pp.${pages.start}-${pages.end}`;
  const title = property?.property_name_en || property?.id || "ICOMOS report";
  const section = meta.section || "";
  return `
    <div class="source-locator-group">
      <button
        class="source-locator"
        type="button"
        onclick="openPdfSourceFromButton(this)"
        data-open-pdf-source
        data-pdf-page="${escapeAttr(String(pages.start))}"
        data-pdf-end-page="${escapeAttr(String(pages.end || pages.start))}"
        data-pdf-label="${escapeAttr(label)}"
        data-pdf-title="${escapeAttr(title)}"
        data-pdf-section="${escapeAttr(section)}"
        title="${escapeAttr(label)}"
      >查阅原文</button>
    </div>
  `;
}

function sourcePagesForProperty(property, meta = {}) {
  if (meta.page || meta.pageStart) {
    return {
      start: Number(meta.page || meta.pageStart) || null,
      end: Number(meta.pageEnd || meta.page || meta.pageStart) || null,
    };
  }
  const correction = criteriaCorrectionProjects.find((entry) => entry.property_id === property?.id);
  const correctionPages = Array.isArray(correction?.report_pages) ? correction.report_pages : [];
  const start = Number(projectStartPdfPages[property?.id] || property?.report_page_start || correctionPages[0]) || null;
  const end = projectStartPdfPages[property?.id] ? start : Number(property?.report_page_end || correctionPages[1] || correctionPages[0]) || start;
  return { start, end };
}

function renderPdfSourcePanel() {
  if (!activePdfSource) return "";
  const page = Number(activePdfSource.page) || 1;
  const title = activePdfSource.title || "ICOMOS report";
  const label = activePdfSource.label || `原文 p.${page}`;
  const section = activePdfSource.section || "";
  const pdfUrl = pdfUrlForPage(page);
  const expanded = Boolean(activePdfSource.expanded);
  return `
    <aside class="pdf-source-panel ${expanded ? "expanded" : ""}" aria-label="报告原文阅览窗口">
      <header>
        <div>
          <strong>${escapeHtml(title)}</strong>
          <span>${escapeHtml([label, section].filter(Boolean).join(" · "))}</span>
        </div>
        <div class="button-row">
          <a class="button secondary" href="${escapeAttr(pdfUrl)}" target="_blank" rel="noopener">新窗口打开</a>
          <button class="button secondary" type="button" onclick="togglePdfSourcePanel()" data-toggle-pdf-source>${expanded ? "缩小原文" : "放大原文"}</button>
          <button class="button secondary" type="button" onclick="closePdfSourcePanel()" data-close-pdf-source>收起原文</button>
        </div>
      </header>
      <iframe title="ICOMOS 评估报告原文" src="${escapeAttr(pdfUrl)}"></iframe>
    </aside>
  `;
}

function pdfUrlForPage(page) {
  const file = `/${encodeURI(mainReportPdfPath)}`;
  return `${assetPath("/pdf-viewer.html")}?file=${encodeURIComponent(file)}&page=${Number(page) || 1}`;
}

function openPdfSourceFromButton(button) {
  activePdfSource = {
    page: Number(button.dataset.pdfPage) || 1,
    endPage: Number(button.dataset.pdfEndPage) || Number(button.dataset.pdfPage) || 1,
    label: button.dataset.pdfLabel || "",
    title: button.dataset.pdfTitle || "",
    section: button.dataset.pdfSection || "",
  };
  render();
}

function closePdfSourcePanel() {
  activePdfSource = null;
  render();
}

function togglePdfSourcePanel() {
  if (!activePdfSource) return;
  activePdfSource.expanded = !activePdfSource.expanded;
  render();
}

function isEditingNarrative(propertyId, sectionKey) {
  return editingNarrativeKey === `${propertyId}:${sectionKey}`;
}

function narrativePayload(propertyId, sectionKey) {
  const edit = state.narrative_edits.find((entry) => entry.property_id === propertyId && entry.section_key === sectionKey);
  return edit?.payload || {};
}

function upsertLocalNarrativeEdit(propertyId, sectionKey, payload, updatedAt, editedBy = "") {
  const existing = state.narrative_edits.find((entry) => entry.property_id === propertyId && entry.section_key === sectionKey);
  if (existing) {
    existing.payload = payload;
    existing.updated_at = updatedAt;
    existing.edited_by = editedBy || existing.edited_by || "";
  } else {
    state.narrative_edits.push({ property_id: propertyId, section_key: sectionKey, payload, edited_by: editedBy, updated_at: updatedAt });
  }
}

function editStamp() {
  return {
    by: currentUser?.email || "本机用户",
    at: new Date().toISOString(),
  };
}

function omitEditMeta(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const { updated_by, updated_at, edited_by, edited_at, ...rest } = value;
  return rest;
}

function sameChangeValue(first, second) {
  return stableStringify(first) === stableStringify(second);
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value ?? null);
}

function recordEditHistory({ propertyId, sectionKey, fieldKey = "", action = "update", before, after }) {
  if (sameChangeValue(before, after)) return null;
  const stamp = editStamp();
  const entry = normalizeEditHistoryRow({
    id: uniqueLocalId(),
    property_id: propertyId,
    section_key: sectionKey,
    field_key: fieldKey,
    action,
    edited_by: stamp.by,
    edited_at: stamp.at,
    before_value: before ?? null,
    after_value: after ?? null,
  });
  state.edit_history = mergeEditHistoryRows([entry], state.edit_history || []);
  return entry;
}

function normalizeEditHistoryRow(row = {}) {
  if (!row.property_id || !row.section_key) return null;
  return {
    id: row.id || uniqueLocalId(),
    property_id: row.property_id,
    section_key: row.section_key,
    field_key: row.field_key || "",
    action: row.action || "update",
    edited_by: row.edited_by || "",
    edited_at: row.edited_at || row.updated_at || new Date().toISOString(),
    before_value: row.before_value ?? null,
    after_value: row.after_value ?? null,
  };
}

function mergeEditHistoryRows(firstRows = [], secondRows = []) {
  const byId = new Map();
  [...firstRows, ...secondRows].map(normalizeEditHistoryRow).filter(Boolean).forEach((row) => byId.set(row.id, row));
  return [...byId.values()]
    .sort((a, b) => String(b.edited_at || "").localeCompare(String(a.edited_at || "")))
    .slice(0, EDIT_HISTORY_LIMIT);
}

function recentEditHistoryForProperty(propertyId) {
  return (state.edit_history || [])
    .filter((entry) => entry.property_id === propertyId)
    .sort((a, b) => String(b.edited_at || "").localeCompare(String(a.edited_at || "")));
}

function uniqueLocalId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function tryUpsertEditHistoryRows(rows = []) {
  const payload = rows.map(normalizeEditHistoryRow).filter(Boolean);
  if (!supabaseClient || !payload.length) return false;
  try {
    const { error } = await supabaseClient.from("edit_history").upsert(payload, { onConflict: "id" });
    return !error;
  } catch {
    return false;
  }
}

function persistPrivateNarrativeEdit(propertyId, sectionKey, payload) {
  const stamp = editStamp();
  const existing = state.narrative_edits.find((entry) => entry.property_id === propertyId && entry.section_key === sectionKey);
  const beforePayload = omitEditMeta(existing?.payload || {});
  const contentChanged = !sameChangeValue(beforePayload, omitEditMeta(payload));
  const nextPayload = {
    ...payload,
    updated_by: contentChanged ? stamp.by : existing?.payload?.updated_by || stamp.by,
    updated_at: contentChanged ? stamp.at : existing?.payload?.updated_at || stamp.at,
    private_scope: true,
  };
  upsertLocalNarrativeEdit(propertyId, sectionKey, nextPayload, nextPayload.updated_at, nextPayload.updated_by);
  if (contentChanged) {
    recordEditHistory({
      propertyId,
      sectionKey,
      fieldKey: sectionKey,
      before: beforePayload,
      after: omitEditMeta(nextPayload),
    });
  }
  saveLocalState();
  saveStatus = "个人笔记已保存到本机，不会上传到共享数据库。";
  render();
}

async function persistNarrativeEdit(propertyId, sectionKey, payload) {
  if (PRIVATE_NARRATIVE_SECTIONS.has(sectionKey)) {
    persistPrivateNarrativeEdit(propertyId, sectionKey, payload);
    return;
  }
  const stamp = editStamp();
  const updatedAt = stamp.at;
  const existing = state.narrative_edits.find((entry) => entry.property_id === propertyId && entry.section_key === sectionKey);
  const beforePayload = omitEditMeta(existing?.payload || {});
  const contentChanged = !sameChangeValue(beforePayload, omitEditMeta(payload));
  const nextPayload = {
    ...payload,
    updated_by: contentChanged ? stamp.by : existing?.payload?.updated_by || stamp.by,
    updated_at: contentChanged ? updatedAt : existing?.payload?.updated_at || updatedAt,
  };
  upsertLocalNarrativeEdit(propertyId, sectionKey, nextPayload, nextPayload.updated_at, nextPayload.updated_by);
  const historyEntry = contentChanged
    ? recordEditHistory({
        propertyId,
        sectionKey,
        fieldKey: sectionKey,
        before: beforePayload,
        after: omitEditMeta(nextPayload),
      })
    : null;
  const assessmentUpdates = applyNarrativeAssessmentRatings(propertyId, nextPayload);
  editingNarrativeKey = "";
  saveLocalState();

  if (!supabaseClient) {
    saveStatus = assessmentUpdates.length ? "栏目修订、修订日志和评估分档已保存到本机浏览器。" : "栏目修订和修订日志已保存到本机浏览器。";
    render();
    return;
  }

  try {
    const narrativeResult = await supabaseClient
      .from("narrative_edits")
      .upsert({ property_id: propertyId, section_key: sectionKey, payload: nextPayload, edited_by: nextPayload.updated_by, updated_at: nextPayload.updated_at }, { onConflict: "property_id,section_key" });
    const assessmentResult = assessmentUpdates.length
      ? await supabaseClient.from("property_assessments").upsert(assessmentUpdates.map(assessmentPayload), { onConflict: "property_id,item_key" })
      : { error: null };
    await tryUpsertEditHistoryRows(historyEntry ? [historyEntry] : []);
    saveStatus =
      narrativeResult.error || assessmentResult.error
        ? `共享保存失败：${narrativeResult.error?.message || assessmentResult.error?.message}`
        : assessmentUpdates.length
          ? "栏目修订、修订日志和评估分档已保存到共享数据库。"
          : "栏目修订和修订日志已保存到共享数据库。";
  } catch {
    saveStatus = "栏目修订已保存到本机浏览器；共享数据库尚未建立 narrative_edits 表。";
  }
  render();
}

function applyNarrativeAssessmentRatings(propertyId, payload) {
  const ratings = payload.assessment_ratings || {};
  return Object.entries(ratings)
    .filter(([, rating]) => rating)
    .map(([itemKey, rating]) => {
      let assessment = state.property_assessments.find((entry) => entry.property_id === propertyId && entry.item_key === itemKey);
      if (!assessment) {
        assessment = {
          id: `${propertyId}-${itemKey}`,
          property_id: propertyId,
          item_key: itemKey,
          ai_inferred_rating: "unknown",
          human_calibrated_rating: "unknown",
          official_ppt_rating: "unknown",
          conclusion_zh: "",
          conclusion_en: "",
          rationale_zh: "",
          confidence: "medium",
          review_status: "draft",
          reviewer: "",
          reviewer_note: "",
          updated_at: new Date().toISOString(),
        };
        state.property_assessments.push(assessment);
      }
      assessment.human_calibrated_rating = rating;
      const hasZhEntry = Object.prototype.hasOwnProperty.call(payload.entries || {}, itemKey);
      const hasEnEntry = Object.prototype.hasOwnProperty.call(payload.entries_en || {}, itemKey);
      if (hasZhEntry || hasEnEntry) {
        if (hasZhEntry) assessment.conclusion_zh = payload.entries[itemKey] || "";
        if (hasEnEntry) assessment.conclusion_en = payload.entries_en[itemKey] || "";
      }
      assessment.review_status = assessment.review_status || "draft";
      assessment.updated_at = new Date().toISOString();
      return assessment;
    });
}

function assessmentPayload(assessment) {
  return {
    property_id: assessment.property_id,
    item_key: assessment.item_key,
    ai_inferred_rating: assessment.ai_inferred_rating,
    human_calibrated_rating: assessment.human_calibrated_rating,
    official_ppt_rating: assessment.official_ppt_rating,
    conclusion_zh: assessment.conclusion_zh,
    conclusion_en: assessment.conclusion_en,
    rationale_zh: assessment.rationale_zh,
    confidence: assessment.confidence,
    review_status: assessment.review_status,
    reviewer: assessment.reviewer,
    reviewer_note: assessment.reviewer_note,
    updated_at: assessment.updated_at,
  };
}

function preserveHiddenNotes(existingPayload = {}, payload = {}) {
  return { ...payload };
}

function cleanManualNarrativeText(value) {
  return stripPdfPageNumberArtifacts(String(value || "")).replace(/\r\n?/g, "\n").trim();
}

function collectCriteriaEditPayload(data, propertyId, base = {}) {
  const payload = {
    ...base,
    criteria: {},
    criteria_en: {},
    recommendation_criteria: {},
    recommendation_criteria_en: {},
  };
  const criterionKeys = new Set();
  for (const [key] of data.entries()) {
    [
      "criterion_state_en__",
      "criterion_icomos_en__",
      "criterion_conclusion_en__",
      "criterion__",
      "criterion_en__",
      "recommendation_criterion__",
      "recommendation_criterion_en__",
    ].forEach((prefix) => {
      if (key.startsWith(prefix)) criterionKeys.add(key.slice(prefix.length));
    });
  }
  const rows = state.criteria_assessments.filter((entry) => entry.property_id === propertyId);
  criterionKeys.forEach((criterion) => {
    const stateParty = cleanManualNarrativeText(data.get(`criterion_state_en__${criterion}`));
    const icomosReview = cleanManualNarrativeText(data.get(`criterion_icomos_en__${criterion}`));
    const conclusion = cleanManualNarrativeText(data.get(`criterion_conclusion_en__${criterion}`));
    const legacySource = cleanManualNarrativeText(data.get(`criterion_en__${criterion}`));
    const translation = cleanManualNarrativeText(data.get(`criterion__${criterion}`) || data.get(`recommendation_criterion__${criterion}`));
    const combined = [stateParty, icomosReview, conclusion].filter(Boolean).join("\n\n") || legacySource;
    payload.criteria_en[criterion] = combined;
    payload.criteria[criterion] = translation;
    if (rows.find((entry) => entry.criterion === criterion)?.accepted_by_icomos) {
      payload.recommendation_criteria_en[criterion] = conclusion || cleanManualNarrativeText(data.get(`recommendation_criterion_en__${criterion}`));
      payload.recommendation_criteria[criterion] = translation;
    }
  });
  return payload;
}

function payloadFromNarrativeForm(form) {
  const data = new FormData(form);
  const sectionKey = form.dataset.sectionKey;
  const existingPayload = narrativePayload(form.dataset.propertyId, sectionKey);
  if (sectionKey === "research_notes") {
    return {
      note: String(data.get("note") || ""),
    };
  }
  if (sectionKey === "brief") {
    return preserveHiddenNotes(existingPayload, {
      brief_zh: cleanManualNarrativeText(data.get("brief_zh")),
      brief_en: cleanManualNarrativeText(data.get("brief_en")),
    });
  }
  if (sectionKey === "criteria") {
    return preserveHiddenNotes(existingPayload, {
      ...collectCriteriaEditPayload(data, form.dataset.propertyId, { intro: cleanManualNarrativeText(data.get("intro")) }),
      criteria_conclusion_en: cleanManualNarrativeText(data.get("criteria_conclusion_en")),
      criteria_conclusion: cleanManualNarrativeText(data.get("criteria_conclusion")),
    });
  }
  if (sectionKey === "attributes") {
    const manualMentions = String(data.get("attribute_mentions_text") || "").trim();
    const attributes = {};
    form.querySelectorAll('[name^="attribute_item_original__"]').forEach((field) => {
      const index = field.name.replace("attribute_item_original__", "");
      const group = String(field.value || "").trim();
      const name = String(data.get(`attribute_item_translation__${index}`) || "").trim();
      if (group || name) attributes[index] = { group, name };
    });
    const payload = {
      summary_en: cleanManualNarrativeText(data.get("summary_en")),
      summary: cleanManualNarrativeText(data.get("summary")),
      attributes,
      mentions: manualMentions ? [{ manual: true, summary: manualMentions }] : [],
    };
    return preserveHiddenNotes(existingPayload, payload);
  }
  if (sectionKey === "comparative") {
    const comparatorGroups = {};
    comparatorGroupDefinitions.forEach(({ key }) => {
      comparatorGroups[key] = cleanManualNarrativeText(data.get(`comparator_group__${key}`));
    });
    return preserveHiddenNotes(existingPayload, {
      summary_en: cleanManualNarrativeText(data.get("summary_en")),
      summary: cleanManualNarrativeText(data.get("summary")),
      comparator_groups: comparatorGroups,
      ...collectPrefixedPayload(data, "assessment_rating__", {}, "assessment_ratings"),
    });
  }
  if (sectionKey === "core") {
    return preserveHiddenNotes(existingPayload, {
      ...collectPrefixedPayload(data, "core__", {}, "entries"),
      ...collectPrefixedPayload(data, "core_en__", {}, "entries_en"),
      ...collectPrefixedPayload(data, "assessment_rating__", {}, "assessment_ratings"),
    });
  }
  if (sectionKey === "serial") {
    return preserveHiddenNotes(existingPayload, {
      ...collectPrefixedPayload(data, "serial__", {}, "entries"),
      ...collectPrefixedPayload(data, "serial_en__", {}, "entries_en"),
      ...collectPrefixedPayload(data, "assessment_rating__", {}, "assessment_ratings"),
    });
  }
  if (sectionKey === "protection") {
    return preserveHiddenNotes(existingPayload, {
      ...collectPrefixedPayload(data, "protection__", {}, "entries"),
      ...collectPrefixedPayload(data, "protection_en__", {}, "entries_en"),
      ...collectPrefixedPayload(data, "assessment_rating__", {}, "assessment_ratings"),
    });
  }
  if (sectionKey === "recommendations") {
    const payload = { entries: {}, icomos_items: [], committee_items: [] };
    for (const [key, value] of data.entries()) {
      if (key.startsWith("recommendation_en__")) {
        const itemKey = key.slice("recommendation_en__".length);
        payload.entries[itemKey] = { ...(payload.entries[itemKey] || {}), source_en: cleanManualNarrativeText(value) };
      }
      if (key.startsWith("recommendation_summary__")) {
        const itemKey = key.slice("recommendation_summary__".length);
        payload.entries[itemKey] = { ...(payload.entries[itemKey] || {}), summary: cleanManualNarrativeText(value) };
      }
      if (key.startsWith("icomos_recommendation_en__")) {
        const index = key.slice("icomos_recommendation_en__".length);
        payload.icomos_items[index] = { ...(payload.icomos_items[index] || {}), source_en: cleanManualNarrativeText(value) };
      }
      if (key.startsWith("icomos_recommendation_summary__")) {
        const index = key.slice("icomos_recommendation_summary__".length);
        payload.icomos_items[index] = { ...(payload.icomos_items[index] || {}), summary: cleanManualNarrativeText(value) };
      }
      if (key.startsWith("committee_item_heading__")) {
        const index = key.slice("committee_item_heading__".length);
        payload.committee_items[index] = { ...(payload.committee_items[index] || {}), heading: cleanManualNarrativeText(value) };
      }
      if (key.startsWith("committee_item_summary__")) {
        const index = key.slice("committee_item_summary__".length);
        payload.committee_items[index] = { ...(payload.committee_items[index] || {}), summary: cleanManualNarrativeText(value) };
      }
    }
    payload.icomos_items = payload.icomos_items
      .filter((item) => item?.source_en || item?.summary)
      .map((item, index) => ({ ...item, key: recommendationLetter(index) }));
    payload.committee_items = payload.committee_items.filter((item) => item?.heading || item?.summary);
    return preserveHiddenNotes(existingPayload, payload);
  }
  return {};
}

function collectPrefixedPayload(data, prefix, base, targetKey) {
  const payload = { ...base, [targetKey]: {} };
  for (const [key, value] of data.entries()) {
    if (key.startsWith(prefix)) payload[targetKey][key.slice(prefix.length)] = cleanManualNarrativeText(value);
  }
  return payload;
}

function renderOfficialRatingsPage() {
  const property = propertyById(selectedPptPropertyId) || state.properties[0];
  if (!property) return `<div class="empty">暂无项目数据。</div>`;
  selectedPptPropertyId = property.id;
  const rows = officialRatingItemKeys.map((item_key) => officialRatingFor(property.id, item_key));
  return `
    ${renderTopbar("ICOMOS 评分表录入", "按委员会审议顺序上传评分表截图并确认识别结果", "")}
    <section class="grid two official-entry-layout">
      <aside class="panel meeting-list-panel">
        <h2>审议项目顺序</h2>
        <div class="meeting-list">
          ${state.properties
            .map((entry, index) => {
              const completeCount = officialRatingItemKeys.filter((itemKey) => {
                const rating = officialRatingFor(entry.id, itemKey);
                return rating.official_ppt_rating && rating.official_ppt_rating !== "unknown";
              }).length;
              return `<button class="meeting-item ${entry.id === property.id ? "active" : ""}" data-ppt-property="${escapeAttr(entry.id)}" type="button">
                <span>${index + 1}</span>
                <strong>${escapeHtml(entry.property_name_en)}</strong>
                <em>${escapeHtml(entry.state_party || "")} · ${completeCount}/${officialRatingItemKeys.length}</em>
              </button>`;
            })
            .join("")}
        </div>
      </aside>
      <section class="section-stack">
        <div class="panel">
          <h2>${escapeHtml(property.property_name_zh || property.property_name_en)}</h2>
          <p class="muted">${escapeHtml(property.state_party || "")} · ${escapeHtml(property.icomos_recommendation || "")}</p>
          <div class="upload-zone">
            <label>上传 ICOMOS 评分表截图
              <input id="ratingScreenshotInput" type="file" accept="image/*">
            </label>
            <div class="button-row">
              <button class="button secondary" id="recognizeRatingBtn" type="button">重新识别</button>
              <button class="button primary" id="saveRatingBatchBtn" type="button">确认并保存</button>
            </div>
            <p class="muted" id="ratingRecognitionStatus">${escapeHtml(ratingRecognitionSummary(rows))}</p>
            ${renderRatingScreenshotPreview(rows)}
          </div>
        </div>
        <div class="panel">
          <h2>识别与确认</h2>
          <form id="ratingBatchForm" class="rating-table-form">
            <table class="compact-table">
              <thead><tr><th>评分项</th><th>会前推测</th><th>ICOMOS 评定</th></tr></thead>
              <tbody>
                ${rows.map((rating) => renderRatingBatchRow(rating)).join("")}
              </tbody>
            </table>
            <label class="wide">来源备注
              <textarea name="batch_source_note">${escapeHtml(rows.find((row) => row.source_note)?.source_note || "")}</textarea>
            </label>
          </form>
        </div>
      </section>
    </section>
  `;
}

function renderRatingBatchRow(rating) {
  const assessment = assessmentFor(rating.property_id, rating.item_key);
  const preMeetingRating = preMeetingRatingForAssessment(assessment);
  const discrepancy = differs(rating.official_ppt_rating, preMeetingRating);
  return `
    <tr class="${discrepancy ? "discrepancy" : ""}">
      <td><strong>${escapeHtml(labelForItem(rating.item_key))}</strong>${discrepancy ? `<br><span class="muted">与会前推测不一致</span>` : ""}</td>
      <td>${ratingPill(preMeetingRating)}<br><span class="muted">${escapeHtml(preMeetingRatingSource(assessment))}</span></td>
      <td>${ratingSelect(`official_ppt_rating__${rating.item_key}`, rating.official_ppt_rating || "unknown")}</td>
    </tr>
  `;
}

function preMeetingRatingForAssessment(assessment) {
  return assessment?.human_calibrated_rating || assessment?.ai_inferred_rating || "unknown";
}

function preMeetingRatingSource(assessment) {
  if (!assessment) return "待推测";
  const ai = assessment.ai_inferred_rating || "unknown";
  const human = assessment.human_calibrated_rating || "unknown";
  if (human !== "unknown" && ai !== "unknown" && human !== ai) return "人工已修订";
  if (human !== "unknown") return "AI 初判 / 人工确认";
  if (ai !== "unknown") return "AI 初判";
  return "待推测";
}

function renderRatingScreenshotPreview(rows) {
  const sourceFile = rows.find((row) => row.source_file)?.source_file || "";
  if (!sourceFile || !sourceFile.startsWith("data:image/")) return "";
  return `<img class="screenshot-preview" src="${escapeAttr(sourceFile)}" alt="Uploaded ICOMOS rating sheet screenshot">`;
}

function ratingRecognitionSummary(rows) {
  const sourceFile = rows.find((row) => row.source_file)?.source_file;
  const entered = rows.filter((row) => row.official_ppt_rating && row.official_ppt_rating !== "unknown").length;
  if (!sourceFile) return "尚未上传截图。上传后先预填可识别评分，结果需人工确认。";
  return `已上传截图；当前已填 ${entered}/${officialRatingItemKeys.length} 项评分。请确认后保存。`;
}

function attachPageListeners(route) {
  setupResizableTables(route);

  document.querySelectorAll("[data-open-pdf-source]").forEach((button) => {
    button.addEventListener("click", () => {
      activePdfSource = {
        page: Number(button.dataset.pdfPage) || 1,
        endPage: Number(button.dataset.pdfEndPage) || Number(button.dataset.pdfPage) || 1,
        label: button.dataset.pdfLabel || "",
        title: button.dataset.pdfTitle || "",
        section: button.dataset.pdfSection || "",
      };
      render();
    });
  });

  const closePdfBtn = document.querySelector("[data-close-pdf-source]");
  if (closePdfBtn) {
    closePdfBtn.addEventListener("click", () => {
      activePdfSource = null;
      render();
    });
  }

  const magicLinkBtn = document.querySelector("#magicLinkBtn");
  if (magicLinkBtn) {
    magicLinkBtn.addEventListener("click", async () => {
      const email = document.querySelector("#loginEmail").value.trim();
      if (!email) return;
      const { error } = await supabaseClient.auth.signInWithOtp({ email });
      saveStatus = error ? `登录链接发送失败：${error.message}` : "登录链接已发送，请检查邮箱。";
      render();
    });
  }
  const signOutBtn = document.querySelector("#signOutBtn");
  if (signOutBtn) signOutBtn.addEventListener("click", () => supabaseClient.auth.signOut());
  document.querySelectorAll("[data-import-legacy-storage]").forEach((button) => {
    button.addEventListener("click", () => importLegacyStorage(button.dataset.importLegacyStorage));
  });

  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.addEventListener("change", (event) => {
      filters[event.target.dataset.filter] = event.target.value;
      if (route === "/properties") syncPropertyFiltersToUrl();
      render();
    });
  });

  if (route === "/") {
    const exportDashboardStatsBtn = document.querySelector("#exportDashboardStatsBtn");
    if (exportDashboardStatsBtn) exportDashboardStatsBtn.addEventListener("click", exportDashboardStatsWorkbook);
    const copyDashboardStatsTableBtn = document.querySelector("#copyDashboardStatsTableBtn");
    if (copyDashboardStatsTableBtn) copyDashboardStatsTableBtn.addEventListener("click", copyDashboardStatsTableText);
    const downloadDashboardStatsWorkbookBtn = document.querySelector("#downloadDashboardStatsWorkbookBtn");
    if (downloadDashboardStatsWorkbookBtn) downloadDashboardStatsWorkbookBtn.addEventListener("click", downloadDashboardStatsWorkbookAgain);
  }

  if (route === "/database") {
    const publishBtn = document.querySelector("#publishWorkspaceBtn");
    if (publishBtn) publishBtn.addEventListener("click", publishCurrentWorkspaceToSharedDatabase);
    const publishBackupBtn = document.querySelector("#publishWorkspaceBackupBtn");
    if (publishBackupBtn) publishBackupBtn.addEventListener("click", publishCurrentWorkspaceToSharedDatabase);
    const restoreReviewedBackupBtn = document.querySelector("#restoreReviewedBackupBtn");
    if (restoreReviewedBackupBtn) restoreReviewedBackupBtn.addEventListener("click", restoreReviewedWorkspaceBackup);
    const importBtn = document.querySelector("#importStructuredBtn");
    if (importBtn) importBtn.addEventListener("click", importStructuredExtraction);
    const exportWorkspaceBtn = document.querySelector("#exportWorkspaceBtn");
    if (exportWorkspaceBtn) exportWorkspaceBtn.addEventListener("click", exportWorkspaceData);
    const copyWorkspaceExportBtn = document.querySelector("#copyWorkspaceExportBtn");
    if (copyWorkspaceExportBtn) copyWorkspaceExportBtn.addEventListener("click", copyWorkspaceExport);
    const exportPrivateNotesMarkdownBtn = document.querySelector("#exportPrivateNotesMarkdownBtn");
    if (exportPrivateNotesMarkdownBtn) exportPrivateNotesMarkdownBtn.addEventListener("click", () => exportPrivateNotes("markdown"));
    const exportPrivateNotesWordBtn = document.querySelector("#exportPrivateNotesWordBtn");
    if (exportPrivateNotesWordBtn) exportPrivateNotesWordBtn.addEventListener("click", () => exportPrivateNotes("word"));
    const createBackupBtn = document.querySelector("#createLocalBackupBtn");
    if (createBackupBtn) createBackupBtn.addEventListener("click", createLocalBackup);
    const restoreBackupBtn = document.querySelector("#restoreLatestBackupBtn");
    if (restoreBackupBtn) restoreBackupBtn.addEventListener("click", restoreLatestLocalBackup);
  }

  if (route === "/properties") {
    const searchInput = document.querySelector("#propertySearchInput");
    const applySearchBtn = document.querySelector("#applyPropertySearchBtn");
    const clearFiltersBtn = document.querySelector("#clearPropertyFiltersBtn");
    const applySearch = () => {
      filters.query = (searchInput?.value || "").trim();
      syncPropertyFiltersToUrl();
      render();
    };
    if (searchInput) {
      searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          applySearch();
        }
      });
    }
    if (applySearchBtn) applySearchBtn.addEventListener("click", applySearch);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener("click", () => resetPropertyFilters({ keepColumnGroup: true }));

    document.querySelectorAll("[data-property-id]").forEach((row) => {
      row.addEventListener("click", () => {
        history.pushState({}, "", appPath(`/properties/${row.dataset.propertyId}`));
        render();
      });
    });
  }

  if (route.startsWith("/properties/")) {
    document.querySelectorAll("[data-committee-decision-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        persistCommitteeDecision(form);
      });
    });
    document.querySelectorAll("[data-edit-narrative]").forEach((button) => {
      button.addEventListener("click", () => {
        editingNarrativeKey = button.dataset.editNarrative;
        render();
      });
    });
    document.querySelectorAll("[data-cancel-narrative]").forEach((button) => {
      button.addEventListener("click", () => {
        editingNarrativeKey = "";
        render();
      });
    });
    document.querySelectorAll(".narrative-edit-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        persistNarrativeEdit(form.dataset.propertyId, form.dataset.sectionKey, payloadFromNarrativeForm(form));
      });
    });
    document.querySelectorAll("[data-add-attribute-item]").forEach((button) => {
      button.addEventListener("click", () => {
        const editor = button.closest(".attribute-items-edit");
        const rows = editor?.querySelector(".attribute-item-rows");
        if (!rows) return;
        const index = rows.querySelectorAll(".attribute-item-edit").length;
        rows.insertAdjacentHTML("beforeend", renderAttributeItemEditorRow({ original: "", translation: "" }, index));
      });
    });
    document.querySelectorAll("[data-add-committee-recommendation]").forEach((button) => {
      button.addEventListener("click", () => {
        const editor = button.closest(".recommendation-edit-section")?.querySelector(".committee-recommendation-editor");
        if (!editor) return;
        const index = editor.querySelectorAll("[data-committee-recommendation-item]").length;
        editor.insertAdjacentHTML("beforeend", renderCommitteeRecommendationEditorItem({ heading: "", summary: "" }, index));
        attachCommitteeRecommendationRemoveButtons(editor);
      });
    });
    document.querySelectorAll("[data-add-icomos-recommendation]").forEach((button) => {
      button.addEventListener("click", () => {
        const editor = button.closest(".recommendation-edit-section")?.querySelector(".icomos-recommendation-editor");
        if (!editor) return;
        const index = editor.querySelectorAll("[data-icomos-recommendation-item]").length;
        editor.insertAdjacentHTML("beforeend", renderIcomosRecommendationEditorItem({ is_manual: true, key: "", source_en: "", summary: "", note: "" }, index, { entries: {} }));
        attachIcomosRecommendationRemoveButtons(editor);
      });
    });
    attachIcomosRecommendationRemoveButtons(document);
    attachCommitteeRecommendationRemoveButtons(document);
    attachResearchNoteEditorListeners(document);
  }

  if (route === "/official-ratings-entry") {
    document.querySelectorAll("[data-ppt-property]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedPptPropertyId = button.dataset.pptProperty;
        render();
      });
    });
    const screenshotInput = document.querySelector("#ratingScreenshotInput");
    if (screenshotInput) screenshotInput.addEventListener("change", handleRatingScreenshotUpload);
    const recognizeBtn = document.querySelector("#recognizeRatingBtn");
    if (recognizeBtn) recognizeBtn.addEventListener("click", () => recognizeRatingsForSelectedProperty("manual"));
    const saveBatchBtn = document.querySelector("#saveRatingBatchBtn");
    if (saveBatchBtn) saveBatchBtn.addEventListener("click", saveRatingBatch);
  }
}

function setupResizableTables(route) {
  document.querySelectorAll("table").forEach((table, tableIndex) => {
    const headers = [...table.querySelectorAll("thead th")];
    if (!headers.length) return;

    const storageKey = `column_widths:${route}:${tableIndex}:${headers.map((header) => header.textContent.trim()).join("|")}`;
    const savedWidths = readColumnWidths(storageKey);
    let colgroup = table.querySelector("colgroup");
    if (!colgroup) {
      colgroup = document.createElement("colgroup");
      headers.forEach(() => colgroup.appendChild(document.createElement("col")));
      table.prepend(colgroup);
    }
    const cols = [...colgroup.children];
    table.style.tableLayout = "fixed";

    requestAnimationFrame(() => {
      headers.forEach((header, index) => {
        const savedWidth = savedWidths[index];
        const initialWidth = savedWidth || Math.max(70, Math.round(header.getBoundingClientRect().width));
        setColumnWidth(table, cols[index], initialWidth);
        header.classList.add("resizable");
        if (header.querySelector(".column-resizer")) return;
        const resizer = document.createElement("span");
        resizer.className = "column-resizer";
        resizer.setAttribute("aria-hidden", "true");
        header.appendChild(resizer);
        resizer.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const startX = event.clientX;
          const startWidth = parseFloat(cols[index].style.width) || header.getBoundingClientRect().width;
          document.body.classList.add("resizing-columns");
          resizer.setPointerCapture(event.pointerId);

          const onPointerMove = (moveEvent) => {
            const nextWidth = Math.max(64, Math.round(startWidth + moveEvent.clientX - startX));
            setColumnWidth(table, cols[index], nextWidth);
          };

          const onPointerUp = () => {
            document.body.classList.remove("resizing-columns");
            resizer.removeEventListener("pointermove", onPointerMove);
            resizer.removeEventListener("pointerup", onPointerUp);
            resizer.removeEventListener("pointercancel", onPointerUp);
            localStorage.setItem(storageKey, JSON.stringify(cols.map((col) => Math.round(parseFloat(col.style.width) || 0))));
          };

          resizer.addEventListener("pointermove", onPointerMove);
          resizer.addEventListener("pointerup", onPointerUp);
          resizer.addEventListener("pointercancel", onPointerUp);
        });
      });
      updateTableMinimumWidth(table, cols);
    });
  });
}

function readColumnWidths(storageKey) {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function setColumnWidth(table, col, width) {
  col.style.width = `${width}px`;
  updateTableMinimumWidth(table, [...col.parentElement.children]);
}

function updateTableMinimumWidth(table, cols) {
  const total = cols.reduce((sum, col) => sum + (parseFloat(col.style.width) || 0), 0);
  if (total > 0) table.style.minWidth = `${total}px`;
}

function filteredProperties() {
  return state.properties.filter((property) => {
    const serial = property.is_serial ? "serial" : "non_serial";
    const transnational = isTransnationalProperty(property) ? "transnational" : "national";
    return (
      matchesPropertyQuery(property) &&
      matches(filters.region, property.region) &&
      matches(filters.recommendation, property.icomos_recommendation) &&
      matches(filters.nomination_type, property.nomination_type) &&
      matchesNominationScope(filters.nomination_scope, property) &&
      matches(filters.heritage_type, heritageTypeFor(property)) &&
      matchesArray(filters.category_of_property, categoryOfPropertyValuesFor(property)) &&
      matchesArray(filters.proposed_criterion, property.proposed_criteria) &&
      matchesArray(filters.icomos_criterion, property.icomos_recommended_criteria) &&
      matchesArray(filters.committee_criterion, property.committee_confirmed_criteria) &&
      matches(filters.committee_decision_category, committeeDecisionCategory(property)) &&
      matches(filters.committee_change_from, committeeChangeFrom(property)) &&
      matches(filters.property_type, property.property_type) &&
      matches(filters.serial, serial) &&
      matches(filters.transnational, transnational) &&
      matchesPropertyAssessmentFilters(property)
    );
  });
}

function matchesPropertyQuery(property) {
  const query = String(filters.query || "").trim().toLowerCase();
  if (!query) return true;
  const tokens = query.split(/\s+/).filter(Boolean);
  const assessmentText = state.property_assessments
    .filter((entry) => entry.property_id === property.id)
    .map((entry) => [labelForItem(entry.item_key), entry.conclusion_zh, entry.conclusion_en, entry.rationale_zh, entry.reviewer_note].filter(Boolean).join(" "))
    .join(" ");
  const attributeText = attributesForProperty(property.id)
    .map((entry) => [entry.attribute_group, entry.attribute_name_zh, entry.attribute_name_en, entry.summary_zh, entry.summary_en, entry.analyst_note].filter(Boolean).join(" "))
    .join(" ");
  const recommendationText = recommendationsForProperty(property.id)
    .map((entry) => [entry.recommendation_category, entry.summary_zh, entry.text_en].filter(Boolean).join(" "))
    .join(" ");
  const haystack = [
    property.id,
    property.property_name_en,
    property.property_name_zh,
    property.state_party,
    property.region,
    property.nomination_type,
    property.icomos_recommendation,
    heritageTypeFor(property),
    categoryOfPropertyFor(property),
    (property.proposed_criteria || []).join(" "),
    (property.icomos_recommended_criteria || []).join(" "),
    (property.committee_confirmed_criteria || []).join(" "),
    committeeDecisionCategory(property),
    property.committee_decision,
    property.committee_pm_requirements,
    researchNoteText(property.id),
    assessmentText,
    attributeText,
    recommendationText,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

function matchesPropertyAssessmentFilters(property) {
  const wantsItem = filters.item_key !== "all";
  const wantsRating = filters.human_rating !== "all";
  if (!wantsItem && !wantsRating) return true;
  const rows = state.property_assessments.filter((entry) => entry.property_id === property.id);
  const candidates = wantsItem ? rows.filter((entry) => entry.item_key === filters.item_key) : rows;
  if (!candidates.length) return wantsRating ? filters.human_rating === "unknown" : false;
  return candidates.some((entry) => {
    const rating = entry.human_calibrated_rating || entry.ai_inferred_rating || "unknown";
    return matches(filters.human_rating, rating);
  });
}

function propertyById(id) {
  return state.properties.find((property) => property.id === id);
}

function assessmentFor(property_id, item_key) {
  return state.property_assessments.find((entry) => entry.property_id === property_id && entry.item_key === item_key);
}

function officialRatingFor(property_id, item_key) {
  let rating = state.official_ppt_ratings.find((entry) => entry.property_id === property_id && entry.item_key === item_key);
  if (!rating) {
    rating = {
      id: `ppt-${property_id}-${item_key}`,
      property_id,
      item_key,
      official_ppt_rating: assessmentFor(property_id, item_key)?.official_ppt_rating || "unknown",
      source_type: "unknown",
      source_file: "",
      source_note: "",
      confidence: "medium",
      entered_by: currentUser?.email || "",
      entered_at: "",
      discrepancy_with_inferred: false,
      discrepancy_with_calibrated: false,
      review_status: "draft",
    };
    state.official_ppt_ratings.push(rating);
  }
  return rating;
}

function handleRatingScreenshotUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    officialRatingItemKeys.forEach((itemKey) => {
      const rating = officialRatingFor(selectedPptPropertyId, itemKey);
      rating.source_type = "ppt_photo";
      rating.source_file = String(reader.result || "");
      rating.source_note = file.name;
      rating.confidence = rating.confidence || "medium";
      rating.review_status = "uncertain";
    });
    recognizeRatingsForSelectedProperty(file.name);
  });
  reader.readAsDataURL(file);
}

function recognizeRatingsForSelectedProperty(sourceText = "") {
  const recognized = recognizeRatingSequence(sourceText);
  officialRatingItemKeys.forEach((itemKey, index) => {
    const rating = officialRatingFor(selectedPptPropertyId, itemKey);
    if (recognized[index]) {
      rating.official_ppt_rating = recognized[index];
      rating.confidence = "medium";
      rating.review_status = "uncertain";
    }
  });
  saveStatus = recognized.length
    ? `已预填 ${recognized.length} 项评分，请人工确认。`
    : "已上传截图；当前未能预填评分，请人工确认。";
  saveLocalState();
  render();
}

function recognizeRatingSequence(text) {
  const clean = String(text || "").toLowerCase();
  const tokens = [];
  const patterns = [
    ["check", /✓|check|ok|good|\ba\b/g],
    ["tilde", /〜|~|tilde|improv|\bb\b/g],
    ["circle", /〇|○|circle|not demonstrated|\bc\b/g],
    ["cross", /✕|×|x|cross|not adequate|\bd\b/g],
  ];
  patterns.forEach(([rating, pattern]) => {
    const matches = [...clean.matchAll(pattern)].map((match) => ({ rating, index: match.index ?? 0 }));
    tokens.push(...matches);
  });
  return tokens
    .sort((a, b) => a.index - b.index)
    .map((token) => token.rating)
    .slice(0, officialRatingItemKeys.length);
}

async function saveRatingBatch() {
  const form = document.querySelector("#ratingBatchForm");
  if (!form) return;
  const data = new FormData(form);
  const sourceNote = String(data.get("batch_source_note") || "").trim();
  const rows = officialRatingItemKeys.map((itemKey) => {
    const rating = officialRatingFor(selectedPptPropertyId, itemKey);
    rating.official_ppt_rating = data.get(`official_ppt_rating__${itemKey}`);
    rating.confidence = rating.confidence || "medium";
    rating.review_status = rating.official_ppt_rating && rating.official_ppt_rating !== "unknown" ? "confirmed" : "draft";
    rating.source_type = rating.source_file ? "ppt_photo" : rating.source_type || "unknown";
    rating.source_note = sourceNote || rating.source_note || "";
    rating.entered_by = rating.entered_by || currentUser?.email || "";
    rating.entered_at = new Date().toISOString();
    const assessment = assessmentFor(rating.property_id, rating.item_key);
    rating.discrepancy_with_inferred = differs(rating.official_ppt_rating, assessment?.ai_inferred_rating);
    rating.discrepancy_with_calibrated = differs(rating.official_ppt_rating, preMeetingRatingForAssessment(assessment));
    if (assessment) assessment.official_ppt_rating = rating.official_ppt_rating;
    return rating;
  });
  saveLocalState();
  if (supabaseClient) {
    const payload = rows.map((rating) => {
      const next = { ...rating };
      delete next.id;
      return next;
    });
    const { error } = await supabaseClient.from("official_ppt_ratings").upsert(payload, { onConflict: "property_id,item_key" });
    saveStatus = error ? `评分表保存失败：${error.message}` : "评分表已保存到共享数据库。";
  } else {
    saveStatus = "评分表已保存到本机浏览器。";
  }
  render();
}

function selectFilter(key, label, options, formatter = (value) => value) {
  if (filters[key] !== "all" && !options.includes(filters[key])) filters[key] = "all";
  return `
    <label data-filter-key="${escapeAttr(key)}">${escapeHtml(label)}
      <select data-filter="${escapeAttr(key)}">
        <option value="all">All</option>
        ${options.map((value) => `<option value="${escapeAttr(value)}" ${filters[key] === value ? "selected" : ""}>${escapeHtml(formatter(value))}</option>`).join("")}
      </select>
    </label>
  `;
}

function ratingSelect(name, selected) {
  return `<select name="${escapeAttr(name)}">${ratingOptions.map(([value, label]) => `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}</select>`;
}

function renderTopbar(title, subtitle, actions) {
  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(subtitle)}</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <div class="actions">${actions || ""}</div>
    </header>
  `;
}

function metric(label, value) {
  return `<div class="card metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function compactStat(label, count, sublabel = "", href = "/properties") {
  return `<a class="compact-stat" data-route data-route-path="${escapeAttr(href)}" href="${escapeAttr(appPath(href))}">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(count)}</strong>
    ${sublabel ? `<em>${escapeHtml(sublabel)}</em>` : ""}
  </a>`;
}

function dashboardSection(title, body) {
  return `
    <section class="dashboard-section">
      <h2>${escapeHtml(title)}</h2>
      ${body}
    </section>
  `;
}

function criteriaDistributionChart(title, entries, filterKey) {
  return distributionChart(title, entries, filterKey, "value");
}

function assessmentDistributionChart(title, itemKey, columnGroup) {
  const targetGroup = columnGroup === "protection" ? "assessment" : columnGroup;
  return distributionChart(title, assessmentItemDistribution(itemKey), "human_rating", targetGroup, "/properties", { item_key: itemKey });
}

function distributionChart(title, entries, filterKey, columnGroup, baseHref = "/properties", extraParams = {}) {
  const total = Object.values(entries).reduce((sum, count) => sum + count, 0);
  return `
    <div class="panel distribution-panel">
      <h2>${escapeHtml(title)}</h2>
      <div class="bar-list">
        ${Object.entries(entries)
          .map(([label, count]) => {
            const href = chartHref(baseHref, filterKey, label, columnGroup, extraParams);
            return `<a class="bar-row" data-route data-route-path="${escapeAttr(href)}" href="${escapeAttr(appPath(href))}">
              <span class="bar-label">${escapeHtml(formatDistributionLabel(filterKey, label))}</span>
              <span class="bar-track"><span class="bar-fill" style="width: ${barWidth(count, total)}%;"></span></span>
              <span class="bar-value"><strong>${count}</strong><em>${percentage(count, total)}</em></span>
            </a>`;
          })
          .join("") || `<div class="empty">暂无数据</div>`}
      </div>
    </div>
  `;
}

function ratingPill(value) {
  const rating = value || "unknown";
  return `<span class="pill rating-${escapeAttr(rating)}" title="${escapeAttr(formatRating(rating))}">${escapeHtml(ratingGlyph[rating] || "?")}</span>`;
}

function formatRating(value) {
  return ratingGlyph[value] || "?";
}

function compactRatingPill(value) {
  const rating = value || "unknown";
  return `<span class="rating-mark rating-${escapeAttr(rating)}" title="${escapeAttr(formatRating(rating))}">${escapeHtml(ratingGlyph[rating] || "?")}</span>`;
}

function assessmentRatingCell(propertyId, itemKey) {
  const assessment = assessmentFor(propertyId, itemKey);
  return compactRatingPill(assessment?.human_calibrated_rating || assessment?.ai_inferred_rating || "unknown");
}

function heritageTypeFor(property) {
  if (property.heritage_type) return property.heritage_type;
  return heritageTypeFromPropertyType(property.property_type);
}

function heritageTypeFromPropertyType(propertyType) {
  const type = String(propertyType || "").toLowerCase();
  if (type.includes("mixed")) return "Mixed";
  if (type.includes("natural")) return "Natural";
  if (type.includes("cultural")) return "Cultural";
  return "";
}

function categoryOfPropertyFor(property) {
  return normalizeCategoryOfProperty(property.category_of_property) || "待抽取";
}

function categoryOfPropertyValuesFor(property) {
  const values = new Set();
  const primary = categoryOfPropertyFor(property);
  if (primary && primary !== "待抽取") values.add(primary);
  inferredCategoryValuesFromText(property).forEach((value) => values.add(value));
  return values.size ? [...values] : ["待抽取"];
}

function inferredCategoryValuesFromText(property) {
  const raw = String([property.category_of_property_source_note, property.category_of_property].filter(Boolean).join(" ")).replace(/\s+/g, " ").trim();
  if (!raw) return [];
  const lower = raw.toLowerCase();
  const values = new Set();
  const withdrewLandscape = lower.includes("cultural landscape") && (lower.includes("withdrew the proposal") || lower.includes("withdrawn"));
  if (/\bmonuments?\b/.test(lower)) values.add("monument");
  if (/groups?\s+of\s+buildings?|ensembles?\b/.test(lower)) values.add("group of buildings");
  if (/\bsites?\b/.test(lower)) values.add("site");
  if (lower.includes("cultural landscape") && !withdrewLandscape) values.add("cultural landscape");
  return [...values];
}

function categoryOfPropertyAssessment(property) {
  if (property?.id === "C1769") return sidiBouSaidCategoryCorrection;
  const proposed = categoryOfPropertyFor(property);
  const note = simplifyCategorySourceNote(property);
  return { proposed, articleI: proposed, icomosStatus: "", note };
}

function renderCategoryOfPropertyDetail(property) {
  const category = categoryOfPropertyAssessment(property);
  if (property?.id === "C1769") {
    return `
      <span>申报：${escapeHtml(category.proposed)}</span><br>
      <span class="muted">ICOMOS：不认可文化景观类别；Article I: ${escapeHtml(category.articleI)}</span>
    `;
  }
  const note = category.note;
  return `${escapeHtml(category.proposed)}${note ? `<br><span class="muted">${escapeHtml(note)}</span>` : ""}`;
}

function normalizeCategoryOfProperty(value) {
  const text = String(value || "").trim();
  if (!text || text === "Cultural property") return "";
  const lower = text.toLowerCase();
  if (["monument", "monuments"].includes(lower)) return "monument";
  if (["group of buildings", "groups of buildings"].includes(lower)) return "group of buildings";
  if (["site", "sites"].includes(lower)) return "site";
  if (["cultural landscape", "cultural landscapes"].includes(lower)) return "cultural landscape";
  const withdrewLandscape = lower.includes("withdrew the proposal for this category") || lower.includes("withdrawn") && lower.includes("cultural landscape");
  if (lower.includes("cultural landscape") && !withdrewLandscape) return "cultural landscape";
  if (lower.includes("group") && lower.includes("building")) return "group of buildings";
  if (lower.includes("ensemble")) return "group of buildings";
  if (lower.includes("monument")) return "monument";
  if (/\bsite(s)?\b/.test(lower)) return "site";
  return text;
}

function simplifyCategorySourceNote(property) {
  const raw = String(property.category_of_property_source_note || property.category_of_property || "").replace(/\s+/g, " ").trim();
  if (!raw) return "";
  if (raw.length < 160 && /category revised|mixed nomination|OG para\.47|Guiding Principles|proposal withdrawn|ICOMOS assesses cultural values/i.test(raw)) return raw;
  const rawCategory = normalizeCategoryOfProperty(raw);
  if (rawCategory && rawCategory.toLowerCase() === raw.toLowerCase()) return "";
  if (raw.length < 80 && !/article i|operational guidelines|initially|further to|withdraw|serial nomination|nomination of/i.test(raw)) return raw;

  const lower = raw.toLowerCase();
  const parts = [];
  const componentCount = property.component_count || numberFromCategoryText(lower);
  const countText = componentCount ? String(componentCount) : "";
  const category = normalizeCategoryOfProperty(raw);
  const changed = /initially|further to|now submitted|was originally|during the evaluation procedure/i.test(raw);
  const withdrewLandscape = lower.includes("cultural landscape") && (lower.includes("withdrew the proposal") || lower.includes("withdrawn"));

  if (/serial nomination/i.test(raw) || property.is_serial) {
    if (/one monument and one group of buildings/i.test(raw)) parts.push("serial: 1 monument + 1 group of buildings");
    else if (/monuments and groups of buildings/i.test(raw)) parts.push(`serial${countText ? `: ${countText}` : ""} monuments/groups of buildings`);
    else if (/groups of buildings/i.test(raw)) parts.push(`serial${countText ? `: ${countText}` : ""} groups of buildings`);
    else if (/monuments/i.test(raw)) parts.push(`serial${countText ? `: ${countText}` : ""} monuments`);
    else if (/ensembles/i.test(raw)) parts.push(`serial${countText ? `: ${countText}` : ""} ensembles`);
    else if (/sites/i.test(raw)) parts.push(`serial${countText ? `: ${countText}` : ""} sites`);
    else parts.push(`serial${countText ? `: ${countText} components` : ""}`);
  } else if (/extension of an already inscribed serial property/i.test(raw)) {
    parts.push("extension of inscribed serial property");
  }

  if (changed) parts.push("category revised during evaluation");
  if (lower.includes("cultural landscape") && !withdrewLandscape) parts.push("OG para.47: cultural landscape");
  if (withdrewLandscape) parts.push("cultural landscape proposal withdrawn");
  if (lower.includes("site of memory")) parts.push("Guiding Principles: site of memory");
  if (lower.includes("mixed cultural and natural property")) parts.push("mixed nomination; ICOMOS assesses cultural values");

  if (!parts.length && category && category !== "待抽取") return "";
  return uniqueValues(parts).join("; ");
}

function inferSerialInfoFromCategory(property = {}) {
  const raw = String(property.category_of_property_source_note || property.category_of_property || "").replace(/\s+/g, " ").trim();
  const lower = raw.toLowerCase();
  const isSerial =
    Boolean(property.is_serial) ||
    /\bserial\s*:/.test(lower) ||
    /serial nomination|nominated serial property|serial property/i.test(raw) ||
    /extension of an already inscribed serial property/i.test(raw);
  let componentCount = property.component_count ?? null;
  if (isSerial && !componentCount) {
    componentCount = componentCountFromSerialText(raw);
  }
  return { isSerial, componentCount };
}

function componentCountFromSerialText(text) {
  const source = String(text || "");
  if (/1\s+monument\s*\+\s*1\s+group of buildings/i.test(source)) return 2;
  const serialCount = source.match(/\bserial\s*:\s*(\d{1,3})\b/i);
  if (serialCount) return Number(serialCount[1]);
  return numberFromCategoryText(source);
}

function numberFromCategoryText(text) {
  const numeric = String(text || "").match(/\b(\d{1,3})\b/);
  if (numeric) return Number(numeric[1]);
  const words = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    thirteen: 13,
    eighteen: 18,
    nineteen: 19,
    "forty-eight": 48,
  };
  const match = String(text || "").match(/\b(one|two|three|four|five|six|seven|eight|nine|ten|thirteen|eighteen|nineteen|forty-eight)\b/);
  return match ? words[match[1]] : null;
}

function normalizeCriteriaList(value) {
  if (!value) return [];
  const list = Array.isArray(value) ? value : String(value).split(/[,;，、\s]+/);
  return uniqueValues(
    list
      .map((item) => String(item || "").trim().replace(/[()]/g, "").toLowerCase())
      .filter((item) => WORLD_HERITAGE_CRITERIA.includes(item)),
  );
}

function normalizeRatingValue(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return "unknown";
  const mapped = {
    a: "check",
    b: "tilde",
    c: "circle",
    d: "cross",
    ok: "check",
    good: "check",
    check: "check",
    "✓": "check",
    "✔": "check",
    tilde: "tilde",
    "~": "tilde",
    "〜": "tilde",
    circle: "circle",
    "○": "circle",
    "〇": "circle",
    cross: "cross",
    "x": "cross",
    "✕": "cross",
    "×": "cross",
    na: "not_applicable",
    "n/a": "not_applicable",
    "n.a.": "not_applicable",
    "not applicable": "not_applicable",
    "not_applicable": "not_applicable",
    "不适用": "not_applicable",
    unknown: "unknown",
    pending: "unknown",
  };
  return mapped[text] || levelToRating[String(value || "").trim().toUpperCase()] || (ratingGlyph[text] ? text : "unknown");
}

function normalizeHeritageStatus(value) {
  const text = String(value || "").trim();
  const lower = text.toLowerCase();
  if (lower.includes("world heritage")) return "World Heritage";
  if (lower.includes("tentative")) return "Tentative List";
  if (lower.includes("not listed") || lower.includes("non-listed")) return "Not listed";
  return "Unknown";
}

function comparatorCountryFromStatus(value) {
  const text = String(value || "").trim();
  const country = text.split(",")[0]?.replace(/\bcriteria\b.*$/i, "").trim();
  return country || "";
}

function cleanImportedText(value) {
  return stripPdfPageNumberArtifacts(String(value || ""))
    .replace(/\r\n?/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/[ \t]*\n[ \t]*/g, " ").replace(/[ \t]{2,}/g, " ").trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function stripPdfPageNumberArtifacts(value) {
  return String(value || "")
    .replace(/([.!?])\s+(\d{1,4})\s+(?=(?:[A-Z][A-Za-z]+|ICOMOS|The State Party|Second|Third|Fourth|Fifth|Furthermore|However|According|In addition)\b)/g, (match, punctuation, _page, offset, source) => {
      const previousWord = source.slice(Math.max(0, offset - 24), offset).match(/([A-Za-z]+)$/)?.[1]?.toLowerCase() || "";
      if (["p", "pp", "para", "paras", "fig", "table", "art", "no", "nos", "vol", "ed"].includes(previousWord)) return match;
      return `${punctuation} `;
    })
    .replace(/([。！？])\s*\d{1,4}\s*(?=[\u4e00-\u9fff])/g, "$1");
}

function normalizeNominationTypeValue(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const lower = text.toLowerCase().replace(/[_-]+/g, " ");
  const mapped = {
    "new nomination": "New nomination",
    "emergency nomination": "Emergency nomination",
    "re nomination": "Re-nomination",
    renomination: "Re-nomination",
    "referred back nomination": "Referred back nomination",
    "significant boundary modification": "Significant boundary modification",
    "minor boundary modification": "Minor boundary modification",
    extension: "Extension",
    withdrawal: "Withdrawal",
    withdrawn: "Withdrawal",
  };
  return mapped[lower] || text;
}

function normalizeRecommendationValue(value) {
  return normalizeRecommendation(value);
}

function pickKnownColumns(row, columns) {
  return columns.reduce((next, key) => {
    if (Object.prototype.hasOwnProperty.call(row, key)) next[key] = row[key];
    return next;
  }, {});
}

function categoryOfPropertyFilterOptions() {
  const extras = uniqueValues(state.properties.flatMap(categoryOfPropertyValuesFor)).filter((value) => !CATEGORY_OF_PROPERTY_VALUES.includes(value));
  return [...CATEGORY_OF_PROPERTY_VALUES, ...extras];
}

function categoryOfPropertyLabel(value) {
  return value;
}

function criterionFilterOptions() {
  const known = new Set(WORLD_HERITAGE_CRITERIA);
  state.properties.forEach((property) => {
    [...(property.proposed_criteria || []), ...(property.icomos_recommended_criteria || []), ...(property.committee_confirmed_criteria || [])].forEach((criterion) => {
      if (criterion) known.add(criterion);
    });
  });
  return [...known].sort((a, b) => criterionSortIndex(a) - criterionSortIndex(b) || String(a).localeCompare(String(b)));
}

function criterionLabel(value) {
  return `Criterion ${value}`;
}

function criterionSortIndex(value) {
  const index = WORLD_HERITAGE_CRITERIA.indexOf(value);
  return index === -1 ? WORLD_HERITAGE_CRITERIA.length : index;
}

function renderCategoryOfPropertyCell(property) {
  return renderCategoryOfPropertyDetail(property);
}

function regionFilterOptions() {
  const extras = uniqueValues(state.properties.map((property) => property.region)).filter((region) => !UNESCO_REGIONS.includes(region));
  return [...UNESCO_REGIONS, ...extras];
}

function recommendationFilterOptions() {
  const extras = uniqueValues(state.properties.map((property) => property.icomos_recommendation)).filter((value) => !ICOMOS_RECOMMENDATION_CATEGORIES.includes(value));
  return [...ICOMOS_RECOMMENDATION_CATEGORIES, ...extras];
}

function nominationTypeFilterOptions() {
  const extras = uniqueValues(state.properties.map((property) => property.nomination_type)).filter((value) => !NOMINATION_TYPE_CATEGORIES.includes(value));
  return [...NOMINATION_TYPE_CATEGORIES, ...extras];
}

function nominationTypeLabel(value) {
  return {
    "New nomination": "新申报",
    "Emergency nomination": "紧急申报",
    "Re-nomination": "重报",
    "Referred back nomination": "补报",
    "Significant boundary modification": "重大边界调整",
    "Minor boundary modification": "小幅边界调整",
    Extension: "扩展",
    Withdrawal: "撤回",
    "待校核": "待校核",
  }[value] || value;
}

function inferNominationType(row) {
  const id = String(row.property_id || "");
  const name = String(row.property_name_en || "");
  const recommendation = normalizeRecommendation(row.recommendation);
  if (recommendation === "Approval" || id.toLowerCase().includes("bis") || /extension|boundary/i.test(name)) return "Significant boundary modification";
  return "New nomination";
}

function normalizeNominationType(value, property = {}) {
  const text = normalizeNominationTypeValue(value);
  if (text && text !== "To be completed") return text;
  return inferNominationType({
    property_id: property.id,
    property_name_en: property.property_name_en,
    recommendation: property.icomos_recommendation,
  });
}

function normalizeRecommendation(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const lower = text.toLowerCase();
  if (lower.includes("approved") || lower.includes("approval")) return "Approval";
  if (lower.includes("withdrawn") || lower.includes("withdrawal")) return "Withdrawal";
  if (lower.includes("not available")) return "";
  const firstPart = text.split(",")[0].trim();
  return ICOMOS_RECOMMENDATION_CATEGORIES.includes(firstPart) ? firstPart : text;
}

function recommendationNote(value) {
  const text = String(value || "").trim();
  const commaIndex = text.indexOf(",");
  return commaIndex >= 0 ? text.slice(commaIndex + 1).trim() : "";
}

function renderRecommendationCell(property) {
  return escapeHtml(property.icomos_recommendation || "");
}

function renderSerialCell(property) {
  const serial = property.is_serial ? "serial" : "non-serial";
  const count = property.component_count ? `${property.component_count} components` : "components 待补";
  return `${escapeHtml(serial)}<br><span class="muted">${escapeHtml(count)}</span>`;
}

function renderSerialSelectionCell(property) {
  const edit = narrativePayload(property.id, "serial");
  const assessment = assessmentFor(property.id, "serial_selection");
  const hasEditedSummary = Object.prototype.hasOwnProperty.call(edit.entries || {}, "serial_selection");
  const hasEditedSource = Object.prototype.hasOwnProperty.call(edit.entries_en || {}, "serial_selection");
  const editedRating = normalizeRatingValue((edit.assessment_ratings || {}).serial_selection || "");
  const rating =
    editedRating !== "unknown"
      ? editedRating
      : assessment?.human_calibrated_rating || assessment?.ai_inferred_rating || (property.is_serial ? "unknown" : "not_applicable");
  const editedSummary = hasEditedSummary ? (edit.entries || {}).serial_selection : "";
  const editedSource = hasEditedSource ? (edit.entries_en || {}).serial_selection : "";
  const summary =
    hasEditedSummary || hasEditedSource
      ? editedSummary || editedSource || "已修订，待补中文整理。"
      : assessment?.conclusion_zh || assessment?.rationale_zh || (property.is_serial ? "待抽取" : "非系列遗产");
  if (!property.is_serial && !summary) return "非系列遗产";
  return `${ratingPill(rating)}<br><span class="muted">${escapeHtml(summary)}</span>`;
}

function isTransnationalProperty(property) {
  return Boolean(property.is_transnational || String(property.state_party || "").includes("/"));
}

function transnationalLabel(value) {
  return value === "transnational" ? "跨境遗产" : "非跨境遗产";
}

function criteriaText(criteria) {
  return escapeHtml((criteria || []).join(", "));
}

function attributesForProperty(propertyId) {
  return state.attributes.filter((entry) => entry.property_id === propertyId);
}

function recommendationsForProperty(propertyId) {
  return state.recommendations.filter((entry) => entry.property_id === propertyId);
}

function renderAttributeOverviewCell(property) {
  const edit = narrativePayload(property.id, "attributes");
  const detailSource = attributesSummaryForDisplay(property, edit.summary_en || "");
  const detailSummary = attributesSummaryZhForDisplay(property, edit.summary || "");
  const detailText = attributeOverviewTextForList(detailSummary, detailSource);
  if (detailText) return `<strong>ICOMOS 综述</strong><br><span class="muted">${escapeHtml(detailText)}</span>`;

  const attributes = attributesForProperty(property.id);
  const central = attributes.find((entry) => entry.source_layer === "central_attributes_statement" && !isGenericAttributeOverview(entry.summary_zh || entry.summary_en || entry.attribute_name_zh || "")) ||
    attributes.find((entry) => !isGenericAttributeOverview(entry.summary_zh || entry.summary_en || entry.attribute_name_zh || entry.attribute_name_en || entry.attribute_group || ""));
  if (!central) return "待补";
  const name = central.attribute_name_zh || central.attribute_name_en || central.attribute_group;
  const summary = central.summary_zh || central.summary_en || "";
  return `<strong>${escapeHtml(name || "Attributes")}</strong>${summary ? `<br><span class="muted">${escapeHtml(summary)}</span>` : ""}`;
}

function attributeOverviewTextForList(summary, source) {
  const cleanSummary = cleanImportedText(summary || "");
  if (cleanSummary && !isGenericAttributeOverview(cleanSummary) && !/^待抽取/.test(cleanSummary)) return listExcerpt(cleanSummary);
  const cleanSource = cleanImportedText(source || "");
  if (cleanSource && !isGenericAttributeOverview(cleanSource)) return listExcerpt(cleanSource);
  return "";
}

function isGenericAttributeOverview(text) {
  return /central_statement|集中列明支撑OUV的主要属性|本条保留原文|后续可在页面中继续细分属性组|待抽取 ICOMOS Attributes/i.test(String(text || ""));
}

function listExcerpt(text, limit = 180) {
  const cleaned = displayParagraphs(text).join(" ").replace(/[ \t]{2,}/g, " ").trim();
  return cleaned.length > limit ? `${cleaned.slice(0, limit).trim()}...` : cleaned;
}

function renderAttributeNoteCell(property) {
  const notes = attributesForProperty(property.id)
    .map((entry) => entry.analyst_note)
    .filter(Boolean);
  return notes[0] ? escapeHtml(notes[0]) : "待批注";
}

function renderIcomosDraftPmCell(property) {
  const finalRecommendations = recommendationsForProperty(property.id).filter((entry) =>
    ["legal protection", "buffer zone", "conservation programme", "risk preparedness", "management", "visitor management", "tourism management", "monitoring", "HIA / impact assessment"].some((keyword) =>
      String(entry.recommendation_category || "").toLowerCase().includes(keyword.toLowerCase()),
    ),
  );
  if (!finalRecommendations.length) return "待抽取";
  return finalRecommendations
    .slice(0, 2)
    .map((entry) => escapeHtml(entry.summary_zh || entry.text_en || entry.recommendation_category || ""))
    .join("<br>");
}

function renderCommitteePmCell(property) {
  return escapeHtml(property.committee_pm_requirements || "待录入");
}

function renderResearchNoteCell(property) {
  const note = researchNoteText(property.id);
  return note ? escapeHtml(listExcerpt(note, 160)) : "待记录";
}

function researchNoteText(propertyId) {
  const payload = narrativePayload(propertyId, "research_notes");
  return String(payload.note || payload.summary || "").trim();
}

function columnGroupLabel(value) {
  return {
    all: "全部栏目",
    basic: "基础与类型",
    assessment: "价值标准与评估表",
    attributes: "Attributes",
    conclusion: "结论与要求",
  }[value] || value;
}

function nominationTypeDistribution() {
  return orderedCount(state.properties, "nomination_type", NOMINATION_TYPE_CATEGORIES);
}

function nominationRecommendationDistribution() {
  const nominationRows = state.properties.filter((property) => !isBoundaryNomination(property));
  return orderedCount(nominationRows, "icomos_recommendation", ["Inscription", "Referral", "Deferral", "Non-inscription", "Withdrawal"]);
}

function boundaryRecommendationDistribution() {
  const boundaryRows = state.properties.filter(isBoundaryNomination);
  return orderedCount(boundaryRows, "icomos_recommendation", ["Approval", "Referral", "Deferral", "Non-inscription"]);
}

function committeeDecisionDistribution() {
  return orderedCount(
    state.properties.map((property) => ({ committee_decision_category: committeeDecisionCategory(property) })),
    "committee_decision_category",
    ["Inscription", "Referral", "Deferral", "Non-inscription", "Approval", "Withdrawal", "待录入", "Other"],
  );
}

function committeeCriteriaDistribution() {
  return criteriaDistribution("committee_confirmed_criteria");
}

function committeeChangedRecommendationDistribution() {
  const order = ["Inscription", "Referral", "Deferral", "Non-inscription"];
  const counts = Object.fromEntries(order.map((label) => [label, 0]));
  state.properties.forEach((property) => {
    const changeFrom = committeeChangeFrom(property);
    if (changeFrom) counts[changeFrom] += 1;
  });
  return counts;
}

function committeeDecisionCategory(property) {
  const text = String(property.committee_decision || "").trim();
  if (!text) return "待录入";
  const lower = text.toLowerCase();
  if (/non[-\s]?inscription|not\s+(to\s+)?inscribe|不予?列入|不列入/.test(lower)) return "Non-inscription";
  if (/referral|referred|refer back|发还|退回/.test(lower)) return "Referral";
  if (/deferral|deferred|推迟|延期/.test(lower)) return "Deferral";
  if (/withdrawal|withdrawn|撤回/.test(lower)) return "Withdrawal";
  if (/approval|approved|批准|通过/.test(lower)) return "Approval";
  if (/inscription|inscribed|列入/.test(lower)) return "Inscription";
  return "Other";
}

function committeeChangeFrom(property) {
  if (property.nomination_type !== "New nomination") return "";
  const recommendation = normalizeRecommendation(property.icomos_recommendation);
  if (!["Inscription", "Referral", "Deferral", "Non-inscription"].includes(recommendation)) return "";
  const decision = committeeDecisionCategory(property);
  if (["待录入", "Other"].includes(decision)) return "";
  return decision !== recommendation ? recommendation : "";
}

function isBoundaryNomination(property) {
  return ["Significant boundary modification", "Minor boundary modification", "Extension"].includes(property.nomination_type) || property.icomos_recommendation === "Approval";
}

function matchesNominationScope(scope, property) {
  if (scope === "all") return true;
  if (scope === "boundary") return isBoundaryNomination(property);
  if (scope === "new") return property.nomination_type === "New nomination";
  if (scope === "renomination") return property.nomination_type === "Re-nomination";
  return true;
}

function regionDistribution() {
  return orderedCount(state.properties, "region", UNESCO_REGIONS);
}

function categoryOfPropertyDistribution() {
  const counts = {};
  state.properties.forEach((property) => {
    categoryOfPropertyValuesFor(property).forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
  });
  const ordered = {};
  CATEGORY_OF_PROPERTY_VALUES.forEach((value) => {
    if (counts[value]) ordered[value] = counts[value];
  });
  Object.keys(counts)
    .filter((value) => !Object.prototype.hasOwnProperty.call(ordered, value))
    .sort((a, b) => a.localeCompare(b))
    .forEach((value) => {
      ordered[value] = counts[value];
    });
  return ordered;
}

function proposedCriteriaDistribution() {
  return criteriaDistribution("proposed_criteria");
}

function icomosCriteriaDistribution() {
  return criteriaDistribution("icomos_recommended_criteria");
}

function criteriaDistribution(field) {
  const counts = {};
  WORLD_HERITAGE_CRITERIA.forEach((criterion) => {
    counts[criterion] = state.properties.filter((property) => (property[field] || []).includes(criterion)).length;
  });
  return counts;
}

function assessmentItemDistribution(itemKey) {
  const rows = state.properties.map((property) => {
    const assessment = assessmentFor(property.id, itemKey);
    return {
      rating: assessment?.human_calibrated_rating || assessment?.ai_inferred_rating || "unknown",
    };
  });
  return orderedCount(rows, "rating", ["check", "tilde", "circle", "cross", "unknown"]);
}

function orderedCount(rows, key, order) {
  const counts = countBy(rows, key, (value) => value || "待补");
  const ordered = {};
  order.forEach((value) => {
    if (counts[value]) ordered[value] = counts[value];
  });
  Object.keys(counts)
    .filter((value) => !Object.prototype.hasOwnProperty.call(ordered, value))
    .sort((a, b) => a.localeCompare(b))
    .forEach((value) => {
      ordered[value] = counts[value];
    });
  return ordered;
}

function chartHref(baseHref, filterKey, label, columnGroup, extraParams = {}) {
  const params = new URLSearchParams();
  if (columnGroup) params.set("column_group", columnGroup);
  Object.entries(extraParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") params.set(key, value);
  });
  params.set(filterKey, label);
  return `${baseHref}?${params.toString()}`;
}

function formatDistributionLabel(filterKey, label) {
  if (filterKey === "human_rating") return formatRating(label);
  if (filterKey === "nomination_type") return nominationTypeLabel(label);
  if (filterKey === "serial") return label === "serial" ? "系列遗产" : "非系列遗产";
  if (filterKey === "transnational") return transnationalLabel(label);
  if (filterKey === "proposed_criterion" || filterKey === "icomos_criterion" || filterKey === "committee_criterion") return `Criterion ${label}`;
  if (filterKey === "committee_change_from") return `${label} 被更改`;
  return label;
}

function percentage(count, total) {
  if (!total) return "0%";
  return `${Math.round((count / total) * 100)}%`;
}

function barWidth(count, total) {
  if (!total || !count) return 0;
  return Math.max(4, Math.round((count / total) * 100));
}

function labelForItem(item_key) {
  return state.assessment_items.find((item) => item.item_key === item_key)?.label_en || assessmentItems.find((item) => item.item_key === item_key)?.label_en || item_key;
}

function countBy(rows, key, formatter = (value) => value || "未填") {
  return rows.reduce((acc, row) => {
    const label = formatter(row[key]);
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function matches(filterValue, actualValue) {
  return filterValue === "all" || filterValue === (actualValue || "");
}

function matchesArray(filterValue, actualValues) {
  return filterValue === "all" || (actualValues || []).includes(filterValue);
}

function differs(a, b) {
  return a && b && a !== "unknown" && b !== "unknown" && a !== b;
}

function isActiveRoute(route, href) {
  if (href === "/") return route === "/";
  return route === href || route.startsWith(`${href}/`);
}

function regionGuess(stateParty) {
  const africa = ["Comoros", "Sao Tome and Principe"];
  const arab = ["Tunisia"];
  const asia = ["China", "India", "Iran", "Japan", "Kazakhstan", "Kazakhstan/Kyrgyzstan/Tajikistan/Uzbekistan", "Mongolia", "Thailand", "Uzbekistan"];
  const europe = ["Finland", "France", "Germany", "Greece", "Italy", "Portugal", "Spain", "Türkiye"];
  const latinAmerica = ["Brazil"];
  if (africa.includes(stateParty)) return "Africa";
  if (arab.includes(stateParty)) return "Arab States";
  if (asia.includes(stateParty)) return "Asia and the Pacific";
  if (europe.includes(stateParty)) return "Europe and North America";
  if (latinAmerica.includes(stateParty)) return "Latin America and the Caribbean";
  return "";
}

function pageGuess(note) {
  const match = String(note || "").match(/pp?\.\s*(\d+)/i);
  return match ? Number(match[1]) : null;
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

init();
