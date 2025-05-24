import ModuleLayout from "@/components/module-layout"
import { PageReplacementDemo } from "@/components/interactive-demo"

export default function Module4() {
  // Existing code...

  return (
    <ModuleLayout
      title="Module 4: Memory Management"
      description="Memory partitioning, paging, segmentation, and virtual memory"
      moduleNumber={4}
    >
      {/* Existing content... */}

      <section id="page-replacement" className="mt-8">
        <h2>Page Replacement</h2>
        <p>
          When a page fault occurs and all memory frames are currently in use, the operating system must choose a page
          to replace. This is done using a page replacement algorithm.
        </p>

        {/* Add the interactive page replacement demo */}
        <PageReplacementDemo />

        {/* Rest of the existing content... */}
      </section>

      {/* Rest of the existing content... */}
    </ModuleLayout>
  )
}
