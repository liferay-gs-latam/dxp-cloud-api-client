# dxp-cloud-api-client

🚀 A CLI tool and programmable interface to interact with the Liferay DXP Cloud API, supporting secure Basic Auth for automation.

## ✅ Features

- 🔐 Auth via Basic Auth with token retrieval from `/user`
- 👥 Manage collaborators: update roles, remove users, list users
- 📦 List all accessible DXP Cloud projects
- 🔌 Easily pluggable into other systems (e.g. IGA solutions)
- 🧱 Modular architecture — easy to extend with new commands

---

## 📦 Installation

```bash
git clone https://github.com/your-org/dxp-cloud-api-client.git
cd dxp-cloud-api-client
npm install
cp .env.example .env
```

---

## 🔐 Configuration

Edit the `.env` file to define your credentials:

```env
DXP_AUTH_MODE=lcp
DXP_CLOUD_USERNAME=my.user@company.com
DXP_CLOUD_PASSWORD=superSecurePassword
```

> ✅ **Note:** This implementation no longer requires the `lcp` CLI.  
> It uses Basic Auth via the `/user` endpoint to fetch a valid token for all operations (GET, PATCH, DELETE, etc.).

---

## 🧪 Usage

All commands are run via:

```bash
node src/index.js <command> [...args]
```

### Available commands

| Command         | Description                                       |
|----------------|---------------------------------------------------|
| `update-role`   | Update a collaborator's role                     |
| `remove-user`   | Remove a collaborator from a project             |
| `list-users`    | List all users and their roles in a project      |
| `list-projects` | List all accessible projects with status/health  |
| `help`          | Show all available commands                      |

---

## 💡 Examples

Update user role:

```bash
node src/index.js update-role my-project user@example.com viewer
```

Remove user from project:

```bash
node src/index.js remove-user my-project user@example.com
```

List all users of a project:

```bash
node src/index.js list-users my-project
```

List all projects:

```bash
node src/index.js list-projects
```

---

## 🧩 Real-World Use Case: User Lifecycle Automation

Imagine an enterprise using a centralized **Identity Management Platform (IGA)** integrated with LDAP to manage all employee access.

Whenever an employee leaves the company, the IGA:

- ❌ Disables the user in Active Directory / LDAP
- 🔐 Revokes access to internal systems
- 📤 Triggers a webhook or automation script

Using `dxp-cloud-api-client`, the same system can automatically:

- 🔄 Remove the user from the Liferay DXP Cloud project
- 📉 Downgrade their role instead of removal (e.g., from `admin` to `viewer`)
- ✅ Ensure compliance and zero-trust access enforcement

### Example

```bash
# Downgrade role to 'viewer'
node src/index.js update-role dxp-prod john.doe@company.com viewer

# OR: Remove user entirely from the project
node src/index.js remove-user dxp-prod john.doe@company.com
```

This can be:

- ✅ Scheduled via cron
- 🔌 Integrated into an IGA workflow (e.g., SailPoint, One Identity, Okta Workflows)
- 🔐 Triggered from a CI/CD pipeline or internal microservice

### Benefits

- 🛡️ Enforces security by removing unnecessary DXP Cloud access
- ⚙️ Keeps roles and project memberships in sync with internal identity policies
- 📚 Provides a clear, version-controlled interface for access governance

---

## 🧰 Project Structure

```
src/
├── auth/               # Authentication strategies
├── commands/           # CLI commands (modular)
├── collaborators.js    # Core collaborator logic
└── index.js            # CLI entrypoint / dispatcher
```

---

## 📄 License

MIT — Customize as needed for internal distribution.
