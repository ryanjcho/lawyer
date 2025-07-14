# 로킷 (Rokit): AI Legal Solutions Platform

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Setup Environment Variables:**
   ```bash
   pnpm run setup-env
   # Then edit your .env file with actual values
   ```

3. **Start Redis server** (for rate limiting):
   ```bash
   # macOS
   brew install redis
   brew services start redis
   # Ubuntu/Debian
   sudo apt-get install redis-server
   sudo systemctl start redis
   ```

4. **Setup Database:**
   ```bash
   pnpm run prisma:migrate
   pnpm run prisma:generate
   ```

5. **Run the development server:**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 주요 페이지 및 기능

- **솔루션 (Solutions):** 업계별 맞춤 법률 솔루션, 실제 사례, 클라이언트 로고, 오킴스와의 협업 강조
- **서비스 (Services):** 서비스 프로세스, 차별점(경쟁사 비교), 주요 기능, 검토 결과 예시, 이용방법
- **About:** 로킷/오킴스 소개, 팀, 미션, 신뢰성
- **Pricing:** 투명한 가격 정책, 서비스별 요금제
- **FAQ:** 자주 묻는 질문, 서비스 안내
- **기타:** 회원가입, 로그인, 결제, 프로필, 업로드 등

---

## 핵심 기능

- **업계별 맞춤 법률 솔루션** (제조, IT, 금융, 바이오, 유통, 부동산 등)
- **10년 이상 경력 변호사 직접 검토**
- **실시간 진행상황 안내 및 온라인 소통**
- **AES-256 암호화, ISO 인증 등 강력한 보안**
- **클린하고 현대적인 UI/UX (모바일 완벽 지원)**
- **100% 한국어 로컬라이제이션**
- **오킴스 법무법인과의 공식 파트너십**
- **경쟁사 대비 차별화된 서비스 비교표 제공**
- **SEO 최적화 및 접근성 개선**

---

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth.js (소셜 로그인 포함)
- AWS S3 (파일 업로드)
- Redis (rate limiting)
- Nodemailer (이메일 인증)
- framer-motion (애니메이션)
- VirusTotal API (파일 보안)

---

## SEO & 접근성

- 모든 주요 페이지에 SEO 메타데이터, Open Graph, 구조화 데이터 적용
- 시맨틱 마크업, 키보드 내비게이션, 명확한 대비 등 접근성 강화
- 모바일/PC 완벽 대응, 반응형 디자인

---

## 개발/운영 참고

- 환경 변수, DB, Redis, S3, OpenAI, Sentry 등은 실제 서비스 환경에 맞게 설정 필요
- 모든 주요 기능은 한국어 기준으로 설계/구현됨
- 오킴스 법무법인과의 협업을 통해 실제 법률 자문 및 검토 품질 보장

---

## Getting Started (for Contributors)

- Fork/clone this repo
- Install dependencies with `pnpm install`
- Set up your `.env` file (see above)
- Run `pnpm dev` to start local development
- See `app/services/page.tsx`, `app/solutions/page.tsx`, etc. for main UI

---

## License

This project is proprietary and not for commercial redistribution without permission.
