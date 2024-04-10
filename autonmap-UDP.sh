#!/bin/bash

# Check if two arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <target> <output_directory>"
    exit 1
fi

# Assign command line arguments to variables
target="$1"
output_file="$2/$target-udp-scan.txt"

#Define tee / append command to save
append() {
	tee -a "$output_file"
}

touch "$output_file";

# Function to print text in colors
print_yellow() {
    echo -e "\033[33m$@\033[0m"
}
print_blue() {
    echo -e "\033[34m$@\033[0m"
}

#print_yellow "=================================="
#print_yellow "=========RUST SCAN START=========="
#scan "$target"
#print_yellow "=========RUST SCAN END============"
#print_yellow "=================================="

# Separate the ports
IFS=',' read -ra port_array <<< "$ports";
######################
{
print_blue "========UDP SCAN========"
echo ' _    _ _____  _____     _____  _____          _   _ '
echo '| |  | |  __ \|  __ \   / ____|/ ____|   /\   | \ | |'
echo '| |  | | |  | | |__) | | (___ | |       /  \  |  \| |'
echo '| |  | | |  | |  ___/   \___ \| |      / /\ \ | . ` |'
echo '| |__| | |__| | |       ____) | |____ / ____ \| |\  |'
echo ' \____/|_____/|_|      |_____/ \_____/_/    \_\_| \_|'		                                              
print_blue "========================"
} | append

print_blue "========================" | append
echo "Running nmap scan with COMMON ports" | append
nmap -sU -T4 "$target" | append
print_blue "========================" | append

print_yellow "==========SECOND===========" | append
echo "Running second nmap scan with open ports: $ports" | append
ports=$(nmap -sU -p- --min-rate 4000 "$target" | grep "^ *[0-9]" | grep "open" | cut -d '/' -f 1 | tr '\n' ',' | sed 's/,$//')
nmap -sU -p "$ports" -sC -sV -A "$target" | append
print_yellow "========SECOND END========" | append
