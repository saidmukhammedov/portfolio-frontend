import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ error: "", success: false });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ error: "Barcha maydonlarni to‘ldiring.", success: false });
      return;
    }
    if (!email.includes("@")) {
      setStatus({ error: "To‘g‘ri email kiriting.", success: false });
      return;
    }
    setStatus({ error: "", success: true });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Aloqa</h2>
      <form
        onSubmit={handleSend}
        className="space-y-4 border p-6 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        {status.error && (
          <div className="p-3 bg-red-50 text-red-500 border rounded-md text-sm">
            {status.error}
          </div>
        )}
        {status.success && (
          <div className="p-3 bg-green-50 text-green-500 border rounded-md text-sm">
            Xabar yuborildi!
          </div>
        )}
        <div>
          <label className="block mb-1 text-sm font-medium">Ism</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Xabar</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white rounded-md font-medium"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
}
