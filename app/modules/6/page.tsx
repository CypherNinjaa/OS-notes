import ModuleLayout from "@/components/module-layout"
import InteractiveDiagram from "@/components/interactive-diagram"
import QuizComponent from "@/components/quiz-component"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Module6() {
  const shellTypes = [
    {
      id: "bash",
      name: "Bash (Bourne Again Shell)",
      description:
        "The most common shell in Linux systems. It's an enhanced version of the original Bourne Shell with additional features.",
      color: "blue",
    },
    {
      id: "csh",
      name: "C Shell (csh)",
      description: "Features C-like syntax and additional features like command history and job control.",
      color: "green",
    },
    {
      id: "ksh",
      name: "Korn Shell (ksh)",
      description: "Combines features from both Bourne Shell and C Shell, with additional scripting capabilities.",
      color: "purple",
    },
    {
      id: "zsh",
      name: "Z Shell (zsh)",
      description:
        "Extended Bourne Shell with numerous improvements, including better completion and scripting features.",
      color: "orange",
    },
  ]

  const shellScriptingConcepts = [
    {
      id: "variables",
      name: "Variables",
      description:
        "Store and manipulate data in shell scripts. Can be assigned values and referenced using the $ symbol.",
      color: "blue",
    },
    {
      id: "control",
      name: "Control Structures",
      description:
        "Include conditionals (if-else, case) and loops (for, while, until) to control the flow of execution.",
      color: "green",
    },
    {
      id: "functions",
      name: "Functions",
      description: "Reusable blocks of code that can be called with parameters and return values.",
      color: "purple",
    },
    {
      id: "io",
      name: "Input/Output",
      description: "Mechanisms for reading input and producing output, including redirection and pipes.",
      color: "orange",
    },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "Which shell is the default in most Linux distributions?",
      options: ["C Shell (csh)", "Korn Shell (ksh)", "Bash (Bourne Again Shell)", "Z Shell (zsh)"],
      correctAnswer: 2,
      explanation:
        "Bash (Bourne Again Shell) is the default shell in most Linux distributions. It's an enhanced version of the original Bourne Shell with additional features like command history, command-line editing, and more.",
    },
    {
      id: 2,
      question: "What is the correct way to assign a value to a variable in a shell script?",
      options: ["variable = value", "variable=value", "$variable = value", "set variable = value"],
      correctAnswer: 1,
      explanation:
        "In shell scripting, variables are assigned using the syntax 'variable=value' without any spaces around the equals sign. Spaces would make the shell interpret 'variable' as a command.",
    },
    {
      id: 3,
      question: "Which command is used to make a shell script executable?",
      options: ["exec script.sh", "run script.sh", "chmod +x script.sh", "executable script.sh"],
      correctAnswer: 2,
      explanation:
        "The chmod +x command is used to add execute permission to a file, making a shell script executable. After this, the script can be run directly using ./script.sh.",
    },
    {
      id: 4,
      question: "What does the '#!' (shebang) at the beginning of a shell script do?",
      options: [
        "It's a comment and has no effect on execution",
        "It specifies which interpreter should be used to execute the script",
        "It marks the file as executable",
        "It includes another script file",
      ],
      correctAnswer: 1,
      explanation:
        "The '#!' (shebang) at the beginning of a script specifies the interpreter that should be used to execute the script, such as #!/bin/bash for Bash scripts or #!/bin/python for Python scripts.",
    },
    {
      id: 5,
      question: "Which of the following is NOT a valid loop construct in Bash?",
      options: ["for loop", "while loop", "until loop", "foreach loop"],
      correctAnswer: 3,
      explanation:
        "The 'foreach' loop is not a valid construct in Bash. Bash supports 'for', 'while', and 'until' loops. The 'foreach' loop is found in some other shells like csh and in programming languages like Perl.",
    },
  ]

  return (
    <ModuleLayout
      title="Module 6: Shell Introduction and Shell Scripting"
      description="Linux shell basics, scripting, variables, and utility programs"
      moduleNumber={6}
    >
      <section id="shell-intro">
        <h2>Shell Introduction</h2>
        <p>
          A shell is a command-line interpreter that provides a user interface for the operating system. It takes
          commands from the user and executes them, acting as an intermediary between the user and the kernel.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=shell as interface between user and kernel"
            alt="Shell as Interface"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 1: Shell as an interface between the user and the kernel
          </p>
        </div>

        <p className="mt-4">Functions of a shell:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Command interpretation:</strong> Parse and execute user commands.
          </li>
          <li>
            <strong>Program execution:</strong> Launch programs and manage their execution.
          </li>
          <li>
            <strong>Input/output redirection:</strong> Redirect standard input, output, and error streams.
          </li>
          <li>
            <strong>Pipeline creation:</strong> Connect the output of one command to the input of another.
          </li>
          <li>
            <strong>Environment management:</strong> Maintain environment variables and settings.
          </li>
          <li>
            <strong>Scripting:</strong> Execute scripts containing sequences of commands.
          </li>
        </ul>
      </section>

      <section id="shell-types" className="mt-8">
        <h2>Types of Shell</h2>
        <p>There are several types of shells available in Unix/Linux systems, each with its own features and syntax:</p>

        <InteractiveDiagram
          title="Types of Shell"
          description="Explore different types of shells available in Unix/Linux systems"
          states={shellTypes}
          initialState="bash"
        />

        <p className="mt-4">Each shell has its own strengths and is suited for different tasks:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Bourne Shell (sh):</strong> The original Unix shell, known for its simplicity and portability.
          </li>
          <li>
            <strong>Bash:</strong> Adds features like command history, command-line editing, and tab completion.
          </li>
          <li>
            <strong>C Shell:</strong> Offers C-like syntax and features like aliases and job control.
          </li>
          <li>
            <strong>Korn Shell:</strong> Combines features from both Bourne and C shells with enhanced scripting
            capabilities.
          </li>
          <li>
            <strong>Z Shell:</strong> Highly customizable with advanced features like improved tab completion and
            theming.
          </li>
        </ul>
      </section>

      <section id="editors" className="mt-8">
        <h2>Linux Editors</h2>
        <p>Text editors are essential tools for creating and modifying files, including shell scripts:</p>

        <Tabs defaultValue="vi" className="my-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="vi">VI/VIM</TabsTrigger>
            <TabsTrigger value="emacs">Emacs</TabsTrigger>
            <TabsTrigger value="nano">Nano</TabsTrigger>
          </TabsList>
          <TabsContent value="vi" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">VI/VIM</h3>
            <p className="mb-2">
              VI (Visual Editor) and its improved version VIM (VI Improved) are powerful text editors:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Available on virtually all Unix/Linux systems.</li>
              <li>Modal editor with separate modes for inserting text and executing commands.</li>
              <li>Highly efficient once mastered, but has a steep learning curve.</li>
              <li>Extremely customizable and extensible.</li>
              <li>Requires minimal resources and works well over slow connections.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Common VI Commands:</p>
              <ul className="list-disc pl-5">
                <li>
                  <code>i</code> - Enter insert mode
                </li>
                <li>
                  <code>Esc</code> - Return to command mode
                </li>
                <li>
                  <code>:w</code> - Save file
                </li>
                <li>
                  <code>:q</code> - Quit
                </li>
                <li>
                  <code>:wq</code> - Save and quit
                </li>
                <li>
                  <code>dd</code> - Delete line
                </li>
                <li>
                  <code>yy</code> - Copy line
                </li>
                <li>
                  <code>p</code> - Paste
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="emacs" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Emacs</h3>
            <p className="mb-2">Emacs is a highly extensible text editor:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Known for its extensibility and customization options.</li>
              <li>Uses key combinations (often involving Ctrl and Alt) rather than modes.</li>
              <li>Includes a wide range of built-in functionality beyond text editing.</li>
              <li>Can be extended using Emacs Lisp.</li>
              <li>Has a learning curve but provides extensive documentation.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Common Emacs Commands:</p>
              <ul className="list-disc pl-5">
                <li>
                  <code>Ctrl+x Ctrl+s</code> - Save file
                </li>
                <li>
                  <code>Ctrl+x Ctrl+c</code> - Exit Emacs
                </li>
                <li>
                  <code>Ctrl+k</code> - Kill (cut) line
                </li>
                <li>
                  <code>Ctrl+y</code> - Yank (paste)
                </li>
                <li>
                  <code>Ctrl+_</code> - Undo
                </li>
                <li>
                  <code>Ctrl+s</code> - Search forward
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="nano" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Nano</h3>
            <p className="mb-2">Nano is a simple, user-friendly text editor:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Designed to be easy to use, especially for beginners.</li>
              <li>Commands are displayed at the bottom of the screen.</li>
              <li>No modes to switch between.</li>
              <li>Limited functionality compared to VI or Emacs.</li>
              <li>Included in most Linux distributions.</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="font-medium mb-2">Common Nano Commands:</p>
              <ul className="list-disc pl-5">
                <li>
                  <code>Ctrl+o</code> - Save file
                </li>
                <li>
                  <code>Ctrl+x</code> - Exit
                </li>
                <li>
                  <code>Ctrl+k</code> - Cut line
                </li>
                <li>
                  <code>Ctrl+u</code> - Paste
                </li>
                <li>
                  <code>Ctrl+w</code> - Search
                </li>
                <li>
                  <code>Ctrl+g</code> - Help
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section id="vi-modes" className="mt-8">
        <h2>VI Editor Modes</h2>
        <p>VI is a modal editor, meaning it operates in different modes:</p>

        <Card className="my-4">
          <CardContent className="p-6">
            <ul className="space-y-4">
              <li>
                <strong className="text-primary">Command Mode:</strong> The default mode where commands are entered to
                manipulate text.
              </li>
              <li>
                <strong className="text-primary">Insert Mode:</strong> Mode for inserting and editing text.
              </li>
              <li>
                <strong className="text-primary">Ex Mode:</strong> For entering extended commands, accessed with ':'.
              </li>
              <li>
                <strong className="text-primary">Visual Mode:</strong> For selecting blocks of text (in VIM).
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=300&width=800&query=vi editor modes and transitions between them"
            alt="VI Editor Modes"
            width={800}
            height={300}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">
            Figure 2: VI editor modes and transitions between them
          </p>
        </div>

        <p className="mt-4">Switching between modes:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Command to Insert:</strong> Press 'i' (insert), 'a' (append), 'o' (open new line), etc.
          </li>
          <li>
            <strong>Insert to Command:</strong> Press 'Esc'.
          </li>
          <li>
            <strong>Command to Ex:</strong> Press ':'.
          </li>
          <li>
            <strong>Ex to Command:</strong> Execute the command or press 'Esc'.
          </li>
        </ul>
      </section>

      <section id="shell-scripts" className="mt-8">
        <h2>Shell Scripts</h2>
        <p>
          A shell script is a file containing a sequence of commands that are executed by the shell. It allows
          automating tasks and creating custom commands.
        </p>

        <div className="bg-muted p-4 rounded-md mt-4">
          <p className="font-medium mb-2">Basic Shell Script Structure:</p>
          <pre className="font-mono text-sm">
            {`#!/bin/bash
# This is a comment
echo "Hello, World!"

# Variables
name="John"
echo "Hello, $name"

# Exit with a status code
exit 0`}
          </pre>
        </div>

        <p className="mt-4">To create and run a shell script:</p>
        <ol className="list-decimal pl-5 mt-2">
          <li>Create a file with a text editor (e.g., vi script.sh).</li>
          <li>Add the shebang line (#!/bin/bash) at the beginning.</li>
          <li>Write the commands.</li>
          <li>Save the file.</li>
          <li>Make the script executable (chmod +x script.sh).</li>
          <li>Run the script (./script.sh).</li>
        </ol>
      </section>

      <section id="variables" className="mt-8">
        <h2>Shell Variables</h2>
        <p>Shell variables store data that can be used by the shell script:</p>

        <Tabs defaultValue="user" className="my-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="user">User-defined Variables</TabsTrigger>
            <TabsTrigger value="special">Special Variables</TabsTrigger>
          </TabsList>
          <TabsContent value="user" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">User-defined Variables</h3>
            <p className="mb-2">Variables created and used by the user in scripts:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`# Variable assignment (no spaces around =)
name="John"
age=30
is_student=true

# Variable usage (prefix with $)
echo "Name: $name"
echo "Age: $age"
echo "Student: $is_student"

# Command substitution
current_date=$(date)
echo "Current date: $current_date"

# Arithmetic operations
result=$((10 + 5))
echo "10 + 5 = $result"`}
              </pre>
            </div>
            <p className="mt-4">Rules for variable names:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Can contain letters, numbers, and underscores.</li>
              <li>Must start with a letter or underscore.</li>
              <li>Case-sensitive (NAME and name are different variables).</li>
              <li>No spaces around the equals sign in assignments.</li>
            </ul>
          </TabsContent>
          <TabsContent value="special" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Special Variables</h3>
            <p className="mb-2">Predefined variables with special meanings:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`# Script arguments
echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"
echo "Number of arguments: $#"

# Process information
echo "Process ID: $$"
echo "Exit status of last command: $?"

# User information
echo "Current user: $USER"
echo "Home directory: $HOME"
echo "Current directory: $PWD"`}
              </pre>
            </div>
            <p className="mt-4">Common special variables:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>$0</strong> - Name of the script
              </li>
              <li>
                <strong>$1, $2, ...</strong> - Positional parameters (script arguments)
              </li>
              <li>
                <strong>$@</strong> - All positional parameters
              </li>
              <li>
                <strong>$#</strong> - Number of positional parameters
              </li>
              <li>
                <strong>$$</strong> - Process ID of the current shell
              </li>
              <li>
                <strong>$?</strong> - Exit status of the last command
              </li>
              <li>
                <strong>$USER</strong> - Current username
              </li>
              <li>
                <strong>$HOME</strong> - Home directory of the current user
              </li>
              <li>
                <strong>$PATH</strong> - Search path for commands
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </section>

      <section id="system-calls" className="mt-8">
        <h2>System Calls</h2>
        <p>
          System calls are the interface between user programs and the operating system kernel. They allow programs to
          request services from the operating system.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=400&width=800&query=system call interface between user programs and kernel"
            alt="System Call Interface"
            width={800}
            height={400}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 3: System call interface</p>
        </div>

        <p className="mt-4">Common categories of system calls:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>Process Control:</strong> fork(), exec(), exit(), wait()
          </li>
          <li>
            <strong>File Management:</strong> open(), read(), write(), close()
          </li>
          <li>
            <strong>Device Management:</strong> ioctl(), read(), write()
          </li>
          <li>
            <strong>Information Maintenance:</strong> getpid(), alarm(), sleep()
          </li>
          <li>
            <strong>Communication:</strong> pipe(), shmget(), mmap()
          </li>
          <li>
            <strong>Protection:</strong> chmod(), chown(), umask()
          </li>
        </ul>

        <p className="mt-4">
          In shell scripting, many commands are wrappers around system calls, providing a more user-friendly interface
          to the operating system's functionality.
        </p>
      </section>

      <section id="pipes-filters" className="mt-8">
        <h2>Pipes and Filters</h2>
        <p>
          Pipes and filters are a powerful feature of Unix/Linux shells that allow the output of one command to be used
          as the input to another.
        </p>

        <div className="my-6">
          <Image
            src="/placeholder.svg?height=200&width=800&query=unix pipe connecting output of one command to input of another"
            alt="Unix Pipe"
            width={800}
            height={200}
            className="rounded-md"
          />
          <p className="text-sm text-center text-muted-foreground mt-2">Figure 4: Unix pipe connecting commands</p>
        </div>

        <p className="mt-4">Pipes are created using the '|' symbol:</p>
        <div className="bg-muted p-4 rounded-md mt-4">
          <pre className="font-mono text-sm">
            {`# List files and filter for those containing "log"
ls -l | grep log

# Count the number of lines in a file
cat file.txt | wc -l

# Find the 5 largest files in a directory
du -h | sort -rh | head -5

# Multiple pipes
cat /etc/passwd | grep bash | cut -d: -f1 | sort`}
          </pre>
        </div>

        <p className="mt-4">Common filter commands:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>grep:</strong> Search for patterns in text.
          </li>
          <li>
            <strong>sort:</strong> Sort lines of text.
          </li>
          <li>
            <strong>uniq:</strong> Remove or report duplicate lines.
          </li>
          <li>
            <strong>wc:</strong> Count lines, words, and characters.
          </li>
          <li>
            <strong>cut:</strong> Extract sections from each line.
          </li>
          <li>
            <strong>sed:</strong> Stream editor for filtering and transforming text.
          </li>
          <li>
            <strong>awk:</strong> Pattern scanning and processing language.
          </li>
        </ul>
      </section>

      <section id="decision-making" className="mt-8">
        <h2>Decision Making in Shell Scripts</h2>
        <p>Shell scripts can make decisions using conditional statements:</p>

        <Tabs defaultValue="if" className="my-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="if">if-else Statements</TabsTrigger>
            <TabsTrigger value="case">case Statements</TabsTrigger>
          </TabsList>
          <TabsContent value="if" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">if-else Statements</h3>
            <p className="mb-2">Used for conditional execution based on the evaluation of expressions:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`#!/bin/bash

# Simple if statement
if [ $1 -gt 10 ]
then
    echo "Number is greater than 10"
fi

# if-else statement
if [ -f "$2" ]
then
    echo "File exists"
else
    echo "File does not exist"
fi

# if-elif-else statement
age=$3
if [ $age -lt 13 ]
then
    echo "Child"
elif [ $age -lt 20 ]
then
    echo "Teenager"
else
    echo "Adult"
fi`}
              </pre>
            </div>
            <p className="mt-4">Common test operators:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>File tests:</strong> -f (regular file), -d (directory), -r (readable), -w (writable), -x
                (executable)
              </li>
              <li>
                <strong>String tests:</strong> = (equal), != (not equal), -z (empty), -n (not empty)
              </li>
              <li>
                <strong>Numeric tests:</strong> -eq (equal), -ne (not equal), -lt (less than), -le (less than or equal),
                -gt (greater than), -ge (greater than or equal)
              </li>
              <li>
                <strong>Logical operators:</strong> && (AND), || (OR), ! (NOT)
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="case" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">case Statements</h3>
            <p className="mb-2">Used for multi-way branching based on pattern matching:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`#!/bin/bash

# Simple case statement
fruit="apple"
case $fruit in
    "apple")
        echo "It's an apple"
        ;;
    "banana")
        echo "It's a banana"
        ;;
    "orange"|"lemon")
        echo "It's a citrus fruit"
        ;;
    *)
        echo "Unknown fruit"
        ;;
esac

# Using case with command-line arguments
case $1 in
    start)
        echo "Starting service"
        ;;
    stop)
        echo "Stopping service"
        ;;
    restart)
        echo "Restarting service"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac`}
              </pre>
            </div>
            <p className="mt-4">The case statement is particularly useful for:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Command-line argument processing</li>
              <li>Menu-driven scripts</li>
              <li>Pattern matching with wildcards</li>
              <li>Situations with multiple distinct conditions</li>
            </ul>
          </TabsContent>
        </Tabs>
      </section>

      <section id="loops" className="mt-8">
        <h2>Loops in Shell Scripts</h2>
        <p>Loops allow repetitive execution of a block of commands:</p>

        <Tabs defaultValue="for" className="my-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="for">for Loops</TabsTrigger>
            <TabsTrigger value="while">while Loops</TabsTrigger>
            <TabsTrigger value="until">until Loops</TabsTrigger>
          </TabsList>
          <TabsContent value="for" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">for Loops</h3>
            <p className="mb-2">Iterate over a list of items:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`#!/bin/bash

# Basic for loop
for name in John Mary Steve
do
    echo "Hello, $name"
done

# Loop through a range of numbers
for i in {1..5}
do
    echo "Number: $i"
done

# C-style for loop
for ((i=0; i<5; i++))
do
    echo "Index: $i"
done

# Loop through files
for file in *.txt
do
    echo "Processing $file"
    # Do something with the file
done

# Loop through command output
for user in $(cut -d: -f1 /etc/passwd)
do
    echo "User: $user"
done`}
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="while" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">while Loops</h3>
            <p className="mb-2">Execute commands as long as a condition is true:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`#!/bin/bash

# Basic while loop
count=1
while [ $count -le 5 ]
do
    echo "Count: $count"
    count=$((count + 1))
done

# Reading lines from a file
while read line
do
    echo "Line: $line"
done < input.txt

# Infinite loop with break
while true
do
    echo "Enter a number (0 to exit): "
    read num
    if [ $num -eq 0 ]
    then
        break
    fi
    echo "You entered: $num"
done`}
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="until" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">until Loops</h3>
            <p className="mb-2">Execute commands until a condition becomes true:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`#!/bin/bash

# Basic until loop
count=1
until [ $count -gt 5 ]
do
    echo "Count: $count"
    count=$((count + 1))
done

# Waiting for a file to exist
until [ -f /tmp/signal_file ]
do
    echo "Waiting for signal file..."
    sleep 5
done
echo "Signal file found, continuing..."`}
              </pre>
            </div>
            <p className="mt-4">
              The until loop is essentially the opposite of the while loop. It continues until the condition becomes
              true, whereas the while loop continues as long as the condition is true.
            </p>
          </TabsContent>
        </Tabs>

        <p className="mt-4">Loop control commands:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>
            <strong>break:</strong> Exit the loop immediately.
          </li>
          <li>
            <strong>continue:</strong> Skip the rest of the current iteration and continue with the next iteration.
          </li>
          <li>
            <strong>exit:</strong> Exit the entire script.
          </li>
        </ul>
      </section>

      <section id="functions" className="mt-8">
        <h2>Functions in Shell Scripts</h2>
        <p>Functions are reusable blocks of code that can be called multiple times within a script:</p>

        <div className="bg-muted p-4 rounded-md mt-4">
          <pre className="font-mono text-sm">
            {`#!/bin/bash

# Function definition
greet() {
    echo "Hello, $1!"
}

# Function with return value
is_even() {
    if [ $(($1 % 2)) -eq 0 ]
    then
        return 0  # True (success)
    else
        return 1  # False (failure)
    fi
}

# Function with local variables
calculate() {
    local num1=$1
    local num2=$2
    local sum=$((num1 + num2))
    echo "Sum: $sum"
}

# Calling functions
greet "World"
greet "John"

# Using return values
if is_even 4
then
    echo "4 is even"
else
    echo "4 is odd"
fi

# Using function output
result=$(calculate 5 3)
echo "Result: $result"`}
          </pre>
        </div>

        <p className="mt-4">Key points about shell functions:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Functions must be defined before they are called.</li>
          <li>Parameters are accessed using $1, $2, etc., similar to script arguments.</li>
          <li>Functions can return values using the return statement (0-255, typically used for success/failure).</li>
          <li>Functions can output text, which can be captured using command substitution.</li>
          <li>Variables are global by default; use the local keyword to create local variables.</li>
        </ul>
      </section>

      <section id="utilities" className="mt-8">
        <h2>Utility Programs</h2>
        <p>Unix/Linux provides a rich set of utility programs that can be used in shell scripts:</p>

        <Card className="my-4">
          <CardContent className="p-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex flex-col">
                <strong className="text-primary">File Utilities</strong>
                <span>ls, cp, mv, rm, mkdir, rmdir, touch, chmod, chown</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Text Processing</strong>
                <span>cat, grep, sed, awk, cut, paste, sort, uniq, wc, tr</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">System Information</strong>
                <span>ps, top, free, df, du, uname, who, whoami, date</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Networking</strong>
                <span>ping, ifconfig, netstat, ssh, scp, wget, curl</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Archiving</strong>
                <span>tar, gzip, bzip2, zip, unzip</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-primary">Process Control</strong>
                <span>kill, killall, nice, nohup, bg, fg, jobs</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <p className="mt-4">Example of using utility programs in a script:</p>
        <div className="bg-muted p-4 rounded-md mt-4">
          <pre className="font-mono text-sm">
            {`#!/bin/bash

# Backup script using utility programs

# Create backup directory if it doesn't exist
backup_dir="/backup/$(date +%Y-%m-%d)"
mkdir -p $backup_dir

# Find all .txt files modified in the last day
echo "Finding recently modified text files..."
find /home/user -name "*.txt" -mtime -1 > /tmp/files_to_backup.txt

# Count the number of files to backup
file_count=$(wc -l < /tmp/files_to_backup.txt)
echo "Found $file_count files to backup"

# Create a compressed archive
echo "Creating backup archive..."
tar -czf $backup_dir/backup.tar.gz -T /tmp/files_to_backup.txt

# Check if backup was successful
if [ $? -eq 0 ]
then
    echo "Backup completed successfully"
    # Calculate size of backup
    size=$(du -h $backup_dir/backup.tar.gz | cut -f1)
    echo "Backup size: $size"
else
    echo "Backup failed"
fi

# Clean up
rm /tmp/files_to_backup.txt`}
          </pre>
        </div>
      </section>

      <section id="pattern-matching" className="mt-8">
        <h2>Pattern Matching</h2>
        <p>
          Shell scripts often need to match patterns in text, filenames, or other data. Several mechanisms are available
          for pattern matching:
        </p>

        <Tabs defaultValue="glob" className="my-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="glob">Globbing Patterns</TabsTrigger>
            <TabsTrigger value="regex">Regular Expressions</TabsTrigger>
            <TabsTrigger value="case">Case Pattern Matching</TabsTrigger>
          </TabsList>
          <TabsContent value="glob" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Globbing Patterns</h3>
            <p className="mb-2">Used for filename expansion and simple pattern matching:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>*</strong> - Matches any string of characters (including none)
              </li>
              <li>
                <strong>?</strong> - Matches any single character
              </li>
              <li>
                <strong>[abc]</strong> - Matches any one of the enclosed characters
              </li>
              <li>
                <strong>[a-z]</strong> - Matches any character in the specified range
              </li>
              <li>
                <strong>[!abc]</strong> - Matches any character not in the enclosed set
              </li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`# List all .txt files
ls *.txt

# List files with single-character names
ls ?

# List files starting with a, b, or c
ls [abc]*

# List files not starting with a vowel
ls [!aeiou]*

# Copy all .jpg and .png files
cp *.{jpg,png} /backup/images/`}
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="regex" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Regular Expressions</h3>
            <p className="mb-2">More powerful pattern matching used by tools like grep, sed, and awk:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>.</strong> - Matches any single character
              </li>
              <li>
                <strong>*</strong> - Matches zero or more of the preceding character
              </li>
              <li>
                <strong>+</strong> - Matches one or more of the preceding character
              </li>
              <li>
                <strong>?</strong> - Matches zero or one of the preceding character
              </li>
              <li>
                <strong>^</strong> - Matches the beginning of a line
              </li>
              <li>
                <strong>$</strong> - Matches the end of a line
              </li>
              <li>
                <strong>[abc]</strong> - Matches any one of the enclosed characters
              </li>
              <li>
                <strong>(abc)</strong> - Groups expressions
              </li>
              <li>
                <strong>|</strong> - Alternation (OR)
              </li>
            </ul>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`# Find lines containing "error"
grep "error" logfile.txt

# Find lines starting with "From:"
grep "^From:" email.txt

# Find lines ending with a number
grep "[0-9]$" data.txt

# Find words with 5 to 8 characters
grep -E "\\b\\w{5,8}\\b" document.txt

# Replace all occurrences of "old" with "new"
sed 's/old/new/g' file.txt

# Print the second field of each line
awk '{print $2}' data.txt`}
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="case" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Case Pattern Matching</h3>
            <p className="mb-2">The case statement in shell scripts uses pattern matching for multi-way branching:</p>
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="font-mono text-sm">
                {`#!/bin/bash

# Simple pattern matching
case $1 in
    *.txt)
        echo "Text file"
        ;;
    *.jpg|*.png|*.gif)
        echo "Image file"
        ;;
    *.sh)
        echo "Shell script"
        ;;
    [0-9]*)
        echo "Starts with a number"
        ;;
    *)
        echo "Unknown file type"
        ;;
esac

# Advanced pattern matching
read -p "Enter a string: " input
case $input in
    [Yy]|[Yy][Ee][Ss])
        echo "You said yes"
        ;;
    [Nn]|[Nn][Oo])
        echo "You said no"
        ;;
    *[0-9]*)
        echo "Contains a number"
        ;;
    ???)
        echo "Exactly three characters"
        ;;
    *)
        echo "No pattern matched"
        ;;
esac`}
              </pre>
            </div>
            <p className="mt-4">
              Case patterns can use the same wildcards as filename globbing, making them powerful for string matching.
            </p>
          </TabsContent>
        </Tabs>
      </section>

      <InteractiveDiagram
        title="Shell Scripting Concepts"
        description="Explore key concepts in shell scripting"
        states={shellScriptingConcepts}
        initialState="variables"
      />

      <section id="practice" className="mt-8">
        <h2>Practice Questions</h2>
        <QuizComponent
          title="Module 6 Quiz"
          description="Test your understanding of shell concepts and scripting"
          questions={quizQuestions}
        />
      </section>
    </ModuleLayout>
  )
}
