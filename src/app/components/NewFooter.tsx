import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="font-bold">🏊</span>
              </div>
              <h3 className="text-xl font-bold">아쿠아시티</h3>
            </div>
            <p className="text-gray-300 text-sm">
              건강한 라이프스타일을 위한<br />
              프리미엄 수영장 아쿠아시티
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">수영강습</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/programs" className="hover:text-blue-400 transition-colors">
                  강습 프로그램
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">이용안내</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/facilities" className="hover:text-blue-400 transition-colors">
                  시설 안내
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-blue-400 transition-colors">
                  안전수칙
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  연락처 & 위치
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">고객센터</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📞 062-528-1300</li>
              <li>📍 광주 북구 서하로 82</li>
              <li>🕐 평일 06:00-21:00</li>
              <li>🕐 주말 06:00-09:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 아쿠아시티. All rights reserved.</p>
          <p className="mt-2">
            사업자등록번호: 123-45-67890 | 대표: 김수영 | 주소: 광주 북구 서하로 82
          </p>
        </div>
      </div>
    </footer>
  );
}
