# Welcome to my terminal window!                                                               
###  This system is for the use of authorized users only.  Usage of   
###  this system may be monitored and recorded by system personnel.                                                                   
###           Other than that, feel free to look around!  
### root@codex # ls
### [boxes](./boxes.md) [code](./code.md) [red_teaming](./red_teaming.md) [CTF](./ctf.md) [about](./about.md)
### root@codex # cd ./boxes
### root@codex # ls
### [../](../)
### [Potato](boxes/potato.md)
### root@codex # vi potato.md

# Potato

Started doing this box late at night with Jonathan and X3ron because I clearly have no life.  
  
Initial nmap  
```
# Nmap 7.91 scan initiated Mon May 10 10:04:03 2021 as: nmap -vv --reason -Pn -A --osscan-guess --version-all -p- -oN /root/Desktop/Labs/ProvingGrounds/Potato/results/192.168.124.101/scans/_full_tcp_nmap.txt -oX /root/Desktop/Labs/ProvingGrounds/Potato/results/192.168.124.101/scans/xml/_full_tcp_nmap.xml 192.168.124.101
Increasing send delay for 192.168.124.101 from 0 to 5 due to 706 out of 2351 dropped probes since last increase.
Nmap scan report for 192.168.124.101
Host is up, received user-set (0.22s latency).
Scanned at 2021-05-10 10:04:04 EDT for 1419s
Not shown: 65532 closed ports
Reason: 65532 resets
PORT     STATE SERVICE REASON         VERSION
22/tcp   open  ssh     syn-ack ttl 63 OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 ef:24:0e:ab:d2:b3:16:b4:4b:2e:27:c0:5f:48:79:8b (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDamdAqH2ZyWoYj0tstPK0vbVKI+9OCgtkGDoynffxqV2kE4ceZn77FBuMGFKLU50Uv5RMUTFTX4hm1ijh77KMGG1CmAk2YWvEDhxbCBPCohp+xXMBXHBYoMbEVl/loKL2UW6USnKorOgwxUdoMAwDxIrohGHQ5WNUADRaqt1eHuHxuJ8Bgi8yzqP/26ePQTLCfwAZMq+SYPJedZBmfJJ3Brhb/CGgzgRU8BpJGI8IfBL5791JTn2niEgoMAZ1vdfnSx0m49uk8npd0h5hPQ+ucyMh+Q35lJ1zDq94E24mkgawDhEgmLtb23JDNdY4rv/7mAAHYA5AsRSDDFgmbXEVcC7N1c3cyrwVH/w+zF5SKOqQ8hOF7LRCqv0YQZ05wyiBu2OzbeAvhhiKJteICMuitQAuF6zU/dwjX7oEAxbZ2GsQ66kU3/JnL4clTDATbT01REKJzH9nHpO5sZdebfLJdVfx38qDrlS+risx1QngpnRvWTmJ7XBXt8UrfXGenR3U=
|   256 f2:d8:35:3f:49:59:85:85:07:e6:a2:0e:65:7a:8c:4b (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBNoh1z4mRbfROqXjtv9CG7ZYGiwN29OQQCVXMLce4ejLzy+0Bvo7tYSb5PKVqgO5jd1JaB3LLGWreXo6ZY3Z8T8=
|   256 0b:23:89:c3:c0:26:d5:64:5e:93:b7:ba:f5:14:7f:3e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDXv++bn0YEgaoSEmMm3RzCzm6pyUJJSsSW9FMBqvZQ3
80/tcp   open  http    syn-ack ttl 63 Apache httpd 2.4.41 ((Ubuntu))
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Potato company
2112/tcp open  ftp     syn-ack ttl 63 ProFTPD
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| -rw-r--r--   1 ftp      ftp           901 Aug  2  2020 index.php.bak
|_-rw-r--r--   1 ftp      ftp            54 Aug  2  2020 welcome.msg
OS fingerprint not ideal because: maxTimingRatio (1.546000e+00) is greater than 1.4
Aggressive OS guesses: Linux 2.6.32 (91%), Linux 2.6.32 or 3.10 (91%), Linux 4.4 (91%), WatchGuard Fireware 11.8 (91%), Synology DiskStation Manager 5.1 (90%), Linux 2.6.35 (90%), Linux 2.6.39 (90%), Linux 3.10 - 3.12 (90%), Linux 3.5 (90%), Linux 4.2 (90%)
No exact OS matches for host (test conditions non-ideal).
TCP/IP fingerprint:
SCAN(V=7.91%E=4%D=5/10%OT=22%CT=1%CU=37236%PV=Y%DS=2%DC=T%G=N%TM=609942DF%P=x86_64-pc-linux-gnu)
SEQ(SP=FE%GCD=1%ISR=106%TI=Z%TS=A)
OPS(O1=M506ST11NW7%O2=M506ST11NW7%O3=M506NNT11NW7%O4=M506ST11NW7%O5=M506ST11NW7%O6=M506ST11)
WIN(W1=FE88%W2=FE88%W3=FE88%W4=FE88%W5=FE88%W6=FE88)
ECN(R=Y%DF=Y%T=40%W=FAF0%O=M506NNSNW7%CC=Y%Q=)
T1(R=Y%DF=Y%T=40%S=O%A=S+%F=AS%RD=0%Q=)
T2(R=N)
T3(R=N)
T4(R=N)
T5(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)
T6(R=N)
T7(R=N)
U1(R=Y%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)
IE(R=Y%DFI=N%T=40%CD=S)

Uptime guess: 19.711 days (since Tue Apr 20 17:23:57 2021)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=255 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 53/tcp)
HOP RTT       ADDRESS
1   242.15 ms 192.168.49.1
2   242.68 ms 192.168.124.101

Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Mon May 10 10:27:43 2021 -- 1 IP address (1 host up) scanned in 1420.56 seconds
```

Ok, so SSH, Web server on 80, and FTP on a weird port. Seems like a standard box. Lets see what the webpage is like.

![web page](boxes/potato_img/tcp_80_http_screenshot.png)
