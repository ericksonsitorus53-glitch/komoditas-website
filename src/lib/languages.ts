// All world languages and countries
// Format: { code: ISO 639-1, name: native name, englishName: English name, country: country name, flag: emoji flag }

export interface Language {
  code: string;
  name: string;
  englishName: string;
  country: string;
  flag: string;
}

export const languages: Language[] = [
  // Asia
  { code: 'id', name: 'Bahasa Indonesia', englishName: 'Indonesian', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', englishName: 'Malay', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'tl', name: 'Tagalog', englishName: 'Filipino', country: 'Philippines', flag: '🇵🇭' },
  { code: 'th', name: 'ภาษาไทย', englishName: 'Thai', country: 'Thailand', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', englishName: 'Vietnamese', country: 'Vietnam', flag: '🇻🇳' },
  { code: 'my', name: 'မြန်မာဘာသာ', englishName: 'Burmese', country: 'Myanmar', flag: '🇲🇲' },
  { code: 'km', name: 'ភាសាខ្មែរ', englishName: 'Khmer', country: 'Cambodia', flag: '🇰🇭' },
  { code: 'lo', name: 'ພາສາລາວ', englishName: 'Lao', country: 'Laos', flag: '🇱🇦' },
  { code: 'en', name: 'English', englishName: 'English', country: 'United States', flag: '🇺🇸' },
  { code: 'zh', name: '中文', englishName: 'Chinese', country: 'China', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', englishName: 'Japanese', country: 'Japan', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', englishName: 'Korean', country: 'South Korea', flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', country: 'India', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', country: 'Bangladesh', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'ne', name: 'नेपाली', englishName: 'Nepali', country: 'Nepal', flag: '🇳🇵' },
  { code: 'si', name: 'සිංහල', englishName: 'Sinhala', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', country: 'Pakistan', flag: '🇵🇰' },
  { code: 'ur', name: 'اردو', englishName: 'Urdu', country: 'Pakistan', flag: '🇵🇰' },
  { code: 'fa', name: 'فارسی', englishName: 'Persian', country: 'Iran', flag: '🇮🇷' },
  { code: 'ps', name: 'پښتو', englishName: 'Pashto', country: 'Afghanistan', flag: '🇦🇫' },
  { code: 'tr', name: 'Türkçe', englishName: 'Turkish', country: 'Turkey', flag: '🇹🇷' },
  { code: 'ar', name: 'العربية', englishName: 'Arabic', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', englishName: 'Hebrew', country: 'Israel', flag: '🇮🇱' },
  { code: 'hy', name: 'Հայերեն', englishName: 'Armenian', country: 'Armenia', flag: '🇦🇲' },
  { code: 'ka', name: 'ქართული', englishName: 'Georgian', country: 'Georgia', flag: '🇬🇪' },
  { code: 'az', name: 'Azərbaycan dili', englishName: 'Azerbaijani', country: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'uz', name: 'Oʻzbek tili', englishName: 'Uzbek', country: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'kk', name: 'Қазақ тілі', englishName: 'Kazakh', country: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'ky', name: 'Кыргызча', englishName: 'Kyrgyz', country: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'tg', name: 'Тоҷикӣ', englishName: 'Tajik', country: 'Tajikistan', flag: '🇹🇯' },
  { code: 'mn', name: 'Монгол хэл', englishName: 'Mongolian', country: 'Mongolia', flag: '🇲🇳' },
  { code: 'bo', name: 'བོད་སྐད', englishName: 'Tibetan', country: 'China', flag: '🇨🇳' },
  { code: 'dz', name: 'རྫོང་ཁ', englishName: 'Dzongkha', country: 'Bhutan', flag: '🇧🇹' },
  { code: 'mt', name: 'Malti', englishName: 'Maltese', country: 'Malta', flag: '🇲🇹' },
  { code: 'tl', name: 'Tagalog', englishName: 'Tagalog', country: 'Philippines', flag: '🇵🇭' },
  
  // Europe
  { code: 'es', name: 'Español', englishName: 'Spanish', country: 'Spain', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', englishName: 'Portuguese', country: 'Portugal', flag: '🇵🇹' },
  { code: 'fr', name: 'Français', englishName: 'French', country: 'France', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', englishName: 'German', country: 'Germany', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', englishName: 'Italian', country: 'Italy', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', englishName: 'Dutch', country: 'Netherlands', flag: '🇳🇱' },
  { code: 'ru', name: 'Русский', englishName: 'Russian', country: 'Russia', flag: '🇷🇺' },
  { code: 'pl', name: 'Polski', englishName: 'Polish', country: 'Poland', flag: '🇵🇱' },
  { code: 'uk', name: 'Українська', englishName: 'Ukrainian', country: 'Ukraine', flag: '🇺🇦' },
  { code: 'cs', name: 'Čeština', englishName: 'Czech', country: 'Czech Republic', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', englishName: 'Slovak', country: 'Slovakia', flag: '🇸🇰' },
  { code: 'hu', name: 'Magyar', englishName: 'Hungarian', country: 'Hungary', flag: '🇭🇺' },
  { code: 'ro', name: 'Română', englishName: 'Romanian', country: 'Romania', flag: '🇷🇴' },
  { code: 'bg', name: 'Български', englishName: 'Bulgarian', country: 'Bulgaria', flag: '🇧🇬' },
  { code: 'hr', name: 'Hrvatski', englishName: 'Croatian', country: 'Croatia', flag: '🇭🇷' },
  { code: 'sr', name: 'Српски', englishName: 'Serbian', country: 'Serbia', flag: '🇷🇸' },
  { code: 'sl', name: 'Slovenščina', englishName: 'Slovenian', country: 'Slovenia', flag: '🇸🇮' },
  { code: 'mk', name: 'Македонски', englishName: 'Macedonian', country: 'North Macedonia', flag: '🇲🇰' },
  { code: 'sq', name: 'Shqip', englishName: 'Albanian', country: 'Albania', flag: '🇦🇱' },
  { code: 'el', name: 'Ελληνικά', englishName: 'Greek', country: 'Greece', flag: '🇬🇷' },
  { code: 'da', name: 'Dansk', englishName: 'Danish', country: 'Denmark', flag: '🇩🇰' },
  { code: 'sv', name: 'Svenska', englishName: 'Swedish', country: 'Sweden', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', englishName: 'Norwegian', country: 'Norway', flag: '🇳🇴' },
  { code: 'fi', name: 'Suomi', englishName: 'Finnish', country: 'Finland', flag: '🇫🇮' },
  { code: 'is', name: 'Íslenska', englishName: 'Icelandic', country: 'Iceland', flag: '🇮🇸' },
  { code: 'et', name: 'Eesti', englishName: 'Estonian', country: 'Estonia', flag: '🇪🇪' },
  { code: 'lv', name: 'Latviešu', englishName: 'Latvian', country: 'Latvia', flag: '🇱🇻' },
  { code: 'lt', name: 'Lietuvių', englishName: 'Lithuanian', country: 'Lithuania', flag: '🇱🇹' },
  { code: 'ga', name: 'Gaeilge', englishName: 'Irish', country: 'Ireland', flag: '🇮🇪' },
  { code: 'cy', name: 'Cymraeg', englishName: 'Welsh', country: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  { code: 'eu', name: 'Euskara', englishName: 'Basque', country: 'Spain', flag: '🇪🇸' },
  { code: 'ca', name: 'Català', englishName: 'Catalan', country: 'Spain', flag: '🇪🇸' },
  { code: 'gl', name: 'Galego', englishName: 'Galician', country: 'Spain', flag: '🇪🇸' },
  { code: 'bs', name: 'Bosanski', englishName: 'Bosnian', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'me', name: 'Crnogorski', englishName: 'Montenegrin', country: 'Montenegro', flag: '🇲🇪' },
  
  // Africa
  { code: 'sw', name: 'Kiswahili', englishName: 'Swahili', country: 'Kenya', flag: '🇰🇪' },
  { code: 'am', name: 'አማርኛ', englishName: 'Amharic', country: 'Ethiopia', flag: '🇪🇹' },
  { code: 'ha', name: 'Hausa', englishName: 'Hausa', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'yo', name: 'Yorùbá', englishName: 'Yoruba', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', englishName: 'Igbo', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'zu', name: 'isiZulu', englishName: 'Zulu', country: 'South Africa', flag: '🇿🇦' },
  { code: 'af', name: 'Afrikaans', englishName: 'Afrikaans', country: 'South Africa', flag: '🇿🇦' },
  { code: 'st', name: 'Sesotho', englishName: 'Sesotho', country: 'Lesotho', flag: '🇱🇸' },
  { code: 'tn', name: 'Setswana', englishName: 'Tswana', country: 'Botswana', flag: '🇧🇼' },
  { code: 'mg', name: 'Malagasy', englishName: 'Malagasy', country: 'Madagascar', flag: '🇲🇬' },
  { code: 'rw', name: 'Kinyarwanda', englishName: 'Kinyarwanda', country: 'Rwanda', flag: '🇷🇼' },
  { code: 'sn', name: 'chiShona', englishName: 'Shona', country: 'Zimbabwe', flag: '🇿🇼' },
  { code: 'so', name: 'Soomaali', englishName: 'Somali', country: 'Somalia', flag: '🇸🇴' },
  { code: 'ti', name: 'ትግርኛ', englishName: 'Tigrinya', country: 'Eritrea', flag: '🇪🇷' },
  { code: 'om', name: 'Afaan Oromoo', englishName: 'Oromo', country: 'Ethiopia', flag: '🇪🇹' },
  { code: 'lu', name: 'Kiluba', englishName: 'Luba-Kasai', country: 'DR Congo', flag: '🇨🇩' },
  { code: 'kg', name: 'Kikongo', englishName: 'Kongo', country: 'DR Congo', flag: '🇨🇩' },
  { code: 'lag', name: 'Kilaguri', englishName: 'Langi', country: 'Tanzania', flag: '🇹🇿' },
  { code: 'ki', name: 'Gikuyu', englishName: 'Kikuyu', country: 'Kenya', flag: '🇰🇪' },
  { code: 'luo', name: 'Dholuo', englishName: 'Luo', country: 'Kenya', flag: '🇰🇪' },
  
  // Americas
  { code: 'es-419', name: 'Español (Latinoamérica)', englishName: 'Spanish (Latin America)', country: 'Mexico', flag: '🇲🇽' },
  { code: 'pt-BR', name: 'Português (Brasil)', englishName: 'Portuguese (Brazil)', country: 'Brazil', flag: '🇧🇷' },
  { code: 'fr-CA', name: 'Français (Canada)', englishName: 'French (Canada)', country: 'Canada', flag: '🇨🇦' },
  { code: 'ht', name: 'Kreyòl Ayisyen', englishName: 'Haitian Creole', country: 'Haiti', flag: '🇭🇹' },
  { code: 'qu', name: 'Runasimi', englishName: 'Quechua', country: 'Peru', flag: '🇵🇪' },
  { code: 'gn', name: 'Avañe\'ẽ', englishName: 'Guarani', country: 'Paraguay', flag: '🇵🇾' },
  { code: 'ay', name: 'Aymar aru', englishName: 'Aymara', country: 'Bolivia', flag: '🇧🇴' },
  { code: 'nah', name: 'Nāhuatl', englishName: 'Nahuatl', country: 'Mexico', flag: '🇲🇽' },
  { code: 'myn', name: "Maaya T'aan", englishName: 'Maya', country: 'Guatemala', flag: '🇬🇹' },
  
  // Middle East
  { code: 'ku', name: 'Kurdî', englishName: 'Kurdish', country: 'Iraq', flag: '🇮🇶' },
  { code: 'fa-AF', name: 'دری', englishName: 'Dari', country: 'Afghanistan', flag: '🇦🇫' },
  { code: 'ckb', name: 'سۆرانی', englishName: 'Sorani Kurdish', country: 'Iraq', flag: '🇮🇶' },
  
  // Pacific
  { code: 'fj', name: 'Na Vosa Vakaviti', englishName: 'Fijian', country: 'Fiji', flag: '🇫🇯' },
  { code: 'sm', name: 'Gagana Samoa', englishName: 'Samoan', country: 'Samoa', flag: '🇼🇸' },
  { code: 'to', name: 'Lea faka-Tonga', englishName: 'Tongan', country: 'Tonga', flag: '🇹🇴' },
  { code: 'mi', name: 'Te Reo Māori', englishName: 'Maori', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'haw', name: 'ʻŌlelo Hawaiʻi', englishName: 'Hawaiian', country: 'United States', flag: '🇺🇸' },
  
  // Central Asia
  { code: 'tk', name: 'Türkmen dili', englishName: 'Turkmen', country: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'ug', name: 'ئۇيغۇرچە', englishName: 'Uyghur', country: 'China', flag: '🇨🇳' },
  
  // Additional major languages
  { code: 'ml', name: 'മലയാളം', englishName: 'Malayalam', country: 'India', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', country: 'India', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', country: 'India', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', country: 'India', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', country: 'India', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ', englishName: 'Odia', country: 'India', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া', englishName: 'Assamese', country: 'India', flag: '🇮🇳' },
  { code: 'sa', name: 'संस्कृतम्', englishName: 'Sanskrit', country: 'India', flag: '🇮🇳' },
  { code: 'su', name: 'Basa Sunda', englishName: 'Sundanese', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'jv', name: 'Basa Jawa', englishName: 'Javanese', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'mad', name: 'Basa Madhura', englishName: 'Madurese', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'bug', name: 'Basa Ugi', englishName: 'Buginese', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'min', name: 'Minangkabau', englishName: 'Minangkabau', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'ace', name: 'Basa Acèh', englishName: 'Acehnese', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'ban', name: 'Basa Bali', englishName: 'Balinese', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'btk', name: 'Batak', englishName: 'Batak', country: 'Indonesia', flag: '🇮🇩' },
  
  // More African languages
  { code: 'bm', name: 'Bamanankan', englishName: 'Bambara', country: 'Mali', flag: '🇲🇱' },
  { code: 'wo', name: 'Wolof', englishName: 'Wolof', country: 'Senegal', flag: '🇸🇳' },
  { code: 'ff', name: 'Fulfulde', englishName: 'Fula', country: 'Guinea', flag: '🇬🇳' },
  { code: 'ln', name: 'Lingála', englishName: 'Lingala', country: 'DR Congo', flag: '🇨🇩' },
  { code: 'ng', name: 'Owambo', englishName: 'Oshiwambo', country: 'Namibia', flag: '🇳🇦' },
  { code: 'ts', name: 'Xitsonga', englishName: 'Tsonga', country: 'South Africa', flag: '🇿🇦' },
  { code: 'ss', name: 'siSwati', englishName: 'Swati', country: 'Eswatini', flag: '🇸🇿' },
  { code: 've', name: 'Tshivenda', englishName: 'Venda', country: 'South Africa', flag: '🇿🇦' },
  { code: 'nr', name: 'isiNdebele', englishName: 'Southern Ndebele', country: 'South Africa', flag: '🇿🇦' },
  { code: 'xh', name: 'isiXhosa', englishName: 'Xhosa', country: 'South Africa', flag: '🇿🇦' },
  
  // Caribbean & Central America
  { code: 'nl-AN', name: 'Papiamentu', englishName: 'Papiamento', country: 'Aruba', flag: '🇦🇼' },
  { code: 'es-CU', name: 'Español (Cuba)', englishName: 'Spanish (Cuba)', country: 'Cuba', flag: '🇨🇺' },
  
  // Additional European
  { code: 'lb', name: 'Lëtzebuergesch', englishName: 'Luxembourgish', country: 'Luxembourg', flag: '🇱🇺' },
  { code: 'be', name: 'Беларуская', englishName: 'Belarusian', country: 'Belarus', flag: '🇧🇾' },
  { code: 'fo', name: 'Føroyskt', englishName: 'Faroese', country: 'Faroe Islands', flag: '🇫🇴' },
  { code: 'nn', name: 'Nynorsk', englishName: 'Norwegian Nynorsk', country: 'Norway', flag: '🇳🇴' },
  { code: 'kw', name: 'Kernewek', englishName: 'Cornish', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'br', name: 'Brezhoneg', englishName: 'Breton', country: 'France', flag: '🇫🇷' },
  
  // Middle Eastern & North African
  { code: 'ms-BN', name: 'Melayu Brunei', englishName: 'Malay (Brunei)', country: 'Brunei', flag: '🇧🇳' },
  { code: 'ta-LK', name: 'தமிழ் (இலங்கை)', englishName: 'Tamil (Sri Lanka)', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'ta-IN', name: 'தமிழ் (இந்தியா)', englishName: 'Tamil (India)', country: 'India', flag: '🇮🇳' },
  
  // Additional Southeast Asian
  { code: 'tet', name: 'Tetun', englishName: 'Tetum', country: 'East Timor', flag: '🇹🇱' },
  
  // Additional Pacific Islands
  { code: 'tpi', name: 'Tok Pisin', englishName: 'Tok Pisin', country: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'bi', name: 'Bislama', englishName: 'Bislama', country: 'Vanuatu', flag: '🇻🇺' },
  { code: 'ch', name: 'Chamoru', englishName: 'Chamorro', country: 'Guam', flag: '🇬🇺' },
  
  // Additional Asian
  { code: 'ka-AB', name: 'აფხაზური', englishName: 'Abkhazian', country: 'Georgia', flag: '🇬🇪' },
  { code: 'ab', name: 'Аԥсуа бызшәа', englishName: 'Abkhaz', country: 'Georgia', flag: '🇬🇪' },
  { code: 'os', name: 'Ирон ӕвзаг', englishName: 'Ossetian', country: 'Georgia', flag: '🇬🇪' },
  { code: 'ce', name: 'Нохчийн мотт', englishName: 'Chechen', country: 'Russia', flag: '🇷🇺' },
  { code: 'tt', name: 'Татарча', englishName: 'Tatar', country: 'Russia', flag: '🇷🇺' },
  { code: 'ba', name: 'Башҡорт теле', englishName: 'Bashkir', country: 'Russia', flag: '🇷🇺' },
  
  // South American indigenous
  { code: 'ray', name: 'Rapa Nui', englishName: 'Rapa Nui', country: 'Chile', flag: '🇨🇱' },
  
  // Additional global
  { code: 'eo', name: 'Esperanto', englishName: 'Esperanto', country: 'International', flag: '🌍' },
  { code: 'ia', name: 'Interlingua', englishName: 'Interlingua', country: 'International', flag: '🌐' },
  { code: 'io', name: 'Ido', englishName: 'Ido', country: 'International', flag: '🌐' },
  { code: 'vo', name: 'Volapük', englishName: 'Volapük', country: 'International', flag: '🌐' },
  
  // Additional African
  { code: 'ak', name: 'Akan', englishName: 'Akan', country: 'Ghana', flag: '🇬🇭' },
  { code: 'tw', name: 'Twi', englishName: 'Twi', country: 'Ghana', flag: '🇬🇭' },
  { code: 'ee', name: 'Eʋegbe', englishName: 'Ewe', country: 'Ghana', flag: '🇬🇭' },
  { code: 'ig', name: 'Igbo', englishName: 'Igbo', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'pcm', name: 'Naijá', englishName: 'Nigerian Pidgin', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'lg', name: 'Luganda', englishName: 'Ganda', country: 'Uganda', flag: '🇺🇬' },
  { code: 'rn', name: 'Kirundi', englishName: 'Kirundi', country: 'Burundi', flag: '🇧🇮' },
  { code: 'sg', name: 'Sängö', englishName: 'Sango', country: 'Central African Republic', flag: '🇨🇫' },
  { code: 'ks', name: 'कॉशुर', englishName: 'Kashmiri', country: 'India', flag: '🇮🇳' },
  { code: 'sd', name: 'سنڌي', englishName: 'Sindhi', country: 'Pakistan', flag: '🇵🇰' },
  { code: 'bal', name: 'بلوچی', englishName: 'Balochi', country: 'Pakistan', flag: '🇵🇰' },
  { code: 'kmr', name: 'Kurmancî', englishName: 'Northern Kurdish', country: 'Turkey', flag: '🇹🇷' },
  { code: 'lki', name: 'لۊری', englishName: 'Southern Kurdish', country: 'Iran', flag: '🇮🇷' },
];

// Get unique languages (remove duplicates by code)
export const uniqueLanguages: Language[] = languages.reduce((acc, lang) => {
  if (!acc.find(l => l.code === lang.code)) {
    acc.push(lang);
  }
  return acc;
}, [] as Language[]);

// Get default language
export const defaultLanguage: Language = languages.find(l => l.code === 'id') || languages[0];
