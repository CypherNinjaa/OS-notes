import ModuleLayout from "@/components/module-layout"
import InteractiveDiagram from "@/components/interactive-diagram"
import QuizComponent from "@/components/quiz-component"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Module2() {
  const processStates = [
    {
      id: "new",
      name: "New",
      description: "The process is being created and has not yet been admitted to the pool of executable processes.",
      color: "blue",
    },
    {
      id: "ready",
      name: "Ready",
      description: "The process is waiting to be assigned to a processor for execution.",
      color: "green",
    },
    {
      id: "running",
      name: "Running",
      description: "The process is currently being executed by the CPU.",
      color: "purple",
    },
    {
      id: "waiting",
      name: "Waiting",
      description: "The process is waiting for some event to occur (such as an I/O completion).",
      color: "orange",
    },
    {
      id: "terminated",
      name: "Terminated",
      description: "The process has finished execution and is being removed from memory.",
      color: "red",
    },
  ]

  const synchronizationMechanisms = [
    {
      id: "mutex",
      name: "Mutex",
      description: "A mutual exclusion object that allows multiple threads to synchronize access to a shared resource.",
      color: "blue",
    },
    {
      id: "semaphore",
      name: "Semaphore",
      description:
        "A variable or abstract data type used to control access to a common resource by multiple processes.",
      color: "green",
    },
    {
      id: "monitor",
      name: "Monitor",
      description:
        "A synchronization construct that allows threads to have both mutual exclusion and the ability to wait for a condition to become true.",
      color: "purple",
    },
    {
      id: "message",
      name: "Message Passing",
      description:
        "Processes communicate with each other by exchanging messages, which can include synchronization information.",
      color: "orange",
    },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "What is a critical section in the context of process synchronization?",
      options: [
        "A section of code that can only be executed by one process at a time",
        "A section of code that must be executed by all processes",
        "A section of code that is critical for the operating system to function",
        "A section of code that has high priority in execution",
      ],
      correctAnswer: 0,
      explanation:
        "A critical section is a segment of code where processes access shared resources and which must not be executed by more than one process at a time to maintain data consistency.",
    },
    {
      id: 2,
      question:
        "Which of the following is NOT a condition that a solution to the critical section problem must satisfy?",
      options: ["Mutual Exclusion", "Progress", "Bounded Waiting", "Maximum Throughput"],
      correctAnswer: 3,
      explanation:
        "The three conditions for solving the critical section problem are Mutual Exclusion, Progress, and Bounded Waiting. Maximum Throughput is not one of the required conditions.",
    },
    {
      id: 3,
      question: "What is the primary difference between a process and a thread?",
      options: [
        "Processes are faster than threads",
        "Threads share memory space while processes have separate memory spaces",
        "Processes can communicate with each other but threads cannot",
        "Threads are managed by the hardware while processes are managed by the OS",
      ],
      correctAnswer: 1,
      explanation:
        "Threads within the same process share the process's memory space and resources, while different processes have separate memory spaces and require inter-process communication mechanisms to share data.",
    },
    {
      id: 4,
      question: "In the context of semaphores, what is the difference between binary and counting semaphores?",
      options: [
        "Binary semaphores can only be used by two processes, while counting semaphores can be used by multiple processes",
        "Binary semaphores can only have values 0 or 1, while counting semaphores can have arbitrary non-negative values",
        "Binary semaphores are used for mutual exclusion, while counting semaphores are used for signaling",
        "Binary semaphores are faster than counting semaphores",
      ],
      correctAnswer: 1,
      explanation:
        "Binary semaphores can only have values 0 or 1, making them suitable for mutual exclusion. Counting semaphores can have arbitrary non-negative values, making them suitable for resource counting and more complex synchronization scenarios.",
    },
    {
      id: 5,
      question: "What problem does the producer-consumer problem illustrate?",
      options: [
        "The need for process scheduling",
        "The need for memory management",
        "The need for process synchronization",
        "The need for file management",
      ],
      correctAnswer: 2,
      explanation:
        "The producer-consumer problem illustrates the need for process synchronization when processes share resources. It involves producers adding items to a buffer and consumers removing items, requiring synchronization to prevent buffer overflow or underflow conditions.",
    },
  ]

  return (
    <ModuleLayout
      title="Module 2: Process Management"
      description="Process concepts, states, synchronization, and communication"
      moduleNumber={2}
    >
      <section id="process-concept">
        <h2>Process Concept</h2>
        <p>
          A process is an instance of a program in execution. It is the basic unit of work in an operating system. Each
          process has its own memory space, system resources, and execution context.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=process in memory showing text, data, heap, and stack segments"
            alt="Process in Memory"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 1: Process memory layout showing text, data, heap, and stack segments
          </p>
        </div>

        <p>A process consists of the following components:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Program Code (Text):</strong> The executable instructions of the program.
          </li>
          <li>
            <strong>Data:</strong> Global and static variables used by the program.
          </li>
          <li>
            <strong>Heap:</strong> Dynamically allocated memory during program execution.
          </li>
          <li>
            <strong>Stack:</strong> Temporary data storage for function parameters, return addresses, and local
            variables.
          </li>
        </ul>

        <p className="mt-4">
          The operating system maintains a data structure called the Process Control Block (PCB) for each process. The
          PCB contains:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Process ID (PID)</li>
          <li>Process state</li>
          <li>Program counter</li>
          <li>CPU registers</li>
          <li>CPU scheduling information</li>
          <li>Memory management information</li>
          <li>Accounting information</li>
          <li>I/O status information</li>
        </ul>
      </section>

      <section id="process-states" className="mt-8">
        <h2>Process States</h2>
        <p>During its lifetime, a process goes through various states as it executes:</p>

        <Card className="my-4">
          <CardContent className="p-6">
            <ul className="space-y-4">
              <li>
                <strong className="text-primary">New:</strong> The process is being created.
              </li>
              <li>
                <strong className="text-primary">Ready:</strong> The process is waiting to be assigned to a processor.
              </li>
              <li>
                <strong className="text-primary">Running:</strong> Instructions are being executed.
              </li>
              <li>
                <strong className="text-primary">Waiting:</strong> The process is waiting for some event to occur (such
                as an I/O completion).
              </li>
              <li>
                <strong className="text-primary">Terminated:</strong> The process has finished execution.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=process state transition diagram showing new, ready, running, waiting, and terminated states"
            alt="Process State Transitions"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 2: Process state transition diagram</p>
        </div>

        <p className="mt-4">Process state transitions occur in response to specific events:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>New → Ready:</strong> When the process is admitted to the ready queue.
          </li>
          <li>
            <strong>Ready → Running:</strong> When the scheduler selects the process for execution.
          </li>
          <li>
            <strong>Running → Ready:</strong> When the scheduler preempts the process (e.g., time quantum expires).
          </li>
          <li>
            <strong>Running → Waiting:</strong> When the process requests I/O or waits for an event.
          </li>
          <li>
            <strong>Waiting → Ready:</strong> When the I/O completes or the event occurs.
          </li>
          <li>
            <strong>Running → Terminated:</strong> When the process completes execution or is aborted.
          </li>
        </ul>
      </section>

      <section id="synchronization" className="mt-8">
        <h2>Process Synchronization</h2>
        <p>
          Process synchronization is the coordination of multiple processes to complete a task with correct runtime
          order and no race conditions. It is necessary when processes share data or resources.
        </p>

        <p className="mt-4">
          The need for synchronization arises from the concurrent execution of processes that share resources or data.
          Without proper synchronization, processes might interfere with each other, leading to data inconsistency.
        </p>

        <p className="mt-4">
          A race condition occurs when multiple processes access and manipulate shared data concurrently, and the
          outcome depends on the particular order in which the access takes place. To prevent race conditions, we need
          to ensure that only one process can access the shared data at a time.
        </p>
      </section>

      <section id="critical-section" className="mt-8">
        <h2>Critical Section</h2>
        <p>
          A critical section is a segment of code where processes access shared resources and which must not be executed
          by more than one process at a time.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=critical section problem showing entry section, critical section, and exit section"
            alt="Critical Section Problem"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 3: Structure of a process with a critical section
          </p>
        </div>

        <p>Any solution to the critical section problem must satisfy the following three conditions:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Mutual Exclusion:</strong> Only one process can execute in the critical section at a time.
          </li>
          <li>
            <strong>Progress:</strong> If no process is executing in the critical section and some processes wish to
            enter it, only those processes not in their remainder section can participate in the decision, and the
            decision cannot be postponed indefinitely.
          </li>
          <li>
            <strong>Bounded Waiting:</strong> There exists a bound on the number of times other processes can enter
            their critical sections after a process has made a request to enter its critical section and before that
            request is granted.
          </li>
        </ul>
      </section>

      <section id="mutual-exclusion" className="mt-8">
        <h2>Mutual Exclusion</h2>
        <p>
          Mutual exclusion is a property of concurrency control, which is instituted to prevent race conditions. It
          ensures that only one process can access a shared resource at a time.
        </p>

        <Tabs defaultValue="software" className="my-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="software">Software Solutions</TabsTrigger>
            <TabsTrigger value="hardware">Hardware Support</TabsTrigger>
            <TabsTrigger value="semaphores">Semaphores</TabsTrigger>
          </TabsList>
          <TabsContent value="software" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Software Solutions</h3>
            <p className="mb-2">Software-based solutions for mutual exclusion include algorithms like:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>Peterson's Algorithm:</strong> A two-process solution that uses shared variables.
              </li>
              <li>
                <strong>Dekker's Algorithm:</strong> The first correct software solution to the mutual exclusion
                problem.
              </li>
              <li>
                <strong>Lamport's Bakery Algorithm:</strong> A solution for n processes, similar to taking a number at a
                bakery.
              </li>
            </ul>
            <p className="mt-4">
              These solutions don't require special hardware support but may not be efficient for many processes.
            </p>
          </TabsContent>
          <TabsContent value="hardware" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Hardware Support</h3>
            <p className="mb-2">Hardware-based solutions use atomic instructions provided by the CPU:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>Test and Set:</strong> An atomic instruction that tests and sets a memory location.
              </li>
              <li>
                <strong>Compare and Swap:</strong> Atomically compares the contents of a memory location to a given
                value and modifies it if they are the same.
              </li>
              <li>
                <strong>Atomic Variables:</strong> Variables that provide atomic operations for common tasks.
              </li>
            </ul>
            <p className="mt-4">These solutions are more efficient but require specific hardware support.</p>
          </TabsContent>
          <TabsContent value="semaphores" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Semaphores</h3>
            <p className="mb-2">Semaphores are a synchronization mechanism introduced by Dijkstra:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>Binary Semaphore:</strong> Can have only the values 0 and 1, used for mutual exclusion.
              </li>
              <li>
                <strong>Counting Semaphore:</strong> Can have arbitrary non-negative values, used for resource counting.
              </li>
            </ul>
            <p className="mt-4">
              Semaphores provide a higher-level abstraction for mutual exclusion and synchronization.
            </p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-mono text-sm">
                // Binary semaphore example
                <br />
                const mutex = 1; // Initialize to 1<br />
                <br />
                // Process P1
                <br />
                wait(mutex); // Acquire the semaphore
                <br />
                // Critical section
                <br />
                signal(mutex); // Release the semaphore
                <br />
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section id="classical-problems" className="mt-8">
        <h2>Classical Synchronization Problems</h2>
        <p>Several classical problems illustrate the challenges of process synchronization:</p>

        <Tabs defaultValue="producer-consumer" className="my-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="producer-consumer">Producer-Consumer</TabsTrigger>
            <TabsTrigger value="readers-writers">Readers-Writers</TabsTrigger>
            <TabsTrigger value="dining-philosophers">Dining Philosophers</TabsTrigger>
          </TabsList>
          <TabsContent value="producer-consumer" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Producer-Consumer Problem</h3>
            <p className="mb-2">Also known as the bounded-buffer problem, it involves two types of processes:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>Producers:</strong> Generate data and place it in a buffer.
              </li>
              <li>
                <strong>Consumers:</strong> Take data from the buffer and process it.
              </li>
            </ul>
            <p className="mt-4">
              The challenge is to ensure that producers don't add data to a full buffer and consumers don't remove data
              from an empty buffer.
            </p>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=300&width=600&query=producer consumer problem with buffer"
                alt="Producer-Consumer Problem"
                width={600}
                height={300}
                className="rounded-md mx-auto"
              />
            </div>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-mono text-sm">
                // Semaphore solution
                <br />
                const mutex = 1; // Binary semaphore for mutual exclusion
                <br />
                const empty = n; // Counting semaphore for empty slots (n = buffer size)
                <br />
                const full = 0; // Counting semaphore for filled slots
                <br />
                <br />
                // Producer
                <br />
                wait(empty); // Wait if buffer is full
                <br />
                wait(mutex); // Enter critical section
                <br />
                // Add item to buffer
                <br />
                signal(mutex); // Exit critical section
                <br />
                signal(full); // Signal that a slot is filled
                <br />
                <br />
                // Consumer
                <br />
                wait(full); // Wait if buffer is empty
                <br />
                wait(mutex); // Enter critical section
                <br />
                // Remove item from buffer
                <br />
                signal(mutex); // Exit critical section
                <br />
                signal(empty); // Signal that a slot is emptied
                <br />
              </p>
            </div>
          </TabsContent>
          <TabsContent value="readers-writers" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Readers-Writers Problem</h3>
            <p className="mb-2">This problem involves processes that can be divided into two categories:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>Readers:</strong> Only read the shared data and don't modify it.
              </li>
              <li>
                <strong>Writers:</strong> Can both read and modify the shared data.
              </li>
            </ul>
            <p className="mt-4">
              The challenge is to allow multiple readers to access the data simultaneously while ensuring that writers
              have exclusive access.
            </p>
            <p className="mt-2">There are different variations of this problem with different priorities:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>First Readers-Writers Problem:</strong> No reader should wait unless a writer has already
                obtained permission to use the shared object.
              </li>
              <li>
                <strong>Second Readers-Writers Problem:</strong> Once a writer is ready, no new readers should be
                allowed to start reading.
              </li>
              <li>
                <strong>Third Readers-Writers Problem:</strong> No thread should be allowed to starve (wait
                indefinitely).
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="dining-philosophers" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Dining Philosophers Problem</h3>
            <p className="mb-2">
              This problem illustrates the challenges of resource allocation and deadlock avoidance:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Five philosophers sit at a round table with five forks.</li>
              <li>Each philosopher needs two forks to eat (one from each side).</li>
              <li>Philosophers alternate between thinking and eating.</li>
            </ul>
            <p className="mt-4">
              The challenge is to design a protocol that allows philosophers to eat without causing deadlock or
              starvation.
            </p>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=300&width=300&query=dining philosophers problem with 5 philosophers at a round table"
                alt="Dining Philosophers Problem"
                width={300}
                height={300}
                className="rounded-md mx-auto"
              />
            </div>
            <p className="mt-4">One solution is to introduce an asymmetry in the way philosophers pick up forks:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {`// Asymmetric solution
// Philosophers 0, 2, 4 pick up left fork first
// Philosophers 1, 3 pick up right fork first

// Philosopher i
if (i % 2 == 0) {
  wait(fork[i]); // Pick up left fork
  wait(fork[(i+1) % 5]); // Pick up right fork
} else {
  wait(fork[(i+1) % 5]); // Pick up right fork
  wait(fork[i]); // Pick up left fork
}
// Eat
signal(fork[i]); // Put down left fork
signal(fork[(i+1) % 5]); // Put down right fork`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section id="scheduling" className="mt-8">
        <h2>Process Scheduling</h2>
        <p>
          Process scheduling is the activity of the process manager that handles the removal of the running process from
          the CPU and the selection of another process based on a particular strategy.
        </p>

        <p className="mt-4">
          The objective of process scheduling is to keep the CPU busy at all times and to deliver acceptable response
          times for all programs.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=process scheduling queue with ready queue, CPU, and I/O queue"
            alt="Process Scheduling Queues"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 4: Process scheduling queues</p>
        </div>

        <p className="mt-4">There are different types of schedulers in an operating system:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Long-term Scheduler (Job Scheduler):</strong> Controls the degree of multiprogramming by selecting
            which processes should be loaded into memory for execution.
          </li>
          <li>
            <strong>Medium-term Scheduler:</strong> Handles swapping processes in and out of memory to improve the
            process mix.
          </li>
          <li>
            <strong>Short-term Scheduler (CPU Scheduler):</strong> Selects which process should be executed next and
            allocates the CPU to it.
          </li>
        </ul>
      </section>

      <section id="ipc" className="mt-8">
        <h2>Interprocess Communication (IPC)</h2>
        <p>
          Interprocess Communication (IPC) is a mechanism that allows processes to communicate with each other and
          synchronize their actions.
        </p>

        <Tabs defaultValue="shared-memory" className="my-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="shared-memory">Shared Memory</TabsTrigger>
            <TabsTrigger value="message-passing">Message Passing</TabsTrigger>
            <TabsTrigger value="pipes">Pipes & Sockets</TabsTrigger>
          </TabsList>
          <TabsContent value="shared-memory" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Shared Memory</h3>
            <p className="mb-2">
              In shared memory systems, processes share a region of memory that they can all access:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>A region of memory is established that can be accessed by multiple processes.</li>
              <li>Processes can exchange information by reading and writing data to the shared region.</li>
              <li>Fast communication as no kernel involvement is required once the memory is set up.</li>
              <li>Requires synchronization to avoid race conditions.</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=250&width=600&query=shared memory communication between processes"
                alt="Shared Memory Communication"
                width={600}
                height={250}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="message-passing" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Message Passing</h3>
            <p className="mb-2">In message passing systems, processes communicate by exchanging messages:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Processes communicate by sending and receiving messages.</li>
              <li>Communication can be direct or indirect (through mailboxes or ports).</li>
              <li>Messages can be synchronous (blocking) or asynchronous (non-blocking).</li>
              <li>Easier to implement than shared memory for distributed systems.</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=250&width=600&query=message passing between processes"
                alt="Message Passing"
                width={600}
                height={250}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="pipes" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Pipes & Sockets</h3>
            <p className="mb-2">Other IPC mechanisms include:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>Pipes:</strong> A unidirectional communication channel between related processes.
              </li>
              <li>
                <strong>Named Pipes (FIFOs):</strong> Allow communication between unrelated processes.
              </li>
              <li>
                <strong>Sockets:</strong> Enable communication between processes on different machines.
              </li>
              <li>
                <strong>Remote Procedure Calls (RPC):</strong> Allow a program to cause a procedure to execute in
                another address space.
              </li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {`// Example of pipe in Unix/Linux
const fd = new Array(2);
pipe(fd); // Create a pipe

if (fork() == 0) {
  // Child process
  close(fd[0]); // Close reading end
  write(fd[1], "Hello", 5);
  close(fd[1]);
} else {
  // Parent process
  close(fd[1]); // Close writing end
  const buffer = new Array(20);
  read(fd[0], buffer, sizeof(buffer));
  close(fd[0]);
}`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section id="threads" className="mt-8">
        <h2>Threads and Their Management</h2>
        <p>
          A thread is a basic unit of CPU utilization, consisting of a program counter, a stack, and a set of registers.
          Multiple threads can exist within the same process, sharing the process's resources.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=single-threaded vs multi-threaded process"
            alt="Single-threaded vs Multi-threaded Process"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 5: Comparison of single-threaded and multi-threaded processes
          </p>
        </div>

        <p className="mt-4">Threads offer several benefits:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Responsiveness:</strong> Applications can remain responsive to user input while performing other
            tasks.
          </li>
          <li>
            <strong>Resource Sharing:</strong> Threads share the memory and resources of the process they belong to.
          </li>
          <li>
            <strong>Economy:</strong> Creating and context-switching threads is faster than for processes.
          </li>
          <li>
            <strong>Scalability:</strong> Applications can take advantage of multiprocessor architectures.
          </li>
        </ul>

        <Tabs defaultValue="user-level" className="my-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="user-level">User-Level Threads</TabsTrigger>
            <TabsTrigger value="kernel-level">Kernel-Level Threads</TabsTrigger>
          </TabsList>
          <TabsContent value="user-level" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">User-Level Threads</h3>
            <p className="mb-2">
              User-level threads are managed by a thread library at the user level, without kernel support:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Thread management is done by the application.</li>
              <li>The kernel is not aware of the existence of threads.</li>
              <li>Fast thread creation and context switching.</li>
              <li>If one thread blocks on I/O, all threads in the process are blocked.</li>
              <li>Cannot take advantage of multiprocessing.</li>
            </ul>
            <p className="mt-4">Examples include POSIX Threads (Pthreads), Java threads, and Win32 threads.</p>
          </TabsContent>
          <TabsContent value="kernel-level" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Kernel-Level Threads</h3>
            <p className="mb-2">Kernel-level threads are supported and managed directly by the operating system:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Thread management is done by the kernel.</li>
              <li>The kernel maintains context information for the process and its threads.</li>
              <li>Slower thread creation and context switching.</li>
              <li>If one thread blocks, another thread can still be scheduled.</li>
              <li>Can take advantage of multiprocessing.</li>
            </ul>
            <p className="mt-4">
              Examples include Windows NT/2000/XP threads, Linux threads (NPTL), and Solaris threads.
            </p>
          </TabsContent>
        </Tabs>

        <p className="mt-4">Thread models describe the relationship between user-level and kernel-level threads:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Many-to-One:</strong> Many user-level threads mapped to a single kernel thread.
          </li>
          <li>
            <strong>One-to-One:</strong> Each user-level thread mapped to a kernel thread.
          </li>
          <li>
            <strong>Many-to-Many:</strong> Many user-level threads mapped to a smaller or equal number of kernel
            threads.
          </li>
        </ul>
      </section>

      <section id="security" className="mt-8">
        <h2>Security Issues</h2>
        <p>Process management involves several security considerations to protect the system and user data:</p>

        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Process Isolation:</strong> Ensuring that processes cannot interfere with each other's memory space.
          </li>
          <li>
            <strong>Access Control:</strong> Limiting what resources a process can access based on permissions.
          </li>
          <li>
            <strong>Authentication:</strong> Verifying the identity of users before allowing processes to run.
          </li>
          <li>
            <strong>Authorization:</strong> Determining what actions a process is allowed to perform.
          </li>
          <li>
            <strong>Secure IPC:</strong> Protecting data exchanged between processes.
          </li>
          <li>
            <strong>Prevention of Privilege Escalation:</strong> Ensuring processes cannot gain unauthorized privileges.
          </li>
        </ul>

        <p className="mt-4">Common security threats related to process management include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Buffer Overflow:</strong> When a process writes data beyond the allocated buffer, potentially
            overwriting adjacent memory.
          </li>
          <li>
            <strong>Race Conditions:</strong> When the system behavior depends on the sequence or timing of
            uncontrollable events.
          </li>
          <li>
            <strong>Denial of Service:</strong> When a process consumes excessive resources, preventing other processes
            from functioning.
          </li>
          <li>
            <strong>Covert Channels:</strong> Hidden communication channels that can be used to leak information.
          </li>
        </ul>
      </section>

      <InteractiveDiagram
        title="Process States"
        description="Explore the different states a process can be in during its lifetime"
        states={processStates}
        initialState="new"
      />

      <InteractiveDiagram
        title="Synchronization Mechanisms"
        description="Explore different mechanisms used for process synchronization"
        states={synchronizationMechanisms}
        initialState="mutex"
      />

      <section id="practice" className="mt-8">
        <h2>Practice Questions</h2>
        <QuizComponent
          title="Module 2 Quiz"
          description="Test your understanding of process management concepts"
          questions={quizQuestions}
        />
      </section>
    </ModuleLayout>
  )
}
