export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Operating Systems Study Guide. All rights reserved.
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          Based on CSIT150 - Principles of Operating Systems
        </p>
      </div>
    </footer>
  )
}
