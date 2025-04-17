import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import blueheart from './assets/blueheart.png';
import bullseye from './assets/bullseye.png';
import envelope from './assets/envelope.png';
import thinkingface from './assets/thinkingface.png';
import location from './assets/location.gif';
import { VenueCard } from './components/VenueCard';
import { PlaceSearch } from './components/PlaceSearch';
import { Map } from './components/Map';
import type { Venue } from './types';
import { ZoomIn, RefreshCcw } from 'lucide-react';

function App() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLoadingGif, setShowLoadingGif] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState<number>(1);

  useEffect(() => {
    setFilteredVenues(venues);
  }, [venues]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSizeScale');
    if (savedFontSize) {
      setFontSizeScale(parseFloat(savedFontSize));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fontSizeScale', fontSizeScale.toString());
  }, [fontSizeScale]);

  const handlePlaceSelect = (venue: Venue) => {
    setVenues((prev) => [...prev, venue]);
  };

  const handleSearch = () => {
    setShowLoadingGif(true);
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVenues(filtered);
    setShowLoadingGif(false);
  };

  const increaseFontSize = () => {
    setFontSizeScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  const resetFontSize = () => {
    setFontSizeScale(1);
  };

  return (
    <div
      className="min-h-screen bg-blue-50"
      dir="rtl"
      style={{ fontSize: `${fontSizeScale}em` }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="נגישלי" className="w-16 h-16" />
              <h1
                className="text-3xl font-bold text-[#407093]"
                style={{ fontFamily: 'Tahoma, sans-serif' }}
              >
                נגישלי
              </h1>
            </a>
            <div className="flex gap-2">
              <button
                onClick={increaseFontSize}
                className="flex items-center gap-1 px-3 py-1 bg-[#407093] text-white rounded-md text-sm hover:bg-[#315a73] transition"
              >
                <ZoomIn className="w-4 h-4" />
                הגדל פונט
              </button>
              <button
                onClick={resetFontSize}
                className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-400 transition"
              >
                <RefreshCcw className="w-4 h-4" />
                אפס פונט
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#407093] mb-10">
            ברוכים הבאים לנגישלי
          </h2>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
              <img src={bullseye} alt="נגישלי" className="w-12 h-12 ml-4" />
              <div>
                <h3 className="text-xl font-semibold text-[#407093] mb-3">המשימה שלנו</h3>
                <p className="text-gray-700 leading-relaxed text-md">
                  נגישלי הוקמה במטרה לעזור לאנשים עם מוגבלויות למצוא מקומות נגישים בקלות ובמהירות. אנחנו מאמינים שלכל אדם מגיעה הזכות ליהנות ממקומות בילוי, מסעדות, ומוסדות תרבות באופן שוויוני ונוח.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
              <img src={thinkingface} alt="נגישלי" className="w-12 h-12 ml-4" />
              <div>
                <h3 className="text-xl font-semibold text-[#407093] mb-3">איך זה עובד?</h3>
                <p className="text-gray-700 leading-relaxed text-md">
                  אנחנו אוספים מידע מדויק על נגישות במקומות ציבוריים ברחבי הארץ. המידע כולל פרטים על נגישות פיזית, שירותים מותאמים, וסידורים מיוחדים עבור אנשים עם מוגבלויות שונות.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
              <img src={blueheart} alt="נגישלי" className="w-12 h-12 ml-4" />
              <div>
                <h3 className="text-xl font-semibold text-[#407093] mb-3">קהילת המשתמשים שלנו</h3>
                <p className="text-gray-700 leading-relaxed text-md">
                  נגישלי נבנית יחד עם הקהילה. משתמשים יכולים לשתף חוויות, להוסיף מידע חדש ולעדכן מידע קיים על עסקים נגישים – הכל כדי לעזור לאחרים למצוא את המקום המתאים להם.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
              <img src={envelope} alt="נגישלי" className="w-12 h-12 ml-4" />
              <div>
                <h3 className="text-xl font-semibold text-[#407093] mb-3">צרו קשר</h3>
                <p className="text-gray-700 leading-relaxed text-md">
                  יש לכם שאלות, רעיונות או הצעות? אנחנו כאן בשבילכם! אל תהססו לפנות אלינו בכל עת:
                  <br />
                  <span className="font-semibold">
                    maorat@ac.sce.ac.il guyez1@ac.sce.ac.il
                    <br />
                    yairel1@ac.sce.ac.il liavma@ac.sce.ac.il
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Section */}
        <section className="mb-12 text-center">
          <div className="bg-white shadow-lg rounded-xl py-10 px-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-[#407093] mb-6">חיפוש עסק נגיש</h2>
            <PlaceSearch
              onPlaceSelect={handlePlaceSelect}
              setSearchQuery={setSearchQuery}
              onGeneratingChange={setIsGenerating}
            />
            <button
              onClick={handleSearch}
              className="mt-6 px-6 py-2 bg-[#407093] text-white font-semibold rounded-lg shadow hover:bg-[#315a73] transition duration-300"
            >
              חפש
            </button>
          </div>
        </section>

        {/* Map Section */}
        {venues.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-center text-[#407093] mb-6">מיקום העסק</h2>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl h-[400px] rounded-xl overflow-hidden shadow-lg bg-white">
                <Map venues={venues} />
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        <section>
          {(isGenerating || showLoadingGif) ? (
            <div className="flex justify-center items-center">
              <img src={location} alt="טוען..." className="w-40 h-40" />
            </div>
          ) : (
            <div className={`grid gap-8 ${filteredVenues.length === 1 ? 'justify-center grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {filteredVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <VenueCard venue={venue} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
