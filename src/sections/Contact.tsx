import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { useI18n } from "../i18n";
import { asset } from "../lib/utils";

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function showAlertMessage(type: string, message: string) {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_sqv88p5",
        "template_kuazzw4",
        {
          from_name: formData.name,
          from_email: formData.email,
          to_name: "Herr Savas",
          to_email: "grimmjow@ichigo.me",
          message: formData.message,
        },
        "YnenfrmYUzOg7aP0N"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", t("contact.success"));
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to send email:", error);
      showAlertMessage("danger", t("contact.error"));
    }
  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // }
  return (
    <section
      id="contact"
      className="relative flex flex-col px-5 lg:px-20 items-center pt-36"
    >
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-ink/10 rounded-2xl bg-surface ">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">{t("contact.heading")}</h2>
          <p className="font-normal text-muted">{t("contact.description")}</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              {t("contact.fullName")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder={t("contact.fullNamePlaceholder")}
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              {t("contact.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder={t("contact.emailPlaceholder")}
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              {t("contact.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="field-input field-input-focus"
              placeholder={t("contact.messagePlaceholder")}
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal text-on-accent hover-animation"
          >
            {isLoading ? t("contact.sending") : t("contact.submit")}
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center mr-auto mt-auto gap-3 pt-20 pb-5">
        <a
          href="https://www.linkedin.com/in/savasdev/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10"
        >
          <img
            className="w-8 md:w-10 light:invert"
            src={asset("assets/logos/linkedin-white.svg")}
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://www.xing.com/profile/Oemer_Savas094643"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10"
        >
          <img
            className="w-8 md:w-10 light:invert"
            src={asset("assets/logos/xing-white.svg")}
            alt="Xing"
          />
        </a>
        <a
          href="https://github.com/nilvaes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-10 md:w-12 light:invert"
            src={asset("assets/logos/github-white.svg")}
            alt="GitHub"
          />
        </a>
      </div>
    </section>
  );
}
