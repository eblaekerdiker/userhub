# UserHub 👥

**UserHub**, Next.js, MongoDB ve Tailwind CSS kullanılarak geliştirilmiş tam donanımlı bir **full-stack kullanıcı yönetimi uygulamasıdır**.  
Kullanıcı ekleme, listeleme, silme ve güncelleme işlemleri desteklenir. Sunucu tarafı render (SSR) desteğiyle hızlı ve SEO uyumlu bir yapı sağlar.

---

## 🚀 Özellikler

- ✅ Kullanıcı ekleme (Create)
- ✅ Kullanıcı listeleme (Read)
- ✅ Kullanıcı silme (Delete)
- ✅ Kullanıcı güncelleme (Update)
- ⚡ Server-Side Rendering (SSR) – `getServerSideProps` ile
- 🎨 Tailwind CSS ile modern ve responsive UI
- 🌐 MongoDB (Atlas) veritabanı bağlantısı
- 📁 Next.js API Routes ile backend işlemleri

---

## 🧱 Kullanılan Teknolojiler

- [Next.js](https://nextjs.org/) – React tabanlı framework
- [MongoDB + Mongoose](https://mongoosejs.com/) – NoSQL veritabanı yönetimi
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [Vercel](https://vercel.com/) (isteğe bağlı) – Deploy için ideal

---

## 📸 Ekran Görüntüsü

Kullanıcılar eklenebilir, silinebilir, güncellenebilir ve tüm işlemler anlık olarak arayüzde görünür.

---

## 🛠️ Projeyi Çalıştırmak

```bash
# Projeyi klonla
git clone https://github.com/kullaniciadi/userhub.git
cd userhub

# Bağımlılıkları yükle
npm install

# Ortam değişkenini ayarla
touch .env.local
# içine şunu ekle:
MONGODB_URI=your_mongo_atlas_connection_string

# Geliştirme sunucusunu başlat
npm run dev
