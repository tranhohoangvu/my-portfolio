# Phân tích: Thêm Admin Login vào Portfolio

> Ngày ghi: 10/09/2026

## Bối cảnh

Portfolio hiện tại là **static site** (HTML + JS + CSS thuần), serve qua Python HTTP server hoặc GitHub Pages. Toàn bộ data nằm trong file `.js` và `.json` trên filesystem — không có backend, không có database.

Câu hỏi: *Có nên thêm trang đăng nhập để cập nhật nội dung trực tiếp từ browser không?*

---

## Vấn đề cốt lõi

```
Browser → GitHub Pages / Python server → Trả file HTML/JS/CSS tĩnh
                                          ↑
                              Không có server-side logic
                              Không có database
```

Để có **login + lưu data**, cần thêm ít nhất một trong hai:
- **Backend** (Node/Python API) — lưu data vào database
- **BaaS** (Firebase, Supabase) — backend-as-a-service

---

## So sánh 4 phương án

### Phương án 1 — Firebase Auth + Firestore

```
Login page → Xác thực Firebase Auth
           → Lưu/đọc data từ Firestore
           → Portfolio fetch data từ DB thay vì file .js
```

| | |
|---|---|
| **Effort** | 3–5 ngày (refactor toàn bộ data layer) |
| **Chi phí** | Free tier Firebase (giới hạn reads/writes) |
| **Ưu** | Realtime, không cần self-host backend |
| **Nhược** | SDK nặng (~100KB+), refactor lớn, overkill cho portfolio |

---

### Phương án 2 — Netlify CMS / Decap CMS (Git-based)

```
/admin/ UI → Commit thẳng vào GitHub repo
           → GitHub Actions rebuild
           → Không cần backend
```

| | |
|---|---|
| **Effort** | Refactor sang SSG (Hugo, Eleventy, Next.js) |
| **Nhược** | Không phù hợp với plain HTML setup hiện tại |
| **Kết luận** | ❌ Không phù hợp |

---

### Phương án 3 — localStorage Admin (client-only)

```
Nhập password → Verify hash (client-side)
              → Unlock inline edit mode (contenteditable)
              → Lưu vào localStorage
```

| | |
|---|---|
| **Effort** | ~1 ngày |
| **Nhược** | Mất khi clear cache, không sync giữa thiết bị |
| **Kết luận** | ⚠️ Chỉ phù hợp demo, không phải production |

---

### Phương án 4 — Giữ nguyên, sửa file trực tiếp (hiện tại)

```
VSCode → Sửa data/*.json hoặc js/data/*.js → git push → Live
```

| | |
|---|---|
| **Effort** | 0 |
| **Ưu** | Nhanh, không có security surface, version control tự nhiên qua Git |
| **Nhược** | Phải mở editor mỗi lần update |

---

## Lời khuyên

> [!IMPORTANT]
> **Không nên làm admin login cho portfolio static** tại thời điểm này.

**3 lý do chính:**

1. **Tần suất update thấp** — Portfolio cập nhật < 5 lần/tháng → không đáng đầu tư cả auth system
2. **Bạn là developer** — Mở VSCode sửa JSON nhanh hơn click UI admin
3. **Risk/reward lệch** — Build đúng (Firebase + refactor) mất 3–5 ngày; benefit chỉ là "không cần mở editor"

---

## Hướng thay thế thực tế hơn

Nếu mục tiêu là **dễ update content hơn**, có thể làm với effort thấp hơn nhiều:

### Tách toàn bộ content ra JSON files

```
data/
├── projects.json     ✅ đã có
├── skills.json       ✅ đã có
├── certificates.json ← thêm mới
├── about.json        ← thêm mới (bio, chips, stats)
└── cv.json           ← thêm mới (tech stack per card)
```

→ Chỉ cần sửa **JSON** khi update content, không đụng HTML/CSS/JS  
→ Có thể dùng bất kỳ JSON editor nào (kể cả GitHub web UI trực tiếp)  
→ Vẫn có Git history đầy đủ  

---

## Bảng quyết định

| Phương án | Effort | Phù hợp |
|-----------|--------|---------|
| Firebase Auth + Firestore | ❌ 3–5 ngày | Overkill |
| Netlify CMS | ❌ Refactor lớn | Không phù hợp setup |
| localStorage Admin | ⚠️ 1 ngày | Chỉ demo |
| **Giữ nguyên + tách JSON** | ✅ Thấp | **Phù hợp nhất** |
