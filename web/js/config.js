// Cấu hình website NVT ChemZ (xem docs/architecture/ARCHITECTURE.md §2).
// Khóa anon là khóa CÔNG KHAI, được phép để ở đây vì cơ sở dữ liệu đã bật RLS.
// TUYỆT ĐỐI không đặt ANTHROPIC_API_KEY hay service_role key ở đây.
// SUPABASE_URL để trống (hoặc mở trang với ?demo=1) → chế độ demo: dữ liệu lưu bằng localStorage.
export const CONFIG = {
  SUPABASE_URL: 'https://qnfvjpqkisvitmrpdxbw.supabase.co',  // để trống = chế độ demo
  SUPABASE_ANON_KEY: 'sb_publishable_iuK0fjKwryyfJ8R8O3BQ6A_2Eahp57K',  // khóa publishable: công khai, an toàn vì CSDL bật RLS
  HINT_DAILY_LIMIT: 20,    // chỉ dùng để hiển thị và cho chế độ demo
};

// Hằng số chỉ dùng cho chế độ demo (không phải bí mật – chỉ để trình diễn).
export const DEMO = {
  CLASSES: [
    { code: 'DEMO-TN', name: 'Lớp demo – Thực nghiệm', group: 'experiment', prefix: 'TN', size: 10 },
    { code: 'DEMO-DC', name: 'Lớp demo – Đối chứng', group: 'control', prefix: 'DC', size: 10 },
    { code: '10A1', name: 'Lớp 10A1 (demo)', group: 'experiment', prefix: '10A1', size: 40 },
    { code: '10A2', name: 'Lớp 10A2 (demo)', group: 'experiment', prefix: '10A2', size: 40 },
  ],
  TEACHER_PIN: 'demo-gv-2026',
};
