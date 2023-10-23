import { Option } from "./option.model";

const countryCapitalTable: { [country: string]: string } = {
  "Argentina": "Buenos Aires",
  "Australia": "Canberra",
  "Austria": "Vienna",
  "Belgium": "Brussels",
  "Brazil": "Brasília",
  "Canada": "Ottawa",
  "China": "Beijing",
  "Denmark": "Copenhagen",
  "Egypt": "Cairo",
  "France": "Paris",
  "Germany": "Berlin",
  "Greece": "Athens",
  "India": "New Delhi",
  "Indonesia": "Jakarta",
  "Italy": "Rome",
  "Japan": "Tokyo",
  "Mexico": "Mexico City",
  "Netherlands": "Amsterdam",
  "Norway": "Oslo",
  "Russia": "Moscow",
  "South Africa": "Pretoria",
  "South Korea": "Seoul",
  "Spain": "Madrid",
  "Sweden": "Stockholm",
  "Switzerland": "Bern",
  "Turkey": "Ankara",
  "United Kingdom": "London",
  "United States": "Washington, D.C.",
  "Afghanistan": "Kabul",
  "Albania": "Tirana",
  "Algeria": "Algiers",
  "Angola": "Luanda",
  "Armenia": "Yerevan",
  "Azerbaijan": "Baku",
  "Bahrain": "Manama",
  "Bangladesh": "Dhaka",
  "Barbados": "Bridgetown",
  "Belize": "Belmopan",
  "Bhutan": "Thimphu",
  "Botswana": "Gaborone",
  "Burundi": "Bujumbura",
  "Cambodia": "Phnom Penh",
  "Cameroon": "Yaoundé",
  "Chile": "Santiago",
  "Colombia": "Bogotá",
  "Costa Rica": "San José",
  "Croatia": "Zagreb",
  "Cuba": "Havana",
  "Cyprus": "Nicosia",
  "Czech Republic": "Prague",
  "Djibouti": "Djibouti",
  "Dominican Republic": "Santo Domingo",
  "Ecuador": "Quito",
  "El Salvador": "San Salvador",
  "Estonia": "Tallinn",
  "Ethiopia": "Addis Ababa",
  "Fiji": "Suva",
  "Finland": "Helsinki",
  "Gabon": "Libreville",
  "Gambia": "Banjul",
  "Ghana": "Accra",
  "Guatemala": "Guatemala City",
  "Haiti": "Port-au-Prince",
  "Honduras": "Tegucigalpa",
  "Hungary": "Budapest",
  "Iceland": "Reykjavik",
  "Iran": "Tehran",
  "Iraq": "Baghdad",
  "Ireland": "Dublin",
  "Israel": "Jerusalem",
  "Jamaica": "Kingston",
  "Jordan": "Amman",
  "Kazakhstan": "Nur-Sultan",
  "Kenya": "Nairobi",
  "Kuwait": "Kuwait City",
  "Kyrgyzstan": "Bishkek",
  "Laos": "Vientiane",
  "Latvia": "Riga",
  "Lebanon": "Beirut",
  "Lesotho": "Maseru",
  "Liberia": "Monrovia",
  "Libya": "Tripoli",
  "Lithuania": "Vilnius",
  "Luxembourg": "Luxembourg City",
  "Macedonia": "Skopje",
  "Madagascar": "Antananarivo",
  "Malawi": "Lilongwe",
  "Malaysia": "Kuala Lumpur",
  "Mali": "Bamako",
  "Malta": "Valletta",
  "Mauritania": "Nouakchott",
  "Mauritius": "Port Louis",
  "Moldova": "Chisinau",
  "Mongolia": "Ulaanbaatar",
  "Morocco": "Rabat",
  "Mozambique": "Maputo",
  "Myanmar": "Naypyidaw",
  "Nepal": "Kathmandu",
  "Nicaragua": "Managua",
  "Niger": "Niamey",
  "Nigeria": "Abuja",
  "Oman": "Muscat",
  "Pakistan": "Islamabad",
  "Panama": "Panama City",
  "Paraguay": "Asunción",
  "Peru": "Lima",
  "Philippines": "Manila",
  "Poland": "Warsaw",
  "Portugal": "Lisbon",
  "Qatar": "Doha",
  "Romania": "Bucharest",
  "Rwanda": "Kigali",
  "Saudi Arabia": "Riyadh",
  "Senegal": "Dakar",
  "Serbia": "Belgrade",
  "Seychelles": "Victoria",
  "Sierra Leone": "Freetown",
  "Singapore": "Singapore",
  "Slovakia": "Bratislava",
  "Slovenia": "Ljubljana",
  "Solomon Islands": "Honiara",
  "Somalia": "Mogadishu",
  "Sri Lanka": "Colombo",
  "Sudan": "Khartoum",
  "Suriname": "Paramaribo",
  "Syria": "Damascus",
  "Tajikistan": "Dushanbe",
  "Tanzania": "Dodoma",
  "Thailand": "Bangkok",
  "Togo": "Lome",
  "Trinidad and Tobago": "Port of Spain",
  "Tunisia": "Tunis",
  "Turkmenistan": "Ashgabat",
  "Uganda": "Kampala",
  "Ukraine": "Kyiv",
  "Uruguay": "Montevideo",
  "Uzbekistan": "Tashkent",
  "Venezuela": "Caracas",
  "Vietnam": "Hanoi",
  "Yemen": "Sanaa",
  "Zambia": "Lusaka",
  "Zimbabwe": "Harare"
};

export function getAllCountriesAndCapitals() {
  return { ...countryCapitalTable }
}


export function getCountryCapitalTableRandomElements(size: number): { [country: string]: string } {
  const shuffledTable = { ...countryCapitalTable }; // Create a copy to shuffle

  // Shuffle the keys
  let keys = Object.keys(shuffledTable);
  shuffleArray(keys)

  // Slice the first 'count' elements to get the random selection
  const randomSelection: { [country: string]: string } = {};
  keys = keys.slice(0, size);
  keys.forEach((key) => {
    randomSelection[key] = shuffledTable[key];
  });

  return randomSelection;
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export function initializeData(gameSize: number): Option[] {
  let countryCapitalMap = getCountryCapitalTableRandomElements(gameSize)
  const countries = Object.keys(countryCapitalMap);
  const capitals = Object.values(countryCapitalMap);
  const countriesAndCapitals = [...Object.keys(countryCapitalMap), ...Object.values(countryCapitalMap)]
  let options: Option[] = [];
  countriesAndCapitals.forEach(el => {
    let option: Option = {
      textValue: el,
      disabled: false,
      visible: true,
      selected: false,
      wrong: false
    }
    options.push(option)
  })
  shuffleArray(options)
  return options;
}