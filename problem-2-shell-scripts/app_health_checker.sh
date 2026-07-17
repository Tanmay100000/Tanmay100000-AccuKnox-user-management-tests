#!/bin/bash
# app_health_checker.sh
# checks if a website/app is up or down by looking at the HTTP status code
# Usage: ./app_health_checker.sh <url>
# Author: Tanmay

LOG_FILE="./app_health.log"
TIMEOUT=10

if [ -z "$1" ]; then
    echo "Usage: $0 <URL>"
    echo "example: $0 https://www.google.com"
    exit 1
fi

URL="$1"

log() {
    ts=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$ts] $1" | tee -a "$LOG_FILE"
}

# send a request, don't print the body, just get the status code back
start=$(date +%s.%N)
HTTP_CODE=$(curl -o /dev/null -s -w "%{http_code}" -m "$TIMEOUT" "$URL")
curl_exit=$?
end=$(date +%s.%N)

# response time in seconds (using awk here since bc isn't always installed)
resp_time=$(awk -v s="$start" -v e="$end" 'BEGIN {printf "%.3f", e-s}')

log "Checking $URL"

if [ "$curl_exit" -ne 0 ]; then
    log "DOWN - no response from $URL (curl exit code $curl_exit, probably timeout or unreachable)"
    STATUS="DOWN"
elif [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 400 ]; then
    log "UP - got HTTP $HTTP_CODE from $URL (took ${resp_time}s)"
    STATUS="UP"
else
    log "DOWN - got HTTP $HTTP_CODE from $URL (took ${resp_time}s)"
    STATUS="DOWN"
fi

echo ""
echo "Application : $URL"
echo "Status      : $STATUS"
echo "HTTP Code   : ${HTTP_CODE:-N/A}"
echo "Checked at  : $(date "+%Y-%m-%d %H:%M:%S")"
echo ""
echo "log saved to $LOG_FILE"

# exit code matters if this gets called from cron or a CI job later
if [ "$STATUS" == "UP" ]; then
    exit 0
else
    exit 1
fi
