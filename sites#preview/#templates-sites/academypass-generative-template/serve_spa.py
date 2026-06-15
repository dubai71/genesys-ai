from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys


class SPAHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        requested = Path(self.translate_path(self.path))
        if not requested.exists() and "." not in Path(self.path.split("?", 1)[0]).name:
            self.path = "/index.html"
        return super().do_GET()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5177
    server = ThreadingHTTPServer(("127.0.0.1", port), SPAHandler)
    print(f"Serving SPA on http://127.0.0.1:{port}")
    server.serve_forever()
