import ModuleLayout from "@/components/module-layout"
import { CPUSchedulingDemo, DeadlockDemo } from "@/components/interactive-demo"

export default function Module3() {
  // Existing code...

  return (
    <ModuleLayout
      title="Module 3: CPU Scheduling"
      description="Scheduling algorithms, techniques, and deadlock management"
      moduleNumber={3}
    >
      {/* Existing content... */}

      <section id="algorithms" className="mt-8">
        <h2>Scheduling Algorithms</h2>
        <p>Various scheduling algorithms are used to determine which process gets the CPU next:</p>

        {/* Add the interactive CPU scheduling demo */}
        <CPUSchedulingDemo />

        {/* Rest of the existing content... */}
      </section>

      {/* Existing content... */}

      <section id="deadlock" className="mt-8">
        <h2>Deadlock</h2>
        <p>
          A deadlock is a situation where a set of processes are blocked because each process is holding a resource and
          waiting for another resource acquired by some other process.
        </p>

        {/* Add the interactive deadlock demo */}
        <DeadlockDemo />

        {/* Rest of the existing content... */}
      </section>

      {/* Rest of the existing content... */}
    </ModuleLayout>
  )
}
