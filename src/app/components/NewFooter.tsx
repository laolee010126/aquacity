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
              <li>기초 수영교실</li>
              <li>초급 수영교실</li>
              <li>중급 수영교실</li>
              <li>고급 수영교실</li>
              <li>키즈마스터즈</li>
              <li>성인마스터즈</li>
              <li>아쿠아로빅</li>
              <li>어린이 수영교실</li>
              <li>개인 레슨</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">이용안내</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>시설 안내</li>
              <li>수강료 안내</li>
              <li>운영시간</li>
              <li>오시는 길</li>
              <li>주차 안내</li>
              <li>이용 규칙</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">고객센터</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📞 0507-1462-1368</li>
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
