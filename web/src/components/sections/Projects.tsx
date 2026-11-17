import { ProjectIcon } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const demoChecks = [
  ['Hold Jam for two seconds', 'The trainer enters Fault.', 'The red LED and buzzer turn on.'],
  ['Press Start during a fault', 'The trainer stays in Fault.', 'Start does not return the trainer to Running.'],
  ['Press Reset', 'The trainer returns to Stopped.', 'The alarm clears and the trainer stays stopped.'],
];

export function Projects() {
  return (
    <section className="section section-alt" id="project">
      <div className="container">
        <h2 className="section-title">
          <ProjectIcon />
          Projects
        </h2>

        <article className="project-card">
          <header>
            <p className="project-tag">Controls case study · June–August 2026</p>
            <h3>Conveyor Fault Detection and Reset</h3>
          </header>

          <div className="project-demo">
            <figure>
              <video
                className="project-video"
                controls
                preload="none"
                playsInline
                aria-label="Raspberry Pi Pico conveyor fault trainer demo"
                aria-describedby="pico-demo-description"
                poster="/assets/video/pi-trainer-poster.jpg"
              >
                <source src="/assets/video/pi-trainer-demo.mp4" type="video/mp4" />
                <a href="/assets/video/pi-trainer-demo.mp4">Download the demo video</a>
              </video>
              <figcaption id="pico-demo-description">
                Watch the simulated jam trigger the alarm, block Start, and clear when Reset returns
                the trainer to Stopped.
              </figcaption>
            </figure>
            <div>
              <h4>Raspberry Pi Pico trainer</h4>
              <p>
                I wired a Pico and breadboard with Start, Stop, Reset, and Jam switches, status LEDs,
                and a buzzer. I wrote the MicroPython logic to latch a simulated fault when the jam
                input stays active for two seconds.
              </p>
            </div>
          </div>

          <div className="project-case-section">
            <h4 id="trainer-verification">What I verified in the bench demo</h4>
            <table className="project-verification" aria-labelledby="trainer-verification">
              <thead>
                <tr>
                  <th scope="col">Input</th>
                  <th scope="col">Expected response</th>
                  <th scope="col">Observed in the demo</th>
                </tr>
              </thead>
              <tbody>
                {demoChecks.map(([input, expected, observed]) => (
                  <tr key={input}>
                    <th scope="row">{input}</th>
                    <td>{expected}</td>
                    <td>{observed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="project-case-section">
            <h4>PLC ladder logic simulator</h4>
            <p>
              I modeled the same fault and reset sequence in Allen-Bradley-style ladder logic. The
              browser simulator shows the input scan, rung evaluation, and output update, so you can
              follow the fault latch and motor output across a scan.
            </p>
            <a
              className={cn(buttonVariants({ variant: 'default' }), 'h-auto px-4 py-2.5 text-[0.9rem]')}
              href="/ladder-simulator/"
            >
              Open the simulator →
            </a>
          </div>
        </article>

        <div className="other-projects">
          <h3>Other Projects</h3>
          <p>
            <strong>Yellow Packet.</strong> I designed and built the React login page for a team pet
            adoption app at the 2025 freeCodeCamp Summer Hackathon.{' '}
            <a
              href="https://github.com/nhcarrigan-2025-hackathon/yellow-packet"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the GitHub repo
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
