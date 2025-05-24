import ModuleLayout from "@/components/module-layout"
import InteractiveDiagram from "@/components/interactive-diagram"
import QuizComponent from "@/components/quiz-component"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Module1() {
  const osTypes = [
    {
      id: "batch",
      name: "Batch Operating System",
      description:
        "Executes jobs without user interaction. Jobs are collected together in a batch and executed in sequence.",
      color: "blue",
    },
    {
      id: "interactive",
      name: "Interactive Operating System",
      description: "Provides direct communication between the user and the system with quick response time.",
      color: "green",
    },
    {
      id: "timesharing",
      name: "Time-sharing Operating System",
      description:
        "Allows multiple users to share computer resources simultaneously by rapidly switching between tasks.",
      color: "purple",
    },
    {
      id: "realtime",
      name: "Real-time Operating System",
      description:
        "Processes data and events with strict time constraints, guaranteeing response within specific time limits.",
      color: "orange",
    },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is NOT a function of an operating system?",
      options: ["Process management", "Memory management", "File management", "Application development"],
      correctAnswer: 3,
      explanation:
        "Operating systems manage processes, memory, and files, but application development is not a function of an OS. It's a separate activity performed by programmers using development tools.",
    },
    {
      id: 2,
      question: "Which type of operating system executes jobs in a predefined sequence without user interaction?",
      options: [
        "Batch operating system",
        "Time-sharing operating system",
        "Real-time operating system",
        "Interactive operating system",
      ],
      correctAnswer: 0,
      explanation:
        "Batch operating systems execute jobs in batches without user interaction. Jobs are collected together in a batch and executed in sequence.",
    },
    {
      id: 3,
      question: "What is the main difference between a microkernel and a monolithic kernel?",
      options: [
        "Microkernels are faster than monolithic kernels",
        "Monolithic kernels provide more security",
        "Microkernels run minimal services in kernel space, while monolithic kernels include all OS services in kernel space",
        "Monolithic kernels support more hardware devices",
      ],
      correctAnswer: 2,
      explanation:
        "Microkernels run only essential services in kernel space and move other services to user space, while monolithic kernels include all OS services in kernel space.",
    },
    {
      id: 4,
      question: "Which of the following is NOT a characteristic of a real-time operating system?",
      options: [
        "Guaranteed response within specific time constraints",
        "Used in time-critical applications",
        "Batch processing of jobs",
        "High reliability and predictability",
      ],
      correctAnswer: 2,
      explanation:
        "Batch processing is a characteristic of batch operating systems, not real-time operating systems. Real-time operating systems are designed to process data and events with strict time constraints.",
    },
    {
      id: 5,
      question: "What is the primary goal of multiprogramming?",
      options: [
        "To allow multiple users to share a computer system",
        "To maximize CPU utilization",
        "To provide a user-friendly interface",
        "To support multiple processors",
      ],
      correctAnswer: 1,
      explanation:
        "The primary goal of multiprogramming is to maximize CPU utilization by keeping the CPU busy as much as possible. It allows multiple programs to reside in memory simultaneously.",
    },
  ]

  return (
    <ModuleLayout
      title="Module 1: Introduction to Operating Systems"
      description="Fundamentals, classifications, and structures of operating systems"
      moduleNumber={1}
    >
      <section id="introduction">
        <h2>Introduction to Operating Systems</h2>
        <p>
          An operating system (OS) is a software that acts as an interface between computer hardware and users. It
          manages computer hardware, software resources, and provides common services for computer programs.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=operating system architecture diagram showing layers from hardware to applications"
            alt="Operating System Architecture"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 1: Layered architecture of an operating system
          </p>
        </div>

        <p>
          The operating system is the most critical piece of software that runs on a computer. It manages the computer's
          memory, processes, and all of its software and hardware. It also allows you to communicate with the computer
          without knowing how to speak the computer's language.
        </p>
      </section>

      <section id="functions" className="mt-8">
        <h2>Functions of Operating Systems</h2>
        <p>Operating systems perform several critical functions to manage computer resources efficiently:</p>

        <Card className="my-4">
          <CardContent className="p-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex flex-col">
                <strong className="text-primary">Process Management</strong>
                <span>Creating, scheduling, and terminating processes</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Memory Management</strong>
                <span>Allocating and deallocating memory space</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">File Management</strong>
                <span>Creating, deleting, and organizing files and directories</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">I/O Management</strong>
                <span>Managing input/output operations and devices</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Security Management</strong>
                <span>Protecting system resources and user data</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Networking</strong>
                <span>Facilitating communication between connected computers</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Error Detection</strong>
                <span>Identifying and handling hardware and software errors</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Resource Allocation</strong>
                <span>Distributing resources among competing processes</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <p>
          These functions work together to create an efficient computing environment. For example, when you open an
          application, the OS allocates memory for it (memory management), creates a process for it (process
          management), handles any file operations it performs (file management), and manages its interactions with
          hardware devices (I/O management).
        </p>
      </section>

      <section id="classification" className="mt-8">
        <h2>Classification of Operating Systems</h2>
        <p>
          Operating systems can be classified based on various criteria such as processing capabilities, user interface,
          and resource management techniques.
        </p>

        <Tabs defaultValue="batch" className="my-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="batch">Batch</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
            <TabsTrigger value="timesharing">Time Sharing</TabsTrigger>
            <TabsTrigger value="realtime">Real Time</TabsTrigger>
          </TabsList>
          <TabsContent value="batch" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Batch Operating Systems</h3>
            <p className="mb-2">
              Batch operating systems execute jobs without user interaction. Jobs are collected together in a batch and
              executed in sequence.
            </p>
            <h4 className="font-medium mt-4">Characteristics:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>No direct interaction between user and computer</li>
              <li>Similar jobs are grouped together</li>
              <li>Jobs are processed in the order of submission</li>
              <li>Efficient processor utilization</li>
            </ul>
            <h4 className="font-medium mt-4">Examples:</h4>
            <p>IBM's OS/360, early UNIX systems</p>
          </TabsContent>
          <TabsContent value="interactive" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Interactive Operating Systems</h3>
            <p className="mb-2">
              Interactive operating systems provide direct communication between the user and the system.
            </p>
            <h4 className="font-medium mt-4">Characteristics:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>Direct user interaction with the computer</li>
              <li>Quick response time</li>
              <li>User-friendly interfaces</li>
              <li>Support for multiple users</li>
            </ul>
            <h4 className="font-medium mt-4">Examples:</h4>
            <p>Windows, macOS, most modern desktop operating systems</p>
          </TabsContent>
          <TabsContent value="timesharing" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Time Sharing Operating Systems</h3>
            <p className="mb-2">
              Time sharing systems allow multiple users to share computer resources simultaneously by rapidly switching
              between tasks.
            </p>
            <h4 className="font-medium mt-4">Characteristics:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>CPU time is shared among multiple users</li>
              <li>Each user gets a small portion of CPU time</li>
              <li>Quick response time</li>
              <li>Efficient resource utilization</li>
            </ul>
            <h4 className="font-medium mt-4">Examples:</h4>
            <p>UNIX, Linux, early versions of Windows NT</p>
          </TabsContent>
          <TabsContent value="realtime" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Real-Time Operating Systems</h3>
            <p className="mb-2">
              Real-time operating systems are designed to process data and events that have strict time constraints.
            </p>
            <h4 className="font-medium mt-4">Characteristics:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>Guaranteed response within specific time constraints</li>
              <li>Used in time-critical applications</li>
              <li>High reliability and predictability</li>
              <li>Often embedded in specialized hardware</li>
            </ul>
            <h4 className="font-medium mt-4">Examples:</h4>
            <p>VxWorks, QNX, RTLinux, systems used in aircraft control, medical devices</p>
          </TabsContent>
        </Tabs>

        <p>Other classifications include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Multiprocessor Systems:</strong> Operating systems that can utilize multiple processors for parallel
            computing.
          </li>
          <li>
            <strong>Multiuser Systems:</strong> Systems that allow multiple users to access the computer simultaneously.
          </li>
          <li>
            <strong>Multithreaded Systems:</strong> Systems that support multiple threads of execution within a single
            process.
          </li>
        </ul>
      </section>

      <section id="structure" className="mt-8">
        <h2>Operating System Structure</h2>
        <p>
          The structure of an operating system refers to how its various components are organized and interact with each
          other.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=operating system structure showing kernel, system calls, and user applications"
            alt="Operating System Structure"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 2: General structure of an operating system
          </p>
        </div>

        <p>
          Modern operating systems typically employ a layered approach, where each layer provides specific functions and
          services to the layers above it. This modular design makes the system more maintainable and easier to extend.
        </p>
      </section>

      <section id="components" className="mt-8">
        <h2>System Components</h2>
        <p>An operating system consists of several key components that work together to manage system resources:</p>

        <Card className="my-4">
          <CardContent className="p-6">
            <ul className="space-y-4">
              <li>
                <strong className="text-primary">Process Manager:</strong> Creates, schedules, and terminates processes.
              </li>
              <li>
                <strong className="text-primary">Memory Manager:</strong> Allocates and deallocates memory space to
                processes.
              </li>
              <li>
                <strong className="text-primary">File Manager:</strong> Manages files and directories, providing access
                to storage devices.
              </li>
              <li>
                <strong className="text-primary">I/O Manager:</strong> Controls input/output operations and manages
                device drivers.
              </li>
              <li>
                <strong className="text-primary">Network Manager:</strong> Handles network communications and protocols.
              </li>
              <li>
                <strong className="text-primary">Security Manager:</strong> Implements security policies and protects
                system resources.
              </li>
              <li>
                <strong className="text-primary">User Interface:</strong> Provides means for users to interact with the
                system (CLI, GUI).
              </li>
            </ul>
          </CardContent>
        </Card>

        <p>
          These components interact with each other through well-defined interfaces. For example, when a process needs
          to read from a file, the Process Manager communicates with the File Manager to retrieve the data, and the
          Memory Manager allocates space to store the retrieved data.
        </p>
      </section>

      <section id="services" className="mt-8">
        <h2>Operating System Services</h2>
        <p>Operating systems provide various services to facilitate efficient use of computer resources:</p>

        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Program Execution:</strong> Loading programs into memory and executing them.
          </li>
          <li>
            <strong>I/O Operations:</strong> Managing input/output operations for programs.
          </li>
          <li>
            <strong>File System Manipulation:</strong> Creating, deleting, and accessing files.
          </li>
          <li>
            <strong>Communication:</strong> Facilitating information exchange between processes.
          </li>
          <li>
            <strong>Error Detection:</strong> Detecting and handling hardware and software errors.
          </li>
          <li>
            <strong>Resource Allocation:</strong> Allocating resources to processes as needed.
          </li>
          <li>
            <strong>Accounting:</strong> Tracking resource usage by users and processes.
          </li>
          <li>
            <strong>Protection:</strong> Ensuring that all access to system resources is controlled.
          </li>
        </ul>

        <p className="mt-4">
          These services are typically accessed through system calls, which are the programming interface to the
          services provided by the operating system. System calls allow user-level programs to request services from the
          operating system.
        </p>
      </section>

      <section id="kernels" className="mt-8">
        <h2>Kernels</h2>
        <p>
          The kernel is the core component of an operating system that manages system resources and provides an
          interface for user-level interactions.
        </p>

        <Tabs defaultValue="monolithic" className="my-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="monolithic">Monolithic Kernels</TabsTrigger>
            <TabsTrigger value="microkernel">Microkernels</TabsTrigger>
          </TabsList>
          <TabsContent value="monolithic" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Monolithic Kernels</h3>
            <p className="mb-2">
              In a monolithic kernel architecture, all operating system services run in kernel space.
            </p>
            <h4 className="font-medium mt-4">Characteristics:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>All OS services run in kernel mode</li>
              <li>Direct communication between components</li>
              <li>Better performance due to fewer context switches</li>
              <li>Larger code base in kernel space</li>
              <li>System crashes if any kernel component fails</li>
            </ul>
            <h4 className="font-medium mt-4">Examples:</h4>
            <p>Linux, traditional UNIX systems</p>
          </TabsContent>
          <TabsContent value="microkernel" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Microkernels</h3>
            <p className="mb-2">
              Microkernels provide minimal services in kernel space, with most OS services running in user space.
            </p>
            <h4 className="font-medium mt-4">Characteristics:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>Minimal functionality in kernel space</li>
              <li>Most services run as user processes</li>
              <li>Communication through message passing</li>
              <li>Better stability and security</li>
              <li>Easier to extend and maintain</li>
              <li>Potentially slower due to more context switches</li>
            </ul>
            <h4 className="font-medium mt-4">Examples:</h4>
            <p>QNX, MINIX, macOS (hybrid design with microkernel elements)</p>
          </TabsContent>
        </Tabs>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=comparison between monolithic kernel and microkernel architectures"
            alt="Kernel Architectures Comparison"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 3: Comparison between monolithic kernel and microkernel architectures
          </p>
        </div>

        <p>
          There are also hybrid kernel designs that combine features of both monolithic and microkernels. For example,
          Windows NT has a hybrid kernel that includes aspects of both designs, with some services running in kernel
          space and others in user space.
        </p>
      </section>

      <InteractiveDiagram
        title="Types of Operating Systems"
        description="Explore the different types of operating systems and their characteristics"
        states={osTypes}
        initialState="batch"
      />

      <section id="practice" className="mt-8">
        <h2>Practice Questions</h2>
        <QuizComponent
          title="Module 1 Quiz"
          description="Test your understanding of operating system fundamentals"
          questions={quizQuestions}
        />
      </section>
    </ModuleLayout>
  )
}
