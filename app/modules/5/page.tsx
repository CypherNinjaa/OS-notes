import ModuleLayout from "@/components/module-layout"
import InteractiveDiagram from "@/components/interactive-diagram"
import QuizComponent from "@/components/quiz-component"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Module5() {
  const fileAllocationMethods = [
    {
      id: "contiguous",
      name: "Contiguous Allocation",
      description: "Files are stored as contiguous blocks on disk. Simple but leads to fragmentation over time.",
      color: "blue",
    },
    {
      id: "linked",
      name: "Linked Allocation",
      description:
        "Each file block contains a pointer to the next block. Eliminates external fragmentation but has overhead for pointers.",
      color: "green",
    },
    {
      id: "indexed",
      name: "Indexed Allocation",
      description:
        "All pointers to blocks are stored in an index block. Supports direct access and eliminates external fragmentation.",
      color: "purple",
    },
  ]

  const directoryStructures = [
    {
      id: "single",
      name: "Single-Level Directory",
      description: "All files are contained in the same directory. Simple but limited in organization capabilities.",
      color: "blue",
    },
    {
      id: "two-level",
      name: "Two-Level Directory",
      description: "Each user has their own user file directory (UFD). Provides better organization and privacy.",
      color: "green",
    },
    {
      id: "tree",
      name: "Tree-Structured Directory",
      description:
        "Directories can have subdirectories, forming a tree structure. Allows for efficient organization of files.",
      color: "purple",
    },
    {
      id: "acyclic",
      name: "Acyclic-Graph Directory",
      description: "Allows sharing of files/directories. A file can appear in multiple directories through links.",
      color: "orange",
    },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "Which file allocation method is best suited for sequential access files?",
      options: ["Contiguous allocation", "Linked allocation", "Indexed allocation", "All methods are equally suitable"],
      correctAnswer: 0,
      explanation:
        "Contiguous allocation is best for sequential access files because it stores all blocks of a file together, allowing for efficient sequential reading and writing without seeking between blocks.",
    },
    {
      id: 2,
      question: "What is the main disadvantage of linked allocation?",
      options: [
        "It requires more disk space",
        "It cannot support random access efficiently",
        "It leads to external fragmentation",
        "It is difficult to implement",
      ],
      correctAnswer: 1,
      explanation:
        "The main disadvantage of linked allocation is that it cannot support random access efficiently. To access the nth block, the system must follow the chain of pointers from the beginning, which is time-consuming for large files.",
    },
    {
      id: 3,
      question: "Which directory structure allows a file to appear in multiple directories?",
      options: [
        "Single-level directory",
        "Two-level directory",
        "Tree-structured directory",
        "Acyclic-graph directory",
      ],
      correctAnswer: 3,
      explanation:
        "An acyclic-graph directory structure allows a file to appear in multiple directories through the use of links or shortcuts, enabling file sharing between users and applications.",
    },
    {
      id: 4,
      question: "What is the purpose of a file control block (FCB)?",
      options: [
        "To store the actual contents of a file",
        "To maintain information about a file such as permissions, size, and location",
        "To control access to the file system",
        "To implement file allocation methods",
      ],
      correctAnswer: 1,
      explanation:
        "A file control block (FCB) is a data structure that contains information about a file, including its permissions, size, location on disk, creation date, and other metadata. It's used by the operating system to manage files.",
    },
    {
      id: 5,
      question: "Which of the following is NOT a common file access method?",
      options: ["Sequential access", "Direct access", "Indexed access", "Parallel access"],
      correctAnswer: 3,
      explanation:
        "Parallel access is not a common file access method. The common methods are sequential access (reading/writing records in order), direct access (random access to any block), and indexed access (using an index to locate records).",
    },
  ]

  return (
    <ModuleLayout
      title="Module 5: File and Device Management"
      description="File systems, allocation methods, I/O devices, and directory structures"
      moduleNumber={5}
    >
      <section id="file-types">
        <h2>Types of Files</h2>
        <p>
          Files are collections of related information stored on secondary storage. They can be classified into various
          types based on their content and structure:
        </p>

        <Card className="my-4">
          <CardContent className="p-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex flex-col">
                <strong className="text-primary">Ordinary/Regular Files</strong>
                <span>Contains user information (text, programs, etc.)</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Directory Files</strong>
                <span>Contains information about other files in the system</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Special Files</strong>
                <span>Represents devices in UNIX-like systems</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Text Files</strong>
                <span>Contains readable characters</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Binary Files</strong>
                <span>Contains data in binary format (executables, images, etc.)</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Source Files</strong>
                <span>Contains program source code</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Object Files</strong>
                <span>Contains compiled but unlinked program code</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Executable Files</strong>
                <span>Contains ready-to-run programs</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <p className="mt-4">Files have various attributes that describe and identify them:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Name:</strong> Human-readable identifier for the file
          </li>
          <li>
            <strong>Type:</strong> Needed for systems that support different types
          </li>
          <li>
            <strong>Location:</strong> Pointer to the file location on device
          </li>
          <li>
            <strong>Size:</strong> Current size of the file
          </li>
          <li>
            <strong>Protection:</strong> Controls who can read, write, or execute
          </li>
          <li>
            <strong>Time, date, and user identification:</strong> For protection, security, and usage monitoring
          </li>
        </ul>
      </section>

      <section id="access-methods" className="mt-8">
        <h2>File Access Methods</h2>
        <p>File access methods define how records in a file can be accessed:</p>

        <Tabs defaultValue="sequential" className="my-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="sequential">Sequential Access</TabsTrigger>
            <TabsTrigger value="direct">Direct Access</TabsTrigger>
            <TabsTrigger value="indexed">Indexed Access</TabsTrigger>
          </TabsList>
          <TabsContent value="sequential" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Sequential Access</h3>
            <p className="mb-2">Information in the file is processed in order, one record after another:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Most common access method for tape-based systems.</li>
              <li>Simple to implement.</li>
              <li>Read operations proceed from the current position.</li>
              <li>Write operations append to the end of the file.</li>
              <li>Rewind operation resets the current position to the beginning.</li>
              <li>Inefficient for applications requiring random access.</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=200&width=600&query=sequential file access showing records accessed in order"
                alt="Sequential File Access"
                width={600}
                height={200}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="direct" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Direct Access</h3>
            <p className="mb-2">Also known as random access, allows reading/writing records in any order:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Common for disk-based systems.</li>
              <li>File is viewed as a numbered sequence of blocks or records.</li>
              <li>Read or write operations can be performed on any block.</li>
              <li>Supports applications that need to access records in arbitrary order.</li>
              <li>Requires additional mechanisms to locate records.</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=200&width=600&query=direct file access showing random access to records"
                alt="Direct File Access"
                width={600}
                height={200}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="indexed" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Indexed Access</h3>
            <p className="mb-2">Uses an index to locate records in a file:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>An index is built for the file, containing pointers to blocks.</li>
              <li>To find a record, first search the index, then use the pointer to access the record directly.</li>
              <li>Provides fast access to records in large files.</li>
              <li>Requires additional space for the index.</li>
              <li>Index must be updated when the file is modified.</li>
            </ul>
            <div className="my-4">
              <Image
                src="/placeholder.svg?height=250&width=600&query=indexed file access showing index and data records"
                alt="Indexed File Access"
                width={600}
                height={250}
                className="rounded-md mx-auto"
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section id="allocation-methods" className="mt-8">
        <h2>File Allocation Methods</h2>
        <p>File allocation methods determine how file blocks are physically arranged on disk:</p>

        <InteractiveDiagram
          title="File Allocation Methods"
          description="Explore different methods for allocating file blocks on disk"
          states={fileAllocationMethods}
          initialState="contiguous"
        />
      </section>

      <section id="contiguous" className="mt-8">
        <h2>Contiguous Allocation</h2>
        <p>In contiguous allocation, each file occupies a set of contiguous blocks on disk:</p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=contiguous file allocation showing files stored in contiguous blocks"
            alt="Contiguous File Allocation"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 1: Contiguous file allocation</p>
        </div>

        <p className="mt-4">Advantages of contiguous allocation:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Simple to implement:</strong> Only the starting block location and length are needed.
          </li>
          <li>
            <strong>Excellent read performance:</strong> Supports both sequential and direct access.
          </li>
          <li>
            <strong>Minimal disk seek time:</strong> All blocks are adjacent.
          </li>
        </ul>

        <p className="mt-4">Disadvantages of contiguous allocation:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>External fragmentation:</strong> As files are created and deleted, free space becomes fragmented.
          </li>
          <li>
            <strong>File growth problem:</strong> Difficult to extend files as they may not have free space after them.
          </li>
          <li>
            <strong>Need for compaction:</strong> To reclaim fragmented space, which is time-consuming.
          </li>
        </ul>
      </section>

      <section id="linked" className="mt-8">
        <h2>Linked Allocation</h2>
        <p>In linked allocation, each file is a linked list of disk blocks that can be scattered anywhere on disk:</p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=linked file allocation showing blocks linked with pointers"
            alt="Linked File Allocation"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 2: Linked file allocation</p>
        </div>

        <p className="mt-4">Advantages of linked allocation:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>No external fragmentation:</strong> Any free block can be used.
          </li>
          <li>
            <strong>Easy file growth:</strong> New blocks can be allocated from anywhere on disk.
          </li>
          <li>
            <strong>No need for compaction:</strong> Free space is managed efficiently.
          </li>
        </ul>

        <p className="mt-4">Disadvantages of linked allocation:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Poor direct access performance:</strong> To access the nth block, must follow the chain from the
            beginning.
          </li>
          <li>
            <strong>Space overhead:</strong> Each block needs space for a pointer.
          </li>
          <li>
            <strong>Reliability issues:</strong> If a pointer is lost or damaged, the rest of the file becomes
            inaccessible.
          </li>
        </ul>

        <p className="mt-4">
          A variation of linked allocation is the File Allocation Table (FAT), used in MS-DOS and early Windows:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>All pointers are stored in a table at the beginning of the disk.</li>
          <li>Each entry corresponds to a disk block and contains the number of the next block in the file.</li>
          <li>Improves random access performance as the entire FAT can be cached in memory.</li>
        </ul>
      </section>

      <section id="index" className="mt-8">
        <h2>Indexed Allocation</h2>
        <p>Indexed allocation brings all pointers together into one location called the index block:</p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=indexed file allocation showing index block pointing to file blocks"
            alt="Indexed File Allocation"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 3: Indexed file allocation</p>
        </div>

        <p className="mt-4">Advantages of indexed allocation:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Supports direct access:</strong> Can find the ith block directly using the index.
          </li>
          <li>
            <strong>No external fragmentation:</strong> Any free block can be used.
          </li>
          <li>
            <strong>Easy file growth:</strong> Just add new block pointers to the index.
          </li>
        </ul>

        <p className="mt-4">Disadvantages of indexed allocation:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Space overhead:</strong> Index block takes up space.
          </li>
          <li>
            <strong>Index size limitation:</strong> The index block has a fixed size, limiting the maximum file size.
          </li>
          <li>
            <strong>Additional disk I/O:</strong> Need to read the index block first, then the data block.
          </li>
        </ul>

        <p className="mt-4">To overcome the file size limitation, several approaches can be used:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Linked scheme:</strong> Link multiple index blocks together.
          </li>
          <li>
            <strong>Multilevel index:</strong> Use a first-level index that points to second-level index blocks.
          </li>
          <li>
            <strong>Combined scheme:</strong> Use direct blocks for small files and indirect blocks for large files (as
            in UNIX).
          </li>
        </ul>
      </section>

      <section id="io-devices" className="mt-8">
        <h2>I/O Devices</h2>
        <p>
          I/O (Input/Output) devices are hardware components that allow a computer to receive input from the outside
          world or send output to it:
        </p>

        <Card className="my-4">
          <CardContent className="p-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex flex-col">
                <strong className="text-primary">Block Devices</strong>
                <span>Store information in fixed-size blocks, each with its own address (e.g., disk drives)</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Character Devices</strong>
                <span>Deliver or accept a stream of characters (e.g., keyboards, printers)</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Network Devices</strong>
                <span>Allow communication with other systems (e.g., network interface cards)</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Clock and Timer Devices</strong>
                <span>Provide timing services and interrupts</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <p className="mt-4">
          I/O devices vary widely in their behavior, data rates, and application. The operating system must provide a
          consistent interface to these diverse devices.
        </p>
      </section>

      <section id="controllers" className="mt-8">
        <h2>Device Controllers</h2>
        <p>
          Device controllers are hardware components that serve as an interface between the device and the operating
          system:
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=device controller architecture showing connection between CPU and I/O devices"
            alt="Device Controller Architecture"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 4: Device controller architecture</p>
        </div>

        <p className="mt-4">Functions of device controllers:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Convert serial bit stream to block of bytes:</strong> Assemble/disassemble data for transmission.
          </li>
          <li>
            <strong>Perform error detection and correction:</strong> Ensure data integrity.
          </li>
          <li>
            <strong>Manage data transfer between device and main memory:</strong> Using DMA or programmed I/O.
          </li>
          <li>
            <strong>Buffer data:</strong> Temporarily store data to handle speed mismatches.
          </li>
          <li>
            <strong>Provide status information:</strong> Report device state to the CPU.
          </li>
        </ul>

        <p className="mt-4">Communication between the CPU and device controllers occurs through:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>I/O ports:</strong> Special addresses that the CPU can read from or write to.
          </li>
          <li>
            <strong>Device registers:</strong> Control, status, and data registers within the controller.
          </li>
          <li>
            <strong>Interrupts:</strong> Signals from the controller to the CPU when an operation is complete.
          </li>
        </ul>
      </section>

      <section id="drivers" className="mt-8">
        <h2>Device Drivers</h2>
        <p>
          Device drivers are software components that provide an interface between the operating system and specific
          hardware devices:
        </p>

        <p className="mt-4">Functions of device drivers:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Accept abstract I/O requests:</strong> From the operating system or applications.
          </li>
          <li>
            <strong>Translate requests:</strong> Into specific hardware commands for the device controller.
          </li>
          <li>
            <strong>Initialize the device:</strong> Set up the device when the system boots.
          </li>
          <li>
            <strong>Handle interrupts:</strong> Process signals from the device.
          </li>
          <li>
            <strong>Provide error handling:</strong> Detect and recover from device errors.
          </li>
        </ul>

        <p className="mt-4">
          Device drivers are typically part of the operating system kernel, but they can also be loaded dynamically as
          modules. This allows new devices to be added to the system without modifying the core operating system.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=device driver architecture showing layers from application to hardware"
            alt="Device Driver Architecture"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 5: Device driver architecture</p>
        </div>
      </section>

      <section id="directory" className="mt-8">
        <h2>Directory Structure</h2>
        <p>Directory structures organize files on disk and provide features like file naming, location, and access:</p>

        <InteractiveDiagram
          title="Directory Structures"
          description="Explore different directory structures used in file systems"
          states={directoryStructures}
          initialState="single"
        />

        <p className="mt-4">Operations performed on directories include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Search for a file:</strong> Find a file in the directory.
          </li>
          <li>
            <strong>Create a file:</strong> Add a new file to the directory.
          </li>
          <li>
            <strong>Delete a file:</strong> Remove a file from the directory.
          </li>
          <li>
            <strong>List a directory:</strong> List all files in the directory.
          </li>
          <li>
            <strong>Rename a file:</strong> Change the name of a file.
          </li>
          <li>
            <strong>Traverse the file system:</strong> Access every directory and file in the system.
          </li>
        </ul>
      </section>

      <section id="protection" className="mt-8">
        <h2>File Protection</h2>
        <p>File protection mechanisms control who can access files and what operations they can perform:</p>

        <Tabs defaultValue="access-control" className="my-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="access-control">Access Control</TabsTrigger>
            <TabsTrigger value="user-groups">User/Group/Other</TabsTrigger>
            <TabsTrigger value="acl">Access Control Lists</TabsTrigger>
          </TabsList>
          <TabsContent value="access-control" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Access Control Matrix</h3>
            <p className="mb-2">A table that specifies the access rights of each user for each file:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Rows represent users, columns represent files.</li>
              <li>Each entry specifies the access rights (read, write, execute, etc.).</li>
              <li>Comprehensive but can be large and sparse.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example:</p>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left">User/File</th>
                    <th className="text-left">File1</th>
                    <th className="text-left">File2</th>
                    <th className="text-left">File3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>User1</td>
                    <td>read, write</td>
                    <td>read</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>User2</td>
                    <td>read</td>
                    <td>read, write</td>
                    <td>read, write, execute</td>
                  </tr>
                  <tr>
                    <td>User3</td>
                    <td>-</td>
                    <td>read</td>
                    <td>read</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="user-groups" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">User/Group/Other (UNIX-style)</h3>
            <p className="mb-2">Files have separate permissions for the owner, group, and others:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Each file has an owner and is associated with a group.</li>
              <li>Three sets of permissions: owner, group, and others.</li>
              <li>Each set can have read (r), write (w), and execute (x) permissions.</li>
              <li>Simple and efficient to implement.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example:</p>
              <p className="font-mono">-rwxr-x--x 1 user1 group1 4096 Jan 1 12:00 file.txt</p>
              <p className="mt-2">
                This means:
                <br />- Owner (user1) has read, write, and execute permissions
                <br />- Group (group1) has read and execute permissions
                <br />- Others have only execute permission
              </p>
            </div>
          </TabsContent>
          <TabsContent value="acl" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Access Control Lists (ACLs)</h3>
            <p className="mb-2">A more flexible approach that specifies access rights for each user or group:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Each file has a list of users/groups and their permissions.</li>
              <li>Allows fine-grained control over file access.</li>
              <li>More complex to implement and manage.</li>
              <li>Supported by many modern file systems (NTFS, ext4, etc.).</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Example:</p>
              <p>
                file.txt:
                <br />
                user1: read, write, execute
                <br />
                user2: read
                <br />
                group1: read, execute
                <br />
                user3: write
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <p className="mt-4">Other protection mechanisms include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Password protection:</strong> Require a password to access a file.
          </li>
          <li>
            <strong>Encryption:</strong> Encrypt file contents to prevent unauthorized access.
          </li>
          <li>
            <strong>Capability-based systems:</strong> Use unforgeable tokens (capabilities) that grant specific access
            rights.
          </li>
        </ul>
      </section>

      <section id="practice" className="mt-8">
        <h2>Practice Questions</h2>
        <QuizComponent
          title="Module 5 Quiz"
          description="Test your understanding of file and device management concepts"
          questions={quizQuestions}
        />
      </section>
    </ModuleLayout>
  )
}
