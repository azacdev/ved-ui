import { Icons } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t py-6 px-4 md:px-8 lg:px-12 xl:px-16 md:py-0">
      <div className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://x.com/azacdev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Azacdev
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/azacdev/ved-ui"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/azacdev/ved-ui"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icons.github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://twitter.com/azacdev"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icons.twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
