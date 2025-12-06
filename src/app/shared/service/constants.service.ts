import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() {
  }


  genders() {
    return [
      "Male",
      "Female"
    ]
  }

  investmentTypes() {
    return [
      "Passive Income",
      "Capital Growth",
      "Hybrid Investment",
    ]
  }

  propertyCompletionTypes() {
    return [
      "New Development Projects",
      "Pre-Sale Investment",
      "Under Construction",
      "Joint Ventures",
    ]
  }

  propertyTypes() {
    return [
      "Residential",
      "Commercial",
      "Industrial",
      "Land"
    ]
  }

  propertyValues() {
    return [
      "R5k-50k",
      "R50k-250k",
      "R250k-R1M",
      "R1M-R5M",
      "R5M+"
    ]
  }

  propertyManagementTypes() {
    return [
      "Fully Managed",
      "Self Managed"]
  }


  nationalities() {
    return [
      "Afghan",
      "Albanian",
      "Algerian",
      "American",
      "Andorran",
      "Angolan",
      "Antiguan",
      "Argentine",
      "Armenian",
      "Australian",
      "Austrian",
      "Azerbaijani",
      "Bahamian",
      "Bahraini",
      "Bangladeshi",
      "Barbadian",
      "Belarusian",
      "Belgian",
      "Belizean",
      "Beninese",
      "Bhutanese",
      "Bolivian",
      "Bosnian",
      "Botswanan",
      "Brazilian",
      "British",
      "Bruneian",
      "Bulgarian",
      "Burkinabe",
      "Burmese",
      "Burundian",
      "Cambodian",
      "Cameroonian",
      "Canadian",
      "Cape Verdean",
      "Central African",
      "Chadian",
      "Chilean",
      "Chinese",
      "Colombian",
      "Comoran",
      "Congolese",
      "Costa Rican",
      "Croatian",
      "Cuban",
      "Cypriot",
      "Czech",
      "Danish",
      "Djiboutian",
      "Dominican",
      "Dutch",
      "East Timorese",
      "Ecuadorian",
      "Egyptian",
      "Emirati",
      "English",
      "Equatorial Guinean",
      "Eritrean",
      "Estonian",
      "Ethiopian",
      "Fijian",
      "Finnish",
      "French",
      "Gabonese",
      "Gambian",
      "Georgian",
      "German",
      "Ghanaian",
      "Greek",
      "Grenadian",
      "Guatemalan",
      "Guinean",
      "Guinea-Bissauan",
      "Guyanese",
      "Haitian",
      "Honduran",
      "Hungarian",
      "Icelandic",
      "Indian",
      "Indonesian",
      "Iranian",
      "Iraqi",
      "Irish",
      "Israeli",
      "Italian",
      "Ivorian",
      "Jamaican",
      "Japanese",
      "Jordanian",
      "Kazakh",
      "Kenyan",
      "Kiribati",
      "Korean",
      "Kuwaiti",
      "Kyrgyz",
      "Lao",
      "Latvian",
      "Lebanese",
      "Liberian",
      "Libyan",
      "Liechtensteiner",
      "Lithuanian",
      "Luxembourger",
      "Macedonian",
      "Malagasy",
      "Malawian",
      "Malaysian",
      "Maldivian",
      "Malien",
      "Maltese",
      "Marshallese",
      "Mauritanian",
      "Mauritian",
      "Mexican",
      "Micronesian",
      "Moldovan",
      "Monégasque",
      "Mongolian",
      "Montenegrin",
      "Moroccan",
      "Mozambican",
      "Namibian",
      "Nauruan",
      "Nepalese",
      "New Zealander",
      "Nicaraguan",
      "Nigerien",
      "Nigerian",
      "Norwegian",
      "Omani",
      "Pakistani",
      "Palauan",
      "Palestinian",
      "Panamanian",
      "Papua New Guinean",
      "Paraguayan",
      "Peruvian",
      "Philippine",
      "Polish",
      "Portuguese",
      "Qatari",
      "Romanian",
      "Russian",
      "Rwandan",
      "Saint Lucian",
      "Salvadoran",
      "Samoan",
      "San Marinese",
      "Sao Tomean",
      "Saudi",
      "Scottish",
      "Senegalese",
      "Serbian",
      "Seychellois",
      "Sierra Leonean",
      "Singaporean",
      "Slovak",
      "Slovenian",
      "Solomon Islander",
      "Somali",
      "South African",
      "South Korean",
      "Spanish",
      "Sri Lankan",
      "Sudanese",
      "Surinamese",
      "Swazi",
      "Swedish",
      "Swiss",
      "Syrian",
      "Taiwanese",
      "Tajik",
      "Tanzanian",
      "Thai",
      "Togolese",
      "Tongan",
      "Trinidadian",
      "Tunisian",
      "Turkish",
      "Turkmen",
      "Tuvaluan",
      "Ugandan",
      "Ukrainian",
      "Uruguayan",
      "Uzbek",
      "Vatican",
      "Venezuelan",
      "Vietnamese",
      "Welsh",
      "Yemeni",
      "Zambian",
      "Zimbabwean"
    ]

  }
}
