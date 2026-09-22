'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Search, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

export default function LanguageSelector() {
  const { currentLanguage, setLanguage, languages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Filter languages based on search query
  const filteredLanguages = languages.filter(lang => {
    const query = searchQuery.toLowerCase();
    return (
      lang.name.toLowerCase().includes(query) ||
      lang.englishName.toLowerCase().includes(query) ||
      lang.country.toLowerCase().includes(query) ||
      lang.code.toLowerCase().includes(query)
    );
  });

  // Group languages by region
  const regions = {
    'Asia Tenggara': filteredLanguages.filter(l => 
      ['id', 'ms', 'tl', 'th', 'vi', 'my', 'km', 'lo', 'tet', 'tpi', 'bi', 'ch', 'ms-BN', 'btk', 'su', 'jv', 'mad', 'bug', 'min', 'ace', 'ban'].includes(l.code)
    ),
    'Asia Timur': filteredLanguages.filter(l => 
      ['zh', 'ja', 'ko', 'mn', 'bo', 'dz'].includes(l.code)
    ),
    'Asia Selatan': filteredLanguages.filter(l => 
      ['hi', 'bn', 'ta', 'ne', 'si', 'pa', 'ur', 'ml', 'te', 'kn', 'gu', 'mr', 'or', 'as', 'sa', 'ks', 'sd', 'bal'].includes(l.code)
    ),
    'Timur Tengah': filteredLanguages.filter(l => 
      ['ar', 'he', 'fa', 'fa-AF', 'tr', 'ku', 'hy', 'ka', 'az', 'ckb', 'kmr', 'lki'].includes(l.code)
    ),
    'Eropa': filteredLanguages.filter(l => 
      ['es', 'pt', 'fr', 'de', 'it', 'nl', 'ru', 'pl', 'uk', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sr', 'sl', 'mk', 'sq', 'el', 'da', 'sv', 'no', 'fi', 'is', 'et', 'lv', 'lt', 'ga', 'cy', 'eu', 'ca', 'gl', 'bs', 'me', 'be', 'fo', 'nn', 'kw', 'br', 'lb'].includes(l.code)
    ),
    'Afrika': filteredLanguages.filter(l => 
      ['sw', 'am', 'ha', 'yo', 'ig', 'zu', 'af', 'st', 'tn', 'mg', 'rw', 'sn', 'so', 'ti', 'om', 'lu', 'kg', 'ki', 'luo', 'bm', 'wo', 'ff', 'ln', 'ng', 'ts', 'ss', 've', 'nr', 'xh', 'ak', 'tw', 'ee', 'pcm', 'lg', 'rn', 'sg'].includes(l.code)
    ),
    'Amerika': filteredLanguages.filter(l => 
      ['es-419', 'pt-BR', 'fr-CA', 'ht', 'qu', 'gn', 'ay', 'nah', 'myn', 'nl-AN', 'es-CU', 'ray'].includes(l.code)
    ),
    'Pasifik': filteredLanguages.filter(l => 
      ['fj', 'sm', 'to', 'mi', 'haw'].includes(l.code)
    ),
    'Asia Tengah': filteredLanguages.filter(l => 
      ['uz', 'kk', 'ky', 'tg', 'tk', 'ug'].includes(l.code)
    ),
    'Internasional': filteredLanguages.filter(l => 
      ['eo', 'ia', 'io', 'vo'].includes(l.code)
    ),
  };

  // Filter out empty regions
  const nonEmptyRegions = Object.entries(regions).filter(([, langs]) => langs.length > 0);

  const handleLanguageSelect = (lang: typeof currentLanguage) => {
    setLanguage(lang);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
        title={`Language: ${currentLanguage.englishName}`}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <div className="fixed inset-0 z-40 sm:hidden" onClick={() => { setIsOpen(false); setSearchQuery(''); }} />
          
          <div className="absolute right-0 mt-2 w-80 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            {/* Search Header */}
            <div className="sticky top-0 bg-white p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Cari bahasa atau negara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Language List */}
            <div className="overflow-y-auto max-h-[calc(70vh-60px)] p-2">
              {searchQuery ? (
                // Search results
                <div className="space-y-1">
                  {filteredLanguages.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      Bahasa tidak ditemukan
                    </div>
                  ) : (
                    filteredLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          currentLanguage.code === lang.code
                            ? 'bg-primary-50 text-primary-700'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{lang.name}</div>
                          <div className="text-xs text-gray-500 truncate">{lang.englishName} • {lang.country}</div>
                        </div>
                        {currentLanguage.code === lang.code && (
                          <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                // Grouped by region
                nonEmptyRegions.map(([region, langs]) => (
                  <div key={region} className="mb-4">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {region}
                    </div>
                    <div className="space-y-1">
                      {langs.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all ${
                            currentLanguage.code === lang.code
                              ? 'bg-primary-50 text-primary-700'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{lang.name}</div>
                            <div className="text-xs text-gray-500 truncate">{lang.country}</div>
                          </div>
                          {currentLanguage.code === lang.code && (
                            <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white p-3 border-t border-gray-100">
              <div className="text-xs text-gray-500 text-center">
                {languages.length} bahasa tersedia
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
