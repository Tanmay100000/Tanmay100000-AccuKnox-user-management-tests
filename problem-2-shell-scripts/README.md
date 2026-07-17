# Problem Statement 2 – Shell Scripting Tasks

This repository contains my solution for **Problem Statement 2** of the **AccuKnox QA Trainee Practical Assessment**.

I selected the following two objectives:

1. **System Health Monitoring Script**
2. **Application Health Checker Script**

---

# Repository Structure

```text
problem-2-shell-scripts/
├── system_health_monitor.sh    # Monitors CPU, Memory, Disk, and Process Count
├── app_health_checker.sh       # Checks whether a website/application is UP or DOWN
└── README.md
```

---

# Environment

- **Operating System:** Windows
- **Linux Environment:** WSL (Windows Subsystem for Linux)
- **Distribution:** Ubuntu
- **Terminal:** VS Code Terminal / Ubuntu Terminal

Since these are Bash scripts, they must be executed inside a Linux environment.

---

# Prerequisites

- WSL with Ubuntu installed
- Bash Shell
- curl
- bc

---

# Setup Instructions

## Step 1: Install WSL + Ubuntu

Open **PowerShell as Administrator** and run:

```powershell
wsl --install -d Ubuntu
```

Restart your computer if prompted.

After restarting, Ubuntu will launch automatically (or open it from the Start Menu).

---

## Step 2: Create Linux Username & Password

The first time Ubuntu opens, it will ask for:

```text
Enter new UNIX username:
New password:
Retype new password:
```

After completing the setup, your terminal will look similar to:

```bash
tanmay@DESKTOP-LAHPOGD:~$
```

---

## Step 3: Install Required Packages

```bash
sudo apt update
sudo apt install curl bc -y
```

### Package Usage

| Package | Purpose |
|----------|----------|
| curl | Sends HTTP requests in the Application Health Checker |
| bc | Performs floating-point calculations for CPU usage |

---

## Step 4: Navigate to the Project Folder

Windows drives are mounted under `/mnt`.

Example:

```bash
cd /mnt/d/Downloads/files_1/AccuKnox-user-management-tests
```

Replace the path according to where you saved the project.

---

## Step 5: Open the Shell Script Directory

```bash
cd problem-2-shell-scripts
```

Verify the files:

```bash
ls
```

Expected output:

```text
README.md
app_health_checker.sh
system_health_monitor.sh
```

---

## Step 6: Give Execute Permission

```bash
chmod +x system_health_monitor.sh app_health_checker.sh
```

---

# Running the Scripts

## 1. System Health Monitoring Script

Run:

```bash
./system_health_monitor.sh
```

### Sample Output

```text
[2026-07-17 13:06:59] ----- Starting System Health Check -----
[2026-07-17 13:06:59] OK: CPU usage is normal -> 1%
[2026-07-17 13:06:59] OK: Memory usage is normal -> 7%
[2026-07-17 13:06:59] OK: Disk usage is normal -> 1%
[2026-07-17 13:06:59] OK: Process count is normal -> 36
[2026-07-17 13:06:59] ----- System Health Check Complete -----

Full log saved to: ./system_health.log
```

---

## 2. Application Health Checker

Pass the application URL as an argument.

Example:

```bash
./app_health_checker.sh https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

### Sample Output

```text
[2026-07-17 13:07:22] Checking application: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
[2026-07-17 13:07:22] UP: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login responded with HTTP 200 (response time: 2.802s)

Application : https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
Status      : UP
HTTP Code   : 200
Checked At  : 2026-07-17 13:07:22

Full log saved to: ./app_health.log
```

---

# Test with Another Website

```bash
./app_health_checker.sh https://www.google.com
```

---

# Simulate a DOWN Application

```bash
./app_health_checker.sh https://this-site-does-not-exist-xyz123.com
```

The script will report:

- DOWN status
- HTTP error (if available)
- Timeout or connection failure
- Exit code = 1

---

# Script Details

## 1. system_health_monitor.sh

This script monitors overall system health by checking:

- CPU Usage
- Memory Usage
- Disk Usage
- Running Process Count

Default Thresholds:

| Metric | Threshold |
|---------|-----------|
| CPU Usage | 80% |
| Memory Usage | 80% |
| Disk Usage | 80% |
| Process Count | 300 |

For each metric, the script prints either:

- **OK** – Usage is within the threshold.
- **ALERT** – Usage exceeds the threshold.

---

## 2. app_health_checker.sh

This script checks whether a web application is reachable.

It uses **curl** to send an HTTP request and reports:

- HTTP Status Code
- Response Time
- UP or DOWN Status
- Timestamp



# Technologies Used

- Bash Shell
- Ubuntu (WSL)
- curl
- bc
- Linux Command Line

---

# Author

**Tanmay Wadibhasme**

AccuKnox QA Trainee Practical Assessment – Problem Statement 2`
