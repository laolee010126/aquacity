"use client";

import { Phone, MapPin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 최상단에 있으면 항상 표시
      if (currentScrollY < 10) {
        setVisible(true);
      } else {
        // 스크롤 방향 감지
        if (currentScrollY > prevScrollY) {
          // 아래로 스크롤 - 숨김
          setVisible(false);
        } else {
          // 위로 스크롤 - 표시
          setVisible(true);
        }
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);


  return (
    <header className={`bg-blue-600 text-white fixed top-0 left-0 right-0 z-50 md:relative transition-transform duration-300 ${
      visible ? "translate-y-0" : "-translate-y-full md:translate-y-0"
    }`}>
      {/* Top bar with contact info - hidden on mobile */}
      <div className="bg-blue-700 py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>062-528-1300</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>광주 북구 서하로 82</span>
              </div>
            </div>
            <div>
              <span>운영시간: 06:00 - 21:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">🏊</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold">아쿠아시티</h1>
            </Link>

            {/* Mobile phone number */}
            <div className="md:hidden flex items-center gap-2 text-sm">
              <Phone className="w-3 h-3" />
              <a href="tel:062-528-1300" className="hover:text-blue-200">
                062-528-1300
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`hover:text-blue-200 transition-colors ${pathname === '/' ? 'font-semibold' : ''}`}
              >
                홈
              </Link>
              <Link
                href="/programs"
                className={`hover:text-blue-200 transition-colors ${pathname === '/programs' ? 'font-semibold' : ''}`}
              >
                수영강습
              </Link>
              <Link
                href="/facilities"
                className={`hover:text-blue-200 transition-colors ${pathname === '/facilities' ? 'font-semibold' : ''}`}
              >
                시설안내
              </Link>
              <Link
                href="/contact"
                className={`hover:text-blue-200 transition-colors ${pathname === '/contact' ? 'font-semibold' : ''}`}
              >
                연락처
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-blue-500">
              <nav className="flex flex-col gap-4 mt-4">
                <Link
                  href="/"
                  className={`hover:text-blue-200 transition-colors py-2 ${pathname === '/' ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  홈
                </Link>
                <Link
                  href="/programs"
                  className={`hover:text-blue-200 transition-colors py-2 ${pathname === '/programs' ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  수영강습
                </Link>
                <Link
                  href="/facilities"
                  className={`hover:text-blue-200 transition-colors py-2 ${pathname === '/facilities' ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  시설안내
                </Link>
                <Link
                  href="/contact"
                  className={`hover:text-blue-200 transition-colors py-2 ${pathname === '/contact' ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  연락처
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
