import ModuleLayout from "@/components/module-layout"
import Module1Demo from "@/components/interactive-demo/module1-demo"

export default function Module1DemosPage() {
  return (
    <ModuleLayout title="Module 1: Interactive Demos" description="Explore OS types interactively" moduleNumber={1}>
      <section className="mt-8">
        <h2>Interactive Demo: OS Types</h2>
        <Module1Demo />
      </section>
    </ModuleLayout>
  )
}
