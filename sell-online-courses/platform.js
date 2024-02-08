!(function () {
  "use strict";
  let a;
  const i = new Uint8Array(16);
  function e() {
    if (
      !a &&
      ((a =
        "undefined" != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)),
      !a)
    )
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    return a(i);
  }
  const r = [];
  for (let a = 0; a < 256; ++a) r.push((a + 256).toString(16).slice(1));
  function t(a, i = 0) {
    return (
      r[a[i + 0]] +
      r[a[i + 1]] +
      r[a[i + 2]] +
      r[a[i + 3]] +
      "-" +
      r[a[i + 4]] +
      r[a[i + 5]] +
      "-" +
      r[a[i + 6]] +
      r[a[i + 7]] +
      "-" +
      r[a[i + 8]] +
      r[a[i + 9]] +
      "-" +
      r[a[i + 10]] +
      r[a[i + 11]] +
      r[a[i + 12]] +
      r[a[i + 13]] +
      r[a[i + 14]] +
      r[a[i + 15]]
    );
  }
  const n =
    "undefined" != typeof crypto &&
    crypto.randomUUID &&
    crypto.randomUUID.bind(crypto);
  var o = { randomUUID: n };
  function c(a, i, r) {
    if (o.randomUUID && !i && !a) return o.randomUUID();
    a = a || {};
    const n = a.random || (a.rng || e)();
    if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), i)) {
      r = r || 0;
      for (let a = 0; a < 16; ++a) i[r + a] = n[a];
      return i;
    }
    return t(n);
  }
  class s {
    async sendEvent(a, i, e = {}) {
      const r = a.getAttribute("data-session"),
        t = a.getAttribute("data-id"),
        n = Intl.DateTimeFormat().resolvedOptions().timeZone,
        o = u[n];
      let s = window.location.href,
        m =
          null === localStorage || void 0 === localStorage
            ? void 0
            : localStorage.getItem("sj_v_id");
      m ||
        ((m = c()),
        null === localStorage ||
          void 0 === localStorage ||
          localStorage.setItem("sj_v_id", m)),
        A.includes(s) && (s = "");
      const d = {
        load_session_id: r,
        widget_id: t,
        visitor_id: m,
        version: "1",
        action: i,
        timestamp: new Date().toISOString(),
        payload: JSON.stringify(Object.assign({ country: o, page: s }, e)),
      };
      await fetch("https://api.tinybird.co/v0/events?name=widget_events", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer p.eyJ1IjogIjA4NDZiYzMxLWMzOTQtNGVkMS04NDAxLWVkNjU5M2QxMDBlMiIsICJpZCI6ICI2ZTMwMjk0OS0yODgyLTQ0NDQtYWU1Yy02YTQ2ZWYyYzUxMTIiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.9K_HD2xYyv9QYq109bEVKf_jTHD3oDCNfn0KrCFOHaI",
        },
        body: JSON.stringify(d),
      });
    }
    track(a, i) {
      const e = c();
      a.setAttribute("data-session", e);
      const r = { sessionId: e, isVisible: !1, startTime: void 0 },
        t = (i) => {
          if (((r.isVisible = i), i))
            (r.startTime = Date.now()), this.sendEvent(a, "view_start");
          else {
            if (!r.startTime) return;
            const i = Date.now(),
              e = parseFloat(((i - r.startTime) / 1e3).toFixed(2));
            this.sendEvent(a, "view_end", { duration: e });
          }
        },
        n = new IntersectionObserver((a) => {
          a.forEach((a) => {
            t(a.isIntersecting);
          });
        }),
        o = new MutationObserver((i) => {
          i.forEach((i) => {
            "childList" === i.type &&
              i.removedNodes.forEach((i) => {
                i === a && t(!1);
              });
          });
        });
      a.addEventListener("click", () => {
        this.sendEvent(a, "click");
      }),
        (r.intersectionObserver = n),
        (r.mutationObserver = o),
        i
          ? t(!0)
          : (n.observe(a),
            a.parentElement && o.observe(a.parentElement, { childList: !0 }));
    }
  }
  const A = [
      "about:blank",
      "about:srcdoc",
      "about:invalid",
      "about:blank#blocked",
    ],
    u = {
      "Asia/Barnaul": "RU",
      "Africa/Nouakchott": "MR",
      "Africa/Lusaka": "ZM",
      "Asia/Pyongyang": "KP",
      "Europe/Bratislava": "SK",
      "America/Belize": "BZ",
      "America/Maceio": "BR",
      "Pacific/Chuuk": "FM",
      "Indian/Comoro": "KM",
      "Pacific/Palau": "PW",
      "Asia/Jakarta": "ID",
      "Africa/Windhoek": "NA",
      "America/Chihuahua": "MX",
      "America/Nome": "US",
      "Africa/Mbabane": "SZ",
      "Africa/Porto-Novo": "BJ",
      "Europe/San_Marino": "SM",
      "Pacific/Fakaofo": "TK",
      "America/Denver": "US",
      "Europe/Belgrade": "RS",
      "America/Indiana/Tell_City": "US",
      "America/Fortaleza": "BR",
      "America/Halifax": "CA",
      "Europe/Bucharest": "RO",
      "America/Indiana/Petersburg": "US",
      "Europe/Kirov": "RU",
      "Europe/Athens": "GR",
      "America/Argentina/Ushuaia": "AR",
      "Europe/Monaco": "MC",
      "Europe/Vilnius": "LT",
      "Europe/Copenhagen": "DK",
      "Pacific/Kanton": "KI",
      "America/Caracas": "VE",
      "Asia/Almaty": "KZ",
      "Europe/Paris": "FR",
      "Africa/Blantyre": "MW",
      "Asia/Muscat": "OM",
      "America/North_Dakota/Beulah": "US",
      "America/Matamoros": "MX",
      "Asia/Irkutsk": "RU",
      "America/Costa_Rica": "CR",
      "America/Araguaina": "BR",
      "Atlantic/Canary": "ES",
      "America/Santo_Domingo": "DO",
      "America/Vancouver": "CA",
      "Africa/Addis_Ababa": "ET",
      "Africa/Accra": "GH",
      "Pacific/Kwajalein": "MH",
      "Asia/Baghdad": "IQ",
      "Australia/Adelaide": "AU",
      "Australia/Hobart": "AU",
      "America/Guayaquil": "EC",
      "America/Argentina/Tucuman": "AR",
      "Australia/Lindeman": "AU",
      "America/New_York": "US",
      "Pacific/Fiji": "FJ",
      "America/Antigua": "AG",
      "Africa/Casablanca": "MA",
      "America/Paramaribo": "SR",
      "Africa/Cairo": "EG",
      "America/Cayenne": "GF",
      "America/Detroit": "US",
      "Antarctica/Syowa": "AQ",
      "Africa/Douala": "CM",
      "America/Argentina/La_Rioja": "AR",
      "Africa/Lagos": "NG",
      "America/St_Barthelemy": "BL",
      "Asia/Nicosia": "CY",
      "Asia/Macau": "MO",
      "Europe/Riga": "LV",
      "Asia/Ashgabat": "TM",
      "Indian/Antananarivo": "MG",
      "America/Argentina/San_Juan": "AR",
      "Asia/Aden": "YE",
      "Asia/Tomsk": "RU",
      "America/Asuncion": "PY",
      "Pacific/Bougainville": "PG",
      "Asia/Vientiane": "LA",
      "America/Mazatlan": "MX",
      "Africa/Luanda": "AO",
      "Europe/Oslo": "NO",
      "Africa/Kinshasa": "CD",
      "Europe/Warsaw": "PL",
      "America/Grand_Turk": "TC",
      "Asia/Seoul": "KR",
      "Africa/Tripoli": "LY",
      "America/St_Thomas": "VI",
      "Asia/Kathmandu": "NP",
      "Pacific/Pitcairn": "PN",
      "Pacific/Nauru": "NR",
      "America/Curacao": "CW",
      "Asia/Kabul": "AF",
      "Pacific/Tongatapu": "TO",
      "Europe/Simferopol": "UA",
      "Asia/Ust-Nera": "RU",
      "Africa/Mogadishu": "SO",
      "Indian/Mayotte": "YT",
      "Pacific/Niue": "NU",
      "America/Thunder_Bay": "CA",
      "Atlantic/Azores": "PT",
      "Pacific/Gambier": "PF",
      "Europe/Stockholm": "SE",
      "Africa/Libreville": "GA",
      "America/Punta_Arenas": "CL",
      "America/Guatemala": "GT",
      "America/Noronha": "BR",
      "Europe/Helsinki": "FI",
      "Asia/Gaza": "PS",
      "Pacific/Kosrae": "FM",
      "America/Aruba": "AW",
      "America/Nassau": "BS",
      "Asia/Choibalsan": "MN",
      "America/Winnipeg": "CA",
      "America/Anguilla": "AI",
      "Asia/Thimphu": "BT",
      "Asia/Beirut": "LB",
      "Atlantic/Faroe": "FO",
      "Europe/Berlin": "DE",
      "Europe/Amsterdam": "NL",
      "Pacific/Honolulu": "US",
      "America/Regina": "CA",
      "America/Scoresbysund": "GL",
      "Europe/Vienna": "AT",
      "Europe/Tirane": "AL",
      "Africa/El_Aaiun": "EH",
      "America/Creston": "CA",
      "Asia/Qostanay": "KZ",
      "Asia/Ho_Chi_Minh": "VN",
      "Europe/Samara": "RU",
      "Europe/Rome": "IT",
      "Australia/Eucla": "AU",
      "America/El_Salvador": "SV",
      "America/Chicago": "US",
      "Africa/Abidjan": "CI",
      "Asia/Kamchatka": "RU",
      "Pacific/Tarawa": "KI",
      "America/Santiago": "CL",
      "America/Bahia": "BR",
      "Indian/Christmas": "CX",
      "Asia/Atyrau": "KZ",
      "Asia/Dushanbe": "TJ",
      "Europe/Ulyanovsk": "RU",
      "America/Yellowknife": "CA",
      "America/Recife": "BR",
      "Australia/Sydney": "AU",
      "America/Fort_Nelson": "CA",
      "Pacific/Efate": "VU",
      "Europe/Saratov": "RU",
      "Africa/Banjul": "GM",
      "Asia/Omsk": "RU",
      "Europe/Ljubljana": "SI",
      "Europe/Budapest": "HU",
      "Europe/Astrakhan": "RU",
      "America/Argentina/Buenos_Aires": "AR",
      "Pacific/Chatham": "NZ",
      "America/Argentina/Salta": "AR",
      "Africa/Niamey": "NE",
      "Asia/Pontianak": "ID",
      "Indian/Reunion": "RE",
      "Asia/Hong_Kong": "HK",
      "Antarctica/McMurdo": "AQ",
      "Africa/Malabo": "GQ",
      "America/Los_Angeles": "US",
      "America/Argentina/Cordoba": "AR",
      "Pacific/Pohnpei": "FM",
      "America/Tijuana": "MX",
      "America/Campo_Grande": "BR",
      "America/Dawson_Creek": "CA",
      "Asia/Novosibirsk": "RU",
      "Pacific/Pago_Pago": "AS",
      "Asia/Jerusalem": "IL",
      "Europe/Sarajevo": "BA",
      "Africa/Freetown": "SL",
      "Asia/Yekaterinburg": "RU",
      "America/Juneau": "US",
      "Africa/Ouagadougou": "BF",
      "Africa/Monrovia": "LR",
      "Europe/Kiev": "UA",
      "America/Argentina/San_Luis": "AR",
      "Asia/Tokyo": "JP",
      "Asia/Qatar": "QA",
      "America/La_Paz": "BO",
      "America/Bogota": "CO",
      "America/Thule": "GL",
      "Asia/Manila": "PH",
      "Asia/Hovd": "MN",
      "Asia/Tehran": "IR",
      "Atlantic/Madeira": "PT",
      "America/Metlakatla": "US",
      "Europe/Vatican": "VA",
      "Asia/Bishkek": "KG",
      "Asia/Dili": "TL",
      "Antarctica/Palmer": "AQ",
      "Atlantic/Cape_Verde": "CV",
      "Indian/Chagos": "IO",
      "America/Kentucky/Monticello": "US",
      "Africa/Algiers": "DZ",
      "Africa/Maseru": "LS",
      "Asia/Kuala_Lumpur": "MY",
      "Africa/Khartoum": "SD",
      "America/Argentina/Rio_Gallegos": "AR",
      "America/Blanc-Sablon": "CA",
      "Africa/Maputo": "MZ",
      "America/Tortola": "VG",
      "Atlantic/Bermuda": "BM",
      "America/Argentina/Catamarca": "AR",
      "America/Cayman": "KY",
      "America/Puerto_Rico": "PR",
      "Pacific/Majuro": "MH",
      "Europe/Busingen": "DE",
      "Pacific/Midway": "UM",
      "Indian/Cocos": "CC",
      "Asia/Singapore": "SG",
      "America/Boise": "US",
      "America/Nuuk": "GL",
      "America/Goose_Bay": "CA",
      "Australia/Broken_Hill": "AU",
      "Africa/Dar_es_Salaam": "TZ",
      "Africa/Asmara": "ER",
      "Asia/Samarkand": "UZ",
      "Asia/Tbilisi": "GE",
      "America/Argentina/Jujuy": "AR",
      "America/Indiana/Winamac": "US",
      "America/Porto_Velho": "BR",
      "Asia/Magadan": "RU",
      "Europe/Zaporozhye": "UA",
      "Antarctica/Casey": "AQ",
      "Asia/Shanghai": "CN",
      "Pacific/Norfolk": "NF",
      "Europe/Guernsey": "GG",
      "Australia/Brisbane": "AU",
      "Antarctica/DumontDUrville": "AQ",
      "America/Havana": "CU",
      "America/Atikokan": "CA",
      "America/Mexico_City": "MX",
      "America/Rankin_Inlet": "CA",
      "America/Cuiaba": "BR",
      "America/Resolute": "CA",
      "Africa/Ceuta": "ES",
      "Arctic/Longyearbyen": "SJ",
      "Pacific/Guam": "GU",
      "Asia/Damascus": "SY",
      "Asia/Colombo": "LK",
      "Asia/Yerevan": "AM",
      "America/Montserrat": "MS",
      "America/Belem": "BR",
      "Europe/Kaliningrad": "RU",
      "Atlantic/South_Georgia": "GS",
      "Asia/Tashkent": "UZ",
      "Asia/Kolkata": "IN",
      "America/St_Johns": "CA",
      "Asia/Srednekolymsk": "RU",
      "Asia/Yakutsk": "RU",
      "Europe/Prague": "CZ",
      "Africa/Djibouti": "DJ",
      "Asia/Dubai": "AE",
      "Europe/Uzhgorod": "UA",
      "America/Edmonton": "CA",
      "Asia/Famagusta": "CY",
      "America/Indiana/Knox": "US",
      "Asia/Hebron": "PS",
      "Asia/Taipei": "TW",
      "Europe/London": "GB",
      "Africa/Dakar": "SN",
      "Australia/Darwin": "AU",
      "America/Glace_Bay": "CA",
      "Antarctica/Vostok": "AQ",
      "America/Indiana/Vincennes": "US",
      "America/Nipigon": "CA",
      "Asia/Kuwait": "KW",
      "Pacific/Guadalcanal": "SB",
      "America/Toronto": "CA",
      "Africa/Gaborone": "BW",
      "Africa/Bujumbura": "BI",
      "Africa/Lubumbashi": "CD",
      "America/Merida": "MX",
      "America/Marigot": "MF",
      "Europe/Zagreb": "HR",
      "Pacific/Easter": "CL",
      "America/Santarem": "BR",
      "Pacific/Noumea": "NC",
      "America/Sitka": "US",
      "Atlantic/Stanley": "FK",
      "Pacific/Funafuti": "TV",
      "America/Iqaluit": "CA",
      "America/Rainy_River": "CA",
      "America/Anchorage": "US",
      "America/Lima": "PE",
      "Asia/Baku": "AZ",
      "America/Indiana/Vevay": "US",
      "Asia/Ulaanbaatar": "MN",
      "America/Managua": "NI",
      "Asia/Krasnoyarsk": "RU",
      "Asia/Qyzylorda": "KZ",
      "America/Eirunepe": "BR",
      "Europe/Podgorica": "ME",
      "Europe/Chisinau": "MD",
      "Europe/Mariehamn": "AX",
      "Europe/Volgograd": "RU",
      "Africa/Nairobi": "KE",
      "Europe/Isle_of_Man": "IM",
      "America/Menominee": "US",
      "Africa/Harare": "ZW",
      "Asia/Anadyr": "RU",
      "America/Moncton": "CA",
      "Indian/Maldives": "MV",
      "America/Whitehorse": "CA",
      "Antarctica/Mawson": "AQ",
      "Europe/Madrid": "ES",
      "America/Argentina/Mendoza": "AR",
      "America/Manaus": "BR",
      "Africa/Bangui": "CF",
      "Indian/Mauritius": "MU",
      "Africa/Tunis": "TN",
      "Australia/Lord_Howe": "AU",
      "America/Kentucky/Louisville": "US",
      "America/North_Dakota/Center": "US",
      "Asia/Novokuznetsk": "RU",
      "Asia/Makassar": "ID",
      "America/Port_of_Spain": "TT",
      "America/Bahia_Banderas": "MX",
      "Pacific/Auckland": "NZ",
      "America/Sao_Paulo": "BR",
      "Asia/Dhaka": "BD",
      "America/Pangnirtung": "CA",
      "Europe/Dublin": "IE",
      "Asia/Brunei": "BN",
      "Africa/Brazzaville": "CG",
      "America/Montevideo": "UY",
      "America/Jamaica": "JM",
      "America/Indiana/Indianapolis": "US",
      "America/Kralendijk": "BQ",
      "Europe/Gibraltar": "GI",
      "Pacific/Marquesas": "PF",
      "Pacific/Apia": "WS",
      "Europe/Jersey": "JE",
      "America/Phoenix": "US",
      "Africa/Ndjamena": "TD",
      "Asia/Karachi": "PK",
      "Africa/Kampala": "UG",
      "Asia/Sakhalin": "RU",
      "America/Martinique": "MQ",
      "Europe/Moscow": "RU",
      "Africa/Conakry": "GN",
      "America/Barbados": "BB",
      "Africa/Lome": "TG",
      "America/Ojinaga": "MX",
      "America/Tegucigalpa": "HN",
      "Asia/Bangkok": "TH",
      "Africa/Johannesburg": "ZA",
      "Europe/Vaduz": "LI",
      "Africa/Sao_Tome": "ST",
      "America/Cambridge_Bay": "CA",
      "America/Lower_Princes": "SX",
      "America/Miquelon": "PM",
      "America/St_Kitts": "KN",
      "Australia/Melbourne": "AU",
      "Europe/Minsk": "BY",
      "Asia/Vladivostok": "RU",
      "Europe/Sofia": "BG",
      "Antarctica/Davis": "AQ",
      "Pacific/Galapagos": "EC",
      "America/North_Dakota/New_Salem": "US",
      "Asia/Amman": "JO",
      "Pacific/Wallis": "WF",
      "America/Hermosillo": "MX",
      "Pacific/Kiritimati": "KI",
      "Antarctica/Macquarie": "AU",
      "America/Guyana": "GY",
      "Asia/Riyadh": "SA",
      "Pacific/Tahiti": "PF",
      "America/St_Vincent": "VC",
      "America/Cancun": "MX",
      "America/Grenada": "GD",
      "Pacific/Wake": "UM",
      "America/Dawson": "CA",
      "Europe/Brussels": "BE",
      "Indian/Kerguelen": "TF",
      "America/Yakutat": "US",
      "Indian/Mahe": "SC",
      "Atlantic/Reykjavik": "IS",
      "America/Panama": "PA",
      "America/Guadeloupe": "GP",
      "Europe/Malta": "MT",
      "Antarctica/Troll": "AQ",
      "Asia/Jayapura": "ID",
      "Asia/Bahrain": "BH",
      "Asia/Chita": "RU",
      "Europe/Tallinn": "EE",
      "Asia/Khandyga": "RU",
      "America/Rio_Branco": "BR",
      "Atlantic/St_Helena": "SH",
      "Africa/Juba": "SS",
      "America/Adak": "US",
      "Pacific/Saipan": "MP",
      "America/St_Lucia": "LC",
      "America/Inuvik": "CA",
      "Europe/Luxembourg": "LU",
      "Africa/Bissau": "GW",
      "Asia/Oral": "KZ",
      "America/Boa_Vista": "BR",
      "Europe/Skopje": "MK",
      "America/Port-au-Prince": "HT",
      "Pacific/Port_Moresby": "PG",
      "Europe/Andorra": "AD",
      "America/Indiana/Marengo": "US",
      "Africa/Kigali": "RW",
      "Africa/Bamako": "ML",
      "America/Dominica": "DM",
      "Asia/Aqtobe": "KZ",
      "Europe/Istanbul": "TR",
      "Pacific/Rarotonga": "CK",
      "America/Danmarkshavn": "GL",
      "Europe/Zurich": "CH",
      "Asia/Yangon": "MM",
      "America/Monterrey": "MX",
      "Europe/Lisbon": "PT",
      "Asia/Kuching": "MY",
      "Antarctica/Rothera": "AQ",
      "Australia/Perth": "AU",
      "Asia/Phnom_Penh": "KH",
      "America/Swift_Current": "CA",
      "Asia/Aqtau": "KZ",
      "Asia/Urumqi": "CN",
    };
  class m {
    static log(a) {
      window.senjaDebug && console.log(a);
    }
  }
  class d {
    static scripts = new Map();
    static async loadScript(a) {
      if ((m.log(`Loading script ${a}`), !this.scripts.has(a))) {
        m.log(`Script ${a} not loaded yet, loading...`);
        let i = document.querySelector(`script[src="${a}"]`);
        if (!i) {
          m.log(`Script ${a} not found, creating...`);
          const e = new Promise((e, r) => {
            (i = document.createElement("script")),
              (i.src = a),
              (i.async = !0),
              (i.onload = () => e(i)),
              (i.onerror = r),
              document.head.appendChild(i);
          });
          this.scripts.set(a, e);
        }
      }
      return (
        m.log(`Script ${a} loaded, returning promise...`),
        m.log(this.scripts.get(a)),
        this.scripts.get(a)
      );
    }
  }
  class l {
    static log(a) {
      window.senjaDebug && console.log(a);
    }
    static analytics = new s();
    static fixedWidgetDesigns = ["popup"];
    builtWidgets = [];
    static init() {
      if (window.SenjaBuilderInitialized) return;
      (window.SenjaBuilderInitialized = !0), this.setupDebugger();
      const a = document.querySelectorAll(".senja-embed");
      this.setupStyles(), this.setupEmbeds(a), this.observe();
    }
    static setupDebugger() {
      const a = "true" === document.currentScript?.getAttribute("data-debug");
      window.senjaDebug = a;
    }
    static insertCustomCss(a) {
      let i = document.querySelector("#senja-widget-css");
      i ||
        ((i = document.createElement("style")),
        (i.id = "senja-widget-css"),
        document.head.appendChild(i)),
        (i.textContent = i.textContent + "\n" + a);
    }
    static observe() {
      const a = new MutationObserver(
        function (a) {
          const i = document.querySelectorAll(".senja-embed");
          this.setupEmbeds(i);
        }.bind(this)
      );
      a.observe(document, {
        attributes: !1,
        childList: !0,
        characterData: !1,
        subtree: !0,
      });
    }
    static setupStyles() {
      if (document.querySelector('style[data-senja-platform="true"]')) return;
      const a = document.createElement("style");
      (a.type = "text/css"),
        a.setAttribute("data-senja-platform", "true"),
        (a.innerHTML =
          '\n      .senja-spinner-container {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          width: 100%;\n      }\n    \n      .senja-embed[data-built="true"] .senja-spinner-container {\n        display: none;\n      }\n\n        .senja-spinner {\n          display: inline-block;\n          width: 16px;\n          height: 16px;\n          border: 3px solid rgba(220, 220, 230, 0.5) !important;\n          border-radius: 50%;\n          border-top-color: rgba(220, 220, 230, 1) !important;\n          animation: spin 1s ease-in-out infinite !important;\n          -webkit-animation: spin 1s ease-in-out infinite !important;\n        }\n        \n        @keyframes spin {\n          to { -webkit-transform: rotate(360deg); }\n        }\n        @-webkit-keyframes spin {\n          to { -webkit-transform: rotate(360deg); }\n        }\n    '),
        document.head.appendChild(a);
    }
    static beginTracking(a, i) {
      "true" == a.getAttribute("data-track") &&
        this.analytics.track(a, this.fixedWidgetDesigns.includes(i));
    }
    static setupEmbeds(a) {
      for (let i = 0; i < a.length; i++) {
        const e = a[i];
        if (null == e) continue;
        const r = e.getAttribute("data-id");
        r &&
          "true" !== e.getAttribute("data-built") &&
          "true" !== e.getAttribute("data-building") &&
          this.buildEmbed(e, r);
      }
    }
    static addLoadingSpinner(a) {
      if ("false" === a.getAttribute("data-spinner")) return;
      const i = document.createElement("div");
      i.classList.add("senja-spinner-container");
      const e = document.createElement("div");
      e.classList.add("senja-spinner"), i.appendChild(e), a.appendChild(i);
    }
    static async buildEmbed(a, i) {
      if ("true" === a.getAttribute("data-built")) return;
      a.setAttribute("data-building", "true"), this.addLoadingSpinner(a);
      const e = await fetch(`https://widget.senja.io/api/widget-config/${i}`),
        r = await e.json(),
        t = r.widget;
      if (!t) return;
      const n = r.builder,
        o = t?.config?.design?.type;
      if (!o) return;
      let c = r.reviews ?? [];
      if (
        ("random" == t?.testimonial_arrangement?.sort &&
          (c = c.sort(() => Math.random() - 0.5)),
        await d.loadScript(n),
        t.config?.customCss && this.insertCustomCss(t.config.customCss),
        "true" === a.getAttribute("data-lazyload") &&
          !this.fixedWidgetDesigns.includes(o))
      )
        return void this.lazyload(a, {
          widget: t,
          reviews: c,
          id: i,
          designId: o,
        });
      const s = new CustomEvent("senjaWidgetLoaded", {
        detail: { id: i, reviews: c, widget: t, designId: o },
      });
      this.beginTracking(a, o), window.dispatchEvent(s);
    }
    static lazyload(a, i) {
      const { widget: e, reviews: r, id: t, designId: n } = i,
        o = new IntersectionObserver((i, o) => {
          i.forEach((i) => {
            if (i.isIntersecting) {
              if ("true" === a.getAttribute("data-built"))
                return o?.unobserve(a);
              const c = new CustomEvent("senjaWidgetLoaded", {
                detail: { id: t, reviews: r, widget: e, designId: n },
              });
              this.beginTracking(a, n),
                window.dispatchEvent(c),
                o.unobserve(i.target);
            }
          });
        });
      o.observe(a);
    }
  }
  l.init();
})();
