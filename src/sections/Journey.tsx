import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";

export default function Journey() {
  return (
    <section id="info">
      <Timeline data={experiences} />
    </section>
  );
}
