import { RichText } from '@/components/RichText';
import {
  DockerChipIcon,
  JsChipIcon,
  MicroPythonChipIcon,
  MongoChipIcon,
  NodeChipIcon,
  ProjectIcon,
  RaspberryPiChipIcon,
  ReactChipIcon,
  SvgChipIcon,
} from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Projects() {
  return (
    <section className="section section-alt" id="project">
      <div className="container">
        <h2 className="section-title">
          <ProjectIcon />
          Projects
        </h2>
        <div className="projects-stack">
          <div className="project-card">
            <div className="project-media">
              <video
                className="project-video"
                controls
                preload="metadata"
                playsInline
                poster="/assets/video/pi-trainer-poster.jpg"
              >
                <source src="/assets/video/pi-trainer-demo.mp4" type="video/mp4" />
                Your browser doesn&apos;t support embedded video.{' '}
                <a href="/assets/video/pi-trainer-demo.mp4">Download the demo video</a> instead.
              </video>
            </div>
            <div className="project-body">
              <p className="project-tag">Self-Directed Technical Project · Jun–Jul 2026</p>
              <h3>Raspberry Pi Pico Fault-Simulation Trainer</h3>
              <p>
                I studied mechatronics fundamentals on my own (electrical basics, sensors, control logic) and
                built a physical trainer to put that knowledge into practice: a control panel that simulates
                the kind of conveyor faults I encounter on the warehouse floor, so I could learn to detect and
                diagnose them the way a maintenance technician would.
              </p>
              <ul className="project-points">
                <li>
                  Wired a Raspberry Pi Pico control panel with status LEDs, a buzzer alarm, and
                  Start/Stop/Reset/Jam switches, using color-coded GPIO, ground, and power wiring across a
                  breadboard
                </li>
                <li>
                  <RichText text="Programmed fault-interlock state machine logic (Stopped → Running → Fault) that locks out Start and Stop once a fault trips, requiring Reset to clear it. This **mirrors real equipment lockout behavior** and includes a 2-second hold-to-trigger debounce on the jam input" />
                </li>
                <li>
                  Built entirely outside of coursework, driven by direct experience with MHE (material
                  handling equipment) on the job
                </li>
              </ul>

              <div className="how-it-works">
                <p className="how-it-works-label">How it works</p>
                <ol>
                  <li>
                    Power on and the system boots into <strong>Stopped</strong>. Nothing moves until Start is
                    pressed.
                  </li>
                  <li>
                    Press Start and it moves to <strong>Running</strong>: the green and yellow LEDs come on,
                    simulating the conveyor moving.
                  </li>
                  <li>
                    Holding the Jam switch for 2 seconds trips a fault. That hold time is on purpose, so a
                    quick bump doesn&apos;t set it off, the same way a real sensor signal has to hold steady
                    before it&apos;s trusted.
                  </li>
                  <li>
                    Once faulted, the red LED and buzzer turn on, and Start and Stop are both locked out until
                    the fault is cleared.
                  </li>
                  <li>
                    Pressing Reset is the only way out: it clears the fault and drops the system back to
                    Stopped, ready to go again.
                  </li>
                </ol>
                <p className="how-it-works-note">
                  That&apos;s the same pattern real MHE controls use: detect the fault, alarm on it, and lock
                  the equipment down until someone deals with it.
                </p>
              </div>

              <div className="project-meta">
                <Badge variant="outline" className="h-auto gap-1.5 px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  <MicroPythonChipIcon />
                  MicroPython
                </Badge>
                <Badge variant="outline" className="h-auto gap-1.5 px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  <RaspberryPiChipIcon />
                  Raspberry Pi Pico
                </Badge>
                <Badge variant="outline" className="h-auto px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  GPIO Wiring
                </Badge>
                <Badge variant="outline" className="h-auto px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  Breadboard Prototyping
                </Badge>
                <Badge variant="outline" className="h-auto px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  Fault-Interlock Logic
                </Badge>
              </div>
            </div>
          </div>

          <div className="project-card project-card--text">
            <div className="project-body">
              <p className="project-tag">Self-Directed Learning Project · Aug 2026</p>
              <h3>Ladder Logic Simulator</h3>
              <p>
                After completing a Master PLC Programming course, I built this interactive simulator to put
                what I learned into practice. It models real scan-cycle timing and NO/NC contact behavior, and
                translates the fault-interlock state machine from my Raspberry Pi Pico trainer above into
                Allen-Bradley/RSLogix-style ladder notation.
              </p>
              <ul className="project-points">
                <li>
                  <RichText text="Modeled a real **Input Scan → Program Scan → Output Scan** cycle instead of instant updates, so the diagram behaves the way an actual PLC does" />
                </li>
                <li>
                  <RichText text="Built a **Start/Stop motor-starter circuit** with seal-in and fault interlock, the same lockout-until-Reset pattern as the Pico trainer, in standard 3-rung ladder form" />
                </li>
                <li>
                  <RichText text="Used correct **NO/NC contact semantics and Allen-Bradley/RSLogix notation** (XIC, XIO, OTE), the North American industry standard" />
                </li>
              </ul>
              <div className="project-meta">
                <Badge variant="outline" className="h-auto gap-1.5 px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  <JsChipIcon />
                  JavaScript
                </Badge>
                <Badge variant="outline" className="h-auto gap-1.5 px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  <SvgChipIcon />
                  SVG
                </Badge>
                <Badge variant="outline" className="h-auto px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  PLC / Ladder Logic
                </Badge>
              </div>
              <a className={cn(buttonVariants({ variant: 'default' }), 'mt-1.5 h-auto px-4 py-2.5 text-[0.9rem]')} href="/ladder-simulator/">
                Open the simulator →
              </a>
            </div>
          </div>

          <div className="project-card project-card--text">
            <div className="project-body">
              <p className="project-tag">Team Hackathon · freeCodeCamp Summer Hackathon 2025</p>
              <h3>Yellow Packet: Pet Adoption Platform</h3>
              <p>
                Joined a 14-person team building a full-stack pet adoption platform in freeCodeCamp&apos;s 2025
                Summer Hackathon, where users could browse adoptable pets and shelters through a shared web
                app. Took ownership of the login page, designing it and building it in React, while learning
                Git well enough to work inside a large, distributed team.
              </p>
              <div className="project-meta">
                <Badge variant="outline" className="h-auto px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  14-person team
                </Badge>
                <Badge variant="outline" className="h-auto gap-1.5 px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  <ReactChipIcon />
                  React
                </Badge>
                <Badge variant="outline" className="h-auto gap-1.5 px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  <NodeChipIcon />
                  Node/Express
                </Badge>
                <Badge variant="outline" className="h-auto gap-1.5 px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  <MongoChipIcon />
                  MongoDB
                </Badge>
                <Badge variant="outline" className="h-auto gap-1.5 px-3 py-1.5 text-[0.82rem] font-normal whitespace-normal">
                  <DockerChipIcon />
                  Docker
                </Badge>
              </div>
              <a
                className={cn(buttonVariants({ variant: 'outline' }), 'mt-1.5 h-auto px-4 py-2.5 text-[0.9rem]')}
                href="https://github.com/nhcarrigan-2025-hackathon/yellow-packet"
                target="_blank"
                rel="noopener"
              >
                View repository on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
