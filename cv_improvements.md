# CV Section — Phân tích & Hướng cải tiến

## Trạng thái hiện tại

```
┌─────────────────────────────────────┐
│  h2: "CV"                           │
│  p: "Chọn phiên bản phù hợp..."    │
│                                     │
│  ┌──────────────┐ ┌──────────────┐  │
│  │ 🖥 Backend   │ │ ✨ AI         │  │
│  │ icon  [PDF]  │ │ icon  [PDF]  │  │
│  │              │ │              │  │
│  │ Fresher BE   │ │ AI Engineer  │  │
│  │ Developer    │ │ Intern       │  │
│  │              │ │              │  │
│  │ Mô tả ngắn  │ │ Mô tả ngắn  │  │
│  │              │ │              │  │
│  │ [View][DL]   │ │ [View][DL]   │  │
│  └──────────────┘ └──────────────┘  │
└─────────────────────────────────────┘
```

**Vấn đề:** Header quá đơn giản, chỉ có chữ "CV" — không nổi bật, không truyền cảm hứng cho recruiter.

---

## Hướng cải tiến có thể thực hiện

### 🔴 Ưu tiên cao — Visual impact lớn

#### A. Cải thiện Section Header (kicker + headline + subtitle)
Thay tiêu đề đơn "CV" bằng:
```
  [⚡ Open to Opportunities]           ← kicker badge (như About section)
  "Two CVs. One mission."              ← headline ấn tượng
  "Pick the version that fits the role." ← subtitle
```
**Effort:** Thấp | **Impact:** Cao

#### B. Tech Stack Chips trên mỗi Card
Thêm skill tags bên dưới mô tả, ví dụ:
- Backend card: `[Python]` `[FastAPI]` `[PostgreSQL]` `[Docker]`
- AI card: `[PyTorch]` `[Transformers]` `[OpenCV]` `[FastAPI]`

Recruiter scan nhanh được stack mà không cần mở PDF.
**Effort:** Thấp | **Impact:** Cao

#### C. "Updated" Badge + Last Updated date
```
[PDF]  [✓ Updated Sep 2025]
```
Cho thấy CV không "cũ", tăng độ tin cậy.
**Effort:** Rất thấp | **Impact:** Trung bình

---

### 🟡 Ưu tiên trung bình — UX/Visual polish

#### D. Ambient Background (Aurora Orbs)
CV section hiện dùng `bg-slate-50` flat — khá nhạt nhẽo so với Hero/About.
Thêm subtle aurora gradient background tương tự Hero section:
```css
background: radial-gradient(600px at 20% 50%, rgba(99,102,241,0.08), transparent),
            radial-gradient(500px at 80% 50%, rgba(16,185,129,0.06), transparent);
```
**Effort:** Thấp | **Impact:** Trung bình

#### E. CV Preview Thumbnail on Hover
Khi hover vào card, hiện ảnh preview trang đầu CV (cần tạo screenshot PNG ~400px).
Dùng CSS `::after` pseudo-element hoặc `<img>` ẩn.
**Effort:** Trung bình (cần tạo ảnh preview) | **Impact:** Cao

#### F. Stats / Highlights Row
Thêm 2–3 số liệu nổi bật bên dưới 2 cards:
```
  [📄 2 CVs]  [🎯 Targeted roles]  [🔄 Updated 2025]
```
**Effort:** Thấp | **Impact:** Trung bình

---

### 🟢 Ưu tiên thấp — Nice to have

#### G. Redesign Layout: Featured Card
Đổi từ 2 cards cân bằng sang layout bất cân xứng hơn:
- Một card lớn (featured) + một card nhỏ bên cạnh
- Hoặc layout dạng "split" với text bên trái, cards bên phải

**Effort:** Cao | **Impact:** Trung bình

#### H. Mock Download Counter
```
[⬇ 47 downloads]  (decoration only, hardcoded)
```
Tạo cảm giác CV được nhiều người tải — social proof.
**Effort:** Rất thấp | **Impact:** Thấp

---

## Gợi ý thực hiện theo thứ tự

| Thứ tự | Task | Thời gian ước tính |
|--------|------|--------------------|
| 1 | **A** — Kicker + Headline mới | 5 phút |
| 2 | **C** — "Updated" badge | 5 phút |
| 3 | **B** — Tech Stack Chips | 10 phút |
| 4 | **D** — Aurora Background | 10 phút |
| 5 | **E** — Preview Thumbnail (nếu có ảnh) | 20 phút |

> [!TIP]
> Làm A + B + C trước — impact lớn nhất với effort thấp nhất.
> Chỉ cần sửa HTML & i18n, không cần thêm JS.
