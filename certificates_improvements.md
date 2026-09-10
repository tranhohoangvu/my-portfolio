# Certificates Section — Phân tích & Hướng cải tiến

## Trạng thái hiện tại

```
┌──────────────────────────────────────────┐
│  h2: "Chứng chỉ"  (chỉ có vậy thôi)    │
│                                          │
│  ┌─────────────────┐ ┌─────────────────┐ │
│  │ Agile & Scrum   │ │ Aptis ESOL      │ │
│  │ Framework 2024  │ │ British Council  │ │
│  │ Techbase VN·2024│ │ · 2024          │ │
│  │ [Agile/Scrum]   │ │ [English]       │ │
│  │                 │ │                 │ │
│  │ Cấp bởi Techbase│ │ Score: 135/200  │ │
│  │ VN tại TDTU...  │ │ ID: ESOL 015... │ │
│  └─────────────────┘ └─────────────────┘ │
└──────────────────────────────────────────┘
```

---

## Vấn đề chính

### ❌ Vấn đề 1: Quá ít nội dung — Section bị "thin"
Chỉ có **2 cert**, grid 2 cột → section trông trống, không tương xứng với các section khác (Projects có 7 items, Skills có 20+ items).

### ❌ Vấn đề 2: Header không có personality
`h2: "Chứng chỉ"` — giống hệt CV section, không có kicker badge, không có headline, không có subtitle. Tất cả section header đều na ná nhau.

### ❌ Vấn đề 3: Cert cards thiếu visual hierarchy
- Không có **issuer logo/icon** — thiếu visual anchor
- Không có **verify link** (nếu cert có public URL)
- **Score 135/200** của Aptis không nổi bật — đây là điểm quan trọng nhưng chỉ là plain text
- Không có **expiry/validity** info

### ❌ Vấn đề 4: Section background flat
`bg-white` thuần túy — không có ambient glow, không có gradient accent. Nhàm hơn so với About/Hero section.

### ⚠️ Vấn đề 5: Aptis ESOL không có mô tả rõ ràng (EN)
Cert Aptis chỉ hiện score, không có `data-i18n` cho description — thiếu bilingual support.

---

## Hướng cải tiến

### 🔴 Ưu tiên cao

#### A. Section Header cải tiến (kicker + headline)
```
  [🏅 2 Certificates · 2024]           ← kicker
  "Certified. Verified. Ready."         ← headline ngắn gọn  
  Mô tả ngắn về cert strategy          ← subtitle
```

#### B. Issuer Icon/Logo Bubble
Thêm icon tượng trưng cho issuer ở góc trên mỗi card:
- Agile card: icon bàn tay/scrum board
- Aptis card: icon British Council (cờ UK hoặc language icon)

Tương tự `cv-icon` đã làm trong CV section — tái dùng component.

#### C. Score Highlight cho Aptis
Thay plain text `135/200` bằng visual badge:
```
  ┌──────────────────────┐
  │  Score               │
  │  ████████░░  135/200 │  ← progress bar mini
  │  B2 Level Equivalent │  ← context
  └──────────────────────┘
```

#### D. Verify Link / External Badge
Nếu cert có URL xác minh (Coursera, LinkedIn Learning, v.v.):
```
[✓ Verify] → link
```
Nếu không có URL → thêm `[📄 Certificate ID: ESOL 0155613]` styled rõ hơn.

---

### 🟡 Ưu tiên trung bình

#### E. Thêm cert mới nếu có
2 cert cho 1 section riêng là hơi ít. Cân nhắc:
- Gộp vào About section (như education/credential block) thay vì tách thành section riêng
- Hoặc thêm cert khác (Coursera, MOOC, v.v.) để section dày hơn

#### F. Ambient Background
Thêm subtle radial gradient giống About section:
```css
background: radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.06), transparent 60%),
            radial-gradient(ellipse at 70% 50%, rgba(16,185,129,0.04), transparent 60%);
```

#### G. "Issued" date chip
Thêm date pill rõ ràng hơn:
```
[📅 Oct 2024]  thay vì  "Techbase Viet Nam · 2024"
```

---

### 🟢 Nice to have

#### H. Masonry/Asymmetric layout
Nếu thêm ≥3 certs: dùng CSS grid masonry hoặc cards có chiều cao khác nhau trông sinh động hơn.

#### I. Timeline view
Sắp xếp certs theo timeline thay vì grid — phù hợp nếu có nhiều cert hơn.

---

## So sánh với CV Section

| | CV Section | Certificates Section |
|---|---|---|
| Header | ⚠️ Chỉ "CV" | ⚠️ Chỉ "Chứng chỉ" |
| Cards | ✅ 2 cards có icon, desc, actions | ⚠️ 2 cards thiếu icon, verify link |
| Background | ⚠️ Flat slate | ❌ Flat white |
| Content depth | ✅ Có mô tả chi tiết | ⚠️ Mô tả ngắn, thiếu context |
| Score/Metrics | ❌ Không có | ⚠️ Có nhưng không nổi bật |

## Gợi ý thực hiện

| Thứ tự | Task | Effort | Impact |
|--------|------|--------|--------|
| 1 | **A** — Section header mới | Thấp | Cao |
| 2 | **B** — Issuer icon bubble | Thấp | Cao |
| 3 | **C** — Score progress bar (Aptis) | Trung bình | Cao |
| 4 | **D** — Verify/ID styled badge | Thấp | Trung bình |
| 5 | **F** — Ambient background | Thấp | Trung bình |
| 6 | **E** — Cân nhắc thêm cert | Tùy bạn | Cao |

> [!IMPORTANT]
> Quan trọng nhất: nếu bạn có thêm cert nào (Coursera, Google, v.v.) thì **thêm vào** trước — 2 certs là quá ít cho 1 dedicated section. Nếu không, cân nhắc gộp certs vào About section.
