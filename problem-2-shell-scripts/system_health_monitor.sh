#!/bin/bash
# system_health_monitor.sh
# quick script to check basic system health - cpu, memory, disk, process count
# prints OK/ALERT for each and saves everything to a log file too
# Author: Tanmay

CPU_LIMIT=80
MEM_LIMIT=80
DISK_LIMIT=80
PROC_LIMIT=300
LOG_FILE="./system_health.log"

log() {
    ts=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$ts] $1" | tee -a "$LOG_FILE"
}

log "----- Starting System Health Check -----"

# CPU - get idle % from top and subtract from 100 to get usage
cpu_idle=$(top -bn1 | grep "Cpu(s)" | awk -F, '{print $4}' | grep -o '[0-9.]*')
cpu_usage=$(echo "100 - $cpu_idle" | bc 2>/dev/null)
cpu_usage=${cpu_usage%.*}

if [ -z "$cpu_usage" ]; then
    log "WARNING: could not read CPU usage"
elif [ "$cpu_usage" -ge "$CPU_LIMIT" ]; then
    log "ALERT: CPU usage high -> ${cpu_usage}% (limit ${CPU_LIMIT}%)"
else
    log "OK: CPU usage normal -> ${cpu_usage}%"
fi

# Memory
mem_usage=$(free | awk '/Mem:/ {printf("%.0f", $3/$2 * 100)}')
if [ "$mem_usage" -ge "$MEM_LIMIT" ]; then
    log "ALERT: Memory usage high -> ${mem_usage}% (limit ${MEM_LIMIT}%)"
else
    log "OK: Memory usage normal -> ${mem_usage}%"
fi

# Disk (root partition)
disk_usage=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
if [ "$disk_usage" -ge "$DISK_LIMIT" ]; then
    log "ALERT: Disk usage high -> ${disk_usage}% (limit ${DISK_LIMIT}%)"
else
    log "OK: Disk usage normal -> ${disk_usage}%"
fi

# Running processes
proc_count=$(ps -e | wc -l)
if [ "$proc_count" -ge "$PROC_LIMIT" ]; then
    log "ALERT: too many processes running -> $proc_count (limit $PROC_LIMIT)"
else
    log "OK: process count normal -> $proc_count"
fi

log "----- System Health Check Complete -----"
echo ""
echo "log saved to $LOG_FILE"
