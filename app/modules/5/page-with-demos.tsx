import ModuleLayout from "@/components/module-layout"
import Module5Demo from "@/components/interactive-demo/module5-demo"

export default function Module5DemosPage() {
  return (
    <ModuleLayout title="Module 5: Interactive Demos" description="Explore file and device management interactively" moduleNumber={5}>
      <section className="mt-8">
        <h2>Interactive Demo: File System</h2>
        <Module5Demo />
      </section>
    </ModuleLayout>
  )
}
