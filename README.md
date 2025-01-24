# Setup Project

Readme for start the Next project and PostgreSQL.

## Install steps

### 1. Install dependencies
Run the following command to install all necessary dependencies:
```bash
npm install
```

### 2. Run docker
- Check out that Docker is already installed and configured.
- Verify that is not a PostgreSQL container running on the port that you'll use.
- In the project root run the following command:
```bash
docker compose up -d
```


## Notes
- Asegúrate de que el archivo `.env` tenga valores válidos antes de iniciar el proyecto.
- Si necesitas detener los contenedores Docker, puedes usar:
```bash
docker compose down
