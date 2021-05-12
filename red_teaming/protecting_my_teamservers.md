# Welcome to my terminal window!                                                               
###  This system is for the use of authorized users only.  Usage of   
###  this system may be monitored and recorded by system personnel.                                                                   
###           Other than that, feel free to look around!  
### root@codex # ls
### boxes code red_teaming CTF about
### root@codex # cd ./red_teaming
[Go up 1 directory](../red_teaming.md)
### root@codex # vi protecting_my_teamservers.md
  
# Protecting my C2 infrastructure from annoying scanner monkeys (and some pesky AV vendors)
  
 ## Why do I need to protect my C2 infra?
 Because scanner monkeys (and sometimes pesky security vendors) like to scan the internet for certain C2 signatures e.g. Cobalt Strike teamservers and profile them. One such 
 example is [these people](https://blog.fox-it.com/2019/02/26/identifying-cobalt-strike-team-servers-in-the-wild/) who went and started fingerprinting Cobalt Strike teamservers
 using an anomalous space in NanoHTTPD. Or the time I woke up to this monstrosity:  
   
 ![sad](./protecting_my_teamservers_img/system_profilers.png)
