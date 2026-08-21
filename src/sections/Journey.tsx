import { Timeline } from "../components/Timeline";
import { getExperiences } from "../constants";
import { useI18n } from "../i18n";

export default function Journey() {
  const { language } = useI18n();

  return (
    <section id="about" className="relative min-h-screen">
      <Timeline data={getExperiences(language)} />
    </section>
  );
}
