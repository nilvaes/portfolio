import { Particles } from "../components/Particles";
import { Timeline } from "../components/Timeline";
import { getExperiences } from "../constants";
import { useI18n } from "../i18n";

export default function Journey() {
  const { language } = useI18n();

  return (
    <section id="about" className="relative min-h-screen overflow-hidden">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <div className="relative z-10">
        <Timeline data={getExperiences(language)} />
      </div>
    </section>
  );
}
