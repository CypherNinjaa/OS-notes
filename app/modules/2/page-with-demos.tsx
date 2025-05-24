import ModuleLayout from "@/components/module-layout"
import Module2Demo from "@/components/interactive-demo/module2-demo"

export default function Module2DemosPage() {
  return (
    <ModuleLayout title="Module 2: Interactive Demos" description="Visualize process management interactively" moduleNumber={2}>
      <section className="mt-8">
        <h2>Interactive Demo: Process States</h2>
        <Module2Demo />
      </section>
    </ModuleLayout>
  )
}
