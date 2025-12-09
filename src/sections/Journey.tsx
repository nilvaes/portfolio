import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";

export default function Journey() {
  return (
    <section id="about">
      <Timeline data={experiences} />
    </section>
  );
}
