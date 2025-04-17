import { use, useState } from "react";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();

  return {
    props: {
      kullanicilar: data.data,
    },
  };
}

export default function Home({ kullanicilar }) {
  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [kullanicilarState, setKullanicilar] = useState(kullanicilar);
  const [guncellenenId, setGuncellenenId] = useState(null);
  const [yeniAd, setYeniAd] = useState("");
  const [yeniEmail, setYeniEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ad, email }),
      });

      const data = await res.json();

      console.log("🎯 Kullanıcı eklendi:", data);

      if (data.success) {
        setKullanicilar((prev) => [...prev, data.data]);
        setAd("");
        setEmail("");
      } else {
        console.error("❌ Ekleme başarısız:", data.error);
      }
    } catch (error) {
      console.error("❌ FETCH HATASI:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Bu kullanıcıyı silmek istiyor musunuz?");
    if (!confirmed) return;

    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setKullanicilar((prev) => prev.filter((k) => k._id !== id)); // UI'den kaldır
    } else {
      console.error("Silme işlemi başarısız");
    }
  };

  const handleUpdate = async () => {
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: guncellenenId, ad: yeniAd, email: yeniEmail }),
    });
    const data = await res.json();

    if (data.success) {
      setKullanicilar((prev) =>
        prev.map((k) => (k._id === guncellenenId ? data.data : k))
      );
      setGuncellenenId(null);
      setYeniAd("");
      setEmail("");
    } else {
      console.error("güncelleme hatası", data.error);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-blue via-green to-blue bg-[length:200%_200%] animate-gradient-x min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold mb-4 text-2xl ">Kullanıcı Ekle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ad"
          className="w-full border px-4 py-2 rounded bg-[#BED7DC]"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Email"
          className="w-full border px-4 py-2 my-4 rounded bg-[#BED7DC]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="border rounded px-4 py-2 bg-[#BED7DC] hover:bg-[#51829B] hover:text-white transition"
        >
          Gönder
        </button>
      </form>
      <h2 className=" my-4 font-bold text-xl">Kullanıcı Listesi</h2>
      <ul className="px-4">
        {kullanicilarState.map((k, i) => (
          <li
            key={i}
            className="border px-4 py-2 my-2 mx-4 rounded bg-[#BED7DC] text-gray-900"
          >
            {k.ad} - {k.email}
            <button
              onClick={() => handleDelete(k._id)}
              className="border rounded px-4 py-2 mx-2 bg-[#BED7DC] hover:bg-[#51829B] hover:text-white transition"
            >
              {" "}
              Sil{" "}
            </button>
            <button
              onClick={() => {
                setGuncellenenId(k._id);
                setYeniAd(k.ad);
                setYeniEmail(k.email);
              }}
              className="border rounded px-4 py-2 mx-2 bg-[#BED7DC] hover:bg-[#51829B] hover:text-white transition"
            >
              {" "}
              Güncelle{" "}
            </button>
            {guncellenenId === k._id ? (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  value={yeniAd}
                  onChange={(e) => setYeniAd(e.target.value)}
                  placeholder="Yeni Ad"
                  className="w-full border px-2 py-1 rounded"
                />
                <input
                  type="email"
                  value={yeniEmail}
                  onChange={(e) => setYeniEmail(e.target.value)}
                  placeholder="Yeni Email"
                  className="w-full border px-2 py-1 rounded"
                />
                <button
                  onClick={handleUpdate}
                  className="mt-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => setGuncellenenId(null)}
                  className="ml-2 text-sm text-gray-500 underline hover:text-gray-700"
                >
                  Vazgeç
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
