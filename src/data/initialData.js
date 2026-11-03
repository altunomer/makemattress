export const availableLanguages = [
  { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'pt', label: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱', dir: 'ltr' },
  { code: 'ka', label: 'ქართული', flag: '🇬🇪', dir: 'ltr' },
  { code: 'ga', label: 'Gaeilge', flag: '🇮🇪', dir: 'ltr' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', label: '中文', flag: '🇨🇳', dir: 'ltr' }
];

export const initialSliders = [
  {
    id: 1,
    title: "Direct Foreign Trade & Logistics",
    tagline: "GLOBAL CONTAINER FREIGHT & EXPORT",
    subtitle: "Bypass MOQ limitations with consolidated mixed-load container shipments. Direct factory-to-port export from Kayseri, Türkiye to over 35 countries.",
    buttonText: "Explore Products",
    link: "#products",
    secondaryButtonText: "Mixed Container",
    secondaryLink: "#container-info",
    badge: "35+ Global Export Markets",
    image: "/images/slider-foreign-trade.jpg",
    active: true
  },
  {
    id: 2,
    title: "Mattress Springs, Wire & Hardware",
    tagline: "INDUSTRIAL HARDWARE & FASTENING",
    subtitle: "High-tensile pneumatic staples, pocket spring wire, hog rings, and heavy-duty assembly fasteners engineered for automated production lines.",
    buttonText: "Hardware Components",
    link: "#products",
    secondaryButtonText: "Quality Standards",
    secondaryLink: "#quality",
    badge: "Heavy-Duty Fastening Systems",
    image: "/images/slider-hardware.jpg",
    active: true
  },
  {
    id: 3,
    title: "All in One Hand Supply",
    tagline: "CONSOLIDATED B2B PROCUREMENT",
    subtitle: "Consolidate tapes, chemicals, nonwoven textiles, and hardware under one single invoice with unified customs clearance and certified quality control.",
    buttonText: "View Products",
    link: "#products",
    secondaryButtonText: "Request Quotation",
    secondaryLink: "#contact",
    badge: "Single-Source Partner",
    image: "/images/slider-logistics.jpg",
    active: true
  }
];

export const initialCategories = [
  { id: "all", name: "All Components", icon: "Layers" },
  { id: "packaging", name: "Packaging & Films", icon: "Package" },
  { id: "adhesives", name: "Chemicals & Adhesives", icon: "FlaskConical" },
  { id: "tapes", name: "Tapes & Accessories", icon: "Ribbon" },
  { id: "textiles", name: "Textiles, Felts & Covers", icon: "Sparkles" },
  { id: "hardware", name: "Springs & Hardware", icon: "Boxes" }
];

export const initialProducts = [
  {
    id: 1,
    slug: "mattress-tape",
    name: "Mattress Tape & Binding Ribbon",
    category: "tapes",
    categoryName: "Tapes & Accessories",
    subtitle: "Wide Options, Customized Weaving & Jacquard Designs",
    description: "Unique solutions for mattress edge binding with a wide range of creative designs. We weave high-tensile jacquard, herringbone, twill, and plain weave mattress tapes tailored to your machine specifications.",
    specs: {
      "Width Options": "28mm, 32mm, 35mm, 38mm, 42mm",
      "Material": "100% High-Tenacity Polyester / Polypropylene",
      "Roll Length": "100m - 150m continuous rolls",
      "Customization": "Woven brand name, metallic yarn, customized Pantone shades",
      "MOQ": "Mixed container flexible / 3,000 meters"
    },
    thumb: "/images/mattress-tape-color.jpg",
    gallery: [
      "/images/mattress-tape-g1.png",
      "/images/mattress-tape-g2.png",
      "/images/mattress-tape-g3.png"
    ],
    video: "https://www.youtube.com/embed/zzrhdLT98OY",
    featured: true,
    inStock: true,
    moqInfo: "Low MOQ via Mixed Container",
    translations: {
      tr: {
        name: "Yatak Kenar Şeridi & Fitil (Mattress Tape)",
        subtitle: "Geniş Desen Seçenekleri, Özel Jakar ve Dokuma Çözümleri",
        description: "Yatak kenar kapama ve fitil işlemleriniz için zengin tasarım ve yüksek mukavemetli çözümler. Hayalinizdeki deseni, marka logonuzu ve renk kombinasyonlarını yatak fitillerinize uyguluyoruz."
      },
      de: {
        name: "Matratzenband & Einfassband",
        subtitle: "Breite Optionen, maßgeschneiderte Jacquard-Weberei",
        description: "Hochfeste Einfassbänder für Matratzenränder mit individuellen Designs, eingewebten Markenlogos und höchster Reißfestigkeit für industrielle Steppmaschinen."
      },
      fr: {
        name: "Galon et Ruban de Bordure pour Matelas",
        subtitle: "Large Choix de Motifs, Tissage Jacquard Sur Mesure",
        description: "Solutions élégantes pour la fermeture des bordures de matelas. Rubans haute ténacité avec tissage jacquard personnalisé et nom de marque intégré."
      },
      es: {
        name: "Cinta para Colchones y Ribetes",
        subtitle: "Amplia Gama, Tejidos Jacquard Personalizados",
        description: "Cintas de ribete de alta resistencia para el acabado perimetral de colchones. Diseños personalizados con el logotipo de su marca y colores a medida."
      },
      it: {
        name: "Fettuccia e Nastro per Bordo Materasso",
        subtitle: "Ampia Scelta, Tessitura Jacquard Personalizzata",
        description: "Nastri ad alta resistenza per bordatura materassi con loghi intessuti e colori a campione."
      },
      pt: {
        name: "Fita de Borda para Colchões (Vivos)",
        subtitle: "Várias Opções, Tecelagem Jacquard Personalizada",
        description: "Fitas de alta tenacidade para fechamento de colchões com acabamento premium e gravação de logotipo."
      },
      nl: {
        name: "Matrasband & Bieslint",
        subtitle: "Brede Keuze, Maatwerk Jacquard Weefsels",
        description: "Hoogwaardige bieslinten voor matrasranden, slijtvast en perfect compatibel met automatische naaimachines."
      },
      pl: {
        name: "Taśma Lamówka do Materacy",
        subtitle: "Szeroki Wybór Wzorów, Indywidualny Żakard",
        description: "Wytrzymałe taśmy lamówkowe do zamykania krawędzi materacy z możliwością wplecenia logo marki."
      },
      ka: {
        name: "მოლენტის ლენტი მატრასის კიდეებისთვის",
        subtitle: "მრავალფეროვანი დიზაინი და ჟაკარდის ქსოვა",
        description: "მაღალი გამძლეობის ლენტები მატრასის კიდეების შესაკერად, ინდივიდუალური ლოგოთი და ზომებით."
      },
      ga: {
        name: "Téip Imeall Tochta",
        subtitle: "Roghanna Leathana, Fíodóireacht Jacquard Saincheaptha",
        description: "Téipeanna ardghreama d'imeall tochta déanta de réir sonraíochtaí do mheaisíní."
      },
      ru: {
        name: "Окантовочная лента для матрасов",
        subtitle: "Широкий выбор жаккардовых узоров",
        description: "Высокопрочные окантовочные ленты для закрытия краев матраса. Индивидуальный дизайн и логотип."
      },
      ar: {
        name: "شريط حواف المراتب (شريط الكوتور)",
        subtitle: "خيارات واسعة، نسج جاكار مخصص وتصاميم فريدة",
        description: "أشرطة حواف عالية المتانة مخصصة لتشطيب حواف المراتب بأحدث تصاميم الجاكار وشعارات مخصصة."
      },
      zh: {
        name: "床垫包边带 (提花织带)",
        subtitle: "多种规格，高拉力提花定制",
        description: "专业床垫边缘缝合高强度织带，支持定制品牌提花图案和多种色号规格。"
      }
    }
  },
  {
    id: 2,
    slug: "pe-films-packaging-materials",
    name: "PE Films & Packaging Materials",
    category: "packaging",
    categoryName: "Packaging & Films",
    subtitle: "Heavy-Duty PE Film Rolls, Gusseted & Perforated Bags",
    description: "Bedding and furniture manufacturers require cost-effective, high-puncture-resistant packaging to protect finished goods from dust, moisture, and scuffing during storage and international container transit.",
    specs: {
      "Thickness Range": "40 micron - 180 micron (Co-extruded LDPE / LLDPE)",
      "Roll Width": "Up to 3,200 mm flat or center-folded",
      "Features": "Anti-static, UV stabilized, corona-treated for printing",
      "Formats": "Continuous rolls, perforated tear-off bags, gusseted tubes",
      "MOQ": "Mixed container flexible / 1,000 kg"
    },
    thumb: "/images/pe-film-color.jpg",
    gallery: [
      "/images/pe-films-packaging-materials-g1.png",
      "/images/pe-films-packaging-materials-g2.png",
      "/images/pe-films-packaging-materials-g3.png"
    ],
    video: "https://www.youtube.com/embed/EoOw9fC77Vg",
    featured: true,
    inStock: true,
    moqInfo: "Mixed container consolidated",
    translations: {
      tr: {
        name: "PE Ambalaj Filmleri & Rulo Torbalar",
        subtitle: "Ağır Hizmet PE Rulolar, Perfore ve Körüklü Yatak Torbaları",
        description: "Yatak ve mobilya üreticilerinin ürünlerini depolama ve uluslararası sevkiyat sırasında kirlenme, çizilme ve neme karşı koruyan yüksek dayanımlı polietilen ambalaj çözümleri."
      },
      de: {
        name: "PE-Verpackungsfolien & Matratzenbeutel",
        subtitle: "Hochleistungs-PE-Rollen, perforierte und gefaltete Säcke",
        description: "Reißfeste und feuchtigkeitsbeständige Schutzfolien für Matratzen- und Möbelhersteller, optimiert für automatische Verpackungs- und Rollpack-Anlagen."
      },
      fr: {
        name: "Films PE et Matériaux d'Emballage",
        subtitle: "Rouleaux de Film PE Haute Résistance, Housses Perforées",
        description: "Emballages polyéthylène haute résistance protégeant les matelas contre la poussière et l'humidité pendant le transport maritime."
      },
      es: {
        name: "Filmes PE y Materiales de Embalaje",
        subtitle: "Bobinas de Film PE, Bolsas Perforadas y con Fuelle",
        description: "Soluciones de embalaje en polietileno de alta resistencia para proteger colchones terminados contra la humedad y polvo."
      },
      it: {
        name: "Film PE e Materiali da Imballaggio",
        subtitle: "Bobine in Polietilene e Sacchi Perforati per Materassi",
        description: "Film protettivi multistrato per imballo automatico e spedizioni internazionali di materassi."
      },
      pt: {
        name: "Filmes PE e Materiais de Embalagem",
        subtitle: "Bobinas PE Reforçadas e Sacos Perfurados",
        description: "Filmes em polietileno coextrusado para proteção máxima de colchões no transporte em contêineres."
      },
      nl: {
        name: "PE Verpakkingsfolies & Matrashoezen",
        subtitle: "Scheurbestendige PE-rollen & geperforeerde zakken",
        description: "Optimale bescherming tegen vocht en vuil tijdens internationaal containertransport."
      },
      pl: {
        name: "Folie PE i Materiały Opakowaniowe",
        subtitle: "Grube Folie PE, Worki Perforowane i Rękawy",
        description: "Wysokiej jakości folie polietylenowe zabezpieczające materace przed zabrudzeniem i wilgocią."
      },
      ka: {
        name: "პოლიეთილენის შესაფუთი ფირები და ტომრები",
        subtitle: "მაღალი გამძლეობის PE რულონები მატრასებისთვის",
        description: "მატრასების საიმედო დაცვა მტვრისა და ტენიანობისგან საერთაშორისო გადაზიდვისას."
      },
      ga: {
        name: "Scannáin Corpoilte PE & Ábhair Pacáistithe",
        subtitle: "Rollaí Scannáin PE Tromshaothair do Thochtaí",
        description: "Pacáistiú láidir cosanta in aghaidh deannaigh agus taise le haghaidh allmhairiúcháin."
      },
      ru: {
        name: "Полиэтиленовая пленка и упаковочные материалы",
        subtitle: "Рулоны полиэтиленовой пленки, перфорированные пакеты",
        description: "Прочная упаковка для защиты готовых матрасов от грязи и влаги при складировании и перевозках."
      },
      ar: {
        name: "أغشية بولي إيثيلين ومواد التغليف",
        subtitle: "لفائف بولي إيثيلين سميكة، أكياس مثقوبة للتحميل",
        description: "حلول تغليف متطورة تحمي المراتب من الأوساخ والرطوبة والاحتكاك أثناء النقل البحري."
      },
      zh: {
        name: "PE包装薄膜及连卷袋",
        subtitle: "重型聚乙烯卷膜，防尘防潮穿孔袋",
        description: "高抗刺穿PE薄膜，为床垫仓储和海运拼箱提供全方位防水防污保护。"
      }
    }
  },
  {
    id: 3,
    slug: "felt",
    name: "Thermobonded Felt & Isolation Pads",
    category: "textiles",
    categoryName: "Textiles, Felts & Covers",
    subtitle: "Hard & Soft Options, Needled & Thermobonded Duo Pads",
    description: "High-density needle-punched and thermobonded cotton and synthetic felt pads engineered for mattress spring insulation, noise dampening, and long-lasting structural support.",
    specs: {
      "Weight Range": "400 gsm up to 1,500 gsm",
      "Form Factors": "Cut-to-size mattress sheets or continuous roll stock",
      "Density Grades": "Soft flexible, medium firm, ultra-hard spring isolation",
      "Raw Materials": "Recycled cotton, polyester, thermobond fibers",
      "MOQ": "Consolidated container friendly"
    },
    thumb: "/images/felt-color.jpg",
    gallery: [
      "/images/felt-g1.png",
      "/images/felt-g2.png"
    ],
    video: "",
    featured: true,
    inStock: true,
    moqInfo: "Custom sheet cut included",
    translations: {
      tr: {
        name: "Termobond & İğnelenmiş Keçe Levhalar",
        subtitle: "400 gr - 1500 gr Sert, Yumuşak ve Çift Katlı Keçe Seçenekleri",
        description: "Yay izolasyonu ve yatak mukavemetini artıran, yüksek yoğunluklu iğneli ve termobond keçe plakaları. İstenilen yatak ölçülerine göre ebatlanmış olarak sevk edilir."
      },
      de: {
        name: "Thermobond-Filz & Isolierplatten",
        subtitle: "400 g/m² bis 1500 g/m², harte und weiche Varianten",
        description: "Nadelfilz- und Thermobond-Platten für Federkernisolierung, akustische Dämpfung und dauerhafte Stabilität im Matratzeninneren."
      },
      fr: {
        name: "Feutre Thermolié et Plaques d'Isolation",
        subtitle: "400 g/m² à 1500 g/m², Versions Dures et Souples",
        description: "Plaques de feutre aiguilleté et thermolié pour isoler les ressorts et renforcer la structure du matelas."
      },
      es: {
        name: "Fieltro Termofijado y Placas Aislantes",
        subtitle: "400 gr a 1500 gr, Opciones Blandas, Duras y Dúo",
        description: "Fieltro punzonado y termofijado de alta densidad para aislar los muelles del colchón."
      },
      it: {
        name: "Feltro Termolegato e Lastre Isolanti",
        subtitle: "Da 400 a 1500 g/m², Opzioni Rigide e Morbide",
        description: "Feltri agugliati ad alta densità per l'isolamento del molleggio e supporto indeformabile."
      },
      pt: {
        name: "Feltro Termoligado e Placas Isolantes",
        subtitle: "400g a 1500g, Opções Rígidas e Flexíveis",
        description: "Feltro resinado e termofixado para isolamento de molas e estruturação interna de colchões."
      },
      nl: {
        name: "Thermobond Vilt & Isolatielagen",
        subtitle: "400 tot 1500 g/m², zachte en harde uitvoeringen",
        description: "Duurzame viltplaten ter isolatie van verenkernen en langdurige vormvastheid."
      },
      pl: {
        name: "Filc Termozgrzewalny i Płyty Izolacyjne",
        subtitle: "Gramatura 400 do 1500 g/m², Twarde i Miękkie",
        description: "Igłowany filc tapicerski do wygłuszania i zabezpieczania formatki sprężynowej."
      },
      ka: {
        name: "თერმობონდის თექა და საიზოლაციო ფენები",
        subtitle: "400-დან 1500 გრ/მ²-მდე, რბილი და მყარი ვარიანტები",
        description: "მაღალი სიმკვრივის თექა მატრასის ზამბარების იზოლაციისა და გამძლეობისთვის."
      },
      ga: {
        name: "Feilt Theirmeach & Ceapacha Aonraithe",
        subtitle: "400 gsm go 1,500 gsm, Roghanna Crua & Boga",
        description: "Ceapacha feilte ard-dlúis d'aonrú spriongaí tochta."
      },
      ru: {
        name: "Термовойлок и изолирующие настилы",
        subtitle: "Плотность от 400 до 1500 г/м², жесткие и мягкие варианты",
        description: "Иглопробивной и термоскрепленный войлок для надежной изоляции пружинных блоков."
      },
      ar: {
        name: "اللباد الحراري وعوازل النوابض",
        subtitle: "كثافات من 400 إلى 1500 جم/م²، خيارات صلبة ومرنة",
        description: "ألواح لباد معالجة حرارياً لعزل نوابض المراتب ومنع بروزها وتوفير راحة فائقة."
      },
      zh: {
        name: "热压毛毡及弹簧隔离垫",
        subtitle: "400至1500克重，软硬多档可选",
        description: "高密度针刺热熔纤维毡垫，有效隔离弹簧并消除异响，规格按床垫尺寸定制裁切。"
      }
    }
  },
  {
    id: 4,
    slug: "hotmelts",
    name: "Industrial Hotmelt Adhesives",
    category: "adhesives",
    categoryName: "Chemicals & Adhesives",
    subtitle: "Eco-Friendly, Low-Odor Adhesives for Pocket Springs & Foam",
    description: "High-performance hotmelt adhesives formulated specifically for automated pocket spring assembly lines, mattress foam buildup, and edge support bonding. 100% solid, solvent-free.",
    specs: {
      "Application Temperature": "150°C - 175°C",
      "Viscosity": "2,200 - 3,500 mPa.s at 160°C",
      "Color": "White / Light Amber pellets & pillows",
      "Certifications": "Low VOC, OEKO-TEX compatible, solvent-free",
      "Packaging": "20 kg or 25 kg silicone-lined craft sacks"
    },
    thumb: "/images/hotmelts-g1.png",
    gallery: [
      "/images/hotmelts-g1.png",
      "/images/hotmelts-g2.png",
      "/images/hotmelts-g3.png"
    ],
    video: "",
    featured: true,
    inStock: true,
    moqInfo: "Low minimum with mixed orders",
    translations: {
      tr: {
        name: "Endüstriyel Hotmelt Tutkallar",
        subtitle: "Paket Yay ve Sünger Birleştirme İçin Kokusuz Yapıştırıcılar",
        description: "Paket yay dizimi, sünger laminasyonu ve yatak karkas montajında kullanılan solvent içermeyen, kokusuz, hızlı kuruyan yüksek tutunma güçlü hotmelt yapıştırıcılar."
      },
      de: {
        name: "Industrielle Schmelzklebstoffe (Hotmelt)",
        subtitle: "Lösungsmittelfreie, geruchsarme Klebstoffe für Taschenfederkerne",
        description: "Hochleistungsklebstoffe für die automatisierte Taschenfederkern- und Schaumstoffverklebung in der Matratzenproduktion."
      },
      fr: {
        name: "Adhésifs Hotmelt Industriels",
        subtitle: "Sans Solvant, Faible Odeur pour Ressorts Ensachés et Mousse",
        description: "Colles thermofusibles haute performance pour lignes automatisées de ressorts ensachés et collage de mousses."
      },
      es: {
        name: "Adhesivos Termofusibles Hotmelt",
        subtitle: "Ecológicos y Sin Olor para Muelles Ensacados y Espumas",
        description: "Adhesivos industriales de alto rendimiento para el montaje de carcasas de muelles ensacados y capas de espuma."
      },
      it: {
        name: "Adesivi Termofusibili Hotmelt",
        subtitle: "Ecologici e Inodore per Molle Insacchettate e Poliuretano",
        description: "Adesivi a presa rapida formulati per linee automatiche di produzione materassi."
      },
      pt: {
        name: "Adesivos Hotmelt Industriais",
        subtitle: "Sem Solventes e de Baixo Odor para Molas Ensacadas",
        description: "Cola termofusível de alta aderência para colagem de espumas e montagem de molas."
      },
      nl: {
        name: "Industriële Hotmelt Smeltlijmen",
        subtitle: "Oplosmiddelvrij & geurloos voor pocketveren en schuim",
        description: "Hoogwaardige hotmelt lijmen voor snelle hechting in automatische matrasproductielijnen."
      },
      pl: {
        name: "Przemysłowe Kleje Hotmelt",
        subtitle: "Bezzapachowe Kleje do Sprężyn Kieszeniowych i Pianki",
        description: "Termotopliwe kleje poliuretanowe o wysokiej sile wiązania, idealne do linii automatycznych."
      },
      ka: {
        name: "ინდუსტრიული ჰოთმელტის წებოები",
        subtitle: "ეკოლოგიური წებო ჯიბის ზამბარებისა და ღრუბლისთვის",
        description: "უმაღლესი ხარისხის თერმომდგრადი წებო მატრასების წარმოებისთვის, სუნის გარეშე."
      },
      ga: {
        name: "Greamacháin Theileata Thionsclaíocha (Hotmelt)",
        subtitle: "Neamhdhíobhálach don Chomhshaol le haghaidh Spriongaí Póca",
        description: "Greamacháin thapa d'ardfheidhmíocht do línte uathoibríocha tochta."
      },
      ru: {
        name: "Термоклей для матрасного производства",
        subtitle: "Экологичный клей без запаха для пружин и ППУ",
        description: "Высокоэффективный клей-расплав для склеивания независимых пружинных блоков и слоев поролона."
      },
      ar: {
        name: "غراء ساخن صناعي (هوت ميلت)",
        subtitle: "صديق للبيئة، عديم الرائحة لنوابض البوكيت والإسفنج",
        description: "مواد لاصقة صناعية عالية الكفاءة مخصصة لربط نوابض الجيب وطبقات الإسفنج."
      },
      zh: {
        name: "工业热熔胶 (独立袋装弹簧专用)",
        subtitle: "环保低气味，极速粘合高韧性",
        description: "无溶剂环保热熔胶粒，专为全自动独立袋装弹簧组装机及海绵贴合流水线设计。"
      }
    }
  },
  {
    id: 5,
    slug: "labels",
    name: "Custom Woven & Printed Labels",
    category: "tapes",
    categoryName: "Tapes & Accessories",
    subtitle: "High-Definition Woven, Satin, and Self-Adhesive Corner Tags",
    description: "Designed specifically for bed and mattress branding. Produced with premium yarns and sharp micro-lettering. Available with self-adhesive backing, heat seal, or sew-on borders.",
    specs: {
      "Techniques": "Damask woven, thermal sublimation, micro-silicone",
      "Backing Options": "Sew-on border, strong self-adhesive, thermo-adhesive",
      "Colors": "Up to 8 Pantone spot colors + metallic threads",
      "Turnaround": "Fast 4 to 7 days sample approval",
      "MOQ": "1,000 pcs (flexible with mixed container)"
    },
    thumb: "/images/labels-color.jpg",
    gallery: [
      "/images/labels-g1.png",
      "/images/labels-g2.png",
      "/images/labels-g3.png"
    ],
    video: "",
    featured: false,
    inStock: true,
    moqInfo: "Custom branding support",
    translations: {
      tr: {
        name: "Özel Dokuma & Baskılı Yatak Etiketleri",
        subtitle: "Yüksek Çözünürlüklü Jakarlı, Kendinden Yapışkanlı Köşe Etiketleri",
        description: "Yatak ve baza markalama için özel olarak üretilen dokuma, saten ve kendinden yapışkanlı köşe etiketleri. Canlı renkler ve keskin detaylar."
      },
      de: {
        name: "Individuelle Web- & Drucketiketten",
        subtitle: "Hochauflösende Damast- & selbstklebende Matratzenetiketten",
        description: "Premium-Markenetiketten für Matratzenränder und Ecken mit bis zu 8 Farben und gestochen scharfer Typografie."
      },
      fr: {
        name: "Étiquettes Tissées et Imprimées Sur Mesure",
        subtitle: "Haute Définition Damassée, Autoadhésives de Coin",
        description: "Étiquettes de marque personnalisées pour matelas et sommiers avec détails soignés."
      },
      es: {
        name: "Etiquetas Tejidas e Impresas Personalizadas",
        subtitle: "Etiquetas de Esquina Autoadhesivas y de Coser",
        description: "Diseñadas para resaltar la identidad de su marca en colchones y somieres. Tejido damasco de alta densidad."
      },
      it: {
        name: "Etichette Tessute e Stampate Personalizzate",
        subtitle: "Giacquard ad Alta Definizione e Angolari Autoadesivi",
        description: "Etichette per materassi di pregio con rifiniture precise e filati metallici a richiesta."
      },
      pt: {
        name: "Etiquetas Tecidas e Impressas para Colchões",
        subtitle: "Alta Definição Damasco e Etiquetas Autoadesivas",
        description: "Valorize a sua marca com etiquetas personalizadas de toque macio e cores vivas."
      },
      nl: {
        name: "Geweven & Gedrukte Matraslabels",
        subtitle: "Haarscherpe damastkwaliteit & zelfklevende hoeklabels",
        description: "Professionele branding voor bedden en matrassen met metallic garenopties."
      },
      pl: {
        name: "Tkane i Drukowane Etykiety Materacowe",
        subtitle: "Żakardowe i Samoprzylepne Narożniki Markowe",
        description: "Wysokiej rozdzielczości wszywki i etykiety podkreślające prestiż produktu."
      },
      ka: {
        name: "ნაქსოვი და ბეჭდური ეტიკეტები",
        subtitle: "მაღალი გარჩევადობის ჟაკარდის და თვითწებვადი ლეიბლები",
        description: "ბრენდირებული ეტიკეტები მატრასებისთვის მკაფიო ლოგოებითა და ფერებით."
      },
      ga: {
        name: "Lipéid Fite & Priontáilte Saincheaptha",
        subtitle: "Lipéid Chúinne Ardghléine do Thochtaí",
        description: "Lipéid bhrandála den scoth le snáitheanna miotalacha de réir riachtanais."
      },
      ru: {
        name: "Тканые и печатные этикетки для матрасов",
        subtitle: "Жаккардовые и самоклеящиеся угловые лейблы",
        description: "Премиальные брендовые этикетки высокой четкости для матрасов."
      },
      ar: {
        name: "ملصقات وشرائط العلامات التجارية المنسوجة",
        subtitle: "ملصقات زوايا ذاتية اللصق وأشرطة ساتان عالية الدقة",
        description: "ملصقات منسوجة ومطبوعة لإبراز علامتك التجارية على زوايا المراتب بجودة ألوان فائقة."
      },
      zh: {
        name: "定制织唛与印刷床垫商标",
        subtitle: "高密缎面织标，自粘式包角护标",
        description: "专为床垫研发的高清大马士革提花织唛与烫金印刷角标，提升终端视觉档次。"
      }
    }
  },
  {
    id: 6,
    slug: "cardboard",
    name: "Roll-Pack Cardboard & Corner Protectors",
    category: "packaging",
    categoryName: "Packaging & Films",
    subtitle: "Heavy-Duty Spiral Tubes & Compressed Bed-in-a-Box Solutions",
    description: "Engineered cardboard solutions for modern roll-pack and bed-in-a-box manufacturing. High crush resistance to ensure rolled mattresses remain secure during global courier shipping.",
    specs: {
      "Diameter Range": "250mm - 450mm spiral cardboard cores",
      "Wall Thickness": "4mm to 12mm heavy-wall options",
      "Edge Protectors": "L-shaped and U-shaped laminated angles",
      "Recyclability": "100% biodegradable and recyclable",
      "MOQ": "Mixed container consolidation"
    },
    thumb: "/images/cardboard-color.jpg",
    gallery: [
      "/images/cardboard-g1.png",
      "/images/cardboard-g2.png",
      "/images/cardboard-g3.png"
    ],
    video: "",
    featured: false,
    inStock: true,
    moqInfo: "Roll-pack ready",
    translations: {
      tr: {
        name: "Roll-Pack Mukavva Çözümleri & Köşe Bentleri",
        subtitle: "Rulo Yatak (Bed in a Box) İçin Mukavemetli Masura ve Köşebentler",
        description: "Rulo paketli yatakların presleme ve kargo taşımacılığı sırasında formunu korumasını sağlayan yüksek basınca dayanıklı spiral mukavva borular ve L köşebentler."
      },
      de: {
        name: "Rollpack-Kartonagen & Kantenschutz",
        subtitle: "Stabile Spiralhülsen & Bed-in-a-Box-Verpackungslösungen",
        description: "Druckfeste Wickelkerne und Winkelelemente für gerollte und vakuumierte Matratzen."
      },
      fr: {
        name: "Mandrins Carton Roll-Pack et Cornières",
        subtitle: "Tubes Spirales Renforcés pour Matelas Roulés",
        description: "Solutions carton résistantes à l'écrasement pour l'emballage compact des matelas en boîte."
      },
      es: {
        name: "Tubos de Cartón Roll-Pack y Cantoneras",
        subtitle: "Soluciones de Envasado para Colchones Enrollados",
        description: "Tubos de cartón espiral de alta resistencia para optimizar el transporte de colchones enrollados."
      },
      it: {
        name: "Tubi in Cartone per Materassi Sottovuoto e Angolari",
        subtitle: "Anime a Spirale Rinforzate per Roll-Pack",
        description: "Cartoni ad altissima resistenza per arrotolare e spedire materassi sottovuoto."
      },
      pt: {
        name: "Tubos de Papelão Roll-Pack e Cantoneiras",
        subtitle: "Embalagem Estruturada para Colchões a Vácuo",
        description: "Mandris espirais resistentes à compressão para envio de colchões enrolados."
      },
      nl: {
        name: "Roll-Pack Karton & Hoekbeschermers",
        subtitle: "Spiraalkokers voor opgerolde bed-in-a-box matrassen",
        description: "Stevige kartonnen kernen voor veilig transport van gevacumeerde matrassen."
      },
      pl: {
        name: "Tuleje Tekturowe Roll-Pack i Kątowniki",
        subtitle: "Opakowania do Rolowanych Materacy Bed-in-a-Box",
        description: "Wysokociśnieniowe gilzy tekturowe chroniące zrolowane materace podczas wysyłki."
      },
      ka: {
        name: "რულონის მუყაოს მილები და კუთხის დამცავები",
        subtitle: "Roll-Pack და Bed-in-a-Box შეფუთვის გადაწყვეტილებები",
        description: "გამძლე სპირალური მუყაოს მილები დაპრესილი მატრასების უსაფრთხო გადაზიდვისთვის."
      },
      ga: {
        name: "Cairtchlár Roll-Pack & Cosantóirí Cúinne",
        subtitle: "Feadáin Bíseacha Láidre do Thochtaí Rollta",
        description: "Réitigh láidre cairtchláir le haghaidh seoladh tochtanna rollta."
      },
      ru: {
        name: "Картонные гильзы и уголки для рулонных матрасов",
        subtitle: "Упаковка для технологии Bed-in-a-Box и скрутки",
        description: "Сверхпрочные спиральные картонные шпули и защитные уголки для спрессованных матрасов."
      },
      ar: {
        name: "كرتون رول باك وأغطية حماية الزوايا",
        subtitle: "أنابيب كرتونية حلزونية للمراتب المضغوطة بالرول",
        description: "أنابيب وزوايا كرتونية مقواة ومصممة لتحمل ضغط لف المراتب وتأمين شحنها بأمان."
      },
      zh: {
        name: "卷包床垫工业纸管及护角",
        subtitle: "高抗压螺旋纸芯筒，盒装床垫解决方案",
        description: "高强度抗挤压工业纸管与L型压边护角，保障卷包床垫跨境运输安全。"
      }
    }
  },
  {
    id: 7,
    slug: "zippered-cover",
    name: "Quilted & Knitted Zippered Covers",
    category: "textiles",
    categoryName: "Textiles, Felts & Covers",
    subtitle: "Custom Removable & Washable Encasements for Luxury Mattresses",
    description: "Every cover is tailored to your dimensional and aesthetic requirements. Knitted jacquard fabrics quilted with polyfill, memory foam, or wool, finished with durable continuous zippers.",
    specs: {
      "Fabric Blends": "Bamboo, Tencel, CoolMax, Cashmere blend knits",
      "Zipper Type": "Heavy-duty #5 or #7 coil zippers (3-sided or 4-sided split)",
      "Quilting Thickness": "100 gsm to 500 gsm fiberfill / visco foam lining",
      "Sizes": "European, American, and custom hotel dimensions",
      "MOQ": "50 units with mixed containers"
    },
    thumb: "/images/zippered-cover-color.jpg",
    gallery: [],
    video: "",
    featured: true,
    inStock: true,
    moqInfo: "Custom quilting patterns",
    translations: {
      tr: {
        name: "Fermuarlı Yatak Kılıfları & Kapitoneli Kumaş",
        subtitle: "Çıkarılabilir, Yıkanabilir Özel Tasarım Lüks Yatak Kılıfları",
        description: "Tamamen sizin ölçü ve desen tercihlerinize özel üretilen jakarlı örme kumaşlı, elyaf veya visko kapitoneli, kaliteli fermuarlı yatak kılıfları."
      },
      de: {
        name: "Gesteppte Matratzenbezüge mit Reißverschluss",
        subtitle: "Abnehmbare & waschbare Hüllen nach Maß",
        description: "Individuell konfektionierte Strick- und Jacquardbezüge mit robusten Rundum-Reißverschlüssen für Premium-Matratzen."
      },
      fr: {
        name: "Housses Matelassées Déhoussables avec Zip",
        subtitle: "Tricot Jacquard Haut de Gamme, Lavable et Amovible",
        description: "Confection sur mesure de housses matelassées avec fermetures à glissière robustes."
      },
      es: {
        name: "Fundas con Cremallera Acolchadas",
        subtitle: "Fundas Desmontables y Lavables a Medida",
        description: "Fundas exteriores acolchadas con tejidos de punto jacquard (bambú, tencel) y cremalleras resistentes."
      },
      it: {
        name: "Gusci e Fodere Trapuntate con Cerniera",
        subtitle: "Rivestimenti Sfoderabili e Lavabili su Misura",
        description: "Fodere in maglia jacquard trapuntata con zip perimetrali divisibili per materassi sartoriali."
      },
      pt: {
        name: "Capas de Colchão Matelassadas com Zíper",
        subtitle: "Capas Removíveis e Laváveis sob Medida",
        description: "Confeccionadas em malha jacquard acolchoada com fibra ou espuma viscoelástica."
      },
      nl: {
        name: "Doorgestikte Matrashoezen met Rits",
        subtitle: "Afritsbare & wasbare luxe matrastijken op maat",
        description: "Verfijnde gebreide jacquard hoezen met stevige spiraalritssluitingen."
      },
      pl: {
        name: "Pikowane Pokrowce na Materac z Zamkiem",
        subtitle: "Zdejmowane i Przeznaczone do Prania Pokrowce na Wymiar",
        description: "Wysokiej jakości dzianiny żakardowe pikowane z owatą lub pianką memory."
      },
      ka: {
        name: "ელვაშესაკრავიანი მატრასის ჩიხოლები",
        subtitle: "მოსახსნელი და გასარეცხი პრემიუმ საფარები",
        description: "შეკვეთით დამზადებული ჟაკარდის ჩიხოლები რბილი და გამძლე ქსოვილებით."
      },
      ga: {
        name: "Clúdaigh Tochta Cuilteáilte le Zip",
        subtitle: "Clúdaigh Inscartha & In-nite do Thochtaí Só",
        description: "Clúdaigh fite de réir toisí saincheaptha le zippers tromshaothair."
      },
      ru: {
        name: "Съемные стеганые чехлы на молнии",
        subtitle: "Индивидуальный пошив чехлов из трикотажа и жаккарда",
        description: "Съемные чехлы для матрасов любых размеров с качественными молниями."
      },
      ar: {
        name: "أغطية مراتب مبطنة بسحاب",
        subtitle: "أغطية فاخرة قابلة للإزالة والغسيل بتصاميم حسب الطلب",
        description: "أغطية مراتب قماشية مبطنة ومزودة بسحابات متينة لسهولة الفك والتنظيف ومظهر فندقي."
      },
      zh: {
        name: "提花绗缝拉链床垫套",
        subtitle: "可拆卸可水洗，奢华定制面料",
        description: "竹纤维、天丝等高端提花针织面料绗缝，配重型开尾拉链，支持OEM定制尺寸。"
      }
    }
  },
  {
    id: 8,
    slug: "handles-foot-mat",
    name: "Handles, Vents & Foot Mats",
    category: "tapes",
    categoryName: "Tapes & Accessories",
    subtitle: "Embroidered Fabric Handles, Chrome Air Vents & Showroom Mats",
    description: "Enhance the functional utility and luxury presentation of your mattresses with reinforced side handles, breathable brass/chrome air vents, and custom embroidered showroom foot protectors.",
    specs: {
      "Handle Styles": "Upholstered fabric, rope inlay, plastic molded, faux leather",
      "Air Vents": "Snap-in plastic and electroplated brass/chrome vents",
      "Foot Mats": "Heavy PVC or woven fabric with custom embroidered logo",
      "Colorways": "Full matching with border fabrics and mattress tapes",
      "MOQ": "Mixed container consolidated"
    },
    thumb: "/images/handles-color.jpg",
    gallery: [],
    video: "",
    featured: false,
    inStock: true,
    moqInfo: "Logo embroidery available",
    translations: {
      tr: {
        name: "Yatak Kulpları, Hava Kapsülleri & Ayak Paspasları",
        subtitle: "Nakışlı Kumaş Kulplar, Krom Havalandırma Kapsülleri",
        description: "Yatak taşımayı kolaylaştıran sağlam kumaş kulplar, hava sirkülasyonu sağlayan şık kapsüller ve mağaza teşhiri için özel logolu ayak koruma matları."
      },
      de: {
        name: "Matratzengriffe, Lüfter & Fußmatten",
        subtitle: "Bestickte Griffe, Chrom-Lüftungsventile und Schauraummatten",
        description: "Funktionale und edle Zubehörteile zur Veredelung der Matratzenoptik."
      },
      fr: {
        name: "Poignées, Aérateurs et Protège-Pieds",
        subtitle: "Poignées Brodés, Aérateurs Chromés et Tapis de Showroom",
        description: "Accessoires de finition pour faciliter la manipulation et la ventilation des matelas."
      },
      es: {
        name: "Asas, Válvulas de Aire y Protectores de Pies",
        subtitle: "Asas Bordadas, Válvulas Cromadas y Mantas para Showroom",
        description: "Accesorios perimetrales para facilitar el volteo y ventilación de los colchones."
      },
      it: {
        name: "Maniglie, Aeratori e Copripiedi Showroom",
        subtitle: "Maniglie Ricamate e Capsule di Aerazione Cromate",
        description: "Dettagli raffinati per valorizzare l'estetica e la traspirabilità dei materassi."
      },
      pt: {
        name: "Alças, Respiradores e Faixas de Pés",
        subtitle: "Alças Bordadas e Válvulas Cromadas para Colchões",
        description: "Acessórios funcionais que proporcionam ventilação e facilidade no manuseio."
      },
      nl: {
        name: "Matrashandgrepen, Ventilatieroosters & Voetlappen",
        subtitle: "Geborduurde handgrepen & chroom ontluchtingsdoppen",
        description: "Luxe afwerkingsdetails voor presentatie in showrooms en gemakkelijke handhaving."
      },
      pl: {
        name: "Uchwyty, Wywietrzniki i Ochraniacze na Nogi",
        subtitle: "Haftowane Rączki i Chromowane Odpowietrzniki",
        description: "Akcesoria ułatwiające obracanie materaca i zapewniające właściwą cyrkulację powietrza."
      },
      ka: {
        name: "მატრასის სახელურები, აერატორები და დამცავები",
        subtitle: "ნაქარგი სახელურები და ქრომირებული სავენტილაციო კაფსულები",
        description: "აქსესუარები მატრასის კომფორტული გადაადგილებისა და ჰაერის მიმოქცევისთვის."
      },
      ga: {
        name: "Láimhseálann Tochta, Gaothairí & Mataí Seomra Taispeána",
        subtitle: "Láimhseálann Bróidnithe & Comhlaí Aeir Cróim",
        description: "Gabhálais d'ardchaighdeán chun aeir a scaipeadh agus tochtanna a ardú go héasca."
      },
      ru: {
        name: "Матрасные ручки, аэраторы и подножки",
        subtitle: "Вышитые ручки, вентиляционные клапаны и коврики",
        description: "Функциональная фурнитура для удобства переворачивания матраса и вентиляции."
      },
      ar: {
        name: "مقابض المراتب، فتحات التهوية ودعاسات العرض",
        subtitle: "مقابض قماشية مطرزة وفتحات تهوية كرومية ومفارش حماية",
        description: "إكسسوارات تجميلية وعملية تسهل حمل المراتب وتضمن التهوية الداخلية الممتازة."
      },
      zh: {
        name: "床垫提手、透气孔及展厅尾垫",
        subtitle: "刺绣布艺提手，电镀金属透气孔",
        description: "实用与美感兼备的床垫辅件，提升搬运便携性与空气流通，定制展厅专属Logo护尾布。"
      }
    }
  },
  {
    id: 9,
    slug: "staples",
    name: "Industrial Mattress Staples & Hog Rings",
    category: "hardware",
    categoryName: "Springs & Hardware",
    subtitle: "High-Tensile Galvanized Pneumatic Staples & C-Rings",
    description: "Industrial fasteners engineered for pneumatic staple guns. Designed to attach springs to frames, secure felt pads, and close mattress tape borders without jamming or corrosion.",
    specs: {
      "Series": "Series 71, Series 80, Series 14, C-Rings, Hog Rings",
      "Finish": "Heavy galvanized zinc coating or stainless steel",
      "Crown Widths": "9mm to 13mm crown specifications",
      "Packaging": "10,000 to 20,000 staples per master carton",
      "MOQ": "Included with mixed container orders"
    },
    thumb: "/images/staples-color.jpg",
    gallery: [],
    video: "",
    featured: false,
    inStock: true,
    moqInfo: "Pneumatic gun compatible",
    translations: {
      tr: {
        name: "Endüstriyel Yatak Zımba Telleri & C-Halkaları",
        subtitle: "Galvanizli Havalı Tabanca Zımba Telleri ve Hog Ringler",
        description: "Yatak yay karkasını çerçeveye sabitleme, keçe bağlama ve bordür dikiminde kullanılan korozyona dayanıklı galvanizli zımba telleri."
      },
      de: {
        name: "Industrieklammern & Hog-Rings",
        subtitle: "Verzinkte Druckluftklammern für Federkerne und Rahmen",
        description: "Hochfeste Heftklammern und Rundringe für die präzise Montage von Matratzenkernen und Polsterungen."
      },
      fr: {
        name: "Agrafes Industrielles et Anneaux C-Ring",
        subtitle: "Agrafes Pneumatiques Galvanisées pour Literie",
        description: "Fixations métalliques anticorrosion pour fixer les feutres et les ressorts sans blocage de pistolet."
      },
      es: {
        name: "Grapas Industriales y Anillas Hog Ring",
        subtitle: "Grapas Galvanizadas para Pistolas Neumáticas",
        description: "Fijaciones metálicas de precisión para sujetar muelles, fieltros y estructuras de colchones."
      },
      it: {
        name: "Graffe Industriali e Anelli Hog Ring",
        subtitle: "Graffe Zincate ad Alta Resistenza per Pistole Pneumatiche",
        description: "Elementi di fissaggio essenziali per legare feltri, molle e bordure imbottite."
      },
      pt: {
        name: "Grampos Industriais e Anéis C-Ring",
        subtitle: "Grampos Galvanizados para Grampeadores Pneumáticos",
        description: "Fixadores metálicos anticorrosivos para montagem de molejos e camadas de feltro."
      },
      nl: {
        name: "Industriële Nietjes & Hog-Rings",
        subtitle: "Verzinkte persluchtnieten voor verenkernen en kaders",
        description: "Betrouwbare bevestigingsmiddelen voor soepele automatische verwerking."
      },
      pl: {
        name: "Zszywki Przemysłowe i Pierścienie Hog Ring",
        subtitle: "Ocynkowane Zszywki Pneumatyczne do Materacy",
        description: "Trwałe elementy złączne zapobiegające korozji i zacinaniu pistoletów montażowych."
      },
      ka: {
        name: "სამრეწველო სტეპლერის კავები და რგოლები",
        subtitle: "მოთუთიებული პნევმატური კავები მატრასის კარკასისთვის",
        description: "მაღალი გამძლეობის მეტალის კავები ზამბარებისა და თექის დასამაგრებლად."
      },
      ga: {
        name: "Stáplaí Tionsclaíocha & Fáinní Hog",
        subtitle: "Stáplaí Galbhánaithe d'Airm Neomatacha",
        description: "Ceanglóirí miotail láidre chun spriongaí agus feilt a dhaingniú go daingean."
      },
      ru: {
        name: "Промышленные скобы и кольца для матрасов",
        subtitle: "Оцинкованные скобы для пневмопистолетов",
        description: "Надежные крепежные элементы для фиксации пружинных блоков и настилов."
      },
      ar: {
        name: "دبابيس صناعية وحلقات تثبيت النوابض",
        subtitle: "دبابيس مجلفنة لمسدسات الهواء وحلقات C",
        description: "دبابيس صلبة مجلفنة ومقاومة للصدأ لتثبيت طبقات اللباد ونوابض المراتب."
      },
      zh: {
        name: "床垫工业气动码钉及C型扣环",
        subtitle: "热镀锌高抗拉力，顺畅不卡枪",
        description: "专用于气动风炮固定弹簧骨架与边缘钢丝、固定阻燃棉与硬质隔音毛毡。"
      }
    }
  },
  {
    id: 10,
    slug: "pu-chemicals",
    name: "PU Chemicals (Polyol, TDI & MDI)",
    category: "adhesives",
    categoryName: "Chemicals & Adhesives",
    subtitle: "Raw Materials for Flexible Polyurethane Foam Pouring",
    description: "High-grade chemical components for mattress foam production. We supply consistent polyether polyols, TDI 80/20, polymeric MDI, silicone surfactants, and catalysts for continuous block foam.",
    specs: {
      "Products": "Conventional Polyol, Polymer Polyol (POP), TDI 80/20, MDI",
      "Applications": "Standard foam, high-resilience (HR), memory visco foam",
      "Packaging": "250 kg steel drums or 1,000 kg IBC containers",
      "Purity": "≥ 99.5% international chemical standard",
      "MOQ": "Drums available with consolidated shipments"
    },
    thumb: "/images/pu-chemicals-color.jpg",
    gallery: [],
    video: "",
    featured: false,
    inStock: true,
    moqInfo: "Certified chemical grade",
    translations: {
      tr: {
        name: "Poliüretan Sünger Hammaddeleri (Poliol & TDI)",
        subtitle: "Esnek Sünger Üretimi İçin Konvansiyonel Poliol, TDI 80/20",
        description: "Yatak ve mobilya süngeri üretiminde kullanılan yüksek saflıktaki poliol, izosiyanat (TDI/MDI), katalizör ve silikon hammaddeleri."
      },
      de: {
        name: "PU-Chemikalien (Polyol, TDI & MDI)",
        subtitle: "Rohstoffe für die flexible Polyurethan-Schaumstoffherstellung",
        description: "Industrielle Chemikalien für Weichschaum, Kaltschaum (HR) und viskoelastischen Memory-Schaum."
      },
      fr: {
        name: "Produits Chimiques PU (Polyol, TDI & MDI)",
        subtitle: "Matières Premières pour Mousses Polyuréthane Flexibles",
        description: "Polyols et isocyanates certifiés pour la fabrication de blocs de mousse standard et mémoire de forme."
      },
      es: {
        name: "Químicos de Poliuretano (Poliol, TDI y MDI)",
        subtitle: "Materias Primas para Espumación de Bloques",
        description: "Polioles e isocianatos de alta pureza para la fabricación de espumas técnicas convencionales y viscoelásticas."
      },
      it: {
        name: "Materie Prime Poliuretaniche (Poliolo, TDI e MDI)",
        subtitle: "Componenti Chimici per Schiumatura Flessibile",
        description: "Polioli eterei e isocianati selezionati per produzione di gommapiuma e schiume memory foam."
      },
      pt: {
        name: "Químicos PU (Poliol, TDI e MDI)",
        subtitle: "Matérias-Primas para Produção de Espuma Flexível",
        description: "Polióis e isocianatos certificados para espumação contínua de blocos de colchão."
      },
      nl: {
        name: "PU Chemicaliën (Polyol, TDI & MDI)",
        subtitle: "Grondstoffen voor flexibel polyurethaanschuim",
        description: "Constante kwaliteit chemicaliën voor koudschuim, traagschuim en standaardschuim."
      },
      pl: {
        name: "Chemikalia PU (Poliol, TDI i MDI)",
        subtitle: "Surowce do Produkcji Pianki Poliuretanowej",
        description: "Wysokiej czystości poliole i izocyjaniany do produkcji pianki elastycznej i termoelastycznej."
      },
      ka: {
        name: "PU ქიმიკატები (პოლიოლი, TDI და MDI)",
        subtitle: "ნედლეული პოლიურეთანის ღრუბლის წარმოებისთვის",
        description: "საერთაშორისო სტანდარტის სერტიფიცირებული ქიმიური კომპონენტები ღრუბლის ჩამოსასხმელად."
      },
      ga: {
        name: "Ceimiceáin PU (Polyol, TDI & MDI)",
        subtitle: "Amhábhair le haghaidh Cúr Polúireatáin Solúbtha",
        description: "Comhpháirteanna ceimiceacha deimhnithe do mhonarú cúr tochta."
      },
      ru: {
        name: "Химикаты для ППУ (Полиол, ТДИ и МДИ)",
        subtitle: "Сырье для производства эластичного пенополиуретана",
        description: "Полиолы и изоцианаты высшего качества для непрерывной заливки поролона."
      },
      ar: {
        name: "كيماويات البولي يوريثان (بوليول، TDI و MDI)",
        subtitle: "مواد خام لصب وإنتاج إسفنج المراتب المرن",
        description: "مكونات كيميائية معتمدة لتصنيع إسفنج المراتب العادي، وعالي المرونة، والميموري فوم."
      },
      zh: {
        name: "聚氨酯化工原料 (聚醚多元醇/TDI/MDI)",
        subtitle: "软质聚氨酯海绵连续发泡基础原料",
        description: "高纯度常规聚醚、聚合物多元醇(POP)及TDI 80/20、MDI，可拼箱随柜装载。"
      }
    }
  },
  {
    id: 11,
    slug: "pillows",
    name: "Visco, Latex & Natural Wool Pillows",
    category: "textiles",
    categoryName: "Textiles, Felts & Covers",
    subtitle: "Ergonomic Memory Foam, Shredded Foam & Wool Pillows",
    description: "OEM and private-label pillow manufacturing. Choose from molded orthopedic visco memory foam cores, cooling gel-infused pillows, organic wool fills, or microfiber inserts with custom branded boxes.",
    specs: {
      "Core Options": "Molded visco, shredded foam, micro-coils, organic wool",
      "Cover Fabrics": "Knitted jacquard, cooling ice-yarn, organic cotton",
      "Packaging": "Vacuum rolled in color boxes or PE zip handles",
      "Sizes": "50x70 cm, 60x40 cm, contoured cervical shapes",
      "MOQ": "Mixed container flexible / 200 units"
    },
    thumb: "/images/pillows-color.jpg",
    gallery: [],
    video: "",
    featured: false,
    inStock: true,
    moqInfo: "Private label OEM",
    translations: {
      tr: {
        name: "Visko, Lateks & Doğal Yün Yastıklar",
        subtitle: "Ortopedik Boyun Destekli, Jel Kaplı ve Yün Dolgulu Yastıklar",
        description: "Yatak üreticilerinin mağaza ve e-ticaret satışlarını tamamlayan özel kılıflı ortopedik visko, lateks ve doğal yün yastık koleksiyonları."
      },
      de: {
        name: "Visco-, Latex- & Naturwollkissen",
        subtitle: "Ergonomische Memory-Schaum- & Luxuskissen mit Eigenmarke",
        description: "Maßgeschneiderte Kissen mit Gel-Beschichtung, Bambusbezügen und individueller Verpackung für den Bettenfachhandel."
      },
      fr: {
        name: "Oreillers Viscoélastiques, Latex et Laine Naturelle",
        subtitle: "Cœurs à Mémoire de Forme Ergonomiques et Gel Fraîcheur",
        description: "Production sur mesure d'oreillers ergonomiques avec housses jacquard et boîte personnalisée."
      },
      es: {
        name: "Almohadas Viscoelásticas y de Lana Natural",
        subtitle: "Núcleos Ortopédicos y Fundas Personalizadas",
        description: "Fabricación de almohadas de memory foam con gel refrigerante, látex y rellenos naturales."
      },
      it: {
        name: "Guanciali in Memory Foam, Lattice e Lana",
        subtitle: "Cuscini Cervicali Ergonomici e Gel Rinfrescante",
        description: "Produzione per private label con packaging personalizzato e tessuti termoregolatori."
      },
      pt: {
        name: "Travesseiros Viscoelásticos, Látex e Lã Natural",
        subtitle: "Espuma Ortopédica Memory Foam e Gel Refrescante",
        description: "Travesseiros ergonômicos personalizados com capas em malha nobre e embalagem própria."
      },
      nl: {
        name: "Visco Memory Foam, Latex & Wol Kussens",
        subtitle: "Ergonomische hoofdkussens met private label opties",
        description: "Luxe hoofdkussens met koelende gel-pads en biologische katoenen hoezen."
      },
      pl: {
        name: "Poduszki z Pianki Memory, Lateksu i Wełny",
        subtitle: "Ergonomiczne Poduszki Ortopedyczne pod Własną Markę",
        description: "Wysokiej klasy poduszki profilowane z żelem chłodzącym i spersonalizowanym opakowaniem."
      },
      ka: {
        name: "მეხსიერების ქაფის, ლატექსისა და შალის ბალიშები",
        subtitle: "ორთოპედიული ერგონომიული ბალიშები გელის ეფექტით",
        description: "მაღალი ხარისხის ბალიშები კისრის საუკეთესო მხარდაჭერისთვის და მშვიდი ძილისთვის."
      },
      ga: {
        name: "Piliúir Visco, Laitéis & Olann Nádúrtha",
        subtitle: "Cúr Cuimhne Eirgeanamaíoch le Clúdaigh Shó",
        description: "Piliúir ortaipéideacha déanta le brandáil do chuideachta féin."
      },
      ru: {
        name: "Анатомические подушки из пены Memory и шерсти",
        subtitle: "Ортопедические подушки с эффектом памяти и охлаждающим гелем",
        description: "Готовые подушки под вашей торговой маркой с гипоаллергенными съемными чехлами."
      },
      ar: {
        name: "وسائد ميموري فوم ولاتكس وصوف طبيعي",
        subtitle: "وسائد طبية للرقبة مع جل تبريد وأغطية فاخرة",
        description: "تصنيع وسائد ميموري فوم ولاتكس مريحة تلبي أعلى معايير النوم الفندقي ومتاحة بعبوات مخصصة."
      },
      zh: {
        name: "慢回弹记忆棉/乳胶/羊毛枕",
        subtitle: "人体工学护颈设计，冷感凝胶凝胶层",
        description: "支持贴牌OEM，配备定制礼盒包装与抗菌亲肤提花外套，丰满回弹不易塌陷。"
      }
    }
  },
  {
    id: 12,
    slug: "bed-baseheadboards",
    name: "Knockdown Bed Bases & Headboards",
    category: "hardware",
    categoryName: "Springs & Hardware",
    subtitle: "Ottoman Lift Storage, Demountable Metal Frames & Headboards",
    description: "Export-oriented flat-pack bed bases and upholstered headboards designed to optimize container volume. High-durability electrostatic powder coated frames and heavy-duty gas piston mechanisms.",
    specs: {
      "Structure": "Reinforced steel tubular profile + wooden slats",
      "Mechanism": "Gas lift shock absorbers for Ottoman underbed storage",
      "Packing": "Compact flat-pack cartons for minimum shipping volume",
      "Finishes": "Linen, velvet, faux leather, or frame-only for local upholstery",
      "MOQ": "50 sets via mixed container"
    },
    thumb: "/images/bed-base-color.jpg",
    gallery: [],
    video: "",
    featured: false,
    inStock: true,
    moqInfo: "Flat-pack container optimized",
    translations: {
      tr: {
        name: "Demonte Baza, Başlık & Sandıklı Karyola İskeletleri",
        subtitle: "Konteyner Hacmini Optimize Eden Flat-Pack Metal Baza Sistemleri",
        description: "İhracata uygun demonte (flat-pack) çelik karkaslı, amortisörlü sandıklı baza ve başlık sistemleri. Konteyner yüklemelerinde maksimum adet sığdırma avantajı."
      },
      de: {
        name: "Zerlegbare Bettgestelle & Kopfteile",
        subtitle: "Flach verpackte Stauraumbetten & Metallrahmen für den Export",
        description: "Robuste, montagefreundliche Bettsysteme mit Gasdruckfedern und platzsparender Verpackung für maximale Containerkapazität."
      },
      fr: {
        name: "Sommiers Démontables et Têtes de Lit",
        subtitle: "Structures Coffre avec Vérins à Gaz en Kit Flat-Pack",
        description: "Cadres de lit métalliques renforcés optimisés pour le chargement compact en conteneurs d'exportation."
      },
      es: {
        name: "Bases Desmontables y Cabeceros (Canapés)",
        subtitle: "Estructuras Metálicas Flat-Pack con Pistones de Gas",
        description: "Somieres abatibles y cabeceros diseñados para embalaje plano, reduciendo el coste de transporte marítimo."
      },
      it: {
        name: "Sommier Smontabili e Testate Letto",
        subtitle: "Letti Contenitore Salvaspazio con Meccanismo a Gas Flat-Pack",
        description: "Telai metallici smontabili ad incastro progettati per ottimizzare il volume nei container export."
      },
      pt: {
        name: "Bases Desmontáveis e Cabeceiras de Cama",
        subtitle: "Camas Baú Articuladas com Pistões em Embalagem Plana",
        description: "Estruturas em aço de montagem rápida ideais para importação e máxima cubagem em contêineres."
      },
      nl: {
        name: "Demontabele Bedbodems & Hoofdborden",
        subtitle: "Plat verpakte opbergbedden met gasveer liftmechanisme",
        description: "Ruimtebesparende flat-pack exportverpakking voor optimale containercapaciteit."
      },
      pl: {
        name: "Rozkładane Ramy Łóżek i Wezgłowia",
        subtitle: "Łóżka ze Schowkiem z Podnośnikiem Gazowym Flat-Pack",
        description: "Kompaktowo pakowane stelaże metalowe ze skrzynią na pościel, zoptymalizowane pod kontener."
      },
      ka: {
        name: "დაშლადი საწოლის ბაზები და თავები",
        subtitle: "Flat-Pack მეტალის კარკასი გაზის ამორტიზატორებით",
        description: "სათავსოიანი საწოლები ექსპორტისთვის, კონტეინერში მაქსიმალური რაოდენობის ჩატვირთვისთვის."
      },
      ga: {
        name: "Bonnáin Leaba Inscartha & Ceannchláir",
        subtitle: "Frámaí Miotail Stórála le Meicníocht Ardaithe Gáis",
        description: "Córais leapa réidh le teacht le chéile, optamaithe do loingsiú coimeádáin."
      },
      ru: {
        name: "Разборные основания для кроватей и изголовья",
        subtitle: "Подъемные механизмы и металлические каркасы Flat-Pack",
        description: "Экспортные разборные кроватные базы с ящиком для белья и прочными газлифтами."
      },
      ar: {
        name: "قواعد أسرّة قابلة للفك والتجميع وخلفيات مبطنة",
        subtitle: "أسرّة ذات صناديق تخزين بنظام رفع هيدروليكي للشحن الدولي",
        description: "قواعد معدنية متينة سهلة التركيب ومصممة لتوفير مساحة الشحن البحري مع آليات مكابس غازية."
      },
      zh: {
        name: "出口型平板拆装箱式床架与床头软包",
        subtitle: "气压撑高箱储物，平板扁平包装高装柜量",
        description: "加厚碳钢管与静电喷涂工艺，扁平纸箱包装，大幅降低海运体积成本。"
      }
    }
  },
  {
    id: 13,
    slug: "other-components",
    name: "Spunbond Nonwoven & Assembly Hardware",
    category: "hardware",
    categoryName: "Springs & Hardware",
    subtitle: "PP Nonwoven Fabric, Quilting Thread, Corner Protectors & Spring Clips",
    description: "Every small component that mattress manufacturing relies on. High-uniformity polypropylene spunbond nonwoven fabrics, bonded nylon quilting threads, mattress border wire, and tufting buttons.",
    specs: {
      "Spunbond Weights": "15 gsm to 120 gsm (white, beige, black, custom colors)",
      "Quilting Threads": "Bonded nylon & spun polyester heavy-duty threads",
      "Hardware": "Border clips, wire fasteners, tufting needles & rosettes",
      "MOQ": "Consolidated freely with any other components"
    },
    thumb: "/images/nonwoven-color.jpg",
    gallery: [],
    video: "",
    featured: false,
    inStock: true,
    moqInfo: "All-in-One consolidation",
    translations: {
      tr: {
        name: "Tela (Spunbond Nonwoven) & Yatak Montaj Parçaları",
        subtitle: "PP Tela Kumaş, Kapitone İplikleri, Çerçeve Telleri ve Klipsler",
        description: "Yatak imalatında ihtiyaç duyulan tüm yardımcı aksamlar: Yüksek mukavemetli spunbond tela, bordür klipsleri, düğmeler ve mukavemetli kapitone iplikleri."
      },
      de: {
        name: "Spunbond-Vliesstoffe & Montagezubehör",
        subtitle: "PP-Vliese, Steppgarne, Rahmenklammern und Zubehör",
        description: "Umfassendes Sortiment an unverzichtbaren Klein- und Verbrauchsmaterialien für die reibungslose Betten- und Matratzenfertigung."
      },
      fr: {
        name: "Intissé Spunbond et Accessoires d'Assemblage",
        subtitle: "Tissus PP Non-Tissé, Fils de Matelassage et Clips",
        description: "Tous les composants consommables pour sécuriser la fabrication des matelas."
      },
      es: {
        name: "Tejido No Tejido Spunbond y Accesorios de Montaje",
        subtitle: "Telas PP Nonwoven, Hilos de Coser y Grapas de Borde",
        description: "Todos los suministros auxiliares para la confección de colchones: entretelas spunbond e hilos resistentes."
      },
      it: {
        name: "Tessuto Non Tessuto Spunbond e Accessori",
        subtitle: "TNT Polipropilene, Filati per Trapuntatura e Clip",
        description: "Materiali di consumo ausiliari per la costruzione del materasso."
      },
      pt: {
        name: "Tecido Não Tecido Spunbond e Peças de Montagem",
        subtitle: "TNT em Polipropileno, Fios de Costura e Grampos",
        description: "Insumos indispensáveis para quilting e fechamento perimetral de colchões."
      },
      nl: {
        name: "Spunbond Nonwoven & Montage Accessoires",
        subtitle: "PP Vlieseline, doorstikgarens en veerclips",
        description: "Essentiële hulpstoffen voor een efficiënt productieproces."
      },
      pl: {
        name: "Włóknina Spunbond i Akcesoria Montażowe",
        subtitle: "Flizelina PP, Nici do Pikowania i Klipsy Krawędziowe",
        description: "Niezbędne materiały pomocnicze do kompletnego montażu materaca."
      },
      ka: {
        name: "სპანბონდის უქსოვი ქსოვილი და ფურნიტურა",
        subtitle: "PP უქსოვი მასალა, ძაფები და სამონტაჟო დეტალები",
        description: "ყველა საჭირო დამხმარე მასალა მატრასის ხარისხიანი აწყობისთვის."
      },
      ga: {
        name: "Neamhfhite Spunbond & Crua-earraí Cóimeála",
        subtitle: "Fabraic PP Neamhfhite, Snáitheanna Cuilteála & Fáiscíní",
        description: "Na hearraí beaga go léir a bhfuil gá leo i ndéanamh tochta."
      },
      ru: {
        name: "Спанбонд и вспомогательная фурнитура для матрасов",
        subtitle: "Нетканое полотно PP, стегальные нитки и скобы",
        description: "Полный перечень комплектующих от флизелина до армированных ниток."
      },
      ar: {
        name: "أقمشة غير منسوجة (سبانبوند) وإكسسوارات تجميع المراتب",
        subtitle: "أقمشة سبانبوند بولي بروبيلين، خيوط تطريز وكلبسات تثبيت",
        description: "جميع المستلزمات الدقيقة والمهمة لخطوط تصنيع المراتب، بما في ذلك أقمشة السبانبوند وخيوط الحياكة."
      },
      zh: {
        name: "丙纶纺粘无纺布(Spunbond)及装配辅料",
        subtitle: "15-120克重PP无纺布，高强绗缝线及封边卡扣",
        description: "床垫内部绗缝衬底、弹簧袋包装专用无纺布，提供白色、黑色及定制阻燃母粒规格。"
      }
    }
  }
];

export const companyData = {
  name: "MakeMattress",
  tagline: "ALL IN ONE HAND! - B2B Mattress Component Supplier",
  address: "ANBAR MAH. 54.CAD 17/A MELIKGAZI KAYSERI TURKEY",
  phone: "+90 352 311 4619",
  email: "info@makemattress.com",
  whatsapp: "+903523114619",
  founded: "2016",
  countriesExported: "35+",
  leadTime: "10-15 Days",
  aboutHeading: "A Little Bit About Us",
  aboutText: "MakeMattress is a premier mattress component provider located at Kayseri / TÜRKİYE. It's much easier for our customers to follow up with one dedicated supplier rather than managing dozens of separate vendors. In a price-conscious global market, having all components under one roof is significantly simpler and more cost-effective. Jump the order quantity barriers, create a mix-loaded container for all your production needs, and bypass minimum order quantities.",
  qualityHeading: "Quality Control & Transparency in Operations",
  qualityText: "Our core team brings more than ten years of international export-import procedures and multi-national trade experience. We recognize that sourcing from multiple manufacturers often creates quality variations and packing discrepancies. To eliminate this, MakeMattress established a dedicated in-house Quality Control department. We enforce strict standardized inspection metrics and gladly accommodate custom client requirements including tailored pallet dimensions, moisture-resistant barrier packing, and specialized loading methods. Trade is a mutual partnership—we provide full operational transparency for every shipment.",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d734.2827059898912!2d35.33304253848609!3d38.74577506675943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152b0549de81b207%3A0x2c96493923f808a9!2sMake%20Mattress!5e0!3m2!1str!2str!4v1608378599992!5m2!1str!2str"
};
