import ModuleLayout from "@/components/module-layout"
import InteractiveDiagram from "@/components/interactive-diagram"
import QuizComponent from "@/components/quiz-component"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Module4() {
  const pageReplacementAlgorithms = [
    {
      id: "fifo",
      name: "FIFO",
      description:
        "First-In-First-Out replaces the oldest page in memory. Simple to implement but can suffer from Belady's anomaly.",
      color: "blue",
    },
    {
      id: "lru",
      name: "LRU",
      description:
        "Least Recently Used replaces the page that has not been used for the longest period of time. Performs well but can be expensive to implement.",
      color: "green",
    },
    {
      id: "optimal",
      name: "Optimal",
      description:
        "Replaces the page that will not be used for the longest period of time in the future. Provides the best possible page-fault rate but requires future knowledge.",
      color: "purple",
    },
    {
      id: "clock",
      name: "Clock",
      description:
        "An approximation of LRU that uses a reference bit and a circular list of pages. More efficient to implement than LRU.",
      color: "orange",
    },
  ]

  const memoryManagementTechniques = [
    {
      id: "paging",
      name: "Paging",
      description:
        "Divides physical memory into fixed-size frames and logical memory into pages of the same size. Eliminates external fragmentation.",
      color: "blue",
    },
    {
      id: "segmentation",
      name: "Segmentation",
      description:
        "Divides logical memory into segments of varying sizes based on logical divisions in the program. Supports the programmer's view of memory.",
      color: "green",
    },
    {
      id: "virtual",
      name: "Virtual Memory",
      description:
        "Allows execution of processes that are not completely in memory. Separates logical memory from physical memory.",
      color: "purple",
    },
    {
      id: "demand",
      name: "Demand Paging",
      description:
        "Pages are loaded into memory only when they are referenced. Reduces memory usage and initial loading time.",
      color: "orange",
    },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main advantage of paging over segmentation?",
      options: [
        "Paging eliminates external fragmentation",
        "Paging supports variable-sized memory allocations",
        "Paging is easier for programmers to use",
        "Paging requires less hardware support",
      ],
      correctAnswer: 0,
      explanation:
        "Paging divides memory into fixed-size frames, which eliminates external fragmentation. Segmentation, which uses variable-sized segments, can lead to external fragmentation as segments are allocated and deallocated.",
    },
    {
      id: 2,
      question: "Which page replacement algorithm can suffer from Belady's anomaly?",
      options: ["Least Recently Used (LRU)", "First-In-First-Out (FIFO)", "Optimal", "Most Recently Used (MRU)"],
      correctAnswer: 1,
      explanation:
        "Belady's anomaly is a phenomenon where increasing the number of page frames results in an increase in the number of page faults. FIFO can suffer from this anomaly, while LRU and Optimal algorithms do not.",
    },
    {
      id: 3,
      question: "What is the purpose of the Translation Lookaside Buffer (TLB) in virtual memory systems?",
      options: [
        "To store recently used disk blocks",
        "To speed up virtual-to-physical address translation",
        "To implement page replacement algorithms",
        "To reduce the size of page tables",
      ],
      correctAnswer: 1,
      explanation:
        "The TLB is a cache that stores recent virtual-to-physical address translations. It speeds up the translation process by avoiding the need to access the page table in memory for every memory reference.",
    },
    {
      id: 4,
      question: "What is internal fragmentation?",
      options: [
        "Wasted space between allocated memory blocks",
        "Wasted space within allocated memory blocks",
        "The total amount of free memory available",
        "The process of dividing memory into equal-sized partitions",
      ],
      correctAnswer: 1,
      explanation:
        "Internal fragmentation is the wasted space within allocated memory blocks. It occurs when the allocated memory is larger than the requested memory, such as when fixed-size memory blocks are used.",
    },
    {
      id: 5,
      question:
        "In a paging system, if the page size is 4 KB and a process needs 72 KB of memory, how many pages are required?",
      options: ["18 pages", "19 pages", "20 pages", "72 pages"],
      correctAnswer: 0,
      explanation:
        "To calculate the number of pages, divide the process size by the page size: 72 KB / 4 KB = 18 pages.",
    },
  ]

  return (
    <ModuleLayout
      title="Module 4: Memory Management"
      description="Memory partitioning, paging, segmentation, and virtual memory"
      moduleNumber={4}
    >
      <section id="partition">
        <h2>Memory Partition</h2>
        <p>
          Memory partitioning is the division of computer memory into separate regions to efficiently allocate memory to
          processes. There are two main approaches to memory partitioning:
        </p>

        <Tabs defaultValue="fixed" className="my-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="fixed">Fixed Partitioning</TabsTrigger>
            <TabsTrigger value="dynamic">Dynamic Partitioning</TabsTrigger>
          </TabsList>
          <TabsContent value="fixed" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Fixed Partitioning</h3>
            <p className="mb-2">In fixed partitioning, memory is divided into fixed-sized partitions:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Memory is divided into a set number of partitions at system generation time.</li>
              <li>Each partition may contain exactly one process.</li>
              <li>Simple to implement and understand.</li>
              <li>Leads to internal fragmentation (wasted space within partitions).</li>
              <li>Limits the number of active processes and their maximum size.</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=300&width=600&query=fixed memory partitioning with processes of different sizes"
                alt="Fixed Memory Partitioning"
                width={600}
                height={300}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="dynamic" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Dynamic Partitioning</h3>
            <p className="mb-2">In dynamic partitioning, memory is allocated exactly as requested:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Partitions are created dynamically as processes are loaded.</li>
              <li>Each process gets exactly the amount of memory it needs.</li>
              <li>No internal fragmentation.</li>
              <li>Leads to external fragmentation (wasted space between partitions).</li>
              <li>Requires more complex memory management algorithms.</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=300&width=600&query=dynamic memory partitioning showing external fragmentation"
                alt="Dynamic Memory Partitioning"
                width={600}
                height={300}
                className="rounded-md mx-auto"
              />
            </div>
            <p className="mt-4">Various placement strategies are used to allocate memory in dynamic partitioning:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>First Fit:</strong> Allocate the first hole that is big enough.
              </li>
              <li>
                <strong>Best Fit:</strong> Allocate the smallest hole that is big enough.
              </li>
              <li>
                <strong>Worst Fit:</strong> Allocate the largest hole.
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </section>

      <section id="management" className="mt-8">
        <h2>Memory Management</h2>
        <p>
          Memory management involves controlling and coordinating computer memory, assigning portions to programs when
          needed, and freeing it for reuse when no longer needed.
        </p>

        <p className="mt-4">Key challenges in memory management include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Relocation:</strong> Moving programs between different areas of memory.
          </li>
          <li>
            <strong>Protection:</strong> Ensuring that processes can only access their own memory space.
          </li>
          <li>
            <strong>Sharing:</strong> Allowing multiple processes to access the same memory when appropriate.
          </li>
          <li>
            <strong>Logical Organization:</strong> Organizing memory in a way that makes sense to the programmer.
          </li>
          <li>
            <strong>Physical Organization:</strong> Organizing memory to maximize system performance.
          </li>
        </ul>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=memory management hierarchy showing registers, cache, main memory, and secondary storage"
            alt="Memory Hierarchy"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 1: Memory hierarchy in a computer system
          </p>
        </div>
      </section>

      <section id="paging" className="mt-8">
        <h2>Paging</h2>
        <p>
          Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory. It
          divides physical memory into fixed-sized blocks called frames and logical memory into blocks of the same size
          called pages.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=paging memory management showing logical address translation to physical address"
            alt="Paging Memory Management"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 2: Address translation in paging</p>
        </div>

        <p className="mt-4">Key aspects of paging:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Page Table:</strong> Maps logical pages to physical frames.
          </li>
          <li>
            <strong>Address Translation:</strong> Converts logical addresses to physical addresses using the page table.
          </li>
          <li>
            <strong>Page Size:</strong> Typically a power of 2, ranging from 4 KB to 64 KB.
          </li>
          <li>
            <strong>Internal Fragmentation:</strong> Occurs when the allocated memory is slightly larger than the
            requested memory.
          </li>
          <li>
            <strong>No External Fragmentation:</strong> Since all frames are the same size.
          </li>
        </ul>

        <p className="mt-4">The logical address is divided into:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Page Number (p):</strong> Used as an index into the page table to find the corresponding frame.
          </li>
          <li>
            <strong>Page Offset (d):</strong> Combined with the frame number to define the physical address.
          </li>
        </ul>

        <div className="bg-muted p-4 rounded-md mt-4">
          <p className="font-medium mb-2">Address Translation Example:</p>
          <p>
            Given a logical address space of 16 pages of 4096 bytes each, and a physical memory of 64 frames of 4096
            bytes each:
          </p>
          <p className="mt-2">
            Logical address: 0x3204
            <br />
            Page number: 0x3204 / 4096 = 0x3 (3 in decimal)
            <br />
            Page offset: 0x3204 % 4096 = 0x204 (516 in decimal)
            <br />
            If page table entry for page 3 contains frame number 11:
            <br />
            Physical address: 11 * 4096 + 516 = 45,588
          </p>
        </div>
      </section>

      <section id="segmentation" className="mt-8">
        <h2>Segmentation</h2>
        <p>
          Segmentation is a memory management technique that supports the programmer's view of memory. It divides
          logical memory into segments of varying sizes based on logical divisions in the program.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=segmentation memory management showing logical segments mapped to physical memory"
            alt="Segmentation Memory Management"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 3: Segmentation memory management</p>
        </div>

        <p className="mt-4">Key aspects of segmentation:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Segment Table:</strong> Maps logical segments to physical memory locations.
          </li>
          <li>
            <strong>Segment Number:</strong> Used as an index into the segment table.
          </li>
          <li>
            <strong>Segment Offset:</strong> Added to the base address to get the physical address.
          </li>
          <li>
            <strong>Variable-Sized Divisions:</strong> Segments can be of different sizes.
          </li>
          <li>
            <strong>Logical View:</strong> Segments typically correspond to logical divisions (code, data, stack).
          </li>
          <li>
            <strong>External Fragmentation:</strong> Can occur as segments are allocated and deallocated.
          </li>
        </ul>

        <p className="mt-4">The logical address in segmentation consists of:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Segment Number (s):</strong> Used as an index into the segment table.
          </li>
          <li>
            <strong>Segment Offset (d):</strong> Must be less than the segment limit.
          </li>
        </ul>

        <div className="bg-muted p-4 rounded-md mt-4">
          <p className="font-medium mb-2">Address Translation Example:</p>
          <p>Given a logical address (2, 100) where 2 is the segment number and 100 is the offset:</p>
          <p className="mt-2">
            If segment table entry for segment 2 contains base address 4000 and limit 500:
            <br />
            First, check if offset (100) is less than limit (500). It is, so continue.
            <br />
            Physical address: 4000 + 100 = 4100
          </p>
        </div>
      </section>

      <section id="virtual-memory" className="mt-8">
        <h2>Virtual Memory</h2>
        <p>
          Virtual memory is a memory management technique that provides an illusion to users of a very large (main)
          memory. It allows the execution of processes that are not completely in memory.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=virtual memory system showing mapping between virtual and physical memory with some pages on disk"
            alt="Virtual Memory System"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 4: Virtual memory system</p>
        </div>

        <p className="mt-4">Benefits of virtual memory:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Process Size &gt; Physical Memory:</strong> Allows running programs larger than physical memory.
          </li>
          <li>
            <strong>More Processes in Memory:</strong> Increases the degree of multiprogramming.
          </li>
          <li>
            <strong>Less I/O for Loading:</strong> Programs can start execution without being fully loaded.
          </li>
          <li>
            <strong>Efficient Process Creation:</strong> Copy-on-write techniques can be used.
          </li>
        </ul>

        <p className="mt-4">Virtual memory is typically implemented using demand paging or demand segmentation.</p>
      </section>

      <section id="demand-paging" className="mt-8">
        <h2>Demand Paging</h2>
        <p>
          Demand paging is a type of virtual memory management where pages are loaded into memory only when they are
          referenced. This reduces memory usage and initial loading time.
        </p>

        <p className="mt-4">Key concepts in demand paging:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Valid/Invalid Bit:</strong> Indicates whether a page is in memory (valid) or not (invalid).
          </li>
          <li>
            <strong>Page Fault:</strong> Occurs when a program accesses a page that is not in memory.
          </li>
          <li>
            <strong>Page Fault Handling:</strong> The operating system brings the required page into memory.
          </li>
          <li>
            <strong>Pure Demand Paging:</strong> Start with no pages in memory and bring them in as needed.
          </li>
          <li>
            <strong>Swapping:</strong> Moving pages between main memory and secondary storage.
          </li>
        </ul>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=page fault handling process flowchart"
            alt="Page Fault Handling"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 5: Page fault handling process</p>
        </div>

        <p className="mt-4">
          The performance of demand paging depends on the page fault rate. If p is the probability of a page fault (0 ≤
          p ≤ 1), and if the memory access time is ma and the page fault service time is ps, then the effective access
          time is:
        </p>
        <div className="bg-muted p-4 rounded-md mt-4 text-center">
          <p className="font-medium">Effective Access Time = (1 - p) × ma + p × ps</p>
        </div>
      </section>

      <section id="page-replacement" className="mt-8">
        <h2>Page Replacement</h2>
        <p>
          When a page fault occurs and all memory frames are currently in use, the operating system must choose a page
          to replace. This is done using a page replacement algorithm.
        </p>

        <p className="mt-4">
          The goal of page replacement is to minimize the page fault rate by selecting the page that is least likely to
          be used in the near future.
        </p>

        <Tabs defaultValue="fifo" className="my-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="fifo">FIFO</TabsTrigger>
            <TabsTrigger value="lru">LRU</TabsTrigger>
            <TabsTrigger value="optimal">Optimal</TabsTrigger>
            <TabsTrigger value="clock">Clock</TabsTrigger>
          </TabsList>
          <TabsContent value="fifo" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">First-In-First-Out (FIFO)</h3>
            <p className="mb-2">The oldest page in memory is the one selected for replacement:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Simple to understand and implement.</li>
              <li>Keeps track of the order in which pages were brought into memory.</li>
              <li>May remove pages that are still in active use.</li>
              <li>Can suffer from Belady's anomaly (more frames can lead to more page faults).</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example:</p>
              <p>
                Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5<br />
                With 3 frames, FIFO would cause 9 page faults.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="lru" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Least Recently Used (LRU)</h3>
            <p className="mb-2">Replaces the page that has not been used for the longest period of time:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Based on the principle of locality of reference.</li>
              <li>Typically performs better than FIFO.</li>
              <li>Requires hardware support to track when each page was last used.</li>
              <li>Can be implemented using counters, stacks, or hash tables.</li>
              <li>Does not suffer from Belady's anomaly.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example:</p>
              <p>
                Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5<br />
                With 3 frames, LRU would cause 8 page faults.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="optimal" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Optimal (OPT)</h3>
            <p className="mb-2">
              Replaces the page that will not be used for the longest period of time in the future:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Provides the lowest possible page fault rate for a fixed number of frames.</li>
              <li>Used as a theoretical benchmark to evaluate other algorithms.</li>
              <li>Cannot be implemented in practice as it requires future knowledge.</li>
              <li>Does not suffer from Belady's anomaly.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example:</p>
              <p>
                Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5<br />
                With 3 frames, OPT would cause 6 page faults.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="clock" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Clock (Second Chance)</h3>
            <p className="mb-2">An approximation of LRU that uses a reference bit and a circular list of pages:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Each page has a reference bit that is set when the page is accessed.</li>
              <li>When a page needs to be replaced, the algorithm checks the reference bit.</li>
              <li>
                If the bit is 0, the page is replaced; if it's 1, the bit is set to 0 and the next page is checked.
              </li>
              <li>More efficient to implement than LRU but still provides good performance.</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=300&width=300&query=clock page replacement algorithm with circular queue"
                alt="Clock Page Replacement"
                width={300}
                height={300}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <InteractiveDiagram
        title="Memory Management Techniques"
        description="Explore different memory management techniques and their characteristics"
        states={memoryManagementTechniques}
        initialState="paging"
      />

      <InteractiveDiagram
        title="Page Replacement Algorithms"
        description="Explore different page replacement algorithms and their characteristics"
        states={pageReplacementAlgorithms}
        initialState="fifo"
      />

      <section id="practice" className="mt-8">
        <h2>Practice Questions</h2>
        <QuizComponent
          title="Module 4 Quiz"
          description="Test your understanding of memory management concepts"
          questions={quizQuestions}
        />
      </section>
    </ModuleLayout>
  )
}
