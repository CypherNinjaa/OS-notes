import ModuleLayout from "@/components/module-layout"
import InteractiveDiagram from "@/components/interactive-diagram"
import QuizComponent from "@/components/quiz-component"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Module3() {
  const schedulingAlgorithms = [
    {
      id: "fcfs",
      name: "First-Come-First-Serve",
      description:
        "Processes are executed in the order they arrive in the ready queue. Simple but can lead to the convoy effect.",
      color: "blue",
    },
    {
      id: "sjf",
      name: "Shortest Job First",
      description:
        "Selects the process with the smallest execution time. Optimal for minimizing average waiting time but requires knowing execution time in advance.",
      color: "green",
    },
    {
      id: "rr",
      name: "Round Robin",
      description:
        "Each process gets a small unit of CPU time (time quantum), and after this time has elapsed, the process is preempted and added to the end of the ready queue.",
      color: "purple",
    },
    {
      id: "priority",
      name: "Priority Scheduling",
      description:
        "Each process is assigned a priority, and the CPU is allocated to the process with the highest priority. Can lead to starvation.",
      color: "orange",
    },
  ]

  const deadlockStrategies = [
    {
      id: "prevention",
      name: "Deadlock Prevention",
      description:
        "Ensures that at least one of the necessary conditions for deadlock cannot hold by imposing constraints on resource requests.",
      color: "blue",
    },
    {
      id: "avoidance",
      name: "Deadlock Avoidance",
      description:
        "Requires additional information about how resources will be requested and used. The system only grants resource requests if they won't lead to deadlock.",
      color: "green",
    },
    {
      id: "detection",
      name: "Deadlock Detection",
      description:
        "Allows the system to enter a deadlock state and then detects it. After detection, the system can recover through process termination or resource preemption.",
      color: "purple",
    },
    {
      id: "ignorance",
      name: "Deadlock Ignorance",
      description:
        "Ignores the problem altogether, assuming deadlocks occur infrequently. Used in most operating systems, including Windows and UNIX.",
      color: "orange",
    },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "Which scheduling algorithm is most appropriate for time-sharing systems?",
      options: ["First-Come-First-Serve", "Shortest Job First", "Round Robin", "Priority Scheduling"],
      correctAnswer: 2,
      explanation:
        "Round Robin is well-suited for time-sharing systems because it gives each process a fair share of CPU time, ensuring that no process has to wait too long for execution.",
    },
    {
      id: 2,
      question: "What is the convoy effect in CPU scheduling?",
      options: [
        "When all processes arrive at the same time",
        "When short processes wait for a long process to complete",
        "When processes are executed in a round-robin fashion",
        "When high-priority processes are executed before low-priority ones",
      ],
      correctAnswer: 1,
      explanation:
        "The convoy effect occurs in FCFS scheduling when all processes wait for a long process to complete execution. This results in lower CPU and device utilization.",
    },
    {
      id: 3,
      question: "Which of the following is NOT a necessary condition for deadlock to occur?",
      options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait", "Resource Abundance"],
      correctAnswer: 4,
      explanation:
        "Resource Abundance is not a necessary condition for deadlock. In fact, deadlock typically occurs when resources are limited. The four necessary conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
    },
    {
      id: 4,
      question: "In the Banker's Algorithm for deadlock avoidance, what does the system need to know?",
      options: [
        "Only the maximum number of resources each process may need",
        "Only the currently allocated resources for each process",
        "Both the maximum needs and current allocation of resources",
        "The execution time of each process",
      ],
      correctAnswer: 2,
      explanation:
        "The Banker's Algorithm requires knowledge of both the maximum number of resources each process may need and the current allocation of resources to determine if a state is safe.",
    },
    {
      id: 5,
      question: "Which scheduling algorithm can lead to starvation?",
      options: ["First-Come-First-Serve", "Round Robin", "Priority Scheduling without aging", "All of the above"],
      correctAnswer: 2,
      explanation:
        "Priority Scheduling without aging can lead to starvation of low-priority processes if there is a continuous stream of high-priority processes. FCFS and Round Robin do not suffer from starvation.",
    },
  ]

  return (
    <ModuleLayout
      title="Module 3: CPU Scheduling"
      description="Scheduling algorithms, techniques, and deadlock management"
      moduleNumber={3}
    >
      <section id="concepts">
        <h2>Scheduling Concepts</h2>
        <p>
          CPU scheduling is the process of determining which process in the ready queue should be allocated the CPU. The
          objective is to maximize CPU utilization, throughput, and fairness while minimizing waiting time, response
          time, and turnaround time.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=CPU scheduling showing ready queue, CPU, and various queues"
            alt="CPU Scheduling Overview"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 1: Overview of CPU scheduling</p>
        </div>

        <p>CPU scheduling decisions may take place under the following circumstances:</p>
        <ol className="list-decimal pl-5 mt-2">
          <li>When a process switches from running to waiting state (e.g., I/O request)</li>
          <li>When a process switches from running to ready state (e.g., interrupt)</li>
          <li>When a process switches from waiting to ready state (e.g., I/O completion)</li>
          <li>When a process terminates</li>
        </ol>

        <p className="mt-4">Scheduling criteria include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>CPU Utilization:</strong> Keep the CPU as busy as possible
          </li>
          <li>
            <strong>Throughput:</strong> Number of processes completed per time unit
          </li>
          <li>
            <strong>Turnaround Time:</strong> Time from submission to completion of a process
          </li>
          <li>
            <strong>Waiting Time:</strong> Total time spent in the ready queue
          </li>
          <li>
            <strong>Response Time:</strong> Time from submission until the first response
          </li>
        </ul>
      </section>

      <section id="techniques" className="mt-8">
        <h2>Techniques of Scheduling</h2>
        <p>CPU scheduling techniques can be broadly classified into two categories:</p>

        <Tabs defaultValue="preemptive" className="my-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="preemptive">Preemptive Scheduling</TabsTrigger>
            <TabsTrigger value="non-preemptive">Non-Preemptive Scheduling</TabsTrigger>
          </TabsList>
          <TabsContent value="preemptive" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Preemptive Scheduling</h3>
            <p className="mb-2">
              In preemptive scheduling, the CPU can be taken away from a process before it completes execution:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>The CPU is allocated to a process for a limited time.</li>
              <li>If a higher priority process arrives, the current process is preempted.</li>
              <li>Suitable for time-sharing systems and real-time systems.</li>
              <li>Requires context switching overhead.</li>
              <li>Examples: Round Robin, Shortest Remaining Time First, Priority Scheduling (preemptive version).</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=300&width=600&query=preemptive scheduling timeline showing process switching"
                alt="Preemptive Scheduling"
                width={600}
                height={300}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="non-preemptive" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Non-Preemptive Scheduling</h3>
            <p className="mb-2">
              In non-preemptive scheduling, once the CPU is allocated to a process, it keeps the CPU until it releases
              it voluntarily:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>A process keeps the CPU until it terminates or blocks for I/O.</li>
              <li>No interruption during execution.</li>
              <li>Simpler to implement with less overhead.</li>
              <li>Not suitable for time-sharing systems.</li>
              <li>
                Examples: First-Come-First-Serve, Shortest Job First (non-preemptive version), Priority Scheduling
                (non-preemptive version).
              </li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=300&width=600&query=non-preemptive scheduling timeline showing processes completing before switching"
                alt="Non-Preemptive Scheduling"
                width={600}
                height={300}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section id="algorithms" className="mt-8">
        <h2>Scheduling Algorithms</h2>
        <p>Various scheduling algorithms are used to determine which process gets the CPU next:</p>

        <Tabs defaultValue="fcfs" className="my-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="fcfs">FCFS</TabsTrigger>
            <TabsTrigger value="sjf">SJF/SRTF</TabsTrigger>
            <TabsTrigger value="rr">Round Robin</TabsTrigger>
            <TabsTrigger value="priority">Priority</TabsTrigger>
          </TabsList>
          <TabsContent value="fcfs" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">First-Come-First-Serve (FCFS)</h3>
            <p className="mb-2">The simplest scheduling algorithm that executes processes in the order they arrive:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Non-preemptive scheduling algorithm.</li>
              <li>Easy to understand and implement.</li>
              <li>Poor performance for time-sharing systems.</li>
              <li>Can lead to the convoy effect where short processes wait for long processes.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example:</p>
              <p>
                Process P1 arrives at time 0 with burst time 24
                <br />
                Process P2 arrives at time 1 with burst time 3<br />
                Process P3 arrives at time 2 with burst time 3<br />
              </p>
              <p className="mt-2">
                Execution order: P1 → P2 → P3
                <br />
                Average waiting time: (0 + 24 + 27) / 3 = 17 time units
              </p>
            </div>
          </TabsContent>
          <TabsContent value="sjf" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">
              Shortest Job First (SJF) / Shortest Remaining Time First (SRTF)
            </h3>
            <p className="mb-2">SJF selects the process with the smallest execution time:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Can be either preemptive (SRTF) or non-preemptive (SJF).</li>
              <li>Optimal for minimizing average waiting time.</li>
              <li>Difficult to implement as it requires knowing the execution time in advance.</li>
              <li>Can lead to starvation for long processes.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example (Non-preemptive SJF):</p>
              <p>
                Process P1 arrives at time 0 with burst time 7<br />
                Process P2 arrives at time 2 with burst time 4<br />
                Process P3 arrives at time 4 with burst time 1<br />
                Process P4 arrives at time 5 with burst time 4<br />
              </p>
              <p className="mt-2">
                Execution order: P1 → P3 → P2 → P4
                <br />
                Average waiting time: (0 + 6 + 3 + 7) / 4 = 4 time units
              </p>
            </div>
          </TabsContent>
          <TabsContent value="rr" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Round Robin (RR)</h3>
            <p className="mb-2">Round Robin is designed specifically for time-sharing systems:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Preemptive scheduling algorithm.</li>
              <li>Each process gets a fixed time quantum (time slice).</li>
              <li>After the time quantum expires, the process is preempted and added to the end of the ready queue.</li>
              <li>Fair allocation of CPU time to all processes.</li>
              <li>Performance depends on the size of the time quantum.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example (Time Quantum = 4):</p>
              <p>
                Process P1 with burst time 24
                <br />
                Process P2 with burst time 3<br />
                Process P3 with burst time 3<br />
              </p>
              <p className="mt-2">
                Execution order: P1(4) → P2(3) → P3(3) → P1(4) → P1(4) → P1(4) → P1(4) → P1(4)
                <br />
                Average waiting time: (10 + 4 + 7) / 3 = 7 time units
              </p>
            </div>
          </TabsContent>
          <TabsContent value="priority" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Priority Scheduling</h3>
            <p className="mb-2">
              Priority scheduling assigns a priority to each process and allocates the CPU to the highest-priority
              process:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Can be either preemptive or non-preemptive.</li>
              <li>
                Priorities can be assigned internally (based on resource requirements) or externally (by users or
                administrators).
              </li>
              <li>Can lead to starvation of low-priority processes.</li>
              <li>
                Aging can be used to prevent starvation by gradually increasing the priority of waiting processes.
              </li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example (Non-preemptive, lower number = higher priority):</p>
              <p>
                Process P1 with burst time 10 and priority 3<br />
                Process P2 with burst time 1 and priority 1<br />
                Process P3 with burst time 2 and priority 4<br />
                Process P4 with burst time 1 and priority 2<br />
              </p>
              <p className="mt-2">
                Execution order: P2 → P4 → P1 → P3
                <br />
                Average waiting time: (1 + 0 + 13 + 2) / 4 = 4 time units
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <p className="mt-4">Other scheduling algorithms include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Highest Response Ratio Next (HRRN):</strong> Non-preemptive algorithm that selects the process with
            the highest response ratio (waiting time + burst time) / burst time.
          </li>
          <li>
            <strong>Multilevel Queue Scheduling:</strong> Ready queue is divided into separate queues for different
            types of processes, each with its own scheduling algorithm.
          </li>
          <li>
            <strong>Multilevel Feedback Queue Scheduling:</strong> Processes can move between queues based on their
            behavior and CPU bursts.
          </li>
        </ul>
      </section>

      <section id="deadlock" className="mt-8">
        <h2>Deadlock</h2>
        <p>
          A deadlock is a situation where a set of processes are blocked because each process is holding a resource and
          waiting for another resource acquired by some other process.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=600&query=deadlock situation with circular wait between processes"
            alt="Deadlock Situation"
            width={600}
            height={300}
            className="rounded-md mx-auto"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 2: Deadlock situation with circular wait
          </p>
        </div>

        <p className="mt-4">Four necessary conditions for deadlock to occur (Coffman conditions):</p>
        <ol className="list-decimal pl-5 mt-2">
          <li>
            <strong>Mutual Exclusion:</strong> At least one resource must be held in a non-sharable mode.
          </li>
          <li>
            <strong>Hold and Wait:</strong> A process holding at least one resource is waiting to acquire additional
            resources held by other processes.
          </li>
          <li>
            <strong>No Preemption:</strong> Resources cannot be forcibly taken away from a process.
          </li>
          <li>
            <strong>Circular Wait:</strong> A circular chain of processes exists, where each process holds resources
            that are requested by the next process in the chain.
          </li>
        </ol>

        <p className="mt-4">
          All four conditions must be present simultaneously for a deadlock to occur. If any one of these conditions is
          not present, deadlock cannot occur.
        </p>
      </section>

      <section id="prevention" className="mt-8">
        <h2>Deadlock Prevention</h2>
        <p>
          Deadlock prevention involves ensuring that at least one of the necessary conditions for deadlock cannot hold:
        </p>

        <Card className="my-4">
          <CardContent className="p-6">
            <ul className="space-y-4">
              <li>
                <strong className="text-primary">Eliminating Mutual Exclusion:</strong> Not always possible as some
                resources are inherently non-sharable.
              </li>
              <li>
                <strong className="text-primary">Eliminating Hold and Wait:</strong> Require processes to request all
                resources at once or release all resources before requesting new ones.
              </li>
              <li>
                <strong className="text-primary">Allowing Preemption:</strong> If a process requests a resource that
                cannot be immediately allocated, all resources currently held by the process are preempted.
              </li>
              <li>
                <strong className="text-primary">Eliminating Circular Wait:</strong> Impose a total ordering of all
                resource types and require that processes request resources in increasing order of enumeration.
              </li>
            </ul>
          </CardContent>
        </Card>

        <p className="mt-4">
          Deadlock prevention methods are generally conservative and may lead to low resource utilization and reduced
          throughput. They are most suitable for systems where deadlock is catastrophic and must be avoided at all
          costs.
        </p>
      </section>

      <section id="avoidance" className="mt-8">
        <h2>Deadlock Avoidance</h2>
        <p>Deadlock avoidance requires additional information about how resources will be requested and used:</p>

        <p className="mt-4">The system must know in advance:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>The maximum number of resources of each type that a process may need</li>
          <li>The current allocation of resources to each process</li>
          <li>The maximum remaining need for each process</li>
        </ul>

        <p className="mt-4">Deadlock avoidance algorithms include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Resource Allocation Graph Algorithm:</strong> Used when there is a single instance of each resource
            type.
          </li>
          <li>
            <strong>Banker's Algorithm:</strong> Used when there are multiple instances of each resource type.
          </li>
        </ul>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=banker's algorithm example with allocation and need matrices"
            alt="Banker's Algorithm"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 3: Example of Banker's Algorithm</p>
        </div>

        <p className="mt-4">
          The Banker's Algorithm is based on the concept of a "safe state." A state is safe if the system can allocate
          resources to each process in some order and still avoid deadlock. The algorithm works by simulating the
          allocation of resources and checking if the resulting state is safe.
        </p>
      </section>

      <section id="detection" className="mt-8">
        <h2>Deadlock Detection</h2>
        <p>
          If deadlock prevention or avoidance is not used, deadlocks may occur. Deadlock detection algorithms determine
          if a deadlock has occurred:
        </p>

        <ul className="list-disc pl-5 mt-2">
          <li>Maintain a resource allocation graph or a similar data structure.</li>
          <li>Periodically invoke an algorithm to detect cycles in the graph, which indicate deadlocks.</li>
          <li>For multiple instances of each resource type, use an algorithm similar to the Banker's Algorithm.</li>
        </ul>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=600&query=resource allocation graph with deadlock"
            alt="Resource Allocation Graph with Deadlock"
            width={600}
            height={300}
            className="rounded-md mx-auto"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 4: Resource allocation graph showing a deadlock
          </p>
        </div>

        <p className="mt-4">Deadlock detection can be performed at different frequencies:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Every time a resource request is made</li>
          <li>At fixed time intervals</li>
          <li>When CPU utilization drops below a certain threshold</li>
        </ul>
      </section>

      <section id="recovery" className="mt-8">
        <h2>Recovery from Deadlock</h2>
        <p>Once a deadlock is detected, the system must recover from it. Recovery methods include:</p>

        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Process Termination:</strong>
            <ul className="list-disc pl-5 mt-2">
              <li>Abort all deadlocked processes.</li>
              <li>Abort one process at a time until the deadlock cycle is broken.</li>
            </ul>
          </li>
          <li>
            <strong>Resource Preemption:</strong>
            <ul className="list-disc pl-5 mt-2">
              <li>Select a victim process to preempt resources from.</li>
              <li>Rollback the victim process to a safe state.</li>
              <li>Ensure the victim process cannot be starved.</li>
            </ul>
          </li>
        </ul>

        <p className="mt-4">Factors to consider when selecting a victim process:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Process priority</li>
          <li>Process age</li>
          <li>Resources used so far</li>
          <li>Resources needed to complete</li>
          <li>Number of processes to be terminated</li>
        </ul>
      </section>

      <InteractiveDiagram
        title="Scheduling Algorithms"
        description="Explore different CPU scheduling algorithms and their characteristics"
        states={schedulingAlgorithms}
        initialState="fcfs"
      />

      <InteractiveDiagram
        title="Deadlock Handling Strategies"
        description="Explore different approaches to handling deadlocks in operating systems"
        states={deadlockStrategies}
        initialState="prevention"
      />

      <section id="practice" className="mt-8">
        <h2>Practice Questions</h2>
        <QuizComponent
          title="Module 3 Quiz"
          description="Test your understanding of CPU scheduling and deadlock concepts"
          questions={quizQuestions}
        />
      </section>
    </ModuleLayout>
  )
}
