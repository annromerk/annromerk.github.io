export const WALK_STEPS: Record<number, { step: string; text: string }> = {
  1: { step: 'Step 1 of 4', text: 'Turn on the PLC to begin.' },
  2: { step: 'Step 2 of 4', text: 'Press Start to run the line.' },
  3: { step: 'Step 3 of 4', text: 'Now trip a fault: hold Jam.' },
  4: { step: 'Step 4 of 4', text: 'Clear the jam, then press Reset.' },
  5: {
    step: 'Walkthrough complete',
    text:
      "Nice work. You've now seen all three rungs work together: Start/seal-in drives the motor, " +
      'and a fault latch can cut it instantly until Reset. (The Pico trainer used this same logic, just ' +
      'with a 2-second jam-hold timer left out here to keep this diagram focused on scan-cycle behavior ' +
      'and NO/NC contact logic.) The controls below are unlocked, explore freely or restart to watch it ' +
      'again.',
  },
};
