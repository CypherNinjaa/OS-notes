import ModuleLayout from "@/components/module-layout"
import Module6Demo from "@/components/interactive-demo/module6-demo"

export default function Module6DemosPage() {
  return (
    <ModuleLayout title="Module 6: Interactive Demos" description="Experiment with shell and scripting interactively" moduleNumber={6}>
      <section className="mt-8">
        <h2>Interactive Demo: Shell & Scripting</h2>
        <Module6Demo />
      </section>
    </ModuleLayout>
  )
}
