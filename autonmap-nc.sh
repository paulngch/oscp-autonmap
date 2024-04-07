#!/bin/bash

# Check if two arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <target> <output_directory>"
    exit 1
fi

# Assign command line arguments to variables
target="$1"
output_file="$2/$target-scan.txt"

#Define scan command
scan() {
	sudo rustscan -t 3000 --tries 2 -b 8192 -u 16384 -a "$1"
}

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

print_yellow "=================================="
print_yellow "=========RUST SCAN START=========="
scan "$target"
print_yellow "=========RUST SCAN END============"
print_yellow "=================================="

ports=$(nmap -p- --min-rate 1000 "$target" | grep "^ *[0-9]" | grep "open" | cut -d '/' -f 1 | tr '\n' ',' | sed 's/,$//')

# Separate the ports
IFS=',' read -ra port_array <<< "$ports";
######################
#EZ Wins for SMB vulns
#Finds existence of both port 139 and 445
contains_139=false
contains_445=false

for port in "${port_array[@]}"; do
	if [[ $port == "139" ]]; then
		contains_139=true
	elif [[ $port == "445" ]]; then
		contains_445=true
	fi
done

#Runs smb-vuln scripts on 139 & 445 if both exists
if [[ $contains_139 == true && $contains_445 == true ]]; then
	{
	print_blue "========Start of SMB Vuln scripts========"
	echo '  _____ __  __ ____     __      ___    _ _      _   _ '
	echo ' / ____|  \/  |  _ \    \ \    / / |  | | |    | \ | |'
	echo '| (___ | \  / | |_) |____\ \  / /| |  | | |    |  \| |'
	echo ' \___ \| |\/| |  _ <______\ \/ / | |  | | |    | . ` |'
	echo ' ____) | |  | | |_) |      \  /  | |__| | |____| |\  |'
	echo '|_____/|_|  |_|____/        \/    \____/|______|_| \_|'		                                              
    	print_blue "Port 139 and 445 exists,\nRunning SMB-Vuln scripts\n"
    	nmap --script smb-vuln*.nse -p 139,445 "$target" -Pn -v
    	print_blue "========End of SMB Vuln scripts========"
    	} | append
fi

#####################

echo "Running second nmap scan with open ports: $ports" | append

nmap -p "$ports" -sC -sV -A "$target" | append

echo "Running manual version scan with open ports: $ports" |append


for port in "${port_array[@]}"; do	
	{
	echo "==================================/"
	echo "============PORT $port==========/"
	echo "Running nc command for port: $port"
	echo version | sudo nc -q 30 "$target" "$port"
	echo "==============END==============="
	echo "================================"
	} | append
done
