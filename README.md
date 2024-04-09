# oscp-autonmap
autonmap script for own oscp-use

Command execution:
1. Runs Rustscan
2. Runs nmap (TCP) scan to find open ports,
3. If ports 139 & 445 exists, run smb-vuln script
4. Then run "-A" flag on each of the ports
5. Run "echo version | sudo nc -q 30 <IP> <PORT>" on each of the open ports
6. Appends results (less rust-scan) into file

# Usage

sudo bash ~/{path-to-script}/autonmap-nc.sh {RHOST} ./{path-for-output}
