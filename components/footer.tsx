import { Heart, Linkedin, Github, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by</span>
            <a
              href="https://yasirarafath.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>Yasir Md</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/mdyasirarafath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200 text-sm flex items-center space-x-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="https://github.com/mdyasir1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 transition-colors duration-200 text-sm flex items-center space-x-1"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
