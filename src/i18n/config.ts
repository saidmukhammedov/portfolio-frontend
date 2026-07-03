import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: {
        translation: {
          nav_about: "Men haqimda",
          nav_skills: "Ko'nikmalar",
          nav_projects: "Loyihalar",
          nav_contact: "Aloqa",
          about_title: "Akbarali Saidmukhammedov",
          about_desc:
            "Men zamonaviy, tezkor va mukammal veb-ilovalarni yaratuvchi Full Stack dasturchiman. Hozirda JavaScript, Node.js, Express, React va MongoDB texnologiyalaridan foydalangan holda mukammal raqamli tizimlarni qurish bilan shug'ullanaman.",
          add_project: "Yangi Loyiha Qo'shish",
          project_title: "Loyiha Nomi",
          project_desc: "Loyiha Haqida",
          project_link: "Loyiha Linki (ixtiyoriy)",
          save: "Saqlash",
          no_projects: "Loyihalar topilmadi. Birinchisini qo'shing!",
          contact_title: "Men bilan bog'lanish",
          send_msg: "Xabar yuborish",
          name: "Ismingiz",
          email: "Email manzilingiz",
          message: "Xabar matni",
        },
      },
      en: {
        translation: {
          nav_about: "About Me",
          nav_skills: "Skills",
          nav_projects: "Projects",
          nav_contact: "Contact",
          about_title: "Akbarali Saidmukhammedov",
          about_desc:
            "I am a Full Stack developer building modern, fast, and scalable web applications. Currently, I specialize in crafting complete digital ecosystems using JavaScript, Node.js, Express, React, and MongoDB.",
          add_project: "Add New Project",
          project_title: "Project Title",
          project_desc: "Project Description",
          project_link: "Project Link (optional)",
          save: "Save Project",
          no_projects: "No projects found. Add your first one!",
          contact_title: "Contact Me",
          send_msg: "Send Message",
          name: "Your Name",
          email: "Your Email",
          message: "Your Message",
        },
      },
    },
    fallbackLng: "uz",
    debug: false,

    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
