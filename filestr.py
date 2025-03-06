import os

# Define the project structure
project_structure = {
    "backend": [
        "config/db.js",
        "models/User.js",
        "routes/authRoutes.js",
        "middleware/authMiddleware.js",
        "controllers/authController.js",
        ".env",
        "server.js",
        "package.json"
    ],
    "frontend": [
        "src/components/Navbar.js",
        "src/components/Login.js",
        "src/components/Register.js",
        "src/components/Dashboard.js",
        "src/context/AuthContext.js",
        "src/App.js",
        "src/index.js",
        ".env",
        "package.json"
    ]
}

# Function to create directories and files
def create_structure(base_path, structure):
    for folder, files in structure.items():
        folder_path = os.path.join(base_path, folder)
        os.makedirs(folder_path, exist_ok=True)
        for file in files:
            file_path = os.path.join(folder_path, file)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, "w") as f:
                f.write("")  # Create an empty file

# Generate the folder structure
base_directory = os.getcwd()  # Change this to your desired base path
create_structure(base_directory, project_structure)

print("Backend and Frontend folder structures created successfully!")
