"use client";

import { Phone, MapPin, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white">
      {/* Top bar with contact info - hidden on mobile */}
      <div className="bg-blue-700 py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>0507-1462-1368</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>광주 북구 서하로 82</span>
              </div>
            </div>
            <div>
              <span>운영시간: 06:00 - 22:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">🏊</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold">아쿠아시티</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="hover:text-blue-200 transition-colors">홈</a>
              <a href="#programs" className="hover:text-blue-200 transition-colors">수영강습</a>
              <a href="#instructors" className="hover:text-blue-200 transition-colors">강사진</a>
              <a href="#facilities" className="hover:text-blue-200 transition-colors">시설안내</a>
              <a href="#contact" className="hover:text-blue-200 transition-colors">연락처</a>
            </nav>

            <Button variant="secondary" className="hidden md:block">
              수강신청
            </Button>

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
                <a 
                  href="#home" 
                  className="hover:text-blue-200 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  홈
                </a>
                <a 
                  href="#programs" 
                  className="hover:text-blue-200 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  수영강습
                </a>
                <a 
                  href="#instructors" 
                  className="hover:text-blue-200 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  강사진
                </a>
                <a 
                  href="#facilities" 
                  className="hover:text-blue-200 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  시설안내
                </a>
                <a 
                  href="#contact" 
                  className="hover:text-blue-200 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  연락처
                </a>
                <Button variant="secondary" className="mt-2 w-fit">
                  수강신청
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
