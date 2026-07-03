import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectList from "../components/Projects/ProjectList";
import { Github, Linkedin, Send, Download } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    console.log("Xabar yuborildi:", { name, email, message });

    setIsSent(true);
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => setIsSent(false), 4000);
  };

  const skills = [
    { name: "JavaScript", level: "70%", color: "bg-yellow-500" },
    { name: "Node.js & Express", level: "60%", color: "bg-green-600" },
    { name: "React & Redux", level: "80%", color: "bg-blue-500" },
    { name: "MongoDB", level: "80%", color: "bg-green-500" },
    { name: "TypeScript", level: "70%", color: "bg-blue-600" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      <section id="about" className="pt-8">
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg flex-shrink-0">
            <img
              src="/img/portrait.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 text-center md:text-left flex-1">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t("about_title")}
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Full Stack Software Developer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("about_desc")}
            </p>

            <div className="pt-4 flex flex-wrap justify-center md:justify-start items-center gap-4">
              <a
                href="https://github.com/saidmukhammedov"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors flex items-center gap-2 font-medium shadow-sm"
              >
                <Github size={20} /> Github
              </a>
              <a
                href="https://www.linkedin.com/in/saidmukhammedov/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 transition-colors flex items-center gap-2 font-medium shadow-sm"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
              <a
                href="https://t.me/darkindex"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-sky-600 dark:text-sky-400 transition-colors flex items-center gap-2 font-medium shadow-sm"
              >
                <Send size={18} /> Telegram
              </a>

              <a
                href="../public/cv.pdf"
                download="CV Akbarali Saidmukhammedov.pdf"
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all flex items-center gap-2 font-semibold shadow-md ml-auto md:ml-0"
              >
                <Download size={18} /> Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="space-y-6">
        <h2 className="text-3xl font-bold border-b-2 border-blue-500 pb-2 w-max">
          {t("nav_skills")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between font-medium text-gray-700 dark:text-gray-300">
                <span>{skill.name}</span>
                <span>{skill.level}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                <div
                  className={`${skill.color} h-full rounded-full`}
                  style={{ width: skill.level }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="space-y-6">
        <h2 className="text-3xl font-bold border-b-2 border-blue-500 pb-2 w-max">
          {t("nav_projects")}
        </h2>
        <ProjectList />
      </section>

      <section id="contact" className="space-y-6">
        <h2 className="text-3xl font-bold border-b-2 border-blue-500 pb-2 w-max">
          {t("nav_contact")}
        </h2>
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
          {isSent ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-center font-medium border border-green-200 dark:border-green-800 animate-pulse">
              Xabaringiz yuborildi. Tez orada javob beriladi!
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSendMessage}>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  {t("name")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  {t("email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  {t("message")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                {t("send_msg")}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
