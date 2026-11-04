# ThinkAI Studio — Design Language & Engineering Specification (`DESIGN.md`)

> **Version:** 2.0 (Unified 12px Precision & Venice Dual-Theme Specification)  
> **Author & Maintainer:** ThinkAI Studio / Nguyen Huu Binh Minh  
> **Repository:** `ThinkAI-Studio/thinkai-ui`  
> **Component Namespace:** `tai-ui` (`@/components/tai-ui/`)  
> **CLI Distribution:** `thinkai-ui` (`registry/registry.json`)  
> **Style Scope:** `tai-*` (`src/app/globals.css`)  
---

## 1. Triết Lý Thiết Kế & Bản Sắc Thương Hiệu (Brand Philosophy)

ThinkAI Studio được xây dựng dựa trên nguyên lý **"Infrastructure-Grade Craft & Technical Luxury"** — Mọi pixel và tương tác trên giao diện phải có độ chính xác, tin cậy và bền bỉ tương đương một hệ thống hạ tầng phân tán cao cấp.

### 4 Trụ Cột Cốt Lõi (The 4 Impeccable Pillars):

1. **Pure Black Canvas & Obsidian Ladder (#000000 Canvas + Venice Blue #2985b8 Accent):**
   - Nền canvas chuẩn mực là đen thuần `#000000` (Dark) và `#f1f0eb` (Light). Độ sâu giao diện được kiến tạo thông qua nấc thang bề mặt (Surface Ladder): `#0a0a0c` (Sheet) → `#121316` (Card) → `#1a1c20` (Surface).
   - **Venice Blue Accent (`#2985b8`):** Sắc xanh Venice Sapphire mang lại phong thái Technical Luxury sang trọng, kết hợp cùng `#075985` cho chế độ sáng.
   - **Linear-Grade Top-Inset Highlights:** Mọi bề mặt nâng nổi (Card, Button, Dialog) đều có viền sáng mỏng 1px mép trên (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]`).
   - **Dynamic Alpha Hairlines:** Dùng viền alpha thích ứng `rgba(255, 255, 255, 0.16)` và `rgba(255, 255, 255, 0.34)` trên Dark; `rgba(24, 24, 27, 0.16)` trên Light.
   - **Dual-Theme Transitions:** Chuyển đổi Light/Dark liền mạch thông qua W3C View Transitions API kết hợp hiệu ứng canvas lerp.
2. **Architectural Geometry (Hình Học Kiến Trúc 4px Grid):**
   - **Unified 12px Default Radius**: Hệ thống thiết kế chuẩn hóa bán kính bo góc mặc định là 12px (`--tai-radius-base: 12px`), đồng thời hỗ trợ chuyển đổi tương tác linh hoạt giữa 0px (Sharp Architectural) và 12px (Precision Fillet). Loại bỏ quy tắc ép góc nhọn toàn cục.
   - **Mathematical 4px Grid**: Mọi padding, margin đều là bội số nghiêm ngặt của 4 (không có số ngẫu nhiên).
   - **Crisp Focus Rings**: Khung focus bàn phím độ tương phản sắc nét (`outline: 2px solid var(--tai-focus)`).

3. **Analog Micro-Grain Tactility (Chất Cảm Vật Lý Tương Tự):**
   - Phủ một lớp film micro-grain (`SVG feTurbulence baseFrequency 1.4, opacity 0.135, background-size: 80px`) lên toàn bộ màn hình.
   - Hiệu ứng kính mờ `backdrop-blur-xl bg-black/40` trên thanh điều hướng để tương phản với các bề mặt nội dung phía dưới.

4. **Tectonic Motion Mechanics (Vật Lý Chuyển Động Kiến Trúc):**
   - Chuyển động không bồng bềnh mà mang trọng lượng cơ học (Heavy Frictionless Mechanics).
   - **Spring Physics**: `{ damping: 32, stiffness: 280, mass: 1 }` và Easing Luxury `cubic-bezier(0.16, 1, 0.3, 1)`.
   - **Mechanical Click Feedback**: Nén cơ học `active:scale-[0.98]` trên mọi phần tử tương tác.
   - **Tectonic Spatial Shift**: Các panel và drawer trượt đa tầng tuyến tính (Z/X Parallax) thay vì co giãn scale mềm.

---

## 2. Bảng Token Thiết Kế (Design Tokens)

### 2.1. Bảng Màu & Nấc Thang Bề Mặt (Colour Table & Surface Ladder)

| Token | Dark Theme (Default) | Light Theme | Mô tả & Ứng Dụng |
| :--- | :--- | :--- | :--- |
| `--tai-bg` | `#000000` | `#f1f0eb` | Nền canvas thuần khiết |
| `--tai-sheet` | `#0a0a0c` | `#faf9f5` | Tầng nội dung chính, panel nổi |
| `--tai-card` | `#121316` | `#e8e7e1` | Bề mặt card, bezel mockup |
| `--tai-surface` | `#1a1c20` | `#deddd6` | Bề mặt tương tác, controls, tabs |
| `--tai-border` | `rgba(255, 255, 255, 0.16)` | `rgba(24, 24, 27, 0.16)` | Viền hairline thích ứng |
| `--tai-border-strong`| `rgba(255, 255, 255, 0.34)` | `rgba(24, 24, 27, 0.30)` | Viền hover / active |
| `--tai-text` | `#f4f4f5` | `#18181b` | Màu chữ chính (Primary Text) |
| `--tai-muted` | `#a1a1aa` | `#52525b` | Chữ thứ cấp (Secondary/Muted) |
| `--tai-subtle` | `#85858f` | `#626269` | Chữ gợi ý, nhãn kỹ thuật (Subtle) |
| `--tai-accent` | `#2985b8` (Venice Blue) | `#075985` | Điểm nhấn thương hiệu chính |
| `--tai-accent-contrast`| `#f0f9ff` | `#f0f9ff` | Màu chữ trên nền accent |
| `--tai-focus` | `#7dd3fc` | `#075985` | Focus ring bàn phím |
| `--tai-success` | `#86efac` | `#056b3a` | Trạng thái hoàn thành / LED |
| `--tai-warning` | `#fbbf24` | `#92400e` | Cảnh báo hệ thống |
| `--tai-danger` | `#f87171` | `#b91c1c` | Lỗi / Nguy hiểm |

### 2.2. Thang Bán Kính Bo Góc (Radius Scale — 12px Default)

| Token | Giá Trị Mặc Định (12px) | Khi Chuyển Sang Sharp (0px) | Phạm Vi Ứng Dụng |
| :--- | :--- | :--- | :--- |
| `--tai-radius-base` | `12px` | `0px` | Bán kính cơ sở toàn hệ thống |
| `--tai-radius-sm` | `8px` | `0px` | Nhãn micro-badge, phím KBD, indicator, tabs nhỏ |
| `--tai-radius-md` | `12px` | `0px` | Buttons, inputs, selects, controls chính |
| `--tai-radius-lg` | `16px` | `0px` | Dialog, popover, product mockup, card nổi bật |
| `--tai-radius-xl` | `20px` | `0px` | Khung container lớn, hero wrappers |
| `--tai-radius-control`| `12px` | `0px` | Tự động áp dụng cho mọi controls & inputs |
| `--tai-radius-surface`| `12px` | `0px` | Tự động áp dụng cho card & sheet surfaces |

> **Tính Năng Chuyển Đổi Góc Bo Tương Tác (0 ↔ 12 Toggle):** Người dùng có thể chuyển đổi giữa 0px (Sharp Architectural) và 12px (Precision Fillet). Giá trị được lưu trong `localStorage` (`thinkai-ui-radius`) và phục hồi trước chu kỳ paint của trình duyệt để đảm bảo hoàn toàn không bị giật/nháy (zero flash).

### 2.2. Thang Typography (Typography Scale)

| Token / Class | Font Family | Size (Fluid Clamp) | Weight | Tracking | Line-Height | Transform | Ứng Dụng |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.tai-heading-hero` | Barlow Condensed | `clamp(2.6rem, 7.8vw, 7.2rem)` | 700 / 800 | `-0.026em` | `0.94` | UPPERCASE | Hero Headline ("RELIABLE DELIVERY") |
| `.tai-heading-xl` | Barlow Condensed | `clamp(2.4rem, 7.5vw, 7.0rem)` | 700 / 800 | `-0.028em` | `0.94` | UPPERCASE | Section Titles, Modern Tech Stack, CTA |
| `.tai-heading-lg` | Barlow Condensed | `clamp(2.0rem, 5.0vw, 4.8rem)` | 700 | `-0.024em` | `0.94` | UPPERCASE | Drawer Headlines, Sub-section Headers |
| `.tai-heading-statement` | Barlow Condensed | `clamp(1.5rem, 3.2vw, 2.6rem)` | 600 | `-0.020em` | `1.20` | Normal | Core Studio Statements |
| `.tai-label` | System Monospace | `11.5px` | 500 / 700 | `+0.160em` | `1.00` | UPPERCASE | HUD Labels, `● Products`, `01/03`, CLI tags |
| Body Regular | System Sans Stack | `14px - 16px` | 300 / 400 | `-0.010em` | `1.65` | Normal | Project summaries, Drawer bios |

---

## 3. Hệ Thống Chuyển Động & Tương Tác Đặc Trưng (Interactive Signatures)

### 3.1. Easing Curves Chuẩn của ThinkAI Studio

```ts
export const THINKAI_EASE = {
  luxury: [0.16, 1, 0.3, 1] as const,     // Easing trượt mượt mà cho reveal, dialog, sheet
  snappy: [0.19, 1, 0.22, 1] as const,    // Easing tức thì cho button hover, pill sweep
  entrance: [0.25, 1, 0.5, 1] as const,   // Easing tự nhiên cho element trượt vào viewport
};
```
#### Lớp 3: Scroll-Driven 3D Perspective Roll
- **Component:** `ScrollRollText`
- **Vị trí:** `RELIABLE / DELIVERY`, `MODERN / TECH STACK`, `RELIABLE SYSTEMS YOU OWN → SHIP`.
- **Cơ chế:** Tách mỗi dòng thành 2 nửa bằng `clipPath: inset(0 0 50% 0)` (nửa trên) và `clipPath: inset(50% 0 0 0)` (nửa dưới).
- **Interpolation:** Gắn với `scrollYProgress` qua `useTransform`:
  - Nửa trên xoay quanh trục `bottom center` từ `-90deg -> 0deg -> 90deg`.
  - Nửa dưới xoay quanh trục `top center` từ `90deg -> 0deg -> -90deg`.
  - Perspective: `1200px`. Độ sâu Z: `-200px -> 0px -> -200px`.
- **Reduced Motion:** Tắt biến đổi 3D, hiển thị text phẳng căn giữa.

#### Lớp 4: Scroll Progress Text Highlight (Đoạn Tuyên Ngôn)
- **Component:** `HighlightOnScroll`
- **Vị trí:** Large Statement Section.
- **Cơ chế:** Tách câu thành mảng từ. Tính toán dải cuộn từ `start: "80%"` đến `end: "40%"`.
- **Interpolation:** Mỗi từ `i` sáng từ `opacity: 0.2` lên `opacity: 1.0` khi tiến trình đạt khoảng `[i / total, (i + 1) / total]`.
- **Reduced Motion:** Toàn bộ từ có `opacity: 1.0` cố định.

#### Lớp 5: Sequence & Chapter Carousel (Product Showcase)
- **Component:** `ProjectSequence`
- **Vị trí:** Products Section.
- **Cơ chế:** State Transition giữa các chapter dự án.
- **Transitions:** `AnimatePresence mode="wait"` với animation `x: 20 -> 0`, `opacity: 0 -> 1` (Duration `0.5s`).
- **Tự động hóa:** Tích hợp bộ đếm `5s` tự chuyển slide; hiển thị thanh progress bar mượt mà chạy từ `0% -> 100%`; tạm dừng (Pause) ngay khi người dùng rê chuột vào vùng card.
- **Reduced Motion:** Bỏ slide X, dùng crossfade opacity `0 -> 1` trong `0.15s`.

#### Lớp 6: Media Mask & Parallax Inset (Khung Ảnh & Mockup)
- **Component:** `ProductMockup` / `MediaMask`
- **Vị trí:** Mockup laptop, hình ảnh minh họa case study.
- **Cơ chế:**
  - Container reveal: `clipPath: inset(20% 0 20% 0) -> inset(0% 0 0% 0)` (Duration `1.2s`, Ease `[0.16, 1, 0.3, 1]`).
  - Inner Parallax: Media bên trong scale `1.05` và di chuyển `y: -30px -> +30px` ngược chiều cuộn chuột.
- **Reduced Motion:** Bỏ parallax, container hiển thị ở `clipPath: inset(0)`.

#### Lớp 7: Interactive Micro-Gestures & Buttons
- **Component:** `WipeButton`, `TaiButton`, `TechLogos`
- **Nguyên tắc:** "Chuyển động là ý nghĩa của chính đối tượng tác động lên nó".
  - **WipeButton:** Lớp phủ nền quét từ trái sang phải (`-102% → 0% → 102%`).
  - **TaiButton:** Lớp phủ ánh sáng `mix-blend-overlay` quét từ dưới lên `y: 100% -> 0%`. Text nhấc nhẹ `y: -0.5px`.
  - **Directional Arrow:** Mũi tên tiến về trước `x: +4px` (Không rung lắc, không xoay góc giả tạo).
  - **Tech Stack Tiles:** Khi hover, màu nền đảo nghịch từ đen sang trắng rực (`bg-white text-black`), nâng nổi `y: -2px`, đổ bóng `shadow-xl`.

#### Lớp 8: Overlay / Modal State Transition (About Drawer & Architecture Modal)
- **Component:** `AboutDrawer`, `ArchitectureModal`, `ContactModal`
- **Cơ chế:**
  - Backdrop: Fade `opacity: 0 -> 0.85` kết hợp `backdrop-blur-md`.
  - Drawer Panel: Spring sliding `x: 100% -> 0%` (`damping: 28, stiffness: 260`).
  - Modal Window: Scale `0.97 -> 1.0` kết hợp `y: 12px -> 0px` (`duration: 0.22s`).
  - Phím bấm `ESC` và Click Outside tự động đóng; khoá cuộn màn hình nền.

---

## 4. Quy Chuẩn Tuân Thủ Reduced Motion (WCAG 2.2 AA target)

Toàn bộ component phải triển khai đúng 4 chiến lược chuyển động tiếp cận:

| Chiến Lược | Áp Dụng Cho | Biểu Hiện Dưới Reduced Motion |
| :--- | :--- | :--- |
| **1. Bail** | Ambient Canvas, Parallax Layers, Glow Blurs | Hiệu ứng biến mất hoặc đứng yên, giải phóng tài nguyên GPU |
| **2. Snap to end state** | `ScrollRollText`, `HighlightOnScroll`, Typography Reveal | Văn bản hiển thị đầy đủ ở trạng thái cuối cùng, không lửng lơ |
| **3. Collapse transition** | `WipeButton`, `TaiButton`, Tab switches, `ProjectSequence` | Chuyển đổi trạng thái ngay lập tức (`duration: 0.01ms`) |
| **4. Reduce complexity** | `ThreeHalftoneCanvas`, `WaveHalftoneCanvas` | Giảm mật độ particle, tắt auto-drift |

---

## 5. Cấu Trúc Thành Phần `src/components/tai-ui/` (47 Documented Production Resources)

```
src/components/tai-ui/
├── AboutDrawer.tsx              # Drawer giới thiệu tiểu sử & kinh nghiệm
├── AiBrandIcons.tsx             # Bộ SVG icons cho các mô hình AI (Claude, Gemini, OpenAI, etc.)
├── ArchitectureModal.tsx        # Modal xem sơ đồ kiến trúc hệ thống đa tab
├── ArrowRoll.tsx                # Icon mũi tên lật mượt mà khi hover
├── ButtonTextRoll.tsx           # Hiệu ứng chữ cuộn 2 tầng trên nút bấm
├── ContactModal.tsx             # Modal liên hệ & sao chép thông tin
├── HalftoneBanner.tsx           # Banner WebGL halftone tích hợp LogoMark
├── MaskedTextReveal.tsx         # Reveal chữ mượt mà qua mặt nạ cắt (Clip-Path)
├── ProductMockup.tsx            # Khung laptop browser mockup chuẩn studio
├── SmoothScroll.tsx             # Bộ điều phối cuộn mượt mà Lenis 120Hz
├── TaiButton.tsx                # Nút bấm cơ bản ThinkAI Studio với sweep hover
├── TaiHeader.tsx                # Header điều hướng trong suốt & mobile drawer
├── TechLogos.tsx                # Bộ nhận diện công nghệ (Go, K8s, Linux, Podman...)
├── TextRoll.tsx                 # Slot-machine text tumbler roll cho headlines
├── ThreeHalftoneCanvas.tsx      # WebGL Ocean Shader Engine chính
└── WipeButton.tsx               # Nút bấm signature với hiệu ứng Forward Wipe
```

---

## 6. Kiến Trúc Phân Phối CLI Registry (`thinkai-ui`)

`thinkai-ui` hoạt động theo mô hình Registry-First (tương tự `shadcn/ui`):
- `registry/registry.json`: Mục lục toàn cục chứa danh sách dependencies và files.
- `registry/ui/*.json`: Manifest độc lập cho từng component chứa mã nguồn và metadata.
- **Tiêu chuẩn lập trình component:**
  1. `asChild` Polymorphism thông qua `@radix-ui/react-slot`.
  2. Variant Typed Control với `cva` (Class Variance Authority).
  3. Safe Tailwind merging với `cn()` (`clsx` + `tailwind-merge`).
  4. Architectural Focus State & Tactility (`active:scale-[0.98]`).

---

## 7. Ghi Nhận Bản Quyền & Giấy Phép (Design Acknowledgment)

> **Design Acknowledgment & Attribution:**  
> Hệ thống thiết kế của ThinkAI Studio kế thừa và phát triển từ phong cách Dark-Mode Editorial đương đại được khởi xướng bởi các studio công nghệ hàng đầu (như SoraLabs, Linear, và Vercel).  
> Mọi thành phần UI trong `src/components/tai-ui/` được cài đặt độc lập bằng React, TypeScript, Tailwind CSS, Three.js và Motion (`motion/react`).  
> Bản quyền thuộc về **ThinkAI Studio / Nguyen Huu Binh Minh** (c) 2026.
