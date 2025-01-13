import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

class RequestHandler(BaseHTTPRequestHandler):
    json_file = "login.json"
    static_dir = "static"  # Directorul unde vei avea fișierele statice

    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        # Servește fișiere statice dacă ruta cere un fișier
        if self.path == "/":
            self.path = "/index.html"  # Redirecționează rădăcina către index.html

        file_path = os.path.join(self.static_dir, self.path.strip("/"))

        if os.path.isfile(file_path):  # Dacă fișierul există în directorul static
            try:
                with open(file_path, "rb") as file:
                    self._set_headers(200, self._get_content_type(file_path))
                    self.wfile.write(file.read())
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": "Server error"}).encode("utf-8"))
        elif self.path == "/users":
            try:
                with open(self.json_file, "r") as file:
                    data = json.load(file)
                self._set_headers()
                self.wfile.write(json.dumps(data).encode("utf-8"))
            except FileNotFoundError:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "File not found"}).encode("utf-8"))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode("utf-8"))

    def _get_content_type(self, file_path):
        # Determină tipul de fișier pe baza extensiei
        if file_path.endswith(".html"):
            return "text/html"
        elif file_path.endswith(".css"):
            return "text/css"
        elif file_path.endswith(".js"):
            return "application/javascript"
        elif file_path.endswith(".png"):
            return "image/png"
        elif file_path.endswith(".jpg") or file_path.endswith(".jpeg"):
            return "image/jpeg"
        elif file_path.endswith(".json"):
            return "application/json"
        else:
            return "application/octet-stream"

    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length)
        try:
            user_data = json.loads(post_data.decode("utf-8"))

            if "username" not in user_data or "password" not in user_data:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Invalid data format"}).encode("utf-8"))
                return

            with open(self.json_file, "r") as file:
                users = json.load(file)

            existing_user = next((u for u in users if u["username"] == user_data["username"]), None)
            if existing_user:
                self._set_headers(409)
                self.wfile.write(json.dumps({"error": "User already exists"}).encode("utf-8"))
                return

            users.append(user_data)
            with open(self.json_file, "w") as file:
                json.dump(users, file, indent=4)

            self._set_headers()
            self.wfile.write(json.dumps({"message": "User registered successfully"}).encode("utf-8"))

        except json.JSONDecodeError:
            self._set_headers(400)
            self.wfile.write(json.dumps({"error": "Invalid JSON format"}).encode("utf-8"))

    def do_PUT(self):
        content_length = int(self.headers["Content-Length"])
        put_data = self.rfile.read(content_length)
        try:
            user_data = json.loads(put_data.decode("utf-8"))

            if "username" not in user_data or "password" not in user_data:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Invalid data format"}).encode("utf-8"))
                return

            with open(self.json_file, "r") as file:
                users = json.load(file)

            existing_user = next(
                (u for u in users if u["username"] == user_data["username"] and u["password"] == user_data["password"]),
                None
            )
            if existing_user:
                self._set_headers()
                self.wfile.write(json.dumps({"message": "Login successful"}).encode("utf-8"))
            else:
                self._set_headers(401)
                self.wfile.write(json.dumps({"error": "Invalid credentials"}).encode("utf-8"))

        except json.JSONDecodeError:
            self._set_headers(400)
            self.wfile.write(json.dumps({"error": "Invalid JSON format"}).encode("utf-8"))

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()