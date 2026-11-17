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
                I built a bench trainer to practice how a conveyor control system responds to a jam. A
                switch simulates the jam input, and LEDs and a buzzer show how the system responds.
              </p>
              <ul className="project-points">
                <li>
                  Wired a Raspberry Pi Pico control panel with status LEDs, a buzzer alarm, and
                  Start/Stop/Reset/Jam switches, using color-coded GPIO, ground, and power wiring across a
                  breadboard
                </li>
                <li>
                  <RichText text="Programmed a **latched fault** that blocks Start and Stop until Reset. The jam input must stay active for two seconds before it trips." />
                </li>
                <li>
                  The demo shows the alarm activating and Reset returning the trainer to Stopped.
                </li>
              </ul>

              <div className="how-it-works">
                <p className="how-it-works-label">How it works</p>
                <ol>
                  <li>
                    Power on and the trainer boots into <strong>Stopped</strong>.
                  </li>
                  <li>
                    Press Start and it moves to <strong>Running</strong>: the green and yellow LEDs come on,
                    simulating the conveyor moving.
                  </li>
                  <li>
                    Hold the Jam switch for two seconds to trip a fault. A shorter input does not trigger it.
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
                After a PLC programming course, I built a browser simulator that recreates the conveyor
                trainer&apos;s fault and reset sequence in Allen-Bradley-style ladder logic.
              </p>
              <ul className="project-points">
                <li>
                  <RichText text="Modeled a **PLC scan cycle** in three stages: read inputs, evaluate the ladder logic, then update outputs." />
                </li>
                <li>
                  <RichText text="Simulated a **three-rung motor start/stop circuit** with a seal-in branch, a latched fault, and a reset input." />
                </li>
                <li>
                  Used XIC, XIO, and OTE instructions to show how input bits and output states change during a fault.
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
